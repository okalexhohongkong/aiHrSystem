export type AppSection =
  | 'dashboard'
  | 'admin'
  | 'base'
  | 'blueprint'
  | 'candidates'
  | 'talentLibrary'
  | 'performanceGoals'
  | 'contracts'
  | 'first'
  | 'business'
  | 'accounts'
  | 'publishing'
  | 'labor'
  | 'jobseeker'
  | 'audio'
  | 'interviews'
  | 'review'
  | 'agent'
  | 'aiInterview'
  | 'mobileWork'
  | 'autoDispatch'
  | 'invitationChannels'
  | 'mail'
  | 'reports'
  | 'platform'
  | 'theme'
  | 'riskCompliance'

export const topShortcutSections: AppSection[] = ['dashboard', 'admin']

export const defaultWorkflowSidebarOrder: AppSection[] = [
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
  'review',
  'autoDispatch',
  'agent',
  'talentLibrary',
  'reports',
  'performanceGoals',
  'contracts',
  'jobseeker',
  'labor',
  'mobileWork',
  'base',
  'blueprint',
  'platform',
  'theme',
  'riskCompliance',
]

export function orderedSidebarSections(sections: AppSection[]) {
  const available = new Set(sections)
  const seen = new Set<AppSection>()
  const ordered: AppSection[] = []

  defaultWorkflowSidebarOrder.forEach((section) => {
    if (available.has(section) && !topShortcutSections.includes(section)) {
      ordered.push(section)
      seen.add(section)
    }
  })

  sections.forEach((section) => {
    if (!seen.has(section) && !topShortcutSections.includes(section)) {
      ordered.push(section)
      seen.add(section)
    }
  })

  return ordered
}
