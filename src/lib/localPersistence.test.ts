import { describe, expect, it, vi } from 'vitest'
import {
  createLocalPersistence,
  localPersistenceKeys,
  readPersistedValue,
  writePersistedValue,
} from './localPersistence'

function memoryStorage(): Storage {
  const data = new Map<string, string>()

  return {
    clear: vi.fn(() => data.clear()),
    getItem: vi.fn((key: string) => data.get(key) ?? null),
    key: vi.fn((index: number) => Array.from(data.keys())[index] ?? null),
    get length() {
      return data.size
    },
    removeItem: vi.fn((key: string) => {
      data.delete(key)
    }),
    setItem: vi.fn((key: string, value: string) => {
      data.set(key, value)
    }),
  }
}

describe('local persistence', () => {
  it('writes and reads versioned values from browser storage', () => {
    const storage = memoryStorage()
    const result = writePersistedValue(storage, localPersistenceKeys.candidates, [{ id: 1, name: '李晨' }])

    expect(result.ok).toBe(true)
    expect(readPersistedValue(storage, localPersistenceKeys.candidates, [])).toEqual([{ id: 1, name: '李晨' }])
  })

  it('falls back when storage contains invalid data or an old version', () => {
    const storage = memoryStorage()

    storage.setItem(localPersistenceKeys.candidates, '{bad-json')
    expect(readPersistedValue(storage, localPersistenceKeys.candidates, [{ id: 2 }])).toEqual([{ id: 2 }])

    storage.setItem(localPersistenceKeys.candidates, JSON.stringify({ version: 0, value: [{ id: 1 }] }))
    expect(readPersistedValue(storage, localPersistenceKeys.candidates, [{ id: 3 }])).toEqual([{ id: 3 }])
  })

  it('keeps the app usable when local storage is unavailable', () => {
    const storage = {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
    } as unknown as Storage

    expect(readPersistedValue(storage, localPersistenceKeys.interfaceSettings, { fontSize: 14 })).toEqual({
      fontSize: 14,
    })
    expect(writePersistedValue(storage, localPersistenceKeys.interfaceSettings, { fontSize: 15 })).toEqual({
      ok: false,
      reason: 'storage-unavailable',
    })
  })

  it('creates a typed persistence adapter for a single key', () => {
    const storage = memoryStorage()
    const persistence = createLocalPersistence<{ name: string }>(storage, localPersistenceKeys.jobPublishingCards, {
      name: '默认岗位',
    })

    expect(persistence.read()).toEqual({ name: '默认岗位' })
    expect(persistence.write({ name: '业务经理' }).ok).toBe(true)
    expect(persistence.read()).toEqual({ name: '业务经理' })
  })

  it('reserves single-machine storage keys for the D1 usable data surface', () => {
    expect(localPersistenceKeys).toMatchObject({
      candidates: expect.any(String),
      firstEvaluationDimensionOrders: expect.any(String),
      firstEvaluationManualDimensions: expect.any(String),
      interfaceSettings: expect.any(String),
      jobPublishingCards: expect.any(String),
      jobQuestionnaireCards: expect.any(String),
      layoutProfileId: expect.any(String),
      layoutProfiles: expect.any(String),
      theme: expect.any(String),
      threeStageHomeworkTasks: expect.any(String),
    })
  })
})
