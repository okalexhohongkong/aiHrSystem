import { describe, expect, it } from 'vitest'
import { formatSectionProgressPercent, sectionProgressByTitle } from './sectionProgress'

describe('section progress display', () => {
  it('formats page progress as three digits and one decimal place', () => {
    expect(formatSectionProgressPercent(99.94)).toBe('099.9%')
    expect(formatSectionProgressPercent(8)).toBe('008.0%')
    expect(formatSectionProgressPercent(100.5)).toBe('100.0%')
  })

  it('marks completed or ahead-of-plan pages in green', () => {
    expect(sectionProgressByTitle('V1.2 融合蓝图')).toMatchObject({
      tone: 'ahead',
    })
  })

  it('falls back to a normal in-progress status for new pages', () => {
    expect(sectionProgressByTitle('新增模块')).toEqual({
      percent: 30,
      status: '模块开发中',
      tone: 'normal',
    })
  })
})
