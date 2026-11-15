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

    // Precompute enriched searchable text for each candidate resource
    const enrichedResources = categoryFiltered.map((resource) => {
      const nameNorm = normalizeText(resource.name)
      const categoriesNorm = resource.categories.map(normalizeText).join(' ')
      const addressNorm = normalizeText(resource.address || '')
      const notesNorm = normalizeText(resource.notes || '')

      const extraSynonyms = resource.categories
        .flatMap((cat) => synonymsMap[cat] || [])
        .map(normalizeText)
        .join(' ')

      const searchableText = `${nameNorm} ${categoriesNorm} ${addressNorm} ${notesNorm} ${extraSynonyms}`
      return { resource, searchableText }
    })

    // Try matching all terms (AND query)
    const fullMatches = enrichedResources.filter(({ searchableText }) =>
      searchTerms.every((term) => searchableText.includes(term)),
    )

    if (fullMatches.length > 0 || searchTerms.length <= 1) {
      return fullMatches.map(({ resource }) => resource)
    }

    // Fall back to matching any term (OR query) sorted by match count
    const partialMatches = enrichedResources
      .map(({ resource, searchableText }) => {
        const matchCount = searchTerms.reduce(
          (count, term) => (searchableText.includes(term) ? count + 1 : count),
          0,
        )
        return { resource, matchCount }
      })
      .filter(({ matchCount }) => matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount)

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
