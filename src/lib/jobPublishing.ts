export type PostingMetrics = {
  visits: number
  messages: number
  resumes: number
  phones: number
  emails: number
  wechat: number
  wechatExchanged: number
  conversations: number
  invitations: number
  acceptedInvitations: number
  acceptedInterviews: number
}

export type JobPostingVariant = {
  id: string
  accountName: string
  angle: string
  salary: string
  jdTitle: string
  metrics: PostingMetrics
}

export type JobPostingType =
  | 'fullTime'
  | 'partTime'
  | 'hourly'
  | 'partner'
  | 'secondaryIntern'
  | 'vocationalIntern'
  | 'undergraduateIntern'
  | 'masterIntern'
  | 'doctoralIntern'

export type JobPublishingCard = {
  id: string
  title: string
  englishTitle?: string
  jobCode?: string
  department: string
  postingType: JobPostingType
  jdStatus: '草稿' | '待确认' | '已发布' | '暂停中'
  targetHeadcount: number
  hiredCount: number
  isFavorite: boolean
  keywords: string[]
  variants: JobPostingVariant[]
}

export type BenchmarkCompanyProfile = {
  companyName: string
  relation: '直接同行' | '相近公司' | '上下游公司' | '标杆公司'
  priority: '高' | '中' | '低'
  targetDepartments: string[]
  targetRoles: string[]
  desiredAchievements: string[]
}

export type DepartmentBenchmarkBrief = {
  departmentName: string
  plainNeed: string
  targetCompanies: BenchmarkCompanyProfile[]
  alternativeCompanyTraits: string[]
  keyKeywords: string[]
  keyMetrics: string[]
  keyTraits: string[]
}

export type CompanyHiringBlueprintInput = {
  companyIntro: string
  industryIntro: string
  voiceTranscript?: string
  departmentBriefs?: Array<{
    departmentName: string
    targetHeadcount: number
    roleCount?: number
    plainNeed?: string
  }>
}

export type OrganizationRolePlan = {
  title: string
  level: '负责人' | '骨干' | '执行' | '实习/兼职'
  targetHeadcount: number
  responsibilities: string[]
  publishingStage: '第一阶梯' | '第二阶梯' | '第三阶梯'
}

export type OrganizationDepartmentPlan = {
  departmentName: string
  mission: string
  targetHeadcount: number
  roles: OrganizationRolePlan[]
}

export type OrganizationHiringPlan = {
  sourceSummary: string
  departments: OrganizationDepartmentPlan[]
  totalHeadcount: number
  postingLadder: Array<{
    stage: OrganizationRolePlan['publishingStage']
    focus: string
    roles: string[]
    targetHeadcount: number
  }>
  humanConfirmationItems: string[]
  aiCorrectionSteps: string[]
}

export type CompanyScaleName =
  | '一人有限公司'
  | '小微型公司'
  | '小型公司'
  | '中小型公司'
  | '中型公司'
  | '中大型公司'
  | '大型公司'
  | '巨型公司'

export type CompanyScaleRule = {
  name: CompanyScaleName
  headcountRange: string
  departments: string[]
  mergedRoles: string[]
  structureNote: string
  publishingRule: string
}

export type DailyJdIterationInput = {
  peerSalaryRange: string
  benefitSignals: string[]
  exposureDelta: number
  resumeConversionRate: number
}

export type DailyJdIterationPlan = {
  cadence: '每日'
  focus: string
  inputs: string[]
  actions: string[]
  recommendation: string
  refreshStrategy: string
}

export type CandidateTalentLayer = '执行层' | '基层干部' | '中层干部' | '高层干部' | '技术层' | '决策层'

export type CandidateFollowupPriorityInput = {
  candidateScore: number
  hoursSinceResumeSubmitted: number
  salaryMatchPercent: number
  talentLayer: CandidateTalentLayer
}

export type CandidateFollowupPriority = {
  priority: '立即联系' | '优先跟进' | '常规跟进' | '入库观察'
  urgencyScore: number
  reasons: string[]
  nextAction: string
}

export type PrePublishingGenerationInput = CompanyHiringBlueprintInput & {
  benchmarkBrief?: DepartmentBenchmarkBrief
  employerName: string
  employerScale: string
  targetDepartmentName: string
  targetRoleTitle: string
}

export type PrePublishingGreetingScript = {
  mode: '预设知识库话术' | 'AI智能生成话术' | '预设话术 + AI灵活调整'
  content: string
}

export type PrePublishingGenerationPlan = {
  workflow: Array<{
    title: string
    detail: string
  }>
  organizationSummary: string
  jobDescriptionBook: string
  postingJd: string
  performanceGoalDraft: string
  greetingScripts: PrePublishingGreetingScript[]
  scaleRule: CompanyScaleRule
  dailyIterationPlan: DailyJdIterationPlan
  referencePolicy: string
  handoffToBossFlow: string[]
}

export const companyScaleRules: CompanyScaleRule[] = [
  {
    departments: ['老板个人工作台'],
    headcountRange: '1人',
    mergedRoles: ['老板兼业务/财务/人事/行政/技术/经营管理'],
    name: '一人有限公司',
    publishingRule: '岗位发布以老板缺口为中心，优先招能补老板短板的人。',
    structureNote: '极简组织，老板身兼多职，系统要把缺失岗位和外包协作标出来。',
  },
  {
    departments: ['经营管理', '业务销售', '财务行政'],
    headcountRange: '2-10人',
    mergedRoles: ['业务兼客服', '财务兼行政', '人事兼综合助理'],
    name: '小微型公司',
    publishingRule: '岗位JD要强调一专多能、执行效率和能独立闭环。',
    structureNote: '岗位经常合并，先补业务、交付、财务行政等刚需岗位。',
  },
  {
    departments: ['销售中心', '交付/运营', '财务行政', '技术/产品'],
    headcountRange: '11-30人',
    mergedRoles: ['人事行政合并', '运营客服合并', '产品项目合并'],
    name: '小型公司',
    publishingRule: '优先发布能带结果的骨干岗位，再补助理和执行岗位。',
    structureNote: '开始有部门雏形，但岗位仍然有缺失和兼岗。',
  },
  {
    departments: ['销售中心', '品牌内容部', '产品技术中心', '经营管理部'],
    headcountRange: '31-100人',
    mergedRoles: ['HR与行政可合并', '财务与内控可小团队化'],
    name: '中小型公司',
    publishingRule: '按部门编制生成岗位阶梯，先负责人和骨干，再执行补位。',
    structureNote: '建制基本完整，但编制不大，需要用岗位阶梯控制发布节奏。',
  },
  {
    departments: ['销售中心', '市场品牌部', '产品技术中心', '人力资源部', '财务部', '运营交付部'],
    headcountRange: '101-300人',
    mergedRoles: ['专项负责人可兼项目管理'],
    name: '中型公司',
    publishingRule: '按专业部门发布，重点区分负责人、骨干和执行层。',
    structureNote: '专业部门开始分化，招聘要兼顾管理岗和专业岗。',
  },
  {
    departments: ['销售体系', '市场体系', '研发体系', '供应链/交付', 'HR体系', '财务法务', '经营管理'],
    headcountRange: '301-1000人',
    mergedRoles: ['区域负责人兼重点客户负责人'],
    name: '中大型公司',
    publishingRule: '按体系、区域、事业线分批发布，并建立候选人分层池。',
    structureNote: '体系化组织，岗位需要清晰区分区域、产品线和职级。',
  },
  {
    departments: ['集团职能', '事业部', '区域公司', '共享服务中心', '研发中心', '营销中心'],
    headcountRange: '1001-5000人',
    mergedRoles: ['项目型岗位跨部门协同'],
    name: '大型公司',
    publishingRule: '按事业部和集团职能生成多版本JD，统一口径再分渠道发布。',
    structureNote: '组织完整，重点是权限、流程、标准化和多岗位并行。',
  },
  {
    departments: ['事业部/区域公司/集团职能', '全球职能中心', '专业委员会', '共享平台'],
    headcountRange: '5000人以上',
    mergedRoles: ['集团专家与业务线虚拟任职'],
    name: '巨型公司',
    publishingRule: '按集团、区域、事业部和专业序列生成岗位族和人才地图。',
    structureNote: '集团化和矩阵化组织，岗位发布要支持事业部、区域和岗位族。',
  },
]

export function buildCompanyScaleRule(scaleName: string): CompanyScaleRule {
  const normalizedScale = scaleName.trim()
  const direct = companyScaleRules.find((rule) => rule.name === normalizedScale)
  if (direct) return direct

  if (/一人|个人|老板/.test(normalizedScale)) return companyScaleRules[0]
  if (/小微|微型|初创/.test(normalizedScale)) return companyScaleRules[1]
  if (/小型/.test(normalizedScale)) return companyScaleRules[2]
  if (/成长|中小/.test(normalizedScale)) return companyScaleRules[3]
  if (/中型/.test(normalizedScale)) return companyScaleRules[4]
  if (/中大/.test(normalizedScale)) return companyScaleRules[5]
  if (/大型/.test(normalizedScale)) return companyScaleRules[6]
  if (/巨型|集团|全球/.test(normalizedScale)) return companyScaleRules[7]

  return companyScaleRules[3]
}

export function buildDailyJdIterationPlan(input: DailyJdIterationInput): DailyJdIterationPlan {
  const exposureSignal = input.exposureDelta < 0 ? `曝光下降${Math.abs(input.exposureDelta)}%` : `曝光提升${input.exposureDelta}%`
  const conversionSignal = input.resumeConversionRate < 5 ? '简历转化偏低' : '简历转化正常'
  const benefitText = input.benefitSignals.length ? input.benefitSignals.join('、') : '福利待补充'

  return {
    actions: ['优化JD模块', '调整薪酬福利表达', '刷新岗位', '同步到打招呼话术'],
    cadence: '每日',
    focus: '以天为周期复盘岗位曝光、同行工资福利、晋升空间和简历转化，再反向完善JD。',
    inputs: ['同行工资额度', '招聘福利', '晋升空间', '昨日曝光和简历转化'],
    recommendation: `参考同行薪酬${input.peerSalaryRange}，突出${benefitText}；当前${exposureSignal}、${conversionSignal}，建议当天优化JD标题、薪酬福利和岗位关键词。`,
    refreshStrategy: '岗位刷新提醒与JD内容迭代联动，先改低转化字段，再进入账号刷新和打招呼队列。',
  }
}

export function buildCandidateFollowupPriority(input: CandidateFollowupPriorityInput): CandidateFollowupPriority {
  const reasons: string[] = []
  let urgencyScore = 0

  if (input.candidateScore >= 85) {
    urgencyScore += 40
    reasons.push('高分等级')
  } else if (input.candidateScore >= 70) {
    urgencyScore += 24
    reasons.push('中分等级')
  } else {
    urgencyScore += 8
    reasons.push('低分等级')
  }

  if (input.hoursSinceResumeSubmitted <= 6) {
    urgencyScore += 28
    reasons.push('投递时间新')
  } else if (input.hoursSinceResumeSubmitted <= 24) {
    urgencyScore += 18
    reasons.push('仍在有效时段')
  } else if (input.hoursSinceResumeSubmitted <= 48) {
    urgencyScore += 8
    reasons.push('接近尾声')
  } else {
    urgencyScore -= 8
    reasons.push('时效偏晚')
  }

  if (input.salaryMatchPercent >= 90) {
    urgencyScore += 18
    reasons.push('薪酬匹配高')
  } else if (input.salaryMatchPercent >= 75) {
    urgencyScore += 10
    reasons.push('薪酬可谈')
  } else {
    urgencyScore -= 6
    reasons.push('薪酬匹配低')
  }

  if (['中层干部', '高层干部', '技术层', '决策层'].includes(input.talentLayer)) {
    urgencyScore += 14
    reasons.push('干部/技术/决策层')
  } else if (input.talentLayer === '基层干部') {
    urgencyScore += 8
    reasons.push('基层干部')
  }

  if (urgencyScore >= 82) {
    return {
      nextAction: '优先电话和平台消息同时跟进，必要时直接邀约线上面试。',
      priority: '立即联系',
      reasons,
      urgencyScore,
    }
  }

  if (urgencyScore >= 60) {
    return {
      nextAction: '进入优先跟进队列，先发邀约话术，再补电话或微信确认。',
      priority: '优先跟进',
      reasons,
      urgencyScore,
    }
  }

  if (urgencyScore >= 35) {
    return {
      nextAction: '按岗位节奏常规跟进，保留薪酬和时效复核。',
      priority: '常规跟进',
      reasons,
      urgencyScore,
    }
  }

  return {
    nextAction: '分级入库沉淀，后续按岗位空缺和薪酬匹配再激活。',
    priority: '入库观察',
    reasons,
    urgencyScore,
  }
}

export const defaultDepartmentBenchmarkBrief: DepartmentBenchmarkBrief = {
  departmentName: '销售中心',
  plainNeed: '部门长说不清完整JD时，先让他描述最希望候选人来自哪些同行、对手或相近公司，以及在这些公司做过什么部门、岗位和业绩。',
  alternativeCompanyTraits: ['B端客户相近', '项目制销售', '客单价10万以上', '需要决策层沟通', '有内容获客或渠道获客'],
  keyKeywords: ['大客户销售', '渠道开拓', '政企客户', '解决方案销售', '回款'],
  keyMetrics: ['年业绩200万以上', '客单价10万以上', '回款率90%以上', '独立签约KA客户'],
  keyTraits: ['能从0到1开拓', '能接触老板或决策层', '能提供业绩佐证', '能长期跟进复杂项目'],
  targetCompanies: [
    {
      companyName: '云启科技',
      desiredAchievements: ['个人年业绩200万以上', '独立拿下KA客户'],
      priority: '高',
      relation: '直接同行',
      targetDepartments: ['大客户销售部', '渠道销售部'],
      targetRoles: ['销售经理', '大客户经理'],
    },
    {
      companyName: '星河软件',
      desiredAchievements: ['搭建区域渠道', '完成年度回款目标'],
      priority: '高',
      relation: '相近公司',
      targetDepartments: ['渠道部', '政企事业部'],
      targetRoles: ['渠道经理', '区域销售'],
    },
    {
      companyName: '北辰智能',
      desiredAchievements: ['从0到1开拓新行业客户'],
      priority: '中',
      relation: '上下游公司',
      targetDepartments: ['解决方案销售部'],
      targetRoles: ['解决方案销售'],
    },
    {
      companyName: '华东云科',
      desiredAchievements: ['有可核验提成和业绩证明'],
      priority: '中',
      relation: '标杆公司',
      targetDepartments: ['企业客户部'],
      targetRoles: ['客户经理'],
    },
  ],
}

export const emptyPostingMetrics: PostingMetrics = {
  visits: 0,
  messages: 0,
  resumes: 0,
  phones: 0,
  emails: 0,
  wechat: 0,
  wechatExchanged: 0,
  conversations: 0,
  invitations: 0,
  acceptedInvitations: 0,
  acceptedInterviews: 0,
}

export const postingMetricLabels: Record<keyof PostingMetrics, string> = {
  visits: '访问',
  messages: '留言',
  resumes: '简历',
  phones: '电话',
  emails: '邮箱',
  wechat: '微信',
  wechatExchanged: '交换微信',
  conversations: '对话',
  invitations: '邀约',
  acceptedInvitations: '接受邀约',
  acceptedInterviews: '接受面试',
}

export const jobPostingTypeLabels: Record<JobPostingType, string> = {
  doctoralIntern: '博士实习生岗位',
  fullTime: '全职岗位',
  hourly: '小时工岗位',
  masterIntern: '硕士实习生岗位',
  partner: '合伙人岗位',
  partTime: '兼职岗位',
  secondaryIntern: '中专实习生岗位',
  undergraduateIntern: '本科实习生岗位',
  vocationalIntern: '高职实习生岗位',
}

export const jobPostingTypeOptions: Array<{ category: '常规岗位' | '实习生岗位'; type: JobPostingType; label: string; description: string }> = [
  { category: '常规岗位', type: 'fullTime', label: '新增全职岗位', description: '适合正式编制、长期岗位和核心岗位。' },
  { category: '常规岗位', type: 'partTime', label: '新增兼职岗位', description: '适合阶段性、项目制、按任务协作岗位。' },
  { category: '常规岗位', type: 'hourly', label: '新增小时工岗位', description: '适合小时工、临时工、排班用工。' },
  { category: '常规岗位', type: 'partner', label: '新增合伙人岗位', description: '适合合作、代理、合伙和资源型岗位。' },
  { category: '实习生岗位', type: 'secondaryIntern', label: '新增中专实习生', description: '适合中专院校实训、基础岗位培养和批量储备。' },
  { category: '实习生岗位', type: 'vocationalIntern', label: '新增高职实习生', description: '适合高职院校实习、技能型岗位和校企合作。' },
  { category: '实习生岗位', type: 'undergraduateIntern', label: '新增本科实习生', description: '适合本科在校生、管培储备和项目助理岗位。' },
  { category: '实习生岗位', type: 'masterIntern', label: '新增硕士实习生', description: '适合研究型、产品型、算法型和专业支持岗位。' },
  { category: '实习生岗位', type: 'doctoralIntern', label: '新增博士实习生', description: '适合科研、算法、硬件、AI和高专业壁垒岗位。' },
]

export type DisplayDensityClass = 'normal' | 'compact' | 'micro'

export type JobCodeProfile = {
  englishTitle: string
  jobCode: string
}

export const roleCodeDictionary: Array<{ keyword: string; englishTitle: string; jobCode: string }> = [
  { keyword: '市场中心总监', englishTitle: 'Marketing Director', jobCode: 'MD' },
  { keyword: '市场总监', englishTitle: 'Marketing Director', jobCode: 'MD' },
  { keyword: '营销总监', englishTitle: 'Marketing Director', jobCode: 'MD' },
  { keyword: '经营管理副总经理', englishTitle: 'Operations Vice President', jobCode: 'OVP' },
  { keyword: '副总经理', englishTitle: 'Vice General Manager', jobCode: 'VGM' },
  { keyword: '总经理助理', englishTitle: 'General Manager Assistant', jobCode: 'GMA' },
  { keyword: '总助', englishTitle: 'General Manager Assistant', jobCode: 'GMA' },
  { keyword: '业务经理', englishTitle: 'Business Development Manager', jobCode: 'BDM' },
  { keyword: '大客户销售', englishTitle: 'Key Account Sales', jobCode: 'KA-Sales' },
  { keyword: '自媒体创意制作', englishTitle: 'Social Media Creative', jobCode: 'SMC' },
  { keyword: 'AI硬件产品经理', englishTitle: 'AI Hardware Product Manager', jobCode: 'AI-HW PM' },
  { keyword: 'AI系统开发', englishTitle: 'AI System Developer', jobCode: 'AI-SDE' },
  { keyword: '财务经理', englishTitle: 'Finance Manager', jobCode: 'FM' },
  { keyword: '人力资源经理', englishTitle: 'Human Resources Manager', jobCode: 'HRM' },
  { keyword: '国际贸易经理', englishTitle: 'International Trade Manager', jobCode: 'ITM' },
  { keyword: '跨境电商运营', englishTitle: 'Cross-border E-commerce Operations', jobCode: 'CBEC-Ops' },
  { keyword: '策划经理', englishTitle: 'Planning Manager', jobCode: 'PLM' },
  { keyword: '产品经理', englishTitle: 'Product Manager', jobCode: 'PM' },
  { keyword: '技术经理', englishTitle: 'Technology Manager', jobCode: 'TM' },
  { keyword: '实习生', englishTitle: 'Intern', jobCode: 'INT' },
  { keyword: '小时工', englishTitle: 'Hourly Worker', jobCode: 'HW' },
  { keyword: '兼职', englishTitle: 'Part-time Role', jobCode: 'PT' },
  { keyword: '合伙人', englishTitle: 'Partner', jobCode: 'PTR' },
]

export function buildJobCodeProfile(title: string): JobCodeProfile {
  const normalizedTitle = title.trim()
  const matchedRole = roleCodeDictionary.find((role) => normalizedTitle.includes(role.keyword))
  if (matchedRole) {
    return {
      englishTitle: matchedRole.englishTitle,
      jobCode: matchedRole.jobCode,
    }
  }

  const sanitizedWords = normalizedTitle
    .replace(/[^\da-zA-Z\u4e00-\u9fa5]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const englishTitle = sanitizedWords.length ? sanitizedWords.join(' ') : 'Custom Role'

  return {
    englishTitle,
    jobCode: normalizedTitle
      .replace(/[^\da-zA-Z]+/g, '')
      .slice(0, 8)
      .toUpperCase() || 'ROLE',
  }
}

export function addManualKeyword(keywords: string[], keywordInput: string) {
  const nextKeywords = keywordInput
    .split(/[、,，;；\n]+/)
    .map((keyword) => keyword.trim())
    .filter(Boolean)

  return Array.from(new Set([...keywords, ...nextKeywords]))
}

export function compactDisplayClass(count: number): DisplayDensityClass {
  if (count >= 17) return 'micro'
  if (count >= 9) return 'compact'
  return 'normal'
}

export function sumPostingMetrics(variants: JobPostingVariant[]): PostingMetrics {
  return variants.reduce<PostingMetrics>(
    (total, variant) =>
      Object.fromEntries(
        Object.entries(total).map(([key, value]) => [
          key,
          value + variant.metrics[key as keyof PostingMetrics],
        ]),
      ) as PostingMetrics,
    { ...emptyPostingMetrics },
  )
}

export function metricBadges(metrics: PostingMetrics) {
  return (Object.keys(postingMetricLabels) as Array<keyof PostingMetrics>).map((key) => ({
    key,
    label: postingMetricLabels[key],
    value: metrics[key],
  }))
}

export function publishingConversionRate(metrics: PostingMetrics) {
  if (metrics.visits === 0) return 0
  return Math.round((metrics.resumes / metrics.visits) * 100)
}

export function jobOpeningCount(card: Pick<JobPublishingCard, 'targetHeadcount' | 'hiredCount'>) {
  return Math.max(0, card.targetHeadcount - card.hiredCount)
}

export function adjustJobPostingHeadcount(card: JobPublishingCard, delta: number): JobPublishingCard {
  return {
    ...card,
    targetHeadcount: Math.max(card.hiredCount, card.targetHeadcount + delta),
  }
}

export function toggleJobPostingFavorite(card: JobPublishingCard): JobPublishingCard {
  return {
    ...card,
    isFavorite: !card.isFavorite,
  }
}

export function pauseJobPosting(card: JobPublishingCard): JobPublishingCard {
  return {
    ...card,
    jdStatus: card.jdStatus === '暂停中' ? '已发布' : '暂停中',
  }
}

export function voiceToJdPipeline() {
  return [
    '原始录音',
    '录音转写',
    '转写大纲',
    '部门长标杆画像',
    'HR视角补充',
    '岗位能力图谱',
    '思维导图',
    '完整JD',
    '多版本发布文案',
  ]
}

const organizationDepartmentTemplates: Record<string, Omit<OrganizationDepartmentPlan, 'targetHeadcount' | 'roles'> & {
  roles: Array<Omit<OrganizationRolePlan, 'targetHeadcount'> & { ratio: number }>
}> = {
  品牌内容部: {
    departmentName: '品牌内容部',
    mission: '负责品牌内容、自媒体矩阵、创意制作、短视频和传播素材。',
    roles: [
      {
        level: '负责人',
        publishingStage: '第一阶梯',
        ratio: 0.25,
        responsibilities: ['制定内容策略和账号定位', '管理选题、脚本、拍摄和复盘', '沉淀爆款方法论'],
        title: '自媒体内容负责人',
      },
      {
        level: '执行',
        publishingStage: '第二阶梯',
        ratio: 0.5,
        responsibilities: ['完成短视频脚本和创意制作', '跟进拍摄剪辑和发布节奏', '分析内容数据并优化选题'],
        title: '自媒体创意制作',
      },
      {
        level: '实习/兼职',
        publishingStage: '第三阶梯',
        ratio: 0.25,
        responsibilities: ['协助素材整理和基础剪辑', '维护账号发布清单', '完成热点素材收集'],
        title: '内容运营实习生',
      },
    ],
  },
  产品技术中心: {
    departmentName: '产品技术中心',
    mission: '负责AI产品、硬件产品、系统开发、数据接口和技术落地。',
    roles: [
      {
        level: '负责人',
        publishingStage: '第一阶梯',
        ratio: 0.25,
        responsibilities: ['制定产品路线图', '拆解AI系统和硬件需求', '协调研发、供应链和业务场景'],
        title: 'AI硬件产品经理',
      },
      {
        level: '骨干',
        publishingStage: '第二阶梯',
        ratio: 0.45,
        responsibilities: ['开发AI系统和业务接口', '建设数据、录音、简历解析能力', '处理系统稳定性和安全边界'],
        title: 'AI系统开发工程师',
      },
      {
        level: '执行',
        publishingStage: '第三阶梯',
        ratio: 0.3,
        responsibilities: ['协助测试和部署', '整理技术文档', '跟进需求验收'],
        title: '产品技术助理',
      },
    ],
  },
  经营管理部: {
    departmentName: '经营管理部',
    mission: '负责经营目标拆解、管理协同、总助支持、人财行政和流程落地。',
    roles: [
      {
        level: '负责人',
        publishingStage: '第一阶梯',
        ratio: 0.3,
        responsibilities: ['拆解经营目标和管理机制', '推动跨部门协作', '跟踪重点项目结果'],
        title: '经营管理副总经理',
      },
      {
        level: '骨干',
        publishingStage: '第二阶梯',
        ratio: 0.35,
        responsibilities: ['协助老板处理经营事项', '跟踪会议纪要和重点任务', '搭建流程和报表'],
        title: '总经理助理',
      },
      {
        level: '执行',
        publishingStage: '第三阶梯',
        ratio: 0.35,
        responsibilities: ['处理基础人事、财务和行政协同', '维护制度和档案', '支持招聘流程执行'],
        title: '人力资源/财务专员',
      },
    ],
  },
  销售中心: {
    departmentName: '销售中心',
    mission: '负责客户开发、销售转化、渠道合作、回款和业绩增长。',
    roles: [
      {
        level: '负责人',
        publishingStage: '第一阶梯',
        ratio: 0.25,
        responsibilities: ['搭建销售目标和团队打法', '管理大客户与渠道资源', '复盘业绩和回款'],
        title: '销售负责人',
      },
      {
        level: '骨干',
        publishingStage: '第二阶梯',
        ratio: 0.5,
        responsibilities: ['独立开发B端客户', '推进商机、报价、合同和回款', '提供业绩与提成佐证'],
        title: '业务经理',
      },
      {
        level: '执行',
        publishingStage: '第三阶梯',
        ratio: 0.25,
        responsibilities: ['跟进线索和客户资料', '维护CRM和回访节奏', '协助销售材料整理'],
        title: '销售助理',
      },
    ],
  },
}

function inferDepartmentNames(sourceText: string) {
  const matched = new Set<string>()
  if (/销售|业务|客户|市场|营销|渠道|回款/.test(sourceText)) matched.add('销售中心')
  if (/自媒体|内容|品牌|短视频|创意|直播|公众号/.test(sourceText)) matched.add('品牌内容部')
  if (/AI|硬件|系统|开发|产品|技术|数据|软件/.test(sourceText)) matched.add('产品技术中心')
  if (/经营|管理|总助|财务|人力|行政|流程/.test(sourceText)) matched.add('经营管理部')

  return matched.size ? Array.from(matched) : ['销售中心', '品牌内容部', '产品技术中心', '经营管理部']
}

function distributeHeadcount(total: number, ratios: number[]) {
  const safeTotal = Math.max(1, Math.round(total))
  const base = ratios.map((ratio) => Math.max(0, Math.floor(safeTotal * ratio)))
  let diff = safeTotal - base.reduce((sum, item) => sum + item, 0)
  let index = 0
  while (diff > 0) {
    base[index] += 1
    diff -= 1
    index = (index + 1) % base.length
  }
  return base
}

function buildDepartmentPlan(departmentName: string, targetHeadcount: number, roleCount?: number): OrganizationDepartmentPlan {
  const template = organizationDepartmentTemplates[departmentName] ?? organizationDepartmentTemplates['经营管理部']
  const selectedRoles = template.roles.slice(0, Math.max(1, Math.min(roleCount ?? template.roles.length, template.roles.length)))
  const counts = distributeHeadcount(targetHeadcount, selectedRoles.map((role) => role.ratio))

  return {
    departmentName,
    mission: template.mission,
    targetHeadcount: Math.max(1, Math.round(targetHeadcount)),
    roles: selectedRoles.map((role, index) => ({
      level: role.level,
      publishingStage: role.publishingStage,
      responsibilities: role.responsibilities,
      targetHeadcount: counts[index],
      title: role.title,
    })),
  }
}

export function buildOrganizationHiringPlan(input: CompanyHiringBlueprintInput): OrganizationHiringPlan {
  const sourceText = [input.companyIntro, input.industryIntro, input.voiceTranscript].filter(Boolean).join(' ')
  const departmentPlans = input.departmentBriefs?.length
    ? input.departmentBriefs.map((brief) =>
        buildDepartmentPlan(brief.departmentName, brief.targetHeadcount, brief.roleCount),
      )
    : inferDepartmentNames(sourceText).map((departmentName) => buildDepartmentPlan(departmentName, 4))
  const roles = departmentPlans.flatMap((department) =>
    department.roles.map((role) => ({ ...role, departmentName: department.departmentName })),
  )
  const postingLadder = (['第一阶梯', '第二阶梯', '第三阶梯'] as OrganizationRolePlan['publishingStage'][]).map((stage) => {
    const stageRoles = roles.filter((role) => role.publishingStage === stage)
    const focus: Record<OrganizationRolePlan['publishingStage'], string> = {
      第一阶梯: '先发布负责人、关键骨干和能搭架构的人',
      第二阶梯: '再发布业务骨干、专业岗位和核心执行岗位',
      第三阶梯: '最后发布助理、实习、兼职和补位岗位',
    }

    return {
      focus: focus[stage],
      roles: stageRoles.map((role) => `${role.departmentName}-${role.title}`),
      stage,
      targetHeadcount: stageRoles.reduce((sum, role) => sum + role.targetHeadcount, 0),
    }
  })

  return {
    aiCorrectionSteps: [
      '语音/文字转写为完整句子',
      '提炼公司介绍、行业关键词和业务模式',
      '生成组织架构和部门使命',
      '根据部门编制推理岗位分布和职责',
      '生成招聘阶梯、人数和发布文案',
      '人工确认后发布到黑卫士平台或外部招聘账号',
    ],
    departments: departmentPlans,
    humanConfirmationItems: [
      '公司介绍和行业介绍是否准确',
      '组织架构和部门名称是否符合实际',
      '每个部门编制和岗位编制数量是否正确',
      '岗位职责、薪资、汇报关系和任职要求是否需要人工修正',
      '是否允许AI自动发布，发布到哪些账号和平台',
    ],
    postingLadder,
    sourceSummary: sourceText || '待输入公司介绍、行业介绍或语音转写',
    totalHeadcount: departmentPlans.reduce((sum, department) => sum + department.targetHeadcount, 0),
  }
}

function findTargetRole(plan: OrganizationHiringPlan, departmentName: string, roleTitle: string) {
  const department =
    plan.departments.find((item) => item.departmentName === departmentName) ??
    plan.departments.find((item) => item.roles.some((role) => role.title.includes(roleTitle))) ??
    plan.departments[0]
  const role =
    department?.roles.find((item) => item.title.includes(roleTitle) || roleTitle.includes(item.title)) ??
    department?.roles[0]

  return { department, role }
}

export function buildPrePublishingGenerationPlan(input: PrePublishingGenerationInput): PrePublishingGenerationPlan {
  const organizationPlan = buildOrganizationHiringPlan(input)
  const benchmarkBrief = input.benchmarkBrief ?? defaultDepartmentBenchmarkBrief
  const benchmarkSummary = summarizeDepartmentBenchmark(benchmarkBrief)
  const scaleRule = buildCompanyScaleRule(input.employerScale)
  const dailyIterationPlan = buildDailyJdIterationPlan({
    benefitSignals: ['社保福利', '晋升空间', '绩效奖金'],
    exposureDelta: -8,
    peerSalaryRange: benchmarkSummary.keyMetrics[0] ?? '按同行薪酬样本补充',
    resumeConversionRate: 4,
  })
  const { department, role } = findTargetRole(organizationPlan, input.targetDepartmentName, input.targetRoleTitle)
  const roleTitle = role?.title ?? input.targetRoleTitle
  const departmentName = department?.departmentName ?? input.targetDepartmentName
  const responsibilities = role?.responsibilities ?? ['完成岗位核心职责', '沉淀可复用工作方法', '按成果目标复盘交付']
  const topKeywords = benchmarkSummary.jdKeywords.slice(0, 8)
  const topMetrics = benchmarkSummary.keyMetrics.slice(0, 4)
  const topTraits = benchmarkSummary.keyTraits.slice(0, 4)

  return {
    greetingScripts: [
      {
        content: `您好，我们是${input.employerName}，正在招聘${roleTitle}。岗位重点关注${topKeywords.slice(0, 3).join('、')}，如果您方便，可以先发一份简历，我们会尽快反馈。`,
        mode: '预设知识库话术',
      },
      {
        content: `看到您的经历可能和${roleTitle}方向有交集，尤其是${topMetrics.slice(0, 2).join('、') || '业绩成果'}。想进一步了解您目前的机会意向、薪酬预期和到岗时间。`,
        mode: 'AI智能生成话术',
      },
      {
        content: `结合${input.employerName}的${departmentName}岗位需求，我们比较看重${topTraits.slice(0, 3).join('、')}。如果您有相关项目、客户或业绩佐证，可以发简历后安排一次线上沟通。`,
        mode: '预设话术 + AI灵活调整',
      },
    ],
    dailyIterationPlan,
    handoffToBossFlow: [
      'BOSS账号接入',
      '岗位刷新提醒',
      '打招呼队列',
      '收简历/聊天',
      '简历评分',
      '候选人分级',
      '邀约话术',
      '人工确认发送',
      '入库沉淀',
    ],
    jobDescriptionBook: [
      `【岗位说明书】${input.employerName}-${departmentName}-${roleTitle}`,
      `雇主规模：${input.employerScale}`,
      `规模规则：${scaleRule.structureNote}`,
      `部门使命：${department?.mission ?? '按公司组织架构补充部门使命'}`,
      `岗位职责：${responsibilities.join('；')}`,
      `任职画像：${topKeywords.join('、')}`,
      `同行参考：${benchmarkSummary.highPriorityCompanies.join('、') || '公开资料/授权样本待补充'}`,
    ].join('\n'),
    organizationSummary: `${input.employerName}（${input.employerScale}）生成${organizationPlan.departments.length}个部门、${organizationPlan.totalHeadcount}人编制，重点包含${organizationPlan.departments.map((item) => item.departmentName).join('、')}。`,
    performanceGoalDraft: [
      `【成果目标】${roleTitle}`,
      `量化目标：${topMetrics.join('；') || '按岗位设置月度、季度和年度结果指标'}`,
      `质量目标：${topTraits.join('；') || '按岗位设置质量标准、交付标准和复盘口径'}`,
      `周期目标：每日跟进、每周复盘、每月输出成果报告。`,
      `佐证材料：简历、作品、客户、合同、回款、提成、第三方证明或面试作业。`,
    ].join('\n'),
    postingJd: [
      `【发布JD】${roleTitle}`,
      `${input.employerName}正在扩充${departmentName}，欢迎有${topKeywords.slice(0, 5).join('、')}经验的候选人沟通。`,
      `公司规模：${scaleRule.name}，岗位配置按${scaleRule.publishingRule}`,
      `主要职责：${responsibilities.slice(0, 3).join('；')}。`,
      `优先条件：${topTraits.join('、')}。`,
      `参考指标：${topMetrics.join('、')}。`,
      `请通过平台发送简历，合适者优先安排线上沟通。`,
    ].join('\n'),
    referencePolicy: '同行JD只使用授权导入、公开资料参考、手工上传样本和公司自有调研材料；只按平台授权规则和人工确认流程使用。',
    scaleRule,
    workflow: [
      { detail: '录入雇主公司、行业、规模、主体和用人预算。', title: '公司画像与雇主主体' },
      { detail: 'AI按公司规模和部门编制生成组织架构、部门使命和岗位分布。', title: '组织架构与岗位分布' },
      { detail: '用授权导入、公开资料参考和手工样本提炼同行JD关键词。', title: '同行JD参考' },
      { detail: '生成内部可用的岗位说明书，补齐职责、要求、汇报关系和画像。', title: '岗位说明书' },
      { detail: '把岗位说明书压缩成适合招聘平台发布的JD。', title: '发布JD' },
      { detail: '同步生成成果目标、周期目标、质量目标和佐证要求。', title: '成果目标' },
      { detail: '生成预设、AI和预设+AI混合的打招呼和邀约话术。', title: '招聘邀约话术' },
      { detail: '确认后进入账号接入、刷新提醒、打招呼队列、简历收集和分级邀约。', title: '进入BOSS托管链路' },
    ],
  }
}

export function departmentBenchmarkQuestions() {
  return [
    '请部门长列出最希望候选人曾经工作过的10家同行、对手或相近公司。',
    '请说明这些公司里哪些部门最接近本岗位要找的人。',
    '请说明候选人在这些部门做过哪些岗位、职责或关键项目。',
    '请说明最看重哪些可验证的业绩、成果、客户、作品或项目结果。',
    '请补充最关键的岗位关键词、关键指标和关键特征，用于搜索和JD补全。',
    '如果没有明确对手公司，请描述相近业务模式、相近客户群、相近渠道或相近产品的公司。',
  ]
}

export function summarizeDepartmentBenchmark(brief: DepartmentBenchmarkBrief) {
  const highPriorityCompanies = brief.targetCompanies
    .filter((company) => company.priority === '高')
    .map((company) => company.companyName)
  const departments = Array.from(new Set(brief.targetCompanies.flatMap((company) => company.targetDepartments)))
  const achievements = Array.from(new Set(brief.targetCompanies.flatMap((company) => company.desiredAchievements)))
  const roles = Array.from(new Set(brief.targetCompanies.flatMap((company) => company.targetRoles)))

  return {
    companyCount: brief.targetCompanies.length,
    highPriorityCompanies,
    departments,
    roles,
    achievements,
    keyKeywords: brief.keyKeywords,
    keyMetrics: brief.keyMetrics,
    keyTraits: brief.keyTraits,
    jdKeywords: [
      ...brief.keyKeywords.slice(0, 5),
      ...highPriorityCompanies.slice(0, 4),
      ...departments.slice(0, 4),
      ...roles.slice(0, 4),
      ...achievements.slice(0, 4),
      ...brief.keyMetrics.slice(0, 4),
      ...brief.keyTraits.slice(0, 4),
      ...brief.alternativeCompanyTraits.slice(0, 3),
    ],
  }
}

function textIncludesKeyword(text: string, keyword: string) {
  const normalizedText = text.trim().toLowerCase()
  const normalizedKeyword = keyword.trim().toLowerCase()
  return normalizedKeyword.length > 0 && normalizedText.includes(normalizedKeyword)
}

export function peerKeywordWeight(
  candidateText: string,
  brief: DepartmentBenchmarkBrief,
  weights = {
    company: 10,
    department: 6,
    role: 5,
    achievement: 4,
    similarTrait: 3,
  },
) {
  const matches: Array<{ keyword: string; type: '公司' | '部门' | '岗位' | '业绩' | '相近特征'; weight: number }> = []
  let score = 0

  brief.targetCompanies.forEach((company) => {
    if (textIncludesKeyword(candidateText, company.companyName)) {
      const weight = weights.company + (company.priority === '高' ? 3 : company.priority === '中' ? 1 : 0)
      score += weight
      matches.push({ keyword: company.companyName, type: '公司', weight })
    }

    company.targetDepartments.forEach((department) => {
      if (!textIncludesKeyword(candidateText, department)) return
      score += weights.department
      matches.push({ keyword: department, type: '部门', weight: weights.department })
    })

    company.targetRoles.forEach((role) => {
      if (!textIncludesKeyword(candidateText, role)) return
      score += weights.role
      matches.push({ keyword: role, type: '岗位', weight: weights.role })
    })

    company.desiredAchievements.forEach((achievement) => {
      if (!textIncludesKeyword(candidateText, achievement)) return
      score += weights.achievement
      matches.push({ keyword: achievement, type: '业绩', weight: weights.achievement })
    })
  })

  brief.alternativeCompanyTraits.forEach((trait) => {
    if (!textIncludesKeyword(candidateText, trait)) return
    score += weights.similarTrait
    matches.push({ keyword: trait, type: '相近特征', weight: weights.similarTrait })
  })

  return {
    matches,
    score,
  }
}
