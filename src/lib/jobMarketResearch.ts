export const jobMarketModuleName = '反向求职调研'

export type CompanySizeBand = '初创团队' | '成长型公司' | '中型公司' | '大型集团'

export type ResearchDataSource =
  | '公开信息'
  | '公开岗位页面人工导入'
  | '平台开放接口'
  | '授权账号可见信息'
  | '人工上传样本'
  | '手工上传样本'
  | '同行招聘样本'
  | '相近公司样本'

export type ResearchProfileTags = {
  personalSkillTags: string[]
  jobMatchTags: string[]
  achievementTags: string[]
  educationTags: string[]
  skillTags: string[]
  performanceTags: string[]
}

export type ResearchPersona = {
  id: string
  name: string
  role: string
  accountMode: '模拟角色' | '授权调研账号'
  targetIndustry: string
  targetKeywords: string[]
  profileTags: ResearchProfileTags
}

export type ResearchResumeProfile = ResearchPersona & {
  authorizationStatus: '公司授权调研'
  resumeSource: '人工上传样本'
  targetCompetitors: string[]
  workYears: number
  expectedSalaryMin: number
  expectedSalaryMax: number
  resumeSummary: string
  realResumeSummary: string
}

export type ResearchPosting = {
  id: string
  company: string
  companySize: CompanySizeBand
  employeeCountRange: string
  organizationStructure: string[]
  department: string
  title: string
  jobFamily: string
  openHeadcount: number
  salaryMin: number
  salaryMax: number
  benefits: string[]
  promotionPath: string
  jdSummary: string
  jdKeywords: string[]
  keywords: string[]
  jobMatchTags: string[]
  requirements: string[]
  performanceRequirements: string[]
  source: ResearchDataSource
}

export type ResumePostingMatch = {
  fitScore: number
  matchedKeywords: string[]
  marketSignals: string[]
  profileId: string
  profileName: string
  postingId: string
  topPostingCompany: string
  topPostingTitle: string
}

export type SalaryBenchmarkScope = {
  companySize?: CompanySizeBand
  jobFamily?: string
}

export type SalaryBenchmark = {
  averageMax: number
  averageMin: number
  max: number
  min: number
  sampleCount: number
}

export type MarketCompletionField =
  | '公司规模'
  | '组织架构'
  | '岗位数量'
  | '岗位JD'
  | '薪酬福利'
  | '晋升空间'
  | '绩效要求'
  | '岗位族'

export type MarketCompletionSuggestion = {
  field: MarketCompletionField
  suggestion: string
  evidenceCount: number
  evidence: string[]
}

export type CompanyScaleRoleGap = {
  role: string
  jobFamily: string
  companySize: CompanySizeBand
  priority: '高' | '中' | '低'
  evidenceCompanies: string[]
  reason: string
}

export type ResearchComplianceBoundary = {
  allowedDataSources: string[]
  prohibitedActions: string[]
  storageRules: string[]
  usageNotes: string[]
  boundaryText: string
}

export type ResearchLockState = {
  locked: boolean
  reason: string
  allowedRoles: string[]
}

export const defaultResearchLockState: ResearchLockState = {
  allowedRoles: ['超级管理员', '招聘负责人'],
  locked: true,
  reason: '防止人事同事把公司市场动态工具当作私人求职入口，默认锁定，仅用于公司授权的反向求职观察和招聘市场研究。',
}

export const researchPersonas: ResearchPersona[] = [
  {
    accountMode: '模拟角色',
    id: 'media-researcher',
    name: '内容运营测试角色',
    role: '自媒体内容运营',
    targetIndustry: '短视频/直播/品牌内容',
    targetKeywords: ['短视频', '脚本', '直播', 'AI工具'],
    profileTags: {
      achievementTags: ['作品集', '爆款选题', '账号冷启动'],
      educationTags: ['新闻传播', '广告学', '中文/编导'],
      jobMatchTags: ['自媒体内容运营', '直播运营', '内容增长'],
      performanceTags: ['播放量', '转化率', '粉丝增长'],
      personalSkillTags: ['选题策划', '镜头表达', '数据复盘'],
      skillTags: ['脚本策划', '剪辑协同', '直播复盘', 'AI工具'],
    },
  },
  {
    accountMode: '模拟角色',
    id: 'sales-researcher',
    name: '销售岗测试角色',
    role: '大客户销售',
    targetIndustry: '企业服务/智能硬件',
    targetKeywords: ['大客户', '渠道', 'B端', '业绩'],
    profileTags: {
      achievementTags: ['标杆客户', '渠道开拓', '独立成交'],
      educationTags: ['市场营销', '工商管理', '理工复合背景'],
      jobMatchTags: ['大客户销售', '渠道销售', '企业服务销售'],
      performanceTags: ['年度回款', '客单价', '业绩完成率'],
      personalSkillTags: ['客户分层', '谈判推进', '线索经营'],
      skillTags: ['客户分层', '商务谈判', '招投标', 'CRM'],
    },
  },
  {
    accountMode: '授权调研账号',
    id: 'product-researcher',
    name: '产品经理测试角色',
    role: 'AI产品经理',
    targetIndustry: 'AI应用/硬件产品',
    targetKeywords: ['AI产品', '0到1', '硬件', '需求分析'],
    profileTags: {
      achievementTags: ['0到1项目', '产品上线', '跨部门推进'],
      educationTags: ['计算机', '工业设计', '电子信息', 'MBA'],
      jobMatchTags: ['AI产品经理', '硬件产品经理', '产品研发'],
      performanceTags: ['上线周期', '用户留存', '交付质量'],
      personalSkillTags: ['需求澄清', '原型沟通', '项目推进'],
      skillTags: ['PRD', '原型设计', 'AI工具链', '硬件协同'],
    },
  },
]

export const marketResearchResumeProfiles: ResearchResumeProfile[] = [
  {
    accountMode: '授权调研账号',
    authorizationStatus: '公司授权调研',
    expectedSalaryMax: 26000,
    expectedSalaryMin: 15000,
    id: 'resume-sales-01',
    name: '大客户销售简历画像A',
    realResumeSummary: '8年B端大客户销售，做过渠道开拓、招投标、年度回款和大客户续约。',
    resumeSource: '人工上传样本',
    resumeSummary: '8年B端大客户销售，做过渠道开拓、招投标、年度回款和大客户续约。',
    role: '大客户销售',
    targetCompetitors: ['安途科技', '同业SaaS公司', '智能硬件渠道商'],
    targetIndustry: '企业服务/智能硬件',
    targetKeywords: ['大客户', 'B端', '渠道', '业绩'],
    workYears: 8,
    profileTags: {
      achievementTags: ['标杆客户', '渠道开拓', '独立成交'],
      educationTags: ['市场营销', '工商管理'],
      jobMatchTags: ['大客户销售', 'B端客户', '渠道资源', '业绩佐证'],
      performanceTags: ['年度回款', '客单价', '业绩完成率'],
      personalSkillTags: ['客户分层', '商务谈判', '回款推进'],
      skillTags: ['大客户', 'B端', '渠道', '业绩', '招投标'],
    },
  },
  {
    accountMode: '授权调研账号',
    authorizationStatus: '公司授权调研',
    expectedSalaryMax: 18000,
    expectedSalaryMin: 10000,
    id: 'resume-media-01',
    name: '内容运营简历画像B',
    realResumeSummary: '5年短视频与直播运营，负责脚本策划、直播复盘、内容转化和AI工具提效。',
    resumeSource: '人工上传样本',
    resumeSummary: '5年短视频与直播运营，负责脚本策划、直播复盘、内容转化和AI工具提效。',
    role: '自媒体内容运营',
    targetCompetitors: ['清风品牌', '星河传媒', '直播电商服务商'],
    targetIndustry: '短视频/直播/品牌内容',
    targetKeywords: ['短视频', '直播', '脚本', 'AI工具'],
    workYears: 5,
    profileTags: {
      achievementTags: ['作品集', '爆款选题', '直播转化'],
      educationTags: ['新闻传播', '广告学'],
      jobMatchTags: ['自媒体内容运营', '短视频策划', 'AI内容工具', '直播运营'],
      performanceTags: ['播放量', '转化率', '粉丝增长'],
      personalSkillTags: ['选题拆解', '直播协同', '数据复盘'],
      skillTags: ['短视频', '直播', '脚本', 'AI工具', '复盘'],
    },
  },
  {
    accountMode: '授权调研账号',
    authorizationStatus: '公司授权调研',
    expectedSalaryMax: 32000,
    expectedSalaryMin: 20000,
    id: 'resume-product-01',
    name: 'AI产品简历画像C',
    realResumeSummary: '6年AI产品经理，做过0到1项目、硬件协同、PRD和跨部门交付。',
    resumeSource: '人工上传样本',
    resumeSummary: '6年AI产品经理，做过0到1项目、硬件协同、PRD和跨部门交付。',
    role: 'AI产品经理',
    targetCompetitors: ['远山智能', 'AI硬件公司', '企业AI应用公司'],
    targetIndustry: 'AI应用/硬件产品',
    targetKeywords: ['AI产品', '0到1', '硬件', '需求分析'],
    workYears: 6,
    profileTags: {
      achievementTags: ['0到1项目', '产品上线', '跨部门推进'],
      educationTags: ['计算机', '电子信息', 'MBA'],
      jobMatchTags: ['AI产品经理', '硬件产品', '需求分析', '产品研发'],
      performanceTags: ['上线周期', '用户留存', '交付质量'],
      personalSkillTags: ['PRD写作', '原型评审', '跨部门推进'],
      skillTags: ['AI产品', '0到1', '硬件', '需求分析', 'PRD'],
    },
  },
  {
    accountMode: '授权调研账号',
    authorizationStatus: '公司授权调研',
    expectedSalaryMax: 16000,
    expectedSalaryMin: 9000,
    id: 'resume-finance-01',
    name: '财务主管简历画像D',
    realResumeSummary: '7年总账与成本核算经验，熟悉预算、税务、报表和经营分析。',
    resumeSource: '人工上传样本',
    resumeSummary: '7年总账与成本核算经验，熟悉预算、税务、报表和经营分析。',
    role: '财务主管',
    targetCompetitors: ['制造业财务团队', '连锁经营公司', '区域财务中心'],
    targetIndustry: '制造/连锁/企业服务',
    targetKeywords: ['总账', '成本', '预算', '经营分析'],
    workYears: 7,
    profileTags: {
      achievementTags: ['成本优化', '预算体系', '报表搭建'],
      educationTags: ['会计学', '财务管理'],
      jobMatchTags: ['财务主管', '成本核算', '经营分析'],
      performanceTags: ['成本率', '预算达成', '税务合规'],
      personalSkillTags: ['账务梳理', '预算沟通', '风险意识'],
      skillTags: ['总账', '成本', '预算', '经营分析'],
    },
  },
]

export const marketResearchPostings: ResearchPosting[] = [
  {
    benefits: ['绩效奖金', '作品署名', '弹性排班', '内容培训'],
    company: '清风品牌',
    companySize: '成长型公司',
    department: '内容中心',
    employeeCountRange: '100-300人',
    id: 'posting-1',
    jdKeywords: ['短视频', '脚本', 'AI工具', '直播', '投流复盘'],
    jdSummary: '负责短视频选题、脚本拆解、拍摄协同、直播内容承接和投流复盘。',
    jobFamily: '内容增长',
    jobMatchTags: ['自媒体内容运营', '短视频策划', 'AI内容工具', '作品集'],
    keywords: ['短视频', '脚本', 'AI工具', '直播'],
    openHeadcount: 3,
    organizationStructure: ['内容中心', '直播运营组', '商业化投放组'],
    performanceRequirements: ['月度有效选题数', '播放量增长', '线索转化率'],
    promotionPath: '内容运营-高级内容运营-内容负责人',
    requirements: ['能独立策划内容选题', '熟悉短视频投流和复盘', '有作品集优先'],
    salaryMax: 18000,
    salaryMin: 12000,
    source: '同行招聘样本',
    title: '自媒体内容运营',
  },
  {
    benefits: ['晚班补贴', '带货提成', '直播培训', '餐补'],
    company: '星河传媒',
    companySize: '成长型公司',
    department: '直播事业部',
    employeeCountRange: '300-800人',
    id: 'posting-2',
    jdKeywords: ['直播', '数据分析', '复盘', '主播协同', '转化率'],
    jdSummary: '跟进直播场次、主播协同、直播间节奏、活动排期和转化数据复盘。',
    jobFamily: '内容增长',
    jobMatchTags: ['直播运营', '数据复盘', '主播协同', '转化率'],
    keywords: ['直播', '数据分析', '复盘', '主播协同'],
    openHeadcount: 5,
    organizationStructure: ['直播事业部', '主播管理组', '数据复盘组'],
    performanceRequirements: ['场次完成率', 'GMV转化', '复盘改进项关闭率'],
    promotionPath: '直播运营助理-直播运营-直播间负责人',
    requirements: ['能跟播并复盘转化', '熟悉直播间节奏', '接受晚间场次'],
    salaryMax: 15000,
    salaryMin: 9000,
    source: '同行招聘样本',
    title: '直播运营助理',
  },
  {
    benefits: ['项目奖金', '五险一金', '学习预算', '弹性工作'],
    company: '远山智能',
    companySize: '中型公司',
    department: 'AI产品部',
    employeeCountRange: '500-1500人',
    id: 'posting-3',
    jdKeywords: ['AI产品', '需求分析', '0到1', '硬件', 'PRD'],
    jdSummary: '负责AI硬件产品从需求洞察、PRD、原型评审到研发协同和上线复盘。',
    jobFamily: '产品研发',
    jobMatchTags: ['AI产品经理', '0到1项目', '硬件产品', '需求分析'],
    keywords: ['AI产品', '需求分析', '0到1', '硬件'],
    openHeadcount: 2,
    organizationStructure: ['AI产品部', '硬件研发部', '交付项目组'],
    performanceRequirements: ['上线周期', '需求命中率', '交付质量'],
    promotionPath: '产品经理-高级产品经理-产品负责人',
    requirements: ['做过从0到1产品落地', '能写PRD和原型', '懂AI工具链优先'],
    salaryMax: 30000,
    salaryMin: 18000,
    source: '相近公司样本',
    title: 'AI产品经理',
  },
  {
    benefits: ['销售提成', '交通补贴', '客户资源池', '季度奖金'],
    company: '安途科技',
    companySize: '中型公司',
    department: '企业客户部',
    employeeCountRange: '500-1200人',
    id: 'posting-4',
    jdKeywords: ['大客户', 'B端', '渠道', '业绩', '回款'],
    jdSummary: '负责企业客户线索经营、渠道共建、招投标推进、成交回款和续约增长。',
    jobFamily: '销售增长',
    jobMatchTags: ['大客户销售', 'B端客户', '渠道资源', '业绩佐证'],
    keywords: ['大客户', 'B端', '渠道', '业绩'],
    openHeadcount: 4,
    organizationStructure: ['企业客户部', '渠道拓展组', '售前解决方案组'],
    performanceRequirements: ['季度回款', '赢单率', '客单价'],
    promotionPath: '大客户销售-高级销售经理-区域销售负责人',
    requirements: ['有B端客户资源', '能提供历史业绩口径', '接受结果导向考核'],
    salaryMax: 25000,
    salaryMin: 10000,
    source: '同行招聘样本',
    title: '大客户销售',
  },
]

export const researchCollectionPolicy = {
  dataSources: ['公开信息', '公开岗位页面人工导入', '平台开放接口', '授权账号可见信息', '人工上传样本', '手工上传样本'],
  prohibited: [
    '绕过反爬',
    '高频自动化抓取',
    '保存个人账号密码',
    '账号密码明文托管',
    '验证码绕过',
    '反检测规避',
    '自动替个人投递简历',
  ],
  purpose: '用于公司招聘市场研究、薪酬基准、同行JD关键词和岗位要求分析。',
} as const

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

function unique(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))]
}

function topItems(values: string[], limit = 5) {
  const frequency = new Map<string, number>()
  values.forEach((value) => {
    const item = value.trim()
    if (item) frequency.set(item, (frequency.get(item) ?? 0) + 1)
  })

  return [...frequency.entries()]
    .map(([item, count]) => ({ count, item }))
    .sort((left, right) => right.count - left.count || left.item.localeCompare(right.item, 'zh-Hans-CN'))
    .slice(0, limit)
}

function mostCommon(values: string[]) {
  return topItems(values, 1)[0]?.item ?? ''
}

function scopedPostings(postings: ResearchPosting[], scope?: SalaryBenchmarkScope) {
  return postings.filter((posting) => {
    const sizeMatches = scope?.companySize ? posting.companySize === scope.companySize : true
    const familyMatches = scope?.jobFamily ? posting.jobFamily === scope.jobFamily : true
    return sizeMatches && familyMatches
  })
}

export function keywordFrequency(postings: ResearchPosting[]) {
  const frequency = new Map<string, number>()
  postings.forEach((posting) => {
    unique([...posting.keywords, ...posting.jdKeywords]).forEach((keyword) => {
      frequency.set(keyword, (frequency.get(keyword) ?? 0) + 1)
    })
  })

  return [...frequency.entries()]
    .map(([keyword, count]) => ({ count, keyword }))
    .sort((left, right) => right.count - left.count || left.keyword.localeCompare(right.keyword, 'zh-Hans-CN'))
}

export function matchResumeProfilesToPostings(
  profiles: ResearchResumeProfile[],
  postings: ResearchPosting[],
): ResumePostingMatch[] {
  return profiles
    .flatMap((profile) => {
      const profileKeywords = unique([
        ...profile.targetKeywords,
        ...profile.profileTags.personalSkillTags,
        ...profile.profileTags.jobMatchTags,
        ...profile.profileTags.skillTags,
        ...profile.profileTags.performanceTags,
        ...profile.profileTags.achievementTags,
        profile.role,
      ])
      const normalizedProfileKeywords = profileKeywords.map(normalizeText)

      return postings.map((posting) => {
        const postingKeywords = unique([
          ...posting.keywords,
          ...posting.jdKeywords,
          ...posting.jobMatchTags,
          ...posting.performanceRequirements,
          posting.jobFamily,
          posting.title,
        ])
        const matchedKeywords = postingKeywords.filter((keyword) => {
          const normalizedKeyword = normalizeText(keyword)
          return normalizedProfileKeywords.some(
            (profileKeyword) =>
              profileKeyword === normalizedKeyword ||
              profileKeyword.includes(normalizedKeyword) ||
              normalizedKeyword.includes(profileKeyword),
          )
        })
        const competitorBoost = profile.targetCompetitors.includes(posting.company) ? 18 : 0
        const salaryOverlap =
          posting.salaryMax >= profile.expectedSalaryMin && posting.salaryMin <= profile.expectedSalaryMax ? 12 : 0
        const familyBoost = profile.profileTags.jobMatchTags.includes(posting.title) ? 10 : 0
        const fitScore = Math.min(100, matchedKeywords.length * 11 + competitorBoost + salaryOverlap + familyBoost)

        return {
          fitScore,
          matchedKeywords,
          marketSignals: ['公司规模', '组织架构', '岗位数量', '薪酬区间', '岗位职责', '任职要求', '绩效要求', '同行在招公司'],
          profileId: profile.id,
          profileName: profile.name,
          postingId: posting.id,
          topPostingCompany: posting.company,
          topPostingTitle: posting.title,
        }
      })
    })
    .filter((match) => match.fitScore > 0)
    .sort((left, right) => right.fitScore - left.fitScore || left.profileName.localeCompare(right.profileName, 'zh-Hans-CN'))
}

export function salaryBenchmark(postings: ResearchPosting[], scope?: SalaryBenchmarkScope): SalaryBenchmark {
  const samples = scopedPostings(postings, scope)
  if (samples.length === 0) {
    return { averageMax: 0, averageMin: 0, max: 0, min: 0, sampleCount: 0 }
  }

  const min = Math.min(...samples.map((posting) => posting.salaryMin))
  const max = Math.max(...samples.map((posting) => posting.salaryMax))
  const averageMin = Math.round(samples.reduce((sum, posting) => sum + posting.salaryMin, 0) / samples.length)
  const averageMax = Math.round(samples.reduce((sum, posting) => sum + posting.salaryMax, 0) / samples.length)

  return { averageMax, averageMin, max, min, sampleCount: samples.length }
}

export function generateJobCompletionSuggestions(
  postings: ResearchPosting[],
  scope?: SalaryBenchmarkScope,
): MarketCompletionSuggestion[] {
  const samples = scopedPostings(postings, scope)
  if (samples.length === 0) return []

  const benchmark = salaryBenchmark(samples)
  const jdKeywords = topItems(samples.flatMap((posting) => posting.jdKeywords), 6)
  const benefits = topItems(samples.flatMap((posting) => posting.benefits), 6)
  const organizationUnits = topItems(samples.flatMap((posting) => posting.organizationStructure), 6)
  const performanceRequirements = topItems(samples.flatMap((posting) => posting.performanceRequirements), 6)
  const jobFamilies = topItems(samples.map((posting) => posting.jobFamily), 4)
  const promotionPaths = unique(samples.map((posting) => posting.promotionPath))
  const totalHeadcount = samples.reduce((sum, posting) => sum + posting.openHeadcount, 0)

  return [
    {
      evidence: unique(samples.map((posting) => `${posting.company}：${posting.companySize}，${posting.employeeCountRange}`)),
      evidenceCount: samples.length,
      field: '公司规模',
      suggestion: `优先按${mostCommon(samples.map((posting) => posting.companySize)) || '相近规模公司'}口径补齐样本，标注员工数区间。`,
    },
    {
      evidence: organizationUnits.map((item) => `${item.item} x${item.count}`),
      evidenceCount: organizationUnits.length,
      field: '组织架构',
      suggestion: `补齐岗位所在部门和协作团队，重点关注${organizationUnits.map((item) => item.item).join('、')}。`,
    },
    {
      evidence: samples.map((posting) => `${posting.company}/${posting.title}：${posting.openHeadcount}人`),
      evidenceCount: totalHeadcount,
      field: '岗位数量',
      suggestion: `同类样本合计在招${totalHeadcount}人，可用作岗位热度和编制优先级参考。`,
    },
    {
      evidence: jdKeywords.map((item) => `${item.item} x${item.count}`),
      evidenceCount: jdKeywords.length,
      field: '岗位JD',
      suggestion: `JD建议补齐${jdKeywords.map((item) => item.item).join('、')}等高频关键词。`,
    },
    {
      evidence: benefits.map((item) => `${item.item} x${item.count}`),
      evidenceCount: samples.length,
      field: '薪酬福利',
      suggestion: `薪资标杆为${benchmark.min}-${benchmark.max}元/月，福利可参考${benefits.map((item) => item.item).join('、')}。`,
    },
    {
      evidence: promotionPaths,
      evidenceCount: promotionPaths.length,
      field: '晋升空间',
      suggestion: `补齐从入门到负责人路径，样本常见路径包括${promotionPaths.slice(0, 3).join('；')}。`,
    },
    {
      evidence: performanceRequirements.map((item) => `${item.item} x${item.count}`),
      evidenceCount: performanceRequirements.length,
      field: '绩效要求',
      suggestion: `绩效口径建议写清${performanceRequirements.map((item) => item.item).join('、')}。`,
    },
    {
      evidence: jobFamilies.map((item) => `${item.item} x${item.count}`),
      evidenceCount: jobFamilies.length,
      field: '岗位族',
      suggestion: `将岗位归入${jobFamilies.map((item) => item.item).join('、')}，便于后续跨公司对标。`,
    },
  ]
}

export function inferMissingRolesByCompanySize(
  companySize: CompanySizeBand,
  existingRoles: string[],
  postings: ResearchPosting[],
): CompanyScaleRoleGap[] {
  const normalizedExistingRoles = new Set(existingRoles.map(normalizeText))
  const peerPostings = postings.filter((posting) => posting.companySize === companySize)
  const roleMap = new Map<string, ResearchPosting[]>()

  peerPostings.forEach((posting) => {
    if (!normalizedExistingRoles.has(normalizeText(posting.title))) {
      roleMap.set(posting.title, [...(roleMap.get(posting.title) ?? []), posting])
    }
  })

  return [...roleMap.entries()]
    .map(([role, rolePostings]) => {
      const headcount = rolePostings.reduce((sum, posting) => sum + posting.openHeadcount, 0)
      const jobFamily = mostCommon(rolePostings.map((posting) => posting.jobFamily))
      const evidenceCompanies = unique(rolePostings.map((posting) => posting.company))
      const priority: CompanyScaleRoleGap['priority'] = headcount >= 4 ? '高' : headcount >= 2 ? '中' : '低'

      return {
        companySize,
        evidenceCompanies,
        jobFamily,
        priority,
        reason: `${companySize}样本中${evidenceCompanies.join('、')}正在招聘${role}，合计${headcount}个岗位，可作为缺失岗位补齐线索。`,
        role,
      }
    })
    .sort((left, right) => {
      const priorityRank: Record<CompanyScaleRoleGap['priority'], number> = { 高: 3, 中: 2, 低: 1 }
      return priorityRank[right.priority] - priorityRank[left.priority] || left.role.localeCompare(right.role, 'zh-Hans-CN')
    })
}

export function researchComplianceBoundary(): ResearchComplianceBoundary {
  const allowedDataSources = [
    '公开信息',
    '公开岗位页面人工导入',
    '平台开放接口',
    '授权账号可见信息',
    '人工上传样本',
  ]
  const prohibitedActions = [
    '不绕过平台规则、反爬策略、验证码或访问频率限制',
    '不做反检测规避，不进行高频自动化抓取',
    '不托管账号密码明文，不替个人自动投递简历',
    '不采集与岗位研究无关的个人敏感信息',
  ]
  const storageRules = [
    '仅保存岗位样本、薪酬区间、JD关键词、福利、晋升和绩效要求等研究字段',
    '授权账号产生的数据仅按授权范围查看和人工导入',
    '人工上传样本需要保留来源说明和删除通道',
  ]
  const usageNotes = [
    '用于公司招聘市场研究、岗位补齐、薪酬标杆和JD优化',
    '输出为统计和建议，不作为自动投递、骚扰触达或平台规避工具',
  ]

  return {
    allowedDataSources,
    boundaryText: `仅使用${allowedDataSources.join('、')}，${prohibitedActions.join('；')}。`,
    prohibitedActions,
    storageRules,
    usageNotes,
  }
}

export function researchScopeSummary(personas: ResearchPersona[]) {
  return personas.map((persona) => `${persona.name}：${persona.targetIndustry}`).join('；')
}
