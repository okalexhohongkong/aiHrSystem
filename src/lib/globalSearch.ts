import { buildSearchKeywordSuggestions, matchesSearchQuery, type SearchMatch } from './search'

export type GlobalSearchEntry = {
  candidateId?: number
  detail: string
  id: string
  kind: string
  keywords: string[]
  section: string
  sectionId?: string
  title: string
}

export type GlobalSearchHit = GlobalSearchEntry &
  SearchMatch & {
    sectionScore: number
  }

function normalizeKeywords(entries: GlobalSearchEntry[]) {
  return entries.flatMap((entry) => [entry.title, entry.detail, ...entry.keywords]).filter(Boolean)
}

export function buildGlobalSearchKeywordPool(entries: GlobalSearchEntry[]) {
  return buildSearchKeywordSuggestions(normalizeKeywords(entries), '')
}

export function searchGlobalEntries(query: string, entries: GlobalSearchEntry[], limit = 12) {
  const normalizedQuery = query.trim()
  if (!normalizedQuery) return []

  return entries
    .map<GlobalSearchHit>((entry, index) => {
      const match = matchesSearchQuery(normalizedQuery, [entry.title, entry.detail, ...entry.keywords].join(' '), entry.keywords)
      return {
        ...entry,
        ...match,
        sectionScore: match.score + Math.max(0, 50 - index),
      }
    })
    .filter((entry) => entry.matched)
    .sort((left, right) => right.sectionScore - left.sectionScore || right.score - left.score)
    .slice(0, limit)
}

export function buildSearchResultKeywords(entries: GlobalSearchEntry[], query: string, limit = 8) {
  const pool = normalizeKeywords(entries)
  return buildSearchKeywordSuggestions(pool, query, limit)
}
