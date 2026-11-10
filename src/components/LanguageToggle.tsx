import type { Language } from '../types'

interface LanguageToggleProps {
  language: Language
  label: string
  onToggle: () => void
}

export function LanguageToggle({ language, label, onToggle }: LanguageToggleProps) {
  const targetLang = language === 'en' ? 'es' : 'en'

  return (
    <button
      type="button"
      onClick={onToggle}
      lang={targetLang}
      className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/80 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-sky-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
      <span>{label}</span>
    </button>
  )
}

