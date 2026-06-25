import { describe, expect, it } from 'vitest'
import { buildSidebarBadge, formatSidebarBadgeCount, sidebarBadgeTone } from './sidebarBadges'

describe('sidebar badge helpers', () => {
  it('hides zero or invalid counts', () => {
    expect(formatSidebarBadgeCount(0)).toBe('')
    expect(formatSidebarBadgeCount(-5)).toBe('')
    expect(sidebarBadgeTone(Number.NaN)).toBe('none')
    expect(buildSidebarBadge(0, '三轮作业').visible).toBe(false)
  })

  it('formats large menu counts with the 99999+ cap', () => {
    expect(formatSidebarBadgeCount(99999)).toBe('99999')
    expect(formatSidebarBadgeCount(100000)).toBe('99999+')
  })

  it('uses blue for normal counts within ten', () => {
    expect(sidebarBadgeTone(1)).toBe('blue')
    expect(sidebarBadgeTone(10)).toBe('blue')
  })

  it('uses orange for counts above ten before the red threshold', () => {
    expect(sidebarBadgeTone(11)).toBe('orange')
    expect(sidebarBadgeTone(99)).toBe('orange')
  })

  it('uses red for counts over one hundred or urgent menu items', () => {
    expect(sidebarBadgeTone(100)).toBe('red')
    expect(sidebarBadgeTone(30, true)).toBe('red')
    expect(buildSidebarBadge(30, '三轮作业', true).isCritical).toBe(true)
  })
})
