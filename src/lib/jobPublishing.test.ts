import { describe, expect, it } from 'vitest'
import {
  addManualKeyword,
  adjustJobPostingHeadcount,
  buildCompanyScaleRule,
  buildDailyJdIterationPlan,
  buildPrePublishingGenerationPlan,
  buildOrganizationHiringPlan,
  buildCandidateFollowupPriority,
  buildJobCodeProfile,
  compactDisplayClass,
  companyScaleRules,
  departmentBenchmarkQuestions,
  defaultDepartmentBenchmarkBrief,
  jobOpeningCount,
  jobPostingTypeLabels,
  jobPostingTypeOptions,
  metricBadges,
  pauseJobPosting,
  peerKeywordWeight,
  publishingConversionRate,
  summarizeDepartmentBenchmark,
  sumPostingMetrics,
  toggleJobPostingFavorite,
  voiceToJdPipeline,
  type DepartmentBenchmarkBrief,
  type CompanyHiringBlueprintInput,
  type JobPublishingCard,
  type JobPostingVariant,
} from './jobPublishing'

const variants: JobPostingVariant[] = [
  {
    id: 'v1',
    accountName: '业务岗招聘号',
    angle: '高提成销售',
    salary: '8-15K',
    jdTitle: '业务经理',
    metrics: {
      acceptedInterviews: 3,
      acceptedInvitations: 5,
      conversations: 18,
      emails: 2,
      invitations: 9,
      messages: 20,
      phones: 4,
      resumes: 8,
      visits: 120,
      wechat: 6,
      wechatExchanged: 4,
    },
  },
  {
    id: 'v2',
    accountName: '销售岗招聘号',
    angle: 'B端客户资源',
    salary: '10-20K',
    jdTitle: '大客户销售',
    metrics: {
      acceptedInterviews: 4,
      acceptedInvitations: 6,
      conversations: 22,
      emails: 3,
      invitations: 11,
      messages: 24,
      phones: 5,
      resumes: 10,
      visits: 180,
      wechat: 8,
      wechatExchanged: 6,
    },
  },
]

const card: JobPublishingCard = {
  department: '销售中心',
  hiredCount: 2,
  id: 'sales-manager',
  isFavorite: false,
  jdStatus: '已发布',
  keywords: ['B端客户'],
  postingType: 'fullTime',
  targetHeadcount: 5,
  title: '业务经理',
  variants,
}

describe('job publishing metrics', () => {
  it('sums all dynamic numbers across accounts and variants', () => {
    const total = sumPostingMetrics(variants)

    expect(total.visits).toBe(300)
    expect(total.messages).toBe(44)
    expect(total.resumes).toBe(18)
    expect(total.wechatExchanged).toBe(10)
    expect(total.acceptedInterviews).toBe(7)
  })

  it('creates card badges for all visible metrics', () => {
    const badges = metricBadges(sumPostingMetrics(variants))

    expect(badges).toHaveLength(11)
    expect(badges.slice(0, 6).map((badge) => badge.label)).toEqual([
      '访问',
      '留言',
      '简历',
      '电话',
      '邮箱',
      '微信',
    ])
    expect(badges.find((badge) => badge.label === '电话')?.value).toBe(9)
  })

  it('calculates resume conversion rate from visits', () => {
    expect(publishingConversionRate(sumPostingMetrics(variants))).toBe(6)
  })

  it('keeps the voice-to-JD generation pipeline in order', () => {
    expect(voiceToJdPipeline()).toEqual([
      '原始录音',
      '录音转写',
      '转写大纲',
      '部门长标杆画像',
      'HR视角补充',
      '岗位能力图谱',
      '思维导图',
      '完整JD',
      '多版本发布文案',
    ])
  })

  it('provides benchmark prompts for department heads who cannot describe the role', () => {
    const questions = departmentBenchmarkQuestions()

    expect(questions).toHaveLength(6)
    expect(questions[0]).toContain('10家')
    expect(questions[1]).toContain('部门')
    expect(questions[4]).toContain('关键指标')
    expect(questions[4]).toContain('关键特征')
    expect(questions[5]).toContain('相近')
  })

  it('summarizes competitor and similar-company benchmark profiles into JD keywords', () => {
    const brief: DepartmentBenchmarkBrief = {
      departmentName: '销售中心',
      plainNeed: '想找做过同行大客户销售的人',
      alternativeCompanyTraits: ['B端客户相近', '项目制销售', '客单价10万以上'],
      keyKeywords: ['大客户销售', '渠道开拓'],
      keyMetrics: ['年业绩200万以上', '回款率90%以上'],
      keyTraits: ['能从0到1开拓', '能提供业绩佐证'],
      targetCompanies: [
        {
          companyName: '云启科技',
          desiredAchievements: ['个人年业绩200万以上', '拿下KA客户'],
          priority: '高',
          relation: '直接同行',
          targetDepartments: ['大客户销售部'],
          targetRoles: ['销售经理'],
        },
        {
          companyName: '星河软件',
          desiredAchievements: ['搭建渠道体系'],
          priority: '中',
          relation: '相近公司',
          targetDepartments: ['渠道部'],
          targetRoles: ['渠道经理'],
        },
      ],
    }

    const summary = summarizeDepartmentBenchmark(brief)

    expect(summary.companyCount).toBe(2)
    expect(summary.highPriorityCompanies).toEqual(['云启科技'])
    expect(summary.departments).toContain('大客户销售部')
    expect(summary.achievements).toContain('个人年业绩200万以上')
    expect(summary.keyKeywords).toEqual(['大客户销售', '渠道开拓'])
    expect(summary.keyMetrics).toContain('回款率90%以上')
    expect(summary.keyTraits).toContain('能提供业绩佐证')
    expect(summary.jdKeywords).toContain('大客户销售')
    expect(summary.jdKeywords).toContain('年业绩200万以上')
    expect(summary.jdKeywords).toContain('能从0到1开拓')
    expect(summary.jdKeywords).toContain('项目制销售')
  })

  it('adds weighted peer keywords for target companies, departments, roles and achievements', () => {
    const result = peerKeywordWeight(
      '候选人在云启科技大客户销售部做过销售经理，个人年业绩200万以上，熟悉B端客户相近业务。',
      defaultDepartmentBenchmarkBrief,
    )

    expect(result.score).toBeGreaterThanOrEqual(31)
    expect(result.matches.map((match) => match.keyword)).toEqual(
      expect.arrayContaining(['云启科技', '大客户销售部', '销售经理', '个人年业绩200万以上', 'B端客户相近']),
    )
  })

  it('tracks posting type, headcount actions, favorite and pause states', () => {
    expect(jobPostingTypeLabels.fullTime).toBe('全职岗位')
    expect(jobPostingTypeLabels.partTime).toBe('兼职岗位')
    expect(jobPostingTypeLabels.hourly).toBe('小时工岗位')
    expect(jobPostingTypeLabels.partner).toBe('合伙人岗位')
    expect(jobPostingTypeLabels.secondaryIntern).toBe('中专实习生岗位')
    expect(jobPostingTypeLabels.vocationalIntern).toBe('高职实习生岗位')
    expect(jobPostingTypeLabels.undergraduateIntern).toBe('本科实习生岗位')
    expect(jobPostingTypeLabels.masterIntern).toBe('硕士实习生岗位')
    expect(jobPostingTypeLabels.doctoralIntern).toBe('博士实习生岗位')
    expect(jobPostingTypeOptions.filter((option) => option.category === '实习生岗位')).toHaveLength(5)

    expect(jobOpeningCount(card)).toBe(3)
    expect(adjustJobPostingHeadcount(card, 2).targetHeadcount).toBe(7)
    expect(adjustJobPostingHeadcount(card, -10).targetHeadcount).toBe(2)
    expect(toggleJobPostingFavorite(card).isFavorite).toBe(true)
    expect(pauseJobPosting(card).jdStatus).toBe('暂停中')
    expect(pauseJobPosting({ ...card, jdStatus: '暂停中' }).jdStatus).toBe('已发布')
  })

  it('builds short English job codes for long Chinese job titles', () => {
    expect(buildJobCodeProfile('市场中心总监')).toEqual({
      englishTitle: 'Marketing Director',
      jobCode: 'MD',
    })
    expect(buildJobCodeProfile('AI硬件产品经理')).toEqual({
      englishTitle: 'AI Hardware Product Manager',
      jobCode: 'AI-HW PM',
    })
    expect(buildJobCodeProfile('自媒体创意制作')).toEqual({
      englishTitle: 'Social Media Creative',
      jobCode: 'SMC',
    })
  })

  it('adds manual skill keywords while trimming and deduplicating entries', () => {
    expect(addManualKeyword(['短视频', '脚本'], ' 视频号运营、脚本, 直播 ')).toEqual([
      '短视频',
      '脚本',
      '视频号运营',
      '直播',
    ])
    expect(addManualKeyword(['AI方案'], '   ')).toEqual(['AI方案'])
  })

  it('returns compact density classes when many job fields need to be displayed', () => {
    expect(compactDisplayClass(6)).toBe('normal')
    expect(compactDisplayClass(10)).toBe('compact')
    expect(compactDisplayClass(18)).toBe('micro')
  })

  it('turns company and industry introductions into an AI organization hiring plan', () => {
    const plan = buildOrganizationHiringPlan({
      companyIntro: '我们是一家AI硬件和招聘系统公司，需要做销售增长、自媒体内容和AI系统开发。',
      industryIntro: '行业涉及人工智能、智能硬件、企业服务和线上招聘。',
      voiceTranscript: '老板口述希望先搭销售、内容、产品技术和经营管理。',
    })

    expect(plan.departments.map((department) => department.departmentName)).toEqual(
      expect.arrayContaining(['销售中心', '品牌内容部', '产品技术中心', '经营管理部']),
    )
    expect(plan.postingLadder[0].focus).toContain('负责人')
    expect(plan.aiCorrectionSteps).toContain('根据部门编制推理岗位分布和职责')
    expect(plan.humanConfirmationItems).toContain('是否允许AI自动发布，发布到哪些账号和平台')
  })

  it('uses department headcount and role count to create publishing ladder and role responsibilities', () => {
    const input: CompanyHiringBlueprintInput = {
      companyIntro: '公司要扩销售和内容团队',
      departmentBriefs: [
        { departmentName: '销售中心', roleCount: 2, targetHeadcount: 6 },
        { departmentName: '品牌内容部', roleCount: 3, targetHeadcount: 4 },
      ],
      industryIntro: '企业服务',
    }
    const plan = buildOrganizationHiringPlan(input)
    const salesDepartment = plan.departments.find((department) => department.departmentName === '销售中心')

    expect(plan.totalHeadcount).toBe(10)
    expect(salesDepartment?.roles).toHaveLength(2)
    expect(salesDepartment?.roles[0].responsibilities.join(' ')).toContain('销售目标')
    expect(plan.postingLadder.reduce((sum, stage) => sum + stage.targetHeadcount, 0)).toBe(10)
    expect(plan.postingLadder[1].roles.some((role) => role.includes('业务经理'))).toBe(true)
  })

  it('builds the phase-one pre-publishing generation chain from company profile to scripts', () => {
    const plan = buildPrePublishingGenerationPlan({
      benchmarkBrief: defaultDepartmentBenchmarkBrief,
      companyIntro: '黑卫士科技是一家AI招聘系统公司，准备扩大销售中心和产品技术中心。',
      departmentBriefs: [
        { departmentName: '销售中心', roleCount: 2, targetHeadcount: 6 },
        { departmentName: '产品技术中心', roleCount: 2, targetHeadcount: 4 },
      ],
      employerName: '黑卫士科技',
      employerScale: '成长型公司',
      industryIntro: '企业服务、招聘自动化、AI系统和智能硬件。',
      targetDepartmentName: '销售中心',
      targetRoleTitle: '业务经理',
    })

    expect(plan.workflow.map((step) => step.title)).toEqual([
      '公司画像与雇主主体',
      '组织架构与岗位分布',
      '同行JD参考',
      '岗位说明书',
      '发布JD',
      '成果目标',
      '招聘邀约话术',
      '进入BOSS托管链路',
    ])
    expect(plan.organizationSummary).toContain('销售中心')
    expect(plan.jobDescriptionBook).toContain('岗位说明书')
    expect(plan.jobDescriptionBook).toContain('业务经理')
    expect(plan.postingJd).toContain('发布JD')
    expect(plan.postingJd).toContain('B端客户')
    expect(plan.performanceGoalDraft).toContain('成果目标')
    expect(plan.greetingScripts.map((script) => script.mode)).toEqual([
      '预设知识库话术',
      'AI智能生成话术',
      '预设话术 + AI灵活调整',
    ])
    expect(plan.referencePolicy).toContain('授权导入')
    expect(plan.referencePolicy).toContain('公开资料参考')
    expect(plan.referencePolicy).not.toContain('绕过')
    expect(plan.handoffToBossFlow).toContain('BOSS账号接入')
    expect(plan.handoffToBossFlow).toContain('岗位刷新提醒')
    expect(plan.scaleRule.name).toBe('中小型公司')
    expect(plan.dailyIterationPlan.focus).toContain('以天为周期')
    expect(plan.dailyIterationPlan.inputs).toEqual(
      expect.arrayContaining(['同行工资额度', '招聘福利', '晋升空间', '昨日曝光和简历转化']),
    )
  })

  it('maps company scale to different organization and merged-role rules', () => {
    expect(companyScaleRules.map((rule) => rule.name)).toEqual([
      '一人有限公司',
      '小微型公司',
      '小型公司',
      '中小型公司',
      '中型公司',
      '中大型公司',
      '大型公司',
      '巨型公司',
    ])

    const onePerson = buildCompanyScaleRule('一人有限公司')
    const midSmall = buildCompanyScaleRule('中小型公司')
    const giant = buildCompanyScaleRule('巨型公司')

    expect(onePerson.mergedRoles).toContain('老板兼业务/财务/人事/行政/技术/经营管理')
    expect(onePerson.structureNote).toContain('身兼多职')
    expect(midSmall.structureNote).toContain('基本完整')
    expect(giant.departments).toContain('事业部/区域公司/集团职能')
  })

  it('builds a daily two-way JD iteration loop before BOSS account hosting', () => {
    const plan = buildDailyJdIterationPlan({
      benefitSignals: ['双休', '五险一金', '晋升通道'],
      exposureDelta: -12,
      peerSalaryRange: '10-18K',
      resumeConversionRate: 4,
    })

    expect(plan.cadence).toBe('每日')
    expect(plan.inputs).toEqual(
      expect.arrayContaining(['同行工资额度', '招聘福利', '晋升空间', '昨日曝光和简历转化']),
    )
    expect(plan.actions).toEqual(
      expect.arrayContaining(['优化JD模块', '调整薪酬福利表达', '刷新岗位', '同步到打招呼话术']),
    )
    expect(plan.recommendation).toContain('10-18K')
    expect(plan.recommendation).toContain('曝光下降')
  })

  it('prioritizes candidate follow-up by score, timing, layer and salary match', () => {
    const urgent = buildCandidateFollowupPriority({
      candidateScore: 92,
      hoursSinceResumeSubmitted: 2,
      salaryMatchPercent: 96,
      talentLayer: '中层干部',
    })
    const reserve = buildCandidateFollowupPriority({
      candidateScore: 61,
      hoursSinceResumeSubmitted: 58,
      salaryMatchPercent: 62,
      talentLayer: '执行层',
    })

    expect(urgent.priority).toBe('立即联系')
    expect(urgent.reasons).toEqual(expect.arrayContaining(['高分等级', '投递时间新', '薪酬匹配高', '干部/技术/决策层']))
    expect(urgent.nextAction).toContain('优先电话')
    expect(reserve.priority).toBe('入库观察')
    expect(reserve.nextAction).toContain('分级入库')
  })
})
