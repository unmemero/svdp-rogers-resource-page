import type { Resource, Translations } from '../types'

interface ResourceCardProps {
  resource: Resource
  t: Translations
}

function formatPhoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits}`
}

export function ResourceCard({ resource, t }: ResourceCardProps) {
  return (
    <article className="resource-card flex flex-col justify-between gap-4 rounded-xl border border-slate-300 bg-white p-5 shadow-sm transition hover:border-sky-700/60 hover:shadow-md">
      <header className="flex flex-col gap-2.5">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          {resource.name}
        </h2>
        {resource.categories.length > 0 && (
          <ul
            role="list"
            className="flex flex-wrap gap-1.5"
            aria-label="Categories"
          >
            {resource.categories.map((category) => (
              <li
                key={category}
                className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900 sm:text-sm"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </header>

      <dl className="grid grid-cols-1 gap-3 border-t border-slate-200 pt-3.5 text-sm sm:text-base">
        {resource.phone && (
          <div className="flex items-start gap-2.5">
            <dt className="font-semibold text-slate-700 shrink-0">
              {t.phoneLabel}:
            </dt>
            <dd className="min-w-0">
              <a
                href={formatPhoneHref(resource.phone)}
                className="font-semibold text-sky-800 underline decoration-2 underline-offset-2 hover:text-sky-950 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                {resource.phone}
              </a>
            </dd>
          </div>
        )}

        {resource.address && (
          <div className="flex items-start gap-2.5">
            <dt className="font-semibold text-slate-700 shrink-0">
              {t.addressLabel}:
            </dt>
            <dd className="min-w-0 text-slate-800">{resource.address}</dd>
          </div>
        )}

        {resource.website && (
          <div className="flex items-start gap-2.5">
            <dt className="font-semibold text-slate-700 shrink-0">
              {t.websiteLabel}:
            </dt>
            <dd className="min-w-0">
              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sky-800 underline decoration-2 underline-offset-2 hover:text-sky-950 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                {t.visitWebsite}
                <span className="visually-hidden"> ({resource.name})</span>
              </a>
            </dd>
          </div>
        )}

        {resource.email && (
          <div className="flex items-start gap-2.5">
            <dt className="font-semibold text-slate-700 shrink-0">
              {t.emailLabel}:
            </dt>
            <dd className="min-w-0">
              <a
                href={`mailto:${resource.email}`}
                className="font-semibold text-sky-800 underline decoration-2 underline-offset-2 hover:text-sky-950 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                {resource.email}
              </a>
            </dd>
          </div>
        )}

        {resource.notes && (
          <div className="flex items-start gap-2.5">
            <dt className="font-semibold text-slate-700 shrink-0">
              {t.notesLabel}:
            </dt>
            <dd className="min-w-0 text-slate-800">{resource.notes}</dd>
          </div>
        )}
      </dl>
    </article>
  )
}
