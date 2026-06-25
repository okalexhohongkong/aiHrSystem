import { describe, expect, it } from 'vitest'
import {
  flexibleStaffingCategories,
  flexibleStaffingCategoryLabels,
  flexibleStaffingSop,
  flexibleStaffingTotalHeadcount,
  flexibleStaffingTotalOpenRoles,
} from './flexibleStaffing'

describe('flexible staffing module', () => {
  it('keeps the internal five category blocks in the expected order', () => {
    expect(flexibleStaffingCategoryLabels()).toEqual(['劳务', '小时工', '合伙', '兼职', '实习'])
    expect(flexibleStaffingCategories.map((category) => category.id)).toEqual([
      'labor',
      'hourly',
      'partner',
      'partTime',
      'intern',
    ])
  })

  it('summarizes headcount and open roles across all five blocks', () => {
    expect(flexibleStaffingTotalHeadcount()).toBe(101)
    expect(flexibleStaffingTotalOpenRoles()).toBe(16)
  })

  it('uses a broad partner and part-time entry SOP instead of a labor-only SOP', () => {
    expect(flexibleStaffingSop[0]).toContain('劳务、小时工、合伙、兼职、实习')
    expect(flexibleStaffingSop.join('')).toContain('合作条款')
    expect(flexibleStaffingSop.join('')).toContain('实习协议')
  })
})
