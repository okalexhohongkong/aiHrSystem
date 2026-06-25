import { describe, expect, it } from 'vitest'
import { initialCandidates } from '../data'
import {
  addManualDisplayField,
  buildAiTimeoutFallbackStrategy,
  buildCandidateFollowupStrategy,
  candidateApplyTimeWindow,
  candidateBoardLayoutPreference,
  candidateBoardRowTone,
  candidateBoardTimeText,
  candidateFieldToggleLayoutPreference,
  candidateFocusMatches,
  candidateJobCode,
  candidateJobCodeProfile,
  candidateKeywordTone,
  candidateMatchScore,
  candidateMatchStatus,
  candidatePlatformAccountText,
  candidatePoolColumnLabels,
  dataFieldStatusCounts,
  defaultAiTimeoutFallbackTemplates,
  defaultCandidateFocusTags,
  displayFieldDensityClass,
  externalApplicationText,
  jobCount,
  jobHopSummary,
  lastVisibleActiveText,
  restrictedCandidateFields,
  salaryRangeText,
  sortCandidates,
  sortCandidatesByApplyTime,
  toggleCandidatePoolColumn,
  totalWorkYears,
} from './candidatePool'

describe('candidate pool presentation helpers', () => {
  it('defaults the interview board to horizontal striped rows', () => {
    expect(candidateBoardLayoutPreference.title).toBe('候选看板')
    expect(candidateBoardLayoutPreference.mode).toBe('horizontal-rows')
    expect(candidateBoardLayoutPreference.rowStripe).toEqual(['white', 'light-blue'])
    expect(candidateBoardLayoutPreference.primaryTone).toBe('deep-blue')
    expect(candidateBoardRowTone(0)).toBe('white')
    expect(candidateBoardRowTone(1)).toBe('light-blue')
  })

  it('uses compact board labels and display helpers', () => {
    expect(candidatePoolColumnLabels).toMatchObject({
      activity: '平台活跃度来源',
      fieldStatus: '资料完整度',
      matchStatus: '全向匹配度',
      peerWeight: '同业同行权重',
    })
    expect(candidateBoardTimeText(initialCandidates[0].appliedAt)).toBe('26 0619 10:18')
    expect(candidateJobCode(initialCandidates[0])).toBe('BDM')
    expect(candidateJobCodeProfile(initialCandidates[3])).toMatchObject({
      englishTitle: 'AI System Developer',
      jobCode: 'AI-SDE',
    })
    expect(candidatePlatformAccountText(initialCandidates[0])).toBe('BOSS-0001')
  })

  it('keeps candidate field toggles content-fit and compact', () => {
    expect(candidateFieldToggleLayoutPreference).toMatchObject({
      gapPx: 5,
      horizontalPaddingEm: 0.65,
      sizing: 'content-fit',
    })
  })

  it('classifies resume keywords by risk and quality colors', () => {
    expect(candidateKeywordTone('方向切换多')).toBe('red')
    expect(candidateKeywordTone('待补充')).toBe('orange')
    expect(candidateKeywordTone('Python')).toBe('blue')
    expect(candidateKeywordTone('业绩清晰')).toBe('green')
    expect(candidateKeywordTone('普通关键词')).toBe('black')
  })

  it('sorts candidates by latest and oldest application time', () => {
    expect(sortCandidatesByApplyTime(initialCandidates, 'newest')[0].name).toBe('陈琳')
    expect(sortCandidatesByApplyTime(initialCandidates, 'oldest')[0].name).toBe('赵磊')
  })

  it('sorts candidates by score and match priority', () => {
    expect(sortCandidates(initialCandidates, 'scoreHigh')[0].totalScore).toBeGreaterThanOrEqual(
      sortCandidates(initialCandidates, 'scoreHigh')[1].totalScore,
    )
    expect(sortCandidates(initialCandidates, 'scoreLow')[0].totalScore).toBeLessThanOrEqual(
      sortCandidates(initialCandidates, 'scoreLow')[1].totalScore,
    )
    expect(sortCandidates(initialCandidates, 'matchHigh', defaultCandidateFocusTags)[0].name).toBe('李晨')
  })

  it('toggles optional table columns', () => {
    expect(toggleCandidatePoolColumn(['contact', 'salary'], 'salary')).toEqual(['contact'])
    expect(toggleCandidatePoolColumn(['contact'], 'salary')).toEqual(['contact', 'salary'])
  })

  it('summarizes work years and job count', () => {
    expect(totalWorkYears(initialCandidates[0])).toBe(9)
    expect(jobCount(initialCandidates[0])).toBe(2)
    expect(jobHopSummary(initialCandidates[0])).toContain('2份工作')
  })

  it('formats expected salary range', () => {
    expect(salaryRangeText(initialCandidates[0])).toBe('12-20K')
  })

  it('formats platform activity and application signals', () => {
    expect(externalApplicationText(initialCandidates[2])).toContain('3份')
    expect(lastVisibleActiveText(initialCandidates[0])).toContain('最近活跃')
  })

  it('summarizes field availability statuses', () => {
    const counts = dataFieldStatusCounts(initialCandidates[0])

    expect(counts['已采集']).toBeGreaterThan(0)
    expect(counts['受限不采集']).toBeGreaterThan(0)
  })

  it('keeps sensitive fields out of default candidate pool columns', () => {
    expect(restrictedCandidateFields).toContain('宗教信仰')
    expect(restrictedCandidateFields).toContain('婚育状态')
  })

  it('matches configurable job-related focus tags', () => {
    const matches = candidateFocusMatches(initialCandidates[0], defaultCandidateFocusTags)

    expect(matches).toContain('会开车')
    expect(matches).toContain('Office')
    expect(matches).toContain('第一学历本科及以上')
  })

  it('calculates match score from score tags peer weight and collected fields', () => {
    const score = candidateMatchScore(initialCandidates[0], defaultCandidateFocusTags)
    const lowerScore = candidateMatchScore(initialCandidates[3], defaultCandidateFocusTags)

    expect(score).toBeGreaterThan(lowerScore)
    expect(candidateMatchStatus(score).label).toBe('高匹配')
    expect(candidateMatchStatus(lowerScore).label).toBe('可储备')
  })

  it('adds manual display fields while trimming and deduplicating labels', () => {
    expect(addManualDisplayField(['会开车', 'Office'], ' 视频号运营 ')).toEqual(['会开车', 'Office', '视频号运营'])
    expect(addManualDisplayField(['Office'], 'Office')).toEqual(['Office'])
    expect(addManualDisplayField(['Office'], '  ')).toEqual(['Office'])
  })

  it('switches candidate pool controls into compact density when too many fields are selected', () => {
    expect(displayFieldDensityClass(8)).toBe('normal')
    expect(displayFieldDensityClass(13)).toBe('compact')
    expect(displayFieldDensityClass(21)).toBe('micro')
  })

  it('prioritizes fresh excellent candidates for manual follow-up before AI fallback', () => {
    const timeWindow = candidateApplyTimeWindow(
      initialCandidates[0].appliedAt,
      '2026-06-19T11:05:00+08:00',
    )
    const strategy = buildCandidateFollowupStrategy({
      candidate: initialCandidates[0],
      now: '2026-06-19T11:05:00+08:00',
      salaryBudgetMax: 22,
      salaryBudgetMin: 12,
      talentLayer: '中层干部',
    })

    expect(timeWindow.label).toBe('黄金跟进')
    expect(strategy.priority).toBe('立即联系')
    expect(strategy.owner).toBe('人工HR')
    expect(strategy.urgencyScore).toBeGreaterThanOrEqual(90)
    expect(strategy.reasons).toEqual(
      expect.arrayContaining(['投递仍在黄金跟进期', '优秀候选人', '薪酬高度匹配', '干部/技术/决策层']),
    )
    expect(strategy.nextAction).toContain('人工')
    expect(strategy.archiveAdvice.decision).toBe('暂不沉淀')
  })

  it('recommends layered archive when timeliness and salary match are weak', () => {
    const strategy = buildCandidateFollowupStrategy({
      candidate: initialCandidates[3],
      now: '2026-06-21T12:00:00+08:00',
      salaryBudgetMax: 16,
      salaryBudgetMin: 10,
      talentLayer: '技术层',
    })

    expect(strategy.priority).toBe('入库观察')
    expect(strategy.owner).toBe('人工HR')
    expect(strategy.reasons).toEqual(expect.arrayContaining(['投递已超48小时', '薪酬匹配低', '岗位工种为技术']))
    expect(strategy.archiveAdvice).toMatchObject({
      decision: '分层沉淀',
      library: '技术层人才库',
      reviewCadence: '30天复评',
    })
    expect(strategy.archiveAdvice.notes).toContain('薪酬差距')
  })

  it('keeps AI timeout fallback manual-first and restricted to reviewed low-risk scripts', () => {
    expect(defaultAiTimeoutFallbackTemplates.every((template) => template.approvedByAdmin)).toBe(true)
    expect(defaultAiTimeoutFallbackTemplates.every((template) => template.riskLevel === '低')).toBe(true)

    const waiting = buildAiTimeoutFallbackStrategy({
      candidate: initialCandidates[2],
      lastHumanActionAt: '2026-06-19T11:05:00+08:00',
      manualOwner: 'HR王',
      now: '2026-06-19T11:40:00+08:00',
      timeoutMinutes: 120,
    })
    const fallback = buildAiTimeoutFallbackStrategy({
      candidate: initialCandidates[2],
      lastHumanActionAt: '2026-06-19T11:05:00+08:00',
      manualOwner: 'HR王',
      now: '2026-06-19T14:20:00+08:00',
      timeoutMinutes: 120,
      templateId: 'resume-received-basic',
    })

    expect(waiting.mode).toBe('人工优先等待')
    expect(waiting.canUseAiFallback).toBe(false)
    expect(waiting.nextAction).toContain('HR王')
    expect(fallback.mode).toBe('AI超时兜底草稿')
    expect(fallback.canUseAiFallback).toBe(true)
    expect(fallback.externalSendAllowed).toBe(false)
    expect(fallback.selectedTemplate?.id).toBe('resume-received-basic')
    expect(fallback.messageDraft).toContain('已收到')
    expect(fallback.auditTrail).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ event: '人工超时' }),
        expect.objectContaining({ event: '预审话术命中' }),
        expect.objectContaining({ event: '外发拦截' }),
      ]),
    )
  })
})
