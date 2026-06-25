export type InterviewRoundId = 'first' | 'second' | 'third' | 'fourth'
export type InterviewArchiveRoundId = 'first' | 'second' | 'final'

export type InterviewerAssignMode = '指定面试官' | '随机抽签'

export type InterviewTaskMode = '现场答题' | '限时回家作业'

export type InterviewProcessStepId =
  | 'resume-evaluation'
  | 'online-invitation'
  | 'online-interview'
  | InterviewRoundId

export type InterviewDecisionOwner = '面试官决定' | '用人单位决定' | '系统管理员决定'

export type InterviewWorkflowTemplateId =
  | 'one-time'
  | 'two-round'
  | 'three-round'
  | 'four-round'
  | 'online-standard'

export type InvestigationItem = {
  id: string
  name: string
  requiresConsent: boolean
  legalChannel: string
}

export type InterviewRoundPlan = {
  id: InterviewRoundId
  name: string
  durationMinutes: number
  interviewerMode: InterviewerAssignMode
  taskMode: InterviewTaskMode
  score: number
}

export type InterviewProcessStep = {
  id: InterviewProcessStepId
  name: string
  category: '前置评估' | '邀约' | '在线面试' | '正式面试'
  durationMinutes: number
  interviewerMode?: InterviewerAssignMode
  taskMode?: InterviewTaskMode
  score?: number
  requiredEvidence: string[]
  note: string
}

export type InterviewWorkflowTemplate = {
  id: InterviewWorkflowTemplateId
  name: string
  description: string
  stepIds: InterviewProcessStepId[]
}

export type InterviewWorkflow = {
  decisionOwner: InterviewDecisionOwner
  interviewRoundCount: number
  steps: InterviewProcessStep[]
  templateId: InterviewWorkflowTemplateId
}

export type InterviewRoundExecutionRow = {
  id: InterviewRoundId
  assignmentScore: number
  dispatchMode: InterviewerAssignMode
  durationMinutes: number
  evidence: string[]
  interviewers: string[]
  interviewScore: number
  livePerformance: string
  location: string
  nextAction: string
  question: string
  questionQuality: string
  roundName: string
  scheduledAt: string
  screeningCategory: string
  sequence: number
  taskMode: InterviewTaskMode
}

export type BackupContactInfo = {
  authorized: boolean
  secondContactName: string
  secondContactPhone: string
  secondContactRelation: string
  backupEmail: string
  backupWechat: string
}

export type InterviewQuestionArchive = {
  id: string
  prompt: string
  answerSummary: string
}

export type InterviewAudioArchive = {
  id: string
  fileName: string
  storagePath: string
  durationSeconds: number
}

export type InterviewScoreArchive = {
  evaluatorName: string
  evaluatorRole: string
  score: number
  summary: string
}

export type InterviewRoundArchive = {
  round: InterviewArchiveRoundId
  questions: InterviewQuestionArchive[]
  audioRecordings: InterviewAudioArchive[]
  audioOutline: string[]
  audioMinutes: string
  interviewerScores: InterviewScoreArchive[]
}

export type CandidateInterviewArchive = {
  candidateId: number
  candidateName: string
  backupContact: BackupContactInfo
  backupContactWarnings: string[]
  retentionItems: string[]
  rounds: InterviewRoundArchive[]
}

export const interviewArchiveRoundLabels: Record<InterviewArchiveRoundId, string> = {
  first: '初试档案',
  final: '终试档案',
  second: '复试档案',
}

const emptyRoundArchive = (round: InterviewArchiveRoundId): InterviewRoundArchive => ({
  audioMinutes: '',
  audioOutline: [],
  audioRecordings: [],
  interviewerScores: [],
  questions: [],
  round,
})

export const interviewArchiveRetentionItems = [
  '所有提问问题',
  '所有对话录音',
  '录音提炼纲要',
  '录音纪要',
  '评估分数',
  '评分人',
  '第二联系人',
  '备用邮箱',
  '备用微信',
]

export const interviewRounds: InterviewRoundPlan[] = [
  {
    durationMinutes: 35,
    id: 'first',
    interviewerMode: '随机抽签',
    name: '初试',
    score: 82,
    taskMode: '限时回家作业',
  },
  {
    durationMinutes: 50,
    id: 'second',
    interviewerMode: '指定面试官',
    name: '复试',
    score: 86,
    taskMode: '现场答题',
  },
  {
    durationMinutes: 60,
    id: 'third',
    interviewerMode: '随机抽签',
    name: '终试',
    score: 88,
    taskMode: '限时回家作业',
  },
]

export const interviewProcessSteps: InterviewProcessStep[] = [
  {
    category: '前置评估',
    durationMinutes: 15,
    id: 'resume-evaluation',
    name: '简历评估',
    note: '先看简历逻辑、专业匹配、稳定性、成绩佐证和风险点，再决定是否进入邀约。',
    requiredEvidence: ['完整简历', '工作时间线', '岗位匹配评分'],
  },
  {
    category: '邀约',
    durationMinutes: 10,
    id: 'online-invitation',
    name: '邀约在线面试',
    note: '通过系统确认电话、微信、邮箱、面试时间和会议入口，变更需要双向确认。',
    requiredEvidence: ['邀约记录', '候选人确认', '备用联系方式'],
  },
  {
    category: '在线面试',
    durationMinutes: 30,
    id: 'online-interview',
    name: '在线面试',
    note: '可以是文字、语音、电话、企微/钉钉/腾讯会议或自建会议，录音转写进入档案。',
    requiredEvidence: ['录音或文字记录', 'AI纪要', '初步评分'],
  },
  {
    category: '正式面试',
    durationMinutes: 35,
    id: 'first',
    interviewerMode: '随机抽签',
    name: '初试',
    note: '低风险或急招岗位可一次性完成评估、谈薪和入职判断。',
    requiredEvidence: ['初试问卷', '岗位能力评分', '薪资条件确认'],
    score: 82,
    taskMode: '限时回家作业',
  },
  {
    category: '正式面试',
    durationMinutes: 50,
    id: 'second',
    interviewerMode: '指定面试官',
    name: '复试',
    note: '复核专业深度、岗位能力、项目真实性和用人部门适配度。',
    requiredEvidence: ['复试问卷', '项目追问', '部门负责人评价'],
    score: 86,
    taskMode: '现场答题',
  },
  {
    category: '正式面试',
    durationMinutes: 60,
    id: 'third',
    interviewerMode: '随机抽签',
    name: '终试',
    note: '核验长期价值、管理/协作能力、背景调查结果和最终风险。',
    requiredEvidence: ['终试问卷', '授权调查结果', '最终评价'],
    score: 88,
    taskMode: '限时回家作业',
  },
  {
    category: '正式面试',
    durationMinutes: 70,
    id: 'fourth',
    interviewerMode: '指定面试官',
    name: '加试/老板终审',
    note: '适合高级管理、关键技术、经营合伙或高风险岗位，由老板或核心负责人在终试后加一道最终确认。',
    requiredEvidence: ['终试纪要', '录用条件确认', '合约/薪酬边界'],
    score: 90,
    taskMode: '现场答题',
  },
]

export const interviewWorkflowTemplates: InterviewWorkflowTemplate[] = [
  {
    description: '适合急招、低风险、候选人条件清晰的岗位，所有关键问题一次谈完。',
    id: 'one-time',
    name: '一次性面试',
    stepIds: ['resume-evaluation', 'online-invitation', 'first'],
  },
  {
    description: '适合普通岗位，HR初试后交由部门负责人复试。',
    id: 'two-round',
    name: '二次面试',
    stepIds: ['resume-evaluation', 'online-invitation', 'online-interview', 'first', 'second'],
  },
  {
    description: '适合核心岗位，增加终试进行真实性、长期价值和最终风险确认。',
    id: 'three-round',
    name: '三次面试',
    stepIds: ['resume-evaluation', 'online-invitation', 'online-interview', 'first', 'second', 'third'],
  },
  {
    description: '适合高级经营、核心技术、合伙岗位或敏感岗位，终试确认薪酬合约和录用边界。',
    id: 'four-round',
    name: '四次面试',
    stepIds: ['resume-evaluation', 'online-invitation', 'online-interview', 'first', 'second', 'third', 'fourth'],
  },
  {
    description: '系统推荐默认流程：先在线邀约和在线面试，再进入初试、复试、终试。',
    id: 'online-standard',
    name: '在线+三轮标准流程',
    stepIds: ['resume-evaluation', 'online-invitation', 'online-interview', 'first', 'second', 'third'],
  },
]

export const investigationItems: InvestigationItem[] = [
  { id: 'identity', legalChannel: '候选人授权资料核验', name: '身份与履历真实性', requiresConsent: true },
  { id: 'education', legalChannel: '学信网/候选人授权材料', name: '学历真实性', requiresConsent: true },
  { id: 'company', legalChannel: '企查查等公开企业信息', name: '公司任职/开公司情况', requiresConsent: true },
  { id: 'judgement', legalChannel: '公开裁判文书与合法授权查询', name: '涉诉公开信息', requiresConsent: true },
  { id: 'reference', legalChannel: '候选人提供证明人电话/邮箱/微信', name: '业绩与经历证明人', requiresConsent: true },
  { id: 'health', legalChannel: '候选人自愿授权体检/岗位适配材料', name: '岗位相关身体体质适配', requiresConsent: true },
  { id: 'reputation', legalChannel: '候选人授权的公开口碑和证明人访谈', name: '口碑和风评', requiresConsent: true },
]

const interviewRoundExecutionDefaults: Record<InterviewRoundId, Pick<
  InterviewRoundExecutionRow,
  'assignmentScore' | 'livePerformance' | 'location' | 'nextAction' | 'question' | 'questionQuality' | 'scheduledAt' | 'screeningCategory'
>> = {
  first: {
    assignmentScore: 78,
    livePerformance: '表达清楚，配合度高，薪资边界需复试继续确认。',
    location: '黑卫士小程序会议 / 线上初试',
    nextAction: '评分达标推进复试；不达标进入储备或放弃。',
    question: '请说明过往岗位中最能证明能力的项目、个人角色、结果数据和佐证材料。',
    questionQuality: '基础筛选题，重点看简历真实性、岗位动机和资料完整度。',
    scheduledAt: '06-21 15:00',
    screeningCategory: '简历筛选分类：基础匹配、稳定性、专业/工种匹配、薪资边界。',
  },
  second: {
    assignmentScore: 84,
    livePerformance: '案例拆解完整，能回答追问，需补作品或作业证明。',
    location: '公司A座 12F 会议室B',
    nextAction: '通过后进入终试；作品不足则限时补交作业。',
    question: '请拆解一个真实项目，说明目标、资源、关键动作、失败点和复盘结果。',
    questionQuality: '专业深挖题，重点看业务逻辑、岗位能力和项目落地水平。',
    scheduledAt: '06-22 10:30',
    screeningCategory: '简历筛选分类：专业深度、业绩贡献、项目真实性、部门适配。',
  },
  third: {
    assignmentScore: 88,
    livePerformance: '长期规划清晰，能接受关键条件，背景授权材料待归档。',
    location: '公司A座 12F 董事会议室',
    nextAction: '通过可签约或提前通过；不匹配则放弃、储备或转人才库。',
    question: '请结合岗位目标说明入职90天计划、成果承诺、资源需求和合作边界。',
    questionQuality: '最终决策题，重点看长期价值、风险边界、签约条件和授权调查结果。',
    scheduledAt: '06-23 16:00',
    screeningCategory: '简历筛选分类：长期价值、管理/协作、风控合规、录用边界。',
  },
  fourth: {
    assignmentScore: 90,
    livePerformance: '老板终审确认合约、分成、绩效目标和高风险岗位边界。',
    location: '老板办公室 / 线上终审会议',
    nextAction: '确认合约后签约；条件未闭合则暂停或继续谈判。',
    question: '请确认岗位目标、绩效成果、薪酬合约、授权调查和入职承诺。',
    questionQuality: '加试终审题，重点看关键岗位最终风险和合作条件。',
    scheduledAt: '06-24 17:00',
    screeningCategory: '简历筛选分类：高阶岗位、关键技术、经营合伙、敏感风险。',
  },
}

export function calculateInterviewTotal(rounds: InterviewRoundPlan[]) {
  if (rounds.length === 0) return 0
  return Math.round(rounds.reduce((sum, round) => sum + round.score, 0) / rounds.length)
}

export function getInterviewWorkflowTemplate(templateId: InterviewWorkflowTemplateId) {
  return interviewWorkflowTemplates.find((template) => template.id === templateId)
}

export function isInterviewRoundStep(step: InterviewProcessStep): step is InterviewProcessStep & { id: InterviewRoundId } {
  return step.category === '正式面试'
}

export function buildInterviewWorkflow(input: {
  decisionOwner: InterviewDecisionOwner
  selectedStepIds?: InterviewProcessStepId[]
  templateId: InterviewWorkflowTemplateId
}): InterviewWorkflow {
  const template = getInterviewWorkflowTemplate(input.templateId) ?? interviewWorkflowTemplates[0]
  const selectedIds = input.selectedStepIds ?? template.stepIds
  const stepMap = new Map(interviewProcessSteps.map((step) => [step.id, step]))
  const steps = selectedIds
    .map((stepId) => stepMap.get(stepId))
    .map((step) => {
      if (!step) return step
      if (template.id === 'one-time' && step.id === 'first') {
        return { ...step, name: '一次性面试' }
      }
      return step
    })
    .filter((step): step is InterviewProcessStep => Boolean(step))

  return {
    decisionOwner: input.decisionOwner,
    interviewRoundCount: steps.filter(isInterviewRoundStep).length,
    steps,
    templateId: template.id,
  }
}

export function summarizeInterviewWorkflow(workflow: InterviewWorkflow) {
  const stepNames = workflow.steps.map((step) => step.name).join(' -> ')
  return `${workflow.decisionOwner}，当前流程共${workflow.steps.length}个环节，其中${workflow.interviewRoundCount}个面试轮次：${stepNames}`
}

export function assignInterviewers(
  interviewers: string[],
  mode: InterviewerAssignMode,
  designated?: string,
) {
  if (mode === '指定面试官') return designated ? [designated] : []
  return interviewers.slice(0, Math.min(2, interviewers.length))
}

export function buildInterviewRoundExecutionRows(input: {
  designatedInterviewers?: Partial<Record<InterviewRoundId, string>>
  interviewerPool: string[]
  workflow: InterviewWorkflow
}): InterviewRoundExecutionRow[] {
  return input.workflow.steps
    .filter(isInterviewRoundStep)
    .map((step, index) => {
      const dispatchMode = step.interviewerMode ?? '随机抽签'
      const defaults = interviewRoundExecutionDefaults[step.id]

      return {
        assignmentScore: defaults.assignmentScore,
        dispatchMode,
        durationMinutes: step.durationMinutes,
        evidence: step.requiredEvidence,
        id: step.id,
        interviewers: assignInterviewers(input.interviewerPool, dispatchMode, input.designatedInterviewers?.[step.id]),
        interviewScore: step.score ?? 0,
        livePerformance: defaults.livePerformance,
        location: defaults.location,
        nextAction: defaults.nextAction,
        question: defaults.question,
        questionQuality: defaults.questionQuality,
        roundName: step.name,
        scheduledAt: defaults.scheduledAt,
        screeningCategory: defaults.screeningCategory,
        sequence: index + 1,
        taskMode: step.taskMode ?? '现场答题',
      }
    })
}

export function allInvestigationsRequireConsent(items: InvestigationItem[]) {
  return items.every((item) => item.requiresConsent)
}

export function missingBackupContactFields(contact: BackupContactInfo) {
  const missing: string[] = []

  if (!contact.authorized) missing.push('候选人授权')
  if (!contact.secondContactName.trim()) missing.push('第二联系人姓名')
  if (!contact.secondContactPhone.trim()) missing.push('第二联系人电话')
  if (!contact.secondContactRelation.trim()) missing.push('第二联系人关系')
  if (!contact.backupEmail.trim()) missing.push('备用邮箱')
  if (!contact.backupWechat.trim()) missing.push('备用微信')

  return missing
}

export function roundArchiveCompleteness(round: InterviewRoundArchive) {
  const missing: string[] = []

  if (round.questions.length === 0) missing.push('所有提问问题')
  if (round.audioRecordings.length === 0) missing.push('对话录音')
  if (round.audioOutline.length === 0) missing.push('录音提炼纲要')
  if (!round.audioMinutes.trim()) missing.push('录音纪要')
  if (round.interviewerScores.length === 0) missing.push('评估评分和评分人')

  return {
    complete: missing.length === 0,
    missing,
  }
}

export function createCandidateInterviewArchive(input: {
  backupContact: BackupContactInfo
  candidateId: number
  candidateName: string
  rounds: InterviewRoundArchive[]
}): CandidateInterviewArchive {
  const roundMap = new Map(input.rounds.map((round) => [round.round, round]))

  return {
    backupContact: input.backupContact,
    backupContactWarnings: missingBackupContactFields(input.backupContact),
    candidateId: input.candidateId,
    candidateName: input.candidateName,
    retentionItems: interviewArchiveRetentionItems,
    rounds: (['first', 'second', 'final'] as InterviewArchiveRoundId[]).map(
      (round) => roundMap.get(round) ?? emptyRoundArchive(round),
    ),
  }
}
