export type JobOpportunity = {
  id: string
  title: string
  company: string
  keywords: string[]
  benefits: string[]
  distanceKm: number
  promotion: 'clear' | 'normal' | 'limited'
}

export type JobSeekerProfile = {
  skills: string[]
  preferredBenefits: string[]
  maxDistanceKm: number
  wantsPromotion: boolean
}

export function keywordMatchScore(profileKeywords: string[], jobKeywords: string[]) {
  const profileSet = new Set(profileKeywords.map((keyword) => keyword.trim().toLowerCase()))
  const jobSet = new Set(jobKeywords.map((keyword) => keyword.trim().toLowerCase()))
  const matched = [...profileSet].filter((keyword) => jobSet.has(keyword))

  return {
    matched,
    score: jobSet.size === 0 ? 0 : Math.round((matched.length / jobSet.size) * 100),
  }
}

export function jobFitScore(profile: JobSeekerProfile, job: JobOpportunity) {
  const keyword = keywordMatchScore(profile.skills, job.keywords)
  const benefitMatches = profile.preferredBenefits.filter((benefit) => job.benefits.includes(benefit))
  const benefitScore = profile.preferredBenefits.length
    ? Math.round((benefitMatches.length / profile.preferredBenefits.length) * 100)
    : 60
  const distanceScore = job.distanceKm <= profile.maxDistanceKm ? 100 : Math.max(0, 100 - (job.distanceKm - profile.maxDistanceKm) * 8)
  const promotionScore = profile.wantsPromotion ? (job.promotion === 'clear' ? 100 : job.promotion === 'normal' ? 70 : 30) : 70
  const score = Math.round(keyword.score * 0.55 + benefitScore * 0.2 + distanceScore * 0.15 + promotionScore * 0.1)

  return {
    benefitMatches,
    keywordMatches: keyword.matched,
    score,
    shouldApply: score >= 75 && keyword.score >= 50,
  }
}

export function rankJobs(profile: JobSeekerProfile, jobs: JobOpportunity[]) {
  return jobs
    .map((job) => ({ ...job, fit: jobFitScore(profile, job) }))
    .sort((left, right) => right.fit.score - left.fit.score)
}
