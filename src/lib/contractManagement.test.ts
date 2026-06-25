import { describe, expect, it } from 'vitest'
import {
  contractDashboardSummary,
  contractTemplateCatalog,
  contractTypeLabels,
  contractWorkflowSteps,
  createContractDraft,
  memoReviewSummary,
  templateByType,
} from './contractManagement'

describe('contract management', () => {
  it('keeps four fixed lawyer template contract types', () => {
    expect(contractTemplateCatalog.map((template) => template.type)).toEqual([
      'service',
      'employment',
      'division',
      'partner',
    ])
    expect(contractTypeLabels.partner).toBe('合伙人合约')
    expect(contractWorkflowSteps).toContain('额外约定进入备忘录')
  })

  it('detects missing variables before legal review', () => {
    const draft = createContractDraft('employment', {
      candidateName: '李某',
      companyEntity: '黑卫士科技有限公司',
    })

    expect(draft.status).toBe('missingVariables')
    expect(draft.missingVariables.map((item) => item.id)).toContain('postName')
    expect(draft.template.fixedTemplateNote).toContain('律师模板')
  })

  it('marks completed partner draft as ready for legal review', () => {
    const template = templateByType('partner')
    const draft = createContractDraft('partner', {
      baseCompensation: '基础合作费用10000元/月',
      candidateName: '王某',
      companyEntity: '黑卫士科技有限公司',
      exitRule: '未达门槛自动降级',
      partnerScope: '跨境电商渠道拓展',
      performanceTarget: '季度回款300万',
      postName: '渠道合伙人',
      profitShareRatio: '毛利15%',
      settlementCycle: '季度结算',
      startDate: '2026-07-01',
    })

    expect(template.keyIndicators).toContain('分账比例')
    expect(draft.status).toBe('readyForLegalReview')
    expect(draft.missingVariables).toHaveLength(0)
  })

  it('separates allowed memo scopes from blocked legal changes', () => {
    const template = templateByType('division')
    const reviewed = memoReviewSummary(template, [
      { content: '季度红利先按试算模型复盘。', id: 'm-1', scopeId: 'bonus-model-note' },
      { content: '保证每月固定收益。', id: 'm-2', scopeId: 'fixed-return' },
    ])

    expect(reviewed[0]).toMatchObject({ allowed: true, scopeTitle: '红利测算备忘' })
    expect(reviewed[1]).toMatchObject({ allowed: false, scopeTitle: '固定收益承诺' })
  })

  it('summarizes contract dashboard metadata', () => {
    const summary = contractDashboardSummary()

    expect(summary.templateCount).toBe(4)
    expect(summary.totalMemoScopes).toBeGreaterThanOrEqual(12)
    expect(summary.totalRequiredVariables).toBeGreaterThan(20)
  })
})
