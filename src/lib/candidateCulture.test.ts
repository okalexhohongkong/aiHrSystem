import { describe, expect, it } from 'vitest'
import {
  culturalNoteCanBeRecorded,
  culturalNoteCanAffectScore,
  culturalNotePolicy,
  hrCallQualityItems,
  hrCallQualityScore,
} from './candidateCulture'

describe('candidate cultural notes and HR call quality', () => {
  it('keeps cultural notes out of scoring and hiring decisions', () => {
    expect(culturalNotePolicy.canRecordWithConsent).toBe(true)
    expect(culturalNotePolicy.excludedFromScoring).toBe(true)
    expect(culturalNotePolicy.excludedFromHiringDecision).toBe(true)
    expect(culturalNotePolicy.requiresCandidateBeliefAndConsent).toBe(true)
    expect(culturalNotePolicy.mustBeCandidateInitiatedOrAccepted).toBe(true)
    expect(culturalNotePolicy.canBeUsedForRapportOnly).toBe(true)
    expect(culturalNotePolicy.allowedVoluntaryTopics).toEqual(expect.arrayContaining(['塔罗牌', '星座', '八字']))
    expect(culturalNotePolicy.interviewerPrompt).toContain('不主动追问')
    expect(culturalNoteCanAffectScore(culturalNotePolicy)).toBe(false)
  })

  it('only records tarot zodiac or bazi notes when belief and consent are both present', () => {
    expect(culturalNoteCanBeRecorded(culturalNotePolicy, true, true)).toBe(true)
    expect(culturalNoteCanBeRecorded(culturalNotePolicy, true, false)).toBe(false)
    expect(culturalNoteCanBeRecorded(culturalNotePolicy, false, true)).toBe(false)
  })

  it('scores HR call quality by completed SOP items', () => {
    expect(hrCallQualityScore(hrCallQualityItems)).toBe(80)
  })

  it('requires recording and authorization boundary reminders in call quality checks', () => {
    expect(hrCallQualityItems.map((item) => item.id)).toContain('consent')
    expect(hrCallQualityItems.map((item) => item.label).join('')).toContain('授权调查边界')
  })
})
