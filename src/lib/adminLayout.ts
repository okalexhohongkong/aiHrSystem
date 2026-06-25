export const adminConsoleLayoutPreference = {
  cardMode: 'adaptive-brick-grid',
  density: 'compact',
  fillStrategy: 'dense-auto-fit',
  innerCardMinWidthPx: 188,
  mainCardMinWidthPx: 300,
  modeBreakpointsPx: {
    balancedMax: 1139,
    squareMax: 779,
  },
  statMinWidthPx: 116,
} as const

export type AdminConsoleCardMode = 'square' | 'balanced' | 'long-strip'

export function adminConsoleCardModeForWidth(widthPx: number): AdminConsoleCardMode {
  if (!Number.isFinite(widthPx) || widthPx <= 0) {
    return 'square'
  }

  if (widthPx <= adminConsoleLayoutPreference.modeBreakpointsPx.squareMax) {
    return 'square'
  }

  if (widthPx <= adminConsoleLayoutPreference.modeBreakpointsPx.balancedMax) {
    return 'balanced'
  }

  return 'long-strip'
}
