import type { Language, SearchNotice, Translations } from '../types'

export const FEEDBACK_EMAIL = 'feedback@svdp-rogers.org'
export const LAST_UPDATED = 'November 2026'
export const LAST_UPDATED_ES = 'Noviembre 2026'

export const CATEGORIES = {
  en: [
    'Food Pantries & Meals',
    'Financial Assistance',
    'Emergency Shelters',
    'Transitional Living',
    'Housing Assistance',
    'Clothing and household items',
    'Medical & Dental',
    'Laundry Assistance',
    'Mental Health',
    'Important Contacts',
  ],
  es: [
    'Despensas de Alimentos y Comidas',
    'Asistencia Financiera',
    'Refugios de Emergencia',
    'Vivienda de Transición',
    'Asistencia de Vivienda',
    'Ropa y artículos del hogar',
    'Asistencia Médica y Dental',
    'Asistencia de Lavandería',
    'Salud Mental',
    'Contactos Importantes',
  ],
} as const

export const SEARCH_NOTICES: Record<Language, SearchNotice[]> = {
  en: [
    {
      id: 'mental-health-school-notice',
      keywords: [
        'mental health',
        'mental',
        'counseling',
        'counselor',
        'behavioral',
        'therapy',
        'school',
      ],
      title: 'Note on Mental Health Services',
      message:
        "School-based mental health services are offered in all of our schools. Please see your child's school counselor for options and a referral. The below list of mental health agencies is only a partial list. This list is not an endorsement of services.",
    },
  ],
  es: [
    {
      id: 'mental-health-school-notice',
      keywords: [
        'salud mental',
        'mental',
        'consejeria',
        'consejero',
        'conductual',
        'terapia',
        'escuela',
        'escolar',
      ],
      title: 'Nota sobre Servicios de Salud Mental',
      message:
        'Se ofrecen servicios de salud mental en todas nuestras escuelas. Por favor consulte al consejero escolar de su hijo(a) para conocer las opciones y obtener una referencia. La siguiente lista de agencias de salud mental es solo una lista parcial. Esta lista no constituye un respaldo de los servicios.',
    },
  ],
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    siteTitle: 'Society of St. Vincent de Paul - Rogers, AR',
    siteSubtitle: 'Community Resources',
    skipToContent: 'Skip to main content',
    searchLabel: 'Search community resources',
    searchPlaceholder: 'Organization, category, or ZIP code',
    clearSearch: 'Clear search',
    resultsCount: (shown, total) =>
      `Showing ${shown} of ${total} ${total === 1 ? 'resource' : 'resources'}`,
    noResultsTitle: 'No matching resources found',
    noResultsDescription:
      'Try searching a simpler keyword, category (like "Food" or "Shelter"), or a 5-digit ZIP code (like 72756).',
    phoneLabel: 'Phone',
    addressLabel: 'Address',
    websiteLabel: 'Website',
    emailLabel: 'Email',
    notesLabel: 'Notes',
    visitWebsite: 'Visit Website',
    sendEmail: 'Send Email',
    itemsPerPage: 'Items per page:',
    pageOf: (current, total) => `Page ${current} of ${total}`,
    previousPage: 'Previous',
    nextPage: 'Next',
    feedbackButton: 'Send Feedback',
    feedbackSubject: 'SVdP Rogers Resource Page Feedback',
    languageToggleLabel: 'Español',
    disclaimerAccuracy:
      'We strive to maintain accurate information, but cannot guarantee it is always up to date. Please call ahead when possible.',
    footerAttribution: (lastUpdate) =>
      `Provided by the SVDP Mother Theresa Conference of Rogers, AR - ${lastUpdate}`,
  },
  es: {
    siteTitle: 'Sociedad de San Vicente de Paúl - Rogers, AR',
    siteSubtitle: 'Recursos',
    skipToContent: 'Saltar al contenido principal',
    searchLabel: 'Buscar recursos comunitarios',
    searchPlaceholder: 'Organización, categoría o código postal',
    clearSearch: 'Borrar búsqueda',
    resultsCount: (shown, total) =>
      `Mostrando ${shown} de ${total} ${total === 1 ? 'recurso' : 'recursos'}`,
    noResultsTitle: 'No se encontraron recursos',
    noResultsDescription:
      'Intente buscar una palabra más sencilla, una categoría (como "Alimentos" o "Refugio") o un código postal de 5 dígitos (como 72756).',
    phoneLabel: 'Teléfono',
    addressLabel: 'Dirección',
    websiteLabel: 'Sitio web',
    emailLabel: 'Correo electrónico',
    notesLabel: 'Notas',
    visitWebsite: 'Visitar sitio web',
    sendEmail: 'Enviar correo',
    itemsPerPage: 'Elementos por página:',
    pageOf: (current, total) => `Página ${current} de ${total}`,
    previousPage: 'Anterior',
    nextPage: 'Siguiente',
    feedbackButton: 'Enviar Comentarios',
    feedbackSubject: 'Comentarios sobre la página de recursos de SVdP Rogers',
    languageToggleLabel: 'English',
    disclaimerAccuracy:
      'Nos esforzamos por mantener la información actualizada, pero no podemos garantizar su exactitud en todo momento. Por favor llame con anticipación cuando sea posible.',
    footerAttribution: (lastUpdate) =>
      `Proporcionado por la Conferencia Madre Teresa de SVDP de Rogers, AR - ${lastUpdate}`,
  },
}
