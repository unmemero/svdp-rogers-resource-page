import { useEffect, useId, useRef } from 'react'
import type { Translations } from '../types'

interface QrCodeModalProps {
  t: Translations
}

export function QrCodeModal({ t }: QrCodeModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const qrSvgUrl = `${import.meta.env.BASE_URL}qr-code.svg`

  // Fallback for browsers without native <dialog closedby="any"> support
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return
      const rect = dialog.getBoundingClientRect()
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width

      if (!isDialogContent) {
        dialog.close()
      }
    }

    dialog.addEventListener('click', handleBackdropClick)
    return () => dialog.removeEventListener('click', handleBackdropClick)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={t.qrButtonLabel}
        className="mx-auto mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-sky-800 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
          />
        </svg>
        <span>{t.qrButtonLabel}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        {...({ closedby: 'any' } as Record<string, string>)}
        className="m-auto w-full max-w-sm rounded-2xl border border-slate-300 bg-white p-0 text-slate-900 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <h2 id={titleId} className="text-lg font-bold text-slate-900 sm:text-xl">
            {t.qrModalTitle}
          </h2>

          <p className="text-sm text-slate-600">{t.qrModalDescription}</p>

          <img
            src={qrSvgUrl}
            alt="QR Code for SVdP Rogers Community Resources"
            width={240}
            height={240}
            className="h-60 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-xs"
          />

          <form
            method="dialog"
            className="flex w-full items-center justify-center border-t border-slate-200 pt-4"
          >
            <button
              type="submit"
              autoFocus
              className="rounded-lg bg-sky-800 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-sky-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              {t.qrCloseLabel}
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}
