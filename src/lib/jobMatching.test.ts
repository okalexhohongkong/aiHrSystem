import { describe, expect, it } from 'vitest'
import { jobFitScore, keywordMatchScore, rankJobs, type JobSeekerProfile } from './jobMatching'

const profile: JobSeekerProfile = {
  skills: ['短视频', '脚本', '直播', 'AI工具'],
  preferredBenefits: ['五险一金', '双休'],
  maxDistanceKm: 8,
  wantsPromotion: true,
}

describe('job seeker matching', () => {
  it('calculates keyword overlap against job requirements', () => {
    const result = keywordMatchScore(profile.skills, ['短视频', '直播', '剪辑'])

    expect(result.matched).toEqual(['短视频', '直播'])
    expect(result.score).toBe(67)
  })

  it('recommends applying only when keyword and total fit are strong', () => {
    const fit = jobFitScore(profile, {
      id: 'job-1',
      title: '自媒体内容运营',
      company: '星河传媒',
      keywords: ['短视频', '脚本', '直播'],
      benefits: ['五险一金', '双休', '绩效奖金'],
      distanceKm: 6,
      promotion: 'clear',
    })

    expect(fit.score).toBeGreaterThanOrEqual(90)
    expect(fit.shouldApply).toBe(true)
  })

  it('sorts better jobs ahead of weak matches', () => {
    const ranked = rankJobs(profile, [
      {
        id: 'job-weak',
        title: '财务助理',
        company: '远山集团',
        keywords: ['报税', '成本', '预算'],
        benefits: ['单休'],
        distanceKm: 16,
        promotion: 'limited',
      },
      {
        id: 'job-strong',
        title: '短视频运营',
        company: '清风品牌',
        keywords: ['短视频', '脚本', 'AI工具'],
        benefits: ['五险一金', '双休'],
        distanceKm: 4,
        promotion: 'clear',
      },
    ])

    expect(ranked[0].id).toBe('job-strong')
    expect(ranked[1].fit.shouldApply).toBe(false)
  })
})
