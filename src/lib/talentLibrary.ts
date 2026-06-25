import type { Candidate } from '../data'

export type TalentLibraryGroupId =
  | 'senior'
  | 'headhunter'
  | 'qualified'
  | 'reserve'
  | 'firstInterview'
  | 'secondInterview'
  | 'finalInterview'
  | 'intern'
  | 'partner'
  | 'seniorExecutive'
  | 'seniorManagement'
  | 'seniorBusiness'
  | 'seniorTechnical'
  | 'highMatch'
  | 'salaryMismatchHeadhunter'

export type TalentArchiveContext = {
  archiveNote?: string
  interviewStage?: 'none' | 'first' | 'second' | 'final'
  salaryNegotiation?: 'matched' | 'mismatch' | 'unknown'
}

export type TalentLibraryGroup = {
  description: string
  id: TalentLibraryGroupId
  label: string
  tone: 'blue' | 'green' | 'yellow' | 'orange' | 'black'
}

export type TalentLibraryAssignment = {
  candidateId: number
  groupIds: TalentLibraryGroupId[]
  primaryGroupId: TalentLibraryGroupId
  reason: string
  tags: string[]
}

export type TalentLibraryCandidate = Pick<
  Candidate,
  'id' | 'name' | 'postName' | 'totalLevel' | 'totalScore' | 'status' | 'expectedSalaryMin' | 'expectedSalaryMax'
> & {
  reason: string
  tags: string[]
}

export type TalentLibraryBoard = {
  groups: Array<TalentLibraryGroup & { candidates: TalentLibraryCandidate[] }>
  groupsById: Record<TalentLibraryGroupId, TalentLibraryGroup & { candidates: TalentLibraryCandidate[] }>
  summary: {
    totalCandidates: number
    totalGroups: number
    salaryMismatchCount: number
    highMatchCount: number
  }
}

export const talentLibraryGroups: TalentLibraryGroup[] = [
  {
    description: '综合分高、履历完整、未来可重点维护的人才。',
    id: 'senior',
    label: '高级人才库',
    tone: 'blue',
  },
  {
    description: '适合长期关系维护、外部机会或重点岗位再触达的人才。',
    id: 'headhunter',
    label: '猎头人才库',
    tone: 'black',
  },
  {
    description: '能力和基础条件达标，可根据岗位空缺进入下一步。',
    id: 'qualified',
    label: '合格人才库',
    tone: 'green',
  },
  {
    description: '暂时用不上，但履历、能力或作品有价值，后续可再激活。',
    id: 'reserve',
    label: '储备人才库',
    tone: 'yellow',
  },
  {
    description: '已进入或适合进入初试的候选人集合。',
    id: 'firstInterview',
    label: '初试面试库',
    tone: 'green',
  },
  {
    description: '已进入或适合进入复试的候选人集合。',
    id: 'secondInterview',
    label: '复试面试库',
    tone: 'blue',
  },
  {
    description: '已进入或适合进入终试的候选人集合。',
    id: 'finalInterview',
    label: '终试面试库',
    tone: 'black',
  },
  {
    description: '实习岗位、校园合作和长期培养候选人。',
    id: 'intern',
    label: '实习人才库',
    tone: 'green',
  },
  {
    description: '合伙、兼职、资源合作和项目协作型候选人。',
    id: 'partner',
    label: '合伙人人才库',
    tone: 'orange',
  },
  {
    description: '总经理、副总、总助、经营管理类高级候选人。',
    id: 'seniorExecutive',
    label: '高级经营者人才库',
    tone: 'black',
  },
  {
    description: '管理岗、部门负责人和团队管理型候选人。',
    id: 'seniorManagement',
    label: '高级管理者人才库',
    tone: 'blue',
  },
  {
    description: '业务、销售、大客户和市场拓展型高级候选人。',
    id: 'seniorBusiness',
    label: '高级业务人员人才库',
    tone: 'green',
  },
  {
    description: '技术、AI系统、产品研发和高专业壁垒候选人。',
    id: 'seniorTechnical',
    label: '高级技术人员人才库',
    tone: 'blue',
  },
  {
    description: '综合分、岗位能力和履历匹配度都很高的人才。',
    id: 'highMatch',
    label: '高匹配度人才库',
    tone: 'green',
  },
  {
    description: '条件和能力都合适，但薪酬、待遇或合作条件暂时谈不拢，转猎头长期维护。',
    id: 'salaryMismatchHeadhunter',
    label: '条件谈不拢猎头库',
    tone: 'orange',
  },
]

export const talentLibraryLabels = Object.fromEntries(
  talentLibraryGroups.map((group) => [group.id, group.label]),
) as Record<TalentLibraryGroupId, string>

const groupOrder = talentLibraryGroups.map((group) => group.id)

function addGroup(groups: Set<TalentLibraryGroupId>, groupId: TalentLibraryGroupId) {
  groups.add(groupId)
}

function hasAnyText(candidate: Candidate, keywords: string[]) {
  const text = [
    candidate.postName,
    candidate.workType,
    candidate.majorName,
    ...candidate.skillTags,
    ...candidate.customFlags,
  ].join(' ')

  return keywords.some((keyword) => text.includes(keyword))
}

function interviewStageGroup(stage: TalentArchiveContext['interviewStage']): TalentLibraryGroupId | null {
  if (stage === 'first') return 'firstInterview'
  if (stage === 'second') return 'secondInterview'
  if (stage === 'final') return 'finalInterview'
  return null
}

function primaryGroupFor(groups: Set<TalentLibraryGroupId>): TalentLibraryGroupId {
  const priority: TalentLibraryGroupId[] = [
    'salaryMismatchHeadhunter',
    'seniorExecutive',
    'seniorManagement',
    'seniorTechnical',
    'seniorBusiness',
    'senior',
    'headhunter',
    'highMatch',
    'qualified',
    'reserve',
  ]

  return priority.find((groupId) => groups.has(groupId)) ?? [...groups][0] ?? 'reserve'
}

export function assignTalentLibraries(
  candidate: Candidate,
  context: TalentArchiveContext = {},
): TalentLibraryAssignment {
  const groups = new Set<TalentLibraryGroupId>()
  const tags = new Set<string>()

  if (candidate.totalScore >= 80 || ['S', 'A'].includes(candidate.totalLevel)) {
    addGroup(groups, 'senior')
    addGroup(groups, 'highMatch')
    tags.add('高匹配')
  }

  if (candidate.totalScore >= 70) {
    addGroup(groups, 'qualified')
    tags.add('合格')
  }

  if (candidate.status === '储备' || candidate.totalScore < 80 || context.archiveNote?.includes('储备')) {
    addGroup(groups, 'reserve')
    tags.add('储备')
  }

  const stageGroup = interviewStageGroup(context.interviewStage)
  if (stageGroup) {
    addGroup(groups, stageGroup)
    tags.add(talentLibraryLabels[stageGroup])
  }

  if (context.salaryNegotiation === 'mismatch' || context.archiveNote?.includes('薪酬')) {
    addGroup(groups, 'headhunter')
    addGroup(groups, 'salaryMismatchHeadhunter')
    tags.add('薪酬谈不拢')
    tags.add('持续维护')
  }

  if (candidate.postType === 'sales' || hasAnyText(candidate, ['业务', '销售', '大客户', '客户经理', '渠道'])) {
    addGroup(groups, 'seniorBusiness')
    tags.add('高级业务')
  }

  if (candidate.postType === 'tech' || hasAnyText(candidate, ['技术', 'AI系统', '开发', '算法', 'Python'])) {
    addGroup(groups, 'seniorTechnical')
    tags.add('高级技术')
  }

  if (candidate.postType === 'management' || hasAnyText(candidate, ['总经理', '副总', '总助', '经营', '管理'])) {
    addGroup(groups, 'seniorManagement')
    tags.add('高级管理')
  }

  if (hasAnyText(candidate, ['总经理', '副总', '总助', '经营'])) {
    addGroup(groups, 'seniorExecutive')
    tags.add('高级经营')
  }

  if (candidate.availabilityStatus === '应届' || hasAnyText(candidate, ['实习生', '实习', '校招'])) {
    addGroup(groups, 'intern')
    tags.add('实习')
  }

  if (candidate.availabilityStatus === '兼职' || hasAnyText(candidate, ['合伙', '兼职', '小时工'])) {
    addGroup(groups, 'partner')
    tags.add('合伙/兼职')
  }

  if (groups.size === 0) {
    addGroup(groups, 'reserve')
    tags.add('待复核')
  }

  const sortedGroupIds = groupOrder.filter((groupId) => groups.has(groupId))

  return {
    candidateId: candidate.id,
    groupIds: sortedGroupIds,
    primaryGroupId: primaryGroupFor(groups),
    reason: context.archiveNote || defaultArchiveReason(candidate, sortedGroupIds),
    tags: [...tags],
  }
}

function defaultArchiveReason(candidate: Candidate, groupIds: TalentLibraryGroupId[]) {
  if (groupIds.includes('salaryMismatchHeadhunter')) {
    return '条件和能力合适，但薪酬或合作条件暂时谈不拢，转入猎头长期维护。'
  }
  if (candidate.status === '储备') {
    return '暂时用不上，但候选人仍有岗位或专业价值，进入储备人才库。'
  }
  if (groupIds.includes('highMatch')) {
    return '综合评分和岗位匹配度较高，建议保持重点跟进。'
  }
  return '按候选人当前评分、岗位类型和面试进度自动归入简历库。'
}

function toLibraryCandidate(candidate: Candidate, assignment: TalentLibraryAssignment): TalentLibraryCandidate {
  return {
    expectedSalaryMax: candidate.expectedSalaryMax,
    expectedSalaryMin: candidate.expectedSalaryMin,
    id: candidate.id,
    name: candidate.name,
    postName: candidate.postName,
    reason: assignment.reason,
    status: candidate.status,
    tags: assignment.tags,
    totalLevel: candidate.totalLevel,
    totalScore: candidate.totalScore,
  }
}

export function buildTalentLibraryBoard(
  candidates: Candidate[],
  contextByCandidateId: Record<number, TalentArchiveContext> = {},
): TalentLibraryBoard {
  const groupsById = Object.fromEntries(
    talentLibraryGroups.map((group) => [group.id, { ...group, candidates: [] as TalentLibraryCandidate[] }]),
  ) as TalentLibraryBoard['groupsById']

  candidates.forEach((candidate) => {
    const assignment = assignTalentLibraries(candidate, contextByCandidateId[candidate.id])
    const libraryCandidate = toLibraryCandidate(candidate, assignment)

    assignment.groupIds.forEach((groupId) => {
      groupsById[groupId].candidates.push(libraryCandidate)
    })
  })

  const groups = talentLibraryGroups.map((group) => groupsById[group.id])

  return {
    groups,
    groupsById,
    summary: {
      highMatchCount: groupsById.highMatch.candidates.length,
      salaryMismatchCount: groupsById.salaryMismatchHeadhunter.candidates.length,
      totalCandidates: candidates.length,
      totalGroups: groups.filter((group) => group.candidates.length > 0).length,
    },
  }
}
