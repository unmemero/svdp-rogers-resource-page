import { useEffect, useRef } from 'react'
import type { Translations } from '../types'

interface QrCodeModalProps {
  t: Translations
}

export function QrCodeModal({ t }: QrCodeModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
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
        aria-label={t.qrButtonLabel}
        {...({ closedby: 'any' } as Record<string, string>)}
        className="m-auto w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-slate-300 bg-white p-0 text-slate-900 shadow-2xl"
      >
        <div className="relative flex flex-col items-center justify-center p-4 pt-12 sm:p-6 sm:pt-14">
          <form method="dialog" className="absolute top-3 right-3">
            <button
              type="submit"
              autoFocus
              aria-label={t.qrCloseLabel}
              className="icon-button inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>

          <img
            src={qrSvgUrl}
            alt={t.qrButtonLabel}
            width={360}
            height={360}
            className="aspect-square w-full max-w-[340px] rounded-xl bg-white"
          />
        </div>
      </dialog>
    </>
  )
}
