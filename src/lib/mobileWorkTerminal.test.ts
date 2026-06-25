import { describe, expect, it } from 'vitest'
import {
  buildCandidateInterviewGuideSummary,
  buildCandidateConsentChecklist,
  buildMobileMeetingSession,
  buildMobileWorkSummary,
  defaultCandidateInterviewGuide,
  defaultMobileReminderTasks,
  mobileAuthorizationScopes,
  mobileTerminalDevices,
  routeMobileReminder,
} from './mobileWorkTerminal'

describe('mobile work terminal', () => {
  it('summarizes personal mobile reminders for interviews, homework and changes', () => {
    const summary = buildMobileWorkSummary(defaultMobileReminderTasks)

    expect(summary.total).toBe(defaultMobileReminderTasks.length)
    expect(summary.interviews).toBeGreaterThan(0)
    expect(summary.homework).toBeGreaterThan(0)
    expect(summary.changeConfirmations).toBeGreaterThan(0)
    expect(summary.critical).toBeGreaterThan(0)
    expect(summary.pendingDoubleConfirm).toBeGreaterThan(0)
  })

  it('routes critical reminders to phone, mini program and watch endpoints', () => {
    const criticalTask = defaultMobileReminderTasks.find((task) => task.severity === 'critical')
    expect(criticalTask).toBeDefined()

    const route = routeMobileReminder(criticalTask!, mobileTerminalDevices)

    expect(route.primaryDevices.map((device) => device.id)).toContain('wechat-miniprogram')
    expect(route.watchDevices.length).toBeGreaterThanOrEqual(3)
    expect(route.escalationText).toContain('报警')
    expect(route.deliveryText).toContain('手表')
  })

  it('requires explicit consent and purpose text for every mini program authorization scope', () => {
    expect(mobileAuthorizationScopes.every((scope) => scope.consentRequired)).toBe(true)
    expect(mobileAuthorizationScopes.every((scope) => scope.purpose.length > 6)).toBe(true)

    const checklist = buildCandidateConsentChecklist(mobileAuthorizationScopes)
    expect(checklist.readyForMeeting).toBe(false)
    expect(checklist.items.every((item) => item.status === '待授权')).toBe(true)
  })

  it('blocks meeting recording import until candidate and recording consent are confirmed', () => {
    const pendingSession = buildMobileMeetingSession({
      candidateConsentConfirmed: true,
      candidateName: '周候选人',
      hostName: '陈HR',
      meetingMode: 'miniProgramVoiceMeeting',
      platform: '黑卫士小程序会议',
      recordingConsentConfirmed: false,
      scheduledAt: '2026-06-21T15:00:00+08:00',
      source: 'wechat-miniprogram',
    })

    expect(pendingSession.status).toBe('待录音授权')
    expect(pendingSession.recordingEnabled).toBe(false)
    expect(pendingSession.warnings.join('')).toContain('录音')

    const readySession = buildMobileMeetingSession({
      ...pendingSession,
      candidateConsentConfirmed: true,
      recordingConsentConfirmed: true,
    })

    expect(readySession.status).toBe('可入会录音')
    expect(readySession.recordingEnabled).toBe(true)
    expect(readySession.archivePath).toContain('/api/mobile-work/meeting-recordings')
  })

  it('builds a full candidate guide for three interview rounds and arrival steps', () => {
    const summary = buildCandidateInterviewGuideSummary(defaultCandidateInterviewGuide)

    expect(summary.roundCount).toBe(3)
    expect(summary.arrivalStepCount).toBeGreaterThanOrEqual(7)
    expect(summary.missingRequiredSections).toEqual([])
    expect(summary.keywords).toEqual(
      expect.arrayContaining(['初试', '复试', '终试', '面试官', '面试题', '面试时间', '开车', '地铁', '公交', '停车', '上楼', '预约', '叫号']),
    )
  })
})
