import { describe, expect, it } from 'vitest'
import { buildSearchKeywordSuggestions, matchesSearchQuery, normalizeSearchQuery, splitSearchTerms } from './search'

describe('global search helper', () => {
  it('normalizes whitespace and punctuation', () => {
    expect(normalizeSearchQuery('  销售经理， 大客户 / 云启科技  ')).toBe('销售经理 大客户 云启科技')
  })

  it('splits query terms for keyword fallback matching', () => {
    expect(splitSearchTerms('AI 产品 经理')).toEqual(['ai', '产品', '经理'])
  })

  it('matches exact query hits with higher score', () => {
    const result = matchesSearchQuery('云启科技', '候选人在云启科技大客户销售部做过销售经理', ['大客户销售部', '销售经理'])

    expect(result.matched).toBe(true)
    expect(result.exact).toBe(true)
    expect(result.score).toBeGreaterThan(100)
    expect(result.matchedTerms).toContain('云启科技')
  })

  it('falls back to keyword matching when text does not contain the full query', () => {
    const result = matchesSearchQuery('大客户 销售 经理', '候选人做过B端销售', ['大客户销售部', '销售经理'])

    expect(result.matched).toBe(true)
    expect(result.exact).toBe(false)
    expect(result.matchedTerms).toEqual(expect.arrayContaining(['大客户', '销售', '经理']))
  })

  it('suggests keyword fallback when nothing matches directly', () => {
    const suggestions = buildSearchKeywordSuggestions(['销售', '销售', 'AI产品', '财务', '技术开发'], '市场', 4)

    expect(suggestions[0]).toBe('销售')
    expect(suggestions).toEqual(expect.arrayContaining(['销售', '财务', 'ai产品']))
  })
})
