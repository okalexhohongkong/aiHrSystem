import { describe, expect, it } from 'vitest'
import { buildAutoDispatchBoard, type AutoDispatchCase } from './autoDispatch'
import {
  buildTerminalCalendarBoard,
  calendarEventsFromHomework,
  calendarEventsFromMobileReminders,
  terminalCalendarConnectors,
} from './calendarIntegration'
import { defaultMobileReminderTasks } from './mobileWorkTerminal'
import { defaultThreeStageHomeworkTasks } from './threeStageHomework'

const dispatchCase: AutoDispatchCase = {
  candidateElectronicConfirmed: false,
  candidateId: 1,
  candidateName: '李晨',
  candidateNotified: true,
  candidatePhoneConfirmed: false,
  candidateReplied: false,
  changeReason: '复试改期后未完成双向确认。',
  changeType: '时间变更',
  contactMetrics: {
    acceptedChats: 1,
    acceptedInvitations: 1,
    conversations: 3,
    emails: 1,
    invitations: 2,
    messages: 4,
    phones: 1,
    replies: 1,
    resumes: 1,
    wechat: 1,
    wechatExchanged: 1,
  },
  interviewerElectronicConfirmed: false,
  interviewerName: '陈HR',
  interviewerNotified: true,
  interviewerPhoneConfirmed: false,
  interviewerReplied: false,
  interviewMode: '线下',
  location: '上海总部 A-1001',
  meetingRoom: '一号会议室',
  notifiedChannels: ['email', 'phone'],
  platform: '线下面试',
  roundId: 'second',
  roundName: '复试',
  scheduledAt: '2026-06-20T12:30:00+08:00',
  score: 86,
  threshold: 80,
}

describe('terminal calendar integration', () => {
  it('forces calendar suggestions for all reminder events while keeping authorization required', () => {
    const events = calendarEventsFromMobileReminders(defaultMobileReminderTasks)

    expect(events.length).toBe(defaultMobileReminderTasks.length)
    expect(events.every((event) => event.requiredPolicy === '强制建议接入')).toBe(true)
    expect(events.every((event) => event.channels.includes('ics-file'))).toBe(true)
    expect(events.some((event) => event.syncStatus === '待授权')).toBe(true)
    expect(events.find((event) => event.severity === 'critical')?.fallbackActions).toEqual(
      expect.arrayContaining(['后台标红', '电话兜底']),
    )
  })

  it('converts three-round homework deadlines into terminal calendar events', () => {
    const events = calendarEventsFromHomework(defaultThreeStageHomeworkTasks)

    expect(events.map((event) => event.title)).toEqual(
      expect.arrayContaining(['初试作业：目标客户开发方案', '复试作业：大客户成交链路复盘', '终试作业：AI产品0-1落地方案']),
    )
    expect(events.every((event) => event.sourceModule === '三轮作业')).toBe(true)
    expect(events.some((event) => event.syncStatus === '待授权')).toBe(true)
  })

  it('builds a unified board across mobile reminders, homework and auto dispatch schedules', () => {
    const dispatchBoard = buildAutoDispatchBoard([dispatchCase], new Date('2026-06-20T12:00:00+08:00'))
    const board = buildTerminalCalendarBoard({
      autoDispatchItems: dispatchBoard.items,
      homeworkTasks: defaultThreeStageHomeworkTasks,
      mobileTasks: defaultMobileReminderTasks,
    })

    expect(board.summary.total).toBeGreaterThan(defaultMobileReminderTasks.length)
    expect(board.summary.mandatorySuggested).toBe(board.summary.total)
    expect(board.summary.pendingAuthorization).toBeGreaterThan(0)
    expect(board.summary.exportedIcs).toBe(board.summary.total)
    expect(board.policyText).toContain('必须取得授权')
  })

  it('keeps every terminal calendar connector consent-gated', () => {
    expect(terminalCalendarConnectors.every((connector) => connector.authorizationRequired)).toBe(true)
    expect(terminalCalendarConnectors.map((connector) => connector.id)).toEqual(
      expect.arrayContaining(['apple-calendar', 'microsoft-outlook', 'android-calendar', 'harmony-calendar', 'wechat-work-schedule', 'ics-file']),
    )
  })
})
