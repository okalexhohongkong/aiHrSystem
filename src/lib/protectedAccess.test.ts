import { describe, expect, it } from 'vitest'
import {
  isProtectedSection,
  protectedPolicyForSection,
  protectedSectionPolicies,
  prototypeAccessCode,
  verifyProtectedSectionAccess,
} from './protectedAccess'

describe('protected section access rules', () => {
  it('protects system admin Port Agent and risk compliance sections', () => {
    expect(protectedSectionPolicies.map((policy) => policy.sectionId)).toEqual(['admin', 'agent', 'riskCompliance'])
    expect(isProtectedSection('admin')).toBe(true)
    expect(isProtectedSection('agent')).toBe(true)
    expect(isProtectedSection('riskCompliance')).toBe(true)
    expect(isProtectedSection('dashboard')).toBe(false)
  })

  it('describes why protected menus need higher permission', () => {
    expect(protectedPolicyForSection('agent')?.label).toBe('端口Agent')
    expect(protectedPolicyForSection('agent')?.reason).toContain('端口Agent')
    expect(protectedPolicyForSection('admin')?.requiredPermission).toContain('系统管理员')
    expect(protectedPolicyForSection('riskCompliance')?.reason).toContain('安全合规')
  })

  it('verifies the prototype access code and rejects wrong codes', () => {
    expect(verifyProtectedSectionAccess('admin', prototypeAccessCode).allowed).toBe(true)
    expect(verifyProtectedSectionAccess('agent', ` ${prototypeAccessCode} `).allowed).toBe(true)
    expect(verifyProtectedSectionAccess('riskCompliance', prototypeAccessCode).allowed).toBe(true)
    expect(verifyProtectedSectionAccess('admin', '000000').allowed).toBe(false)
  })
})
