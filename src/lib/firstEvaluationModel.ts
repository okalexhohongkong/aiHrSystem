import type { CandidateEvaluationInput } from './scoring'

export type FirstEvaluationDimensionId =
  | 'household'
  | 'commute'
  | 'majorPassion'
  | 'stability'
  | 'compensation'
  | 'management'
  | 'planningReport'
  | 'careerVision'
  | 'performanceProof'

export type FirstEvaluationDimension = {
  id: FirstEvaluationDimensionId
  label: string
  autoFillText: string
  description: string
  captureFields: string[]
  complianceNote?: string
  detailNotes: string[]
  remediationPlan?: string
}

export type FirstEvaluationCustomDimensionId = `custom-${string}`
export type FirstEvaluationRowId = FirstEvaluationDimensionId | FirstEvaluationCustomDimensionId

export type FirstEvaluationRow = Omit<FirstEvaluationDimension, 'id'> & {
  id: FirstEvaluationRowId
  score: number
  weight: number
  importanceRank: number
  includedInScore: boolean
  isCustom?: boolean
}

export const firstEvaluationLayoutPreference = {
  density: 'compact',
  mode: 'horizontal-bars',
  radarLegendColumns: 3,
  visibleDetailBlocks: ['autoFillText', 'captureFields', 'detailNotes'],
} as const

export const firstEvaluationDimensions: FirstEvaluationDimension[] = [
  {
    id: 'household',
    label: '户籍家庭情况记录',
    autoFillText: '通话自动补充：婚姻、祖籍、户籍、家庭人口、离异/子女等仅在候选人主动提供时记录。',
    description: '只做背景记录和到岗支持判断，不按地域、籍贯做淘汰。',
    captureFields: ['婚姻状态', '祖籍', '户籍', '家庭人口', '子女情况', '离婚/离异备注'],
    complianceNote: '婚姻、祖籍、户籍、子女等只做候选人自愿补充和沟通备注，不进入评分、不作为录用或淘汰依据。',
    detailNotes: ['家庭支持情况', '可接受工作安排', '候选人主动补充信息'],
  },
  {
    id: 'commute',
    label: '通勤居住情况',
    autoFillText: '通话自动补充：地铁约48分钟/12站，开车约35分钟，公交约70分钟；通勤偏远时追问是否会开车或可搬近。',
    description: '评估通勤距离、到岗时间、工作时间匹配和稳定支持条件。',
    captureFields: ['居住地', '地铁时长', '开车时长', '公交时长', '站点数量', '通勤工具', '是否会开车'],
    detailNotes: ['地铁/公交/开车分别耗时', '早晚高峰可接受度', '加班或早会到岗能力'],
    remediationPlan: '通勤偏远时追问是否会开车、是否有车、是否可搬近、是否可接受班车/弹性到岗等补救方案。',
  },
  {
    id: 'majorPassion',
    label: '专业匹配和岗位热爱度',
    autoFillText: '通话自动补充：专业与岗位匹配；热爱度按个人激情、职业激情、产业激情三层记录。',
    description: '评估专业学历匹配，并结合个人激情、职业激情、产业激情判断岗位热爱度。',
    captureFields: ['所学专业', '学历层级', '岗位相关证书', '个人激情', '职业激情', '产业激情'],
    detailNotes: ['个人激情', '职业激情', '产业激情'],
  },
  {
    id: 'stability',
    label: '就职稳定性',
    autoFillText: '简历自动分析：每段任职年限、跳槽频率、空窗期和毕业年份时间线；一般不需要重复追问。',
    description: '评估每段工作时长、跳槽频率、空窗和时间线一致性。',
    captureFields: ['每段任职年限', '跳槽频率', '空窗期', '毕业年份', '时间线冲突'],
    detailNotes: ['优先由简历自动分析', '三年以上稳定经历加分', '一年左右短经历需核验原因'],
  },
  {
    id: 'compensation',
    label: '薪资绩效结构',
    autoFillText: '通话自动补充：固定工资、提成、奖金、绩效任务、历史达标率和收入增长口径。',
    description: '评估薪酬、绩效、提成、奖金、任务和达标口径是否清楚，以及历史达成情况。',
    captureFields: ['固定工资', '提成规则', '奖金规则', '绩效任务', '达标比例', '历史业绩'],
    detailNotes: ['薪酬结构稳定性', '任务达成比例', '历史收入与业绩口径一致性'],
  },
  {
    id: 'management',
    label: '管理岗专项评估',
    autoFillText: '通话自动补充：团队规模、管理模型、授权方式、复盘机制、经营指标和跨部门推动案例。',
    description: '仅管理岗计分，评估带队、授权、复盘、跨部门推动和经营意识。',
    captureFields: ['团队规模', '管理模型', '授权方式', '复盘机制', '经营指标', '跨部门推动'],
    detailNotes: ['管理模型', '管理能力', '目标拆解', '团队培养'],
  },
  {
    id: 'planningReport',
    label: '工作规划和汇报习惯',
    autoFillText: '通话自动补充：候选人如何做周计划、月计划、复盘、汇报和跨部门协同。',
    description: '评估目标拆解、过程管理、复盘、汇报节奏和协同习惯。',
    captureFields: ['周计划', '月计划', '复盘习惯', '汇报节奏', '协同工具'],
    detailNotes: ['目标拆解能力', '过程管理能力', '复盘和汇报习惯'],
  },
  {
    id: 'careerVision',
    label: '职业规划和个人愿景',
    autoFillText: '通话自动补充：三年规划、岗位期待、行业憧憬，以及个人/职业/产业三情是否连贯。',
    description: '结合个人激情、职业激情、产业激情，评估岗位发展目标、成长意愿和长期匹配度。',
    captureFields: ['三年规划', '岗位期待', '职业激情', '产业激情', '个人兴趣爱好'],
    detailNotes: ['个人激情', '职业激情', '产业激情', '行业憧憬'],
  },
  {
    id: 'performanceProof',
    label: '业绩佐证真实性',
    autoFillText: '通话自动补充：业绩由大B/中B/小B、大C/中C/小C、大G/中G/小G等客户构成，并区分个人与团队口径。',
    description: '评估业绩、项目、作品、证明材料和口径一致性。',
    captureFields: ['个人业绩', '团队业绩', '客户构成', '客户层级', '证明材料', '成交链路'],
    detailNotes: ['大B/中B/小B客户', '大C/中C/小C客户', '大G/中G/小G政府客户', '个人与团队业绩口径'],
  },
]

export const firstEvaluationDimensionIds = firstEvaluationDimensions.map((dimension) => dimension.id)

export const postTypeDimensionOrders: Record<
  CandidateEvaluationInput['targetPostType'],
  FirstEvaluationDimensionId[]
> = {
  finance: [
    'stability',
    'majorPassion',
    'performanceProof',
    'planningReport',
    'compensation',
    'commute',
    'careerVision',
    'household',
    'management',
  ],
  function: [
    'stability',
    'planningReport',
    'majorPassion',
    'performanceProof',
    'compensation',
    'commute',
    'careerVision',
    'household',
    'management',
  ],
  hr: [
    'planningReport',
    'stability',
    'majorPassion',
    'performanceProof',
    'careerVision',
    'compensation',
    'commute',
    'household',
    'management',
  ],
  management: [
    'management',
    'performanceProof',
    'planningReport',
    'stability',
    'compensation',
    'careerVision',
    'majorPassion',
    'commute',
    'household',
  ],
  operation: [
    'performanceProof',
    'majorPassion',
    'planningReport',
    'careerVision',
    'stability',
    'compensation',
    'commute',
    'household',
    'management',
  ],
  sales: [
    'performanceProof',
    'compensation',
    'stability',
    'planningReport',
    'majorPassion',
    'careerVision',
    'commute',
    'household',
    'management',
  ],
  tech: [
    'majorPassion',
    'performanceProof',
    'planningReport',
    'stability',
    'careerVision',
    'compensation',
    'commute',
    'household',
    'management',
  ],
}

const dimensionById = new Map(firstEvaluationDimensions.map((dimension) => [dimension.id, dimension]))

function scoreByDimension(id: FirstEvaluationDimensionId, input: CandidateEvaluationInput): number {
  const stableJobs = input.workExperiences.filter((experience) => experience.endYear - experience.startYear >= 3).length
  const hasShortJobs = input.workExperiences.filter((experience) => experience.endYear - experience.startYear <= 1).length >= 2

  const scores: Record<FirstEvaluationDimensionId, number> = {
    careerVision: input.hasZeroToOneProject || input.hasProjectManagerExperience ? 8 : 7,
    commute: 8,
    compensation: input.targetPostType === 'sales' ? 8 : 7.5,
    household: 7,
    majorPassion: input.majorMatchesPost ? 9 : 4,
    management: input.targetPostType === 'management' ? 8 : 0,
    performanceProof: input.hasClearPerformance ? 8.5 : 6,
    planningReport: input.hasProjectManagerExperience ? 8.5 : 8,
    stability: hasShortJobs ? 5.5 : stableJobs >= 2 ? 8.8 : 7.5,
  }

  return scores[id]
}

function weightForRank(rank: number) {
  return Math.max(1, 10 - rank + 1)
}

export function normalizeFirstEvaluationOrder(order: FirstEvaluationDimensionId[]) {
  const knownIds = new Set(firstEvaluationDimensionIds)
  const deduped = order.filter((id, index) => knownIds.has(id) && order.indexOf(id) === index)
  const missing = firstEvaluationDimensionIds.filter((id) => !deduped.includes(id))
  return [...deduped, ...missing]
}

export function moveFirstEvaluationDimension(
  order: FirstEvaluationDimensionId[],
  draggedId: FirstEvaluationDimensionId,
  targetId: FirstEvaluationDimensionId,
) {
  if (draggedId === targetId) return normalizeFirstEvaluationOrder(order)
  const normalized = normalizeFirstEvaluationOrder(order)
  const fromIndex = normalized.indexOf(draggedId)
  const toIndex = normalized.indexOf(targetId)
  if (fromIndex < 0 || toIndex < 0) return normalized

  const nextOrder = [...normalized]
  const [draggedItem] = nextOrder.splice(fromIndex, 1)
  nextOrder.splice(toIndex, 0, draggedItem)
  return nextOrder
}

export function createFirstEvaluationRows(
  input: CandidateEvaluationInput,
  order = postTypeDimensionOrders[input.targetPostType],
): FirstEvaluationRow[] {
  return normalizeFirstEvaluationOrder(order).map((id, index) => {
    const dimension = dimensionById.get(id)
    if (!dimension) {
      throw new Error(`Unknown first evaluation dimension: ${id}`)
    }

    const includedInScore = id !== 'management' || input.targetPostType === 'management'
    return {
      ...dimension,
      importanceRank: index + 1,
      includedInScore,
      score: scoreByDimension(id, input),
      weight: weightForRank(index + 1),
    }
  })
}

export function createManualFirstEvaluationDimension(
  label: string,
  rank: number,
  score = 7,
): FirstEvaluationRow {
  const normalizedLabel = label.trim() || '自定义评估维度'
  const safeRank = Math.max(1, Math.round(rank))
  const normalizedScore = Math.max(0, Math.min(10, Math.round(score * 10) / 10))
  const idSeed = normalizedLabel
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\u4e00-\u9fa5\w-]/g, '')
    .slice(0, 24)

  return {
    id: `custom-${idSeed || 'manual'}-${safeRank}` as FirstEvaluationCustomDimensionId,
    label: normalizedLabel,
    autoFillText: '手动新增：用于补充该岗位或该候选人的特殊考察点，可在后续正式版保存为岗位模板。',
    description: '自定义维度由人事或面试官手动补充，适合记录岗位临时关注的能力、短板、风险或专项优势。',
    captureFields: ['手动补充项', '专项观察', '面试官备注'],
    detailNotes: ['可加分', '可减分', '可作为岗位模板沉淀'],
    importanceRank: safeRank,
    includedInScore: true,
    isCustom: true,
    score: normalizedScore,
    weight: weightForRank(Math.min(safeRank, 9)),
  }
}

export function calculateFirstEvaluationWeightedAverage(rows: FirstEvaluationRow[]) {
  const includedRows = rows.filter((row) => row.includedInScore)
  const totalWeight = includedRows.reduce((total, row) => total + row.weight, 0)
  if (totalWeight === 0) return 0

  const weightedScore = includedRows.reduce((total, row) => total + row.score * row.weight, 0)
  return Math.round((weightedScore / totalWeight) * 10) / 10
}

export function buildRadarPolygonPoints(
  rows: Pick<FirstEvaluationRow, 'score'>[],
  centerX: number,
  centerY: number,
  radius: number,
) {
  const points = rows.map((row, index) => {
    const angle = (Math.PI * 2 * index) / rows.length - Math.PI / 2
    const normalizedScore = Math.max(0, Math.min(10, row.score)) / 10
    const pointRadius = radius * normalizedScore
    return {
      x: Math.round((centerX + Math.cos(angle) * pointRadius) * 10) / 10,
      y: Math.round((centerY + Math.sin(angle) * pointRadius) * 10) / 10,
    }
  })

  return {
    pointString: points.map((point) => `${point.x},${point.y}`).join(' '),
    points,
  }
}
