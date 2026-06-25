import { describe, expect, it } from 'vitest'
import {
  buildRadarPolygonPoints,
  calculateFirstEvaluationWeightedAverage,
  createManualFirstEvaluationDimension,
  createFirstEvaluationRows,
  firstEvaluationDimensionIds,
  firstEvaluationLayoutPreference,
  moveFirstEvaluationDimension,
  postTypeDimensionOrders,
  type FirstEvaluationDimensionId,
} from './firstEvaluationModel'
import type { CandidateEvaluationInput } from './scoring'

const baseInput: CandidateEvaluationInput = {
  graduationYear: 2016,
  major: '市场营销',
  targetPostType: 'sales',
  majorMatchesPost: true,
  hasClearPerformance: true,
  workExperiences: [
    { company: 'A公司', role: '销售', startYear: 2016, endYear: 2020, direction: 'sales' },
    { company: 'B公司', role: '销售经理', startYear: 2020, endYear: 2026, direction: 'sales' },
  ],
}

describe('first evaluation dimension model', () => {
  it('keeps all nine dimensions in each post preset without duplication', () => {
    Object.values(postTypeDimensionOrders).forEach((order) => {
      expect(order).toHaveLength(9)
      expect(new Set(order).size).toBe(9)
      expect(order.toSorted()).toEqual([...firstEvaluationDimensionIds].toSorted())
    })
  })

  it('loads different priority orders for different post types', () => {
    expect(postTypeDimensionOrders.sales[0]).toBe('performanceProof')
    expect(postTypeDimensionOrders.finance[0]).toBe('stability')
    expect(postTypeDimensionOrders.tech[0]).toBe('majorPassion')
    expect(postTypeDimensionOrders.management[0]).toBe('management')
  })

  it('moves one dimension before another while preserving the nine-dimension set', () => {
    const moved = moveFirstEvaluationDimension(postTypeDimensionOrders.sales, 'commute', 'performanceProof')

    expect(moved[0]).toBe('commute')
    expect(moved).toHaveLength(9)
    expect(new Set(moved).size).toBe(9)
  })

  it('marks management dimension as excluded for non-management posts', () => {
    const rows = createFirstEvaluationRows(baseInput, postTypeDimensionOrders.sales)
    const management = rows.find((row) => row.id === 'management')

    expect(management?.includedInScore).toBe(false)
    expect(calculateFirstEvaluationWeightedAverage(rows)).toBeGreaterThan(7)
  })

  it('prioritizes and scores management dimension for management posts', () => {
    const rows = createFirstEvaluationRows(
      { ...baseInput, targetPostType: 'management' },
      postTypeDimensionOrders.management,
    )
    const first = rows[0]

    expect(first.id as FirstEvaluationDimensionId).toBe('management')
    expect(first.includedInScore).toBe(true)
    expect(first.importanceRank).toBe(1)
  })

  it('builds radar polygon points from the nine-dimension scores', () => {
    const rows = createFirstEvaluationRows(baseInput, postTypeDimensionOrders.sales)
    const polygon = buildRadarPolygonPoints(rows, 100, 100, 80)

    expect(polygon.points).toHaveLength(9)
    expect(polygon.points.every((point) => Number.isFinite(point.x) && Number.isFinite(point.y))).toBe(true)
    expect(polygon.pointString.split(' ')).toHaveLength(9)
  })

  it('creates manual dimensions for score rows without changing the canonical nine-dimension radar source', () => {
    const rows = createFirstEvaluationRows(baseInput, postTypeDimensionOrders.sales)
    const manual = createManualFirstEvaluationDimension('抗压能力', rows.length + 1, 8.6)
    const scoreRows = [...rows, manual]
    const radar = buildRadarPolygonPoints(rows, 100, 100, 80)

    expect(manual.id).toMatch(/^custom-/)
    expect(manual.label).toBe('抗压能力')
    expect(manual.isCustom).toBe(true)
    expect(manual.includedInScore).toBe(true)
    expect(manual.score).toBe(8.6)
    expect(scoreRows).toHaveLength(10)
    expect(radar.points).toHaveLength(9)
    expect(calculateFirstEvaluationWeightedAverage(scoreRows)).toBeGreaterThan(7)
  })

  it('adds structured notes, capture fields and remediation plans for key dimensions', () => {
    const rows = createFirstEvaluationRows(baseInput, postTypeDimensionOrders.sales)
    const household = rows.find((row) => row.id === 'household')
    const commute = rows.find((row) => row.id === 'commute')
    const passion = rows.find((row) => row.id === 'majorPassion')
    const performance = rows.find((row) => row.id === 'performanceProof')

    expect(household?.captureFields).toEqual(expect.arrayContaining(['婚姻状态', '祖籍', '户籍', '家庭人口', '子女情况']))
    expect(household?.complianceNote).toContain('不进入评分')
    expect(commute?.remediationPlan).toContain('是否会开车')
    expect(commute?.captureFields).toEqual(expect.arrayContaining(['地铁时长', '开车时长', '公交时长', '站点数量']))
    expect(passion?.detailNotes).toEqual(expect.arrayContaining(['个人激情', '职业激情', '产业激情']))
    expect(performance?.detailNotes.join('')).toContain('大B/中B/小B')
  })

  it('defaults the first evaluation UI to compact horizontal bars', () => {
    expect(firstEvaluationLayoutPreference.mode).toBe('horizontal-bars')
    expect(firstEvaluationLayoutPreference.density).toBe('compact')
    expect(firstEvaluationLayoutPreference.radarLegendColumns).toBe(3)
    expect(firstEvaluationLayoutPreference.visibleDetailBlocks).toEqual([
      'autoFillText',
      'captureFields',
      'detailNotes',
    ])
  })
})
