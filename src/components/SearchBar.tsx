import { useId } from 'react'
import type { Translations } from '../types'

interface SearchBarProps {
  query: string
  onChange: (value: string) => void
  t: Translations
}

export function SearchBar({ query, onChange, t }: SearchBarProps) {
  const inputId = useId()

  return (
    <search className="w-full">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor={inputId}
            className="text-base font-bold text-slate-900 sm:text-lg"
          >
            {t.searchLabel}
          </label>
        </div>

        <div className="relative mt-2 flex items-center">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 h-5 w-5 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            id={inputId}
            name="q"
            type="search"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
            className="w-full rounded-lg border-2 border-slate-500 bg-white py-3 pr-12 pl-11 text-base text-slate-900 placeholder:text-slate-500 focus-visible:border-sky-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          />
          {query && (
            <button
              type="button"
              onClick={() => onChange('')}
              aria-label={t.clearSearch}
              className="icon-button absolute right-2 inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
    </search>
  )
}

