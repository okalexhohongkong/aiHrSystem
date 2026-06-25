import { describe, expect, it } from 'vitest'
import {
  addQuestionToCard,
  calculateQuestionnaireScore,
  createQuestionnaireCard,
  defaultJobQuestionnaireCards,
  generateQuestionsFromJd,
  questionnaireModuleQuestionCount,
  questionnaireSignalsByTone,
  removeQuestionFromCard,
  toggleQuestionnaireFavorite,
} from './jobQuestionnaire'

describe('job questionnaire center', () => {
  it('provides preset cards beyond sales', () => {
    const titles = defaultJobQuestionnaireCards.map((card) => card.title)

    expect(titles).toEqual(
      expect.arrayContaining(['销售岗问卷', '财务岗问卷', '策划岗问卷', '营销岗问卷', '自媒体岗问卷', '技术岗问卷', '管理岗问卷', '经营副职岗问卷']),
    )
  })

  it('adds black caution keywords green preferred keywords and professional question modules to each card', () => {
    const sales = defaultJobQuestionnaireCards.find((card) => card.id === 'sales')!

    expect(questionnaireSignalsByTone(sales, 'black').map((item) => item.label)).toContain('业绩口径混乱')
    expect(questionnaireSignalsByTone(sales, 'green').map((item) => item.label)).toContain('业绩可佐证')
    expect(questionnaireSignalsByTone(sales, 'green').map((item) => item.label)).toContain('内容获客能力')
    expect(sales.questionModules.map((item) => item.title)).toEqual(
      expect.arrayContaining(['业绩与客户分层', '成交全链路', '薪酬提成核验']),
    )
    expect(questionnaireModuleQuestionCount(sales, 'sales-achievement')).toBe(1)
  })

  it('adds, removes and favorites questionnaire cards or questions', () => {
    const custom = createQuestionnaireCard('国际贸易岗问卷', 'function')
    const withQuestion = addQuestionToCard(custom, '请说明一次跨境订单从询盘到回款的完整过程。')
    const favorited = toggleQuestionnaireFavorite(withQuestion)
    const removed = removeQuestionFromCard(favorited, withQuestion.questions[0].id)

    expect(withQuestion.questions).toHaveLength(1)
    expect(withQuestion.questions[0].source).toBe('manual')
    expect(custom.signals.map((item) => item.tone)).toEqual(['black', 'green'])
    expect(custom.questionModules[0].title).toBe('自定义精准题库')
    expect(favorited.isFavorite).toBe(true)
    expect(removed.questions).toHaveLength(0)
  })

  it('generates interview questions from a JD', () => {
    const sales = defaultJobQuestionnaireCards.find((card) => card.id === 'sales')
    const generated = generateQuestionsFromJd('岗位要求：负责大客户销售、成交、回款，管理销售团队。', sales!)

    expect(generated.length).toBeGreaterThanOrEqual(2)
    expect(generated.every((item) => item.source === 'jd')).toBe(true)
    expect(generated.map((item) => item.prompt).join('')).toContain('成交链路')
  })

  it('calculates bonus and penalty weighted questionnaire score', () => {
    const sales = defaultJobQuestionnaireCards.find((card) => card.id === 'sales')!
    const score = calculateQuestionnaireScore(sales.questions, {
      [sales.questions[0].id]: 1,
      [sales.questions[1].id]: -1,
    })

    expect(score).toBe(sales.questions[0].bonus * sales.questions[0].weight + sales.questions[1].penalty * sales.questions[1].weight)
  })
})
