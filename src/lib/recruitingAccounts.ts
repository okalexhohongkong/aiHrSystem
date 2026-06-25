import { Building2, KeyRound, MailCheck, QrCode, ScanLine, Smartphone, type LucideIcon } from 'lucide-react'

export type RecruitingLoginMethodId =
  | 'phone-code'
  | 'email-code'
  | 'wechat-scan'
  | 'app-scan'
  | 'web-assist'
  | 'manual-password'

export type RecruitingLoginMethod = {
  detail: string
  icon: LucideIcon
  id: RecruitingLoginMethodId
  title: string
}

export type RecruitingBindingMode = 'account-to-many-jobs' | 'job-to-many-accounts' | 'many-to-many'

export type RecruitingAccountMatrixItem = {
  accounts: number
  bindingMode: RecruitingBindingMode
  jobs: string[]
  method: string
  name: string
  owner: string
  status: '已连接' | '待确认' | '需复核'
}

export type BossManagedAccountWorkflowStep = {
  title: string
  detail: string
  owner: string
}

export type BossCandidateActionTier = {
  label: string
  matchRange: string
  action: string
  reviewRule: string
}

export type BossGreetingScriptMode = {
  id: 'knowledge-base' | 'ai-generated' | 'hybrid-ai'
  title: string
  detail: string
  bestFor: string
  inputs: string[]
  output: string
}

export type BossTouchExecutionTrack = {
  id: 'authorized-api' | 'browser-rpa'
  title: string
  detail: string
  guardrail: string
  suitableFor: string
}

export type BossResumeMailboxWorkflowStep = {
  title: string
  detail: string
  owner: string
  guardrail: string
}

export const recruitingLoginMethods: RecruitingLoginMethod[] = [
  {
    detail: '输入手机号后跳转官方验证或录入授权结果，系统只记录授权状态。',
    icon: Smartphone,
    id: 'phone-code',
    title: '手机验证码',
  },
  {
    detail: '接收邮箱/邮件验证码后完成官方验证，系统只记录验证状态和账号别名。',
    icon: MailCheck,
    id: 'email-code',
    title: '邮箱验证码',
  },
  {
    detail: '展示连接引导，用户用微信完成扫码确认，不在系统内输入第三方密码。',
    icon: QrCode,
    id: 'wechat-scan',
    title: '微信扫码',
  },
  {
    detail: '适配手机APP扫码确认，适合多个招聘账号轮流授权。',
    icon: ScanLine,
    id: 'app-scan',
    title: 'APP扫码',
  },
  {
    detail: '打开官方网页登录窗口，系统只读取授权后的连接状态和导入结果。',
    icon: Building2,
    id: 'web-assist',
    title: '网页辅助',
  },
  {
    detail: '用户在官方页面手动输入账号和密码完成登录；系统不保存、不展示第三方明文密码。',
    icon: KeyRound,
    id: 'manual-password',
    title: '手动账号密码登录',
  },
]

export const recruitingAccountMatrix: RecruitingAccountMatrixItem[] = [
  {
    accounts: 1,
    bindingMode: 'account-to-many-jobs',
    jobs: ['业务岗', '营销岗', '策划岗', '自媒体岗'],
    method: '手机验证码',
    name: '业务综合招聘号',
    owner: '陈HR',
    status: '已连接',
  },
  {
    accounts: 3,
    bindingMode: 'job-to-many-accounts',
    jobs: ['AI系统开发'],
    method: 'APP扫码 + 邮箱验证码',
    name: '技术岗账号组',
    owner: '王主管',
    status: '待确认',
  },
  {
    accounts: 6,
    bindingMode: 'many-to-many',
    jobs: ['销售岗', '财务岗', '管理岗', '经营副职岗'],
    method: '微信扫码 + 网页辅助 + 手动账号密码登录',
    name: '重点岗位多账号组',
    owner: '老板账号',
    status: '需复核',
  },
]

export const bossManagedAccountWorkflow: BossManagedAccountWorkflowStep[] = [
  {
    detail: '通过官方页面、二维码、手机验证码或邮箱验证码完成授权，本系统只记录账号别名、授权状态和负责人。',
    owner: '账号负责人',
    title: '官方登录授权',
  },
  {
    detail: '读取平台公开规则和账号当前额度，建立触达频率、岗位发布频率、导入频率和异常暂停阈值。',
    owner: '系统+管理员',
    title: '规则识别与限频',
  },
  {
    detail: 'AI生成打招呼、邀约、问候语和岗位说明草稿，由HR或负责人确认后再发送。',
    owner: 'HR/岗位负责人',
    title: '人工确认触达',
  },
  {
    detail: '归集候选人简历、邮箱简历抄送、简历附件、聊天记录、平台账号、电话、微信、邮箱、岗位来源、互动时间和匹配度。',
    owner: '数据同步任务',
    title: '数据归集',
  },
  {
    detail: '按岗位匹配度、资料完整度、平台活跃度、同行同业权重和风险标签分级，推送邀约建议。',
    owner: 'AI分级+人工复核',
    title: '简历分级邀约',
  },
]

export const bossManagedDataFields = [
  '简历',
  '邮箱简历抄送',
  '简历附件',
  '聊天记录',
  '电话',
  '微信',
  '邮箱',
  '平台账号',
  '岗位来源',
  '互动时间',
  '岗位匹配度',
  '资料完整度',
  '平台活跃度',
  '同业同行权重',
]

export const bossCandidateActionTiers: BossCandidateActionTier[] = [
  {
    action: '自动整理问候语草稿，进入待沟通队列。',
    label: '值得聊天',
    matchRange: '60-74分',
    reviewRule: 'HR确认岗位方向和基础条件后再触达。',
  },
  {
    action: '生成线上/线下面试邀约草稿，并推荐可约时间。',
    label: '值得邀约',
    matchRange: '75-84分',
    reviewRule: '核对薪资、城市、到岗时间和联系方式。',
  },
  {
    action: '进入简历库或储备人才库，设置后续跟进提醒。',
    label: '值得收藏',
    matchRange: '85-89分',
    reviewRule: '确认暂时不邀约的原因，避免漏掉高价值候选人。',
  },
  {
    action: '进入优先争取队列，安排负责人快速沟通和签约条件确认。',
    label: '值得争取签约',
    matchRange: '90分以上',
    reviewRule: '必须人工复核业绩佐证、薪酬边界和入职风险。',
  },
]

export const bossResumeMailboxWorkflow: BossResumeMailboxWorkflowStep[] = [
  {
    detail: '打招呼或沟通话术中明确邀请候选人通过平台发送简历，让平台按规则抄送到预留招聘邮箱。',
    guardrail: '候选人主动发送或平台规则抄送后再解析，不抓取未授权附件。',
    owner: 'HR确认话术',
    title: '邀请候选人发简历',
  },
  {
    detail: '为每个公司主体和招聘账号绑定专用收件邮箱，使用OAuth、应用专用密码或本机钥匙串托管授权凭证。',
    guardrail: '邮箱授权凭证必须加密保存，不在页面明文展示用户名密码。',
    owner: '系统管理员',
    title: '预留邮箱托管',
  },
  {
    detail: '收到BOSS抄送简历邮件后，自动识别岗位、账号、候选人、附件、投递时间和来源平台并进入候选人池。',
    guardrail: '邮件正文、附件和联系方式按敏感数据处理，保留导入日志和权限审计。',
    owner: '邮件入库任务',
    title: '邮件简历入库',
  },
  {
    detail: '模型读取简历附件和邮件内容，按岗位匹配度、薪酬、同行经验、技能标签、稳定性和资料完整度评分。',
    guardrail: 'AI评分只做排序建议，邀约、淘汰和录用必须由负责人确认。',
    owner: 'AI评分模型',
    title: '模型解析评分',
  },
  {
    detail: '评分高、等级高、匹配度高的人进入优先邀约、优先电话、优先微信和优先线上面试队列。',
    guardrail: '优先联系仍需遵守候选人授权、平台规则、通道限频和操作日志。',
    owner: 'HR/岗位负责人',
    title: '高分优先跟进',
  },
]

export const bossGreetingScriptModes: BossGreetingScriptMode[] = [
  {
    bestFor: '标准岗位、批量初筛、企业统一口径',
    detail: '预先维护公司介绍、岗位卖点、薪酬范围、工作地点、面试流程、常见问答和禁用表达，HR可直接选择使用。',
    id: 'knowledge-base',
    inputs: ['公司知识库', '岗位JD', '常见问答', '禁用表达'],
    output: '稳定、统一、可审计的打招呼模板',
    title: '预设知识库话术',
  },
  {
    bestFor: '新岗位、复杂岗位、候选人画像差异明显的场景',
    detail: '根据岗位、候选人简历关键词、平台对话上下文和邀约目标，由AI生成个性化问候语和追问建议。',
    id: 'ai-generated',
    inputs: ['岗位关键词', '候选人标签', '匹配度', '沟通目标'],
    output: '个性化打招呼草稿和追问建议',
    title: 'AI智能生成话术',
  },
  {
    bestFor: '重点候选人、猎头型挖掘、需要既统一又灵活的对话',
    detail: '先调用预设知识库保证公司和岗位口径，再结合预设话术由AI按候选人场景灵活调整，形成可人工确认的对话草稿。',
    id: 'hybrid-ai',
    inputs: ['预设话术', '公司知识库', '候选人画像', '实时对话意图'],
    output: '预设口径 + AI灵活匹配的多轮对话草稿',
    title: '预设话术 + AI灵活调整',
  },
]

export const bossTouchExecutionTracks: BossTouchExecutionTrack[] = [
  {
    detail: '优先使用招聘平台公开、官方或授权的接口能力，同步账号状态、岗位、候选人和可发送草稿。',
    guardrail: '严格按授权范围、频率限制、平台提示和操作日志执行，关键发送动作保留人工确认。',
    id: 'authorized-api',
    suitableFor: '账号授权、数据同步、候选人导入、发送草稿状态回填',
    title: '官方/授权接口轨',
  },
  {
    detail: '在官方网页中辅助打开候选人、填入已审核话术、提示下一步和记录结果，重点减少重复复制粘贴。',
    guardrail: '浏览器RPA只做辅助填写、队列提醒、限频和暂停保护，不做反检测、异常高频或绕过验证。',
    id: 'browser-rpa',
    suitableFor: '网页辅助、人工确认发送、岗位刷新提醒、聊天记录整理',
    title: '浏览器RPA辅助轨',
  },
]

export const bossComplianceGuardrails = [
  '不保存第三方招聘平台明文密码。',
  '不绕过平台风控，不模拟异常高频操作。',
  '不承诺突破平台账号额度，不规避封禁机制。',
  '所有批量触达必须有限频、人工确认和操作日志。',
  '浏览器RPA只做辅助填写、队列提醒和记录回填，不做反检测或绕过验证。',
  '候选人联系方式、聊天记录、简历和附件按敏感数据处理。',
  '账号异常、验证码失败、平台提示风险时自动暂停并提醒人工复核。',
]

export function bindingModeLabel(mode: RecruitingBindingMode) {
  const labels: Record<RecruitingBindingMode, string> = {
    'account-to-many-jobs': '同一账号招聘多个岗位',
    'job-to-many-accounts': '一个岗位绑定多个账号',
    'many-to-many': '多个账号与多个岗位自由组合',
  }

  return labels[mode]
}

export function loginMethodTitles(methods = recruitingLoginMethods) {
  return methods.map((method) => method.title)
}
