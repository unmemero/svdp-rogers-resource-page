import type { ReactNode } from 'react'
import { LAST_UPDATED, LAST_UPDATED_ES } from '../data/categories'
import type { Language, Translations } from '../types'
import { Header } from './Header'
import { MaterialIcon } from './MaterialIcon'
import { QrCodeModal } from './QrCodeModal'

interface LayoutProps {
  language: Language
  t: Translations
  onToggleLanguage: () => void
  onDownloadPdf?: () => void
  isExportingPdf?: boolean
  canExportPdf?: boolean
  children: ReactNode
}

export function Layout({
  language,
  t,
  onToggleLanguage,
  onDownloadPdf,
  isExportingPdf = false,
  canExportPdf = true,
  children,
}: LayoutProps) {
  const lastUpdate = language === 'en' ? LAST_UPDATED : LAST_UPDATED_ES

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
        <div className="mx-auto flex max-w-5xl flex-col gap-2 text-center text-xs leading-relaxed sm:text-sm">
          <p>{t.disclaimerAccuracy}</p>
          <p className="mt-2 border-t border-slate-200 pt-3 font-semibold text-slate-900">
            {t.footerAttribution(lastUpdate)}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <QrCodeModal t={t} />
            {onDownloadPdf && canExportPdf && (
              <button
                type="button"
                onClick={onDownloadPdf}
                disabled={isExportingPdf}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-800 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-800 disabled:cursor-wait disabled:opacity-60"
              >
                <MaterialIcon name="print" className="h-5 w-5 shrink-0 text-white" />
                <span>
                  {isExportingPdf ? t.downloadingPdfLabel : t.downloadPdfLabel}
                </span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}

