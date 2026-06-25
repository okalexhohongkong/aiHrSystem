export type ModuleCategory = 'base' | 'business' | 'ai' | 'integration' | 'report'

export type PlatformModule = {
  id: string
  name: string
  category: ModuleCategory
  description: string
  dependsOn: string[]
  enabled: boolean
  stage: '已接入' | '开发中' | '预留'
}

export type WorkflowStep = {
  id: string
  moduleId: string
  label: string
  required?: boolean
}

export const platformBaseCapabilities = [
  {
    name: '统一用户与权限',
    description: '人事、老板、管理员共用一套账号、角色、权限和审计。',
  },
  {
    name: '模块注册中心',
    description: '每个功能都是独立模块，可启用、停用、扩展和配置依赖。',
  },
  {
    name: '流程编排引擎',
    description: '招聘流程由模块步骤组成，后续可拖拽调整顺序和条件。',
  },
  {
    name: '页面布局引擎',
    description: '每个页面的模块和卡片可锁定、解锁、拖拽排序和恢复默认布局。',
  },
  {
    name: '风险合规中心',
    description: '会议口述、岗位标准、招聘SOP和系统安全边界统一做风险标红、合规纠偏和安全确认。',
  },
  {
    name: '表单与问卷引擎',
    description: '初试评分、岗位问卷、多轮作业评分都用可配置表单承载。',
  },
  {
    name: '文件与AI处理中心',
    description: '简历、录音、转写、解析、Agent结果统一绑定候选人档案。',
  },
  {
    name: '报表与多端外壳',
    description: 'Web/PWA、桌面端、移动端共用同一套业务数据和API。',
  },
]

export const platformModules: PlatformModule[] = [
  {
    id: 'workspace-layout',
    name: '页面布局引擎',
    category: 'base',
    description: '全系统页面卡片、数据块和模块的锁定、解锁、拖拽排序和组合。',
    dependsOn: [],
    enabled: true,
    stage: '已接入',
  },
  {
    id: 'candidate',
    name: '候选人档案',
    category: 'base',
    description: '候选人基础信息、来源、岗位、状态和档案入口。',
    dependsOn: [],
    enabled: true,
    stage: '已接入',
  },
  {
    id: 'risk-compliance-center',
    name: '风险合规中心',
    category: 'base',
    description: '口述需求、岗位标准、SOP草稿、安全合规边界的风险标红、纠偏建议、安全表达模板和审计要求。',
    dependsOn: [],
    enabled: true,
    stage: '已接入',
  },
  {
    id: 'hr-reference-library',
    name: '国际HR参考库',
    category: 'base',
    description: '沉淀O*NET、SHRM、Oracle HCM、SAP SuccessFactors、Workday、McKinsey、IBM和ISO 30414的岗位、组织、绩效、人才数据结构参考。',
    dependsOn: ['candidate'],
    enabled: true,
    stage: '已接入',
  },
  {
    id: 'resume-scoring',
    name: '简历评分引擎',
    category: 'business',
    description: '工作年限、专业匹配、成果、时间线和跳槽风险评分。',
    dependsOn: ['candidate'],
    enabled: true,
    stage: '已接入',
  },
  {
    id: 'first-evaluation',
    name: '9维初试评估',
    category: 'business',
    description: '通用人事初试9大维度评分和推荐复试结果。',
    dependsOn: ['candidate', 'resume-scoring'],
    enabled: true,
    stage: '已接入',
  },
  {
    id: 'business-questionnaire',
    name: '岗位面试问卷',
    category: 'business',
    description: '按销售、财务、技术等岗位加载红绿蓝特征规则和专业精准题库。',
    dependsOn: ['candidate'],
    enabled: true,
    stage: '已接入',
  },
  {
    id: 'audio-asr',
    name: '录音解析',
    category: 'ai',
    description: '面试录音上传、ASR转写、结构化提取、表单回填、HR电话质检和自愿文化备注隔离。',
    dependsOn: ['candidate'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'port-agent',
    name: '端口Agent',
    category: 'ai',
    description: '合并Agent Skills、多端下载、APP/PWA安装、短信/邮件/二维码/链接触达、AI邀约面试和结构化回填。',
    dependsOn: ['candidate', 'business-questionnaire', 'invitation-channel-hub'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'ai-invitation-interview',
    name: 'AI邀约/AI面试',
    category: 'ai',
    description: 'AI文字邀约、AI语音面试、自我介绍提炼、三回合追问、报告生成和人工确认。',
    dependsOn: ['candidate', 'port-agent', 'invitation-channel-hub'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'mail-import',
    name: '邀约处理/回复系统',
    category: 'integration',
    description: '邮件首选，统一处理微信、企微、电话、短信的邀约草稿、问答话术和人工确认发送。',
    dependsOn: ['candidate', 'resume-scoring'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'recruiting-account-hub',
    name: '招聘账号连接中心',
    category: 'integration',
    description: '多招聘账号连接、扫码/验证码授权、连接状态和负责人管理。',
    dependsOn: ['candidate'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'multi-platform-i18n',
    name: '多语言/多平台适配层',
    category: 'integration',
    description: '简体、繁体、英文、全球语言智库，以及BOSS、LinkedIn、猎聘、智联、51job、香港平台适配器预留。',
    dependsOn: ['recruiting-account-hub'],
    enabled: true,
    stage: '预留',
  },
  {
    id: 'job-publishing',
    name: '岗位AI发布',
    category: 'ai',
    description: '语音提取、AI补全JD、多账号发布、岗位卡片动态数据归集。',
    dependsOn: ['candidate', 'recruiting-account-hub'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'invitation-channel-hub',
    name: '第三方邀约通道中心',
    category: 'integration',
    description: '邮件、微信、企业微信、电话、短信等第三方邀约账号绑定、公司主体、专用邮箱、路由和发送队列。',
    dependsOn: ['candidate'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'labor-part-time',
    name: '合伙兼职',
    category: 'business',
    description: '合伙、兼职、小时工、实习和劳务五类灵活用工管理。',
    dependsOn: ['candidate'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'job-seeker',
    name: '反向求职调研',
    category: 'business',
    description: '以反向求职视角观察同行招聘关键词、薪资区间、岗位要求、岗位匹配标签和市场动态，默认锁定防止私人求职误用。',
    dependsOn: ['candidate', 'resume-scoring'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'review-homework',
    name: '三轮作业中心',
    category: 'business',
    description: '初试、复试、终试作业任务、邮件电话跟踪、答卷评分、存档和优秀案例沉淀。',
    dependsOn: ['candidate', 'first-evaluation'],
    enabled: true,
    stage: '已接入',
  },
  {
    id: 'interview-orchestration',
    name: '灵活面试编排',
    category: 'business',
    description: '简历评估、邀约在线面试、初试、复试、终试和加试的自由组合、面试官抽签/指定、AI问卷、作业题、授权调查和总评。',
    dependsOn: ['candidate', 'first-evaluation', 'business-questionnaire'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'auto-dispatch',
    name: '自动分工/自动排班',
    category: 'business',
    description: '按候选人分数、岗位阈值、面试官池、会议室和通知通道自动分配；变更时间地点条件时做双向确认、电话兜底、报警和应急改派。',
    dependsOn: ['candidate', 'interview-orchestration', 'invitation-channel-hub'],
    enabled: true,
    stage: '开发中',
  },
  {
    id: 'background-check',
    name: 'HR核验',
    category: 'business',
    description: '背调任务、证据记录、风险等级和处理建议。',
    dependsOn: ['candidate'],
    enabled: false,
    stage: '预留',
  },
  {
    id: 'reporting',
    name: '报表看板',
    category: 'report',
    description: '日报、周报、月报、漏斗、颜色阈值和导出。',
    dependsOn: ['candidate'],
    enabled: true,
    stage: '已接入',
  },
]

export const defaultRecruitingWorkflow: WorkflowStep[] = [
  { id: 'step-source', moduleId: 'candidate', label: '候选人进入', required: true },
  { id: 'step-risk-compliance', moduleId: 'risk-compliance-center', label: '风险合规', required: true },
  { id: 'step-hr-reference', moduleId: 'hr-reference-library', label: '国际HR参考库' },
  { id: 'step-resume', moduleId: 'resume-scoring', label: '简历解析评分', required: true },
  { id: 'step-account', moduleId: 'recruiting-account-hub', label: '招聘账号连接' },
  { id: 'step-publish', moduleId: 'job-publishing', label: '岗位AI发布' },
  { id: 'step-invitation-channel', moduleId: 'invitation-channel-hub', label: '第三方邀约通道' },
  { id: 'step-labor', moduleId: 'labor-part-time', label: '合伙兼职分流' },
  { id: 'step-job-seeker', moduleId: 'job-seeker', label: '反向求职调研' },
  { id: 'step-agent', moduleId: 'port-agent', label: '端口Agent' },
  { id: 'step-ai-invitation-interview', moduleId: 'ai-invitation-interview', label: 'AI邀约面试' },
  { id: 'step-audio', moduleId: 'audio-asr', label: '面试录音解析' },
  { id: 'step-first', moduleId: 'first-evaluation', label: '9维初试评分', required: true },
  { id: 'step-business', moduleId: 'business-questionnaire', label: '岗位面试问卷', required: true },
  { id: 'step-interviews', moduleId: 'interview-orchestration', label: '灵活面试编排' },
  { id: 'step-auto-dispatch', moduleId: 'auto-dispatch', label: '自动分工排班' },
  { id: 'step-review', moduleId: 'review-homework', label: '三轮作业' },
  { id: 'step-check', moduleId: 'background-check', label: 'HR核验' },
  { id: 'step-report', moduleId: 'reporting', label: '报表归档', required: true },
]

export function composeWorkflow(steps: WorkflowStep[], modules: PlatformModule[]) {
  const enabledIds = new Set(modules.filter((module) => module.enabled).map((module) => module.id))
  return steps.filter((step) => enabledIds.has(step.moduleId))
}

export function insertWorkflowStep(steps: WorkflowStep[], afterStepId: string, nextStep: WorkflowStep) {
  const index = steps.findIndex((step) => step.id === afterStepId)
  if (index === -1) return [...steps, nextStep]
  return [...steps.slice(0, index + 1), nextStep, ...steps.slice(index + 1)]
}

export function toggleModule(modules: PlatformModule[], moduleId: string) {
  return modules.map((module) => (module.id === moduleId ? { ...module, enabled: !module.enabled } : module))
}

export function moveWorkflowStep(steps: WorkflowStep[], stepId: string, direction: 'up' | 'down') {
  const index = steps.findIndex((step) => step.id === stepId)
  const targetIndex = direction === 'up' ? index - 1 : index + 1

  if (index === -1 || targetIndex < 0 || targetIndex >= steps.length) {
    return [...steps]
  }

  const nextSteps = [...steps]
  const current = nextSteps[index]
  nextSteps[index] = nextSteps[targetIndex]
  nextSteps[targetIndex] = current

  return nextSteps
}

export function validateModuleDependencies(modules: PlatformModule[]) {
  const enabledIds = new Set(modules.filter((module) => module.enabled).map((module) => module.id))
  return modules
    .filter((module) => module.enabled)
    .flatMap((module) =>
      module.dependsOn
        .filter((dependency) => !enabledIds.has(dependency))
        .map((dependency) => `${module.name}缺少依赖模块：${dependency}`),
    )
}
