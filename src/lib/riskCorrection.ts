export type RiskSeverity = 'red' | 'orange' | 'yellow'

export type RiskCorrectionRule = {
  id: string
  category: string
  riskyPhrase: string
  triggers: string[]
  reason: string
  saferAlternative: string
  severity: RiskSeverity
}

export type RiskCorrectionMatch = RiskCorrectionRule & {
  matchedPhrases: string[]
}

export type OralRequirementRewritePrinciple = {
  id: string
  title: string
  description: string
}

export const oralRequirementRewritePrinciples: OralRequirementRewritePrinciple[] = [
  {
    description: '会议口述先按草稿处理，系统标红可能有风险或不完整的表达，再由负责人确认正式需求。',
    id: 'draft-first',
    title: '口述先当草稿',
  },
  {
    description: '把地域、婚育、信仰、身体、推测性身份等表达，改写成岗位相关的通勤、能力、经验、业绩、授权核验和工作条件。',
    id: 'job-related-rewrite',
    title: '改成岗位相关标准',
  },
  {
    description: '塔罗牌、星座、八字等只在候选人相信且明确愿意时，作为自愿文化兴趣备注；不得进入评分、匹配、稳定性预测、性格预测、录用或淘汰。',
    id: 'voluntary-cultural-note',
    title: '自愿文化兴趣隔离',
  },
  {
    description: 'AI给出纠偏建议后，仍保留人工确认、法务/合规复核和最终版本留痕，避免把口误直接变成制度。',
    id: 'human-review',
    title: '人工确认留痕',
  },
]

export const riskCorrectionRules: RiskCorrectionRule[] = [
  {
    category: '招聘公平',
    id: 'local-origin',
    reason: '本地/外地、籍贯、出生地不能作为直接淘汰或录用条件；预算限制应转化为通勤、住宿、搬迁和到岗成本评估。',
    riskyPhrase: '不要本地人',
    triggers: ['不要本地人', '避免招聘本地人', '优先招本地人', '本地人优先', '本地出生', '本地长大', '哪里人', '祖籍', '身份证号码是哪里的'],
    saferAlternative: '当预算有限时，统一评估候选人的现居住地、通勤时间、通勤成本、是否需要租房/搬迁/安置成本、到岗稳定性和岗位适配度；不能用籍贯、出生地或本地身份直接筛选。',
    severity: 'red',
  },
  {
    category: '敏感个人信息',
    id: 'marriage-family',
    reason: '婚育、子女、宗教、政治身份等不应作为招聘筛选条件。',
    riskyPhrase: '是否已婚/是否有小孩/宗教信仰/政治身份',
    triggers: ['是否已婚', '是否有小孩', '是否单身', '是否离异', '婚育', '宗教信仰', '政治信仰', '党员', '团员'],
    saferAlternative: '仅确认岗位必需的到岗时间、出差安排、工作时间匹配和合法任职资格。',
    severity: 'red',
  },
  {
    category: '非科学预测',
    id: 'bazi-prediction',
    reason: '塔罗牌、星座、八字等个人文化兴趣不能用于岗位匹配、稳定性预测、性格预测或录用淘汰。',
    riskyPhrase: '用塔罗/星座/八字预测稳定性和性格',
    triggers: ['塔罗牌', '塔罗', '星座', '生辰八字', '五行八字', '预测稳定性', '预测性格', '预测发展', '匹配他的风格人格'],
    saferAlternative: '仅在候选人相信且明确愿意时，作为自愿文化兴趣备注隔离保存；岗位判断改用履历、业绩、能力题、结构化面试和作业。',
    severity: 'red',
  },
  {
    category: '授权调查',
    id: 'background-without-consent',
    reason: '学历、司法、征信、健康、证明人等核验必须由候选人主动提供材料，或签署明确授权后通过合法渠道查询。',
    riskyPhrase: '直接调查犯罪记录/征信/健康/证明人',
    triggers: ['直接调查犯罪记录', '犯罪记录', '征信', '健康', '健康证', '身体体质', '证明人', '学信网', '裁判文书', '司法系统', '公安'],
    saferAlternative: '由候选人主动提供学历证明、健康证、业绩佐证、证明人等材料；如需第三方核验，先签署第三方查询授权或背调同意文件，限定查询范围、渠道、用途和保存期限，并记录证据来源与复核结论。',
    severity: 'red',
  },
  {
    category: '候选人安全',
    id: 'spy-label',
    reason: '不能基于猜测给候选人贴负面身份标签；应改为岗位相关的利益冲突、保密和竞业核验。',
    riskyPhrase: '有没有可能是间谍',
    triggers: ['间谍', '商业间谍', '内鬼', '派系'],
    saferAlternative: '核验是否存在利益冲突、竞业限制、保密义务和敏感岗位授权调查记录。',
    severity: 'red',
  },
  {
    category: '岗位相关性',
    id: 'drink-health',
    reason: '饮酒能力、非岗位必需身体特征不应作为普通岗位筛选条件。',
    riskyPhrase: '是否能喝酒',
    triggers: ['是否能喝酒', '能不能喝酒', '酒量', '身体体质'],
    saferAlternative: '只确认岗位真实必需的出差、应酬频率、工作强度和依法合规的任职条件。',
    severity: 'orange',
  },
  {
    category: '平台合规',
    id: 'anti-detection',
    reason: '规避第三方平台风控、伪装自动化或绕过限制可能违反平台规则。',
    riskyPhrase: '反侦察/避免被平台识别/绕过风控',
    triggers: ['反侦察', '避免被平台识别', '绕过风控', '不会被封号', '平台会封杀', '仿人', '外挂'],
    saferAlternative: '使用官方授权、手动导入、人工确认、合理频率和平台允许的接口能力。',
    severity: 'red',
  },
  {
    category: '账号与密钥安全',
    id: 'plain-secret',
    reason: '系统可以有最高权限用于账号恢复、权限调整和审计，但不能查看或展示用户明文密码、验证码、第三方密钥。',
    riskyPhrase: '后台看到所有人的用户名和密码/最高权限账号恢复',
    triggers: ['后台看到所有人的用户名和密码', '保存第三方密码', '账号和密码', '明文密码', 'Boss直聘的账号和密码', '最高权限', '验证码不能找回', '帮他修复'],
    saferAlternative: '系统可设计最高权限的账号恢复、权限重置和联系方式修复流程；用户提供相应佐证记录后，由管理员重置密码或更换验证方式，全程审批留痕。管理员不可查看明文密码、短信验证码、邮箱验证码或第三方平台密钥。',
    severity: 'red',
  },
]

export function findRiskCorrections(text: string) {
  const normalized = text.trim()
  if (!normalized) return []

  return riskCorrectionRules.flatMap((rule): RiskCorrectionMatch[] => {
    const matchedPhrases = rule.triggers.filter((phrase) => normalized.includes(phrase))
    return matchedPhrases.length ? [{ ...rule, matchedPhrases }] : []
  })
}

export function riskSeverityLabel(severity: RiskSeverity) {
  const labels: Record<RiskSeverity, string> = {
    orange: '中风险',
    red: '高风险',
    yellow: '需注意',
  }

  return labels[severity]
}
