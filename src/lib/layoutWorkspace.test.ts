import { describe, expect, it } from 'vitest'
import {
  createUserLayoutPreference,
  createWorkspaceLayout,
  globalAutoFillLayoutPreference,
  globalAutoFillModeForWidth,
  layoutItemGridFractionClass,
  layoutItemRatioClass,
  layoutItemScaleClass,
  layoutItemSizeClass,
  layoutModeClass,
  moveLayoutItem,
  reorderUserSidebar,
  reorderWorkspaceLayout,
  resetWorkspaceLayout,
  resizeWorkspaceLayoutItem,
  scaleWorkspaceLayoutItem,
  setWorkspaceLocked,
  setWorkspaceLayoutMode,
  setWorkspaceLayoutItemRatio,
  snapLayoutGridFraction,
  snapWorkspaceLayoutItemToGrid,
  updateUserWorkspaceLayout,
} from './layoutWorkspace'

const sampleItems = [
  { id: 'summary', title: '总览' },
  { id: 'candidate-table', title: '候选看板长条列表' },
  { id: 'reports', title: '报表' },
]

const sidebarItems = [
  { id: 'dashboard', title: '总览' },
  { id: 'publishing', title: '岗位发布系统' },
  { id: 'candidates', title: '候选看板' },
  { id: 'reports', title: '数据看板' },
]

describe('workspace layout engine', () => {
  it('creates a locked workspace layout by default', () => {
    const layout = createWorkspaceLayout(sampleItems)

    expect(layout.locked).toBe(true)
    expect(layout.mode).toBe('adaptive')
    expect(layout.items.map((item) => item.id)).toEqual(['summary', 'candidate-table', 'reports'])
  })

  it('uses a global auto-fill preference for self-adaptive blank-space filling', () => {
    expect(globalAutoFillLayoutPreference).toMatchObject({
      blankFill: 'dense',
      cardGridMode: 'auto-fit',
      defaultMinCardWidthPx: 320,
      minStatCardWidthPx: 118,
      workspaceColumns: 24,
    })
    expect(globalAutoFillModeForWidth(0)).toBe('single')
    expect(globalAutoFillModeForWidth(719)).toBe('single')
    expect(globalAutoFillModeForWidth(720)).toBe('balanced')
    expect(globalAutoFillModeForWidth(1119)).toBe('balanced')
    expect(globalAutoFillModeForWidth(1120)).toBe('dense')
  })

  it('moves layout items when unlocked', () => {
    expect(moveLayoutItem(sampleItems, 'reports', 'summary').map((item) => item.id)).toEqual([
      'reports',
      'summary',
      'candidate-table',
    ])
  })

  it('does not reorder a locked workspace', () => {
    const layout = createWorkspaceLayout(sampleItems, true)

    expect(reorderWorkspaceLayout(layout, 'reports', 'summary')).toBe(layout)
  })

  it('reorders an unlocked workspace and can be locked again', () => {
    const layout = setWorkspaceLocked(createWorkspaceLayout(sampleItems), false)
    const reordered = reorderWorkspaceLayout(layout, 'reports', 'summary')

    expect(reordered.items.map((item) => item.id)).toEqual(['reports', 'summary', 'candidate-table'])
    expect(setWorkspaceLocked(reordered, true).locked).toBe(true)
  })

  it('resets to the default order', () => {
    const layout = resetWorkspaceLayout(sampleItems)

    expect(layout.locked).toBe(true)
    expect(layout.items).toEqual(sampleItems)
  })

  it('resizes unlocked layout items without changing order', () => {
    const layout = setWorkspaceLocked(createWorkspaceLayout(sampleItems), false)
    const resized = resizeWorkspaceLayoutItem(layout, 'candidate-table', 'compact')

    expect(resized.items.map((item) => item.id)).toEqual(['summary', 'candidate-table', 'reports'])
    expect(resized.items.find((item) => item.id === 'candidate-table')?.size).toBe('compact')
    expect(layoutItemSizeClass('compact')).toBe('layout-size-compact')
    expect(layoutItemSizeClass()).toBe('layout-size-normal')
  })

  it('sets unlocked layout item ratios without changing order', () => {
    const layout = setWorkspaceLocked(createWorkspaceLayout(sampleItems), false)
    const reshaped = setWorkspaceLayoutItemRatio(layout, 'reports', 'square')

    expect(reshaped.items.map((item) => item.id)).toEqual(['summary', 'candidate-table', 'reports'])
    expect(reshaped.items.find((item) => item.id === 'reports')?.ratio).toBe('square')
    expect(layoutItemRatioClass('square')).toBe('layout-ratio-square')
    expect(layoutItemRatioClass()).toBe('layout-ratio-auto')
  })

  it('scales unlocked layout items proportionally without changing order', () => {
    const layout = setWorkspaceLocked(createWorkspaceLayout(sampleItems), false)
    const scaled = scaleWorkspaceLayoutItem(layout, 'summary', 'xl')

    expect(scaled.items.map((item) => item.id)).toEqual(['summary', 'candidate-table', 'reports'])
    expect(scaled.items.find((item) => item.id === 'summary')?.scale).toBe('xl')
    expect(layoutItemScaleClass('xl')).toBe('layout-scale-xl')
    expect(layoutItemScaleClass()).toBe('layout-scale-md')
  })

  it('snaps layout items to fixed grid fractions only', () => {
    const layout = setWorkspaceLocked(createWorkspaceLayout(sampleItems), false)
    const snapped = snapWorkspaceLayoutItemToGrid(layout, 'reports', 'third')

    expect(snapped.items.map((item) => item.id)).toEqual(['summary', 'candidate-table', 'reports'])
    expect(snapped.items.find((item) => item.id === 'reports')?.gridFraction).toBe('third')
    expect(snapped.items.find((item) => item.id === 'reports')?.ratio).toBe('standard')
    expect(layoutItemGridFractionClass('third')).toBe('layout-fraction-third')
    expect(layoutItemGridFractionClass()).toBe('')
  })

  it('rounds pointer resize ratios to allowed grid fractions', () => {
    expect(snapLayoutGridFraction(0.08)).toBe('oneEighth')
    expect(snapLayoutGridFraction(0.24)).toBe('quarter')
    expect(snapLayoutGridFraction(0.34)).toBe('third')
    expect(snapLayoutGridFraction(0.52)).toBe('half')
    expect(snapLayoutGridFraction(0.9)).toBe('full')
  })

  it('applies unlocked workspace layout mode presets', () => {
    const layout = setWorkspaceLocked(createWorkspaceLayout(sampleItems), false)
    const horizontal = setWorkspaceLayoutMode(layout, 'horizontal')
    const vertical = setWorkspaceLayoutMode(layout, 'vertical')
    const mixed = setWorkspaceLayoutMode(layout, 'mixed')

    expect(horizontal.mode).toBe('horizontal')
    expect(horizontal.items.every((item) => item.size === 'full' && item.ratio === 'landscape')).toBe(true)
    expect(vertical.items.every((item) => item.size === 'compact' && item.ratio === 'portrait')).toBe(true)
    expect(mixed.items.map((item) => item.size)).toEqual(['wide', 'compact', 'compact'])
    expect(mixed.items.map((item) => item.ratio)).toEqual(['landscape', 'portrait', 'square'])
    expect(layoutModeClass('mixed')).toBe('layout-mode-mixed')
    expect(layoutModeClass()).toBe('layout-mode-adaptive')
  })

  it('does not resize locked layout items', () => {
    const layout = createWorkspaceLayout(sampleItems, true)

    expect(resizeWorkspaceLayoutItem(layout, 'summary', 'full')).toBe(layout)
  })

  it('does not reshape locked layout items', () => {
    const layout = createWorkspaceLayout(sampleItems, true)

    expect(setWorkspaceLayoutItemRatio(layout, 'summary', 'standard')).toBe(layout)
  })

  it('does not scale locked layout items', () => {
    const layout = createWorkspaceLayout(sampleItems, true)

    expect(scaleWorkspaceLayoutItem(layout, 'summary', 'lg')).toBe(layout)
  })

  it('does not snap locked layout items', () => {
    const layout = createWorkspaceLayout(sampleItems, true)

    expect(snapWorkspaceLayoutItemToGrid(layout, 'summary', 'half')).toBe(layout)
  })

  it('does not change layout mode while locked', () => {
    const layout = createWorkspaceLayout(sampleItems, true)

    expect(setWorkspaceLayoutMode(layout, 'horizontal')).toBe(layout)
  })

  it('creates independent sidebar and page layouts for each colleague', () => {
    const hrPreference = createUserLayoutPreference('hr-01', '陈HR', sidebarItems, {
      dashboard: sampleItems,
    })
    const bossPreference = createUserLayoutPreference('boss-01', '老板账号', sidebarItems, {
      dashboard: sampleItems,
    })
    const unlockedHrPreference = {
      ...hrPreference,
      sidebar: setWorkspaceLocked(hrPreference.sidebar, false),
    }
    const reorderedHrPreference = reorderUserSidebar(unlockedHrPreference, 'reports', 'publishing')

    expect(reorderedHrPreference.sidebar.items.map((item) => item.id)).toEqual([
      'dashboard',
      'reports',
      'publishing',
      'candidates',
    ])
    expect(bossPreference.sidebar.items.map((item) => item.id)).toEqual([
      'dashboard',
      'publishing',
      'candidates',
      'reports',
    ])
  })

  it('keeps a locked colleague sidebar fixed', () => {
    const preference = createUserLayoutPreference('hr-02', '王主管', sidebarItems, {
      dashboard: sampleItems,
    })
    const reordered = reorderUserSidebar(preference, 'reports', 'dashboard')

    expect(reordered.sidebar).toBe(preference.sidebar)
    expect(reordered.sidebar.items.map((item) => item.id)).toEqual([
      'dashboard',
      'publishing',
      'candidates',
      'reports',
    ])
  })

  it('updates one workspace layout without changing the sidebar order', () => {
    const preference = createUserLayoutPreference('hr-03', '刘HR', sidebarItems, {
      dashboard: sampleItems,
    })
    const unlockedDashboard = setWorkspaceLocked(preference.workspaces.dashboard, false)
    const movedDashboard = reorderWorkspaceLayout(unlockedDashboard, 'reports', 'summary')
    const updated = updateUserWorkspaceLayout(preference, 'dashboard', movedDashboard)

    expect(updated.sidebar.items.map((item) => item.id)).toEqual([
      'dashboard',
      'publishing',
      'candidates',
      'reports',
    ])
    expect(updated.workspaces.dashboard.items.map((item) => item.id)).toEqual([
      'reports',
      'summary',
      'candidate-table',
    ])
  })
})
