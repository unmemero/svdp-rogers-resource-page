import type { Language, Translations } from '../types'

export const FEEDBACK_EMAIL = 'feedback@svdp-rogers.org'

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
    siteTitle: 'Society of St. Vincent de Paul',
    siteSubtitle: 'Mother Teresa Conference – Rogers, AR Community Resources',
    skipToContent: 'Skip to main content',
    searchLabel: 'Search community resources',
    searchPlaceholder: 'Search by organization, category, or ZIP code (e.g. 72756, Food)...',
    searchHint: 'Search matches organization names, categories, or ZIP codes.',
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
    disclaimerAvailability:
      'We do not guarantee that any resources listed will be available or will meet your specific needs. Please use your own judgment when contacting and working with these organizations.',
    disclaimerAccuracy:
      'We strive to maintain accurate information, but cannot guarantee it is always up to date. Please call ahead when possible.',
  },
  es: {
    siteTitle: 'Sociedad de San Vicente de Paúl',
    siteSubtitle: 'Conferencia Madre Teresa – Recursos Comunitarios de Rogers, AR',
    skipToContent: 'Saltar al contenido principal',
    searchLabel: 'Buscar recursos comunitarios',
    searchPlaceholder: 'Buscar por organización, categoría o código postal (ej. 72756, Alimentos)...',
    searchHint: 'La búsqueda incluye nombres de organizaciones, categorías o códigos postales.',
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
    disclaimerAvailability:
      'No garantizamos que los recursos enumerados estén disponibles o satisfagan sus necesidades específicas. Por favor use su propio criterio al contactar y trabajar con estas organizaciones.',
    disclaimerAccuracy:
      'Nos esforzamos por mantener la información actualizada, pero no podemos garantizar su exactitud en todo momento. Por favor llame con anticipación cuando sea posible.',
  },
}

