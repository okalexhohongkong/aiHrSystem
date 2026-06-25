export type ContractType = 'service' | 'employment' | 'division' | 'partner'

export type ContractVariableId =
  | 'candidateName'
  | 'companyEntity'
  | 'postName'
  | 'startDate'
  | 'trialEndDate'
  | 'baseCompensation'
  | 'performanceTarget'
  | 'commissionRule'
  | 'divisionName'
  | 'profitShareRatio'
  | 'settlementCycle'
  | 'partnerScope'
  | 'exitRule'

export type ContractVariableDefinition = {
  example: string
  id: ContractVariableId
  label: string
  required: boolean
  source: string
}

export type MemoScope = {
  allowed: boolean
  description: string
  id: string
  title: string
}

export type ContractTemplateDefinition = {
  approvals: string[]
  fixedTemplateNote: string
  id: string
  keyIndicators: string[]
  memoScopes: MemoScope[]
  title: string
  type: ContractType
  useCase: string
  variables: ContractVariableDefinition[]
}

export type ContractMemoItem = {
  content: string
  id: string
  scopeId: string
}

export type ContractDraft = {
  memoItems: ContractMemoItem[]
  missingVariables: ContractVariableDefinition[]
  status: 'readyForLegalReview' | 'missingVariables'
  template: ContractTemplateDefinition
  variables: Partial<Record<ContractVariableId, string>>
}

export const contractTypeLabels: Record<ContractType, string> = {
  division: '事业部合约',
  employment: '劳动合同合约',
  partner: '合伙人合约',
  service: '劳务合同合约',
}

function variable(
  id: ContractVariableId,
  label: string,
  example: string,
  source: string,
  required = true,
): ContractVariableDefinition {
  return { example, id, label, required, source }
}

const baseVariables = [
  variable('candidateName', '签约对象', '王某某', '候选人档案'),
  variable('companyEntity', '签约主体公司', '黑卫士科技有限公司', '公司主体配置'),
  variable('postName', '岗位/合作角色', 'AI产品经理', '岗位发布系统'),
  variable('startDate', '开始日期', '2026-07-01', '入职/合作确认'),
  variable('baseCompensation', '基础报酬/工资', '12000元/月', '面谈薪酬结果'),
  variable('performanceTarget', '关键业绩指标', '月度有效客户线索80条', '成果目标模块'),
]

export const contractTemplateCatalog: ContractTemplateDefinition[] = [
  {
    approvals: ['人事确认变量', '法务复核模板', '老板/授权负责人确认'],
    fixedTemplateNote: '律师固定劳务模板锁定，不允许业务人员直接修改正文。',
    id: 'service-labor-template',
    keyIndicators: ['服务内容', '服务周期', '交付成果', '报酬结算', '保密义务'],
    memoScopes: [
      { allowed: true, description: '可记录服务交付节奏、沟通方式、非正文补充说明。', id: 'service-delivery', title: '服务交付备忘' },
      { allowed: true, description: '可记录面试谈妥的绩效口径，正式进正文前需法务复核。', id: 'performance-note', title: '绩效口径备忘' },
      { allowed: false, description: '不得在备忘录中绕开律师模板直接变更主体法律责任。', id: 'legal-liability', title: '法律责任变更' },
    ],
    title: '劳务合同合约模板',
    type: 'service',
    useCase: '适用于劳务、兼职、小时工、短期项目服务等非标准劳动关系场景。',
    variables: [
      ...baseVariables,
      variable('settlementCycle', '结算周期', '月结/项目结', '面谈结果'),
    ],
  },
  {
    approvals: ['试用期结果确认', '人事确认薪资与岗位', '法务复核', '用章审批'],
    fixedTemplateNote: '劳动合同正文使用律师模板，转正变量由试用期考核和薪酬确认自动带入。',
    id: 'employment-template',
    keyIndicators: ['岗位名称', '试用期', '转正薪资', '绩效规则', '工作地点', '劳动期限'],
    memoScopes: [
      { allowed: true, description: '可记录试用期达成情况、转正沟通纪要和后续培养目标。', id: 'probation-summary', title: '试用期转正备忘' },
      { allowed: true, description: '可记录绩效考核口径和薪资结构解释，正式条款需法务复核。', id: 'salary-performance-note', title: '薪资绩效备忘' },
      { allowed: false, description: '不得用备忘录替代劳动合同必备条款。', id: 'replace-core-clause', title: '替代核心条款' },
    ],
    title: '劳动合同合约模板',
    type: 'employment',
    useCase: '适用于试用期通过后转正、建立正式劳动合同的员工。',
    variables: [
      ...baseVariables,
      variable('trialEndDate', '试用期结束日期', '2026-09-30', '三轮作业/试用期考核'),
      variable('commissionRule', '绩效/提成规则', '按月度绩效方案执行', '成果目标模块', false),
    ],
  },
  {
    approvals: ['事业部负责人确认', '财务测算', '法务复核', '老板确认'],
    fixedTemplateNote: '事业部合约必须基于律师模板和财务模型，不允许仅靠口头承诺。',
    id: 'division-template',
    keyIndicators: ['事业部名称', '业绩目标', '红利口径', '提成分成', '结算周期', '亏损/退出规则'],
    memoScopes: [
      { allowed: true, description: '可记录红利测算假设、阶段目标、复盘周期。', id: 'bonus-model-note', title: '红利测算备忘' },
      { allowed: true, description: '可记录事业部资源边界、人员编制和费用口径。', id: 'resource-scope-note', title: '资源边界备忘' },
      { allowed: false, description: '不得通过备忘录绕开财务和法务审批承诺固定收益。', id: 'fixed-return', title: '固定收益承诺' },
    ],
    title: '事业部合约模板',
    type: 'division',
    useCase: '适用于高级人才、事业部负责人、享受事业部业绩红利或提成分成的合作。',
    variables: [
      ...baseVariables,
      variable('divisionName', '事业部名称', 'AI硬件事业部', '组织架构/岗位发布'),
      variable('profitShareRatio', '红利/分成比例', '净利润10%', '老板确认/财务测算'),
      variable('settlementCycle', '结算周期', '季度结算', '财务模型'),
      variable('exitRule', '退出规则', '连续两季未达标触发复盘', '法务模板'),
    ],
  },
  {
    approvals: ['合伙范围确认', '财务测算', '法务复核', '股东/老板确认'],
    fixedTemplateNote: '合伙人合约属于高风险高权限模板，正文必须由律师模板锁定。',
    id: 'partner-template',
    keyIndicators: ['合作模块', '分账比例', '业绩门槛', '投入资源', '结算方式', '退出机制'],
    memoScopes: [
      { allowed: true, description: '可记录模块边界、客户归属、阶段里程碑和分账测算。', id: 'partner-scope-note', title: '合伙范围备忘' },
      { allowed: true, description: '可记录达到多少业绩后进入分账、分红或升级机制。', id: 'threshold-note', title: '业绩门槛备忘' },
      { allowed: false, description: '不得在备忘录中承诺股权、固定收益或绕过公司审批。', id: 'equity-promise', title: '股权/固定收益承诺' },
    ],
    title: '合伙人合约模板',
    type: 'partner',
    useCase: '适用于与公司在某个模块按业绩要求和分账比例进行深度合作的人。',
    variables: [
      ...baseVariables,
      variable('partnerScope', '合伙模块范围', '跨境电商渠道拓展', '合伙范围确认'),
      variable('profitShareRatio', '分账比例', '回款毛利15%', '财务测算/老板确认'),
      variable('settlementCycle', '分账结算周期', '月结/季结', '财务模型'),
      variable('exitRule', '退出和降级规则', '未达门槛自动转普通合作', '法务模板'),
    ],
  },
]

export const contractWorkflowSteps = [
  '面试谈妥关键指标',
  '选择律师固定模板',
  '自动填充变量数据',
  '额外约定进入备忘录',
  '法务/财务/老板审批',
  '生成待签署合约包',
]

export function templateByType(type: ContractType) {
  return contractTemplateCatalog.find((template) => template.type === type) ?? contractTemplateCatalog[0]
}

export function createContractDraft(
  type: ContractType,
  variables: Partial<Record<ContractVariableId, string>> = {},
  memoItems: ContractMemoItem[] = [],
): ContractDraft {
  const template = templateByType(type)
  const missingVariables = template.variables.filter(
    (item) => item.required && !variables[item.id]?.trim(),
  )

  return {
    memoItems,
    missingVariables,
    status: missingVariables.length > 0 ? 'missingVariables' : 'readyForLegalReview',
    template,
    variables,
  }
}

export function memoReviewSummary(template: ContractTemplateDefinition, memoItems: ContractMemoItem[]) {
  return memoItems.map((memo) => {
    const scope = template.memoScopes.find((item) => item.id === memo.scopeId)
    return {
      ...memo,
      allowed: scope?.allowed ?? false,
      scopeTitle: scope?.title ?? '未知备忘范围',
    }
  })
}

export function contractDashboardSummary() {
  const draftSamples = contractTemplateCatalog.map((template) =>
    createContractDraft(template.type, {
      baseCompensation: '面谈后填写',
      candidateName: '候选人姓名',
      companyEntity: '签约主体公司',
      performanceTarget: '成果目标模块带入',
      postName: '岗位名称',
      startDate: '待确认',
    }),
  )

  return {
    readyForLegalReview: draftSamples.filter((draft) => draft.status === 'readyForLegalReview').length,
    templateCount: contractTemplateCatalog.length,
    totalMemoScopes: contractTemplateCatalog.reduce((total, template) => total + template.memoScopes.length, 0),
    totalRequiredVariables: contractTemplateCatalog.reduce(
      (total, template) => total + template.variables.filter((variableItem) => variableItem.required).length,
      0,
    ),
  }
}
