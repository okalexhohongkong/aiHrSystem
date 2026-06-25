import type { Candidate, CandidateDataFieldStatus } from '../data'
import { buildJobCodeProfile, type JobCodeProfile } from './jobPublishing'

export type CandidatePoolSort = 'newest' | 'oldest' | 'scoreHigh' | 'scoreLow' | 'matchHigh'

export type CandidatePoolColumn =
  | 'activity'
  | 'contact'
  | 'fieldStatus'
  | 'matchStatus'
  | 'peerWeight'
  | 'salary'
  | 'location'
  | 'experience'
  | 'major'
  | 'availability'
  | 'education'
  | 'skills'

export const defaultCandidatePoolColumns: CandidatePoolColumn[] = [
  'activity',
  'peerWeight',
  'contact',
  'matchStatus',
  'fieldStatus',
  'salary',
  'location',
  'experience',
  'major',
  'availability',
  'education',
  'skills',
]

export const candidatePoolColumnLabels: Record<CandidatePoolColumn, string> = {
  activity: '平台活跃度来源',
  availability: '在离职',
  contact: '资料状态',
  education: '学历',
  experience: '工作经历',
  fieldStatus: '资料完整度',
  location: '城市',
  major: '专业/工种',
  matchStatus: '全向匹配度',
  peerWeight: '同业同行权重',
  salary: '期望薪酬',
  skills: '技能标签',
}

export const restrictedCandidateFields = [
  '婚育状态',
  '宗教信仰',
  '政治身份',
  '身份证归属地',
  '祖籍',
]

export const defaultCandidateFocusTags = [
  '会开车',
  'Office',
  'AI工具',
  '会写代码',
  '专利',
  '奖项',
  '0-1项目',
  '项目经理',
  '业绩清晰',
  '第一学历本科及以上',
]

export const suggestedCandidateFocusTags = [
  ...defaultCandidateFocusTags,
  '能喝酒',
  '双学历',
  '学术成果',
  '爆款案例',
  '稳定性强',
  '专业匹配',
  '可快速到岗',
  'CRM',
  '预算',
  '内控',
  'Python',
]

export type CandidateDisplayDensity = 'normal' | 'compact' | 'micro'
export type CandidateBoardRowTone = 'white' | 'light-blue'
export type CandidateKeywordTone = 'red' | 'orange' | 'blue' | 'green' | 'black'

export const candidateBoardLayoutPreference = {
  mode: 'horizontal-rows',
  primaryTone: 'deep-blue',
  rowStripe: ['white', 'light-blue'],
  title: '候选看板',
} as const

export const candidateFieldToggleLayoutPreference = {
  gapPx: 5,
  horizontalPaddingEm: 0.65,
  sizing: 'content-fit',
} as const

export function candidateBoardRowTone(index: number): CandidateBoardRowTone {
  return index % 2 === 0 ? 'white' : 'light-blue'
}

export function candidateBoardTimeText(appliedAt: string) {
  const match = appliedAt.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/)
  if (!match) return appliedAt
  const [, year, month, day, hour, minute] = match
  return `${year.slice(2)} ${month}${day} ${hour}:${minute}`
}

export function candidateJobCodeProfile(candidate: Pick<Candidate, 'postName' | 'postType'>): JobCodeProfile {
  const byPostType: Record<Candidate['postType'], string> = {
    finance: 'FIN',
    function: 'FN',
    hr: 'HR',
    management: 'GM',
    operation: 'OPS',
    sales: 'BD',
    tech: 'AI',
  }

  const profile = buildJobCodeProfile(candidate.postName)

  return profile.jobCode === 'ROLE'
    ? { englishTitle: profile.englishTitle, jobCode: byPostType[candidate.postType] }
    : profile
}

export function candidateJobCode(candidate: Pick<Candidate, 'postName' | 'postType'>) {
  return candidateJobCodeProfile(candidate).jobCode
}

export function candidatePlatformAccountText(candidate: Candidate) {
  const sourceCode: Record<Candidate['source'], string> = {
    BOSS手动导入: 'BOSS',
    内推: 'REF',
    文件上传: 'FILE',
    招聘邮箱: 'MAIL',
  }

  return `${sourceCode[candidate.source]}-${String(candidate.id).padStart(4, '0')}`
}

export function candidateKeywordTone(keyword: string): CandidateKeywordTone {
  const redKeywords = ['风险', '时间线冲突', '方向切换多', '不配合', '低配合', '作假', '逾期']
  const orangeKeywords = ['待补充', '待核验', '可储备', '未知', '未命中', '待提交']
  const greenKeywords = ['业绩清晰', '稳定性强', '专业匹配', '可快速到岗', '0-1项目', '项目经理', '爆款案例', '双学历', '专利', '奖项']
  const blueKeywords = ['AI工具', '会写代码', 'Python', 'Office', 'CRM', '预算', '内控', '剪辑', '脚本', '账号运营']

  if (redKeywords.some((item) => keyword.includes(item))) return 'red'
  if (orangeKeywords.some((item) => keyword.includes(item))) return 'orange'
  if (greenKeywords.some((item) => keyword.includes(item))) return 'green'
  if (blueKeywords.some((item) => keyword.includes(item))) return 'blue'
  return 'black'
}

export function sortCandidatesByApplyTime(candidates: Candidate[], direction: CandidatePoolSort) {
  return [...candidates].sort((left, right) => {
    const diff = new Date(right.appliedAt).getTime() - new Date(left.appliedAt).getTime()
    return direction === 'newest' ? diff : -diff
  })
}

export function candidateMatchScore(candidate: Candidate, focusTags: string[] = defaultCandidateFocusTags) {
  const focusMatchRatio = focusTags.length ? candidateFocusMatches(candidate, focusTags).length / focusTags.length : 0
  const fieldCounts = dataFieldStatusCounts(candidate)
  const collectableFields = fieldCounts['已采集'] + fieldCounts['待补充'] + fieldCounts['不可获取']
  const fieldCompleteness = collectableFields === 0 ? 0 : fieldCounts['已采集'] / collectableFields
  const peerKeywordScore = Math.min(100, (candidate.customFlags.length + candidate.skillTags.length) * 8)
  const cooperationBonus = { 不配合: 0, 中配合: 8, 低配合: 2, 高配合: 12 }[candidate.cooperationLevel]

  return Math.round(
    candidate.totalScore * 0.45 +
      focusMatchRatio * 100 * 0.25 +
      fieldCompleteness * 100 * 0.15 +
      peerKeywordScore * 0.1 +
      cooperationBonus,
  )
}

export function candidateMatchStatus(score: number) {
  if (score >= 80) return { label: '高匹配', tone: 'green' as const }
  if (score >= 65) return { label: '较匹配', tone: 'blue' as const }
  if (score >= 50) return { label: '可储备', tone: 'orange' as const }
  return { label: '低匹配', tone: 'red' as const }
}

export function sortCandidates(
  candidates: Candidate[],
  sort: CandidatePoolSort,
  focusTags: string[] = defaultCandidateFocusTags,
) {
  if (sort === 'newest' || sort === 'oldest') {
    return sortCandidatesByApplyTime(candidates, sort)
  }

  return [...candidates].sort((left, right) => {
    if (sort === 'scoreHigh') return right.totalScore - left.totalScore
    if (sort === 'scoreLow') return left.totalScore - right.totalScore
    return candidateMatchScore(right, focusTags) - candidateMatchScore(left, focusTags)
  })
}

export function toggleCandidatePoolColumn(columns: CandidatePoolColumn[], column: CandidatePoolColumn) {
  if (columns.includes(column)) {
    return columns.filter((item) => item !== column)
  }
  return [...columns, column]
}

export function addManualDisplayField(fields: string[], label: string) {
  const nextLabel = label.trim()
  if (!nextLabel || fields.includes(nextLabel)) return fields
  return [...fields, nextLabel]
}

export function displayFieldDensityClass(count: number): CandidateDisplayDensity {
  if (count >= 20) return 'micro'
  if (count >= 12) return 'compact'
  return 'normal'
}

export function totalWorkYears(candidate: Candidate) {
  return candidate.evaluationInput.workExperiences.reduce(
    (sum, experience) => sum + Math.max(0, experience.endYear - experience.startYear),
    0,
  )
}

export function jobCount(candidate: Candidate) {
  return candidate.evaluationInput.workExperiences.length
}

export function jobHopSummary(candidate: Candidate) {
  const years = totalWorkYears(candidate)
  const count = jobCount(candidate)
  if (years === 0) return `${count}份工作 / 年限待核`
  return `${count}份工作 / ${years}年 / 平均${(years / count).toFixed(1)}年一份`
}

export function salaryRangeText(candidate: Candidate) {
  return `${candidate.expectedSalaryMin}-${candidate.expectedSalaryMax}K`
}

export function externalApplicationText(candidate: Candidate) {
  const { externalApplicationCount, externalApplicationSource } = candidate.platformActivity
  if (externalApplicationCount === null) return `外部投递：${externalApplicationSource}`
  return `外部投递：${externalApplicationCount}份（${externalApplicationSource}）`
}

export function lastVisibleActiveText(candidate: Candidate) {
  const { lastVisibleActiveAt } = candidate.platformActivity
  if (!lastVisibleActiveAt) return '最近活跃：暂无可见信息'
  return `最近活跃：${new Date(lastVisibleActiveAt).toLocaleString('zh-CN', { dateStyle: 'short', timeStyle: 'short' })}`
}

export function dataFieldStatusCounts(candidate: Candidate) {
  const counts: Record<CandidateDataFieldStatus, number> = {
    不可获取: 0,
    受限不采集: 0,
    已采集: 0,
    待补充: 0,
  }

  candidate.dataFieldSignals.forEach((field) => {
    counts[field.status] += 1
  })

  return counts
}

export function candidateFocusMatches(candidate: Candidate, focusTags: string[]) {
  const profileTags = new Set([...candidate.skillTags, ...candidate.customFlags])
  const derivedTags = new Set<string>()

  if (candidate.firstDegreeLevel !== '高中/中专' && candidate.firstDegreeLevel !== '大专') {
    derivedTags.add('第一学历本科及以上')
  }
  if (candidate.educationLevel === '硕士' || candidate.educationLevel === '博士') {
    derivedTags.add('硕士及以上')
  }
  if (candidate.evaluationInput.majorMatchesPost) {
    derivedTags.add('专业匹配')
  }
  if (candidate.availabilityStatus === '离职' || candidate.availabilityStatus === '应届') {
    derivedTags.add('可快速到岗')
  }
  if (totalWorkYears(candidate) >= 10) {
    derivedTags.add('10年以上经验')
  }

  return focusTags.filter((tag) => profileTags.has(tag) || derivedTags.has(tag))
}

export type CandidateTalentLayer = '执行层' | '基层干部' | '中层干部' | '高层干部' | '技术层' | '决策层'

export type CandidateApplyTimeWindowLabel = '黄金跟进' | '有效跟进' | '延迟跟进' | '超时沉淀' | '时间待核'

export type CandidateApplyTimeWindowResult = {
  hoursSinceApplied: number | null
  label: CandidateApplyTimeWindowLabel
  reason: string
  timeoutRisk: '低' | '中' | '高'
  urgencyPoints: number
}

export type CandidateArchiveAdvice = {
  decision: '暂不沉淀' | '轻量入库' | '分层沉淀'
  library: string
  notes: string
  reviewCadence: '本轮跟进后再评估' | '14天复评' | '30天复评' | '60天复评'
}

export type CandidateFollowupStrategyInput = {
  candidate: Candidate
  focusTags?: string[]
  modelScore?: number
  now: string
  salaryBudgetMax: number
  salaryBudgetMin: number
  talentLayer: CandidateTalentLayer
}

export type CandidateFollowupPriority = '立即联系' | '优先跟进' | '常规跟进' | '入库观察'

export type CandidateFollowupStrategy = {
  aiFallbackBoundary: string
  archiveAdvice: CandidateArchiveAdvice
  modelScore: number
  nextAction: string
  owner: '人工HR'
  postWorkType: string
  priority: CandidateFollowupPriority
  reasons: string[]
  salaryMatchPercent: number
  talentLayer: CandidateTalentLayer
  timeWindow: CandidateApplyTimeWindowResult
  urgencyScore: number
}

export type AiFallbackTemplate = {
  approvedByAdmin: boolean
  content: string
  id: string
  riskLevel: '低' | '中' | '高'
  title: string
}

export type AiTimeoutFallbackAuditEvent = {
  actor: 'system'
  at: string
  detail: string
  event: '人工等待中' | '人工超时' | '时间待核' | '预审话术命中' | '预审话术缺失' | '外发拦截'
}

export type AiTimeoutFallbackStrategyInput = {
  candidate: Pick<Candidate, 'name' | 'postName'>
  lastHumanActionAt: string
  manualOwner: string
  now: string
  templateId?: string
  templates?: AiFallbackTemplate[]
  timeoutMinutes: number
}

export type AiTimeoutFallbackStrategy = {
  auditTrail: AiTimeoutFallbackAuditEvent[]
  canUseAiFallback: boolean
  externalSendAllowed: false
  messageDraft: string
  minutesSinceLastHumanAction: number | null
  mode: '人工优先等待' | 'AI超时兜底草稿' | '无可用预审话术'
  nextAction: string
  selectedTemplate: AiFallbackTemplate | null
}

export const defaultAiTimeoutFallbackTemplates: AiFallbackTemplate[] = [
  {
    approvedByAdmin: true,
    content:
      '您好，{candidateName}，我们已收到您投递的{postName}。HR会尽快完成预审，如需补充材料会再与您确认。感谢您的耐心等待。',
    id: 'resume-received-basic',
    riskLevel: '低',
    title: '已收到简历低风险兜底',
  },
  {
    approvedByAdmin: true,
    content:
      '您好，{candidateName}，您的{postName}投递已进入资料核对环节。当前仅确认收悉，不代表面试或录用承诺。',
    id: 'profile-reviewing-basic',
    riskLevel: '低',
    title: '资料核对低风险兜底',
  },
]

const minuteMs = 60 * 1000
const hourMs = 60 * minuteMs

const candidatePostTypeLabels: Record<Candidate['postType'], string> = {
  finance: '财务',
  function: '职能',
  hr: '人事',
  management: '管理',
  operation: '运营',
  sales: '销售',
  tech: '技术',
}

const strategicTalentLayers: CandidateTalentLayer[] = ['中层干部', '高层干部', '技术层', '决策层']

function minutesBetween(start: string, end: string) {
  const startMs = Date.parse(start)
  const endMs = Date.parse(end)

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return null
  return Math.max(0, Math.round((endMs - startMs) / minuteMs))
}

function candidateSalaryMatchPercent(candidate: Candidate, salaryBudgetMin: number, salaryBudgetMax: number) {
  const expectedMin = Math.min(candidate.expectedSalaryMin, candidate.expectedSalaryMax)
  const expectedMax = Math.max(candidate.expectedSalaryMin, candidate.expectedSalaryMax)
  const budgetMin = Math.min(salaryBudgetMin, salaryBudgetMax)
  const budgetMax = Math.max(salaryBudgetMin, salaryBudgetMax)
  const expectedRange = Math.max(1, expectedMax - expectedMin)
  const overlap = Math.max(0, Math.min(expectedMax, budgetMax) - Math.max(expectedMin, budgetMin))

  if (overlap >= expectedRange) return 100
  if (overlap > 0) return Math.round(65 + (overlap / expectedRange) * 30)

  const gap = expectedMin > budgetMax ? expectedMin - budgetMax : budgetMin - expectedMax
  const expectedMidpoint = Math.max(1, (expectedMin + expectedMax) / 2)

  return Math.max(0, Math.round(70 - (gap / expectedMidpoint) * 100))
}

function postTypeUrgencyPoints(postType: Candidate['postType']) {
  const points: Record<Candidate['postType'], number> = {
    finance: 5,
    function: 3,
    hr: 3,
    management: 6,
    operation: 4,
    sales: 6,
    tech: 8,
  }

  return points[postType]
}

function clampUrgencyScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)))
}

function buildArchiveAdvice(
  priority: CandidateFollowupPriority,
  input: CandidateFollowupStrategyInput,
  salaryMatchPercent: number,
  timeWindow: CandidateApplyTimeWindowResult,
): CandidateArchiveAdvice {
  const postWorkType = candidatePostTypeLabels[input.candidate.postType]

  if (priority === '立即联系' || priority === '优先跟进') {
    return {
      decision: '暂不沉淀',
      library: `${postWorkType}在跟进候选池`,
      notes: '当前仍应由人工HR优先推进，跟进结果出来后再决定是否沉淀。',
      reviewCadence: '本轮跟进后再评估',
    }
  }

  const notes: string[] = []
  if (timeWindow.label === '超时沉淀') notes.push('投递时效已衰减')
  if (salaryMatchPercent < 70) notes.push('薪酬差距需复核')
  if (input.candidate.risks.length > 0) notes.push('风险标签需人工复核')
  if (notes.length === 0) notes.push('保留岗位线索，等待岗位预算或时机变化')

  if (priority === '入库观察' || timeWindow.label === '超时沉淀' || salaryMatchPercent < 70) {
    return {
      decision: '分层沉淀',
      library: `${input.talentLayer}人才库`,
      notes: notes.join('；'),
      reviewCadence: strategicTalentLayers.includes(input.talentLayer) ? '30天复评' : '60天复评',
    }
  }

  return {
    decision: '轻量入库',
    library: `${postWorkType}候选池`,
    notes: notes.join('；'),
    reviewCadence: '14天复评',
  }
}

function fallbackMessage(template: AiFallbackTemplate, candidate: Pick<Candidate, 'name' | 'postName'>) {
  return template.content.replaceAll('{candidateName}', candidate.name).replaceAll('{postName}', candidate.postName)
}

export function candidateApplyTimeWindow(appliedAt: string, now: string): CandidateApplyTimeWindowResult {
  const appliedMs = Date.parse(appliedAt)
  const nowMs = Date.parse(now)

  if (!Number.isFinite(appliedMs) || !Number.isFinite(nowMs)) {
    return {
      hoursSinceApplied: null,
      label: '时间待核',
      reason: '投递时间无法识别，需人工核对时效。',
      timeoutRisk: '中',
      urgencyPoints: 0,
    }
  }

  const hoursSinceApplied = Math.max(0, Math.round(((nowMs - appliedMs) / hourMs) * 10) / 10)

  if (hoursSinceApplied <= 6) {
    return {
      hoursSinceApplied,
      label: '黄金跟进',
      reason: '投递仍在黄金跟进期',
      timeoutRisk: '低',
      urgencyPoints: 30,
    }
  }

  if (hoursSinceApplied <= 24) {
    return {
      hoursSinceApplied,
      label: '有效跟进',
      reason: '投递仍在有效跟进期',
      timeoutRisk: '低',
      urgencyPoints: 18,
    }
  }

  if (hoursSinceApplied <= 48) {
    return {
      hoursSinceApplied,
      label: '延迟跟进',
      reason: '投递接近时效尾声',
      timeoutRisk: '中',
      urgencyPoints: 6,
    }
  }

  return {
    hoursSinceApplied,
    label: '超时沉淀',
    reason: '投递已超48小时',
    timeoutRisk: '高',
    urgencyPoints: -12,
  }
}

export function buildCandidateFollowupStrategy(input: CandidateFollowupStrategyInput): CandidateFollowupStrategy {
  const focusTags = input.focusTags ?? defaultCandidateFocusTags
  const modelScore = input.modelScore ?? candidateMatchScore(input.candidate, focusTags)
  const salaryMatchPercent = candidateSalaryMatchPercent(
    input.candidate,
    input.salaryBudgetMin,
    input.salaryBudgetMax,
  )
  const timeWindow = candidateApplyTimeWindow(input.candidate.appliedAt, input.now)
  const postWorkType = candidatePostTypeLabels[input.candidate.postType]
  const reasons = [timeWindow.reason]
  let urgencyScore = timeWindow.urgencyPoints

  if (modelScore >= 80) {
    urgencyScore += 42
    reasons.push('优秀候选人')
  } else if (modelScore >= 70) {
    urgencyScore += 28
    reasons.push('较优候选人')
  } else if (modelScore >= 55) {
    urgencyScore += 12
    reasons.push('可储备候选人')
  } else {
    urgencyScore += 4
    reasons.push('低匹配候选人')
  }

  if (salaryMatchPercent >= 90) {
    urgencyScore += 18
    reasons.push('薪酬高度匹配')
  } else if (salaryMatchPercent >= 75) {
    urgencyScore += 10
    reasons.push('薪酬可谈')
  } else {
    urgencyScore -= 10
    reasons.push('薪酬匹配低')
  }

  if (strategicTalentLayers.includes(input.talentLayer)) {
    urgencyScore += 14
    reasons.push('干部/技术/决策层')
  } else if (input.talentLayer === '基层干部') {
    urgencyScore += 8
    reasons.push('基层干部')
  } else {
    urgencyScore += 3
    reasons.push('执行层')
  }

  urgencyScore += postTypeUrgencyPoints(input.candidate.postType)
  reasons.push(`岗位工种为${postWorkType}`)

  const clampedScore = clampUrgencyScore(urgencyScore)
  const priority: CandidateFollowupPriority =
    clampedScore >= 90
      ? '立即联系'
      : clampedScore >= 75
        ? '优先跟进'
        : clampedScore >= 45
          ? '常规跟进'
          : '入库观察'
  const archiveAdvice = buildArchiveAdvice(priority, input, salaryMatchPercent, timeWindow)
  const nextAction =
    priority === '立即联系'
      ? '人工HR立即电话或微信跟进，AI仅保留超时兜底草稿策略，不自动外发。'
      : priority === '优先跟进'
        ? '人工HR在本工作时段内完成首轮触达，逾期后只允许使用预审低风险兜底草稿。'
        : priority === '常规跟进'
          ? '人工HR排入常规队列，先补齐关键信息，再决定是否沉淀。'
          : '人工HR标记入库观察，记录时效、薪酬和岗位差距，等待复评。'

  return {
    aiFallbackBoundary: '人工优先；超过限定时间后，AI只生成管理员预审过的低风险默认话术草稿并留痕，不执行真实外发。',
    archiveAdvice,
    modelScore,
    nextAction,
    owner: '人工HR',
    postWorkType,
    priority,
    reasons,
    salaryMatchPercent,
    talentLayer: input.talentLayer,
    timeWindow,
    urgencyScore: clampedScore,
  }
}

export function buildAiTimeoutFallbackStrategy(
  input: AiTimeoutFallbackStrategyInput,
): AiTimeoutFallbackStrategy {
  const minutesSinceLastHumanAction = minutesBetween(input.lastHumanActionAt, input.now)
  const auditTrail: AiTimeoutFallbackAuditEvent[] = []

  if (minutesSinceLastHumanAction === null) {
    auditTrail.push({
      actor: 'system',
      at: input.now,
      detail: '人工最后动作时间无法识别，保持人工优先。',
      event: '时间待核',
    })

    return {
      auditTrail,
      canUseAiFallback: false,
      externalSendAllowed: false,
      messageDraft: '',
      minutesSinceLastHumanAction,
      mode: '人工优先等待',
      nextAction: `${input.manualOwner}先核对人工跟进时间，AI不生成兜底话术。`,
      selectedTemplate: null,
    }
  }

  if (minutesSinceLastHumanAction < input.timeoutMinutes) {
    auditTrail.push({
      actor: 'system',
      at: input.now,
      detail: `已等待${minutesSinceLastHumanAction}分钟，未超过${input.timeoutMinutes}分钟。`,
      event: '人工等待中',
    })

    return {
      auditTrail,
      canUseAiFallback: false,
      externalSendAllowed: false,
      messageDraft: '',
      minutesSinceLastHumanAction,
      mode: '人工优先等待',
      nextAction: `继续等待${input.manualOwner}人工处理，AI不介入外发。`,
      selectedTemplate: null,
    }
  }

  auditTrail.push({
    actor: 'system',
    at: input.now,
    detail: `已等待${minutesSinceLastHumanAction}分钟，超过${input.timeoutMinutes}分钟。`,
    event: '人工超时',
  })

  const templates = input.templates ?? defaultAiTimeoutFallbackTemplates
  const safeTemplates = templates.filter((template) => template.approvedByAdmin && template.riskLevel === '低')
  const selectedTemplate =
    safeTemplates.find((template) => template.id === input.templateId) ?? (input.templateId ? undefined : safeTemplates[0])

  if (!selectedTemplate) {
    auditTrail.push({
      actor: 'system',
      at: input.now,
      detail: '没有命中管理员预审且低风险的话术。',
      event: '预审话术缺失',
    })
    auditTrail.push({
      actor: 'system',
      at: input.now,
      detail: '本模块不调用外发接口，缺少安全话术时必须保持拦截。',
      event: '外发拦截',
    })

    return {
      auditTrail,
      canUseAiFallback: false,
      externalSendAllowed: false,
      messageDraft: '',
      minutesSinceLastHumanAction,
      mode: '无可用预审话术',
      nextAction: `${input.manualOwner}需补充或审批低风险默认话术后再处理。`,
      selectedTemplate: null,
    }
  }

  auditTrail.push({
    actor: 'system',
    at: input.now,
    detail: `命中管理员预审话术：${selectedTemplate.title}。`,
    event: '预审话术命中',
  })
  auditTrail.push({
    actor: 'system',
    at: input.now,
    detail: '本模块只生成兜底草稿和留痕，不调用真实外发。',
    event: '外发拦截',
  })

  return {
    auditTrail,
    canUseAiFallback: true,
    externalSendAllowed: false,
    messageDraft: fallbackMessage(selectedTemplate, input.candidate),
    minutesSinceLastHumanAction,
    mode: 'AI超时兜底草稿',
    nextAction: '生成低风险兜底草稿并记录审计轨迹，等待管理员或人工HR确认后由外部流程处理。',
    selectedTemplate,
  }
}
