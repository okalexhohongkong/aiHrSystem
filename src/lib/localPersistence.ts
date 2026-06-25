export const localPersistenceVersion = 1

export const localPersistenceKeys = {
  bossRecruitingImportedCandidates: 'heiwenshi.aihr.v1.bossRecruitingImportedCandidates',
  bossRecruitingWorkflowState: 'heiwenshi.aihr.v1.bossRecruitingWorkflowState',
  candidates: 'heiwenshi.aihr.v1.candidates',
  firstEvaluationDimensionOrders: 'heiwenshi.aihr.v1.firstEvaluationDimensionOrders',
  firstEvaluationManualDimensions: 'heiwenshi.aihr.v1.firstEvaluationManualDimensions',
  interfaceSettings: 'heiwenshi.aihr.v1.interfaceSettings',
  jobPublishingCards: 'heiwenshi.aihr.v1.jobPublishingCards',
  jobQuestionnaireCards: 'heiwenshi.aihr.v1.jobQuestionnaireCards',
  layoutProfileId: 'heiwenshi.aihr.v1.layoutProfileId',
  layoutProfiles: 'heiwenshi.aihr.v1.layoutProfiles',
  theme: 'heiwenshi.aihr.v1.theme',
  threeStageHomeworkTasks: 'heiwenshi.aihr.v1.threeStageHomeworkTasks',
} as const

export type LocalPersistenceKey = (typeof localPersistenceKeys)[keyof typeof localPersistenceKeys]
export const allLocalPersistenceKeys = Object.values(localPersistenceKeys)

type PersistedEnvelope<T> = {
  updatedAt: string
  value: T
  version: number
}

export type PersistenceWriteResult = {
  ok: boolean
  reason?: 'storage-unavailable'
}

export type LocalPersistenceSnapshot = {
  exportedAt: string
  values: Partial<Record<LocalPersistenceKey, unknown>>
  version: number
}

export type PersistenceRestoreResult = {
  ok: boolean
  reason?: 'invalid-snapshot' | 'storage-unavailable'
  restoredKeys: LocalPersistenceKey[]
}

function isPersistedEnvelope<T>(value: unknown): value is PersistedEnvelope<T> {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<PersistedEnvelope<T>>

  return candidate.version === localPersistenceVersion && 'value' in candidate
}

function isKnownLocalPersistenceKey(key: string): key is LocalPersistenceKey {
  return allLocalPersistenceKeys.includes(key as LocalPersistenceKey)
}

function isLocalPersistenceSnapshot(value: unknown): value is LocalPersistenceSnapshot {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<LocalPersistenceSnapshot>

  return (
    candidate.version === localPersistenceVersion &&
    !!candidate.values &&
    typeof candidate.values === 'object' &&
    !Array.isArray(candidate.values)
  )
}

export function readPersistedValue<T>(storage: Storage | undefined, key: LocalPersistenceKey, fallback: T): T {
  if (!storage) return fallback

  try {
    const raw = storage.getItem(key)
    if (!raw) return fallback

    const parsed = JSON.parse(raw) as unknown
    if (!isPersistedEnvelope<T>(parsed)) return fallback

    return parsed.value
  } catch {
    return fallback
  }
}

export function writePersistedValue<T>(
  storage: Storage | undefined,
  key: LocalPersistenceKey,
  value: T,
): PersistenceWriteResult {
  if (!storage) {
    return { ok: false, reason: 'storage-unavailable' }
  }

  try {
    const envelope: PersistedEnvelope<T> = {
      updatedAt: new Date().toISOString(),
      value,
      version: localPersistenceVersion,
    }
    storage.setItem(key, JSON.stringify(envelope))
    return { ok: true }
  } catch {
    return { ok: false, reason: 'storage-unavailable' }
  }
}

export function createLocalPersistence<T>(storage: Storage | undefined, key: LocalPersistenceKey, fallback: T) {
  return {
    read() {
      return readPersistedValue(storage, key, fallback)
    },
    write(value: T) {
      return writePersistedValue(storage, key, value)
    },
  }
}

export function exportPersistedValues(storage: Storage | undefined): LocalPersistenceSnapshot {
  const values: LocalPersistenceSnapshot['values'] = {}

  if (storage) {
    for (const key of allLocalPersistenceKeys) {
      const value = readPersistedValue<unknown>(storage, key, undefined)
      if (value !== undefined) values[key] = value
    }
  }

  return {
    exportedAt: new Date().toISOString(),
    values,
    version: localPersistenceVersion,
  }
}

export function restorePersistedValues(
  storage: Storage | undefined,
  snapshot: unknown,
): PersistenceRestoreResult {
  if (!storage) {
    return { ok: false, reason: 'storage-unavailable', restoredKeys: [] }
  }

  if (!isLocalPersistenceSnapshot(snapshot)) {
    return { ok: false, reason: 'invalid-snapshot', restoredKeys: [] }
  }

  const restoredKeys: LocalPersistenceKey[] = []

  for (const [key, value] of Object.entries(snapshot.values)) {
    if (!isKnownLocalPersistenceKey(key)) continue
    const result = writePersistedValue(storage, key, value)
    if (!result.ok) {
      return { ok: false, reason: result.reason, restoredKeys }
    }
    restoredKeys.push(key)
  }

  return { ok: true, restoredKeys }
}

export function clearPersistedValues(storage: Storage | undefined) {
  if (!storage) {
    return { ok: false, reason: 'storage-unavailable' as const, clearedKeys: [] as LocalPersistenceKey[] }
  }

  const clearedKeys: LocalPersistenceKey[] = []
  try {
    for (const key of allLocalPersistenceKeys) {
      storage.removeItem(key)
      clearedKeys.push(key)
    }
    return { ok: true, clearedKeys }
  } catch {
    return { ok: false, reason: 'storage-unavailable' as const, clearedKeys }
  }
}

export function browserLocalStorage() {
  if (typeof window === 'undefined') return undefined

  try {
    return window.localStorage
  } catch {
    return undefined
  }
}
