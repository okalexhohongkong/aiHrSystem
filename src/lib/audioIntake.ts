import { culturalNotePolicy } from './candidateCulture'

export type RecruitingPhoneDevice = {
  id: string
  brand: string
  model: string
  ownerName: string
  department: string
  companyOwned: boolean
  phoneLinkEnabled: boolean
  status: '在线' | '离线' | '维护中'
}

export type AudioSourceType = 'phone_call' | 'wechat_voice' | 'meeting_app' | 'other'
export type AudioConsentStatus = 'confirmed' | 'pending' | 'rejected'
export type InterviewRound = 'first' | 'second' | 'final'
export type MeetingPlatformId =
  | 'tencent_meeting'
  | 'dingtalk_meeting'
  | 'wecom_meeting'
  | 'feishu_meeting'
  | 'phone_conference'
export type MeetingAccessMethod =
  | 'scan_qr'
  | 'meeting_code'
  | 'room_password'
  | 'meeting_link'
  | 'official_auth'
  | 'cloud_recording'
  | 'phone_bridge'
  | 'manual_upload'
export type RecordingAuthorizationStatus = 'confirmed' | 'pending' | 'rejected'

export type AudioIntakeInput = {
  candidateNameHint?: string
  candidatePhoneHint?: string
  consentStatus: AudioConsentStatus
  deviceId: string
  durationSeconds: number
  fileName: string
  fileUrl: string
  pushedAt: string
  sourceType: AudioSourceType
  transcript?: string
}

export type AudioIntakeRecord = AudioIntakeInput & {
  assignedHrName: string
  backendPath: string
  department: string
  deviceBrand: string
  id: string
  status: '待授权确认' | '待解析' | '已拒绝' | '设备待核验'
  warnings: string[]
}

export type CandidateLookup = {
  id: number
  name: string
  phone: string
  postName: string
}

export type AudioCandidateMatch = {
  candidateId: number | null
  candidateName: string
  confidence: '高' | '中' | '低'
  reason: string
}

export type AudioSignalNode = {
  title: string
  items: string[]
}

export type AudioInterviewSignals = {
  keywords: string[]
  mindMapNodes: AudioSignalNode[]
  culturalNote: {
    detected: boolean
    excludedFromScore: boolean
    note: string
  }
}

export type AudioGraphPoint = {
  label: string
  score: number
  evidence: string
}

export type AudioInterviewReport = {
  abilityGraph: AudioGraphPoint[]
  communicationGraph: AudioGraphPoint[]
  jobMatchScore: number
  keywords: string[]
  mindMapNodes: AudioSignalNode[]
  scoringBoundary: string
  summary: string
}

export type MeetingPlatformAdapter = {
  id: MeetingPlatformId
  label: string
  backendSlug: string
  accessMethods: MeetingAccessMethod[]
  recordingModes: string[]
  note: string
}

export type MeetingAudioImportInput = {
  accessMethod: MeetingAccessMethod
  candidateNameHint?: string
  consentStatus: AudioConsentStatus
  hostName: string
  meetingCode?: string
  meetingLink?: string
  meetingPassword?: string
  meetingRoomName?: string
  platformId: MeetingPlatformId
  qrPayload?: string
  recordingAuthorization: RecordingAuthorizationStatus
  round: InterviewRound
  scheduledAt: string
}

export type MeetingAudioImportRequest = MeetingAudioImportInput & {
  backendPath: string
  id: string
  meetingCodeMasked: string
  meetingLinkMasked: string
  meetingPasswordMasked: string
  platformLabel: string
  roundLabel: string
  status: '待授权确认' | '待拉取录音' | '已拒绝' | '平台待配置'
  warnings: string[]
}

export type MeetingArchivePackageInput = {
  aiSuggestions: string[]
  candidateId: number
  candidateName: string
  meetingRequests: MeetingAudioImportRequest[]
  minutes: string
  outline: string[]
  transcript: string
}

export type MeetingArchivePackage = MeetingArchivePackageInput & {
  accessSummary: string[]
  archivePath: string
  complianceNotes: string[]
  sections: string[]
}

export const audioComplianceWarnings = {
  consentRequired: '录音进入系统前必须确认候选人知情或授权；未确认时只能进入待授权队列。',
  companyPhoneOnly: '1.2版本仅接入公司专用招聘手机，不做个人手机隐蔽采集。',
  noPermissionBypass: '手机端只支持合法导出或分享录音链接，不绕过系统、微信或通话软件权限。',
  meetingRecordingAuthRequired: '会议录音接入必须确认会议主持人/企业账号已开启录制授权，并向参会者说明录音用途。',
  meetingNoSilentJoin: '会议接入只支持扫码、参会码、官方授权、云录制或手动上传，不做静默入会或绕过会议平台权限。',
  meetingSecretMasked: '参会码、二维码内容和会议授权令牌只做脱敏展示，正式后端需加密存储并记录审计日志。',
  culturalNoteExcluded: culturalNotePolicy.note,
}

export const audioBackendPushPath = '/api/audio-intake/recruiting-phone'
export const meetingAudioBackendBasePath = '/api/audio-intake/meeting-recording'
export const supportedRecruitingPhoneBrands = ['Xiaomi', 'OPPO', 'vivo']

export const interviewRoundLabels: Record<InterviewRound, string> = {
  final: '终试',
  first: '初试',
  second: '复试',
}

export const recruitingPhoneDevices: RecruitingPhoneDevice[] = [
  {
    brand: 'Xiaomi',
    companyOwned: true,
    department: '人力资源部',
    id: 'phone-xm-001',
    model: 'Xiaomi 15',
    ownerName: '陈HR',
    phoneLinkEnabled: true,
    status: '在线',
  },
  {
    brand: 'OPPO',
    companyOwned: true,
    department: '业务招聘组',
    id: 'phone-op-002',
    model: 'OPPO Find X8',
    ownerName: '王HR',
    phoneLinkEnabled: true,
    status: '在线',
  },
  {
    brand: 'vivo',
    companyOwned: true,
    department: '技术招聘组',
    id: 'phone-vv-003',
    model: 'vivo X200',
    ownerName: '刘HR',
    phoneLinkEnabled: true,
    status: '维护中',
  },
]

export const audioSourceTypeLabels: Record<AudioSourceType, string> = {
  meeting_app: '会议/线上面试',
  other: '其他授权音频',
  phone_call: '手机电话',
  wechat_voice: '微信语音',
}

export const meetingAccessMethodLabels: Record<MeetingAccessMethod, string> = {
  cloud_recording: '云录制拉取',
  manual_upload: '手动上传',
  meeting_code: '输入参会码',
  meeting_link: '会议链接',
  official_auth: '官方授权',
  phone_bridge: '电话会议桥接',
  room_password: '会议室名/密码',
  scan_qr: '扫码接入',
}

export const meetingPlatformAdapters: MeetingPlatformAdapter[] = [
  {
    accessMethods: ['scan_qr', 'meeting_code', 'room_password', 'meeting_link', 'official_auth', 'cloud_recording', 'manual_upload'],
    backendSlug: 'tencent-meeting',
    id: 'tencent_meeting',
    label: '腾讯会议',
    note: '支持扫码、会议号、会议室名/密码或链接绑定会议，正式版优先接企业授权和云录制导出。',
    recordingModes: ['云录制', '本地录制上传', '主持人授权导出'],
  },
  {
    accessMethods: ['scan_qr', 'meeting_code', 'room_password', 'meeting_link', 'official_auth', 'cloud_recording', 'manual_upload'],
    backendSlug: 'dingtalk-meeting',
    id: 'dingtalk_meeting',
    label: '钉钉会议',
    note: '支持扫码、会议号、会议室名/密码、会议链接和企业授权；录音文件进入待授权确认后再解析。',
    recordingModes: ['云录制', '钉钉文档录音', '本地文件上传'],
  },
  {
    accessMethods: ['scan_qr', 'meeting_code', 'room_password', 'meeting_link', 'official_auth', 'cloud_recording', 'manual_upload'],
    backendSlug: 'wecom-meeting',
    id: 'wecom_meeting',
    label: '企微会议',
    note: '适合与企业微信账号体系打通，按公司主体和HR同事绑定会议录音。',
    recordingModes: ['企业微信会议录制', '云端文件', '手动上传'],
  },
  {
    accessMethods: ['scan_qr', 'meeting_code', 'room_password', 'meeting_link', 'official_auth', 'cloud_recording', 'manual_upload'],
    backendSlug: 'feishu-meeting',
    id: 'feishu_meeting',
    label: '飞书会议',
    note: '支持飞书会议录制、妙记或授权导出，后续可回填候选人档案。',
    recordingModes: ['飞书妙记', '云录制', '本地文件上传'],
  },
  {
    accessMethods: ['phone_bridge', 'meeting_code', 'room_password', 'meeting_link', 'manual_upload'],
    backendSlug: 'phone-conference',
    id: 'phone_conference',
    label: '电话会议',
    note: '适合多方电话初试、复试或终试，记录桥接号码和授权录音文件。',
    recordingModes: ['电话会议桥接录音', '运营商授权录音', '本地文件上传'],
  },
]

export function isSupportedRecruitingPhone(device: RecruitingPhoneDevice) {
  return (
    supportedRecruitingPhoneBrands.includes(device.brand) &&
    device.companyOwned &&
    device.phoneLinkEnabled &&
    device.status !== '离线'
  )
}

export function meetingPlatformSupportsAccessMethod(
  platformId: MeetingPlatformId,
  accessMethod: MeetingAccessMethod,
) {
  return meetingPlatformAdapters.some(
    (adapter) => adapter.id === platformId && adapter.accessMethods.includes(accessMethod),
  )
}

function maskMeetingCode(code?: string) {
  if (!code) return '未填写'
  const compact = code.replace(/\s+/g, '')
  if (compact.length <= 4) return '*'.repeat(compact.length)
  return `${'*'.repeat(Math.max(2, compact.length - 4))}${compact.slice(-4)}`
}

function maskMeetingLink(link?: string) {
  if (!link) return '未填写'
  try {
    const url = new URL(link)
    return `${url.origin}/***`
  } catch {
    return maskMeetingCode(link)
  }
}

export function createMeetingAudioImportRequest(input: MeetingAudioImportInput): MeetingAudioImportRequest {
  const adapter = meetingPlatformAdapters.find((item) => item.id === input.platformId)
  const warnings: string[] = [
    audioComplianceWarnings.meetingRecordingAuthRequired,
    audioComplianceWarnings.meetingNoSilentJoin,
    audioComplianceWarnings.meetingSecretMasked,
  ]

  if (input.consentStatus !== 'confirmed') {
    warnings.push(audioComplianceWarnings.consentRequired)
  }
  if (input.recordingAuthorization !== 'confirmed') {
    warnings.push(audioComplianceWarnings.meetingRecordingAuthRequired)
  }
  if (!adapter || !adapter.accessMethods.includes(input.accessMethod)) {
    warnings.push('当前会议平台暂未配置该接入方式，请改用官方授权、云录制或手动上传。')
  }

  const status: MeetingAudioImportRequest['status'] = !adapter || !adapter.accessMethods.includes(input.accessMethod)
    ? '平台待配置'
    : input.consentStatus === 'rejected' || input.recordingAuthorization === 'rejected'
      ? '已拒绝'
      : input.consentStatus !== 'confirmed' || input.recordingAuthorization !== 'confirmed'
        ? '待授权确认'
        : '待拉取录音'

  return {
    ...input,
    backendPath: `${meetingAudioBackendBasePath}/${adapter?.backendSlug ?? input.platformId}`,
    id: `meeting-${input.platformId}-${input.round}-${new Date(input.scheduledAt).getTime()}`,
    meetingCodeMasked: maskMeetingCode(input.meetingCode ?? input.qrPayload),
    meetingLinkMasked: maskMeetingLink(input.meetingLink),
    meetingPasswordMasked: maskMeetingCode(input.meetingPassword),
    platformLabel: adapter?.label ?? '未配置平台',
    roundLabel: interviewRoundLabels[input.round],
    status,
    warnings: [...new Set(warnings)],
  }
}

export function describeMeetingAccessCredential(request: MeetingAudioImportRequest) {
  const parts = [meetingAccessMethodLabels[request.accessMethod]]

  if (request.accessMethod === 'scan_qr') {
    parts.push(`二维码：${request.meetingCodeMasked}`)
  }
  if (request.meetingCode && request.accessMethod !== 'scan_qr') {
    parts.push(`参会码：${request.meetingCodeMasked}`)
  }
  if (request.meetingRoomName) {
    parts.push(`会议室：${request.meetingRoomName}`)
  }
  if (request.meetingPassword) {
    parts.push(`密码：${request.meetingPasswordMasked}`)
  }
  if (request.meetingLink) {
    parts.push(`会议链接：${request.meetingLinkMasked}`)
  }

  return parts.join(' / ')
}

export function buildMeetingArchivePackage(input: MeetingArchivePackageInput): MeetingArchivePackage {
  return {
    ...input,
    accessSummary: input.meetingRequests.map(describeMeetingAccessCredential),
    archivePath: `${meetingAudioBackendBasePath.replace('/meeting-recording', '/meeting-archive')}/${input.candidateId}`,
    complianceNotes: [
      audioComplianceWarnings.meetingRecordingAuthRequired,
      audioComplianceWarnings.meetingNoSilentJoin,
      audioComplianceWarnings.meetingSecretMasked,
      '只汇总已授权的录音、原文、纪要、大纲和AI建议，不做静默入会、绕过权限或隐蔽抓取。',
    ],
    sections: ['录音原文', '转写纪要', '提炼大纲', 'AI分析建议'],
  }
}

export function createAudioIntakeRecord(input: AudioIntakeInput): AudioIntakeRecord {
  const device = recruitingPhoneDevices.find((item) => item.id === input.deviceId)
  const warnings: string[] = [audioComplianceWarnings.companyPhoneOnly, audioComplianceWarnings.noPermissionBypass]

  if (!device || !isSupportedRecruitingPhone(device)) {
    warnings.push('当前设备未通过1.2招聘手机白名单核验。')
  }
  if (input.consentStatus !== 'confirmed') {
    warnings.push(audioComplianceWarnings.consentRequired)
  }

  const status: AudioIntakeRecord['status'] = !device || !isSupportedRecruitingPhone(device)
    ? '设备待核验'
    : input.consentStatus === 'rejected'
      ? '已拒绝'
      : input.consentStatus === 'pending'
        ? '待授权确认'
        : '待解析'

  return {
    ...input,
    assignedHrName: device?.ownerName ?? '待分配',
    backendPath: audioBackendPushPath,
    department: device?.department ?? '待核验',
    deviceBrand: device?.brand ?? '未知设备',
    id: `audio-${input.deviceId}-${new Date(input.pushedAt).getTime()}`,
    status,
    warnings,
  }
}

export function matchCandidateFromAudio(
  hint: { candidateNameHint?: string; candidatePhoneHint?: string },
  candidates: CandidateLookup[],
): AudioCandidateMatch {
  const normalizedPhone = hint.candidatePhoneHint?.replace(/\D/g, '')
  if (normalizedPhone) {
    const byPhone = candidates.find((candidate) => candidate.phone.replace(/\D/g, '') === normalizedPhone)
    if (byPhone) {
      return {
        candidateId: byPhone.id,
        candidateName: byPhone.name,
        confidence: '高',
        reason: `电话 ${hint.candidatePhoneHint} 与候选人档案匹配`,
      }
    }
  }

  const nameHint = hint.candidateNameHint?.trim()
  if (nameHint) {
    const byName = candidates.find((candidate) => candidate.name === nameHint)
    if (byName) {
      return {
        candidateId: byName.id,
        candidateName: byName.name,
        confidence: '中',
        reason: `姓名 ${nameHint} 与候选人档案匹配，仍需核对电话或微信`,
      }
    }
  }

  return {
    candidateId: null,
    candidateName: hint.candidateNameHint ?? '待识别候选人',
    confidence: '低',
    reason: '未匹配到明确候选人，进入人工确认队列',
  }
}

function containsAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word))
}

function boundedScore(base: number, matched: boolean, bonus = 12) {
  return Math.max(0, Math.min(100, matched ? base + bonus : base))
}

export function extractInterviewSignals(transcript: string): AudioInterviewSignals {
  const compact = transcript.replace(/\s+/g, '')
  const keywordChecks = [
    { label: '岗位认知', words: ['岗位', '销售', '财务', '技术', '成交链路', '工作'] },
    { label: '产业认知', words: ['行业', '产业', 'AI硬件', '跨境', '市场'] },
    { label: '能力证据', words: ['业绩', '项目', '客户', '成果', '专利', '负责'] },
    { label: '反应清晰', words: ['讲清', '清楚', '逻辑', '链路', '结构'] },
    { label: '积极配合', words: ['积极', '愿意', '学习', '接受', '配合'] },
    { label: '生活热度', words: ['跑步', '运动', '阅读', '爱好', '生活'] },
  ]
  const keywords = keywordChecks.filter((check) => containsAny(compact, check.words)).map((check) => check.label)
  const hasCulturalNote = containsAny(compact, ['塔罗牌', '塔罗', '星座', '出生', '生辰', '八字', '五行'])

  return {
    culturalNote: {
      detected: hasCulturalNote,
      excludedFromScore: culturalNotePolicy.excludedFromScoring,
      note: hasCulturalNote
        ? `检测到候选人自愿披露的文化备注，${culturalNotePolicy.note}`
        : '未检测到塔罗牌、星座、八字、五行等自愿文化兴趣备注。',
    },
    keywords,
    mindMapNodes: [
      {
        items: keywords.filter((keyword) => ['岗位认知', '能力证据', '反应清晰'].includes(keyword)),
        title: '岗位理解',
      },
      {
        items: keywords.filter((keyword) => ['产业认知', '积极配合'].includes(keyword)),
        title: '产业与职业热情',
      },
      {
        items: keywords.filter((keyword) => ['生活热度', '积极配合'].includes(keyword)),
        title: '沟通风格与投入度',
      },
      {
        items: hasCulturalNote ? ['自愿披露文化备注，不进入评分'] : ['无此类备注'],
        title: '敏感信息隔离',
      },
    ],
  }
}

export function buildAudioInterviewReport({
  candidateName,
  jobName,
  transcript,
}: {
  candidateName: string
  jobName: string
  transcript: string
}): AudioInterviewReport {
  const signals = extractInterviewSignals(transcript)
  const text = transcript.replace(/\s+/g, '')
  const hasPerformance = containsAny(text, ['业绩', '成果', '项目', '成交'])
  const hasIndustry = containsAny(text, ['行业', '产业', 'AI硬件', '市场'])
  const hasRoleCognition = containsAny(text, ['岗位', '工作', '销售', '财务', '技术', '成交链路'])
  const hasLearning = containsAny(text, ['学习', '积极', '愿意', '复盘', '接受'])
  const hasClearExpression = containsAny(text, ['讲清', '清楚', '逻辑', '链路'])

  const abilityGraph: AudioGraphPoint[] = [
    { evidence: hasPerformance ? '提到业绩、项目或成交成果' : '缺少明确成果佐证', label: '能力证据', score: boundedScore(64, hasPerformance, 18) },
    { evidence: hasRoleCognition ? '能围绕岗位职责展开表达' : '岗位职责理解待追问', label: '岗位理解', score: boundedScore(60, hasRoleCognition, 16) },
    { evidence: hasIndustry ? '表达了对行业或产业的判断' : '产业理解证据不足', label: '产业认知', score: boundedScore(58, hasIndustry, 14) },
    { evidence: hasLearning ? '表达了学习、配合或作业接受度' : '主动性待观察', label: '学习进取', score: boundedScore(62, hasLearning, 14) },
    { evidence: hasClearExpression ? '回答里有链路、逻辑或结构表达' : '表达结构需要面试官复核', label: '逻辑表达', score: boundedScore(60, hasClearExpression, 14) },
  ]

  const communicationGraph: AudioGraphPoint[] = [
    { evidence: '根据转写完整度和答复长度初判', label: '反应速度', score: transcript.length > 80 ? 78 : 62 },
    { evidence: hasClearExpression ? '能够复述关键链路' : '需要继续追问', label: '表达清晰', score: boundedScore(61, hasClearExpression, 16) },
    { evidence: hasLearning ? '愿意配合流程和作业' : '配合度待确认', label: '积极配合', score: boundedScore(64, hasLearning, 15) },
    { evidence: containsAny(text, ['跑步', '运动', '爱好', '生活']) ? '有生活爱好或个人热度信号' : '生活热度未明显披露', label: '个人热度', score: boundedScore(60, containsAny(text, ['跑步', '运动', '爱好', '生活']), 12) },
    { evidence: hasIndustry ? '能谈到行业看法' : '行业热情需补问', label: '职业热情', score: boundedScore(62, hasIndustry, 14) },
  ]

  const total = [...abilityGraph, ...communicationGraph].reduce((sum, item) => sum + item.score, 0)
  const jobMatchScore = Math.round(total / (abilityGraph.length + communicationGraph.length))

  return {
    abilityGraph,
    communicationGraph,
    jobMatchScore,
    keywords: signals.keywords,
    mindMapNodes: signals.mindMapNodes,
    scoringBoundary: '岗位匹配评分只使用工作相关证据；塔罗牌、星座、八字、五行、婚育、宗教等敏感或自愿文化信息不进入评分和录用决策。',
    summary: `${candidateName} / ${jobName} 的录音报告已生成：重点查看岗位理解、能力证据、产业认知、积极配合与表达清晰度。`,
  }
}
