import { describe, expect, it } from 'vitest'
import {
  demoInterviewRecords,
  demoPlatformAccounts,
  demoPlatformSummary,
  filterDemoInterviewsByPlatform,
  type DemoPlatformFilter,
} from './demoSystem'

describe('demo recruiting system', () => {
  it('provides filled demo candidates, jobs, companies and contact identities', () => {
    expect(demoInterviewRecords.length).toBeGreaterThanOrEqual(4)
    expect(demoInterviewRecords.every((record) => record.candidateName && record.jobName && record.companyName)).toBe(true)
    expect(demoInterviewRecords.every((record) => record.phone && record.wechatId && record.wecomId)).toBe(true)
  })

  it('binds every demo interview to a recruiting platform account', () => {
    const accountIds = new Set(demoPlatformAccounts.map((account) => account.id))

    expect(demoInterviewRecords.every((record) => accountIds.has(record.platformAccountId))).toBe(true)
    expect(demoPlatformAccounts.map((account) => account.platform)).toEqual(expect.arrayContaining(['BOSS直聘', '智联招聘']))
  })

  it('filters demo data by one platform or mixed all-platform view', () => {
    const bossOnly = filterDemoInterviewsByPlatform(demoInterviewRecords, 'boss')
    const zhaopinOnly = filterDemoInterviewsByPlatform(demoInterviewRecords, 'zhaopin')
    const mixed = filterDemoInterviewsByPlatform(demoInterviewRecords, 'all')

    expect(bossOnly.every((record) => record.platformId === 'boss')).toBe(true)
    expect(zhaopinOnly.every((record) => record.platformId === 'zhaopin')).toBe(true)
    expect(mixed).toHaveLength(demoInterviewRecords.length)
  })

  it('summarizes cross-platform demo counts for dashboard cards', () => {
    const summary = demoPlatformSummary(demoInterviewRecords)
    const filters = Object.keys(summary.byFilter) as DemoPlatformFilter[]

    expect(summary.total).toBe(demoInterviewRecords.length)
    expect(filters).toEqual(expect.arrayContaining(['all', 'boss', 'zhaopin']))
    expect(summary.byFilter.boss).toBeGreaterThan(0)
    expect(summary.byFilter.zhaopin).toBeGreaterThan(0)
  })
})
