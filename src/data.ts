import {
  calculateGeneralScore,
  calculateSalesScore,
  totalLevel,
  totalScore,
  type CandidateEvaluationInput,
  type SalesEvaluationInput,
} from './lib/scoring'

export type CandidateStatus = '待初试' | '推荐复试' | '待作业' | '储备' | '录用' | '淘汰'

export type CandidateCommunication = {
  sentEmail: boolean
  sentResume: boolean
  addedWechat: boolean
  exchangedPhone: boolean
}

export type CandidateSignalSource = '平台可见' | '人工观察' | '候选人自述' | '不可获取'
export type CandidateDataFieldStatus = '已采集' | '待补充' | '不可获取' | '受限不采集'
export type CandidateDataFieldSignal = {
  label: string
  status: CandidateDataFieldStatus
  note?: string
}

export type CandidatePlatformActivity = {
  applicationsInSystem: number
  externalApplicationCount: number | null
  externalApplicationSource: CandidateSignalSource
  lastVisibleActiveAt: string | null
  refreshFrequency: '高频刷新' | '偶尔刷新' | '低频/长期未刷新' | '未知'
  activitySource: CandidateSignalSource
  confidence: '高' | '中' | '低' | '未知'
}

export type Candidate = {
  id: number
  name: string
  phone: string
  email: string
  appliedAt: string
  source: 'BOSS手动导入' | '招聘邮箱' | '内推' | '文件上传'
  postName: string
  postType: CandidateEvaluationInput['targetPostType']
  status: CandidateStatus
  expectedSalaryMin: number
  expectedSalaryMax: number
  currentLocation: string
  workCities: string[]
  availabilityStatus: '在职' | '离职' | '应届' | '兼职'
  educationLevel: '高中/中专' | '大专' | '本科' | '硕士' | '博士'
  firstDegreeLevel: '高中/中专' | '大专' | '二本' | '一本' | '硕士' | '博士'
  majorName: string
  workType: string
  communication: CandidateCommunication
  dataFieldSignals: CandidateDataFieldSignal[]
  platformActivity: CandidatePlatformActivity
  skillTags: string[]
  customFlags: string[]
  commonScore: number
  businessScore: number
  totalScore: number
  totalLevel: ReturnType<typeof totalLevel>
  risks: string[]
  strengths: string[]
  audioStatus: '未上传' | '解析中' | '已解析' | '待核对'
  homeworkStatus: '无作业' | '待提交' | '按时提交' | '逾期' | '放弃'
  cooperationLevel: '高配合' | '中配合' | '低配合' | '不配合'
  evaluationInput: CandidateEvaluationInput
  salesInput?: SalesEvaluationInput
  transcript: string
  agentSummary: string
}

const liChenGeneral: CandidateEvaluationInput = {
  graduationYear: 2015,
  major: '市场营销',
  targetPostType: 'sales',
  majorMatchesPost: true,
  hasDoubleDegree: false,
  hasAcademicAchievement: false,
  hasPatent: false,
  hasZeroToOneProject: true,
  hasProjectManagerExperience: true,
  hasClearPerformance: true,
  workExperiences: [
    {
      achievements: '有可核验提成和业绩证明',
      company: '华东云科',
      role: '客户经理',
      startYear: 2015,
      endYear: 2018,
      direction: 'sales',
    },
    {
      achievements: '负责大客户销售部，个人年业绩200万以上',
      company: '云启科技',
      role: '销售经理',
      startYear: 2018,
      endYear: 2024,
      direction: 'sales',
    },
  ],
}

const liChenSales: SalesEvaluationInput = {
  personalSales: 1800000,
  teamSales: 3000000,
  targetCompletionRate: 120,
  hasDecisionMakerAccess: true,
  hasSelfSourcedLeads: true,
  hasContentLeadGen: true,
  averageSalesCycleDays: 45,
  canExplainDealChain: true,
  canProvideProof: true,
  monthlyCommissionAvg: 12000,
  jobStabilityYears: 6,
  usesCrmOrReview: true,
}

const zhouMinGeneral: CandidateEvaluationInput = {
  graduationYear: 2014,
  major: '会计学',
  targetPostType: 'finance',
  majorMatchesPost: true,
  hasDoubleDegree: true,
  hasAcademicAchievement: false,
  hasPatent: false,
  hasZeroToOneProject: false,
  hasProjectManagerExperience: false,
  hasClearPerformance: true,
  workExperiences: [
    { company: '星海制造', role: '会计', startYear: 2014, endYear: 2019, direction: 'finance' },
    { company: '瑞丰集团', role: '财务经理', startYear: 2019, endYear: 2025, direction: 'finance' },
  ],
}

const chenLinGeneral: CandidateEvaluationInput = {
  graduationYear: 2019,
  major: '广播电视编导',
  targetPostType: 'operation',
  majorMatchesPost: true,
  hasDoubleDegree: false,
  hasAcademicAchievement: true,
  hasPatent: false,
  hasZeroToOneProject: true,
  hasProjectManagerExperience: true,
  hasClearPerformance: true,
  workExperiences: [
    { company: '清风传媒', role: '内容策划', startYear: 2019, endYear: 2022, direction: 'content' },
    { company: '万象品牌', role: '短视频负责人', startYear: 2022, endYear: 2025, direction: 'content' },
  ],
}

const zhaoLeiGeneral: CandidateEvaluationInput = {
  graduationYear: 2020,
  major: '机械设计',
  targetPostType: 'tech',
  majorMatchesPost: false,
  hasDoubleDegree: false,
  hasAcademicAchievement: false,
  hasPatent: true,
  hasZeroToOneProject: true,
  hasProjectManagerExperience: false,
  hasClearPerformance: false,
  workExperiences: [
    { company: '智联外包', role: '前端开发', startYear: 2019, endYear: 2021, direction: 'frontend' },
    { company: '远航科技', role: 'AI系统开发', startYear: 2020, endYear: 2022, direction: 'ai' },
    { company: '青石智能', role: '算法工程师', startYear: 2023, endYear: 2024, direction: 'algorithm' },
  ],
}

function candidateDataFieldSignals(
  overrides: Partial<Record<string, CandidateDataFieldStatus>> = {},
): CandidateDataFieldSignal[] {
  const fields: CandidateDataFieldSignal[] = [
    { label: '投递时间', status: '已采集' },
    { label: '邮件/简历/微信/电话', status: '已采集' },
    { label: '期望薪酬', status: '已采集' },
    { label: '当前城市/工作城市', status: '已采集' },
    { label: '工作年限/工作份数', status: '已采集' },
    { label: '专业/工种', status: '已采集' },
    { label: '在离职状态', status: '已采集' },
    { label: '学历层级', status: '已采集' },
    { label: '平台外部投递总量', status: '不可获取', note: '仅在平台明确展示或候选人授权时记录' },
    { label: 'BOSS活跃/刷新频率', status: '待补充', note: '来自平台可见提示、人工观察或候选人自述' },
    { label: '籍贯/祖籍', status: '受限不采集', note: '不进入默认筛选评分' },
    { label: '身份证归属地', status: '受限不采集', note: '不进入默认筛选评分' },
    { label: '婚育/子女情况', status: '受限不采集', note: '不进入默认筛选评分' },
    { label: '宗教信仰', status: '受限不采集', note: '不进入默认筛选评分' },
    { label: '政治身份', status: '受限不采集', note: '不进入默认筛选评分' },
  ]

  return fields.map((field) => ({
    ...field,
    status: overrides[field.label] ?? field.status,
  }))
}

function buildCandidate(
  base: Omit<Candidate, 'commonScore' | 'businessScore' | 'totalScore' | 'totalLevel' | 'risks' | 'strengths'>,
  fallbackBusinessScore: number,
): Candidate {
  const general = calculateGeneralScore(base.evaluationInput)
  const sales = base.salesInput ? calculateSalesScore(base.salesInput) : undefined
  const businessScore = sales?.score ?? fallbackBusinessScore
  const combined = totalScore(general.score, businessScore)

  return {
    ...base,
    commonScore: general.score,
    businessScore,
    totalScore: combined,
    totalLevel: totalLevel(combined),
    risks: [...general.risks, ...(sales?.risks ?? [])],
    strengths: [...general.reasons, ...(sales?.reasons ?? [])],
  }
}

export const initialCandidates: Candidate[] = [
  buildCandidate(
    {
      id: 1,
      name: '李晨',
      phone: '13800001111',
      email: 'lichen@example.com',
      appliedAt: '2026-06-19T10:18:00+08:00',
      source: 'BOSS手动导入',
      postName: '业务经理',
      postType: 'sales',
      status: '推荐复试',
      expectedSalaryMin: 12,
      expectedSalaryMax: 20,
      currentLocation: '上海',
      workCities: ['杭州', '上海'],
      availabilityStatus: '在职',
      educationLevel: '本科',
      firstDegreeLevel: '一本',
      majorName: '市场营销',
      workType: '大客户销售部 / B端销售',
      communication: { addedWechat: true, exchangedPhone: true, sentEmail: true, sentResume: true },
      dataFieldSignals: candidateDataFieldSignals({
        BOSS活跃: '已采集',
        'BOSS活跃/刷新频率': '已采集',
      }),
      platformActivity: {
        applicationsInSystem: 1,
        externalApplicationCount: null,
        externalApplicationSource: '不可获取',
        lastVisibleActiveAt: '2026-06-19T10:16:00+08:00',
        refreshFrequency: '高频刷新',
        activitySource: '平台可见',
        confidence: '中',
      },
      skillTags: ['会开车', 'Office', 'CRM', '能喝酒'],
      customFlags: ['0-1项目', '项目经理', '业绩清晰'],
      audioStatus: '已解析',
      homeworkStatus: '待提交',
      cooperationLevel: '高配合',
      evaluationInput: liChenGeneral,
      salesInput: liChenSales,
      transcript:
        '候选人最近六年在云启科技大客户销售部负责B端客户开发，个人年业绩约200万，团队业绩约300万，销售周期30-60天，可提供绩效单和部分提成记录。',
      agentSummary: '销售经验完整，来自目标同行公司和目标部门，具备内容获客和决策层沟通经验，业绩口径清楚，可优先复试。',
    },
    88,
  ),
  buildCandidate(
    {
      id: 2,
      name: '周敏',
      phone: '13900002222',
      email: 'zhoumin@example.com',
      appliedAt: '2026-06-19T09:26:00+08:00',
      source: '招聘邮箱',
      postName: '财务经理',
      postType: 'finance',
      status: '推荐复试',
      expectedSalaryMin: 15,
      expectedSalaryMax: 22,
      currentLocation: '苏州',
      workCities: ['苏州', '上海'],
      availabilityStatus: '离职',
      educationLevel: '硕士',
      firstDegreeLevel: '一本',
      majorName: '会计学',
      workType: '财务管理',
      communication: { addedWechat: false, exchangedPhone: true, sentEmail: true, sentResume: true },
      dataFieldSignals: candidateDataFieldSignals(),
      platformActivity: {
        applicationsInSystem: 1,
        externalApplicationCount: null,
        externalApplicationSource: '不可获取',
        lastVisibleActiveAt: null,
        refreshFrequency: '未知',
        activitySource: '不可获取',
        confidence: '未知',
      },
      skillTags: ['Office', '预算', '税务', '内控'],
      customFlags: ['双学历', '稳定性强'],
      audioStatus: '待核对',
      homeworkStatus: '无作业',
      cooperationLevel: '中配合',
      evaluationInput: zhouMinGeneral,
      transcript: '候选人熟悉预算、税务、成本核算和内控流程，过往两段财务经历均超过5年。',
      agentSummary: '财务稳定性强，专业匹配，建议复试重点核验过往预算规模和团队协作情况。',
    },
    84,
  ),
  buildCandidate(
    {
      id: 3,
      name: '陈琳',
      phone: '13700003333',
      email: 'chenlin@example.com',
      appliedAt: '2026-06-19T11:05:00+08:00',
      source: '内推',
      postName: '自媒体创意制作',
      postType: 'operation',
      status: '待作业',
      expectedSalaryMin: 8,
      expectedSalaryMax: 14,
      currentLocation: '杭州',
      workCities: ['杭州'],
      availabilityStatus: '在职',
      educationLevel: '本科',
      firstDegreeLevel: '二本',
      majorName: '广播电视编导',
      workType: '内容制作',
      communication: { addedWechat: true, exchangedPhone: false, sentEmail: false, sentResume: true },
      dataFieldSignals: candidateDataFieldSignals({
        平台外部投递总量: '已采集',
        'BOSS活跃/刷新频率': '已采集',
      }),
      platformActivity: {
        applicationsInSystem: 2,
        externalApplicationCount: 3,
        externalApplicationSource: '候选人自述',
        lastVisibleActiveAt: '2026-06-19T11:02:00+08:00',
        refreshFrequency: '偶尔刷新',
        activitySource: '人工观察',
        confidence: '低',
      },
      skillTags: ['AI工具', '剪辑', '脚本', '账号运营'],
      customFlags: ['学术成果', '爆款案例', '0-1项目'],
      audioStatus: '已解析',
      homeworkStatus: '待提交',
      cooperationLevel: '高配合',
      evaluationInput: chenLinGeneral,
      transcript: '候选人做过短视频账号从0到1，单条最高曝光破百万，能说明选题、脚本和复盘过程。',
      agentSummary: '内容经验较强，建议布置爆款复盘和新账号三周冷启动作业。',
    },
    86,
  ),
  buildCandidate(
    {
      id: 4,
      name: '赵磊',
      phone: '13600004444',
      email: 'zhaolei@example.com',
      appliedAt: '2026-06-18T16:40:00+08:00',
      source: '文件上传',
      postName: 'AI系统开发',
      postType: 'tech',
      status: '储备',
      expectedSalaryMin: 18,
      expectedSalaryMax: 28,
      currentLocation: '深圳',
      workCities: ['深圳', '广州'],
      availabilityStatus: '离职',
      educationLevel: '本科',
      firstDegreeLevel: '大专',
      majorName: '机械设计',
      workType: 'AI系统开发',
      communication: { addedWechat: false, exchangedPhone: false, sentEmail: false, sentResume: true },
      dataFieldSignals: candidateDataFieldSignals({
        'BOSS活跃/刷新频率': '已采集',
      }),
      platformActivity: {
        applicationsInSystem: 1,
        externalApplicationCount: null,
        externalApplicationSource: '不可获取',
        lastVisibleActiveAt: '2026-06-18T16:38:00+08:00',
        refreshFrequency: '低频/长期未刷新',
        activitySource: '平台可见',
        confidence: '中',
      },
      skillTags: ['会写代码', 'AI工具', 'Python', '前端'],
      customFlags: ['专利', '方向切换多'],
      audioStatus: '未上传',
      homeworkStatus: '无作业',
      cooperationLevel: '低配合',
      evaluationInput: zhaoLeiGeneral,
      transcript: '暂无录音。',
      agentSummary: '技术方向切换较多，且存在时间线重叠，需补充项目证明和代码样例。',
    },
    62,
  ),
]

export const questionTemplates = [
  {
    postType: 'sales',
    title: '销售岗专项问卷',
    questions: ['个人业绩和团队业绩分别是多少？', '客户从哪里来？', '提成规则和月均到手是多少？', '是否可提供业绩佐证？'],
  },
  {
    postType: 'finance',
    title: '财务岗胜任力问卷',
    questions: ['处理过多大规模预算？', '如何处理报表差异？', '遇到业务提前确认收入如何处理？'],
  },
  {
    postType: 'tech',
    title: '技术岗专项问卷',
    questions: ['最近一个系统的架构是什么？', '本人负责哪些核心模块？', '线上故障如何排查？'],
  },
]

export const platformPlan = [
  { platform: 'Web网页端', priority: '第一优先级', status: '本版实现' },
  { platform: 'PWA安装版', priority: '第二优先级', status: '本版实现' },
  { platform: 'Mac桌面端', priority: '第三优先级', status: '后续Electron/Tauri封装' },
  { platform: 'Windows桌面端', priority: '第三优先级', status: '后续Electron/Tauri封装' },
  { platform: 'Android/iPad平板', priority: '第四优先级', status: '先用PWA，后续Capacitor封装' },
  { platform: '鸿蒙/小程序', priority: '预留', status: '后续独立适配接口' },
]
