export type SearchMatch = {
  exact: boolean
  matched: boolean
  matchedTerms: string[]
  score: number
}

function normalizeInternal(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\u3000\r\n\t]+/g, ' ')
    .replace(/[，。！？；、,.;:|/\\()（）【】\u005b\u005d{}<>《》-]+/g, ' ')
    .replace(/\s+/g, ' ')
}

export function normalizeSearchQuery(query: string) {
  return normalizeInternal(query)
}

export function splitSearchTerms(query: string) {
  return normalizeSearchQuery(query)
    .split(' ')
    .map((term) => term.trim())
    .filter(Boolean)
}

export function matchesSearchQuery(query: string, searchableText: string, keywords: string[] = []): SearchMatch {
  const normalizedQuery = normalizeSearchQuery(query)
  if (!normalizedQuery) {
    return {
      exact: false,
      matched: true,
      matchedTerms: [],
      score: 0,
    }
  }

  const normalizedText = normalizeSearchQuery(searchableText)
  const normalizedKeywords = keywords.map((keyword) => normalizeSearchQuery(keyword))
  const terms = splitSearchTerms(normalizedQuery)
  const matchedTerms = new Set<string>()
  let score = 0
  let exact = false

  if (normalizedText.includes(normalizedQuery)) {
    exact = true
    score += 100
  }

  const queryTerms = terms.length > 0 ? terms : [normalizedQuery]
  queryTerms.forEach((term) => {
    if (!term) return
    const matchedInText = normalizedText.includes(term)
    const matchedInKeyword = normalizedKeywords.some((keyword) => keyword.includes(term))

    if (matchedInText || matchedInKeyword) {
      matchedTerms.add(term)
      score += matchedInText ? 20 : 12
    }
  })

  const allTermsMatched =
    queryTerms.length > 0 &&
    queryTerms.every(
      (term) => normalizedText.includes(term) || normalizedKeywords.some((keyword) => keyword.includes(term)),
    )
  if (allTermsMatched) {
    score += 15
  }

  return {
    exact,
    matched: score > 0,
    matchedTerms: [...matchedTerms],
    score,
  }
}

export function buildSearchKeywordSuggestions(keywordPool: string[], query: string, limit = 6) {
  const normalizedQuery = normalizeSearchQuery(query)
  const counts = new Map<string, number>()

  keywordPool
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .forEach((keyword) => {
      const normalizedKeyword = normalizeSearchQuery(keyword)
      counts.set(normalizedKeyword, (counts.get(normalizedKeyword) ?? 0) + 1)
    })

  const rankedKeywords = [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'zh-Hans-CN'))
    .map(([keyword]) => keyword)

  if (!normalizedQuery) {
    return rankedKeywords.slice(0, limit)
  }

  const queryTerms = splitSearchTerms(normalizedQuery)
  const queryRelated = rankedKeywords.filter((keyword) =>
    keyword.includes(normalizedQuery) ||
    normalizedQuery.includes(keyword) ||
    queryTerms.some((term) => keyword.includes(term)),
  )

  if (queryRelated.length > 0) {
    return queryRelated.slice(0, limit)
  }

  return rankedKeywords.slice(0, limit)
}
