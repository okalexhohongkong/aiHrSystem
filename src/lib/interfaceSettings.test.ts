import { describe, expect, it } from 'vitest'
import {
  applyColorPreset,
  applyEnterpriseBrandPreset,
  clampFontSize,
  clampSidebarAccentWidth,
  clampSidebarFontSize,
  clampSidebarLineHeight,
  colorPresets,
  denseInformationTypographyPreference,
  enterpriseBrandPresets,
  fontCss,
  sanitizeCustomFontFamily,
  toggleVisibleSection,
  visibleSectionCountText,
  type InterfaceSettings,
} from './interfaceSettings'

describe('interface settings', () => {
  it('clamps font size to the supported range', () => {
    expect(clampFontSize(9)).toBe(12)
    expect(clampFontSize(16.6)).toBe(17)
    expect(clampFontSize(24)).toBe(20)
  })

  it('clamps sidebar menu visual settings to usable ranges', () => {
    expect(clampSidebarAccentWidth(0)).toBe(2)
    expect(clampSidebarAccentWidth(7.4)).toBe(7)
    expect(clampSidebarAccentWidth(99)).toBe(12)
    expect(clampSidebarFontSize(10)).toBe(12)
    expect(clampSidebarFontSize(16.6)).toBe(17)
    expect(clampSidebarFontSize(24)).toBe(18)
    expect(clampSidebarLineHeight(0.8)).toBe(1.1)
    expect(clampSidebarLineHeight(1.46)).toBe(1.5)
    expect(clampSidebarLineHeight(2)).toBe(1.8)
  })

  it('returns a CSS font stack for a supported font option', () => {
    expect(fontCss('mono')).toContain('monospace')
    expect(fontCss('system')).toContain('sans-serif')
    expect(fontCss('custom', 'PingFang SC, Arial')).toBe('PingFang SC, Arial')
    expect(sanitizeCustomFontFamily('Bad";{}Font, Arial')).toBe('BadFont, Arial')
  })

  it('keeps dense information rows readable with stronger core text and smaller support text', () => {
    expect(denseInformationTypographyPreference).toMatchObject({
      coreColor: '#0f172a',
      coreWeight: 900,
      coreLineHeight: 1.3,
      supportFontSizePx: 11,
      supportLineHeight: 1.25,
      rowMinHeightPx: 46,
    })
  })

  it('toggles visible interface modules', () => {
    expect(toggleVisibleSection(['dashboard', 'admin'], 'admin')).toEqual(['dashboard'])
    expect(toggleVisibleSection(['dashboard'], 'admin')).toEqual(['dashboard', 'admin'])
  })

  it('summarizes visible sidebar menu count', () => {
    expect(visibleSectionCountText(8, 24)).toBe('已显示 8/24 个母菜单')
  })

  it('applies a background and text color preset', () => {
    const settings: InterfaceSettings = {
      brandLogoText: 'AI',
      brandName: '黑卫士 AI HR',
      brandSubtitle: 'V1.2 Web / PWA',
      fontFamily: 'system',
      customFontFamily: '',
      fontSize: 14,
      sidebarAccentWidth: 4,
      sidebarFontSize: 14,
      sidebarLineHeight: 1.3,
      textColor: '#111827',
      backgroundColor: '#ffffff',
      primaryColor: '#0284c7',
      sidebarColor: '#0c4a6e',
      cardColor: '#ffffff',
      lineColor: '#d7e5ef',
      visibleSections: ['dashboard'],
    }
    const next = applyColorPreset(settings, colorPresets[1])

    expect(next.backgroundColor).toBe('#f0fdf4')
    expect(next.textColor).toBe('#1f2937')
  })

  it('applies enterprise brand presets for white-label company UI', () => {
    const settings: InterfaceSettings = {
      brandLogoText: 'AI',
      brandName: '黑卫士 AI HR',
      brandSubtitle: 'V1.2 Web / PWA',
      fontFamily: 'system',
      customFontFamily: '',
      fontSize: 14,
      sidebarAccentWidth: 4,
      sidebarFontSize: 14,
      sidebarLineHeight: 1.3,
      textColor: '#111827',
      backgroundColor: '#ffffff',
      primaryColor: '#0284c7',
      sidebarColor: '#0c4a6e',
      cardColor: '#ffffff',
      lineColor: '#d7e5ef',
      visibleSections: ['dashboard'],
    }
    const next = applyEnterpriseBrandPreset(settings, enterpriseBrandPresets[1])

    expect(next.brandName).toBe('清风集团 HR中台')
    expect(next.brandLogoText).toBe('QF')
    expect(next.primaryColor).toBe('#16a34a')
    expect(next.sidebarColor).toBe('#14532d')
  })
})
