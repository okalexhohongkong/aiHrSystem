import type { Candidate } from '../data'

export type ReportPopupSize = 'full' | 'half' | 'third' | 'quarter'
export type CandidateTickerMode = 'summary' | 'full' | 'greeting' | 'minimal'

export function postScrollSize(candidateCount: number) {
  if (candidateCount >= 5) return { className: 'large', maxHeight: 480 }
  if (candidateCount >= 3) return { className: 'medium', maxHeight: 340 }
  return { className: 'small', maxHeight: 220 }
}

export function paginateReportRows<T>(rows: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    items: rows.slice(start, start + pageSize),
    page: safePage,
    totalPages,
  }
}

export function reportScrollDuration(speed: number) {
  const safeSpeed = Math.min(Math.max(1, speed), 5)
  return 42 - safeSpeed * 6
}

export function highScoreCandidates(candidates: Candidate[], threshold = 80) {
  return candidates
    .filter((candidate) => candidate.totalScore >= threshold)
    .sort((left, right) => right.totalScore - left.totalScore)
}

export function popupSizeClass(size: ReportPopupSize) {
  return `popup-${size}`
}

export function buildCandidateTickerRows(candidate: Candidate, mode: CandidateTickerMode) {
  if (mode === 'full') {
    return [
      `${candidate.name} / ${candidate.postName} / 综合${candidate.totalScore}分 / ${candidate.totalLevel}级`,
      `学历：${candidate.educationLevel}，第一学历：${candidate.firstDegreeLevel}，专业：${candidate.majorName}`,
      `经历：${candidate.evaluationInput.workExperiences.map((item) => `${item.company}-${item.role}`).join('；')}`,
      `转写摘要：${candidate.transcript}`,
      `风险：${candidate.risks.join('；') || '暂无高风险'}`,
    ].join('\n')
  }

  if (mode === 'greeting') {
    return `${candidate.name}您好，我们看到您与${candidate.postName}岗位有较高匹配度，想进一步沟通面试时间、简历材料和岗位细节。`
  }

  if (mode === 'minimal') {
    return `${candidate.name}｜${candidate.postName}｜${candidate.totalScore}分｜${candidate.status}｜${candidate.cooperationLevel}`
  }

  return `${candidate.name} / ${candidate.postName} / ${candidate.totalScore}分 / ${candidate.agentSummary}`
}
