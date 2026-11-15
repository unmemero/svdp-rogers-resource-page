import { useEffect, useId, useRef, useState } from 'react'
import { MaterialIcon } from './MaterialIcon'
import { CATEGORY_ICONS } from '../data/categories'
import type { Translations } from '../types'

interface CategoryFilterProps {
  categories: readonly string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  t: Translations
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  t,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const labelId = useId()

  const selectedIndex = selectedCategory
    ? categories.indexOf(selectedCategory)
    : -1

  const activeIcon = selectedIndex !== -1
    ? (CATEGORY_ICONS[selectedIndex] || 'apps')
    : 'apps'

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (category: string | null) => {
    onSelectCategory(category)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center justify-between pb-1.5">
        <label
          id={labelId}
          htmlFor={listboxId}
          className="text-sm font-bold text-slate-700 sm:text-base"
        >
          {t.categoriesSectionLabel}
        </label>
        {selectedCategory && (
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-800 underline hover:text-sky-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:text-sm"
          >
            <MaterialIcon name="close" className="h-3.5 w-3.5" />
            <span>{t.clearCategoryFilter}</span>
          </button>
        )}
      </div>

      {/* Collapsible trigger */}
      <button
        id={listboxId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${labelId} ${listboxId}`}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-left shadow-sm transition hover:border-sky-700 hover:bg-slate-50/50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <MaterialIcon
            name={activeIcon}
            className={`h-5 w-5 shrink-0 ${
              selectedCategory ? 'text-sky-800' : 'text-slate-600'
            }`}
          />
          <span className="truncate text-sm font-semibold text-slate-900 sm:text-base">
            {selectedCategory || t.allCategoriesLabel}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-2">
          {selectedCategory && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t.clearCategoryFilter}
              onClick={(e) => {
                e.stopPropagation()
                handleSelect(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                  handleSelect(null)
                }
              }}
              className="inline-flex items-center justify-center rounded-md p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-sky-700"
            >
              <MaterialIcon name="close" className="h-4 w-4" />
            </span>
          )}
          <MaterialIcon
            name="expand_more"
            className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-sky-800' : ''
            }`}
          />
        </span>
      </button>

      {/* Collapsible dropdown menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-labelledby={labelId}
          className="absolute z-30 mt-1.5 max-h-80 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5"
        >
          {/* Option: All categories */}
          <button
            type="button"
            role="option"
            aria-selected={selectedCategory === null}
            onClick={() => handleSelect(null)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition sm:text-base ${
              selectedCategory === null
                ? 'bg-sky-50 font-bold text-sky-950'
                : 'font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            } focus-visible:outline-2 focus-visible:outline-sky-700`}
          >
            <span className="flex items-center gap-2.5">
              <MaterialIcon
                name="apps"
                className={`h-5 w-5 shrink-0 ${
                  selectedCategory === null ? 'text-sky-800' : 'text-slate-500'
                }`}
              />
              <span>{t.allCategoriesLabel}</span>
            </span>
            {selectedCategory === null && (
              <MaterialIcon name="check" className="h-5 w-5 text-sky-800" />
            )}
          </button>

          <div className="my-1 border-t border-slate-100" />

          {/* Individual Category options */}
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category
            const iconName = CATEGORY_ICONS[index] || 'apps'

            return (
              <button
                key={category}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(category)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition sm:text-base ${
                  isSelected
                    ? 'bg-sky-50 font-bold text-sky-950'
                    : 'font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                } focus-visible:outline-2 focus-visible:outline-sky-700`}
              >
                <span className="flex items-center gap-2.5">
                  <MaterialIcon
                    name={iconName}
                    className={`h-5 w-5 shrink-0 ${
                      isSelected ? 'text-sky-800' : 'text-sky-700'
                    }`}
                  />
                  <span>{category}</span>
                </span>
                {isSelected && (
                  <MaterialIcon name="check" className="h-5 w-5 text-sky-800" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
