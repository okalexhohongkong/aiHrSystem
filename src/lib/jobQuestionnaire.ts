import type { CandidateEvaluationInput } from './scoring'

export type QuestionnaireSource = 'preset' | 'manual' | 'ai' | 'jd'

export type JobQuestionnaireQuestion = {
  id: string
  prompt: string
  bonus: number
  penalty: number
  weight: number
  scoringGuide: string
  source: QuestionnaireSource
}

export type QuestionnaireSignalTone = 'black' | 'green'

export type JobQuestionnaireSignal = {
  id: string
  label: string
  description: string
  tone: QuestionnaireSignalTone
}

export type JobQuestionnaireModule = {
  id: string
  title: string
  focus: string
  questionIds: string[]
}

export type JobQuestionnaireCard = {
  id: string
  title: string
  roleType: CandidateEvaluationInput['targetPostType'] | 'planning' | 'marketing' | 'media' | 'executive'
  description: string
  isFavorite: boolean
  questions: JobQuestionnaireQuestion[]
  questionModules: JobQuestionnaireModule[]
  signals: JobQuestionnaireSignal[]
  tags: string[]
}

export const defaultJobQuestionnaireCards: JobQuestionnaireCard[] = [
  {
    description: '客户分层、成交链路、提成核验、业绩佐证和抗压目标。',
    id: 'sales',
    isFavorite: true,
    questions: [
      question('sales-performance', '个人业绩和团队业绩分别是多少？客户由大B/中B/小B、大C/中C/小C、大G/中G/小G哪几类构成？', 8, -6, 10, '能区分个人/团队口径且可提供佐证加分；只讲团队总额且口径混乱减分。'),
      question('sales-deal-chain', '请完整复盘一个从获客到成交再到回款的项目链路。', 7, -5, 9, '能讲清决策人、周期、异议、报价、回款加分；链路断裂减分。'),
      question('sales-commission', '过往提成规则、月均到手提成和达标率分别是多少？', 5, -4, 8, '薪酬绩效结构清楚且与业绩匹配加分；无法解释减分。'),
    ],
    questionModules: [
      moduleBlock('sales-achievement', '业绩与客户分层', '个人贡献、客户层级、业绩佐证', ['sales-performance']),
      moduleBlock('sales-chain', '成交全链路', '获客、推进、成交、回款', ['sales-deal-chain']),
      moduleBlock('sales-pay', '薪酬提成核验', '提成规则、到账、达标率', ['sales-commission']),
    ],
    roleType: 'sales',
    signals: [
      signal('sales-black-fake', '业绩口径混乱', '只讲团队总额，无法说明个人产出、客户类型和回款证据。', 'black'),
      signal('sales-green-proof', '业绩可佐证', '能提供提成、工资条、绩效单或第三方证明。', 'green'),
      signal('sales-green-content', '内容获客能力', '会视频号、直播、公众号或私域内容引流。', 'green'),
    ],
    tags: ['销售岗', '业绩', '客户分层'],
    title: '销售岗问卷',
  },
  {
    description: '预算、税务、成本、报表、内控和风险意识。',
    id: 'finance',
    isFavorite: false,
    questions: [
      question('finance-budget', '处理过多大规模预算？预算偏差如何追踪和复盘？', 6, -4, 9, '预算口径、差异追踪、责任归因清楚加分。'),
      question('finance-tax', '遇到业务提前确认收入或票据不完整时如何处理？', 6, -6, 10, '坚持合规边界并能推动业务修正加分。'),
    ],
    questionModules: [
      moduleBlock('finance-budget-module', '预算与成本', '预算规模、偏差追踪、成本控制', ['finance-budget']),
      moduleBlock('finance-compliance-module', '税务内控边界', '票据、收入确认、业务合规推动', ['finance-tax']),
    ],
    roleType: 'finance',
    signals: [
      signal('finance-black-loose', '合规边界松', '遇到票据、收入确认问题时以方便业务为先，缺少底线。', 'black'),
      signal('finance-green-control', '内控意识强', '能说明规则、证据链和推动业务修正的方法。', 'green'),
      signal('finance-green-system', '系统工具熟练', '熟悉预算、ERP、表格模型或自动化报表。', 'green'),
    ],
    tags: ['财务岗', '内控', '预算'],
    title: '财务岗问卷',
  },
  {
    description: '市场洞察、活动策划、传播节奏、预算产出和复盘。',
    id: 'planning',
    isFavorite: false,
    questions: [
      question('planning-case', '请讲一个从洞察到方案、执行、复盘的完整策划案例。', 7, -5, 9, '目标、受众、预算、执行和复盘完整加分。'),
      question('planning-metric', '如何判断一次市场策划是否成功？看哪些数据？', 5, -3, 7, '能讲清线索、转化、到店、ROI等指标加分。'),
    ],
    questionModules: [
      moduleBlock('planning-case-module', '完整策划案例', '洞察、方案、执行、复盘', ['planning-case']),
      moduleBlock('planning-metric-module', '效果指标', '线索、转化、ROI、复盘口径', ['planning-metric']),
    ],
    roleType: 'planning',
    signals: [
      signal('planning-black-empty', '只会讲概念', '不能落到目标、预算、执行和结果。', 'black'),
      signal('planning-green-case', '案例闭环完整', '能讲清从洞察到复盘的全流程。', 'green'),
      signal('planning-green-data', '数据复盘强', '能用数据判断方案成败并提出改进。', 'green'),
    ],
    tags: ['策划岗', '市场', '复盘'],
    title: '策划岗问卷',
  },
  {
    description: '营销打法、渠道增长、转化链路、投放复盘和团队协同。',
    id: 'marketing',
    isFavorite: false,
    questions: [
      question('marketing-channel', '你最熟悉的获客渠道是什么？如何做投放和转化复盘？', 7, -4, 9, '能讲清成本、转化率、留资和成交加分。'),
      question('marketing-growth', '如果给你30天拉升一个新品曝光，你会怎么拆目标？', 6, -4, 8, '目标拆解、资源配置和节奏清晰加分。'),
    ],
    questionModules: [
      moduleBlock('marketing-channel-module', '渠道获客', '投放、留资、转化、成交', ['marketing-channel']),
      moduleBlock('marketing-growth-module', '增长拆解', '30天目标、节奏、资源配置', ['marketing-growth']),
    ],
    roleType: 'marketing',
    signals: [
      signal('marketing-black-no-roi', '不看ROI', '只讲曝光，不会计算成本、转化和成交。', 'black'),
      signal('marketing-green-growth', '增长拆解清楚', '能把目标拆成渠道、内容、转化和复盘动作。', 'green'),
      signal('marketing-green-tools', '工具打法熟', '懂投放后台、CRM、表单和数据追踪。', 'green'),
    ],
    tags: ['营销岗', '增长', '渠道'],
    title: '营销岗问卷',
  },
  {
    description: '账号定位、选题、脚本、拍摄剪辑、爆款复盘和AI工具。',
    id: 'media',
    isFavorite: true,
    questions: [
      question('media-zero-one', '请讲一个账号从0到1或爆款内容的完整复盘。', 7, -4, 10, '能讲清选题、脚本、投放/自然流、数据和复盘加分。'),
      question('media-ai-tool', '你如何使用AI辅助选题、脚本、剪辑或素材管理？', 5, -2, 7, '能落到具体工具和产出流程加分。'),
    ],
    questionModules: [
      moduleBlock('media-content-module', '内容作品复盘', '选题、脚本、制作、数据', ['media-zero-one']),
      moduleBlock('media-ai-module', 'AI工具链', 'AI选题、脚本、剪辑、素材管理', ['media-ai-tool']),
    ],
    roleType: 'media',
    signals: [
      signal('media-black-no-work', '无作品沉淀', '不能展示作品、数据或复盘过程。', 'black'),
      signal('media-green-hit', '爆款复盘清楚', '能解释爆款形成原因和可复制方法。', 'green'),
      signal('media-green-ai', 'AI内容工具熟练', '能把AI用于选题、脚本、剪辑和素材管理。', 'green'),
    ],
    tags: ['自媒体岗', '内容', 'AI工具'],
    title: '自媒体岗问卷',
  },
  {
    description: '架构、代码、故障排查、AI系统落地和工程质量。',
    id: 'tech',
    isFavorite: false,
    questions: [
      question('tech-architecture', '最近一个系统的架构是什么？本人负责哪些核心模块？', 7, -5, 10, '能画清边界、数据流和本人贡献加分。'),
      question('tech-incident', '线上故障如何定位、止血、复盘和防复发？', 6, -4, 8, '有真实故障处理方法论加分。'),
    ],
    questionModules: [
      moduleBlock('tech-architecture-module', '架构与本人贡献', '系统边界、数据流、核心模块', ['tech-architecture']),
      moduleBlock('tech-incident-module', '故障处理', '定位、止血、复盘、防复发', ['tech-incident']),
    ],
    roleType: 'tech',
    signals: [
      signal('tech-black-fuzzy', '贡献边界模糊', '讲不清本人负责模块、难点和产出。', 'black'),
      signal('tech-green-ownership', '核心模块负责', '能说明架构、数据流、权衡和上线结果。', 'green'),
      signal('tech-green-ai', 'AI系统经验', '做过AI产品、自动化工具或工程化落地。', 'green'),
    ],
    tags: ['技术岗', '架构', 'AI系统'],
    title: '技术岗问卷',
  },
  {
    description: '管理模型、目标拆解、授权、复盘、培养和跨部门推动。',
    id: 'management',
    isFavorite: false,
    questions: [
      question('management-model', '你的管理模型是什么？如何拆目标、授权、检查和复盘？', 8, -5, 10, '方法论清楚且有实际案例加分。'),
      question('management-team', '带过多大团队？如何处理低绩效和核心人才保留？', 6, -4, 8, '能兼顾结果、培养和组织稳定加分。'),
    ],
    questionModules: [
      moduleBlock('management-model-module', '管理模型', '目标拆解、授权、检查、复盘', ['management-model']),
      moduleBlock('management-team-module', '团队经营', '低绩效处理、核心人才保留', ['management-team']),
    ],
    roleType: 'management',
    signals: [
      signal('management-black-only-command', '只会下命令', '缺少目标拆解、检查节奏和人才培养。', 'black'),
      signal('management-green-system', '管理闭环强', '有目标、授权、检查、复盘和激励机制。', 'green'),
      signal('management-green-cross', '跨部门推动强', '能协调业务、财务、技术和人事资源。', 'green'),
    ],
    tags: ['管理岗', '带队', '经营'],
    title: '管理岗问卷',
  },
  {
    description: '经营目标、利润意识、组织搭建、老板协同和副职边界。',
    id: 'executive',
    isFavorite: true,
    questions: [
      question('executive-profit', '你过去负责过哪些经营指标？收入、成本、利润和现金流分别怎么管？', 9, -6, 10, '能讲清经营指标、抓手和结果加分。'),
      question('executive-owner', '作为副总/总助，你如何和老板分工、汇报和补位？', 7, -5, 9, '角色边界清楚、能承接关键任务加分。'),
    ],
    questionModules: [
      moduleBlock('executive-profit-module', '经营指标', '收入、成本、利润、现金流', ['executive-profit']),
      moduleBlock('executive-owner-module', '老板协同', '分工、汇报、补位、边界', ['executive-owner']),
    ],
    roleType: 'executive',
    signals: [
      signal('executive-black-title-only', '只有头衔无结果', '不能说明负责指标、资源边界和经营结果。', 'black'),
      signal('executive-green-profit', '利润意识强', '能把收入、成本、利润和现金流讲清楚。', 'green'),
      signal('executive-green-structure', '组织搭建能力', '能搭班子、建机制、补老板短板。', 'green'),
    ],
    tags: ['经营岗', '副总', '总助'],
    title: '经营副职岗问卷',
  },
]

export function signal(id: string, label: string, description: string, tone: QuestionnaireSignalTone): JobQuestionnaireSignal {
  return { description, id, label, tone }
}

export function moduleBlock(id: string, title: string, focus: string, questionIds: string[]): JobQuestionnaireModule {
  return { focus, id, questionIds, title }
}

export function question(
  id: string,
  prompt: string,
  bonus: number,
  penalty: number,
  weight: number,
  scoringGuide: string,
  source: QuestionnaireSource = 'preset',
): JobQuestionnaireQuestion {
  return { bonus, id, penalty, prompt, scoringGuide, source, weight }
}

export function addQuestionToCard(
  card: JobQuestionnaireCard,
  prompt: string,
  source: QuestionnaireSource = 'manual',
): JobQuestionnaireCard {
  const id = `${card.id}-${source}-${card.questions.length + 1}`
  return {
    ...card,
    questions: [
      ...card.questions,
      question(id, prompt, 5, -3, 6, '人工补充题：回答清楚且能举证加分；回避、空泛或逻辑冲突减分。', source),
    ],
  }
}

export function removeQuestionFromCard(card: JobQuestionnaireCard, questionId: string): JobQuestionnaireCard {
  return {
    ...card,
    questions: card.questions.filter((item) => item.id !== questionId),
  }
}

export function toggleQuestionnaireFavorite(card: JobQuestionnaireCard): JobQuestionnaireCard {
  return {
    ...card,
    isFavorite: !card.isFavorite,
  }
}

export function createQuestionnaireCard(title: string, roleType: JobQuestionnaireCard['roleType']): JobQuestionnaireCard {
  const id = `custom-${title.trim().replace(/\s+/g, '-').toLowerCase() || 'job'}`
  return {
    description: '自定义岗位问卷，可继续手工补题或由AI根据JD补充。',
    id,
    isFavorite: false,
    questions: [],
    questionModules: [moduleBlock(`${id}-module`, '自定义精准题库', '按该岗位JD继续补充专业问题', [])],
    roleType,
    signals: [
      signal(`${id}-black`, '不符合岗位核心要求', '黑色关键词由HR或AI根据JD继续补充。', 'black'),
      signal(`${id}-green`, '优先匹配岗位长板', '绿色特征由HR或AI根据JD继续补充。', 'green'),
    ],
    tags: ['自定义岗位'],
    title,
  }
}

export function questionnaireSignalsByTone(card: JobQuestionnaireCard, tone: QuestionnaireSignalTone) {
  return card.signals.filter((item) => item.tone === tone)
}

export function questionnaireModuleQuestionCount(card: JobQuestionnaireCard, moduleId: string) {
  const moduleItem = card.questionModules.find((item) => item.id === moduleId)
  if (!moduleItem) return 0
  return moduleItem.questionIds.filter((questionId) => card.questions.some((question) => question.id === questionId)).length
}

export function generateQuestionsFromJd(jd: string, card: JobQuestionnaireCard): JobQuestionnaireQuestion[] {
  const basePrompts: string[] = []

  if (/业绩|销售|客户|成交|回款/.test(jd)) {
    basePrompts.push('请用一个真实项目说明你的业绩来源、客户类型、成交链路和回款结果。')
  }
  if (/管理|团队|部门|负责人|副总|总助|经营/.test(jd)) {
    basePrompts.push('请说明你如何拆解经营目标、管理团队、复盘结果并向上汇报。')
  }
  if (/内容|自媒体|短视频|直播|账号|脚本/.test(jd)) {
    basePrompts.push('请复盘一个内容账号或短视频项目，从选题、脚本、制作到数据复盘。')
  }
  if (/财务|预算|税务|成本|内控|报表/.test(jd)) {
    basePrompts.push('请说明你处理预算、税务、成本或报表异常的一次真实经历。')
  }
  if (/AI|系统|开发|代码|架构|硬件|产品/.test(jd)) {
    basePrompts.push('请讲一个你亲自负责的系统、AI产品或硬件项目，说明架构、难点和结果。')
  }

  const prompts = basePrompts.length ? basePrompts : ['请结合该JD说明你最匹配岗位的三项能力、一个证明案例和一个短板补救方案。']

  return prompts.map((promptText, index) =>
    question(`${card.id}-jd-${index + 1}`, promptText, 6, -4, 8, 'AI根据JD反向生成：案例真实、指标清楚、能证明JD关键能力加分。', 'jd'),
  )
}

export function calculateQuestionnaireScore(questions: JobQuestionnaireQuestion[], scores: Record<string, number>) {
  return questions.reduce((total, item) => {
    const raw = scores[item.id] ?? 0
    if (raw > 0) return total + raw * item.bonus * item.weight
    if (raw < 0) return total + Math.abs(raw) * item.penalty * item.weight
    return total
  }, 0)
}
