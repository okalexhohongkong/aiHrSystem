import type { AutoDispatchEvaluation } from './autoDispatch'
import type { MobileReminderTask, MobileTerminalRole } from './mobileWorkTerminal'
import type { HomeworkRound, ThreeStageHomeworkTask } from './threeStageHomework'

export type TerminalCalendarPlatform =
  | 'apple-calendar'
  | 'google-calendar'
  | 'microsoft-outlook'
  | 'android-calendar'
  | 'harmony-calendar'
  | 'wechat-work-schedule'
  | 'ics-file'

export type CalendarEventKind =
  | 'interview'
  | 'homework'
  | 'mobile-reminder'
  | 'schedule-change'
  | 'alarm'

export type CalendarRequiredPolicy = '强制建议接入'
export type CalendarSyncStatus = '已授权同步' | '待授权' | '接口预留' | '同步失败'

export type TerminalCalendarConnector = {
  id: TerminalCalendarPlatform
  name: string
  endpointType: '系统日历' | '企业日程' | '开放接口' | '订阅文件'
  supportedRoles: MobileTerminalRole[]
  status: CalendarSyncStatus
  requiredPolicy: CalendarRequiredPolicy
  authorizationRequired: true
}

export type TerminalCalendarEvent = {
  id: string
  title: string
  kind: CalendarEventKind
  ownerName: string
  candidateName?: string
  role: MobileTerminalRole
  startsAt: string
  endsAt: string
  location: string
  sourceModule: '面试编排' | '三轮作业' | '移动工作端' | '自动分工'
  requiredPolicy: CalendarRequiredPolicy
  syncStatus: CalendarSyncStatus
  severity: 'normal' | 'warning' | 'critical'
  channels: TerminalCalendarPlatform[]
  fallbackActions: string[]
  complianceNote: string
}

export type TerminalCalendarBoard = {
  events: TerminalCalendarEvent[]
  connectors: TerminalCalendarConnector[]
  summary: {
    total: number
    mandatorySuggested: number
    pendingAuthorization: number
    critical: number
    exportedIcs: number
  }
  policyText: string
}

const defaultEventMinutes: Record<CalendarEventKind, number> = {
  alarm: 15,
  homework: 30,
  interview: 60,
  'mobile-reminder': 15,
  'schedule-change': 15,
}

const homeworkRoundName: Record<HomeworkRound, string> = {
  final: '终试',
  first: '初试',
  second: '复试',
}

function addMinutes(isoLike: string, minutes: number) {
  return new Date(new Date(isoLike).getTime() + minutes * 60000).toISOString()
}

function calendarEventKindFromReminder(task: MobileReminderTask): CalendarEventKind {
  if (task.severity === 'critical' || task.type === 'alarm') return 'alarm'
  if (task.type === 'homework') return 'homework'
  if (task.type === 'scheduleChange' || task.type === 'locationChange' || task.type === 'interviewerChange') {
    return 'schedule-change'
  }
  if (task.type === 'interview') return 'interview'
  return 'mobile-reminder'
}

export const terminalCalendarConnectors: TerminalCalendarConnector[] = [
  {
    authorizationRequired: true,
    endpointType: '系统日历',
    id: 'apple-calendar',
    name: 'Apple 日历 / iCloud 行程',
    requiredPolicy: '强制建议接入',
    status: '接口预留',
    supportedRoles: ['hr', 'interviewer', 'candidate'],
  },
  {
    authorizationRequired: true,
    endpointType: '开放接口',
    id: 'google-calendar',
    name: 'Google Calendar',
    requiredPolicy: '强制建议接入',
    status: '接口预留',
    supportedRoles: ['hr', 'interviewer', 'candidate'],
  },
  {
    authorizationRequired: true,
    endpointType: '开放接口',
    id: 'microsoft-outlook',
    name: 'Windows / Outlook 日历',
    requiredPolicy: '强制建议接入',
    status: '接口预留',
    supportedRoles: ['hr', 'interviewer', 'candidate'],
  },
  {
    authorizationRequired: true,
    endpointType: '系统日历',
    id: 'android-calendar',
    name: 'Android 系统日历',
    requiredPolicy: '强制建议接入',
    status: '待授权',
    supportedRoles: ['hr', 'interviewer', 'candidate'],
  },
  {
    authorizationRequired: true,
    endpointType: '系统日历',
    id: 'harmony-calendar',
    name: '鸿蒙日程',
    requiredPolicy: '强制建议接入',
    status: '接口预留',
    supportedRoles: ['hr', 'interviewer', 'candidate'],
  },
  {
    authorizationRequired: true,
    endpointType: '企业日程',
    id: 'wechat-work-schedule',
    name: '企业微信日程',
    requiredPolicy: '强制建议接入',
    status: '待授权',
    supportedRoles: ['hr', 'interviewer'],
  },
  {
    authorizationRequired: true,
    endpointType: '订阅文件',
    id: 'ics-file',
    name: 'ICS行程订阅/导出',
    requiredPolicy: '强制建议接入',
    status: '已授权同步',
    supportedRoles: ['hr', 'interviewer', 'candidate'],
  },
]

export function calendarEventsFromMobileReminders(tasks: MobileReminderTask[]): TerminalCalendarEvent[] {
  return tasks.map((task) => {
    const kind = calendarEventKindFromReminder(task)
    const pendingAuthorization = task.severity === 'critical' || task.requiresDoubleConfirm

    return {
      candidateName: task.candidateName,
      channels: ['android-calendar', 'wechat-work-schedule', 'ics-file'],
      complianceNote: '日历写入需取得用户或企业账号授权；未授权时仅生成待同步行程、弹窗和兜底通知。',
      endsAt: addMinutes(task.scheduledAt, defaultEventMinutes[kind]),
      fallbackActions: pendingAuthorization
        ? ['后台标红', '手机弹窗', '电话兜底', 'ICS导出待确认']
        : ['PWA通知', '短信兜底', 'ICS导出'],
      id: `mobile-calendar-${task.id}`,
      kind,
      location: task.channelHint,
      ownerName: task.ownerName,
      requiredPolicy: '强制建议接入',
      role: task.role,
      severity: task.severity,
      sourceModule: '移动工作端',
      startsAt: task.scheduledAt,
      syncStatus: pendingAuthorization ? '待授权' : '已授权同步',
      title: task.title,
    }
  })
}

export function calendarEventsFromHomework(tasks: ThreeStageHomeworkTask[], nowIso = '2026-06-21T09:00:00+08:00'): TerminalCalendarEvent[] {
  return tasks.map((task) => {
    const startsAt = task.submittedAt ?? addMinutes(nowIso, task.dueHours * 60)

    return {
      candidateName: task.candidateName,
      channels: ['microsoft-outlook', 'android-calendar', 'ics-file'],
      complianceNote: '作业截止和催交可强制建议写入行程；候选人端写入仍需要候选人授权。',
      endsAt: addMinutes(startsAt, defaultEventMinutes.homework),
      fallbackActions: ['邮件提醒', '电话提醒', '后台作业标红', 'ICS导出'],
      id: `homework-calendar-${task.id}`,
      kind: 'homework',
      location: task.answerSystem,
      ownerName: task.examiner,
      requiredPolicy: '强制建议接入',
      role: 'candidate',
      severity: task.answerStatus === '未提交' ? 'warning' : 'normal',
      sourceModule: '三轮作业',
      startsAt,
      syncStatus: task.answerStatus === '未提交' ? '待授权' : '已授权同步',
      title: `${homeworkRoundName[task.round]}作业：${task.title}`,
    }
  })
}

export function calendarEventsFromAutoDispatch(items: AutoDispatchEvaluation[]): TerminalCalendarEvent[] {
  return items.map((item) => ({
    candidateName: item.candidateName,
    channels: ['apple-calendar', 'microsoft-outlook', 'wechat-work-schedule', 'ics-file'],
    complianceNote: '自动分工排班默认强制建议进入面试官和HR行程；未授权时进入报警/电话确认兜底。',
    endsAt: addMinutes(item.scheduledAt, defaultEventMinutes.interview),
    fallbackActions: item.severity === 'red'
      ? ['后台红色报警', '电话追呼候选人和面试官', '启用后备面试官', 'ICS导出']
      : ['日历待授权', '企微提醒', '短信提醒'],
    id: `dispatch-calendar-${item.candidateId}-${item.roundId}`,
    kind: item.severity === 'red' ? 'alarm' : 'interview',
    location: `${item.location} / ${item.meetingRoom}`,
    ownerName: item.interviewerName,
    requiredPolicy: '强制建议接入',
    role: 'interviewer',
    severity: item.severity === 'red' ? 'critical' : item.severity === 'yellow' ? 'warning' : 'normal',
    sourceModule: '自动分工',
    startsAt: item.scheduledAt,
    syncStatus: item.confirmationStage === '已双向确认' ? '已授权同步' : '待授权',
    title: `${item.candidateName} ${item.roundName} / ${item.interviewMode}`,
  }))
}

export function buildTerminalCalendarBoard(input: {
  autoDispatchItems?: AutoDispatchEvaluation[]
  connectors?: TerminalCalendarConnector[]
  homeworkTasks?: ThreeStageHomeworkTask[]
  mobileTasks?: MobileReminderTask[]
}): TerminalCalendarBoard {
  const events = [
    ...calendarEventsFromMobileReminders(input.mobileTasks ?? []),
    ...calendarEventsFromHomework(input.homeworkTasks ?? []),
    ...calendarEventsFromAutoDispatch(input.autoDispatchItems ?? []),
  ].sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime())
  const connectors = input.connectors ?? terminalCalendarConnectors

  return {
    connectors,
    events,
    policyText: '所有面试、作业、改期、报警和邀约提醒默认强制建议接入终端日历/行程；系统可标红、弹窗、导出ICS和发送兜底通知，但写入个人或企业日历必须取得授权。',
    summary: {
      critical: events.filter((event) => event.severity === 'critical').length,
      exportedIcs: events.filter((event) => event.channels.includes('ics-file')).length,
      mandatorySuggested: events.filter((event) => event.requiredPolicy === '强制建议接入').length,
      pendingAuthorization: events.filter((event) => event.syncStatus === '待授权').length,
      total: events.length,
    },
  }
}
