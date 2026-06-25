import { describe, expect, it } from 'vitest'
import { initialCandidates } from '../data'
import {
  aiInterviewModeLabel,
  aiEvidenceRequirements,
  aiInterviewChannels,
  aiInterviewModes,
  aiInterviewStages,
  buildAiInterviewReport,
  buildAiInterviewRounds,
  requiredEvidenceTitles,
} from './aiInvitationInterview'

describe('AI invitation and interview module', () => {
  it('defines text, voice and self-introduction AI interview modes', () => {
    expect(aiInterviewModes.map((mode) => mode.id)).toEqual(['text', 'voice', 'selfIntro'])
    expect(aiInterviewModes.every((mode) => mode.requiredConsent.length > 0)).toBe(true)
  })

  it('builds three rounds of follow-up questions for a candidate', () => {
    const rounds = buildAiInterviewRounds(initialCandidates[0], 'selfIntro')

    expect(rounds).toHaveLength(3)
    expect(rounds[0].prompt).toContain('自我介绍')
    expect(rounds[1].evidenceTarget).toContain('业绩')
    expect(rounds[1].evidenceTarget).toContain('第三方证明')
    expect(rounds[2].prompt).toContain('期望薪资')
  })

  it('supports enterprise wechat, wechat, phone, internal voice meeting, recruiting text and timed checklist channels', () => {
    expect(aiInterviewChannels.map((channel) => channel.id)).toEqual([
      'wecom',
      'wechat',
      'phone',
      'internalVoiceMeeting',
      'recruitingPlatformText',
      'timedChecklist',
    ])
    expect(aiInterviewChannels.find((channel) => channel.id === 'timedChecklist')?.responseRule).toContain('逾期')
  })

  it('requires evidence for performance, salary, commission, honors and third-party background proof', () => {
    expect(requiredEvidenceTitles()).toEqual(['业绩佐证', '发工资佐证', '发提成佐证', '荣誉证书佐证', '第三方背景证明'])
    expect(aiEvidenceRequirements.find((item) => item.id === 'commission-proof')?.examples).toContain('提成账单')
  })

  it('creates a report that still requires human confirmation', () => {
    const report = buildAiInterviewReport(initialCandidates[0])

    expect(report.candidateName).toBe(initialCandidates[0].name)
    expect(report.score).toBeGreaterThan(0)
    expect(['现场复试', '电话/在线复试', '谈薪入职', '人工复核']).toContain(report.nextAction)
    expect(aiInterviewStages).toContain('人工确认')
  })

  it('returns a readable mode label', () => {
    expect(aiInterviewModeLabel('voice')).toBe('AI语音邀约/面试')
  })
})
