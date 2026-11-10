import { useMemo } from 'react'
import type { Resource } from '../types'

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
      const searchableText = `${nameNorm} ${categoriesNorm} ${addressNorm}`

      return terms.every((term) => searchableText.includes(term))
    })
  }, [resources, query])
}

