import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { Pagination } from './components/Pagination'
import { ResourceCard } from './components/ResourceCard'
import { SearchBar } from './components/SearchBar'
import { SEARCH_NOTICES, TRANSLATIONS } from './data/categories'
import englishData from './data/english.json'
import spanishData from './data/spanish.json'
import { useSearch, useSearchNotices } from './hooks/useSearch'
import type { Language, PageSize, Resource } from './types'

const RESOURCES_BY_LANG: Record<Language, Resource[]> = {
  en: englishData,
  es: spanishData,
}

export function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [query, setQuery] = useState('')
  const [pageSize, setPageSize] = useState<PageSize>(10)
  const [currentPage, setCurrentPage] = useState(1)

  const t = TRANSLATIONS[language]
  const allResources = RESOURCES_BY_LANG[language]
  const filteredResources = useSearch(allResources, query)
  const activeNotices = useSearchNotices(SEARCH_NOTICES[language], query)

  const totalPages = Math.max(1, Math.ceil(filteredResources.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const paginatedResources = filteredResources.slice(
    startIndex,
    startIndex + pageSize,
  )

  useEffect(() => {
    document.documentElement.lang = language
    document.title = `${t.siteTitle} | ${t.siteSubtitle}`
  }, [language, t.siteTitle, t.siteSubtitle])

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'))
    setCurrentPage(1)
  }

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery)
    setCurrentPage(1)
  }

  const handlePageSizeChange = (newSize: PageSize) => {
    setPageSize(newSize)
    setCurrentPage(1)
  }

  return (
    <Layout
      language={language}
      t={t}
      onToggleLanguage={handleToggleLanguage}
    >
      <div className="flex flex-col gap-6">
        <SearchBar
          query={query}
          onChange={handleQueryChange}
          t={t}
        />

        {activeNotices.length > 0 && (
          <div className="flex flex-col gap-3" role="region" aria-label="Special notices">
            {activeNotices.map((notice) => (
              <div
                key={notice.id}
                className="rounded-xl border-2 border-amber-500 bg-amber-50 p-4 text-amber-950 shadow-sm"
              >
                <p className="text-sm font-bold sm:text-base">{notice.title}</p>
                <p className="mt-1 text-sm leading-relaxed">{notice.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between px-1">
          <p
            role="status"
            aria-live="polite"
            className="text-sm font-semibold text-slate-700 sm:text-base"
          >
            {t.resultsCount(paginatedResources.length, filteredResources.length)}
          </p>
        </div>

        {paginatedResources.length > 0 ? (
          <ul
            role="list"
            className="resource-list grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {paginatedResources.map((resource) => (
              <li key={resource.name} className="flex flex-col">
                <ResourceCard resource={resource} t={t} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-slate-300 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              {t.noResultsTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              {t.noResultsDescription}
            </p>
          </div>
        )}

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
          t={t}
        />
      </div>
    </Layout>
  )
}

export default App
