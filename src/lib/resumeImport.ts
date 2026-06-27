import type { Candidate, CandidateDataFieldSignal } from '../data'
import {
  calculateGeneralScore,
  totalLevel,
  totalScore,
  type CandidateEvaluationInput,
} from './scoring'

export type CandidateResumeImportDraft = {
  name: string
  phone: string
  email: string
  source: Candidate['source']
  postName: string
  postType: CandidateEvaluationInput['targetPostType']
  appliedAt: string
  expectedSalaryMin: number
  expectedSalaryMax: number
  currentLocation: string
  workCitiesText: string
  availabilityStatus: Candidate['availabilityStatus']
  educationLevel: Candidate['educationLevel']
  firstDegreeLevel: Candidate['firstDegreeLevel']
  majorName: string
  workType: string
  graduationYear: number
  lastCompany: string
  lastRole: string
  startYear: number
  endYear: number
  businessScore: number
  skillTagsText: string
  resumeText: string
}

export const defaultCandidateResumeImportDraft: CandidateResumeImportDraft = {
  name: '',
  phone: '',
  email: '',
  source: '文件上传',
  postName: '业务经理',
  postType: 'sales',
  appliedAt: '2026-06-27T09:00:00+08:00',
  expectedSalaryMin: 10,
  expectedSalaryMax: 18,
  currentLocation: '上海',
  workCitiesText: '上海,杭州',
  availabilityStatus: '在职',
  educationLevel: '本科',
  firstDegreeLevel: '一本',
  majorName: '市场营销',
  workType: '待补充',
  graduationYear: 2020,
  lastCompany: '待补充公司',
  lastRole: '待补充岗位',
  startYear: 2021,
  endYear: 2026,
  businessScore: 72,
  skillTagsText: 'Office,AI工具,业绩清晰',
  resumeText: '',
}

function splitTextTags(text: string) {
  return text
    .split(/[,，、\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeDraftText(value: string, fallback: string) {
  return value.trim() || fallback
}

function candidateImportFieldSignals(draft: CandidateResumeImportDraft): CandidateDataFieldSignal[] {
  return [
    { label: '投递时间', status: draft.appliedAt ? '已采集' : '待补充' },
    { label: '邮件/简历/微信/电话', status: draft.email || draft.phone || draft.resumeText ? '已采集' : '待补充' },
    { label: '期望薪酬', status: draft.expectedSalaryMin || draft.expectedSalaryMax ? '已采集' : '待补充' },
    { label: '当前城市/工作城市', status: draft.currentLocation || draft.workCitiesText ? '已采集' : '待补充' },
    { label: '工作年限/工作份数', status: draft.startYear && draft.endYear ? '已采集' : '待补充' },
    { label: '专业/工种', status: draft.majorName || draft.workType ? '已采集' : '待补充' },
    { label: '在离职状态', status: draft.availabilityStatus ? '已采集' : '待补充' },
    { label: '学历层级', status: draft.educationLevel ? '已采集' : '待补充' },
    { label: '平台外部投递总量', status: '不可获取', note: '单机导入阶段不默认采集外部投递总量' },
    { label: 'BOSS活跃/刷新频率', status: '待补充', note: '等待授权账号或人工观察后补充' },
    { label: '籍贯/祖籍', status: '受限不采集', note: '不进入默认筛选评分' },
    { label: '身份证归属地', status: '受限不采集', note: '不进入默认筛选评分' },
    { label: '婚育/子女情况', status: '受限不采集', note: '不进入默认筛选评分' },
    { label: '宗教信仰', status: '受限不采集', note: '不进入默认筛选评分' },
    { label: '政治身份', status: '受限不采集', note: '不进入默认筛选评分' },
  ]
}

export function createCandidateFromResumeDraft(
  draft: CandidateResumeImportDraft,
  existingCandidates: Pick<Candidate, 'id'>[],
): Candidate {
  const nextId = Math.max(0, ...existingCandidates.map((candidate) => candidate.id)) + 1
  const skillTags = splitTextTags(draft.skillTagsText)
  const workCities = splitTextTags(draft.workCitiesText)
  const evaluationInput: CandidateEvaluationInput = {
    graduationYear: draft.graduationYear,
    major: normalizeDraftText(draft.majorName, '待补充专业'),
    targetPostType: draft.postType,
    majorMatchesPost: skillTags.some((tag) => tag.includes('专业匹配')) || draft.majorName.includes(draft.postName),
    hasAcademicAchievement: skillTags.some((tag) => tag.includes('奖项') || tag.includes('学术')),
    hasClearPerformance: skillTags.some((tag) => tag.includes('业绩') || tag.includes('绩效')),
    hasDoubleDegree: skillTags.some((tag) => tag.includes('双学历')),
    hasPatent: skillTags.some((tag) => tag.includes('专利') || tag.includes('软著')),
    hasProjectManagerExperience: skillTags.some((tag) => tag.includes('项目经理') || tag.includes('负责人')),
    hasZeroToOneProject: skillTags.some((tag) => tag.includes('0-1') || tag.includes('从0到1')),
    workExperiences: [
      {
        achievements: draft.resumeText ? draft.resumeText.slice(0, 80) : '手动导入，等待简历复核',
        company: normalizeDraftText(draft.lastCompany, '待补充公司'),
        direction: draft.postType,
        endYear: draft.endYear,
        role: normalizeDraftText(draft.lastRole, draft.postName),
        startYear: draft.startYear,
      },
    ],
  }
  const general = calculateGeneralScore(evaluationInput)
  const businessScore = Math.max(0, Math.min(100, Math.round(draft.businessScore)))
  const combined = totalScore(general.score, businessScore)
  const now = new Date().toISOString()

  return {
    id: nextId,
    name: normalizeDraftText(draft.name, `导入候选人${nextId}`),
    phone: normalizeDraftText(draft.phone, '待补充手机号'),
    email: normalizeDraftText(draft.email, 'resume-import@example.com'),
    appliedAt: draft.appliedAt,
    source: draft.source,
    postName: normalizeDraftText(draft.postName, '待分配岗位'),
    postType: draft.postType,
    status: '待初试',
    expectedSalaryMin: draft.expectedSalaryMin,
    expectedSalaryMax: draft.expectedSalaryMax,
    currentLocation: normalizeDraftText(draft.currentLocation, '待补充城市'),
    workCities: workCities.length ? workCities : [normalizeDraftText(draft.currentLocation, '待补充城市')],
    availabilityStatus: draft.availabilityStatus,
    educationLevel: draft.educationLevel,
    firstDegreeLevel: draft.firstDegreeLevel,
    majorName: normalizeDraftText(draft.majorName, '待补充专业'),
    workType: normalizeDraftText(draft.workType, draft.postName),
    communication: {
      addedWechat: false,
      exchangedPhone: Boolean(draft.phone),
      sentEmail: Boolean(draft.email),
      sentResume: Boolean(draft.resumeText),
    },
    dataFieldSignals: candidateImportFieldSignals(draft),
    platformActivity: {
      activitySource: '人工观察',
      applicationsInSystem: 1,
      confidence: '中',
      externalApplicationCount: null,
      externalApplicationSource: '不可获取',
      lastVisibleActiveAt: draft.appliedAt,
      refreshFrequency: '未知',
    },
    skillTags,
    customFlags: draft.resumeText ? ['手动导入', '待复核'] : ['手动导入', '简历待补充'],
    commonScore: general.score,
    businessScore,
    totalScore: combined,
    totalLevel: totalLevel(combined),
    risks: general.risks,
    strengths: general.reasons.length ? general.reasons : ['已进入本机候选池，等待人工复核'],
    audioStatus: '未上传',
    homeworkStatus: '无作业',
    cooperationLevel: '中配合',
    evaluationInput,
    transcript: draft.resumeText || '手动导入候选人，等待补充简历原文、电话沟通和面试记录。',
    agentSummary: `${normalizeDraftText(draft.postName, '待分配岗位')}候选人，来源${draft.source}，综合${combined}分，建议先补关键经历和邀约条件。`,
    operationLog: [
      {
        action: '简历导入',
        at: now,
        note: `来源：${draft.source}；岗位：${normalizeDraftText(draft.postName, '待分配岗位')}`,
        toStatus: '待初试',
      },
    ],
  }
}
