import { describe, expect, it } from 'vitest'
import { initialCandidates, type Candidate } from '../data'
import {
  assignTalentLibraries,
  buildTalentLibraryBoard,
  talentLibraryGroups,
  talentLibraryLabels,
  type TalentArchiveContext,
} from './talentLibrary'

describe('talent library routing', () => {
  it('keeps all required resume library groups', () => {
    expect(talentLibraryGroups.map((group) => group.label)).toEqual(
      expect.arrayContaining([
        '高级人才库',
        '猎头人才库',
        '合格人才库',
        '储备人才库',
        '初试面试库',
        '复试面试库',
        '终试面试库',
        '实习人才库',
        '合伙人人才库',
        '高级经营者人才库',
        '高级管理者人才库',
        '高级业务人员人才库',
        '高级技术人员人才库',
        '高匹配度人才库',
        '条件谈不拢猎头库',
      ]),
    )
  })

  it('routes strong but salary-mismatched candidates into the headhunter follow-up library', () => {
    const context: TalentArchiveContext = {
      archiveNote: '能力、条件都合适，但薪酬预算暂时谈不拢，转猎头维护。',
      interviewStage: 'final',
      salaryNegotiation: 'mismatch',
    }

    const result = assignTalentLibraries(initialCandidates[1], context)

    expect(result.groupIds).toEqual(expect.arrayContaining(['headhunter', 'salaryMismatchHeadhunter', 'highMatch']))
    expect(result.tags).toEqual(expect.arrayContaining(['薪酬谈不拢', '持续维护', '终试面试库']))
    expect(result.primaryGroupId).toBe('salaryMismatchHeadhunter')
  })

  it('adds senior specialist libraries from job type and title', () => {
    expect(assignTalentLibraries(initialCandidates[0], { interviewStage: 'second' }).groupIds).toContain('seniorBusiness')
    expect(assignTalentLibraries(initialCandidates[3], { archiveNote: '技术储备' }).groupIds).toContain('seniorTechnical')

    const executiveCandidate: Candidate = {
      ...initialCandidates[0],
      postName: '经营管理副总经理',
      postType: 'management',
      totalScore: 88,
      totalLevel: 'A',
    }

    expect(assignTalentLibraries(executiveCandidate, { interviewStage: 'final' }).groupIds).toEqual(
      expect.arrayContaining(['seniorExecutive', 'seniorManagement', 'finalInterview']),
    )
  })

  it('builds a board with counts for reserve, interview stages and specialty pools', () => {
    const board = buildTalentLibraryBoard(initialCandidates, {
      1: { interviewStage: 'second' },
      2: { interviewStage: 'final', salaryNegotiation: 'mismatch' },
      3: { interviewStage: 'first' },
      4: { archiveNote: '暂时用不上但有技术储备价值' },
    })

    expect(board.summary.totalCandidates).toBe(initialCandidates.length)
    expect(board.groupsById.reserve.candidates.map((item) => item.name)).toContain('赵磊')
    expect(board.groupsById.secondInterview.candidates.map((item) => item.name)).toContain('李晨')
    expect(board.groupsById.salaryMismatchHeadhunter.candidates.map((item) => item.name)).toContain('周敏')
    expect(board.groupsById.highMatch.candidates.length).toBeGreaterThan(0)
    expect(talentLibraryLabels.salaryMismatchHeadhunter).toBe('条件谈不拢猎头库')
  })
})
