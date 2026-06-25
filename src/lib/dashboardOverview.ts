export const overviewDashboardLayoutPreference = {
  filterMode: 'single-line-scroll-strip',
  filterWrap: 'nowrap',
  minStatCardWidthPx: 108,
  postCardBreakpointsPx: {
    railMax: 619,
    tileMax: 879,
  },
  statMode: 'compact-auto-fit',
} as const

export type OverviewPostCardMode = 'rail' | 'tile' | 'strip'

export function overviewPostCardModeForWidth(widthPx: number): OverviewPostCardMode {
  if (!Number.isFinite(widthPx) || widthPx <= 0) {
    return 'rail'
  }

  if (widthPx <= overviewDashboardLayoutPreference.postCardBreakpointsPx.railMax) {
    return 'rail'
  }

  if (widthPx <= overviewDashboardLayoutPreference.postCardBreakpointsPx.tileMax) {
    return 'tile'
  }

  return 'strip'
}
