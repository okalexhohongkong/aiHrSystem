import { describe, expect, it } from 'vitest'
import {
  deliveryStageCountdownLabel,
  deliveryPlanSummary,
  deliveryStageRange,
  deliveryStages,
  deliveryStatusLabel,
} from './deliveryPlan'

describe('delivery plan', () => {
  it('keeps the demo package as the current visible stage', () => {
    const summary = deliveryPlanSummary(deliveryStages)

    expect(summary.currentTitle).toBe('单机数据保存')
    expect(summary.nextTitle).toBe('招聘主流程可用')
    expect(summary.totalSlots).toBe(5)
    expect(summary.overallProgress).toBe(28)
    expect(summary.remainingHours).toBeGreaterThan(0)
  })

  it('formats gantt day ranges for single-day and multi-day stages', () => {
    expect(deliveryStageRange(deliveryStages[0])).toBe('D0')
    expect(deliveryStageRange(deliveryStages[1])).toBe('D1')
  })

  it('labels each stage status for the visual progress board', () => {
    expect(deliveryStatusLabel('doing')).toBe('进行中')
    expect(deliveryStatusLabel('next')).toBe('下一步')
    expect(deliveryStatusLabel('planned')).toBe('计划中')
    expect(deliveryStatusLabel('done')).toBe('已完成')
  })

  it('shows an hour-based countdown for each unfinished stage', () => {
    expect(deliveryStageCountdownLabel(deliveryStages[0])).toBe('已完成')
    expect(deliveryStageCountdownLabel(deliveryStages[1])).toBe('预计还需 14 小时')
  })
})
