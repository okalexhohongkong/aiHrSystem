export type HrReferenceSourceId =
  | 'onet'
  | 'shrm'
  | 'oracle-hcm'
  | 'sap-successfactors'
  | 'workday'
  | 'mckinsey'
  | 'ibm-workforce'
  | 'iso-30414'

export type HrReferenceCategory =
  | '岗位任务与能力库'
  | 'JD模板与HR实践'
  | '大型HCM主数据'
  | '目标绩效与接口'
  | '组织设计'
  | '劳动力规划'
  | '人力资本报告'

export type HrSystemMappedModule =
  | '岗位发布'
  | '岗位问卷'
  | '成果目标'
  | '人才库'
  | '数据看板'
  | '平台底座'
  | '组织架构'
  | '候选人档案'
  | '权限审计'

export type HrSystemReference = {
  category: HrReferenceCategory
  complianceNote: string
  dataStructureHints: string[]
  id: HrReferenceSourceId
  keywords: string[]
  mappedModules: HrSystemMappedModule[]
  name: string
  referenceUse: string
  url: string
  workflowIdeas: string[]
}

export const hrSystemReferences: HrSystemReference[] = [
  {
    category: '岗位任务与能力库',
    complianceNote: '只引用公开职业能力框架做字段参考；不直接照搬为企业自己的岗位制度。',
    dataStructureHints: ['职业族', '岗位任务', '技能', '能力', '知识', '工作活动'],
    id: 'onet',
    keywords: ['岗位任务', '技能要求', '能力模型', '工作活动', '职业分类'],
    mappedModules: ['岗位发布', '岗位问卷', '成果目标', '组织架构'],
    name: 'O*NET',
    referenceUse: '用于岗位任务、技能、能力、工作活动的数据源参考，沉淀 JD 和岗位能力库。',
    url: 'https://www.onetcenter.org/database.html',
    workflowIdeas: ['岗位先映射职业族', '再抽取任务和能力', '最后反推面试题和成果目标'],
  },
  {
    category: 'JD模板与HR实践',
    complianceNote: '用于JD结构和HR表达口径参考，正式制度仍以企业内部审批版本为准。',
    dataStructureHints: ['岗位摘要', '职责', '任职要求', '汇报关系', '绩效标准'],
    id: 'shrm',
    keywords: ['岗位说明书', 'JD模板', '招聘口径', '职责要求', '绩效标准'],
    mappedModules: ['岗位发布', '岗位问卷', '成果目标'],
    name: 'SHRM',
    referenceUse: '用于 HR 岗位说明书、JD 模板和招聘管理实践的表达参考。',
    url: 'https://www.shrm.org/topics-tools/tools/job-descriptions',
    workflowIdeas: ['先生成标准JD骨架', '补齐职责和要求', '同步生成面试确认问题'],
  },
  {
    category: '大型HCM主数据',
    complianceNote: '参考大型组织的人岗组织主数据，不引入超出单机版需要的复杂审批。',
    dataStructureHints: ['人员', '岗位', '职位', '部门', '地点', '雇佣关系', '绩效文档'],
    id: 'oracle-hcm',
    keywords: ['人员主数据', '岗位职位', '组织结构', '本地合规', '绩效文档'],
    mappedModules: ['平台底座', '组织架构', '候选人档案', '权限审计'],
    name: 'Oracle HCM',
    referenceUse: '用于岗位、职位、人员、组织、权限和绩效文档结构参考，适合大型组织口径。',
    url: 'https://docs.oracle.com/en/cloud/saas/human-resources/',
    workflowIdeas: ['人岗组织分层建模', '候选人转员工时保留档案链路', '权限与审计同步记录'],
  },
  {
    category: '目标绩效与接口',
    complianceNote: '只参考目标、绩效、表单和接口思路；不做第三方系统的未经授权调用。',
    dataStructureHints: ['目标计划', '绩效表单', '360评价', 'OData实体', '自定义字段'],
    id: 'sap-successfactors',
    keywords: ['目标管理', '绩效表单', 'OData接口', '人才管理', '360评价'],
    mappedModules: ['成果目标', '数据看板', '平台底座', '权限审计'],
    name: 'SAP SuccessFactors',
    referenceUse: '用于目标、绩效、人才管理和 OData 接口设计思路参考。',
    url: 'https://help.sap.com/docs/SAP_SUCCESSFACTORS_PLATFORM',
    workflowIdeas: ['目标表单可配置', '绩效评分可追溯', '数据接口按实体和权限开放'],
  },
  {
    category: '大型HCM主数据',
    complianceNote: '参考HCM对象和API目录的结构思想；所有真实集成必须获得企业授权。',
    dataStructureHints: ['Worker', 'Job Profile', 'Position', 'Organization', 'Pre-hire', 'Job Requisition'],
    id: 'workday',
    keywords: ['员工对象', '岗位画像', '组织对象', '预雇佣', '招聘需求'],
    mappedModules: ['平台底座', '组织架构', '候选人档案', '人才库', '权限审计'],
    name: 'Workday',
    referenceUse: '用于员工、岗位、组织、人才流程的 HCM API 和数据对象参考。',
    url: 'https://community.workday.com/sites/default/files/file-hosting/productionapi/index.html',
    workflowIdeas: ['候选人先作为预雇佣对象', '录用后转员工档案', '岗位与组织关系保持可追踪'],
  },
  {
    category: '组织设计',
    complianceNote: '用于组织设计方法参考，不能替代企业战略和老板最终组织判断。',
    dataStructureHints: ['价值单元', '组织设计元素', '治理机制', '角色分工', '运行节奏'],
    id: 'mckinsey',
    keywords: ['组织设计', '价值导向', '运行机制', '角色职责', '治理节奏'],
    mappedModules: ['组织架构', '成果目标', '数据看板'],
    name: 'McKinsey',
    referenceUse: '用于组织设计、价值导向组织管理和岗位编制推演方法参考。',
    url: 'https://www.mckinsey.com/capabilities/people-and-organizational-performance/how-we-help-clients/organize-to-value',
    workflowIdeas: ['先看战略价值', '再拆组织单元', '最后把岗位成果目标对齐到价值贡献'],
  },
  {
    category: '劳动力规划',
    complianceNote: '用于预算、编制和预测的字段参考，薪酬预算需企业内部确认。',
    dataStructureHints: ['编制预算', '薪酬类型', '入职日期', '奖金', '福利', '人员预测'],
    id: 'ibm-workforce',
    keywords: ['劳动力规划', '编制预算', '人员预测', '薪酬预算', '经营预测'],
    mappedModules: ['岗位发布', '组织架构', '数据看板', '成果目标'],
    name: 'IBM Planning Analytics',
    referenceUse: '用于劳动力规划、预算、人员编制和经营预测的数据字段参考。',
    url: 'https://www.ibm.com/products/planning-analytics/workforce-planning',
    workflowIdeas: ['按岗位预算规划编制', '按薪酬福利测算成本', '按招聘结果滚动修正计划'],
  },
  {
    category: '人力资本报告',
    complianceNote: '用于公司级HR看板指标参考；对外披露必须经过企业法务和管理层确认。',
    dataStructureHints: ['员工构成', '多样性', '流动率', '招聘', '学习发展', '健康安全', '合规'],
    id: 'iso-30414',
    keywords: ['人力资本报告', '员工构成', 'HR指标', '合规披露', '组织健康'],
    mappedModules: ['数据看板', '平台底座', '人才库', '权限审计'],
    name: 'ISO 30414',
    referenceUse: '用于人力资本报告指标和公司级 HR 看板的指标口径参考。',
    url: 'https://www.iso.org/standard/30414',
    workflowIdeas: ['招聘漏斗进入HR指标库', '人才库沉淀进入人力资本看板', '敏感披露走权限审批'],
  },
]

export const hrReferenceIntegrationPrinciples = [
  '参考对象只进入字段、结构、流程和指标，不替代企业自身制度。',
  '国外大型HCM系统负责给数据结构启发，黑卫士负责落到招聘、邀约、面试和成果目标流程。',
  '所有第三方系统或招聘平台集成都必须按授权、人工确认、审计留痕和合规边界推进。',
]

export function hrReferencesForModule(moduleName: HrSystemMappedModule) {
  return hrSystemReferences.filter((reference) => reference.mappedModules.includes(moduleName))
}

export function hrReferenceCountByModule(moduleName: HrSystemMappedModule) {
  return hrReferencesForModule(moduleName).length
}

export function uniqueHrReferenceModules() {
  return Array.from(new Set(hrSystemReferences.flatMap((reference) => reference.mappedModules)))
}

export function hrReferenceCoverageSummary() {
  const modules = uniqueHrReferenceModules()

  return {
    categories: Array.from(new Set(hrSystemReferences.map((reference) => reference.category))),
    moduleCoverage: modules.map((moduleName) => ({
      count: hrReferenceCountByModule(moduleName),
      moduleName,
    })),
    sourceCount: hrSystemReferences.length,
  }
}
