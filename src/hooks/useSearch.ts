import { useMemo } from 'react'
import { CATEGORY_SYNONYMS, STOPWORDS } from '../data/categories'
import type { Language, Resource, SearchNotice } from '../types'

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function matchesTerm(text: string, term: string): boolean {
  if (text.includes(term)) return true
  if (term.length > 3 && term.endsWith('s') && text.includes(term.slice(0, -1))) {
    return true
  }
  return false
}

export function useSearch(
  resources: Resource[],
  query: string,
  language: Language = 'en',
  selectedCategory: string | null = null,
): Resource[] {
  return useMemo(() => {
    // 1. Filter by category if selected
    const categoryFiltered = selectedCategory
      ? resources.filter((resource) =>
          resource.categories.includes(selectedCategory),
        )
      : resources

    const normalizedQuery = normalizeText(query)
    if (!normalizedQuery) {
      return categoryFiltered
    }

    const rawTerms = normalizedQuery.split(/\s+/).filter(Boolean)
    const stopwords = STOPWORDS[language] || new Set<string>()
    const meaningfulTerms = rawTerms.filter((term) => !stopwords.has(term))
    const searchTerms = meaningfulTerms.length > 0 ? meaningfulTerms : rawTerms

    const synonymsMap = CATEGORY_SYNONYMS[language] || {}

    // Precompute direct text (name, address, notes, per-org keywords) vs broad category synonyms
    const enrichedResources = categoryFiltered.map((resource, index) => {
      const nameNorm = normalizeText(resource.name)
      const categoriesNorm = resource.categories.map(normalizeText).join(' ')
      const addressNorm = normalizeText(resource.address || '')
      const notesNorm = normalizeText(resource.notes || '')
      const keywordsNorm = (resource.keywords || []).map(normalizeText).join(' ')

      const directText = `${nameNorm} ${addressNorm} ${notesNorm} ${keywordsNorm}`

      const extraSynonyms = resource.categories
        .flatMap((cat) => synonymsMap[cat] || [])
        .map(normalizeText)
        .join(' ')

      const searchableText = `${directText} ${categoriesNorm} ${extraSynonyms}`
      return { resource, index, directText, searchableText }
    })

    const scoreDirectMatches = (directText: string): number => {
      let score = 0
      if (directText.includes(normalizedQuery)) score += 3
      for (const term of searchTerms) {
        if (matchesTerm(directText, term)) score += 2
      }
      return score
    }

    // Try matching all terms (AND query)
    const fullMatches = enrichedResources
      .filter(({ searchableText }) =>
        searchTerms.every((term) => matchesTerm(searchableText, term)),
      )
      .map((entry) => ({
        ...entry,
        directScore: scoreDirectMatches(entry.directText),
      }))
      .sort((a, b) => b.directScore - a.directScore || a.index - b.index)

    if (fullMatches.length > 0 || searchTerms.length <= 1) {
      return fullMatches.map(({ resource }) => resource)
    }

    // Fall back to matching any term (OR query) sorted by match count then direct match score
    const partialMatches = enrichedResources
      .map((entry) => {
        const matchCount = searchTerms.reduce(
          (count, term) => (matchesTerm(entry.searchableText, term) ? count + 1 : count),
          0,
        )
        return {
          ...entry,
          matchCount,
          directScore: scoreDirectMatches(entry.directText),
        }
      })
      .filter(({ matchCount }) => matchCount > 0)
      .sort(
        (a, b) =>
          b.matchCount - a.matchCount ||
          b.directScore - a.directScore ||
          a.index - b.index,
      )

    return partialMatches.map(({ resource }) => resource)
  }, [resources, query, language, selectedCategory])
}

export function useSearchNotices(
  notices: SearchNotice[],
  query: string,
): SearchNotice[] {
  return useMemo(() => {
    const normalizedQuery = normalizeText(query)
    if (!normalizedQuery || normalizedQuery.length < 3) {
      return []
    }

    const queryWords = normalizedQuery.split(/\s+/).filter(Boolean)

    return notices.filter((notice) =>
      notice.keywords.some((kw) => {
        const normKw = normalizeText(kw)
        return (
          normalizedQuery.includes(normKw) ||
          queryWords.some((word) => word.length >= 4 && normKw.startsWith(word))
        )
      }),
    )
  }, [notices, query])
}
