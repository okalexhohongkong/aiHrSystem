import { describe, expect, it } from 'vitest'
import {
  accountsByChannel,
  accountsByCompany,
  createInvitationQueueRecord,
  composeInvitationMessage,
  composeAppointmentMessage,
  composeEmailInstructionBlock,
  canSendThroughChannel,
  defaultInvitationQueueRecords,
  defaultEmailInstructionModuleIds,
  defaultJobAppointmentScripts,
  emailInstructionModules,
  credentialStatusText,
  invitationChannelLabels,
  invitationProcessingOrder,
  invitationChannelSecurityRules,
  invitationQueueStatuses,
  scriptForJob,
  selectPreferredChannel,
  validateDedicatedCompanyAccount,
  type InvitationChannelAccount,
} from './invitationChannels'

const accounts: InvitationChannelAccount[] = [
  {
    accountName: '企微-销售招聘组',
    channelType: 'wecom',
    companyName: '黑卫士科技',
    credentialStatus: 'configured',
    dedicatedEmail: 'sales.hr@heiwenshi.ai',
    id: 'wecom-sales',
    jobScope: ['业务岗'],
    ownerName: '陈HR',
  },
  {
    accountName: '微信-内容招聘1号',
    channelType: 'wechat',
    companyName: '黑卫士市场中心',
    credentialStatus: 'needsReview',
    dedicatedEmail: 'content.hr@heiwenshi.ai',
    id: 'wechat-content',
    jobScope: ['自媒体'],
    ownerName: '赵HR',
  },
  {
    accountName: 'hr@heiwenshi.ai',
    channelType: 'email',
    companyName: '黑卫士科技',
    credentialStatus: 'configured',
    dedicatedEmail: 'hr@heiwenshi.ai',
    id: 'email-main',
    jobScope: ['业务岗', '营销岗', 'AI系统开发'],
    ownerName: '陈HR',
  },
]

describe('third-party invitation channels', () => {
  it('labels appointment processing channels in the preferred processing order with email first', () => {
    expect(Object.values(invitationChannelLabels)).toEqual([
      '邮件预约',
      '平台留言预约',
      '企业微信预约',
      '微信预约',
      '电话预约',
      '短信预约',
    ])
    expect(invitationProcessingOrder.map((channel) => invitationChannelLabels[channel])).toEqual([
      '邮件预约',
      '平台留言预约',
      '企业微信预约',
      '微信预约',
      '电话预约',
      '短信预约',
    ])
  })

  it('filters accounts by company and channel type', () => {
    expect(accountsByCompany(accounts, '黑卫士科技')).toHaveLength(2)
    expect(accountsByChannel(accounts, 'wechat')[0].accountName).toBe('微信-内容招聘1号')
  })

  it('only allows sending through configured channels', () => {
    expect(canSendThroughChannel(accounts[0])).toBe(true)
    expect(canSendThroughChannel(accounts[1])).toBe(false)
  })

  it('selects the best configured account by channel priority, company and job scope', () => {
    const selected = selectPreferredChannel(accounts, '黑卫士科技', '业务岗')

    expect(selected?.channelType).toBe('email')
    expect(selected?.dedicatedEmail).toBe('hr@heiwenshi.ai')
  })

  it('requires a dedicated company and dedicated email for formal invitation accounts', () => {
    expect(validateDedicatedCompanyAccount(accounts[2])).toEqual({
      ok: true,
      warnings: [],
    })
    expect(
      validateDedicatedCompanyAccount({
        ...accounts[2],
        companyName: '',
        dedicatedEmail: '',
      }).warnings,
    ).toEqual(expect.arrayContaining(['缺少公司主体', '缺少专用招聘邮箱']))
  })

  it('composes channel-specific greetings and email replies for HR confirmation', () => {
    expect(
      composeInvitationMessage({
        candidateName: '李晨',
        channelType: 'email',
        companyName: '黑卫士科技',
        contactAccount: 'hr@heiwenshi.ai',
        jobName: '业务经理',
        stage: '初试邀约',
      }).subject,
    ).toBe('黑卫士科技-业务经理初试邀约')
    expect(
      composeInvitationMessage({
        candidateName: '李晨',
        channelType: 'platformMessage',
        companyName: '黑卫士科技',
        contactAccount: 'BOSS-业务招聘1号',
        jobName: '业务经理',
        stage: '补充资料',
      }).body,
    ).toContain('平台留言会同步记录候选人是否接受')
  })

  it('keeps different job appointment scripts reusable by job name', () => {
    expect(defaultJobAppointmentScripts.map((script) => script.jobName)).toEqual(
      expect.arrayContaining(['业务经理', 'AI系统开发', '自媒体创意制作']),
    )
    expect(scriptForJob('业务经理')?.evidenceFocus).toContain('业绩')
    expect(scriptForJob('不存在的岗位')?.jobName).toBe('通用岗位')
  })

  it('composes online meeting appointment content with feedback tracking', () => {
    const draft = composeAppointmentMessage({
      appointment: {
        appointmentAt: '2026-06-22 15:00',
        feedbackStatus: '待接受',
        interviewRounds: ['线上沟通', '初试', '复试'],
        meetingPlatform: '腾讯会议',
        meetingRoom: '腾讯会议 888-666-123',
        mode: 'onlineMeeting',
      },
      candidateName: '李晨',
      channelType: 'platformMessage',
      companyName: '黑卫士科技',
      contactAccount: 'BOSS-业务招聘1号',
      jobName: '业务经理',
      stage: '初试邀约',
    })

    expect(draft.body).toContain('腾讯会议')
    expect(draft.body).toContain('腾讯会议 888-666-123')
    expect(draft.body).toContain('平台反馈状态：待接受')
    expect(draft.body).toContain('线上沟通 -> 初试 -> 复试')
  })

  it('composes offline appointment content with route, reception, forms and rounds', () => {
    const draft = composeAppointmentMessage({
      appointment: {
        appointmentAt: '2026-06-23 10:30',
        drivingRoute: '导航到黑卫士科技园区，车牌提前发给HR。',
        feedbackStatus: '已接受',
        floorRoom: '12层 1206会议室',
        forms: ['候选人登记表', '资料授权确认表', '岗位信息确认表'],
        interviewRounds: ['初试', '复试', '终试'],
        mode: 'offlineInterview',
        offlineAddress: '上海市浦东新区黑卫士科技中心',
        receptionist: '陈HR',
        subwayRoute: '地铁2号线科技园站B口，步行6分钟。',
        transitRoute: '公交88路到科技园南门。',
      },
      candidateName: '李晨',
      channelType: 'email',
      companyName: '黑卫士科技',
      contactAccount: 'hr@heiwenshi.ai',
      jobName: '业务经理',
      stage: '初试邀约',
    })

    expect(draft.body).toContain('上海市浦东新区黑卫士科技中心')
    expect(draft.body).toContain('12层 1206会议室')
    expect(draft.body).toContain('陈HR')
    expect(draft.body).toContain('候选人登记表、资料授权确认表、岗位信息确认表')
    expect(draft.body).toContain('初试 -> 复试 -> 终试')
  })

  it('provides fixed email instruction modules for interview arrival and homework workflows', () => {
    expect(defaultEmailInstructionModuleIds).toEqual([
      'find-us',
      'appointment',
      'meeting',
      'parking',
      'building-access',
      'registration',
      'queue',
      'assessment',
      'second-final',
      'homework',
      'submission',
    ])
    expect(emailInstructionModules.map((module) => module.title)).toEqual(
      expect.arrayContaining([
        '怎么找到我们',
        '怎么预约和确认',
        '怎么开会或面试',
        '怎么停车',
        '怎么上楼',
        '来了之后怎么填写资料',
        '怎么约号叫号和排队等候',
        '怎么样参加测试',
        '怎么样参加复试和终试',
        '怎么完成作业',
        '怎么样提交作业',
      ]),
    )
  })

  it('composes selected fixed modules into a reusable email guidance block', () => {
    const block = composeEmailInstructionBlock(['find-us', 'parking', 'registration', 'queue', 'submission'])

    expect(block).toContain('【怎么找到我们】')
    expect(block).toContain('【怎么停车】')
    expect(block).toContain('【来了之后怎么填写资料】')
    expect(block).toContain('【怎么约号叫号和排队等候】')
    expect(block).toContain('【怎么样提交作业】')
  })

  it('adds fixed guidance modules to formal email invitation drafts only', () => {
    const emailDraft = composeInvitationMessage({
      candidateName: '李晨',
      channelType: 'email',
      companyName: '黑卫士科技',
      contactAccount: 'hr@heiwenshi.ai',
      instructionModuleIds: ['find-us', 'meeting', 'homework'],
      jobName: '业务经理',
      stage: '初试邀约',
    })
    const wechatDraft = composeInvitationMessage({
      candidateName: '李晨',
      channelType: 'wechat',
      companyName: '黑卫士科技',
      contactAccount: '微信-业务招聘1号',
      instructionModuleIds: ['find-us', 'meeting', 'homework'],
      jobName: '业务经理',
      stage: '初试邀约',
    })

    expect(emailDraft.body).toContain('【怎么找到我们】')
    expect(emailDraft.body).toContain('【怎么开会或面试】')
    expect(emailDraft.body).toContain('【怎么完成作业】')
    expect(wechatDraft.body).not.toContain('【怎么找到我们】')
  })

  it('shows credential state without exposing secrets', () => {
    expect(credentialStatusText('configured')).toBe('已配置，前端不显示密钥')
    expect(invitationChannelSecurityRules.join('')).toContain('不展示明文密钥')
  })

  it('keeps invitation queue records editable and ready for local persistence', () => {
    expect(defaultInvitationQueueRecords).toHaveLength(4)
    expect(invitationQueueStatuses).toEqual(expect.arrayContaining(['待HR确认', '已发送', '已接受', '需改期']))

    const record = createInvitationQueueRecord({
      account: '',
      action: '',
      candidate: '  王五  ',
      channel: 'email',
      company: '',
      job: '  财务经理  ',
      now: '2026-06-26T08:20:00+08:00',
      status: '待HR确认',
    })

    expect(record).toMatchObject({
      account: '邮件预约',
      action: '邀约预约',
      candidate: '王五',
      company: '待确认公司主体',
      job: '财务经理',
      status: '待HR确认',
      updatedAt: '2026-06-26T08:20:00+08:00',
    })
  })
})
