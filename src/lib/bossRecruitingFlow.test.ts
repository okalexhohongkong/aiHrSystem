import { describe, expect, it } from 'vitest'
import {
  buildBossRecruitingPipeline,
  nextBossPipelineActions,
  summarizeBossPipeline,
  type BossRecruitingCandidateInput,
} from './bossRecruitingFlow'

const baseCandidate = {
  greeting: {
    queuedAt: '2026-06-24T09:00:00+08:00',
    scriptMode: 'presetPlusAiFlexible',
  },
  resumeCollection: {
    methods: ['platformAttachment'],
  },
  salaryBudgetK: {
    max: 35,
    min: 25,
  },
  targetRole: '销售总监',
} satisfies Partial<BossRecruitingCandidateInput>

describe('BOSS recruiting compliance pipeline', () => {
  it('prioritizes high score candidates before lower score conversations', () => {
    const pipeline = buildBossRecruitingPipeline({
      candidates: [
        {
          ...baseCandidate,
          id: 'steady',
          name: '稳妥候选人',
          scoreSignals: {
            communication: 75,
            evidence: 70,
            experience: 78,
            intent: 74,
            resumeMatch: 76,
            scarcity: 65,
          },
          source: 'bossSearch',
        },
        {
          ...baseCandidate,
          id: 'star',
          name: '高分候选人',
          scoreSignals: {
            communication: 91,
            evidence: 94,
            experience: 96,
            intent: 90,
            resumeMatch: 97,
            scarcity: 88,
          },
          source: 'bossApplicant',
        },
      ],
      now: '2026-06-24T09:20:00+08:00',
    })

    expect(pipeline.candidates[0].candidateId).toBe('star')
    expect(pipeline.candidates[0].grade).toBe('值得争取签约')
    expect(pipeline.candidates[0].invitationDraft?.manualStatus).toBe('pendingHumanConfirmation')
    expect(pipeline.compliance.outboundDelivery).toBe('draftOnly')

    const actions = nextBossPipelineActions(pipeline)
    expect(actions[0]).toMatchObject({
      candidateId: 'star',
      priority: 'urgent',
      type: 'reviewInvitationDraft',
    })
  })

  it('archives high value salary-mismatched candidates into headhunter or reserve pools', () => {
    const pipeline = buildBossRecruitingPipeline({
      candidates: [
        {
          ...baseCandidate,
          id: 'headhunter-fit',
          name: '高薪专家',
          salaryExpectationK: {
            max: 55,
            min: 48,
          },
          scoreSignals: {
            communication: 88,
            evidence: 95,
            experience: 96,
            intent: 82,
            resumeMatch: 94,
            scarcity: 92,
          },
          source: 'bossSearch',
        },
        {
          ...baseCandidate,
          id: 'reserve-fit',
          name: '高潜储备',
          salaryExpectationK: {
            max: 44,
            min: 39,
          },
          scoreSignals: {
            communication: 82,
            evidence: 84,
            experience: 86,
            intent: 78,
            resumeMatch: 87,
            scarcity: 74,
          },
          source: 'manualImport',
        },
      ],
      now: '2026-06-24T10:00:00+08:00',
    })

    expect(pipeline.candidates.find((candidate) => candidate.candidateId === 'headhunter-fit')).toMatchObject({
      archiveCategory: '猎头协同库',
      grade: '猎头级别',
      salaryAlignment: 'aboveBudget',
    })
    expect(pipeline.candidates.find((candidate) => candidate.candidateId === 'reserve-fit')).toMatchObject({
      archiveCategory: '高价值储备库',
      grade: '薪酬谈不拢但高价值',
      salaryAlignment: 'aboveBudget',
    })
  })

  it('keeps interview invitation drafts pending without human confirmation and marks timed out AI drafts for review', () => {
    const pipeline = buildBossRecruitingPipeline({
      candidates: [
        {
          ...baseCandidate,
          id: 'manual-ready',
          interview: {
            confirmedByHumanAt: '2026-06-24T09:45:00+08:00',
            confirmationDeadlineAt: '2026-06-24T10:30:00+08:00',
            proposedSlots: ['2026-06-25T15:00:00+08:00'],
          },
          name: '已确认候选人',
          scoreSignals: {
            communication: 90,
            evidence: 92,
            experience: 91,
            intent: 89,
            resumeMatch: 93,
            scarcity: 86,
          },
          source: 'bossApplicant',
        },
        {
          ...baseCandidate,
          id: 'timed-out',
          interview: {
            confirmationDeadlineAt: '2026-06-24T09:40:00+08:00',
            proposedSlots: ['2026-06-25T16:00:00+08:00'],
          },
          name: '超时候选人',
          scoreSignals: {
            communication: 88,
            evidence: 90,
            experience: 91,
            intent: 86,
            resumeMatch: 92,
            scarcity: 83,
          },
          source: 'bossSearch',
        },
      ],
      now: '2026-06-24T10:10:00+08:00',
    })

    expect(pipeline.candidates.find((candidate) => candidate.candidateId === 'manual-ready')?.invitationDraft).toMatchObject({
      deliveryStatus: 'readyForHumanSend',
      manualStatus: 'confirmed',
    })
    expect(pipeline.candidates.find((candidate) => candidate.candidateId === 'timed-out')?.invitationDraft).toMatchObject({
      deliveryStatus: 'blockedAwaitingHuman',
      manualStatus: 'timedOutAiDraftNeedsReview',
    })
    expect(summarizeBossPipeline(pipeline)).toMatchObject({
      humanConfirmedDrafts: 1,
      timedOutDraftsAwaitingReview: 1,
    })
  })

  it('imports hosted email resumes into collection records and candidate archive evidence', () => {
    const pipeline = buildBossRecruitingPipeline({
      candidates: [
        {
          ...baseCandidate,
          emailResumes: [
            {
              attachmentName: 'product-lead-resume.pdf',
              from: 'candidate@example.com',
              mailbox: 'jobs@example.cn',
              receivedAt: '2026-06-24T08:30:00+08:00',
              subject: '应聘产品负责人-简历',
            },
          ],
          id: 'email-import',
          name: '邮箱候选人',
          resumeCollection: {
            methods: ['emailHostedInbox'],
          },
          scoreSignals: {
            communication: 79,
            evidence: 82,
            experience: 85,
            intent: 77,
            resumeMatch: 83,
            scarcity: 70,
          },
          source: 'emailHostedInbox',
        },
      ],
      now: '2026-06-24T10:00:00+08:00',
    })

    const candidate = pipeline.candidates[0]

    expect(candidate.resumeCollection.emailReceipts).toHaveLength(1)
    expect(candidate.resumeCollection.status).toBe('received')
    expect(candidate.resumeCollection.emailReceipts[0]).toMatchObject({
      attachmentName: 'product-lead-resume.pdf',
      importedToArchive: true,
      mailbox: 'jobs@example.cn',
    })
    expect(candidate.archiveCategory).toBe('邀约优先库')
    expect(summarizeBossPipeline(pipeline).emailResumeImports).toBe(1)
  })
})
