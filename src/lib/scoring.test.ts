import { describe, expect, it } from 'vitest'
import {
  businessLevel,
  calculateExperienceBonus,
  calculateGeneralScore,
  calculateSalesScore,
  dashboardColor,
  detectTimelineIssues,
  totalLevel,
  totalScore,
  type CandidateEvaluationInput,
} from './scoring'

const baseCandidate: CandidateEvaluationInput = {
  graduationYear: 2015,
  major: '市场营销',
  targetPostType: 'sales',
  majorMatchesPost: true,
  workExperiences: [
    {
      company: 'A公司',
      role: '销售',
      startYear: 2015,
      endYear: 2018,
      direction: 'sales',
    },
    {
      company: 'B公司',
      role: '销售经理',
      startYear: 2018,
      endYear: 2024,
      direction: 'sales',
    },
  ],
}

describe('recruiting scoring engine', () => {
  it('adds 3 points for 3-year work segments and 5 points for 5-year segments', () => {
    expect(calculateExperienceBonus(baseCandidate.workExperiences)).toBe(8)
  })

  it('detects timeline overlaps and graduation mismatch', () => {
    const issues = detectTimelineIssues({
      ...baseCandidate,
      graduationYear: 2020,
      workExperiences: [
        { company: 'A', role: '专员', startYear: 2018, endYear: 2021, direction: 'sales' },
        { company: 'B', role: '经理', startYear: 2020, endYear: 2022, direction: 'sales' },
      ],
    })

    expect(issues).toEqual(
      expect.arrayContaining([
        '工作开始时间早于毕业时间，需要核验实习/全职口径',
        'A与B存在全职时间重叠',
      ]),
    )
  })

  it('rewards matching major, double degree, patents, zero-to-one projects and clear performance', () => {
    const result = calculateGeneralScore({
      ...baseCandidate,
      hasDoubleDegree: true,
      hasAcademicAchievement: true,
      hasPatent: true,
      hasZeroToOneProject: true,
      hasProjectManagerExperience: true,
      hasClearPerformance: true,
    })

    expect(result.score).toBeGreaterThanOrEqual(95)
    expect(result.reasons.length).toBeGreaterThan(5)
  })

  it('penalizes frequent short jobs and mismatched major', () => {
    const result = calculateGeneralScore({
      ...baseCandidate,
      majorMatchesPost: false,
      workExperiences: [
        { company: 'A', role: '运营', startYear: 2018, endYear: 2019, direction: 'operation' },
        { company: 'B', role: '销售', startYear: 2019, endYear: 2020, direction: 'sales' },
        { company: 'C', role: '客服', startYear: 2020, endYear: 2021, direction: 'service' },
      ],
    })

    expect(result.score).toBeLessThan(45)
    expect(result.risks).toEqual(expect.arrayContaining(['所学专业与岗位不匹配']))
  })

  it('scores sales candidates and flags proof or team-performance risks', () => {
    const result = calculateSalesScore({
      personalSales: 1800000,
      teamSales: 5000000,
      targetCompletionRate: 120,
      hasDecisionMakerAccess: true,
      hasSelfSourcedLeads: true,
      hasContentLeadGen: true,
      averageSalesCycleDays: 45,
      canExplainDealChain: true,
      canProvideProof: false,
      monthlyCommissionAvg: 12000,
      jobStabilityYears: 4,
      usesCrmOrReview: true,
    })

    expect(result.score).toBeGreaterThanOrEqual(60)
    expect(result.level).toBe('B')
    expect(result.risks).toEqual(
      expect.arrayContaining(['暂不能提供业绩/提成佐证', '团队业绩显著高于个人业绩，需区分口径']),
    )
  })

  it('maps business, total score and dashboard colors', () => {
    expect(businessLevel(82)).toBe('A')
    expect(totalScore(80, 70)).toBe(76)
    expect(totalLevel(91)).toBe('S')
    expect(dashboardColor(0)).toBe('red')
    expect(dashboardColor(80, 200)).toBe('orange')
    expect(dashboardColor(150, 200)).toBe('yellow')
    expect(dashboardColor(220, 200)).toBe('green')
    expect(dashboardColor(320, 200)).toBe('blue')
  })
})
