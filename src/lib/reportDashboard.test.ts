import { describe, expect, it } from 'vitest'
import { initialCandidates } from '../data'
import {
  buildCandidateTickerRows,
  highScoreCandidates,
  paginateReportRows,
  popupSizeClass,
  postScrollSize,
  reportScrollDuration,
} from './reportDashboard'

describe('report dashboard presentation helpers', () => {
  it('groups post cards into different scroll sizes by candidate volume', () => {
    expect(postScrollSize(1)).toEqual({ className: 'small', maxHeight: 220 })
    expect(postScrollSize(3)).toEqual({ className: 'medium', maxHeight: 340 })
    expect(postScrollSize(6)).toEqual({ className: 'large', maxHeight: 480 })
  })

  it('paginates rows and clamps invalid page numbers', () => {
    expect(paginateReportRows(initialCandidates, 1, 2).items).toHaveLength(2)
    expect(paginateReportRows(initialCandidates, 99, 2).page).toBe(2)
    expect(paginateReportRows(initialCandidates, 0, 2).page).toBe(1)
  })

  it('maps higher speed settings to faster scroll durations', () => {
    expect(reportScrollDuration(1)).toBe(36)
    expect(reportScrollDuration(3)).toBe(24)
    expect(reportScrollDuration(5)).toBe(12)
    expect(reportScrollDuration(99)).toBe(12)
  })

  it('selects high score candidates for popup resume display', () => {
    const highScores = highScoreCandidates(initialCandidates, 80)

    expect(highScores.length).toBeGreaterThan(0)
    expect(highScores.every((candidate) => candidate.totalScore >= 80)).toBe(true)
  })

  it('maps popup sizes to stable classes', () => {
    expect(popupSizeClass('full')).toBe('popup-full')
    expect(popupSizeClass('half')).toBe('popup-half')
    expect(popupSizeClass('third')).toBe('popup-third')
    expect(popupSizeClass('quarter')).toBe('popup-quarter')
  })

  it('builds candidate ticker rows for summary, full resume, greeting and one-line modes', () => {
    const candidate = initialCandidates[0]

    expect(buildCandidateTickerRows(candidate, 'summary')).toContain(candidate.agentSummary)
    expect(buildCandidateTickerRows(candidate, 'full')).toContain(candidate.transcript)
    expect(buildCandidateTickerRows(candidate, 'greeting')).toContain('您好')
    expect(buildCandidateTickerRows(candidate, 'minimal')).toContain(candidate.postName)
  })
})
