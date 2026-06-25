export type DemoPlatformId = 'boss' | 'zhaopin' | 'liepin' | 'job51'
export type DemoPlatformFilter = 'all' | DemoPlatformId

export type DemoPlatformAccount = {
  id: string
  platformId: DemoPlatformId
  platform: string
  accountName: string
  companyName: string
  ownerName: string
  loginMethod: string
}

export type DemoInterviewRecord = {
  id: string
  candidateName: string
  jobName: string
  companyName: string
  phone: string
  email: string
  wechatId: string
  wecomId: string
  platformId: DemoPlatformId
  platformName: string
  platformAccountId: string
  platformAccountName: string
  interviewStage: '在线面试' | '初试' | '复试' | '终试'
  status: '待邀约' | '已邀约' | '已确认' | '待复核' | '已入库'
  score: number
}

export const demoPlatformAccounts: DemoPlatformAccount[] = [
  {
    accountName: 'BOSS-业务综合号',
    companyName: '黑卫士科技',
    id: 'boss-sales-01',
    loginMethod: '手机验证码 + APP扫码',
    ownerName: '陈HR',
    platform: 'BOSS直聘',
    platformId: 'boss',
  },
  {
    accountName: 'BOSS-技术产品号',
    companyName: '黑卫士智能硬件',
    id: 'boss-tech-02',
    loginMethod: '网页辅助 + 邮箱验证码',
    ownerName: '王主管',
    platform: 'BOSS直聘',
    platformId: 'boss',
  },
  {
    accountName: '智联-职能管理号',
    companyName: '黑卫士科技',
    id: 'zhaopin-functional-01',
    loginMethod: '账号密码手动登录 + 手机验证码',
    ownerName: '赵HR',
    platform: '智联招聘',
    platformId: 'zhaopin',
  },
  {
    accountName: '猎聘-高级人才号',
    companyName: '黑卫士控股',
    id: 'liepin-executive-01',
    loginMethod: '二维码扫码 + 人工授权',
    ownerName: '老板账号',
    platform: '猎聘',
    platformId: 'liepin',
  },
]

const accountById = new Map(demoPlatformAccounts.map((account) => [account.id, account]))

function record(input: Omit<DemoInterviewRecord, 'companyName' | 'platformAccountName' | 'platformName'>): DemoInterviewRecord {
  const account = accountById.get(input.platformAccountId)

  return {
    ...input,
    companyName: account?.companyName ?? '演示公司',
    platformAccountName: account?.accountName ?? '未绑定演示账号',
    platformName: account?.platform ?? '未配置平台',
  }
}

export const demoInterviewRecords: DemoInterviewRecord[] = [
  record({
    candidateName: '李晨',
    email: 'lichen.demo@heiwenshi.ai',
    id: 'demo-boss-001',
    interviewStage: '复试',
    jobName: '业务经理',
    phone: '13800001111',
    platformAccountId: 'boss-sales-01',
    platformId: 'boss',
    score: 88,
    status: '已确认',
    wechatId: 'wx-lichen-demo',
    wecomId: 'wecom-sales-lichen',
  }),
  record({
    candidateName: '赵磊',
    email: 'zhaolei.demo@heiwenshi.ai',
    id: 'demo-boss-002',
    interviewStage: '在线面试',
    jobName: 'AI系统开发',
    phone: '13800002222',
    platformAccountId: 'boss-tech-02',
    platformId: 'boss',
    score: 79,
    status: '待复核',
    wechatId: 'wx-zhaolei-demo',
    wecomId: 'wecom-tech-zhaolei',
  }),
  record({
    candidateName: '周敏',
    email: 'zhoumin.demo@heiwenshi.ai',
    id: 'demo-zhaopin-001',
    interviewStage: '初试',
    jobName: '财务经理',
    phone: '13900003333',
    platformAccountId: 'zhaopin-functional-01',
    platformId: 'zhaopin',
    score: 84,
    status: '已邀约',
    wechatId: 'wx-zhoumin-demo',
    wecomId: 'wecom-finance-zhoumin',
  }),
  record({
    candidateName: '陈琳',
    email: 'chenlin.demo@heiwenshi.ai',
    id: 'demo-zhaopin-002',
    interviewStage: '终试',
    jobName: '自媒体内容负责人',
    phone: '13700004444',
    platformAccountId: 'zhaopin-functional-01',
    platformId: 'zhaopin',
    score: 91,
    status: '已确认',
    wechatId: 'wx-chenlin-demo',
    wecomId: 'wecom-media-chenlin',
  }),
  record({
    candidateName: '顾远',
    email: 'guyuan.demo@heiwenshi.ai',
    id: 'demo-liepin-001',
    interviewStage: '终试',
    jobName: '经营副总经理',
    phone: '13600005555',
    platformAccountId: 'liepin-executive-01',
    platformId: 'liepin',
    score: 93,
    status: '待复核',
    wechatId: 'wx-guyuan-demo',
    wecomId: 'wecom-executive-guyuan',
  }),
]

export const demoPlatformFilterOptions: Array<{ id: DemoPlatformFilter; label: string }> = [
  { id: 'all', label: '全部平台混合' },
  { id: 'boss', label: '只看BOSS' },
  { id: 'zhaopin', label: '只看智联' },
  { id: 'liepin', label: '只看猎聘' },
  { id: 'job51', label: '只看51job' },
]

export function filterDemoInterviewsByPlatform(records: DemoInterviewRecord[], filter: DemoPlatformFilter) {
  if (filter === 'all') return records
  return records.filter((record) => record.platformId === filter)
}

export function demoPlatformSummary(records: DemoInterviewRecord[]) {
  return {
    byFilter: demoPlatformFilterOptions.reduce(
      (summary, option) => ({
        ...summary,
        [option.id]: filterDemoInterviewsByPlatform(records, option.id).length,
      }),
      {} as Record<DemoPlatformFilter, number>,
    ),
    total: records.length,
  }
}
