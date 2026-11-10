import { FEEDBACK_EMAIL } from '../data/categories'

interface FeedbackButtonProps {
  label: string
  subject: string
}

export function FeedbackButton({ label, subject }: FeedbackButtonProps) {
  const mailtoHref = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}`

  return (
    <a
      href={mailtoHref}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-300 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
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
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <span>{label}</span>
    </a>
  )
}

