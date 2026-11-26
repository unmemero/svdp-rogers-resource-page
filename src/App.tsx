import { useEffect, useMemo, useRef, useState } from 'react'
import { CategoryFilter } from './components/CategoryFilter'
import { Layout } from './components/Layout'
import { MaterialIcon } from './components/MaterialIcon'
import { Pagination } from './components/Pagination'
import { ResourceCard } from './components/ResourceCard'
import { SearchBar } from './components/SearchBar'
import { CATEGORIES, SEARCH_NOTICES, TRANSLATIONS } from './data/categories'
import englishData from './data/english.json'
import spanishData from './data/spanish.json'
import { useSearch, useSearchNotices } from './hooks/useSearch'
import type { Language, PageSize, Resource } from './types'
import { exportResourcesToPdf } from './utils/exportPdf'

const RESOURCES_BY_LANG: Record<Language, Resource[]> = {
  en: englishData,
  es: spanishData,
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('preferred_language')
    if (saved === 'en' || saved === 'es') {
      return saved
    }
    const browserLang =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages[0]
        : navigator.language

    return browserLang?.toLowerCase().startsWith('es') ? 'es' : 'en'
  } catch {
    return 'en'
  }
}

export function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [pageSize, setPageSize] = useState<PageSize>(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const filterSectionRef = useRef<HTMLDivElement>(null)

  const t = TRANSLATIONS[language]
  const allResources = RESOURCES_BY_LANG[language]
  const filteredResources = useSearch(allResources, query, language, selectedCategory)
  const activeNotices = useSearchNotices(SEARCH_NOTICES[language], query)

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const resource of allResources) {
      for (const cat of resource.categories) {
        counts[cat] = (counts[cat] || 0) + 1
      }
    }
    return counts
  }, [allResources])

  const isFiltered = Boolean(query.trim() || selectedCategory)

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
    const nextLang: Language = language === 'en' ? 'es' : 'en'
    try {
      localStorage.setItem('preferred_language', nextLang)
    } catch {
      // ignore
    }

    // Preserve corresponding category selection across language switch
    setSelectedCategory((prev) => {
      if (!prev) return null
      const prevList = CATEGORIES[language]
      const nextList = CATEGORIES[nextLang]
      const index = (prevList as readonly string[]).indexOf(prev)
      if (index !== -1 && index < nextList.length) {
        return nextList[index]
      }
      return null
    })

    setLanguage(nextLang)
    setCurrentPage(1)
  }

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery)
    setCurrentPage(1)
  }

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleCardTagClick = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    filterSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClearAll = () => {
    setQuery('')
    setSelectedCategory(null)
    setCurrentPage(1)
  }

  const handleDownloadPdf = async () => {
    if (isExportingPdf || filteredResources.length === 0) return
    setIsExportingPdf(true)
    try {
      await exportResourcesToPdf({
        resources: filteredResources,
        language,
        t,
        selectedCategory,
        query,
      })
    } finally {
      setIsExportingPdf(false)
    }
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
      onDownloadPdf={handleDownloadPdf}
      isExportingPdf={isExportingPdf}
      canExportPdf={filteredResources.length > 0}
    >
      <div className="flex flex-col gap-6">
        <div ref={filterSectionRef} className="flex flex-col gap-3 scroll-mt-4">
          <SearchBar
            query={query}
            onChange={handleQueryChange}
            t={t}
          />

          <CategoryFilter
            categories={CATEGORIES[language]}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            categoryCounts={categoryCounts}
            totalCount={allResources.length}
            t={t}
          />
        </div>

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
                <ResourceCard
                  resource={resource}
                  t={t}
                  onSelectCategory={handleCardTagClick}
                />
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
            {isFiltered && (
              <button
                type="button"
                onClick={handleClearAll}
                className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-sky-800 px-5 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-sky-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <MaterialIcon name="close" className="h-5 w-5" />
                <span>{t.clearAllFilters}</span>
              </button>
            )}
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
