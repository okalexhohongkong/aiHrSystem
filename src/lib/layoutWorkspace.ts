export type LayoutItemSize = 'compact' | 'normal' | 'wide' | 'full'
export type LayoutItemRatio = 'auto' | 'landscape' | 'portrait' | 'standard' | 'square'
export type LayoutItemScale = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type LayoutGridFraction = 'oneEighth' | 'quarter' | 'third' | 'half' | 'full'
export type WorkspaceLayoutMode = 'adaptive' | 'horizontal' | 'vertical' | 'mixed'
export type GlobalAutoFillMode = 'single' | 'balanced' | 'dense'

export const globalAutoFillLayoutPreference = {
  blankFill: 'dense',
  cardGridMode: 'auto-fit',
  defaultMinCardWidthPx: 320,
  minStatCardWidthPx: 118,
  workspaceColumns: 24,
} as const

export type LayoutItem = {
  gridFraction?: LayoutGridFraction
  id: string
  ratio?: LayoutItemRatio
  scale?: LayoutItemScale
  size?: LayoutItemSize
  title: string
}

export type WorkspaceLayoutState = {
  locked: boolean
  items: LayoutItem[]
  mode?: WorkspaceLayoutMode
}

export type UserLayoutPreference = {
  userId: string
  displayName: string
  sidebar: WorkspaceLayoutState
  workspaces: Record<string, WorkspaceLayoutState>
}

export function createWorkspaceLayout(items: LayoutItem[], locked = true): WorkspaceLayoutState {
  return {
    items: [...items],
    locked,
    mode: 'adaptive',
  }
}

export function setWorkspaceLocked(layout: WorkspaceLayoutState, locked: boolean): WorkspaceLayoutState {
  return {
    ...layout,
    locked,
  }
}

export function moveLayoutItem(items: LayoutItem[], draggedId: string, targetId: string): LayoutItem[] {
  if (draggedId === targetId) return [...items]

  const fromIndex = items.findIndex((item) => item.id === draggedId)
  const toIndex = items.findIndex((item) => item.id === targetId)
  if (fromIndex < 0 || toIndex < 0) return [...items]

  const nextItems = [...items]
  const [draggedItem] = nextItems.splice(fromIndex, 1)
  nextItems.splice(toIndex, 0, draggedItem)
  return nextItems
}

export function reorderWorkspaceLayout(
  layout: WorkspaceLayoutState,
  draggedId: string,
  targetId: string,
): WorkspaceLayoutState {
  if (layout.locked) return layout

  return {
    ...layout,
    items: moveLayoutItem(layout.items, draggedId, targetId),
  }
}

export function resetWorkspaceLayout(defaultItems: LayoutItem[], locked = true): WorkspaceLayoutState {
  return createWorkspaceLayout(defaultItems, locked)
}

function applyLayoutModePreset(items: LayoutItem[], mode: WorkspaceLayoutMode): LayoutItem[] {
  if (mode === 'adaptive') {
    return items.map((item) => ({
      ...item,
      ratio: 'auto',
      scale: 'md',
      size: 'normal',
    }))
  }

  if (mode === 'horizontal') {
    return items.map((item) => ({
      ...item,
      ratio: 'landscape',
      scale: 'md',
      size: 'full',
    }))
  }

  if (mode === 'vertical') {
    return items.map((item) => ({
      ...item,
      ratio: 'portrait',
      scale: 'md',
      size: 'compact',
    }))
  }

  const mixedPattern: Array<Pick<LayoutItem, 'ratio' | 'scale' | 'size'>> = [
    { ratio: 'landscape', scale: 'md', size: 'wide' },
    { ratio: 'portrait', scale: 'md', size: 'compact' },
    { ratio: 'square', scale: 'md', size: 'compact' },
    { ratio: 'landscape', scale: 'md', size: 'full' },
  ]

  return items.map((item, index) => ({
    ...item,
    ...mixedPattern[index % mixedPattern.length],
  }))
}

export function setWorkspaceLayoutMode(
  layout: WorkspaceLayoutState,
  mode: WorkspaceLayoutMode,
): WorkspaceLayoutState {
  if (layout.locked) return layout

  return {
    ...layout,
    items: applyLayoutModePreset(layout.items, mode),
    mode,
  }
}

export function resizeWorkspaceLayoutItem(
  layout: WorkspaceLayoutState,
  itemId: string,
  size: LayoutItemSize,
): WorkspaceLayoutState {
  if (layout.locked) return layout

  return {
    ...layout,
    items: layout.items.map((item) => (item.id === itemId ? { ...item, size } : item)),
  }
}

export function setWorkspaceLayoutItemRatio(
  layout: WorkspaceLayoutState,
  itemId: string,
  ratio: LayoutItemRatio,
): WorkspaceLayoutState {
  if (layout.locked) return layout

  return {
    ...layout,
    items: layout.items.map((item) => (item.id === itemId ? { ...item, ratio } : item)),
  }
}

export function scaleWorkspaceLayoutItem(
  layout: WorkspaceLayoutState,
  itemId: string,
  scale: LayoutItemScale,
): WorkspaceLayoutState {
  if (layout.locked) return layout

  return {
    ...layout,
    items: layout.items.map((item) => (item.id === itemId ? { ...item, scale } : item)),
  }
}

export function snapWorkspaceLayoutItemToGrid(
  layout: WorkspaceLayoutState,
  itemId: string,
  gridFraction: LayoutGridFraction,
): WorkspaceLayoutState {
  if (layout.locked) return layout

  return {
    ...layout,
    items: layout.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            gridFraction,
            ratio: item.ratio && item.ratio !== 'auto' ? item.ratio : 'standard',
          }
        : item,
    ),
  }
}

export function layoutItemSizeClass(size: LayoutItemSize = 'normal') {
  return `layout-size-${size}`
}

export function layoutItemRatioClass(ratio: LayoutItemRatio = 'auto') {
  return `layout-ratio-${ratio}`
}

export function layoutItemScaleClass(scale: LayoutItemScale = 'md') {
  return `layout-scale-${scale}`
}

export function layoutItemGridFractionClass(gridFraction?: LayoutGridFraction) {
  return gridFraction ? `layout-fraction-${gridFraction}` : ''
}

export function layoutModeClass(mode: WorkspaceLayoutMode = 'adaptive') {
  return `layout-mode-${mode}`
}

export function globalAutoFillModeForWidth(widthPx: number): GlobalAutoFillMode {
  if (!Number.isFinite(widthPx) || widthPx < 720) return 'single'
  if (widthPx < 1120) return 'balanced'
  return 'dense'
}

export function snapLayoutGridFraction(widthRatio: number): LayoutGridFraction {
  const boundedRatio = Math.max(1 / 8, Math.min(1, widthRatio))
  const fractions: Array<{ fraction: LayoutGridFraction; value: number }> = [
    { fraction: 'oneEighth', value: 1 / 8 },
    { fraction: 'quarter', value: 1 / 4 },
    { fraction: 'third', value: 1 / 3 },
    { fraction: 'half', value: 1 / 2 },
    { fraction: 'full', value: 1 },
  ]

  return fractions.reduce((closest, candidate) =>
    Math.abs(candidate.value - boundedRatio) < Math.abs(closest.value - boundedRatio) ? candidate : closest,
  ).fraction
}

export function createUserLayoutPreference(
  userId: string,
  displayName: string,
  sidebarItems: LayoutItem[],
  workspaceItems: Record<string, LayoutItem[]>,
): UserLayoutPreference {
  return {
    displayName,
    sidebar: createWorkspaceLayout(sidebarItems, true),
    userId,
    workspaces: Object.fromEntries(
      Object.entries(workspaceItems).map(([key, items]) => [key, createWorkspaceLayout(items, true)]),
    ),
  }
}

export function reorderUserSidebar(
  preference: UserLayoutPreference,
  draggedId: string,
  targetId: string,
): UserLayoutPreference {
  return {
    ...preference,
    sidebar: reorderWorkspaceLayout(preference.sidebar, draggedId, targetId),
  }
}

export function updateUserWorkspaceLayout(
  preference: UserLayoutPreference,
  workspaceId: string,
  layout: WorkspaceLayoutState,
): UserLayoutPreference {
  return {
    ...preference,
    workspaces: {
      ...preference.workspaces,
      [workspaceId]: layout,
    },
  }
}
