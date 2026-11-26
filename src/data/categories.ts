import type { Language, SearchNotice, Translations } from '../types'

export const FEEDBACK_EMAIL = 'feedback@svdp-rogers.org'
export const LAST_UPDATED = 'November 2026'
export const LAST_UPDATED_ES = 'Noviembre 2026'

export const CATEGORIES = {
  en: [
    'Food Pantries & Meals',
    'Bills, Rent & Financial Help',
    'Emergency Shelters',
    'Transitional Housing',
    'Housing Assistance',
    'Clothing, Beds & Household',
    'Medical & Dental',
    'Laundry Assistance',
    'Mental Health & Counseling',
    'Helplines & Key Contacts',
    'Hygiene & Personal Care',
    'Social Services',
    'Crisis & Abuse Help',
  ],
  es: [
    'Despensas de Alimentos y Comidas',
    'Facturas, Renta y Ayuda Financiera',
    'Refugios de Emergencia',
    'Vivienda de Transición',
    'Asistencia de Vivienda',
    'Ropa, Camas y Artículos del Hogar',
    'Asistencia Médica y Dental',
    'Asistencia de Lavandería',
    'Salud Mental y Consejería',
    'Líneas de Ayuda y Contactos Clave',
    'Higiene y Cuidado Personal',
    'Servicios Sociales',
    'Ayuda en Crisis y Abuso',
  ],
} as const

export const CATEGORY_ICONS: Record<number, string> = {
  0: 'restaurant',            // Food Pantries & Meals
  1: 'payments',              // Financial Assistance
  2: 'night_shelter',         // Emergency Shelters
  3: 'holiday_village',       // Transitional Living
  4: 'home',                  // Housing Assistance
  5: 'checkroom',             // Clothing & Household Items
  6: 'medical_services',      // Medical & Dental
  7: 'local_laundry_service', // Laundry Assistance
  8: 'psychology',            // Mental Health
  9: 'contact_phone',         // Important Contacts
  10: 'clean_hands',          // Hygiene Products
  11: 'groups',               // Social Services
  12: 'health_and_safety',    // Crisis & Abuse Help
}

export const CATEGORY_SYNONYMS: Record<Language, Record<string, string[]>> = {
  en: {
    'Food Pantries & Meals': [
      'food', 'meals', 'meal', 'pantry', 'pantries', 'groceries', 'grocery',
      'hungry', 'hunger', 'breakfast', 'lunch', 'dinner', 'food bank', 'food box', 'soup kitchen',
      'free food', 'meals on wheels', 'snap', 'ebt', 'wic', 'food stamps'
    ],
    'Bills, Rent & Financial Help': [
      'rent', 'rental', 'utilities', 'utility', 'electric', 'electricity',
      'water', 'gas', 'power', 'bills', 'bill', 'cash', 'money', 'financial', 'financial aid', 'payments',
      'eviction', 'shutoff', 'disconnect', 'mortgage', 'deposit', 'liheap', 'heating', 'propane',
      'scholarship', 'tuition'
    ],
    'Emergency Shelters': [
      'shelter', 'shelters', 'homeless', 'homelessness', 'eviction', 'emergency shelter', 'housing', 'unhoused', 'overnight'
    ],
    'Transitional Housing': [
      'transitional', 'transitional living', 'halfway', 'housing', 'apartment', 'home', 'living', 'recovery housing'
    ],
    'Housing Assistance': [
      'housing', 'section 8', 'rent', 'rental', 'apartment', 'home', 'eviction', 'landlord', 'voucher', 'affordable housing', 'low income'
    ],
    'Clothing, Beds & Household': [
      'clothing', 'clothes', 'shoes', 'coats', 'jackets', 'blankets', 'furniture', 'household',
      'bed', 'beds', 'bedding', 'mattress', 'sheets', 'pillows', 'thrift', 'baby', 'maternity', 'crib', 'car seat', 'stroller'
    ],
    'Medical & Dental': [
      'doctor', 'physician', 'clinic', 'dentist', 'dental', 'teeth', 'tooth',
      'medicine', 'prescription', 'rx', 'pharmacy', 'hospital', 'health', 'pediatrician', 'checkup',
      'pregnant', 'pregnancy', 'ultrasound', 'std', 'sti', 'vaccine', 'immunization', 'medicaid', 'tefra', 'uninsured', 'free clinic'
    ],
    'Laundry Assistance': [
      'laundry', 'wash', 'washer', 'dryer', 'clean clothes', 'detergent', 'laundromat'
    ],
    'Mental Health & Counseling': [
      'counseling', 'counselor', 'therapy', 'therapist', 'psychologist',
      'depression', 'anxiety', 'stress', 'behavioral', 'mental health', 'emotional',
      'addiction', 'alcohol', 'drugs', 'substance', 'recovery', 'inpatient', 'trauma', 'grief', 'suicide', 'support group'
    ],
    'Helplines & Key Contacts': [
      'emergency', 'police', 'crisis', 'hotline', 'phone', 'contact', 'important contacts', '211', '988', 'helpline'
    ],
    'Hygiene & Personal Care': [
      'diapers', 'wipes', 'soap', 'shampoo', 'toilet paper', 'toothpaste', 'toothbrush',
      'pads', 'tampons', 'feminine', 'hygiene', 'toiletries', 'shower', 'showers', 'razor', 'razors', 'deodorant'
    ],
    'Social Services': [
      'social services', 'case management', 'benefits', 'support', 'community', 'family', 'youth', 'teen', 'parenting', 'dhs'
    ],
    'Crisis & Abuse Help': [
      'crisis', 'abuse', 'domestic violence', 'sexual assault', 'assault', 'trafficking',
      'human trafficking', 'child abuse', 'suicide', '988', 'hotline', 'safety', 'safe', '24/7', 'emergency', 'dating violence'
    ],
  },
  es: {
    'Despensas de Alimentos y Comidas': [
      'comida', 'alimentos', 'alimento', 'despensa', 'despensas', 'hambre',
      'canasta', 'mandado', 'banco de alimentos', 'lonche', 'cena', 'almuerzo', 'desayuno', 'comedor',
      'comida gratis', 'estampillas', 'cupones de comida', 'snap', 'ebt', 'wic', 'meals on wheels'
    ],
    'Facturas, Renta y Ayuda Financiera': [
      'renta', 'alquiler', 'luz', 'electricidad', 'agua', 'gas', 'biles',
      'bil', 'recibo', 'factura', 'facturas', 'pagar', 'dinero', 'pago', 'deuda', 'utilidades', 'servicios',
      'financiera', 'desalojo', 'corte de luz', 'calefaccion', 'propano', 'liheap', 'beca', 'becas', 'colegiatura'
    ],
    'Refugios de Emergencia': [
      'refugio', 'refugios', 'albergue', 'sin hogar', 'calle', 'techo', 'emergencia', 'dormir', 'desalojo', 'homeless'
    ],
    'Vivienda de Transición': [
      'vivienda', 'transicion', 'cuarto', 'apartamento', 'departamento', 'casa', 'hogar', 'recuperacion'
    ],
    'Asistencia de Vivienda': [
      'vivienda', 'seccion 8', 'section 8', 'casa', 'renta', 'apartamento', 'departamento', 'alquiler', 'desalojo', 'hogar', 'bajos ingresos', 'vales'
    ],
    'Ropa, Camas y Artículos del Hogar': [
      'ropa', 'vestir', 'zapatos', 'calzado', 'cobijas', 'frazadas', 'mantas',
      'abrigos', 'chamarra', 'chamarras', 'chaqueta', 'muebles', 'cama', 'camas', 'colchon', 'sabanas', 'almohadas',
      'segunda mano', 'bebe', 'maternidad', 'cuna', 'asiento de carro', 'carriola', 'hogar'
    ],
    'Asistencia Médica y Dental': [
      'doctor', 'doctora', 'medico', 'medica', 'clinica', 'dentista', 'dental', 'dientes',
      'muela', 'medicina', 'medicinas', 'pastillas', 'farmacia', 'salud', 'hospital', 'pediatra', 'enfermo', 'cita',
      'embarazo', 'embarazada', 'ultrasonido', 'vacunas', 'medicaid', 'tefra', 'sin seguro', 'clinica gratis'
    ],
    'Asistencia de Lavandería': [
      'lavar', 'lavanderia', 'lavadora', 'secadora', 'ropa sucia', 'detergente', 'jabon de ropa'
    ],
    'Salud Mental y Consejería': [
      'psicologo', 'psicologa', 'terapia', 'terapeuta', 'consejero', 'consejeria',
      'depresion', 'ansiedad', 'estres', 'emocional', 'mente', 'salud mental',
      'adiccion', 'alcohol', 'drogas', 'recuperacion', 'hospitalizacion', 'trauma', 'duelo', 'suicidio', 'grupo de apoyo'
    ],
    'Líneas de Ayuda y Contactos Clave': [
      'telefono', 'ayuda', 'emergencia', 'policia', 'linea', 'contacto', 'contactos', '211', '988'
    ],
    'Higiene y Cuidado Personal': [
      'panales', 'pañales', 'toallitas', 'jabon', 'shampoo', 'pasta de dientes',
      'cepillo', 'toallas sanitarias', 'aseo', 'higiene', 'personal', 'ducha', 'duchas', 'regadera', 'rastrillos', 'desodorante'
    ],
    'Servicios Sociales': [
      'apoyo', 'social', 'servicios sociales', 'tramites', 'comunidad', 'asistencia', 'familia', 'jovenes', 'adolescentes', 'dhs', 'beneficios'
    ],
    'Ayuda en Crisis y Abuso': [
      'crisis', 'abuso', 'violencia domestica', 'agresion sexual', 'violacion', 'trata de personas',
      'abuso infantil', 'suicidio', '988', 'linea de crisis', 'seguridad', '24/7', 'emergencia', 'maltrato'
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
    qrButtonLabel: 'QR Code',
    qrCloseLabel: 'Close',
    clearAllFilters: 'Clear search & filters',
    downloadPdfLabel: 'Print Directory',
    downloadingPdfLabel: 'Preparing PDF...',
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
    qrButtonLabel: 'Código QR',
    qrCloseLabel: 'Cerrar',
    clearAllFilters: 'Borrar búsqueda y filtros',
    downloadPdfLabel: 'Imprimir Directorio',
    downloadingPdfLabel: 'Preparando PDF...',
  },
}
