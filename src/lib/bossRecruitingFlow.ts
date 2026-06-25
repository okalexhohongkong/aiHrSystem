export type BossCandidateSource =
  | 'bossApplicant'
  | 'bossSearch'
  | 'emailHostedInbox'
  | 'manualImport'
  | 'referral'
  | 'talentPool'

export type BossGreetingScriptMode = 'presetKnowledgeBase' | 'aiSmart' | 'presetPlusAiFlexible'
export type BossGreetingStatus = 'queued' | 'candidateReplied' | 'pausedByHuman' | 'waitingCandidate'
export type BossResumeCollectionMethod =
  | 'candidateSharedLink'
  | 'chatAttachment'
  | 'emailHostedInbox'
  | 'manualUpload'
  | 'platformAttachment'
export type BossResumeCollectionStatus = 'notRequested' | 'requested' | 'received'
export type BossChatChannel = 'bossPlatformChat' | 'email' | 'phoneNote' | 'wechatNote' | 'wecomNote'
export type BossChatAuthor = 'candidate' | 'hr' | 'system'
export type BossContactChannelStatus = 'candidateShared' | 'notAsked' | 'pendingConsentReview'
export type BossScoreSignalKey = 'communication' | 'evidence' | 'experience' | 'intent' | 'resumeMatch' | 'scarcity'
export type BossCandidateGrade =
  | '值得聊天'
  | '值得邀约'
  | '值得收藏'
  | '值得争取签约'
  | '猎头级别'
  | '薪酬谈不拢但高价值'
export type BossSalaryAlignment = 'aboveBudget' | 'aligned' | 'belowBudget' | 'unknown'
export type BossInvitationManualStatus = 'confirmed' | 'pendingHumanConfirmation' | 'timedOutAiDraftNeedsReview'
export type BossInvitationDeliveryStatus = 'blockedAwaitingHuman' | 'readyForHumanSend'
export type BossArchiveCategory =
  | '高价值储备库'
  | '聊天跟进库'
  | '猎头协同库'
  | '长期收藏库'
  | '签约冲刺库'
  | '邀约优先库'
export type BossPipelineStageId =
  | 'archive'
  | 'greeting'
  | 'humanConfirmation'
  | 'onlineInterviewDraft'
  | 'resumeAndChat'
  | 'scoreAndGrade'
export type BossPipelineStageStatus = 'done' | 'needsReview' | 'pending'
export type BossPipelineActionPriority = 'high' | 'low' | 'medium' | 'urgent'
export type BossPipelineActionType =
  | 'archiveCandidate'
  | 'archiveHighValueSalaryMismatch'
  | 'collectResume'
  | 'continueConversation'
  | 'prepareHumanSend'
  | 'reviewInvitationDraft'
  | 'reviewTimedOutAiDraft'

export type BossSalaryRange = {
  max: number
  min: number
}

export type BossGreetingInput = {
  knowledgeBaseIds?: string[]
  messageDraft?: string
  owner?: string
  queuedAt?: string
  scriptMode?: BossGreetingScriptMode
  status?: BossGreetingStatus
}

export type BossResumeCollectionInput = {
  methods?: BossResumeCollectionMethod[]
  requestedAt?: string
  status?: BossResumeCollectionStatus
}

export type BossHostedEmailResumeInput = {
  attachmentName: string
  from: string
  mailbox: string
  receivedAt: string
  subject: string
}

export type BossChatMessageInput = {
  attachments?: string[]
  author: BossChatAuthor
  channel: BossChatChannel
  content: string
  occurredAt: string
}

export type BossContactExchangeInput = {
  phone?: {
    consentRecorded?: boolean
    exchangedAt?: string
    value?: string
  }
  wechat?: {
    consentRecorded?: boolean
    exchangedAt?: string
    value?: string
  }
}

export type BossInterviewInput = {
  confirmedByHumanAt?: string
  confirmationDeadlineAt?: string
  draftText?: string
  onlineMeetingProvider?: 'feishuMeeting' | 'internalVoiceRoom' | 'phoneScreen' | 'tencentMeeting' | 'wecomMeeting'
  proposedSlots?: string[]
  reviewer?: string
}

export type BossRecruitingCandidateInput = {
  chats?: BossChatMessageInput[]
  contactExchange?: BossContactExchangeInput
  emailResumes?: BossHostedEmailResumeInput[]
  greeting?: BossGreetingInput
  id: string
  interview?: BossInterviewInput
  name: string
  resumeCollection?: BossResumeCollectionInput
  salaryBudgetK?: BossSalaryRange
  salaryExpectationK?: BossSalaryRange
  scoreSignals?: Partial<Record<BossScoreSignalKey, number>>
  source: BossCandidateSource
  targetRole: string
}

export type BuildBossRecruitingPipelineInput = {
  candidates: BossRecruitingCandidateInput[]
  now: string
}

export type BossGreetingQueueItem = {
  candidateId: string
  knowledgeBaseIds: string[]
  messageDraft: string
  owner: string
  queuedAt: string
  scriptMode: BossGreetingScriptMode
  scriptModeLabel: string
  scriptSources: string[]
  status: BossGreetingStatus
}

export type BossHostedEmailResumeRecord = BossHostedEmailResumeInput & {
  importedToArchive: boolean
}

export type BossResumeCollectionRecord = {
  emailReceipts: BossHostedEmailResumeRecord[]
  methods: BossResumeCollectionMethod[]
  requestedAt?: string
  status: BossResumeCollectionStatus
}

export type BossChatRecord = BossChatMessageInput & {
  id: string
  hasAttachment: boolean
}

export type BossContactChannelRecord = {
  consentRecorded: boolean
  exchangedAt?: string
  maskedValue?: string
  status: BossContactChannelStatus
}

export type BossContactExchangeRecord = {
  phone: BossContactChannelRecord
  wechat: BossContactChannelRecord
}

export type BossResumeScore = {
  components: Record<BossScoreSignalKey, number>
  total: number
}

export type BossInterviewInvitationDraft = {
  body: string
  deliveryStatus: BossInvitationDeliveryStatus
  manualStatus: BossInvitationManualStatus
  meetingProvider: NonNullable<BossInterviewInput['onlineMeetingProvider']>
  proposedSlots: string[]
  reviewer: string
}

export type BossPipelineStage = {
  id: BossPipelineStageId
  status: BossPipelineStageStatus
  title: string
}

export type BossRecruitingPipelineCandidate = {
  archiveCategory: BossArchiveCategory
  candidateId: string
  chatRecords: BossChatRecord[]
  contactExchange: BossContactExchangeRecord
  grade: BossCandidateGrade
  greetingQueue: BossGreetingQueueItem
  invitationDraft?: BossInterviewInvitationDraft
  name: string
  reasons: string[]
  resumeCollection: BossResumeCollectionRecord
  resumeScore: BossResumeScore
  salaryAlignment: BossSalaryAlignment
  source: BossCandidateSource
  stages: BossPipelineStage[]
  targetRole: string
}

export type BossRecruitingPipeline = {
  candidates: BossRecruitingPipelineCandidate[]
  compliance: {
    disallowedCapabilities: string[]
    humanConfirmationRequired: true
    outboundDelivery: 'draftOnly'
    platformPolicy: string
  }
  generatedAt: string
}

export type BossPipelineSummary = {
  archiveCounts: Record<BossArchiveCategory, number>
  emailResumeImports: number
  gradeCounts: Record<BossCandidateGrade, number>
  greetingQueueSize: number
  humanConfirmedDrafts: number
  sourceCounts: Record<BossCandidateSource, number>
  timedOutDraftsAwaitingReview: number
  totalCandidates: number
}

export type BossPipelineAction = {
  candidateId: string
  candidateName: string
  priority: BossPipelineActionPriority
  requiresHuman: true
  title: string
  type: BossPipelineActionType
}

export const bossGreetingScriptModeLabels: Record<BossGreetingScriptMode, string> = {
  aiSmart: 'AI智能',
  presetKnowledgeBase: '预设知识库',
  presetPlusAiFlexible: '预设+AI灵活调整',
}

export const bossCandidateSourceLabels: Record<BossCandidateSource, string> = {
  bossApplicant: 'BOSS主动投递',
  bossSearch: 'BOSS搜索候选人',
  emailHostedInbox: '招聘邮箱托管',
  manualImport: '人工导入',
  referral: '内推推荐',
  talentPool: '历史人才库',
}

export const bossCandidateGrades: BossCandidateGrade[] = [
  '值得争取签约',
  '猎头级别',
  '值得邀约',
  '薪酬谈不拢但高价值',
  '值得聊天',
  '值得收藏',
]

const scoreWeights: Record<BossScoreSignalKey, number> = {
  communication: 0.11,
  evidence: 0.18,
  experience: 0.22,
  intent: 0.14,
  resumeMatch: 0.25,
  scarcity: 0.1,
}

const defaultScoreSignals: Record<BossScoreSignalKey, number> = {
  communication: 50,
  evidence: 50,
  experience: 50,
  intent: 50,
  resumeMatch: 50,
  scarcity: 50,
}

export function buildBossRecruitingPipeline(input: BuildBossRecruitingPipelineInput): BossRecruitingPipeline {
  const candidates = input.candidates
    .map((candidate) => buildPipelineCandidate(candidate, input.now))
    .sort((left, right) => right.resumeScore.total - left.resumeScore.total || left.candidateId.localeCompare(right.candidateId))

  return {
    candidates,
    compliance: {
      disallowedCapabilities: ['绕过平台规则', '反检测', '验证码绕过', '真实自动外发'],
      humanConfirmationRequired: true,
      outboundDelivery: 'draftOnly',
      platformPolicy: '只生成合规草稿和内部状态，人工确认后由人工在授权渠道处理。',
    },
    generatedAt: input.now,
  }
}

export function summarizeBossPipeline(pipeline: BossRecruitingPipeline): BossPipelineSummary {
  const summary: BossPipelineSummary = {
    archiveCounts: emptyArchiveCounts(),
    emailResumeImports: 0,
    gradeCounts: emptyGradeCounts(),
    greetingQueueSize: 0,
    humanConfirmedDrafts: 0,
    sourceCounts: emptySourceCounts(),
    timedOutDraftsAwaitingReview: 0,
    totalCandidates: pipeline.candidates.length,
  }

  for (const candidate of pipeline.candidates) {
    summary.archiveCounts[candidate.archiveCategory] += 1
    summary.gradeCounts[candidate.grade] += 1
    summary.sourceCounts[candidate.source] += 1
    if (candidate.greetingQueue.status === 'queued') summary.greetingQueueSize += 1
    summary.emailResumeImports += candidate.resumeCollection.emailReceipts.filter((receipt) => receipt.importedToArchive).length
    if (candidate.invitationDraft?.manualStatus === 'confirmed') summary.humanConfirmedDrafts += 1
    if (candidate.invitationDraft?.manualStatus === 'timedOutAiDraftNeedsReview') {
      summary.timedOutDraftsAwaitingReview += 1
    }
  }

  return summary
}

export function nextBossPipelineActions(pipeline: BossRecruitingPipeline): BossPipelineAction[] {
  return pipeline.candidates
    .map((candidate) => buildNextAction(candidate))
    .sort(
      (left, right) =>
        actionPriorityValue(right.priority) - actionPriorityValue(left.priority) ||
        candidateScore(pipeline, right.candidateId) - candidateScore(pipeline, left.candidateId),
    )
}

function buildPipelineCandidate(
  candidate: BossRecruitingCandidateInput,
  now: string,
): BossRecruitingPipelineCandidate {
  const chatRecords = buildChatRecords(candidate.chats ?? [])
  const greetingQueue = buildGreetingQueue(candidate, chatRecords, now)
  const resumeCollection = buildResumeCollection(candidate)
  const contactExchange = buildContactExchange(candidate.contactExchange)
  const resumeScore = buildResumeScore(candidate.scoreSignals)
  const salaryAlignment = classifySalaryAlignment(candidate.salaryExpectationK, candidate.salaryBudgetK)
  const grade = classifyCandidateGrade(resumeScore, salaryAlignment)
  const invitationDraft = buildInvitationDraft(candidate, grade, salaryAlignment, now)
  const archiveCategory = classifyArchiveCategory(grade)
  const stages = buildStages(resumeCollection, chatRecords, invitationDraft)

  return {
    archiveCategory,
    candidateId: candidate.id,
    chatRecords,
    contactExchange,
    grade,
    greetingQueue,
    invitationDraft,
    name: candidate.name,
    reasons: buildReasons(resumeScore, grade, salaryAlignment, resumeCollection),
    resumeCollection,
    resumeScore,
    salaryAlignment,
    source: candidate.source,
    stages,
    targetRole: candidate.targetRole,
  }
}

function buildGreetingQueue(
  candidate: BossRecruitingCandidateInput,
  chatRecords: BossChatRecord[],
  now: string,
): BossGreetingQueueItem {
  const scriptMode = candidate.greeting?.scriptMode ?? 'presetPlusAiFlexible'
  const hasCandidateReply = chatRecords.some((chat) => chat.author === 'candidate')
  const status = candidate.greeting?.status ?? (hasCandidateReply ? 'candidateReplied' : 'queued')

  return {
    candidateId: candidate.id,
    knowledgeBaseIds: candidate.greeting?.knowledgeBaseIds ?? ['role-fit', 'resume-request', 'interview-invite'],
    messageDraft:
      candidate.greeting?.messageDraft ??
      `您好，我们正在评估${candidate.targetRole}岗位匹配度，如您方便，可先提供简历或在平台内补充关键经历。`,
    owner: candidate.greeting?.owner ?? '人工HR',
    queuedAt: candidate.greeting?.queuedAt ?? now,
    scriptMode,
    scriptModeLabel: bossGreetingScriptModeLabels[scriptMode],
    scriptSources: scriptSourcesForMode(scriptMode),
    status,
  }
}

function buildResumeCollection(candidate: BossRecruitingCandidateInput): BossResumeCollectionRecord {
  const emailReceipts = (candidate.emailResumes ?? []).map((resume) => ({
    ...resume,
    importedToArchive: true,
  }))
  const emailMethods: BossResumeCollectionMethod[] = emailReceipts.length ? ['emailHostedInbox'] : []
  const methods = uniqueMethods([...(candidate.resumeCollection?.methods ?? []), ...emailMethods])
  const providedStatus = candidate.resumeCollection?.status
  const status =
    providedStatus ??
    (emailReceipts.length || methods.some((method) => method !== 'emailHostedInbox') ? 'received' : methods.length ? 'requested' : 'notRequested')

  return {
    emailReceipts,
    methods,
    requestedAt: candidate.resumeCollection?.requestedAt,
    status,
  }
}

function buildChatRecords(chats: BossChatMessageInput[]): BossChatRecord[] {
  return chats.map((chat, index) => ({
    ...chat,
    hasAttachment: Boolean(chat.attachments?.length),
    id: `chat-${String(index + 1).padStart(3, '0')}`,
  }))
}

function buildContactExchange(contactExchange?: BossContactExchangeInput): BossContactExchangeRecord {
  return {
    phone: buildContactChannel(contactExchange?.phone),
    wechat: buildContactChannel(contactExchange?.wechat),
  }
}

function buildContactChannel(channel?: BossContactExchangeInput['phone']): BossContactChannelRecord {
  if (!channel?.value) {
    return {
      consentRecorded: false,
      status: 'notAsked',
    }
  }

  return {
    consentRecorded: Boolean(channel.consentRecorded),
    exchangedAt: channel.exchangedAt,
    maskedValue: maskContactValue(channel.value),
    status: channel.consentRecorded ? 'candidateShared' : 'pendingConsentReview',
  }
}

function buildResumeScore(scoreSignals: BossRecruitingCandidateInput['scoreSignals']): BossResumeScore {
  const components = { ...defaultScoreSignals, ...scoreSignals }
  const total = Math.round(
    Object.entries(scoreWeights).reduce((sum, [key, weight]) => {
      const signalKey = key as BossScoreSignalKey
      return sum + clampScore(components[signalKey]) * weight
    }, 0),
  )

  return {
    components,
    total,
  }
}

function classifySalaryAlignment(expectation?: BossSalaryRange, budget?: BossSalaryRange): BossSalaryAlignment {
  if (!expectation || !budget) return 'unknown'
  if (expectation.min > budget.max) return 'aboveBudget'
  if (expectation.max < budget.min) return 'belowBudget'
  return 'aligned'
}

function classifyCandidateGrade(score: BossResumeScore, salaryAlignment: BossSalaryAlignment): BossCandidateGrade {
  if (salaryAlignment === 'aboveBudget' && score.total >= 90 && score.components.scarcity >= 85) return '猎头级别'
  if (salaryAlignment === 'aboveBudget' && score.total >= 78) return '薪酬谈不拢但高价值'
  if (score.total >= 92) return '值得争取签约'
  if (score.total >= 80) return '值得邀约'
  if (score.total >= 68) return '值得聊天'
  return '值得收藏'
}

function buildInvitationDraft(
  candidate: BossRecruitingCandidateInput,
  grade: BossCandidateGrade,
  salaryAlignment: BossSalaryAlignment,
  now: string,
): BossInterviewInvitationDraft | undefined {
  if (!shouldDraftInterview(grade, salaryAlignment)) return undefined

  const manualStatus = invitationManualStatus(candidate.interview, now)

  return {
    body:
      candidate.interview?.draftText ??
      `您好，基于目前简历和沟通信息，想邀请您参加${candidate.targetRole}线上面试。具体时间需人工确认后再发送。`,
    deliveryStatus: manualStatus === 'confirmed' ? 'readyForHumanSend' : 'blockedAwaitingHuman',
    manualStatus,
    meetingProvider: candidate.interview?.onlineMeetingProvider ?? 'tencentMeeting',
    proposedSlots: candidate.interview?.proposedSlots ?? [],
    reviewer: candidate.interview?.reviewer ?? '人工HR',
  }
}

function invitationManualStatus(interview: BossInterviewInput | undefined, now: string): BossInvitationManualStatus {
  if (interview?.confirmedByHumanAt && Date.parse(interview.confirmedByHumanAt) <= Date.parse(now)) return 'confirmed'
  if (interview?.confirmationDeadlineAt && Date.parse(interview.confirmationDeadlineAt) < Date.parse(now)) {
    return 'timedOutAiDraftNeedsReview'
  }
  return 'pendingHumanConfirmation'
}

function classifyArchiveCategory(grade: BossCandidateGrade): BossArchiveCategory {
  const archiveByGrade: Record<BossCandidateGrade, BossArchiveCategory> = {
    值得争取签约: '签约冲刺库',
    值得收藏: '长期收藏库',
    值得聊天: '聊天跟进库',
    值得邀约: '邀约优先库',
    猎头级别: '猎头协同库',
    薪酬谈不拢但高价值: '高价值储备库',
  }

  return archiveByGrade[grade]
}

function buildStages(
  resumeCollection: BossResumeCollectionRecord,
  chatRecords: BossChatRecord[],
  invitationDraft: BossInterviewInvitationDraft | undefined,
): BossPipelineStage[] {
  const resumeAndChatDone = resumeCollection.status === 'received' || chatRecords.length > 0
  const humanConfirmationStatus: BossPipelineStageStatus = invitationDraft
    ? invitationDraft.manualStatus === 'confirmed'
      ? 'done'
      : 'needsReview'
    : 'pending'

  return [
    { id: 'greeting', status: 'done', title: '打招呼' },
    { id: 'resumeAndChat', status: resumeAndChatDone ? 'done' : 'pending', title: '收简历/聊天' },
    { id: 'scoreAndGrade', status: 'done', title: '简历评分分级' },
    { id: 'onlineInterviewDraft', status: invitationDraft ? 'done' : 'pending', title: '邀约线上面试' },
    { id: 'humanConfirmation', status: humanConfirmationStatus, title: '人工确认发送' },
    { id: 'archive', status: 'done', title: '入库' },
  ]
}

function buildReasons(
  score: BossResumeScore,
  grade: BossCandidateGrade,
  salaryAlignment: BossSalaryAlignment,
  resumeCollection: BossResumeCollectionRecord,
): string[] {
  const reasons = [`简历评分${score.total}`, `分级：${grade}`]

  if (resumeCollection.status === 'received') reasons.push('已收简历')
  if (resumeCollection.emailReceipts.length) reasons.push('邮箱托管简历已导入')
  if (salaryAlignment === 'aboveBudget') reasons.push('薪酬高于当前预算，保留高价值沉淀')
  if (score.components.evidence >= 85) reasons.push('经历佐证较强')
  if (score.components.scarcity >= 85) reasons.push('稀缺度较高')

  return reasons
}

function buildNextAction(candidate: BossRecruitingPipelineCandidate): BossPipelineAction {
  if (candidate.invitationDraft?.manualStatus === 'timedOutAiDraftNeedsReview') {
    return {
      candidateId: candidate.candidateId,
      candidateName: candidate.name,
      priority: 'urgent',
      requiresHuman: true,
      title: '复核超时AI邀约草稿',
      type: 'reviewTimedOutAiDraft',
    }
  }

  if (candidate.invitationDraft?.manualStatus === 'pendingHumanConfirmation') {
    return {
      candidateId: candidate.candidateId,
      candidateName: candidate.name,
      priority: candidate.resumeScore.total >= 90 ? 'urgent' : 'high',
      requiresHuman: true,
      title: '人工确认线上面试邀约草稿',
      type: 'reviewInvitationDraft',
    }
  }

  if (candidate.invitationDraft?.manualStatus === 'confirmed') {
    return {
      candidateId: candidate.candidateId,
      candidateName: candidate.name,
      priority: 'high',
      requiresHuman: true,
      title: '人工发送已确认邀约',
      type: 'prepareHumanSend',
    }
  }

  if (candidate.grade === '猎头级别' || candidate.grade === '薪酬谈不拢但高价值') {
    return {
      candidateId: candidate.candidateId,
      candidateName: candidate.name,
      priority: 'high',
      requiresHuman: true,
      title: '确认薪酬不匹配后的高价值入库',
      type: 'archiveHighValueSalaryMismatch',
    }
  }

  if (candidate.resumeCollection.status !== 'received') {
    return {
      candidateId: candidate.candidateId,
      candidateName: candidate.name,
      priority: 'medium',
      requiresHuman: true,
      title: '继续收集简历或关键经历',
      type: 'collectResume',
    }
  }

  if (candidate.grade === '值得聊天') {
    return {
      candidateId: candidate.candidateId,
      candidateName: candidate.name,
      priority: 'medium',
      requiresHuman: true,
      title: '继续聊天确认意向与条件',
      type: 'continueConversation',
    }
  }

  return {
    candidateId: candidate.candidateId,
    candidateName: candidate.name,
    priority: 'low',
    requiresHuman: true,
    title: '按分类入库并设置复盘节奏',
    type: 'archiveCandidate',
  }
}

function scriptSourcesForMode(scriptMode: BossGreetingScriptMode): string[] {
  if (scriptMode === 'presetKnowledgeBase') return ['预设知识库']
  if (scriptMode === 'aiSmart') return ['AI智能']
  return ['预设知识库', 'AI灵活调整']
}

function shouldDraftInterview(grade: BossCandidateGrade, salaryAlignment: BossSalaryAlignment): boolean {
  if (salaryAlignment === 'aboveBudget') return false
  return grade === '值得邀约' || grade === '值得争取签约'
}

function uniqueMethods(methods: BossResumeCollectionMethod[]): BossResumeCollectionMethod[] {
  return Array.from(new Set(methods))
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, score))
}

function maskContactValue(value: string): string {
  if (value.length <= 4) return '*'.repeat(value.length)
  return `${value.slice(0, 3)}****${value.slice(-2)}`
}

function emptyGradeCounts(): Record<BossCandidateGrade, number> {
  return {
    值得争取签约: 0,
    值得收藏: 0,
    值得聊天: 0,
    值得邀约: 0,
    猎头级别: 0,
    薪酬谈不拢但高价值: 0,
  }
}

function emptyArchiveCounts(): Record<BossArchiveCategory, number> {
  return {
    签约冲刺库: 0,
    长期收藏库: 0,
    聊天跟进库: 0,
    邀约优先库: 0,
    猎头协同库: 0,
    高价值储备库: 0,
  }
}

function emptySourceCounts(): Record<BossCandidateSource, number> {
  return {
    bossApplicant: 0,
    bossSearch: 0,
    emailHostedInbox: 0,
    manualImport: 0,
    referral: 0,
    talentPool: 0,
  }
}

function actionPriorityValue(priority: BossPipelineActionPriority): number {
  const values: Record<BossPipelineActionPriority, number> = {
    high: 3,
    low: 1,
    medium: 2,
    urgent: 4,
  }

  return values[priority]
}

function candidateScore(pipeline: BossRecruitingPipeline, candidateId: string): number {
  return pipeline.candidates.find((candidate) => candidate.candidateId === candidateId)?.resumeScore.total ?? 0
}
