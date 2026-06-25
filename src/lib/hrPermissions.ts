export type PermissionLevelId = 'absolute' | 'hr-executive' | 'module-manager' | 'execution'

export type PermissionLevel = {
  id: PermissionLevelId
  name: string
  scope: string
  roles: string[]
}

export type HrFunctionModule = {
  id: string
  name: string
  managerRole: string
  executorRole: string
  description: string
}

export const permissionLevelLabels: Record<PermissionLevelId, string> = {
  absolute: '绝对权限',
  execution: '执行层',
  'hr-executive': 'HR高管权限',
  'module-manager': '模块主管权限',
}

export const permissionLevels: PermissionLevel[] = [
  {
    id: 'absolute',
    name: permissionLevelLabels.absolute,
    roles: ['老板', '总工程师', '平台管理员'],
    scope: '拥有系统最高配置、品牌换肤、权限分配、模块启停、账号恢复和审计查看权限。',
  },
  {
    id: 'hr-executive',
    name: permissionLevelLabels['hr-executive'],
    roles: ['人力资源总裁', '人力资源总监', '人力资源部门经理', '人力资源部长'],
    scope: '负责人力资源全局策略、部门权限、招聘绩效培训薪酬等模块统筹和审批。',
  },
  {
    id: 'module-manager',
    name: permissionLevelLabels['module-manager'],
    roles: ['招聘主管', '绩效主管', '培训主管', '薪酬主管', '员工关系主管', '企业文化主管', 'HR数据主管'],
    scope: '管理单一或多个HR模块的流程、字段、题库、报表、人员分工和执行质量。',
  },
  {
    id: 'execution',
    name: permissionLevelLabels.execution,
    roles: ['招聘专员', '规划专员', '培训专员', '绩效专员', '薪酬专员', '员工关系专员', '企业文化专员'],
    scope: '执行日常录入、邀约、面试跟踪、培训任务、绩效数据、薪酬资料和员工关系工单。',
  },
]

export const hrFunctionModules: HrFunctionModule[] = [
  {
    description: '制定公司人力资源长期方向、组织能力建设和人才战略。',
    executorRole: '人力资源规划专员',
    id: 'hr-strategy',
    managerRole: '人力资源战略主管',
    name: '人力资源战略',
  },
  {
    description: '做人力编制、岗位体系、组织架构、年度招聘和岗位预算规划。',
    executorRole: '规划专员',
    id: 'hr-planning',
    managerRole: '人力资源规划主管',
    name: '人力资源规划',
  },
  {
    description: '负责岗位发布、候选人池、邀约、面试、录用和招聘渠道管理。',
    executorRole: '招聘专员',
    id: 'recruitment',
    managerRole: '招聘主管',
    name: '招聘配置',
  },
  {
    description: '负责成果目标、OKR/KPI、绩效评估、周期复盘和绩效面谈。',
    executorRole: '绩效专员',
    id: 'performance',
    managerRole: '绩效主管',
    name: '绩效管理',
  },
  {
    description: '负责新人培养、岗位技能、干部培训、课程考试和人才发展。',
    executorRole: '培训专员',
    id: 'training',
    managerRole: '培训发展主管',
    name: '培训发展',
  },
  {
    description: '负责薪资结构、奖金、提成、福利、调薪和薪酬合规。',
    executorRole: '薪酬专员',
    id: 'compensation',
    managerRole: '薪酬福利主管',
    name: '薪酬福利',
  },
  {
    description: '负责入转调离、劳动关系、员工沟通、争议处理和员工关怀。',
    executorRole: '员工关系专员',
    id: 'employee-relations',
    managerRole: '员工关系主管',
    name: '员工关系',
  },
  {
    description: '负责价值观、文化活动、员工氛围、内部传播和组织认同。',
    executorRole: '企业文化专员',
    id: 'culture',
    managerRole: '企业文化主管',
    name: '企业文化',
  },
  {
    description: '负责组织诊断、流程机制、岗位职责、授权体系和组织效率。',
    executorRole: '组织发展专员',
    id: 'organization-development',
    managerRole: '组织发展主管',
    name: '组织发展',
  },
  {
    description: '负责干部盘点、关键人才库、继任计划、梯队建设和高潜培养。',
    executorRole: '人才发展专员',
    id: 'talent-pipeline',
    managerRole: '干部/人才梯队主管',
    name: '干部/人才梯队',
  },
  {
    description: '负责HR数据看板、权限审计、劳动合规、隐私授权和制度留痕。',
    executorRole: 'HR数据专员',
    id: 'hr-data-compliance',
    managerRole: 'HR数据与合规主管',
    name: 'HR数据与合规',
  },
]

export function summarizeHrPermissionSystem() {
  return `${permissionLevels.length}级权限 / ${hrFunctionModules.length}个HR模块`
}
