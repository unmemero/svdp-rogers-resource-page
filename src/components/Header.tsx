import type { Language, Translations } from '../types'
import { FeedbackButton } from './FeedbackButton'
import { LanguageToggle } from './LanguageToggle'

interface HeaderProps {
  language: Language
  t: Translations
  onToggleLanguage: () => void
}

export function Header({ language, t, onToggleLanguage }: HeaderProps) {
  return (
    <header className="bg-sky-900 text-white shadow-md">
      <a href="#main-heading" className="visually-hidden skip-link">
        {t.skipToContent}
      </a>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0">
          <h1
            id="main-heading"
            tabIndex={-1}
            className="text-xl font-bold tracking-tight text-white sm:text-2xl focus:outline-none"
          >
            {t.siteTitle}
          </h1>
          <p className="mt-1 text-sm text-sky-100 sm:text-base">{t.siteSubtitle}</p>
        </div>

        <div className="toolbar flex flex-wrap items-center gap-3">
          <LanguageToggle
            language={language}
            label={t.languageToggleLabel}
            onToggle={onToggleLanguage}
          />
          <FeedbackButton label={t.feedbackButton} subject={t.feedbackSubject} />
        </div>
      </div>
    </header>
  )
}

