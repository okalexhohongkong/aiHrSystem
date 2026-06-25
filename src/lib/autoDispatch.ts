import { invitationChannelLabels, type InvitationChannelType } from './invitationChannels'

export type AutoDispatchRoundId = 'first' | 'second' | 'third'
export type AutoDispatchChangeType = '首次安排' | '改期' | '时间变更' | '地点变更' | '条件变更'
export type AutoDispatchStage = '已双向确认' | '双向电话确认' | '报警'
export type AutoDispatchSeverity = 'green' | 'yellow' | 'red'
export type AutoDispatchDecision = '安排面试' | '入库储备'

export type AutoDispatchCase = {
  candidateId: number
  candidateName: string
  interviewerName: string
  backupInterviewerName?: string
  changeReason: string
  changeType: AutoDispatchChangeType
  candidateElectronicConfirmed: boolean
  candidateNotified: boolean
  candidatePhoneConfirmed: boolean
  candidateReplied: boolean
  interviewerElectronicConfirmed: boolean
  interviewerNotified: boolean
  interviewerPhoneConfirmed: boolean
  interviewerReplied: boolean
  interviewMode: '线上' | '线下' | '电话'
  meetingRoom: string
  location: string
  notifiedChannels: InvitationChannelType[]
  platform: string
  roundId: AutoDispatchRoundId
  roundName: string
  scheduledAt: string
  score: number
  threshold: number
  contactMetrics: {
    acceptedChats: number
    acceptedInvitations: number
    conversations: number
    emails: number
    invitations: number
    messages: number
    phones: number
    replies: number
    resumes: number
    wechat: number
    wechatExchanged: number
  }
}

export type AutoDispatchEvaluation = AutoDispatchCase & {
  alertMessage: string
  alertTitle: string
  confirmationStage: AutoDispatchStage
  decision: AutoDispatchDecision
  minutesUntilStart: number
  nextActions: string[]
  requiresModal: boolean
  severity: AutoDispatchSeverity
  phoneFollowupStatus: '待电话确认' | '电话已确认'
  notificationText: string
}

export type AutoDispatchBoard = {
  alarmCases: AutoDispatchEvaluation[]
  confirmedCases: AutoDispatchEvaluation[]
  decisionCounts: Record<AutoDispatchDecision, number>
  items: AutoDispatchEvaluation[]
  notificationCounts: Record<InvitationChannelType, number>
  phoneFollowupCases: AutoDispatchEvaluation[]
  summary: {
    alarm: number
    confirmed: number
    total: number
    underThreshold: number
    phoneFollowup: number
    acceptedChats: number
    acceptedInvitations: number
    conversations: number
    emails: number
    invitations: number
    messages: number
    phones: number
    replies: number
    resumes: number
    wechat: number
    wechatExchanged: number
  }
}

const severityRank: Record<AutoDispatchSeverity, number> = {
  green: 0,
  yellow: 1,
  red: 2,
}

function minutesUntil(targetAt: string, now: Date) {
  return Math.round((new Date(targetAt).getTime() - now.getTime()) / 60000)
}

function uniqueNotificationText(channels: InvitationChannelType[]) {
  if (channels.length === 0) return '未配置通知渠道'
  return channels.map((channel) => invitationChannelLabels[channel]).join(' / ')
}

function buildNextActions(evaluation: AutoDispatchEvaluation) {
  if (evaluation.confirmationStage === '已双向确认') {
    return ['锁定时间地点', '同步会议室与会议链接', '保留备用面试官']
  }

  if (evaluation.confirmationStage === '双向电话确认') {
    return evaluation.phoneFollowupStatus === '电话已确认'
      ? ['保存电话确认记录', '继续同步微信/企微/邮件', '预留应急改派入口']
      : ['启动双向电话确认', '先打给候选人，再打给面试官', '同步微信/企微/邮件提醒']
  }

  return [
    '立刻弹窗标红',
    '电话追呼候选人和面试官',
    '启用后备面试官',
    '必要时改期或改地点',
  ]
}

export function evaluateAutoDispatchCase(input: AutoDispatchCase, now = new Date()): AutoDispatchEvaluation {
  const minutesUntilStart = minutesUntil(input.scheduledAt, now)
  const electronicConfirmed = input.candidateElectronicConfirmed && input.interviewerElectronicConfirmed
  const phoneConfirmed = input.candidatePhoneConfirmed && input.interviewerPhoneConfirmed
  const notificationMiss = !input.candidateNotified || !input.interviewerNotified
  const replyMiss = (input.candidateNotified && !input.candidateReplied) || (input.interviewerNotified && !input.interviewerReplied)
  const nearStart = minutesUntilStart <= 120
  const overdue = minutesUntilStart <= 0
  const underThreshold = input.score < input.threshold
  const shouldAlarm = !electronicConfirmed && !phoneConfirmed && (overdue || (nearStart && (notificationMiss || replyMiss)))

  const severity: AutoDispatchSeverity = electronicConfirmed
    ? 'green'
    : shouldAlarm
      ? 'red'
      : 'yellow'

  const confirmationStage: AutoDispatchStage = electronicConfirmed
    ? '已双向确认'
    : severity === 'red'
      ? '报警'
      : '双向电话确认'

  const phoneFollowupStatus: '待电话确认' | '电话已确认' = phoneConfirmed ? '电话已确认' : '待电话确认'
  const decision: AutoDispatchDecision = underThreshold ? '入库储备' : '安排面试'

  const alertTitle =
    confirmationStage === '报警'
      ? `${input.candidateName} 的 ${input.roundName} 需要立即处理`
      : `${input.candidateName} 的 ${input.roundName} 正在电话确认`

  const alertMessage =
    confirmationStage === '报警'
      ? `${input.candidateName} 的${input.roundName}在 ${input.scheduledAt} / ${input.location} / ${input.platform} 已出现未回复或未通知到的情况，立刻弹窗标红并启用后备面试官。`
      : `${input.candidateName} 的${input.roundName}尚未完成双向确认，先走电话确认兜底，再同步微信、企微、短信或邮件。`

  const nextActions = buildNextActions({
    ...input,
    alertMessage,
    alertTitle,
    confirmationStage,
    decision,
    minutesUntilStart,
    nextActions: [],
    requiresModal: severity === 'red',
    severity,
    phoneFollowupStatus,
    notificationText: '',
  })

  return {
    ...input,
    alertMessage,
    alertTitle,
    confirmationStage,
    decision,
    minutesUntilStart,
    nextActions,
    requiresModal: severity === 'red',
    severity,
    phoneFollowupStatus,
    notificationText: uniqueNotificationText(input.notifiedChannels),
  }
}

export function buildAutoDispatchBoard(cases: AutoDispatchCase[], now = new Date()): AutoDispatchBoard {
  const items = cases.map((item) => evaluateAutoDispatchCase(item, now)).sort((left, right) => {
    const severityDiff = severityRank[right.severity] - severityRank[left.severity]
    if (severityDiff !== 0) return severityDiff
    return left.minutesUntilStart - right.minutesUntilStart
  })

  const notificationCounts = items.reduce<Record<InvitationChannelType, number>>(
    (counts, item) => {
      item.notifiedChannels.forEach((channel) => {
        counts[channel] += 1
      })
      return counts
    },
    {
      email: 0,
      phone: 0,
      platformMessage: 0,
      sms: 0,
      wechat: 0,
      wecom: 0,
    },
  )

  const confirmedCases = items.filter((item) => item.confirmationStage === '已双向确认')
  const phoneFollowupCases = items.filter((item) => item.confirmationStage === '双向电话确认')
  const alarmCases = items.filter((item) => item.confirmationStage === '报警')
  const decisionCounts = items.reduce<Record<AutoDispatchDecision, number>>(
    (counts, item) => {
      counts[item.decision] += 1
      return counts
    },
    {
      安排面试: 0,
      入库储备: 0,
    },
  )
  const summaryMetrics = items.reduce(
    (metrics, item) => {
      metrics.acceptedChats += item.contactMetrics.acceptedChats
      metrics.acceptedInvitations += item.contactMetrics.acceptedInvitations
      metrics.conversations += item.contactMetrics.conversations
      metrics.emails += item.contactMetrics.emails
      metrics.invitations += item.contactMetrics.invitations
      metrics.messages += item.contactMetrics.messages
      metrics.phones += item.contactMetrics.phones
      metrics.replies += item.contactMetrics.replies
      metrics.resumes += item.contactMetrics.resumes
      metrics.wechat += item.contactMetrics.wechat
      metrics.wechatExchanged += item.contactMetrics.wechatExchanged
      return metrics
    },
    {
      acceptedChats: 0,
      acceptedInvitations: 0,
      conversations: 0,
      emails: 0,
      invitations: 0,
      messages: 0,
      phones: 0,
      replies: 0,
      resumes: 0,
      wechat: 0,
      wechatExchanged: 0,
    },
  )

  return {
    alarmCases,
    confirmedCases,
    decisionCounts,
    items,
    notificationCounts,
    phoneFollowupCases,
    summary: {
      alarm: alarmCases.length,
      confirmed: confirmedCases.length,
      acceptedChats: summaryMetrics.acceptedChats,
      acceptedInvitations: summaryMetrics.acceptedInvitations,
      conversations: summaryMetrics.conversations,
      emails: summaryMetrics.emails,
      invitations: summaryMetrics.invitations,
      messages: summaryMetrics.messages,
      phones: summaryMetrics.phones,
      replies: summaryMetrics.replies,
      resumes: summaryMetrics.resumes,
      phoneFollowup: phoneFollowupCases.length,
      total: items.length,
      underThreshold: decisionCounts['入库储备'],
      wechat: summaryMetrics.wechat,
      wechatExchanged: summaryMetrics.wechatExchanged,
    },
  }
}

export function autoDispatchStageLabel(stage: AutoDispatchStage) {
  const labels: Record<AutoDispatchStage, string> = {
    '双向电话确认': '双向电话确认',
    '已双向确认': '已双向确认',
    报警: '报警',
  }

  return labels[stage]
}

export function autoDispatchSeverityLabel(severity: AutoDispatchSeverity) {
  const labels: Record<AutoDispatchSeverity, string> = {
    green: '双向确认',
    red: '红色报警',
    yellow: '电话确认',
  }

  return labels[severity]
}

export function autoDispatchChannelSummary(channels: InvitationChannelType[]) {
  return channels.map((channel) => invitationChannelLabels[channel]).join('、')
}
