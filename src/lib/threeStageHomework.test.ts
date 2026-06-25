import { describe, expect, it } from 'vitest'
import {
  buildCaseStudyArchive,
  calculateHomeworkScore,
  defaultThreeStageHomeworkTasks,
  homeworkRoundLabels,
  summarizeHomeworkTracking,
} from './threeStageHomework'

describe('three-stage homework workflow', () => {
  it('keeps homework rounds for first, second and final interviews', () => {
    expect(homeworkRoundLabels).toEqual({
      final: '终试',
      first: '初试',
      second: '复试',
    })
    expect(defaultThreeStageHomeworkTasks.map((task) => task.round)).toEqual(['first', 'second', 'final'])
  })

  it('calculates a weighted score for each homework answer', () => {
    const task = defaultThreeStageHomeworkTasks[0]

    expect(calculateHomeworkScore(task)).toBe(84)
  })

  it('summarizes email tracking, phone tracking, answer and archive status', () => {
    const summary = summarizeHomeworkTracking(defaultThreeStageHomeworkTasks)

    expect(summary.total).toBe(3)
    expect(summary.emailPending).toBe(1)
    expect(summary.phonePending).toBe(1)
    expect(summary.submittedAnswers).toBe(2)
    expect(summary.archived).toBe(1)
  })

  it('archives excellent authorized work as anonymized case studies', () => {
    const cases = buildCaseStudyArchive(defaultThreeStageHomeworkTasks)

    expect(cases).toHaveLength(1)
    expect(cases[0]).toMatchObject({
      anonymizedCandidate: '候选人001',
      originalRound: '终试',
      score: 92,
      title: 'AI产品0-1落地方案',
    })
    expect(JSON.stringify(cases)).not.toContain('李晨')
  })
})
