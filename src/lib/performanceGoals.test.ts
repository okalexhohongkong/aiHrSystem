import { describe, expect, it } from 'vitest'
import {
  buildRoleGoalFramework,
  countGoalIndicatorTypes,
  createTrainingSystemTask,
  flattenGoalIndicators,
  goalFrameworkSummary,
  goalIndicatorTypeLabels,
  moduleWeight,
  performanceGoalModeLabels,
  totalGoalWeight,
} from './performanceGoals'

describe('performance goal framework', () => {
  it('builds a role framework with first-level modules, tasks and indicators', () => {
    const framework = buildRoleGoalFramework('AI产品经理', 'okr')
    const summary = goalFrameworkSummary(framework)

    expect(framework.roleName).toBe('AI产品经理')
    expect(framework.mode).toBe('okr')
    expect(performanceGoalModeLabels[framework.mode]).toBe('OKR模块')
    expect(summary.moduleCount).toBe(5)
    expect(summary.taskCount).toBeGreaterThanOrEqual(5)
    expect(summary.indicatorCount).toBeGreaterThanOrEqual(15)
    expect(summary.totalWeight).toBe(totalGoalWeight(framework))
  })

  it('counts quantitative, cyclical, systematic and result indicators', () => {
    const framework = buildRoleGoalFramework()
    const counts = countGoalIndicatorTypes(framework)

    expect(goalIndicatorTypeLabels.quantitative).toBe('量化')
    expect(counts.quantitative).toBeGreaterThan(0)
    expect(counts.cyclical).toBeGreaterThan(0)
    expect(counts.systematic).toBeGreaterThan(0)
    expect(counts.result).toBeGreaterThan(0)
  })

  it('keeps training as a systemized closed loop when it is not just countable', () => {
    const task = createTrainingSystemTask()

    expect(task.indicators.map((indicator) => indicator.id)).toEqual([
      'training-topic',
      'training-outline',
      'training-exam',
      'training-delivery',
      'training-share',
    ])
    expect(task.indicators.every((indicator) => ['systematic', 'cyclical'].includes(indicator.type))).toBe(true)
  })

  it('keeps module weights inspectable for dashboards', () => {
    const framework = buildRoleGoalFramework()
    const firstModule = framework.modules[0]
    const indicators = flattenGoalIndicators(framework)

    expect(moduleWeight(firstModule)).toBeGreaterThan(0)
    expect(indicators[0]).toMatchObject({
      moduleTitle: firstModule.title,
      taskTitle: firstModule.tasks[0].title,
    })
  })
})
