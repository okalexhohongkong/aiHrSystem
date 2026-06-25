export type SectionProgressTone = 'normal' | 'paused' | 'ahead'

export type SectionProgress = {
  percent: number
  status: string
  tone: SectionProgressTone
}

const pageProgressByTitle: Record<string, SectionProgress> = {
  '黑卫士 AI HR 系统 V1.2': { percent: 32.5, status: 'D1单机保存推进中', tone: 'normal' },
  'SaaS/PaaS 平台底座': { percent: 42.0, status: '底座演示可用', tone: 'normal' },
  'V1.2 融合蓝图': { percent: 98.5, status: '需求融合基本完成', tone: 'ahead' },
  '合伙兼职': { percent: 68.0, status: '演示流程可用', tone: 'normal' },
  '岗位AI生成与发布中心': { percent: 58.0, status: '岗位卡片保存中', tone: 'normal' },
  '岗位面试问卷中心': { percent: 46.5, status: '题库保存接入中', tone: 'normal' },
  '平台与多端发布路线': { percent: 37.0, status: 'PWA优先', tone: 'normal' },
  '录音解析中心': { percent: 41.0, status: '接口预留完成', tone: 'normal' },
  '招聘账号连接中心': { percent: 52.0, status: '合规托管设计中', tone: 'normal' },
  '数据看板': { percent: 49.0, status: '滚动看板演示中', tone: 'normal' },
  '系统后台': { percent: 54.0, status: '权限框架演示中', tone: 'normal' },
  '简历库': { percent: 44.0, status: '分层规则演示中', tone: 'normal' },
  '自动分工系统': { percent: 39.0, status: '调度逻辑演示中', tone: 'normal' },
  '通用人事初试评估': { percent: 61.0, status: '九维模型保存中', tone: 'normal' },
  '风险合规中心': { percent: 64.0, status: '边界规则已写入', tone: 'normal' },
}

export function formatSectionProgressPercent(percent: number) {
  const safePercent = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0
  return safePercent.toFixed(1).padStart(5, '0') + '%'
}

export function sectionProgressByTitle(title: string): SectionProgress {
  return pageProgressByTitle[title] ?? { percent: 30.0, status: '模块开发中', tone: 'normal' }
}
