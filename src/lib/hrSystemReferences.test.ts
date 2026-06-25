import { describe, expect, it } from 'vitest'
import {
  hrReferenceCoverageSummary,
  hrReferenceIntegrationPrinciples,
  hrReferencesForModule,
  hrSystemReferences,
} from './hrSystemReferences'

describe('international HR system references', () => {
  it('keeps all requested reference sources in the built-in library', () => {
    const names = hrSystemReferences.map((reference) => reference.name)

    expect(hrSystemReferences).toHaveLength(8)
    expect(names).toEqual(
      expect.arrayContaining([
        'O*NET',
        'SHRM',
        'Oracle HCM',
        'SAP SuccessFactors',
        'Workday',
        'McKinsey',
        'IBM Planning Analytics',
        'ISO 30414',
      ]),
    )
  })

  it('maps the references to the core Black Guard AI HR modules', () => {
    expect(hrReferencesForModule('岗位发布').map((reference) => reference.name)).toEqual(
      expect.arrayContaining(['O*NET', 'SHRM', 'IBM Planning Analytics']),
    )
    expect(hrReferencesForModule('成果目标').map((reference) => reference.name)).toEqual(
      expect.arrayContaining(['O*NET', 'SHRM', 'SAP SuccessFactors', 'McKinsey']),
    )
    expect(hrReferencesForModule('人才库').map((reference) => reference.name)).toEqual(
      expect.arrayContaining(['Workday', 'ISO 30414']),
    )
    expect(hrReferencesForModule('平台底座').map((reference) => reference.name)).toEqual(
      expect.arrayContaining(['Oracle HCM', 'SAP SuccessFactors', 'Workday', 'ISO 30414']),
    )
  })

  it('summarizes coverage for UI cards and dashboards', () => {
    const summary = hrReferenceCoverageSummary()

    expect(summary.sourceCount).toBe(8)
    expect(summary.categories).toEqual(
      expect.arrayContaining(['岗位任务与能力库', '大型HCM主数据', '人力资本报告']),
    )
    expect(summary.moduleCoverage.find((item) => item.moduleName === '数据看板')?.count).toBeGreaterThanOrEqual(4)
  })

  it('keeps compliance boundaries explicit instead of copying third-party systems', () => {
    expect(hrReferenceIntegrationPrinciples.join('')).toContain('不替代企业自身制度')
    expect(hrReferenceIntegrationPrinciples.join('')).toContain('授权')
    hrSystemReferences.forEach((reference) => {
      expect(reference.complianceNote.length).toBeGreaterThan(10)
      expect(reference.workflowIdeas.length).toBeGreaterThanOrEqual(3)
      expect(reference.dataStructureHints.length).toBeGreaterThanOrEqual(5)
    })
  })
})
