export type SidebarBadgeTone = 'none' | 'blue' | 'orange' | 'red'

export type SidebarBadgeView = {
  ariaLabel: string
  isCritical: boolean
  text: string
  tone: SidebarBadgeTone
  visible: boolean
}

const DEFAULT_BADGE_MAX = 99999

function normalizedCount(count: number) {
  if (!Number.isFinite(count)) return 0
  return Math.max(0, Math.floor(count))
}

export function formatSidebarBadgeCount(count: number, max = DEFAULT_BADGE_MAX) {
  const safeCount = normalizedCount(count)
  const safeMax = Math.max(1, Math.floor(max))

  if (safeCount === 0) return ''
  if (safeCount > safeMax) return `${safeMax}+`
  return String(safeCount)
}

export function sidebarBadgeTone(count: number, isUrgent = false): SidebarBadgeTone {
  const safeCount = normalizedCount(count)

  if (safeCount === 0) return 'none'
  if (isUrgent || safeCount >= 100) return 'red'
  if (safeCount > 10) return 'orange'
  return 'blue'
}

export function buildSidebarBadge(count: number, label: string, isUrgent = false): SidebarBadgeView {
  const tone = sidebarBadgeTone(count, isUrgent)
  const text = formatSidebarBadgeCount(count)

  return {
    ariaLabel: tone === 'none' ? `${label}暂无未处理事项` : `${label}有${text}项未处理事项`,
    isCritical: tone === 'red',
    text,
    tone,
    visible: tone !== 'none',
  }
}
