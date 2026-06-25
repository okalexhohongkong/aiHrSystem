export type MobileTerminalRole = 'hr' | 'interviewer' | 'candidate'
export type MobileDeviceKind =
  | 'ios-phone'
  | 'android-phone'
  | 'harmony-phone'
  | 'wechat-miniprogram'
  | 'apple-watch'
  | 'huawei-watch'
  | 'android-watch'
export type MobileReminderType =
  | 'interview'
  | 'homework'
  | 'scheduleChange'
  | 'locationChange'
  | 'interviewerChange'
  | 'doubleConfirmation'
  | 'alarm'
export type MobileReminderSeverity = 'normal' | 'warning' | 'critical'
export type MobileMeetingMode = 'miniProgramVoiceMeeting' | 'phoneBridge' | 'mobileVideoMeeting'
export type MobileMeetingStatus = '待候选人授权' | '待录音授权' | '可入会录音'

export type MobileTerminalDevice = {
  id: MobileDeviceKind
  name: string
  roleScope: MobileTerminalRole[]
  reminderMethods: string[]
  status: '已接入' | '接口预留'
}

export type MobileReminderTask = {
  id: string
  title: string
  role: MobileTerminalRole
  type: MobileReminderType
  severity: MobileReminderSeverity
  candidateName?: string
  ownerName: string
  scheduledAt: string
  requiresDoubleConfirm: boolean
  confirmedByCandidate: boolean
  confirmedByStaff: boolean
  channelHint: string
  nextAction: string
}

export type MobileWorkSummary = {
  total: number
  interviews: number
  homework: number
  changeConfirmations: number
  critical: number
  pendingDoubleConfirm: number
  watchReadyDevices: number
}

export type MobileReminderRoute = {
  deliveryText: string
  escalationText: string
  primaryDevices: MobileTerminalDevice[]
  watchDevices: MobileTerminalDevice[]
}

export type MobileAuthorizationScope = {
  id: string
  title: string
  purpose: string
  consentRequired: true
  requiredForMeeting: boolean
}

export type CandidateConsentChecklist = {
  items: Array<MobileAuthorizationScope & { status: '待授权' }>
  readyForMeeting: boolean
  safetyNote: string
}

export type MobileMeetingSessionInput = {
  candidateConsentConfirmed: boolean
  candidateName: string
  hostName: string
  meetingMode: MobileMeetingMode
  platform: string
  recordingConsentConfirmed: boolean
  scheduledAt: string
  source: MobileDeviceKind
}

export type MobileMeetingSession = MobileMeetingSessionInput & {
  archivePath: string
  id: string
  recordingEnabled: boolean
  status: MobileMeetingStatus
  warnings: string[]
}

export type CandidateGuideRound = {
  id: 'first' | 'second' | 'third'
  name: string
  interviewerName: string
  interviewQuestion: string
  scheduledAt: string
  location: string
}

export type CandidateArrivalStep = {
  id: string
  title: string
  content: string
}

export type CandidateInterviewGuide = {
  candidateName: string
  jobName: string
  appEntry: string
  rounds: CandidateGuideRound[]
  arrivalSteps: CandidateArrivalStep[]
}

export type CandidateInterviewGuideSummary = {
  arrivalStepCount: number
  keywords: string[]
  missingRequiredSections: string[]
  roundCount: number
}

export const mobileTerminalDevices: MobileTerminalDevice[] = [
  {
    id: 'ios-phone',
    name: 'iPhone个人工作端',
    reminderMethods: ['App推送', '系统日历', '短信兜底', 'PWA通知'],
    roleScope: ['hr', 'interviewer', 'candidate'],
    status: '接口预留',
  },
  {
    id: 'android-phone',
    name: 'Android手机工作端',
    reminderMethods: ['App推送', '系统通知', '短信兜底', 'PWA通知'],
    roleScope: ['hr', 'interviewer', 'candidate'],
    status: '已接入',
  },
  {
    id: 'harmony-phone',
    name: '鸿蒙手机工作端',
    reminderMethods: ['鸿蒙通知', '小程序提醒', '短信兜底'],
    roleScope: ['hr', 'interviewer', 'candidate'],
    status: '接口预留',
  },
  {
    id: 'wechat-miniprogram',
    name: '微信小程序工作端',
    reminderMethods: ['订阅消息', '二维码入会', '微信授权', '候选人自助确认'],
    roleScope: ['hr', 'interviewer', 'candidate'],
    status: '已接入',
  },
  {
    id: 'apple-watch',
    name: 'Apple Watch提醒',
    reminderMethods: ['短提醒', '震动', '日历同步'],
    roleScope: ['hr', 'interviewer'],
    status: '接口预留',
  },
  {
    id: 'huawei-watch',
    name: '华为/鸿蒙手表提醒',
    reminderMethods: ['短提醒', '震动', '日程同步'],
    roleScope: ['hr', 'interviewer'],
    status: '接口预留',
  },
  {
    id: 'android-watch',
    name: 'Android手表提醒',
    reminderMethods: ['短提醒', '震动', '日程同步'],
    roleScope: ['hr', 'interviewer'],
    status: '接口预留',
  },
]

export const mobileReminderTypeLabels: Record<MobileReminderType, string> = {
  alarm: '报警升级',
  doubleConfirmation: '双向确认',
  homework: '作业催交',
  interview: '面试提醒',
  interviewerChange: '面试官改派',
  locationChange: '地点变更',
  scheduleChange: '时间变更',
}

export const mobileRoleLabels: Record<MobileTerminalRole, string> = {
  candidate: '候选人',
  hr: '人事',
  interviewer: '面试官',
}

export const mobileMeetingModeLabels: Record<MobileMeetingMode, string> = {
  miniProgramVoiceMeeting: '小程序在线语音会议',
  mobileVideoMeeting: '手机在线视频会议',
  phoneBridge: '电话会议桥接',
}

export const mobileAuthorizationScopes: MobileAuthorizationScope[] = [
  {
    consentRequired: true,
    id: 'identity',
    purpose: '确认候选人本人进入面试、作业或会议流程，避免档案混淆。',
    requiredForMeeting: true,
    title: '微信身份授权',
  },
  {
    consentRequired: true,
    id: 'phone',
    purpose: '用于面试改期、紧急通知和双向电话确认，不用于无关营销。',
    requiredForMeeting: true,
    title: '手机号授权',
  },
  {
    consentRequired: true,
    id: 'wechat-openid',
    purpose: '用于小程序订阅消息、入会身份校验和候选人自助确认。',
    requiredForMeeting: true,
    title: '微信OpenID授权',
  },
  {
    consentRequired: true,
    id: 'device-info',
    purpose: '用于会议兼容性、异常登录提示和设备安全审计，只做脱敏展示。',
    requiredForMeeting: false,
    title: '设备信息授权',
  },
  {
    consentRequired: true,
    id: 'location',
    purpose: '仅在候选人同意时辅助判断到场导航、线下面试距离和签到异常。',
    requiredForMeeting: false,
    title: '定位授权',
  },
  {
    consentRequired: true,
    id: 'recording-consent',
    purpose: '用于在线会议录音、转写、纪要和候选人面试档案归档。',
    requiredForMeeting: true,
    title: '录音转写授权',
  },
]

export const defaultMobileReminderTasks: MobileReminderTask[] = [
  {
    candidateName: '林晓',
    channelHint: '小程序订阅消息 + 企业微信',
    confirmedByCandidate: true,
    confirmedByStaff: false,
    id: 'mobile-reminder-1',
    nextAction: '提醒复试官在手机端确认，未确认则电话兜底。',
    ownerName: '陈HR',
    requiresDoubleConfirm: true,
    role: 'interviewer',
    scheduledAt: '2026-06-21T14:30:00+08:00',
    severity: 'warning',
    title: 'AI产品经理复试确认',
    type: 'interview',
  },
  {
    candidateName: '赵明',
    channelHint: '短信 + 微信小程序',
    confirmedByCandidate: false,
    confirmedByStaff: true,
    id: 'mobile-reminder-2',
    nextAction: '催交初试作业，逾期2小时自动升级给人事主管。',
    ownerName: '王HR',
    requiresDoubleConfirm: false,
    role: 'candidate',
    scheduledAt: '2026-06-21T18:00:00+08:00',
    severity: 'normal',
    title: '销售岗作业提交提醒',
    type: 'homework',
  },
  {
    candidateName: '周候选人',
    channelHint: 'App推送 + 手表震动 + 电话',
    confirmedByCandidate: false,
    confirmedByStaff: false,
    id: 'mobile-reminder-3',
    nextAction: '立即弹窗标红，候选人和面试官双向电话确认。',
    ownerName: '刘HR',
    requiresDoubleConfirm: true,
    role: 'hr',
    scheduledAt: '2026-06-21T11:15:00+08:00',
    severity: 'critical',
    title: '面试地点临时变更未确认',
    type: 'locationChange',
  },
  {
    candidateName: '许宁',
    channelHint: '企业微信 + 小程序',
    confirmedByCandidate: true,
    confirmedByStaff: true,
    id: 'mobile-reminder-4',
    nextAction: '同步新面试官、会议号和候选人档案。',
    ownerName: '老板端',
    requiresDoubleConfirm: true,
    role: 'interviewer',
    scheduledAt: '2026-06-22T09:30:00+08:00',
    severity: 'normal',
    title: '经营副总复试面试官改派',
    type: 'interviewerChange',
  },
]

export const mobileWorkSopSteps = [
  '人事在后台创建或调整面试、作业、会议任务。',
  '系统按角色推送到HR、面试官和候选人的手机端/小程序。',
  '涉及时间、地点、面试官、条件变更时，必须候选人与内部人员双向确认。',
  '双向未确认时先进入电话确认；仍未确认则标红、弹窗、手表提醒并启用后备方案。',
  '候选人扫码进入小程序会议前，先完成身份、手机号、录音转写等必要授权。',
  '会议结束后，录音、转写、大纲、评分和作业安排回写候选人档案。',
]

export const defaultCandidateInterviewGuide: CandidateInterviewGuide = {
  appEntry: '候选人下载App或关注小程序后，在「我的面试」查看全链条指引。',
  candidateName: '周候选人',
  jobName: 'AI产品经理',
  rounds: [
    {
      id: 'first',
      interviewQuestion: '请说明您从0到1做过的AI产品项目、个人角色和结果数据。',
      interviewerName: '陈HR',
      location: '黑卫士小程序会议 / 线上初试',
      name: '初试',
      scheduledAt: '2026-06-21 15:00',
    },
    {
      id: 'second',
      interviewQuestion: '请拆解一个硬件产品需求，说明用户画像、功能优先级和上线节奏。',
      interviewerName: '产品负责人 王总',
      location: '公司A座 12F 会议室B',
      name: '复试',
      scheduledAt: '2026-06-22 10:30',
    },
    {
      id: 'third',
      interviewQuestion: '请结合岗位目标说明入职90天计划、资源需求和成果承诺。',
      interviewerName: '总经理 / 业务副总',
      location: '公司A座 12F 董事会议室',
      name: '终试',
      scheduledAt: '2026-06-23 16:00',
    },
  ],
  arrivalSteps: [
    {
      content: '导航到公司园区南门，按访客车道进入，提前10分钟到达并联系HR确认。',
      id: 'drive',
      title: '开车怎么开',
    },
    {
      content: '地铁2号线到科技园站B口，步行约8分钟到公司A座。',
      id: 'metro',
      title: '坐地铁怎么坐',
    },
    {
      content: '公交可乘坐M201/M305到科技园南站，下车后沿园区主路步行到A座。',
      id: 'bus',
      title: '坐公交怎么坐',
    },
    {
      content: '自驾请提前在小程序填写车牌号，到场后按访客停车区停放。',
      id: 'parking',
      title: '停车怎么停',
    },
    {
      content: '到达一楼前台后出示小程序面试码，前台核验后放行到12楼。',
      id: 'upstairs',
      title: '上楼怎么上',
    },
    {
      content: '到场后在小程序点击「我已到达」，系统自动通知HR并生成预约签到记录。',
      id: 'appointment',
      title: '到以后预约怎么约',
    },
    {
      content: '系统按预约时间和签到顺序叫号，候选人在手机端看到当前排队和下一步安排。',
      id: 'queue',
      title: '叫号怎么叫',
    },
  ],
}

const requiredGuideKeywords = ['初试', '复试', '终试', '面试官', '面试题', '面试时间', '开车', '地铁', '公交', '停车', '上楼', '预约', '叫号']

export function buildCandidateInterviewGuideSummary(
  guide: CandidateInterviewGuide,
): CandidateInterviewGuideSummary {
  const guideText = [
    guide.appEntry,
    ...guide.rounds.flatMap((round) => [
      round.name,
      '面试官',
      round.interviewerName,
      '面试题',
      round.interviewQuestion,
      '面试时间',
      round.scheduledAt,
      round.location,
    ]),
    ...guide.arrivalSteps.flatMap((step) => [step.title, step.content]),
  ].join(' ')
  const keywords = requiredGuideKeywords.filter((keyword) => guideText.includes(keyword))
  const missingRequiredSections = requiredGuideKeywords.filter((keyword) => !keywords.includes(keyword))

  return {
    arrivalStepCount: guide.arrivalSteps.length,
    keywords,
    missingRequiredSections,
    roundCount: guide.rounds.length,
  }
}

export function buildMobileWorkSummary(tasks: MobileReminderTask[]): MobileWorkSummary {
  return {
    changeConfirmations: tasks.filter((task) =>
      ['scheduleChange', 'locationChange', 'interviewerChange', 'doubleConfirmation', 'alarm'].includes(task.type),
    ).length,
    critical: tasks.filter((task) => task.severity === 'critical').length,
    homework: tasks.filter((task) => task.type === 'homework').length,
    interviews: tasks.filter((task) => task.type === 'interview').length,
    pendingDoubleConfirm: tasks.filter(
      (task) => task.requiresDoubleConfirm && (!task.confirmedByCandidate || !task.confirmedByStaff),
    ).length,
    total: tasks.length,
    watchReadyDevices: mobileTerminalDevices.filter((device) => device.id.includes('watch')).length,
  }
}

export function routeMobileReminder(
  task: MobileReminderTask,
  devices: MobileTerminalDevice[] = mobileTerminalDevices,
): MobileReminderRoute {
  const roleDevices = devices.filter((device) => device.roleScope.includes(task.role))
  const primaryDevices = roleDevices.filter((device) =>
    ['ios-phone', 'android-phone', 'harmony-phone', 'wechat-miniprogram'].includes(device.id),
  )
  const watchDevices = roleDevices.filter((device) => device.id.includes('watch'))
  const reminderName = mobileReminderTypeLabels[task.type]
  const channelText = primaryDevices.map((device) => device.name).join(' / ')
  const watchText = watchDevices.length ? `；同步 ${watchDevices.map((device) => device.name).join(' / ')} 手表提醒` : ''
  const escalationText =
    task.severity === 'critical'
      ? '报警：手机弹窗、手表震动、电话兜底和后台标红同时触发。'
      : task.requiresDoubleConfirm
        ? '需要候选人与内部人员双向确认，未确认进入电话兜底。'
        : '普通提醒，未处理时按时限升级给负责人。'

  return {
    deliveryText: `${mobileRoleLabels[task.role]} ${reminderName} 发送到 ${channelText}${watchText}。`,
    escalationText,
    primaryDevices,
    watchDevices,
  }
}

export function buildCandidateConsentChecklist(
  scopes: MobileAuthorizationScope[] = mobileAuthorizationScopes,
): CandidateConsentChecklist {
  return {
    items: scopes.map((scope) => ({ ...scope, status: '待授权' as const })),
    readyForMeeting: false,
    safetyNote: '候选人电话、微信、设备、定位和录音只能在明确授权、说明用途和可撤回的前提下使用。',
  }
}

export const mobileMeetingArchiveBasePath = '/api/mobile-work/meeting-recordings'

export function buildMobileMeetingSession(input: MobileMeetingSessionInput): MobileMeetingSession {
  const warnings: string[] = []
  if (!input.candidateConsentConfirmed) {
    warnings.push('候选人尚未完成身份、手机号或微信授权，不能直接进入正式会议档案。')
  }
  if (!input.recordingConsentConfirmed) {
    warnings.push('录音转写必须先取得候选人知情同意；未确认前只能进入待录音授权队列。')
  }

  const status: MobileMeetingStatus = !input.candidateConsentConfirmed
    ? '待候选人授权'
    : !input.recordingConsentConfirmed
      ? '待录音授权'
      : '可入会录音'
  const recordingEnabled = status === '可入会录音'
  const sourcePath = input.source.replace(/[^a-z0-9-]/gi, '-')
  const id = `mobile-meeting-${sourcePath}-${new Date(input.scheduledAt).getTime()}`

  return {
    ...input,
    archivePath: `${mobileMeetingArchiveBasePath}/${sourcePath}`,
    id,
    recordingEnabled,
    status,
    warnings,
  }
}
