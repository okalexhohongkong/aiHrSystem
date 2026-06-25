export type CulturalNotePolicy = {
  allowedVoluntaryTopics: string[]
  canRecordWithConsent: boolean
  excludedFromScoring: boolean
  excludedFromHiringDecision: boolean
  mustBeCandidateInitiatedOrAccepted: boolean
  canBeUsedForRapportOnly: boolean
  requiresCandidateBeliefAndConsent: boolean
  note: string
  interviewerPrompt: string
}

export type HrCallQualityItem = {
  id: string
  label: string
  completed: boolean
  weight: number
}

export const culturalNotePolicy: CulturalNotePolicy = {
  allowedVoluntaryTopics: ['塔罗牌', '星座', '八字', '五行', '其他候选人自愿文化兴趣'],
  canRecordWithConsent: true,
  canBeUsedForRapportOnly: true,
  excludedFromHiringDecision: true,
  excludedFromScoring: true,
  interviewerPrompt: '如候选人自己相信或愿意聊塔罗牌、星座、八字等文化兴趣，可礼貌确认是否愿意作为沟通偏好备注；不主动追问，不要求提供。',
  mustBeCandidateInitiatedOrAccepted: true,
  requiresCandidateBeliefAndConsent: true,
  note: '塔罗牌、星座、八字、五行等内容只能在候选人相信且明确愿意提供时，作为自愿文化兴趣备注隔离保存；不用于岗位匹配、稳定性预测、性格预测、录用或淘汰决策。',
}

export const hrCallQualityItems: HrCallQualityItem[] = [
  { completed: true, id: 'identity', label: '确认候选人姓名、岗位和当前求职状态', weight: 15 },
  { completed: true, id: 'resume', label: '追问简历关键经历、业绩和时间线', weight: 20 },
  { completed: true, id: 'salary', label: '确认期望薪资、到岗时间和面试时间', weight: 15 },
  { completed: false, id: 'consent', label: '说明录音、资料使用和后续授权调查边界', weight: 20 },
  { completed: true, id: 'next-step', label: '告知下一步流程、作业或复试安排', weight: 15 },
  { completed: true, id: 'tone', label: '沟通礼貌、清晰、没有诱导或歧视性问题', weight: 15 },
]

export function hrCallQualityScore(items: HrCallQualityItem[]) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  if (totalWeight === 0) return 0
  const completedWeight = items.filter((item) => item.completed).reduce((sum, item) => sum + item.weight, 0)
  return Math.round((completedWeight / totalWeight) * 100)
}

export function culturalNoteCanAffectScore(policy: CulturalNotePolicy) {
  return !policy.excludedFromScoring || !policy.excludedFromHiringDecision
}

export function culturalNoteCanBeRecorded(policy: CulturalNotePolicy, candidateBelieves: boolean, candidateConsents: boolean) {
  if (!policy.canRecordWithConsent) return false
  if (!policy.requiresCandidateBeliefAndConsent) return candidateConsents
  return candidateBelieves && candidateConsents
}
