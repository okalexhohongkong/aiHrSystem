import { describe, expect, it } from 'vitest'
import {
  defaultResearchLockState,
  generateJobCompletionSuggestions,
  inferMissingRolesByCompanySize,
  jobMarketModuleName,
  keywordFrequency,
  marketResearchPostings,
  marketResearchResumeProfiles,
  matchResumeProfilesToPostings,
  researchCollectionPolicy,
  researchComplianceBoundary,
  researchPersonas,
  researchScopeSummary,
  salaryBenchmark,
} from './jobMarketResearch'

describe('job market research module', () => {
  it('uses reverse job-seeking research naming instead of a private personal job-seeking entry', () => {
    expect(jobMarketModuleName).toBe('反向求职调研')
  })

  it('is locked by default to prevent private job-seeking misuse', () => {
    expect(defaultResearchLockState.locked).toBe(true)
    expect(defaultResearchLockState.reason).toContain('私人求职')
    expect(defaultResearchLockState.allowedRoles).toEqual(['超级管理员', '招聘负责人'])
  })

  it('supports multiple research personas from a job-seeker perspective', () => {
    expect(researchPersonas).toHaveLength(3)
    expect(researchPersonas.map((persona) => persona.accountMode)).toContain('模拟角色')
    expect(researchPersonas.map((persona) => persona.accountMode)).toContain('授权调研账号')
    expect(researchScopeSummary(researchPersonas)).toContain('AI应用/硬件产品')
    expect(researchPersonas[0].profileTags.personalSkillTags.length).toBeGreaterThan(0)
    expect(researchPersonas[0].profileTags.jobMatchTags.length).toBeGreaterThan(0)
    expect(researchPersonas[0].profileTags.skillTags.length).toBeGreaterThan(0)
    expect(researchPersonas[0].profileTags.educationTags.length).toBeGreaterThan(0)
    expect(researchPersonas[0].profileTags.achievementTags.length).toBeGreaterThan(0)
    expect(researchPersonas[0].profileTags.performanceTags.length).toBeGreaterThan(0)
  })

  it('supports multiple authorized resume profiles as market research identities', () => {
    expect(marketResearchResumeProfiles.length).toBeGreaterThanOrEqual(4)
    expect(marketResearchResumeProfiles.every((profile) => profile.resumeSource === '人工上传样本')).toBe(true)
    expect(marketResearchResumeProfiles.every((profile) => profile.authorizationStatus === '公司授权调研')).toBe(true)
    expect(marketResearchResumeProfiles[0].profileTags.personalSkillTags.length).toBeGreaterThan(0)
    expect(marketResearchResumeProfiles[0].profileTags.jobMatchTags.length).toBeGreaterThan(0)
    expect(marketResearchResumeProfiles[0].profileTags.skillTags.length).toBeGreaterThan(0)
    expect(marketResearchResumeProfiles[0].targetCompetitors.length).toBeGreaterThan(0)
  })

  it('keeps company scale, org structure, benefits, promotion and performance fields on peer postings', () => {
    expect(marketResearchPostings.every((posting) => posting.companySize)).toBe(true)
    expect(marketResearchPostings.every((posting) => posting.organizationStructure.length > 0)).toBe(true)
    expect(marketResearchPostings.every((posting) => posting.openHeadcount > 0)).toBe(true)
    expect(marketResearchPostings.every((posting) => posting.benefits.length > 0)).toBe(true)
    expect(marketResearchPostings.every((posting) => posting.promotionPath.length > 0)).toBe(true)
    expect(marketResearchPostings.every((posting) => posting.performanceRequirements.length > 0)).toBe(true)
    expect(marketResearchPostings.find((posting) => posting.id === 'posting-3')?.jobFamily).toBe('产品研发')
  })

  it('matches each resume profile to competitor postings and market requirements', () => {
    const matches = matchResumeProfilesToPostings(marketResearchResumeProfiles, marketResearchPostings)
    const salesProfile = matches.find((match) => match.profileId === 'resume-sales-01')

    expect(matches.length).toBeGreaterThan(marketResearchResumeProfiles.length)
    expect(salesProfile?.topPostingTitle).toBe('大客户销售')
    expect(salesProfile?.topPostingCompany).toBe('安途科技')
    expect(salesProfile?.matchedKeywords).toEqual(expect.arrayContaining(['大客户', 'B端', '渠道', '业绩']))
    expect(salesProfile?.marketSignals).toEqual(
      expect.arrayContaining(['公司规模', '组织架构', '岗位数量', '薪酬区间', '岗位职责', '绩效要求', '同行在招公司']),
    )
  })

  it('keeps collection policy compliant instead of bypassing platform protections', () => {
    expect(researchCollectionPolicy.dataSources).toEqual(
      expect.arrayContaining(['公开信息', '公开岗位页面人工导入', '授权账号可见信息', '人工上传样本']),
    )
    expect(researchCollectionPolicy.prohibited).toEqual(
      expect.arrayContaining(['绕过反爬', '高频自动化抓取', '保存个人账号密码', '验证码绕过', '反检测规避']),
    )
  })

  it('extracts market keyword frequency from peer postings', () => {
    const keywords = keywordFrequency(marketResearchPostings)
    const topKeywords = keywords.slice(0, 4)

    expect(topKeywords).toContainEqual({ keyword: '直播', count: 2 })
    expect(keywords.some((item) => item.keyword === 'AI产品')).toBe(true)
  })

  it('keeps job matching tags on peer postings for comparing candidate profile and JD keywords', () => {
    expect(marketResearchPostings.every((posting) => posting.jobMatchTags.length > 0)).toBe(true)
    expect(marketResearchPostings.find((posting) => posting.id === 'posting-3')?.jobMatchTags).toEqual(
      expect.arrayContaining(['AI产品经理', '0到1项目', '硬件产品']),
    )
  })

  it('builds salary benchmarks from research postings', () => {
    const benchmark = salaryBenchmark(marketResearchPostings)

    expect(benchmark.sampleCount).toBe(4)
    expect(benchmark.min).toBe(9000)
    expect(benchmark.max).toBe(30000)
    expect(benchmark.averageMin).toBe(12250)
    expect(benchmark.averageMax).toBe(22000)
  })

  it('builds scoped salary benchmarks by company size and job family', () => {
    expect(salaryBenchmark(marketResearchPostings, { companySize: '成长型公司' })).toMatchObject({
      averageMax: 16500,
      averageMin: 10500,
      sampleCount: 2,
    })
    expect(salaryBenchmark(marketResearchPostings, { jobFamily: '产品研发' })).toMatchObject({
      max: 30000,
      min: 18000,
      sampleCount: 1,
    })
  })

  it('generates completion suggestions from peer market samples', () => {
    const suggestions = generateJobCompletionSuggestions(marketResearchPostings)

    expect(suggestions.map((suggestion) => suggestion.field)).toEqual(
      expect.arrayContaining(['公司规模', '组织架构', '岗位数量', '岗位JD', '薪酬福利', '晋升空间', '绩效要求', '岗位族']),
    )
    expect(suggestions.find((suggestion) => suggestion.field === '薪酬福利')?.suggestion).toContain('9000-30000元/月')
    expect(suggestions.find((suggestion) => suggestion.field === '岗位JD')?.evidence).toEqual(
      expect.arrayContaining(['直播 x2']),
    )
  })

  it('cross-fills missing roles from comparable company scale samples', () => {
    const gaps = inferMissingRolesByCompanySize('成长型公司', ['自媒体内容运营'], marketResearchPostings)

    expect(gaps).toHaveLength(1)
    expect(gaps[0]).toMatchObject({
      companySize: '成长型公司',
      jobFamily: '内容增长',
      priority: '高',
      role: '直播运营助理',
    })
    expect(gaps[0].reason).toContain('合计5个岗位')
  })

  it('outputs a compliance boundary for safe single-machine research', () => {
    const boundary = researchComplianceBoundary()

    expect(boundary.allowedDataSources).toEqual(
      expect.arrayContaining(['公开信息', '授权账号可见信息', '人工上传样本']),
    )
    expect(boundary.boundaryText).toContain('仅使用公开信息')
    expect(boundary.boundaryText).toContain('不绕过平台规则')
    expect(boundary.prohibitedActions.join('；')).toContain('不托管账号密码明文')
    expect(boundary.usageNotes.join('；')).toContain('岗位补齐')
  })
})
