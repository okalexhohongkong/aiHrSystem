import { describe, expect, it } from 'vitest'
import {
  allInvestigationsRequireConsent,
  assignInterviewers,
  buildInterviewRoundExecutionRows,
  buildInterviewWorkflow,
  calculateInterviewTotal,
  createCandidateInterviewArchive,
  getInterviewWorkflowTemplate,
  interviewRounds,
  interviewWorkflowTemplates,
  investigationItems,
  interviewArchiveRoundLabels,
  missingBackupContactFields,
  roundArchiveCompleteness,
  summarizeInterviewWorkflow,
  type BackupContactInfo,
  type InterviewRoundArchive,
} from './interviewOrchestration'

describe('configurable interview orchestration', () => {
  it('keeps the default first, second and third interview rounds for compatibility', () => {
    expect(interviewRounds.map((round) => round.name)).toEqual(['初试', '复试', '终试'])
  })

  it('provides one-time, two-round, three-round and four-round workflow templates', () => {
    expect(interviewWorkflowTemplates.map((template) => template.name)).toEqual(
      expect.arrayContaining(['一次性面试', '二次面试', '三次面试', '四次面试', '在线+三轮标准流程']),
    )

    expect(getInterviewWorkflowTemplate('four-round')?.stepIds).toEqual([
      'resume-evaluation',
      'online-invitation',
      'online-interview',
      'first',
      'second',
      'third',
      'fourth',
    ])
  })

  it('builds a selectable workflow with resume evaluation, online invitation and configurable rounds', () => {
    const workflow = buildInterviewWorkflow({
      decisionOwner: '用人单位决定',
      selectedStepIds: ['resume-evaluation', 'online-invitation', 'online-interview', 'first'],
      templateId: 'one-time',
    })

    expect(workflow.decisionOwner).toBe('用人单位决定')
    expect(workflow.steps.map((step) => step.name)).toEqual(['简历评估', '邀约在线面试', '在线面试', '一次性面试'])
    expect(workflow.interviewRoundCount).toBe(1)
  })

  it('uses online, first interview, second interview and final interview names in the standard workflow', () => {
    const workflow = buildInterviewWorkflow({
      decisionOwner: '用人单位决定',
      templateId: 'online-standard',
    })
    const names = workflow.steps.map((step) => step.name)

    expect(names).toEqual(['简历评估', '邀约在线面试', '在线面试', '初试', '复试', '终试'])
    expect(names).not.toContain('中试')
  })

  it('summarizes who can decide a flexible interview workflow', () => {
    const workflow = buildInterviewWorkflow({
      decisionOwner: '系统管理员决定',
      selectedStepIds: ['resume-evaluation', 'first', 'second', 'third', 'fourth'],
      templateId: 'four-round',
    })

    expect(summarizeInterviewWorkflow(workflow)).toContain('系统管理员决定')
    expect(summarizeInterviewWorkflow(workflow)).toContain('4个面试轮次')
  })

  it('calculates a total score across all interview rounds', () => {
    expect(calculateInterviewTotal(interviewRounds)).toBe(85)
  })

  it('builds long execution rows for every interview round with stable required fields', () => {
    const workflow = buildInterviewWorkflow({
      decisionOwner: '用人单位决定',
      templateId: 'online-standard',
    })
    const rows = buildInterviewRoundExecutionRows({
      designatedInterviewers: { second: '张总' },
      interviewerPool: ['张总', '陈HR', '王主管'],
      workflow,
    })

    expect(rows.map((row) => row.roundName)).toEqual(['初试', '复试', '终试'])
    expect(rows[0].screeningCategory).toContain('简历筛选分类')
    expect(rows[1].dispatchMode).toBe('指定面试官')
    expect(rows[1].interviewers).toEqual(['张总'])
    expect(rows[2].nextAction).toContain('签约')
    rows.forEach((row) => {
      expect(row.scheduledAt).toBeTruthy()
      expect(row.question).toBeTruthy()
      expect(row.location).toBeTruthy()
      expect(row.livePerformance).toBeTruthy()
      expect(row.questionQuality).toBeTruthy()
      expect(row.interviewScore).toBeGreaterThan(0)
      expect(row.assignmentScore).toBeGreaterThan(0)
    })
  })

  it('supports designated and random interviewer assignment modes', () => {
    expect(assignInterviewers(['张总', '陈HR', '王主管'], '指定面试官', '张总')).toEqual(['张总'])
    expect(assignInterviewers(['张总', '陈HR', '王主管'], '随机抽签')).toEqual(['张总', '陈HR'])
  })

  it('requires candidate consent for every investigation item', () => {
    expect(allInvestigationsRequireConsent(investigationItems)).toBe(true)
    expect(investigationItems.map((item) => item.legalChannel).join('')).toContain('授权')
  })

  it('keeps first, second and final interview archive labels', () => {
    expect(interviewArchiveRoundLabels).toEqual({
      first: '初试档案',
      final: '终试档案',
      second: '复试档案',
    })
  })

  it('requires backup contact, backup email and backup wechat with candidate consent', () => {
    const backupContact: BackupContactInfo = {
      authorized: true,
      backupEmail: 'backup@example.com',
      backupWechat: 'backup-wechat',
      secondContactName: '李女士',
      secondContactPhone: '13900000000',
      secondContactRelation: '家属',
    }

    expect(missingBackupContactFields(backupContact)).toEqual([])
    expect(missingBackupContactFields({ ...backupContact, authorized: false, backupWechat: '' })).toEqual(
      expect.arrayContaining(['候选人授权', '备用微信']),
    )
  })

  it('checks round archive completeness for questions, recordings, outlines, minutes, scores and scorer', () => {
    const archive: InterviewRoundArchive = {
      audioMinutes: '候选人能讲清项目经历和岗位动机。',
      audioOutline: ['岗位动机', '项目经验', '薪资期望'],
      audioRecordings: [{ durationSeconds: 1200, fileName: 'first.mp3', id: 'audio-1', storagePath: '/audio/first.mp3' }],
      interviewerScores: [{ evaluatorName: '陈HR', evaluatorRole: 'HR', score: 86, summary: '建议复试' }],
      questions: [{ answerSummary: '能讲清成交链路', id: 'q1', prompt: '请介绍最成功的项目。' }],
      round: 'first',
    }

    expect(roundArchiveCompleteness(archive)).toEqual({
      complete: true,
      missing: [],
    })
    expect(roundArchiveCompleteness({ ...archive, audioRecordings: [], interviewerScores: [] }).missing).toEqual(
      expect.arrayContaining(['对话录音', '评估评分和评分人']),
    )
  })

  it('creates a candidate interview archive with all three round archives and backup contacts', () => {
    const archive = createCandidateInterviewArchive({
      backupContact: {
        authorized: true,
        backupEmail: 'lichen.backup@example.com',
        backupWechat: 'lichen-bak',
        secondContactName: '李女士',
        secondContactPhone: '13900000000',
        secondContactRelation: '家属',
      },
      candidateId: 1,
      candidateName: '李晨',
      rounds: [],
    })

    expect(archive.rounds.map((round) => round.round)).toEqual(['first', 'second', 'final'])
    expect(archive.retentionItems).toEqual(
      expect.arrayContaining(['所有提问问题', '所有对话录音', '录音提炼纲要', '录音纪要', '评估分数', '评分人']),
    )
    expect(archive.backupContactWarnings).toEqual([])
  })
})
