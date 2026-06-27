export type InvitationChannelType = 'email' | 'platformMessage' | 'wecom' | 'wechat' | 'phone' | 'sms'

export type InvitationCredentialStatus = 'notConfigured' | 'configured' | 'needsReview'

export type InvitationChannelAccount = {
  id: string
  channelType: InvitationChannelType
  companyName: string
  accountName: string
  dedicatedEmail?: string
  ownerName: string
  jobScope: string[]
  credentialStatus: InvitationCredentialStatus
}

export const invitationChannelLabels: Record<InvitationChannelType, string> = {
  email: '邮件预约',
  platformMessage: '平台留言预约',
  wecom: '企业微信预约',
  wechat: '微信预约',
  phone: '电话预约',
  sms: '短信预约',
}

export const invitationProcessingOrder: InvitationChannelType[] = ['email', 'platformMessage', 'wecom', 'wechat', 'phone', 'sms']

export type AppointmentFeedbackStatus = '待接受' | '已接受' | '已拒绝' | '需改期'
export type AppointmentMode = 'onlineMeeting' | 'offlineInterview' | 'phoneInterview'
export type InvitationQueueStatus =
  | '待HR确认'
  | '待补充作品集'
  | '待确认时间'
  | '人工复核'
  | '已发送'
  | '已接受'
  | '需改期'

export type InvitationQueueRecord = {
  id: string
  candidate: string
  job: string
  channel: InvitationChannelType
  company: string
  account: string
  action: string
  appointment?: AppointmentInfo
  draftMessage?: string
  status: InvitationQueueStatus
  updatedAt: string
}

export const invitationQueueStatuses: InvitationQueueStatus[] = [
  '待HR确认',
  '待补充作品集',
  '待确认时间',
  '人工复核',
  '已发送',
  '已接受',
  '需改期',
]

export const defaultInvitationQueueRecords: InvitationQueueRecord[] = [
  {
    account: 'hr@heiwenshi.ai',
    action: '邀约线上初试',
    appointment: {
      appointmentAt: '2026-06-22 15:00',
      feedbackStatus: '待接受',
      interviewRounds: ['线上沟通', '初试'],
      meetingPlatform: '腾讯会议',
      meetingRoom: '腾讯会议 888-666-123',
      mode: 'onlineMeeting',
    },
    candidate: '李晨',
    channel: 'email',
    company: '黑卫士科技',
    id: 'invite-li-chen-business-email',
    job: '业务经理',
    status: '待HR确认',
    updatedAt: '2026-06-19T14:00:00+08:00',
  },
  {
    account: '微信-内容招聘1号',
    action: '生成微信问候语',
    appointment: {
      appointmentAt: '2026-06-22 16:30',
      feedbackStatus: '待接受',
      interviewRounds: ['作品沟通', '初试'],
      meetingPlatform: '飞书会议',
      meetingRoom: '飞书会议 room-content-01',
      mode: 'onlineMeeting',
    },
    candidate: '陈琳',
    channel: 'wechat',
    company: '黑卫士市场中心',
    id: 'invite-chen-lin-content-wechat',
    job: '自媒体创意制作',
    status: '待补充作品集',
    updatedAt: '2026-06-19T14:10:00+08:00',
  },
  {
    account: '企微-技术招聘组',
    action: '复试邀约',
    appointment: {
      appointmentAt: '2026-06-23 10:30',
      feedbackStatus: '需改期',
      forms: ['候选人登记表', '资料授权确认表', '岗位信息确认表'],
      interviewRounds: ['复试', '终试'],
      floorRoom: '12层 1206会议室',
      mode: 'offlineInterview',
      offlineAddress: '上海市浦东新区黑卫士科技中心',
      receptionist: '王主管',
      subwayRoute: '地铁2号线科技园站B口，步行6分钟。',
    },
    candidate: '周敏',
    channel: 'wecom',
    company: '黑卫士智能硬件',
    id: 'invite-zhou-min-tech-wecom',
    job: 'AI系统开发',
    status: '待确认时间',
    updatedAt: '2026-06-19T14:20:00+08:00',
  },
  {
    account: '短信签名-黑卫士招聘',
    action: '短信提醒',
    appointment: {
      appointmentAt: '2026-06-23 14:00',
      feedbackStatus: '待接受',
      interviewRounds: ['电话确认', '线下面试'],
      mode: 'phoneInterview',
    },
    candidate: '赵磊',
    channel: 'sms',
    company: '黑卫士市场中心',
    id: 'invite-zhao-lei-parttime-sms',
    job: '合伙兼职/小时工',
    status: '人工复核',
    updatedAt: '2026-06-19T14:30:00+08:00',
  },
]

export type InvitationMessageInput = {
  candidateName: string
  channelType: InvitationChannelType
  companyName: string
  contactAccount: string
  instructionModuleIds?: EmailInstructionModuleId[]
  jobName: string
  stage: '初试邀约' | '补充资料' | '复试邀约' | '作业提醒' | '婉拒'
}

export type JobAppointmentScript = {
  jobName: string
  opening: string
  coreQuestions: string[]
  evidenceFocus: string
  tone: string
}

export type AppointmentInfo = {
  mode: AppointmentMode
  appointmentAt: string
  feedbackStatus: AppointmentFeedbackStatus
  interviewRounds: string[]
  meetingPlatform?: string
  meetingRoom?: string
  offlineAddress?: string
  floorRoom?: string
  receptionist?: string
  drivingRoute?: string
  subwayRoute?: string
  transitRoute?: string
  forms?: string[]
}

export type AppointmentMessageInput = InvitationMessageInput & {
  appointment: AppointmentInfo
}

export type EmailInstructionModuleId =
  | 'find-us'
  | 'appointment'
  | 'meeting'
  | 'parking'
  | 'building-access'
  | 'registration'
  | 'queue'
  | 'assessment'
  | 'second-final'
  | 'homework'
  | 'submission'

export type EmailInstructionModule = {
  id: EmailInstructionModuleId
  title: string
  body: string
}

export const emailInstructionModules: EmailInstructionModule[] = [
  {
    id: 'find-us',
    title: '怎么找到我们',
    body: '请按邮件中的公司地址导航到办公楼；到达园区或楼下后，可联系招聘负责人或前台协助确认入口。',
  },
  {
    id: 'appointment',
    title: '怎么预约和确认',
    body: '请回复可面试时间、联系电话和最新简历；HR确认后会发送面试时间、面试形式、联系人和注意事项。',
  },
  {
    id: 'meeting',
    title: '怎么开会或面试',
    body: '线上面试请按会议链接、会议号或二维码准时进入；线下面试请提前10-15分钟到达，便于签到和资料确认。',
  },
  {
    id: 'parking',
    title: '怎么停车',
    body: '自驾候选人请提前告知车牌号；到场后按园区或物业指引停车，如需停车券或放行信息请联系HR。',
  },
  {
    id: 'building-access',
    title: '怎么上楼',
    body: '到达一楼后请在前台说明面试公司、岗位和联系人；如需门禁或电梯权限，请联系HR或前台协助上楼。',
  },
  {
    id: 'registration',
    title: '来了之后怎么填写资料',
    body: '到场后请先完成签到，按要求填写候选人登记表、资料授权确认和岗位信息确认表。',
  },
  {
    id: 'queue',
    title: '怎么约号叫号和排队等候',
    body: '签到后请等待HR叫号；如现场候选人较多，请按预约时间和签到顺序等候，期间保持电话畅通。',
  },
  {
    id: 'assessment',
    title: '怎么样参加测试',
    body: '如岗位需要测试，HR会安排心理测评、专业题、实操题或线上答题，请按规定时间完成并提交。',
  },
  {
    id: 'second-final',
    title: '怎么样参加复试和终试',
    body: '初试通过后会另行通知复试或终试时间、面试官、面试形式和准备材料；请以HR确认信息为准。',
  },
  {
    id: 'homework',
    title: '怎么完成作业',
    body: '如需完成面试作业，请按题目要求、格式、截止时间和保密要求提交；如有疑问请在截止前联系HR确认。',
  },
  {
    id: 'submission',
    title: '怎么样提交作业',
    body: '作业请通过指定邮箱、系统链接或企业微信提交；邮件标题建议写明姓名、岗位、作业名称和提交日期。',
  },
]

export const defaultEmailInstructionModuleIds: EmailInstructionModuleId[] = emailInstructionModules.map(
  (module) => module.id,
)

export const defaultJobAppointmentScripts: JobAppointmentScript[] = [
  {
    coreQuestions: ['过往业绩规模', '客户类型与成交链路', '提成与业绩佐证'],
    evidenceFocus: '重点确认业绩、客户层级、提成到账和可提供的佐证材料。',
    jobName: '业务经理',
    opening: '我们重点看您过往的独立成交、客户资源和从0到1推进项目的能力。',
    tone: '直接、高效、重视结果。',
  },
  {
    coreQuestions: ['系统架构经验', 'AI工具链', '项目0-1落地'],
    evidenceFocus: '重点确认代码作品、项目角色、上线结果和技术难点复盘。',
    jobName: 'AI系统开发',
    opening: '我们会重点了解您做过的系统、模型/接口使用经验和工程落地能力。',
    tone: '专业、清晰、关注真实贡献。',
  },
  {
    coreQuestions: ['内容选题能力', '账号增长案例', '作品集'],
    evidenceFocus: '重点确认作品链接、播放/转化数据、选题方法和团队协作方式。',
    jobName: '自媒体创意制作',
    opening: '我们会重点看作品质量、内容敏感度和稳定产出的能力。',
    tone: '友好、有画面感、鼓励带作品沟通。',
  },
  {
    coreQuestions: ['岗位匹配经历', '代表性成果', '可面试时间'],
    evidenceFocus: '重点确认简历真实性、代表成果、稳定性和到岗时间。',
    jobName: '通用岗位',
    opening: '我们看到您的经历与岗位有一定匹配，想进一步沟通岗位细节。',
    tone: '正式、清楚、便于候选人回复。',
  },
]

export function scriptForJob(jobName: string) {
  return defaultJobAppointmentScripts.find((script) => script.jobName === jobName) ??
    defaultJobAppointmentScripts.find((script) => script.jobName === '通用岗位')
}

export function credentialStatusText(status: InvitationCredentialStatus) {
  const textMap: Record<InvitationCredentialStatus, string> = {
    configured: '已配置，前端不显示密钥',
    needsReview: '待复核',
    notConfigured: '待配置',
  }

  return textMap[status]
}

export function accountsByCompany(accounts: InvitationChannelAccount[], companyName: string) {
  return accounts.filter((account) => account.companyName === companyName)
}

export function accountsByChannel(accounts: InvitationChannelAccount[], channelType: InvitationChannelType) {
  return accounts.filter((account) => account.channelType === channelType)
}

export function canSendThroughChannel(account: InvitationChannelAccount) {
  return account.credentialStatus === 'configured'
}

export function selectPreferredChannel(
  accounts: InvitationChannelAccount[],
  companyName: string,
  jobName: string,
) {
  const scopedAccounts = accounts.filter(
    (account) =>
      account.companyName === companyName &&
      canSendThroughChannel(account) &&
      (account.jobScope.includes(jobName) || account.jobScope.includes('全岗位')),
  )

  return invitationProcessingOrder
    .map((channelType) => scopedAccounts.find((account) => account.channelType === channelType))
    .find(Boolean)
}

export function validateDedicatedCompanyAccount(account: InvitationChannelAccount) {
  const warnings: string[] = []

  if (!account.companyName.trim()) warnings.push('缺少公司主体')
  if (!account.accountName.trim()) warnings.push('缺少专用账号')
  if (!account.ownerName.trim()) warnings.push('缺少负责人')
  if (!account.dedicatedEmail?.trim()) warnings.push('缺少专用招聘邮箱')

  return {
    ok: warnings.length === 0,
    warnings,
  }
}

export function createInvitationQueueRecord(
  input: Omit<InvitationQueueRecord, 'id' | 'updatedAt'> & { id?: string; now?: string },
): InvitationQueueRecord {
  const updatedAt = input.now ?? new Date().toISOString()
  const safeCandidate = input.candidate.trim() || '未命名候选人'
  const safeJob = input.job.trim() || '待确认岗位'

  return {
    ...input,
    account: input.account.trim() || invitationChannelLabels[input.channel],
    action: input.action.trim() || '邀约预约',
    appointment: input.appointment,
    candidate: safeCandidate,
    company: input.company.trim() || '待确认公司主体',
    draftMessage: input.draftMessage,
    id: input.id ?? `invite-${updatedAt.replace(/[^0-9]/g, '').slice(0, 14)}-${safeCandidate.length}`,
    job: safeJob,
    updatedAt,
  }
}

export function defaultAppointmentForQueueRecord(
  input: Pick<InvitationQueueRecord, 'action' | 'channel' | 'job'>,
): AppointmentInfo {
  const isOffline = input.action.includes('线下') || input.channel === 'phone'
  const isPhone = input.action.includes('电话') || input.channel === 'phone'

  if (isPhone) {
    return {
      appointmentAt: '待确认',
      feedbackStatus: '待接受',
      interviewRounds: ['电话确认', '初试'],
      mode: 'phoneInterview',
    }
  }

  if (isOffline) {
    return {
      appointmentAt: '待确认',
      drivingRoute: '导航到公司地址，车牌和停车信息由HR确认。',
      feedbackStatus: '待接受',
      floorRoom: '待确认楼层/会议室',
      forms: ['候选人登记表', '资料授权确认表', '岗位信息确认表'],
      interviewRounds: ['初试', '复试'],
      mode: 'offlineInterview',
      offlineAddress: '待确认公司地址',
      receptionist: '待确认接待人',
      subwayRoute: '按公司地址导航到最近地铁站。',
      transitRoute: '按公司地址导航到附近公交站。',
    }
  }

  return {
    appointmentAt: '待确认',
    feedbackStatus: '待接受',
    interviewRounds: input.action.includes('复试') ? ['复试'] : ['线上沟通', '初试'],
    meetingPlatform: '腾讯会议',
    meetingRoom: `${input.job}线上会议室待确认`,
    mode: 'onlineMeeting',
  }
}

export function appointmentModeLabel(mode: AppointmentMode) {
  const labels: Record<AppointmentMode, string> = {
    offlineInterview: '线下面试',
    onlineMeeting: '线上会议',
    phoneInterview: '电话面试',
  }

  return labels[mode]
}

export function summarizeAppointmentInfo(appointment: AppointmentInfo) {
  const base = [
    appointmentModeLabel(appointment.mode),
    appointment.appointmentAt,
    appointment.feedbackStatus,
    appointment.interviewRounds.join(' -> '),
  ]

  if (appointment.mode === 'onlineMeeting') {
    base.push(appointment.meetingPlatform ?? '会议平台待确认', appointment.meetingRoom ?? '会议室待确认')
  }

  if (appointment.mode === 'offlineInterview') {
    base.push(appointment.offlineAddress ?? '地址待确认', appointment.floorRoom ?? '楼层房间待确认')
  }

  return base.filter(Boolean).join(' / ')
}

export function composeEmailInstructionBlock(moduleIds: EmailInstructionModuleId[] = defaultEmailInstructionModuleIds) {
  const moduleMap = new Map(emailInstructionModules.map((module) => [module.id, module]))

  return moduleIds
    .map((moduleId) => moduleMap.get(moduleId))
    .filter((module): module is EmailInstructionModule => Boolean(module))
    .map((module) => `【${module.title}】\n${module.body}`)
    .join('\n\n')
}

export function composeInvitationMessage(input: InvitationMessageInput) {
  const greeting = `${input.candidateName}您好，我是${input.companyName}招聘负责人。`
  const channelNote: Record<InvitationChannelType, string> = {
    email: `请您留意本邮件及后续来自 ${input.contactAccount} 的正式通知。`,
    phone: '如电话沟通不便，我们会再通过邮件补发正式预约信息。',
    platformMessage: '平台留言会同步记录候选人是否接受、是否改期以及是否需要补充资料。',
    sms: '短信仅做提醒，正式材料和确认信息仍以邮件或企业微信为准。',
    wechat: '方便的话请补充简历或作品材料，我们会同步安排后续沟通。',
    wecom: '企业微信会作为正式沟通入口，便于同步岗位资料、面试安排和作业要求。',
  }
  const stageText: Record<InvitationMessageInput['stage'], string> = {
    初试邀约: `我们看到了您与${input.jobName}岗位的匹配点，想邀请您参加线上初试。`,
    补充资料: `为了更准确评估${input.jobName}岗位匹配度，麻烦您补充简历、作品或业绩佐证材料。`,
    复试邀约: `您的初步沟通结果较好，想邀请您进入${input.jobName}岗位复试。`,
    作业提醒: `请按约定时间提交${input.jobName}岗位作业，便于我们安排下一步评估。`,
    婉拒: `感谢您关注${input.jobName}岗位，本次暂不进入下一轮，祝您求职顺利。`,
  }

  const baseBody = [greeting, stageText[input.stage], channelNote[input.channelType], '如您方便，请回复可面试时间、联系电话和最新简历。']
  if (input.channelType === 'email' && input.instructionModuleIds?.length) {
    baseBody.push(composeEmailInstructionBlock(input.instructionModuleIds))
  }

  return {
    greeting,
    subject: `${input.companyName}-${input.jobName}${input.stage}`,
    body: baseBody.join('\n'),
  }
}

function appointmentModeText(appointment: AppointmentInfo) {
  if (appointment.mode === 'onlineMeeting') {
    return [
      `面试形式：线上会议`,
      `预约时间：${appointment.appointmentAt}`,
      `会议平台：${appointment.meetingPlatform ?? '待确认'}`,
      `线上会议室：${appointment.meetingRoom ?? '待确认'}`,
    ]
  }

  if (appointment.mode === 'phoneInterview') {
    return [
      `面试形式：电话面试`,
      `预约时间：${appointment.appointmentAt}`,
      `接听方式：请保持电话畅通，HR会按预约时间拨打。`,
    ]
  }

  return [
    `面试形式：线下面试`,
    `预约时间：${appointment.appointmentAt}`,
    `公司地址：${appointment.offlineAddress ?? '待确认'}`,
    `楼层房间：${appointment.floorRoom ?? '待确认'}`,
    `接待人员：${appointment.receptionist ?? '待确认'}`,
    `开车路线：${appointment.drivingRoute ?? '按导航到公司地址，停车信息由HR确认。'}`,
    `地铁路线：${appointment.subwayRoute ?? '按公司地址导航到最近地铁站。'}`,
    `公交路线：${appointment.transitRoute ?? '按公司地址导航到附近公交站。'}`,
    `到场填写：${appointment.forms?.join('、') ?? '候选人登记表、资料授权确认表、岗位信息确认表'}`,
  ]
}

export function composeAppointmentMessage(input: AppointmentMessageInput) {
  const base = composeInvitationMessage(input)
  const script = scriptForJob(input.jobName)
  const appointmentLines = appointmentModeText(input.appointment)
  const body = [
    base.body,
    '',
    '【岗位预约话术】',
    script?.opening,
    `重点核验：${script?.evidenceFocus}`,
    `建议提问：${script?.coreQuestions.join('、')}`,
    '',
    '【预约安排】',
    ...appointmentLines,
    `平台反馈状态：${input.appointment.feedbackStatus}`,
    `面试轮次：${input.appointment.interviewRounds.join(' -> ')}`,
    '',
    '请您收到后回复“接受”或提出可调整时间，系统会同步记录平台留言、电话、短信、微信、企微和邮件反馈。',
  ].filter(Boolean)

  return {
    ...base,
    subject: `${input.companyName}-${input.jobName}邀约预约处理`,
    body: body.join('\n'),
  }
}

export const invitationChannelSecurityRules = [
  '第三方API Key、SMTP密码、企业微信Secret只在后端加密保存。',
  '前端只展示已配置、待配置、待复核状态，不展示明文密钥。',
  '邮件、平台留言、企业微信、微信、电话、短信预约默认进入待发送队列，人工确认后触发。',
  '微信和企业微信优先使用官方能力或人工确认流程，不托管个人微信明文密码。',
]
