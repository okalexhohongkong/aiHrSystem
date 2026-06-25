export type WorkExperience = {
  company: string
  role: string
  startYear: number
  endYear: number
  direction: string
  achievements?: string
  personalSales?: number
  teamSales?: number
}

export type CandidateEvaluationInput = {
  graduationYear: number
  major: string
  targetPostType: 'sales' | 'operation' | 'function' | 'management' | 'tech' | 'finance' | 'hr'
  workExperiences: WorkExperience[]
  hasDoubleDegree?: boolean
  hasAcademicAchievement?: boolean
  hasPatent?: boolean
  hasZeroToOneProject?: boolean
  hasProjectManagerExperience?: boolean
  hasClearPerformance?: boolean
  majorMatchesPost?: boolean
}

export type SalesEvaluationInput = {
  personalSales: number
  teamSales?: number
  targetCompletionRate?: number
  hasDecisionMakerAccess: boolean
  hasSelfSourcedLeads: boolean
  hasContentLeadGen: boolean
  averageSalesCycleDays: number
  canExplainDealChain: boolean
  canProvideProof: boolean
  monthlyCommissionAvg?: number
  jobStabilityYears: number
  usesCrmOrReview?: boolean
  riskFlags?: string[]
}

export type Level = 'S' | 'A' | 'B' | 'C' | 'D'

export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score * 10) / 10))
}

export function experienceYears(exp: WorkExperience): number {
  return Math.max(0, exp.endYear - exp.startYear)
}

export function calculateExperienceBonus(experiences: WorkExperience[]): number {
  return experiences.reduce((total, exp) => {
    const years = experienceYears(exp)
    if (years >= 5) return total + 5
    if (years >= 3) return total + 3
    return total
  }, 0)
}

export function detectTimelineIssues(input: CandidateEvaluationInput): string[] {
  const issues: string[] = []
  const sorted = [...input.workExperiences].sort((a, b) => a.startYear - b.startYear)

  if (sorted.length > 0 && sorted[0].startYear < input.graduationYear - 1) {
    issues.push('工作开始时间早于毕业时间，需要核验实习/全职口径')
  }

  sorted.forEach((current, index) => {
    if (current.endYear < current.startYear) {
      issues.push(`${current.company}结束年份早于开始年份`)
    }
    const next = sorted[index + 1]
    if (!next) return
    if (next.startYear < current.endYear) {
      issues.push(`${current.company}与${next.company}存在全职时间重叠`)
    }
    if (next.startYear - current.endYear > 1) {
      issues.push(`${current.company}后存在超过1年的经历空窗`)
    }
  })

  return issues
}

export function calculateGeneralScore(input: CandidateEvaluationInput) {
  let score = 60
  const reasons: string[] = []
  const risks = detectTimelineIssues(input)

  const experienceBonus = calculateExperienceBonus(input.workExperiences)
  score += experienceBonus
  if (experienceBonus > 0) reasons.push(`稳定工作经历加${experienceBonus}分`)

  if (input.majorMatchesPost) {
    score += 6
    reasons.push('专业与岗位匹配加6分')
  } else {
    score -= 6
    risks.push('所学专业与岗位不匹配')
  }

  if (input.hasDoubleDegree) {
    score += 4
    reasons.push('双学历/复合背景加4分')
  }
  if (input.hasAcademicAchievement) {
    score += 4
    reasons.push('学术成果加4分')
  }
  if (input.hasPatent) {
    score += 6
    reasons.push('专利或软著加6分')
  }
  if (input.hasZeroToOneProject) {
    score += 8
    reasons.push('0-1项目经历加8分')
  }
  if (input.hasProjectManagerExperience) {
    score += 6
    reasons.push('项目负责人经历加6分')
  }
  if (input.hasClearPerformance) {
    score += 8
    reasons.push('明确业绩贡献加8分')
  }

  const shortJobs = input.workExperiences.filter((exp) => experienceYears(exp) <= 1).length
  if (shortJobs >= 2) {
    const penalty = Math.min(15, shortJobs * 5)
    score -= penalty
    risks.push(`存在${shortJobs}段一年左右短经历，扣${penalty}分`)
  }

  const uniqueDirections = new Set(input.workExperiences.map((exp) => exp.direction))
  if (uniqueDirections.size > 2) {
    const penalty = Math.min(9, (uniqueDirections.size - 2) * 3)
    score -= penalty
    risks.push(`工作方向切换较多，扣${penalty}分`)
  }

  if (risks.length > 0) {
    score -= Math.min(20, risks.length * 5)
  }

  return {
    score: clampScore(score),
    reasons,
    risks,
  }
}

export function calculateSalesScore(input: SalesEvaluationInput) {
  let score = 0
  const reasons: string[] = []
  const risks: string[] = [...(input.riskFlags ?? [])]

  const salesBase = Math.min(30, input.personalSales / 100000)
  score += salesBase
  if (input.personalSales > 0) reasons.push('有明确个人销售业绩')

  if (input.targetCompletionRate && input.targetCompletionRate >= 100) {
    score += 8
    reasons.push('目标完成率达到或超过100%')
  }

  if (input.hasDecisionMakerAccess) {
    score += 8
    reasons.push('能接触客户决策层')
  }
  if (input.hasSelfSourcedLeads) {
    score += 7
    reasons.push('具备自主获客能力')
  }
  if (input.hasContentLeadGen) {
    score += 5
    reasons.push('具备内容/直播/私域获客经验')
  }

  if (input.averageSalesCycleDays <= 60) {
    score += 5
  } else if (input.averageSalesCycleDays <= 180) {
    score += 3
  }

  if (input.canExplainDealChain) {
    score += 12
    reasons.push('能讲清成交链路')
  } else {
    risks.push('成交链路解释不清')
  }

  if (input.canProvideProof) {
    score += 8
    reasons.push('可提供业绩或薪酬佐证')
  } else {
    score -= 6
    risks.push('暂不能提供业绩/提成佐证')
  }

  if (input.monthlyCommissionAvg && input.monthlyCommissionAvg > 10000) {
    score += 4
  }

  if (input.jobStabilityYears >= 5) {
    score += 5
  } else if (input.jobStabilityYears >= 3) {
    score += 3
  }

  if (input.usesCrmOrReview) {
    score += 4
    reasons.push('有CRM或复盘习惯')
  }

  if (input.teamSales && input.teamSales > input.personalSales * 2) {
    risks.push('团队业绩显著高于个人业绩，需区分口径')
    score -= 4
  }

  return {
    score: clampScore(score),
    level: businessLevel(score),
    reasons,
    risks,
  }
}

export function businessLevel(score: number): 'A' | 'B' | 'C' | 'D' {
  if (score >= 80) return 'A'
  if (score >= 60) return 'B'
  if (score >= 40) return 'C'
  return 'D'
}

export function totalScore(commonScore: number, businessScore: number): number {
  return clampScore(commonScore * 0.6 + businessScore * 0.4)
}

export function totalLevel(score: number): Level {
  if (score >= 90) return 'S'
  if (score >= 80) return 'A'
  if (score >= 70) return 'B'
  if (score >= 60) return 'C'
  return 'D'
}

export function dashboardColor(value: number, target = 200) {
  if (value <= 0) return 'red'
  if (value < target * 0.6) return 'orange'
  if (value < target) return 'yellow'
  if (value >= target * 1.5) return 'blue'
  return 'green'
}
