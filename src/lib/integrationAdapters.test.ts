import { describe, expect, it } from 'vitest'
import {
  adaptersByStage,
  languageInterfaces,
  platformLoginMethodSummary,
  recruitingPlatformAdapters,
} from './integrationAdapters'

describe('integration adapter reservations', () => {
  it('reserves simplified, traditional, english and global language interfaces', () => {
    expect(languageInterfaces.map((item) => item.id)).toEqual([
      'simplified-chinese',
      'traditional-chinese',
      'english',
      'global-language-bank',
    ])
    expect(languageInterfaces.find((item) => item.id === 'simplified-chinese')?.stage).toBe('1.0')
  })

  it('keeps BOSS as 1.0 priority and reserves mainstream 2.0 platforms', () => {
    expect(adaptersByStage('1.0优先').map((adapter) => adapter.id)).toEqual(['boss'])
    expect(recruitingPlatformAdapters.map((adapter) => adapter.id)).toEqual(
      expect.arrayContaining(['linkedin', 'liepin', 'zhaopin', '51job', 'hk-talent', 'hk-government']),
    )
  })

  it('summarizes platform login methods for UI display', () => {
    const zhaopin = recruitingPlatformAdapters.find((adapter) => adapter.id === 'zhaopin')
    const boss = recruitingPlatformAdapters.find((adapter) => adapter.id === 'boss')

    expect(zhaopin).toBeDefined()
    expect(platformLoginMethodSummary(zhaopin!)).toContain('手机验证码')
    expect(platformLoginMethodSummary(zhaopin!)).toContain('二维码扫码')
    expect(platformLoginMethodSummary(boss!)).toContain('邮箱验证码')
    expect(platformLoginMethodSummary(boss!)).toContain('网页辅助')
    expect(platformLoginMethodSummary(boss!)).toContain('账号密码')
  })
})
