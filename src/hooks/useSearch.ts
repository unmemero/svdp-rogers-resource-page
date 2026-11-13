import { useMemo } from 'react'
import type { Resource, SearchNotice } from '../types'

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function useSearch(resources: Resource[], query: string): Resource[] {
  return useMemo(() => {
    const normalizedQuery = normalizeText(query)
    if (!normalizedQuery) {
      return resources
    }

    const terms = normalizedQuery.split(/\s+/).filter(Boolean)

    return resources.filter((resource) => {
      const nameNorm = normalizeText(resource.name)
      const categoriesNorm = resource.categories.map(normalizeText).join(' ')
      const addressNorm = normalizeText(resource.address || '')
      const notesNorm = normalizeText(resource.notes || '')
      const searchableText = `${nameNorm} ${categoriesNorm} ${addressNorm} ${notesNorm}`

      return terms.every((term) => searchableText.includes(term))
    })
  }, [resources, query])
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
