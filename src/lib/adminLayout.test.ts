import { describe, expect, it } from 'vitest'
import { adminConsoleCardModeForWidth, adminConsoleLayoutPreference } from './adminLayout'

describe('admin console adaptive layout', () => {
  it('uses compact dense brick layout preferences for the system backend', () => {
    expect(adminConsoleLayoutPreference).toMatchObject({
      cardMode: 'adaptive-brick-grid',
      density: 'compact',
      fillStrategy: 'dense-auto-fit',
      innerCardMinWidthPx: 188,
      mainCardMinWidthPx: 300,
      statMinWidthPx: 116,
    })
  })

  it('switches backend cards from square to balanced cards and long strips by width', () => {
    expect(adminConsoleCardModeForWidth(0)).toBe('square')
    expect(adminConsoleCardModeForWidth(779)).toBe('square')
    expect(adminConsoleCardModeForWidth(780)).toBe('balanced')
    expect(adminConsoleCardModeForWidth(1139)).toBe('balanced')
    expect(adminConsoleCardModeForWidth(1140)).toBe('long-strip')
  })
})
