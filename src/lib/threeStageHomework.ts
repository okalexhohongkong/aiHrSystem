export type HomeworkRound = 'first' | 'second' | 'final'
export type HomeworkFollowStatus = '未发送' | '已发送' | '待跟进' | '已确认'
export type HomeworkAnswerStatus = '未提交' | '已提交' | '需补交' | '放弃'
export type HomeworkArchiveStatus = '未归档' | '已归档' | '优秀案例'

export type HomeworkScoreItem = {
  label: string
  score: number
  weight: number
}

export type ThreeStageHomeworkTask = {
  id: string
  round: HomeworkRound
  title: string
  candidateName: string
  jobName: string
  questionOwner: string
  examiner: string
  answerSystem: string
  trackingSystem: string
  archiveSystem: string
  emailFollowStatus: HomeworkFollowStatus
  phoneFollowStatus: HomeworkFollowStatus
  answerStatus: HomeworkAnswerStatus
  archiveStatus: HomeworkArchiveStatus
  dueHours: number
  submittedAt?: string
  candidateAuthorizedArchive: boolean
  scoreItems: HomeworkScoreItem[]
}

export type HomeworkTrackingSummary = {
  archived: number
  emailPending: number
  phonePending: number
  submittedAnswers: number
  total: number
}

export type HomeworkCaseStudy = {
  anonymizedCandidate: string
  jobName: string
  originalRound: string
  score: number
  title: string
}

export const homeworkRoundLabels: Record<HomeworkRound, string> = {
  final: '终试',
  first: '初试',
  second: '复试',
}

export const defaultThreeStageHomeworkTasks: ThreeStageHomeworkTask[] = [
  {
    answerStatus: '已提交',
    answerSystem: '在线答卷系统',
    archiveStatus: '已归档',
    archiveSystem: '候选人档案/作业库',
    candidateAuthorizedArchive: true,
    candidateName: '李晨',
    dueHours: 24,
    emailFollowStatus: '已确认',
    examiner: '陈HR',
    id: 'homework-first-sales',
    jobName: '业务经理',
    phoneFollowStatus: '已确认',
    questionOwner: '业务部门长',
    round: 'first',
    scoreItems: [
      { label: '岗位理解', score: 85, weight: 30 },
      { label: '结构完整', score: 82, weight: 25 },
      { label: '执行落地', score: 84, weight: 25 },
      { label: '表达清晰', score: 86, weight: 20 },
    ],
    submittedAt: '2026-06-19T18:00:00+08:00',
    title: '目标客户开发方案',
    trackingSystem: '邮件+电话双跟踪',
  },
  {
    answerStatus: '未提交',
    answerSystem: '在线答卷系统',
    archiveStatus: '未归档',
    archiveSystem: '候选人档案/作业库',
    candidateAuthorizedArchive: false,
    candidateName: '李晨',
    dueHours: 24,
    emailFollowStatus: '待跟进',
    examiner: '销售总监',
    id: 'homework-second-sales',
    jobName: '业务经理',
    phoneFollowStatus: '待跟进',
    questionOwner: '销售总监',
    round: 'second',
    scoreItems: [
      { label: '业务深度', score: 0, weight: 35 },
      { label: '数据意识', score: 0, weight: 25 },
      { label: '客户拆解', score: 0, weight: 25 },
      { label: '复盘能力', score: 0, weight: 15 },
    ],
    title: '大客户成交链路复盘',
    trackingSystem: '邮件+电话双跟踪',
  },
  {
    answerStatus: '已提交',
    answerSystem: '在线答卷系统',
    archiveStatus: '优秀案例',
    archiveSystem: '优秀作品案例库',
    candidateAuthorizedArchive: true,
    candidateName: '李晨',
    dueHours: 48,
    emailFollowStatus: '已确认',
    examiner: '产品负责人',
    id: 'homework-final-ai-product',
    jobName: 'AI产品经理',
    phoneFollowStatus: '已确认',
    questionOwner: '产品负责人',
    round: 'final',
    scoreItems: [
      { label: '0-1规划', score: 94, weight: 30 },
      { label: '用户场景', score: 90, weight: 25 },
      { label: '技术协同', score: 91, weight: 20 },
      { label: '商业闭环', score: 93, weight: 25 },
    ],
    submittedAt: '2026-06-21T20:30:00+08:00',
    title: 'AI产品0-1落地方案',
    trackingSystem: '邮件+电话双跟踪',
  },
]

export function calculateHomeworkScore(task: ThreeStageHomeworkTask) {
  const totalWeight = task.scoreItems.reduce((sum, item) => sum + item.weight, 0)
  if (totalWeight === 0) return 0
  const score = task.scoreItems.reduce((sum, item) => sum + item.score * item.weight, 0) / totalWeight
  return Math.round(score)
}

export function summarizeHomeworkTracking(tasks: ThreeStageHomeworkTask[]): HomeworkTrackingSummary {
  return {
    archived: tasks.filter((task) => task.archiveStatus === '已归档').length,
    emailPending: tasks.filter((task) => task.emailFollowStatus === '待跟进' || task.emailFollowStatus === '未发送').length,
    phonePending: tasks.filter((task) => task.phoneFollowStatus === '待跟进' || task.phoneFollowStatus === '未发送').length,
    submittedAnswers: tasks.filter((task) => task.answerStatus === '已提交').length,
    total: tasks.length,
  }
}

export function buildCaseStudyArchive(tasks: ThreeStageHomeworkTask[]): HomeworkCaseStudy[] {
  return tasks
    .filter((task) => task.archiveStatus === '优秀案例' && task.candidateAuthorizedArchive)
    .map((task, index) => ({
      anonymizedCandidate: `候选人${String(index + 1).padStart(3, '0')}`,
      jobName: task.jobName,
      originalRound: homeworkRoundLabels[task.round],
      score: calculateHomeworkScore(task),
      title: task.title,
    }))
}
