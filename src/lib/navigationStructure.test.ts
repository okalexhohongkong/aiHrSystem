import { describe, expect, it } from 'vitest'
import {
  defaultWorkflowSidebarOrder,
  orderedSidebarSections,
  topShortcutSections,
  type AppSection,
} from './navigationStructure'

describe('navigation structure', () => {
  it('moves dashboard and admin to top shortcuts instead of the left workflow menu', () => {
    expect(topShortcutSections).toEqual(['dashboard', 'admin'])
    expect(defaultWorkflowSidebarOrder).not.toContain('dashboard')
    expect(defaultWorkflowSidebarOrder).not.toContain('admin')
  })

  it('orders the left menu by the recruiting workflow', () => {
    expect(defaultWorkflowSidebarOrder.slice(0, 10)).toEqual([
      'candidates',
      'publishing',
      'accounts',
      'invitationChannels',
      'mail',
      'audio',
      'first',
      'business',
      'aiInterview',
      'interviews',
    ])
  })

  it('merges risk correction and security compliance into one workflow entry', () => {
    expect(defaultWorkflowSidebarOrder).toContain('riskCompliance')
    expect(defaultWorkflowSidebarOrder).not.toContain('riskCorrection')
    expect(defaultWorkflowSidebarOrder).not.toContain('security')
  })

  it('keeps unlisted sections after the workflow sections without duplicating shortcuts', () => {
    const sections: AppSection[] = ['admin', 'dashboard', 'riskCompliance', 'publishing', 'candidates', 'theme']
    const ordered = orderedSidebarSections(sections)

    expect(ordered).toEqual(['candidates', 'publishing', 'theme', 'riskCompliance'])
  })
})
