import { useId } from 'react'
import type { PageSize, Translations } from '../types'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: PageSize
  onPageChange: (page: number) => void
  onPageSizeChange: (size: PageSize) => void
  t: Translations
}

const PAGE_SIZES: PageSize[] = [10, 20, 50]

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  t,
}: PaginationProps) {
  const groupId = useId()

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-4 rounded-xl border border-slate-300 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0 m-0">
        <legend className="float-left mr-2 text-sm font-semibold text-slate-800 sm:text-base">
          {t.itemsPerPage}
        </legend>
        <div className="inline-flex items-center gap-2">
          {PAGE_SIZES.map((size) => {
            const inputId = `${groupId}-size-${size}`
            const isSelected = pageSize === size
            return (
              <div key={size} className="inline-flex items-center">
                <input
                  type="radio"
                  id={inputId}
                  name={`page-size-${groupId}`}
                  value={size}
                  checked={isSelected}
                  onChange={() => onPageSizeChange(size)}
                  className="h-4 w-4 accent-sky-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                />
                <label
                  htmlFor={inputId}
                  className="ml-1.5 cursor-pointer py-1 pr-2 text-sm font-semibold text-slate-900 sm:text-base"
                >
                  {size}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>

      <div className="toolbar flex flex-wrap items-center justify-between gap-3 sm:justify-end">
        <span className="text-sm font-semibold text-slate-800 sm:text-base">
          {t.pageOf(currentPage, Math.max(1, totalPages))}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="inline-flex items-center justify-center rounded-lg border-2 border-slate-400 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            {t.previousPage}
          </button>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="inline-flex items-center justify-center rounded-lg border-2 border-slate-400 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            {t.nextPage}
          </button>
        </div>
      </div>
    </nav>
  )
}

