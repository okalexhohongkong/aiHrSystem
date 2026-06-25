import { describe, expect, it } from 'vitest'
import { initialCandidates } from '../data'
import { defaultDepartmentBenchmarkBrief } from './jobPublishing'
import { buildSearchResultKeywords, searchGlobalEntries } from './globalSearch'
import { talentLibraryGroups } from './talentLibrary'

const entries = [
  ...initialCandidates.map((candidate) => ({
    candidateId: candidate.id,
    detail: [
      candidate.postName,
      candidate.majorName,
      candidate.workType,
      candidate.currentLocation,
      candidate.agentSummary,
      ...candidate.skillTags,
      ...candidate.customFlags,
    ].join(' '),
    id: `candidate-${candidate.id}`,
    kind: 'candidate',
    keywords: [
      candidate.postName,
      candidate.majorName,
      candidate.workType,
      candidate.currentLocation,
      candidate.status,
      ...candidate.skillTags,
      ...candidate.customFlags,
    ],
    section: '候选看板',
    title: candidate.name,
  })),
  ...talentLibraryGroups.map((group) => ({
    detail: group.description,
    id: `talent-${group.id}`,
    kind: 'talent-library',
    keywords: [group.label, group.description],
    section: '简历库',
    title: group.label,
  })),
  ...defaultDepartmentBenchmarkBrief.targetCompanies.map((company) => ({
    detail: `${company.companyName} / ${company.targetDepartments.join('、')} / ${company.targetRoles.join('、')}`,
    id: `benchmark-${company.companyName}`,
    kind: 'benchmark',
    keywords: [
      company.companyName,
      ...company.targetDepartments,
      ...company.targetRoles,
      ...company.desiredAchievements,
    ],
    section: '岗位发布',
    title: company.companyName,
  })),
]

describe('global search entries', () => {
  it('finds candidates by name, role and skill keywords', () => {
    const hits = searchGlobalEntries('李晨 业务经理', entries)

    expect(hits[0]?.title).toBe('李晨')
    expect(hits[0]?.section).toBe('候选看板')
    expect(hits[0]?.matchedTerms).toEqual(expect.arrayContaining(['李晨', '业务经理']))
  })

  it('finds talent library and benchmark entries by keyword fallback', () => {
    const hits = searchGlobalEntries('条件谈不拢', entries)

    expect(hits.map((hit) => hit.title)).toEqual(expect.arrayContaining(['条件谈不拢猎头库']))
    expect(hits.map((hit) => hit.section)).toContain('简历库')
  })

  it('provides keyword suggestions when query is empty or unrelated', () => {
    const emptySuggestions = buildSearchResultKeywords(entries, '')
    const fallbackSuggestions = buildSearchResultKeywords(entries, '不存在的关键词', 4)

    expect(emptySuggestions.length).toBeGreaterThan(0)
    expect(fallbackSuggestions.length).toBe(4)
  })
})
