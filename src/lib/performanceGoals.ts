export type PerformanceGoalMode = 'achievement' | 'okr' | 'performance'

export type GoalIndicatorType = 'quantitative' | 'cyclical' | 'systematic' | 'result'

export type GoalCadence =
  | 'beforeWork'
  | 'afterWork'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'semiAnnual'
  | 'annual'
  | 'project'

export type GoalIndicator = {
  cadence?: GoalCadence
  evidence: string
  id: string
  target: string
  title: string
  type: GoalIndicatorType
  weight: number
}

export type GoalTask = {
  description: string
  id: string
  indicators: GoalIndicator[]
  title: string
}

export type GoalModule = {
  description: string
  id: string
  tasks: GoalTask[]
  title: string
}

export type RoleGoalFramework = {
  mode: PerformanceGoalMode
  modules: GoalModule[]
  roleName: string
}

export const performanceGoalModeLabels: Record<PerformanceGoalMode, string> = {
  achievement: '成果目标模块',
  okr: 'OKR模块',
  performance: '绩效考核模块',
}

export const goalIndicatorTypeLabels: Record<GoalIndicatorType, string> = {
  cyclical: '周期化',
  quantitative: '量化',
  result: '业绩',
  systematic: '系统化',
}

export const goalCadenceLabels: Record<GoalCadence, string> = {
  afterWork: '下班前',
  annual: '每年',
  beforeWork: '上班前',
  daily: '每天',
  monthly: '每月',
  project: '项目制',
  quarterly: '每季',
  semiAnnual: '每半年',
  weekly: '每周',
}

function indicator(
  id: string,
  title: string,
  type: GoalIndicatorType,
  target: string,
  evidence: string,
  weight: number,
  cadence?: GoalCadence,
): GoalIndicator {
  return { cadence, evidence, id, target, title, type, weight }
}

export function createTrainingSystemTask(): GoalTask {
  return {
    description: '用于不能简单按件数考核的培训类工作，按系统闭环拆成可检查步骤。',
    id: 'team-training-system',
    indicators: [
      indicator('training-topic', '选题与对象', 'systematic', '明确培训主题、对象、痛点和达成标准', '培训立项记录', 8, 'project'),
      indicator('training-outline', '大纲与课件', 'systematic', '完成大纲、课件、案例和演练脚本', '课件链接/版本记录', 10, 'project'),
      indicator('training-exam', '考试题与评分', 'systematic', '形成考试题、评分标准和通过线', '试卷/评分表', 8, 'project'),
      indicator('training-delivery', '培训与演练', 'cyclical', '每周至少完成一次关键主题培训或复盘', '签到、录屏、演练记录', 10, 'weekly'),
      indicator('training-share', '上台分享与改进', 'systematic', '参训人员完成分享、演练和改进动作', '分享记录/改进清单', 9, 'project'),
    ],
    title: '团队培训闭环',
  }
}

export function buildRoleGoalFramework(
  roleName = '人事招聘负责人',
  mode: PerformanceGoalMode = 'achievement',
): RoleGoalFramework {
  return {
    mode,
    roleName,
    modules: [
      {
        description: '部门组织、团队训练、招聘考核和管理复盘。',
        id: 'department-management',
        tasks: [
          createTrainingSystemTask(),
          {
            description: '把招聘团队每个人的过程指标、结果指标和改进动作统一起来。',
            id: 'recruiting-review',
            indicators: [
              indicator('review-daily', '每日招聘复盘', 'cyclical', '每日下班前完成邀约、简历、面试漏斗复盘', '日报/看板截图', 8, 'afterWork'),
              indicator('review-weekly', '周度问题改进', 'systematic', '每周沉淀3个问题、3个改进动作、1个优秀案例', '周报/案例库', 8, 'weekly'),
              indicator('review-hiring-quality', '招聘质量结果', 'result', '入职后30天留存与岗位匹配度达标', '入职跟踪表', 12, 'monthly'),
            ],
            title: '招聘考核与复盘',
          },
        ],
        title: '部门管理模块',
      },
      {
        description: '个人每天、每周、每月必须完成的核心动作。',
        id: 'personal-work',
        tasks: [
          {
            description: '把上班前、每天、下班前、每周、每月动作写成可检查清单。',
            id: 'personal-routine',
            indicators: [
              indicator('before-work-plan', '上班前计划', 'cyclical', '每天上班前确认岗位优先级和邀约名单', '当日计划记录', 5, 'beforeWork'),
              indicator('daily-candidate-screen', '每日筛简历', 'quantitative', '每日完成指定岗位简历筛选和标签补齐', '候选人池处理记录', 10, 'daily'),
              indicator('after-work-summary', '下班前总结', 'cyclical', '下班前提交当天漏斗数据和异常提醒', '日报/系统提交记录', 5, 'afterWork'),
            ],
            title: '个人周期动作',
          },
        ],
        title: '个人工作模块',
      },
      {
        description: '个人可量化的招聘结果和可验证贡献。',
        id: 'personal-performance',
        tasks: [
          {
            description: '把候选人触达、有效沟通、面试到场、录用等漏斗结果拆开考核。',
            id: 'personal-funnel',
            indicators: [
              indicator('candidate-touch', '有效触达量', 'quantitative', '每日有效触达、回复、交换联系方式达成目标', '系统渠道数据', 10, 'daily'),
              indicator('interview-arrival', '面试到场率', 'result', '邀约候选人按时到场并完成初试', '面试签到/会议记录', 12, 'weekly'),
              indicator('offer-conversion', '录用转化', 'result', '推荐候选人进入录用或储备人才库', '录用/入库记录', 14, 'monthly'),
            ],
            title: '个人业绩漏斗',
          },
        ],
        title: '个人业绩模块',
      },
      {
        description: '部门整体招聘交付、人才库沉淀和组织补位结果。',
        id: 'department-performance',
        tasks: [
          {
            description: '考核部门整体是否补齐关键岗位，并沉淀可复用人才资源。',
            id: 'department-delivery',
            indicators: [
              indicator('key-role-fill', '关键岗位补位', 'result', '关键岗位按周期完成面试、复试、录用进度', '岗位交付看板', 15, 'monthly'),
              indicator('talent-pool-growth', '人才库沉淀', 'quantitative', '每月沉淀高匹配、高潜力、薪酬谈不拢人才', '简历库标签数据', 8, 'monthly'),
              indicator('department-review', '季度组织复盘', 'systematic', '每季度输出部门招聘能力和组织短板报告', '季度复盘文档', 10, 'quarterly'),
            ],
            title: '部门业绩交付',
          },
        ],
        title: '部门业绩模块',
      },
      {
        description: '岗位技能、工具能力、AI能力和业务理解的成长目标。',
        id: 'personal-skill',
        tasks: [
          {
            description: '把技能提升从口号变成可检查、可证明、可复盘的目标。',
            id: 'skill-growth',
            indicators: [
              indicator('ai-tool-skill', 'AI工具熟练度', 'systematic', '能用AI生成JD、问卷、邀约话术和候选人报告', '产出样例/系统记录', 8, 'monthly'),
              indicator('interview-skill', '面试提问能力', 'systematic', '能围绕岗位成果追问证据、漏洞和匹配度', '面试录音质检', 9, 'monthly'),
              indicator('industry-map', '岗位行业图谱', 'systematic', '完成岗位标杆公司、关键词、能力图谱更新', '岗位画像文档', 8, 'quarterly'),
            ],
            title: '个人技能成长',
          },
        ],
        title: '个人技能模块',
      },
    ],
  }
}

export function flattenGoalIndicators(framework: RoleGoalFramework) {
  return framework.modules.flatMap((module) =>
    module.tasks.flatMap((task) =>
      task.indicators.map((indicatorItem) => ({
        ...indicatorItem,
        moduleTitle: module.title,
        taskTitle: task.title,
      })),
    ),
  )
}

export function countGoalIndicatorTypes(framework: RoleGoalFramework) {
  return flattenGoalIndicators(framework).reduce<Record<GoalIndicatorType, number>>(
    (counts, indicatorItem) => ({
      ...counts,
      [indicatorItem.type]: counts[indicatorItem.type] + 1,
    }),
    { cyclical: 0, quantitative: 0, result: 0, systematic: 0 },
  )
}

export function totalGoalWeight(framework: RoleGoalFramework) {
  return flattenGoalIndicators(framework).reduce((total, indicatorItem) => total + indicatorItem.weight, 0)
}

export function moduleWeight(module: GoalModule) {
  return module.tasks.reduce(
    (total, task) => total + task.indicators.reduce((sum, indicatorItem) => sum + indicatorItem.weight, 0),
    0,
  )
}

export function goalFrameworkSummary(framework: RoleGoalFramework) {
  const indicators = flattenGoalIndicators(framework)
  return {
    indicatorCount: indicators.length,
    moduleCount: framework.modules.length,
    taskCount: framework.modules.reduce((total, module) => total + module.tasks.length, 0),
    totalWeight: totalGoalWeight(framework),
    typeCounts: countGoalIndicatorTypes(framework),
  }
}
