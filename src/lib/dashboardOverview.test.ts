import { describe, expect, it } from 'vitest'
import { overviewDashboardLayoutPreference, overviewPostCardModeForWidth } from './dashboardOverview'

describe('dashboard overview layout preference', () => {
  it('keeps overview metrics compact and filters on a single scroll strip', () => {
    expect(overviewDashboardLayoutPreference).toMatchObject({
      filterMode: 'single-line-scroll-strip',
      filterWrap: 'nowrap',
      minStatCardWidthPx: 108,
      postCardBreakpointsPx: {
        railMax: 619,
        tileMax: 879,
      },
      statMode: 'compact-auto-fit',
    })
  })

  it('switches post cards between rail, tile, and long strip by available width', () => {
    expect(overviewPostCardModeForWidth(0)).toBe('rail')
    expect(overviewPostCardModeForWidth(619)).toBe('rail')
    expect(overviewPostCardModeForWidth(620)).toBe('tile')
    expect(overviewPostCardModeForWidth(879)).toBe('tile')
    expect(overviewPostCardModeForWidth(880)).toBe('strip')
  })
})
