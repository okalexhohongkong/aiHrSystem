import { describe, expect, it } from 'vitest'
import { initialCandidates } from '../data'
import {
  autoDispatchSeverityLabel,
  autoDispatchStageLabel,
  buildAutoDispatchBoard,
  evaluateAutoDispatchCase,
  type AutoDispatchCase,
} from './autoDispatch'

const confirmedCase: AutoDispatchCase = {
  candidateId: initialCandidates[0].id,
  candidateName: initialCandidates[0].name,
  changeReason: '首次安排',
  changeType: '首次安排',
  candidateElectronicConfirmed: true,
  candidateNotified: true,
  candidatePhoneConfirmed: true,
  candidateReplied: true,
  contactMetrics: {
    acceptedChats: 3,
    acceptedInvitations: 2,
    conversations: 8,
    emails: 1,
    invitations: 4,
    messages: 5,
    phones: 2,
    replies: 3,
    resumes: 2,
    wechat: 2,
    wechatExchanged: 1,
  },
  interviewerElectronicConfirmed: true,
  interviewerName: '陈HR',
  interviewerNotified: true,
  interviewerPhoneConfirmed: true,
  interviewerReplied: true,
  interviewMode: '线上',
  location: '一号会议室',
  meetingRoom: 'A-1001',
  notifiedChannels: ['email', 'wechat'],
  platform: '腾讯会议',
  roundId: 'first',
  roundName: '初试',
  scheduledAt: '2026-06-20T15:00:00+08:00',
  score: 86,
  threshold: 80,
}

describe('auto dispatch workflow', () => {
  it('marks a case as confirmed when both sides have confirmed electronically', () => {
    const evaluation = evaluateAutoDispatchCase(confirmedCase, new Date('2026-06-20T12:00:00+08:00'))

    expect(evaluation.confirmationStage).toBe('已双向确认')
    expect(evaluation.severity).toBe('green')
    expect(evaluation.decision).toBe('安排面试')
    expect(evaluation.notificationText).toContain('邮件')
    expect(evaluation.nextActions).toContain('锁定时间地点')
  })

  it('falls back to phone confirmation before escalating to alarm', () => {
    const evaluation = evaluateAutoDispatchCase(
      {
        ...confirmedCase,
        candidateElectronicConfirmed: false,
        candidatePhoneConfirmed: true,
        candidateReplied: false,
        interviewerElectronicConfirmed: false,
        interviewerPhoneConfirmed: true,
        interviewerReplied: false,
        scheduledAt: '2026-06-20T14:30:00+08:00',
      },
      new Date('2026-06-20T12:00:00+08:00'),
    )

    expect(evaluation.confirmationStage).toBe('双向电话确认')
    expect(evaluation.phoneFollowupStatus).toBe('电话已确认')
    expect(evaluation.severity).toBe('yellow')
    expect(evaluation.nextActions).toContain('预留应急改派入口')
  })

  it('raises a red alarm when start time is close and neither side replies', () => {
    const evaluation = evaluateAutoDispatchCase(
      {
        ...confirmedCase,
        candidateElectronicConfirmed: false,
        candidateNotified: true,
        candidatePhoneConfirmed: false,
        candidateReplied: false,
        interviewerElectronicConfirmed: false,
        interviewerNotified: true,
        interviewerPhoneConfirmed: false,
        interviewerReplied: false,
        scheduledAt: '2026-06-20T12:30:00+08:00',
      },
      new Date('2026-06-20T12:00:00+08:00'),
    )

    expect(evaluation.confirmationStage).toBe('报警')
    expect(evaluation.requiresModal).toBe(true)
    expect(evaluation.severity).toBe('red')
    expect(evaluation.alertMessage).toContain('标红')
    expect(evaluation.nextActions).toEqual(expect.arrayContaining(['启用后备面试官', '电话追呼候选人和面试官']))
  })

  it('builds a board with summary counts and aggregated contact metrics', () => {
    const board = buildAutoDispatchBoard(
      [
        confirmedCase,
        {
          ...confirmedCase,
          candidateId: initialCandidates[2].id,
          candidateName: initialCandidates[2].name,
          scheduledAt: '2026-06-20T16:10:00+08:00',
          candidateElectronicConfirmed: false,
          candidatePhoneConfirmed: true,
          candidateReplied: false,
          interviewerElectronicConfirmed: false,
          interviewerPhoneConfirmed: true,
          interviewerReplied: false,
          notifiedChannels: ['wechat', 'phone'],
        },
        {
          ...confirmedCase,
          candidateId: initialCandidates[1].id,
          candidateName: initialCandidates[1].name,
          score: 62,
          threshold: 75,
          scheduledAt: '2026-06-20T12:10:00+08:00',
          candidateElectronicConfirmed: false,
          candidateNotified: true,
          candidatePhoneConfirmed: false,
          candidateReplied: false,
          interviewerElectronicConfirmed: false,
          interviewerNotified: false,
          interviewerPhoneConfirmed: false,
          interviewerReplied: false,
          notifiedChannels: ['sms', 'phone'],
        },
      ],
      new Date('2026-06-20T12:00:00+08:00'),
    )

    expect(board.summary.total).toBe(3)
    expect(board.summary.confirmed).toBe(1)
    expect(board.summary.phoneFollowup).toBe(1)
    expect(board.summary.alarm).toBe(1)
    expect(board.summary.underThreshold).toBe(1)
    expect(board.summary.emails).toBe(3)
    expect(board.summary.wechatExchanged).toBe(3)
    expect(board.decisionCounts['入库储备']).toBe(1)
    expect(board.decisionCounts['安排面试']).toBe(2)
  })

  it('exposes readable labels for stage and severity', () => {
    expect(autoDispatchStageLabel('报警')).toBe('报警')
    expect(autoDispatchSeverityLabel('red')).toBe('红色报警')
  })
})
