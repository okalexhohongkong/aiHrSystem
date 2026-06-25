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

type PersistedEnvelope<T> = {
  updatedAt: string
  value: T
  version: number
}

export type PersistenceWriteResult = {
  ok: boolean
  reason?: 'storage-unavailable'
}

function isPersistedEnvelope<T>(value: unknown): value is PersistedEnvelope<T> {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<PersistedEnvelope<T>>

  return candidate.version === localPersistenceVersion && 'value' in candidate
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

export function browserLocalStorage() {
  if (typeof window === 'undefined') return undefined

  try {
    return window.localStorage
  } catch {
    return undefined
  }
}
