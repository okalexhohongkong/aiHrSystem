import { describe, expect, it } from 'vitest'
import {
  findRiskCorrections,
  oralRequirementRewritePrinciples,
  riskCorrectionRules,
  riskSeverityLabel,
} from './riskCorrection'

describe('risk correction rules', () => {
  it('flags high-risk recruiting language and offers safer alternatives', () => {
    const risks = findRiskCorrections('预算有限时优先招本地人，也不要用塔罗牌、星座和生辰八字预测稳定性和性格')

    expect(risks.map((risk) => risk.id)).toEqual(['local-origin', 'bazi-prediction'])
    expect(risks.every((risk) => risk.severity === 'red')).toBe(true)
    expect(risks[0].saferAlternative).toContain('预算有限')
    expect(risks[0].saferAlternative).toContain('通勤成本')
    expect(risks[0].saferAlternative).toContain('安置成本')
    expect(risks[1].matchedPhrases).toContain('生辰八字')
    expect(risks[1].matchedPhrases).toContain('塔罗牌')
    expect(risks[1].saferAlternative).toContain('候选人相信且明确愿意')
  })

  it('keeps rules for platform compliance and secret handling', () => {
    expect(riskCorrectionRules.map((rule) => rule.id)).toContain('anti-detection')
    expect(riskCorrectionRules.map((rule) => rule.id)).toContain('plain-secret')
  })

  it('detects practical oral variants rather than exact phrases only', () => {
    const risks = findRiskCorrections('希望系统仿人操作，不会被封号；后台看到所有人的用户名和密码。')

    expect(risks.map((risk) => risk.id)).toEqual(['anti-detection', 'plain-secret'])
    expect(risks[1].saferAlternative).toContain('最高权限')
    expect(risks[1].saferAlternative).toContain('账号恢复')
    expect(risks[1].saferAlternative).toContain('不可查看明文密码')
  })

  it('rewrites background checks as candidate provided materials and signed authorization', () => {
    const risks = findRiskCorrections('直接调查犯罪记录、征信、学历和健康，或者欢迎我们去查询。')

    expect(risks.map((risk) => risk.id)).toContain('background-without-consent')
    expect(risks[0].saferAlternative).toContain('主动提供')
    expect(risks[0].saferAlternative).toContain('健康证')
    expect(risks[0].saferAlternative).toContain('第三方查询授权')
  })

  it('flags sensitive family, belief, and speculative identity labels', () => {
    const risks = findRiskCorrections('候选人是否已婚，是否有小孩，宗教信仰，还有有没有可能是间谍。')

    expect(risks.map((risk) => risk.id)).toEqual(['marriage-family', 'spy-label'])
    expect(risks[1].saferAlternative).toContain('利益冲突')
  })

  it('labels severity levels for UI display', () => {
    expect(riskSeverityLabel('red')).toBe('高风险')
    expect(riskSeverityLabel('orange')).toBe('中风险')
    expect(riskSeverityLabel('yellow')).toBe('需注意')
  })

  it('documents oral requirement rewrite principles for meeting notes', () => {
    expect(oralRequirementRewritePrinciples.map((principle) => principle.id)).toEqual([
      'draft-first',
      'job-related-rewrite',
      'voluntary-cultural-note',
      'human-review',
    ])
    expect(oralRequirementRewritePrinciples[2].description).toContain('候选人相信且明确愿意')
    expect(oralRequirementRewritePrinciples[2].description).toContain('不得进入评分')
  })
})
