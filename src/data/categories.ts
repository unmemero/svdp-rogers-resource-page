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
    'Hygiene Products',
    'Social Services'
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
    'Productos de Higiene',
    'Servicios Sociales'
  ],
} as const

export const CATEGORY_ICONS: Record<number, string> = {
  0: 'restaurant',            // Food Pantries & Meals
  1: 'payments',              // Financial Assistance
  2: 'night_shelter',         // Emergency Shelters
  3: 'holiday_village',       // Transitional Living
  4: 'home',                  // Housing Assistance
  5: 'checkroom',             // Clothing and household items
  6: 'medical_services',      // Medical & Dental
  7: 'local_laundry_service', // Laundry Assistance
  8: 'psychology',            // Mental Health
  9: 'contact_phone',         // Important Contacts
  10: 'clean_hands',          // Hygiene Products
  11: 'groups',               // Social Services
}

export const CATEGORY_SYNONYMS: Record<Language, Record<string, string[]>> = {
  en: {
    'Food Pantries & Meals': [
      'food', 'meals', 'meal', 'pantry', 'pantries', 'groceries', 'grocery',
      'hungry', 'hunger', 'breakfast', 'lunch', 'dinner', 'food bank', 'food box', 'soup kitchen'
    ],
    'Financial Assistance': [
      'rent', 'rental', 'utilities', 'utility', 'electric', 'electricity',
      'water', 'gas', 'power', 'bills', 'bill', 'cash', 'money', 'financial aid', 'payments'
    ],
    'Emergency Shelters': [
      'shelter', 'shelters', 'homeless', 'homelessness', 'eviction', 'emergency shelter', 'housing', 'unhoused'
    ],
    'Transitional Living': [
      'transitional', 'halfway', 'housing', 'apartment', 'home', 'living'
    ],
    'Housing Assistance': [
      'housing', 'section 8', 'rent', 'rental', 'apartment', 'home', 'eviction', 'landlord'
    ],
    'Clothing and household items': [
      'clothing', 'clothes', 'shoes', 'coats', 'jackets', 'blankets', 'furniture', 'household', 'bedding', 'mattress'
    ],
    'Medical & Dental': [
      'doctor', 'physician', 'clinic', 'dentist', 'dental', 'teeth', 'tooth',
      'medicine', 'prescription', 'rx', 'pharmacy', 'hospital', 'health', 'pediatrician', 'checkup'
    ],
    'Laundry Assistance': [
      'laundry', 'wash', 'washer', 'dryer', 'clean clothes'
    ],
    'Mental Health': [
      'counseling', 'counselor', 'therapy', 'therapist', 'psychologist',
      'depression', 'anxiety', 'stress', 'behavioral', 'mental health', 'emotional'
    ],
    'Important Contacts': [
      'emergency', 'police', 'crisis', 'hotline', 'phone', 'contact'
    ],
    'Hygiene Products': [
      'diapers', 'wipes', 'soap', 'shampoo', 'toilet paper', 'toothpaste', 'toothbrush', 'pads', 'tampons', 'hygiene', 'toiletries'
    ],
    'Social Services': [
      'social services', 'case management', 'benefits', 'support', 'community'
    ],
  },
  es: {
    'Despensas de Alimentos y Comidas': [
      'comida', 'alimentos', 'alimento', 'despensa', 'despensas', 'hambre',
      'canasta', 'mandado', 'banco de alimentos', 'lonche', 'cena', 'almuerzo', 'desayuno', 'comedor'
    ],
    'Asistencia Financiera': [
      'renta', 'alquiler', 'luz', 'electricidad', 'agua', 'gas', 'biles',
      'bil', 'recibo', 'factura', 'pagar', 'dinero', 'pago', 'deuda', 'utilidades', 'servicios'
    ],
    'Refugios de Emergencia': [
      'refugio', 'albergue', 'sin hogar', 'calle', 'techo', 'emergencia', 'dormir', 'desalojo'
    ],
    'Vivienda de Transición': [
      'vivienda', 'transicion', 'cuarto', 'apartamento', 'departamento', 'casa', 'hogar'
    ],
    'Asistencia de Vivienda': [
      'vivienda', 'seccion 8', 'casa', 'renta', 'apartamento', 'departamento', 'alquiler', 'desalojo', 'hogar'
    ],
    'Ropa y artículos del hogar': [
      'ropa', 'vestir', 'zapatos', 'calzado', 'cobijas', 'frazadas', 'mantas',
      'abrigos', 'chamarra', 'chamarras', 'chaqueta', 'muebles', 'cama', 'colchon'
    ],
    'Asistencia Médica y Dental': [
      'doctor', 'doctora', 'medico', 'medica', 'clinica', 'dentista', 'dientes',
      'muela', 'medicina', 'medicinas', 'pastillas', 'farmacia', 'salud', 'hospital', 'pediatra', 'enfermo', 'cita'
    ],
    'Asistencia de Lavandería': [
      'lavar', 'lavanderia', 'lavadora', 'ropa sucia'
    ],
    'Salud Mental': [
      'psicologo', 'psicologa', 'terapia', 'consejero', 'consejeria',
      'depresion', 'ansiedad', 'estres', 'emocional', 'mente'
    ],
    'Contactos Importantes': [
      'telefono', 'ayuda', 'emergencia', 'policia', 'linea'
    ],
    'Productos de Higiene': [
      'panales', 'pañales', 'toallitas', 'jabon', 'shampoo', 'pasta de dientes',
      'cepillo', 'toallas sanitarias', 'aseo', 'higiene', 'personal'
    ],
    'Servicios Sociales': [
      'apoyo', 'social', 'tramites', 'comunidad', 'asistencia'
    ],
  },
}

export const STOPWORDS: Record<Language, Set<string>> = {
  en: new Set([
    'the', 'a', 'an', 'in', 'on', 'for', 'to', 'of', 'and', 'or', 'with',
    'my', 'our', 'their', 'his', 'her', 'help', 'need', 'needing', 'where', 'is', 'are', 'some'
  ]),
  es: new Set([
    'de', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'en', 'para',
    'por', 'con', 'mis', 'mi', 'su', 'sus', 'y', 'o', 'al', 'del', 'ayuda', 'necesito', 'donde', 'hay', 'que', 'a'
  ]),
}

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
    feedbackSubject: 'SVdP Rogers Resource Page Feedback',
    languageToggleLabel: 'Español',
    allCategoriesLabel: 'All Categories',
    categoriesSectionLabel: 'Browse by category',
    clearCategoryFilter: 'Clear category filter',
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
    feedbackSubject: 'Comentarios sobre la página de recursos de SVdP Rogers',
    languageToggleLabel: 'English',
    allCategoriesLabel: 'Todas las categorías',
    categoriesSectionLabel: 'Explorar por categoría',
    clearCategoryFilter: 'Borrar filtro de categoría',
    disclaimerAccuracy:
      'Nos esforzamos por mantener la información actualizada, pero no podemos garantizar su exactitud en todo momento. Por favor llame con anticipación cuando sea posible.',
    footerAttribution: (lastUpdate) =>
      `Proporcionado por la Conferencia Madre Teresa de SVDP de Rogers, AR - ${lastUpdate}`,
  },
}
