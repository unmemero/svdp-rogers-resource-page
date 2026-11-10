import type { ReactNode } from 'react'
import type { Language, Translations } from '../types'
import { Header } from './Header'

interface LayoutProps {
  language: Language
  t: Translations
  onToggleLanguage: () => void
  children: ReactNode
}

export function Layout({ language, t, onToggleLanguage, children }: LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <Header
        language={language}
        t={t}
        onToggleLanguage={onToggleLanguage}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>

      <footer className="border-t border-slate-300 bg-white px-4 py-6 text-slate-700 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 text-xs leading-relaxed sm:text-sm">
          <p>{t.disclaimerAvailability}</p>
          <p>{t.disclaimerAccuracy}</p>
        </div>
      </footer>
    </div>
  )
}

