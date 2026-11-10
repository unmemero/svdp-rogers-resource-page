import type { Language, Translations } from '../types'

export const FEEDBACK_EMAIL = 'feedback@svdp-rogers.org'
export const LAST_UPDATED = 'November 2026'
export const LAST_UPDATED_ES = 'Noviembre 2026'

export const CATEGORIES = {
  en: [
    'Emergency Shelters',
    'Food Pantries',
    'Government Assistance',
    'Mental Health',
    'Medical Clinics',
    'Transportation',
    'Utility & Rent Assistance',
    'Clothing & Household',
  ],
  es: [
    'Refugios de Emergencia',
    'Despensas de Alimentos',
    'Asistencia del Gobierno',
    'Salud Mental',
    'Clínicas Médicas',
    'Transporte',
    'Asistencia de Renta y Servicios',
    'Ropa y Hogar',
  ],
} as const

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

