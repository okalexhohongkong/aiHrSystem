import { describe, expect, it } from 'vitest'
import { initialCandidates } from '../data'
import { createCandidateFromResumeDraft, defaultCandidateResumeImportDraft } from './resumeImport'

describe('resumeImport', () => {
  it('creates a saveable candidate from a manual resume draft', () => {
    const candidate = createCandidateFromResumeDraft(
      {
        ...defaultCandidateResumeImportDraft,
        name: '导入候选人A',
        phone: '13900002222',
        email: 'resume@example.com',
        postName: 'AI系统开发',
        postType: 'tech',
        skillTagsText: 'Python,AI工具,专利,0-1项目',
        resumeText: '负责AI招聘系统、数据看板和自动化流程，有软著和项目交付经验。',
      },
      initialCandidates,
    )

    expect(candidate.id).toBe(Math.max(...initialCandidates.map((item) => item.id)) + 1)
    expect(candidate.name).toBe('导入候选人A')
    expect(candidate.postType).toBe('tech')
    expect(candidate.status).toBe('待初试')
    expect(candidate.totalScore).toBeGreaterThan(0)
    expect(candidate.skillTags).toEqual(['Python', 'AI工具', '专利', '0-1项目'])
    expect(candidate.communication.sentResume).toBe(true)
    expect(candidate.operationLog?.[0].action).toBe('简历导入')
  })

  it('keeps restricted personal fields out of scoring fields', () => {
    const candidate = createCandidateFromResumeDraft(
      {
        ...defaultCandidateResumeImportDraft,
        name: '合规候选人',
      },
      [],
    )

    const restrictedSignals = candidate.dataFieldSignals.filter((field) => field.status === '受限不采集')

    expect(restrictedSignals.map((field) => field.label)).toEqual(
      expect.arrayContaining(['籍贯/祖籍', '身份证归属地', '婚育/子女情况', '宗教信仰', '政治身份']),
    )
    expect(candidate.customFlags).toContain('手动导入')
  })
})
