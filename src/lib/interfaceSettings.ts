export type FontFamilyId = 'system' | 'serif' | 'mono' | 'rounded' | 'custom'

export type InterfaceSettings = {
  brandLogoText: string
  brandName: string
  brandSubtitle: string
  fontFamily: FontFamilyId
  customFontFamily: string
  fontSize: number
  sidebarAccentWidth: number
  sidebarFontSize: number
  sidebarLineHeight: number
  textColor: string
  backgroundColor: string
  primaryColor: string
  sidebarColor: string
  cardColor: string
  lineColor: string
  visibleSections: string[]
}

export const fontFamilyOptions = [
  {
    id: 'system',
    name: '系统默认',
    css: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  {
    id: 'serif',
    name: '宋体/衬线',
    css: 'Georgia, "Times New Roman", "Songti SC", serif',
  },
  {
    id: 'mono',
    name: '等宽字体',
    css: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  {
    id: 'rounded',
    name: '圆润字体',
    css: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", sans-serif',
  },
  {
    id: 'custom',
    name: '自定义字体',
    css: '',
  },
] as const

export const colorPresets = [
  { name: '清爽天蓝', background: '#f0f8ff', text: '#1f2937' },
  { name: '护眼浅绿', background: '#f0fdf4', text: '#1f2937' },
  { name: '暖白办公', background: '#fffaf0', text: '#1f2937' },
  { name: '灰白极简', background: '#f8fafc', text: '#111827' },
  { name: '深蓝管理', background: '#eef4ff', text: '#172554' },
]

export type EnterpriseBrandPreset = {
  brandLogoText: string
  brandName: string
  brandSubtitle: string
  backgroundColor: string
  primaryColor: string
  sidebarColor: string
  textColor: string
}

export const enterpriseBrandPresets: EnterpriseBrandPreset[] = [
  {
    backgroundColor: '#f0f8ff',
    brandLogoText: 'AI',
    brandName: '黑卫士 AI HR',
    brandSubtitle: 'V1.2 Web / PWA',
    primaryColor: '#0284c7',
    sidebarColor: '#0c4a6e',
    textColor: '#1f2937',
  },
  {
    backgroundColor: '#f0fdf4',
    brandLogoText: 'QF',
    brandName: '清风集团 HR中台',
    brandSubtitle: '企业内部招聘与人才系统',
    primaryColor: '#16a34a',
    sidebarColor: '#14532d',
    textColor: '#1f2937',
  },
  {
    backgroundColor: '#f8fafc',
    brandLogoText: 'HX',
    brandName: '华星科技 人才平台',
    brandSubtitle: '招聘、面试、绩效与合约一体化',
    primaryColor: '#1d4ed8',
    sidebarColor: '#111827',
    textColor: '#111827',
  },
]

export const denseInformationTypographyPreference = {
  coreColor: '#0f172a',
  coreLineHeight: 1.3,
  coreWeight: 900,
  rowMinHeightPx: 46,
  supportFontSizePx: 11,
  supportLineHeight: 1.25,
} as const

export function clampFontSize(size: number) {
  return Math.min(20, Math.max(12, Math.round(size)))
}

export function clampSidebarAccentWidth(width: number) {
  return Math.min(12, Math.max(2, Math.round(width)))
}

export function clampSidebarFontSize(size: number) {
  return Math.min(18, Math.max(12, Math.round(size)))
}

export function clampSidebarLineHeight(lineHeight: number) {
  return Math.min(1.8, Math.max(1.1, Math.round(lineHeight * 10) / 10))
}

export function sanitizeCustomFontFamily(fontFamily: string) {
  return fontFamily
    .split(',')
    .map((item) => item.trim().replace(/[;"{}]/g, ''))
    .filter(Boolean)
    .join(', ')
}

export function fontCss(fontFamily: FontFamilyId, customFontFamily = '') {
  if (fontFamily === 'custom') {
    const sanitized = sanitizeCustomFontFamily(customFontFamily)
    return sanitized || fontFamilyOptions[0].css
  }
  return fontFamilyOptions.find((item) => item.id === fontFamily)?.css ?? fontFamilyOptions[0].css
}

export function toggleVisibleSection(visibleSections: string[], sectionId: string) {
  if (visibleSections.includes(sectionId)) {
    return visibleSections.filter((item) => item !== sectionId)
  }
  return [...visibleSections, sectionId]
}

export function visibleSectionCountText(visibleCount: number, totalCount: number) {
  return `已显示 ${visibleCount}/${totalCount} 个母菜单`
}

export function applyColorPreset(settings: InterfaceSettings, preset: { background: string; text: string }) {
  return {
    ...settings,
    backgroundColor: preset.background,
    textColor: preset.text,
  }
}

export function applyEnterpriseBrandPreset(settings: InterfaceSettings, preset: EnterpriseBrandPreset) {
  return {
    ...settings,
    backgroundColor: preset.backgroundColor,
    brandLogoText: preset.brandLogoText,
    brandName: preset.brandName,
    brandSubtitle: preset.brandSubtitle,
    cardColor: '#ffffff',
    lineColor: '#d7e5ef',
    primaryColor: preset.primaryColor,
    sidebarColor: preset.sidebarColor,
    textColor: preset.textColor,
  }
}
