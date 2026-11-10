export type Language = 'en' | 'es'

export interface Resource {
  name: string
  categories: string[]
  phone: string
  address: string
  website: string
  email: string
}

export type PageSize = 10 | 20 | 50

export interface Translations {
  siteTitle: string
  siteSubtitle: string
  skipToContent: string
  searchLabel: string
  searchPlaceholder: string
  clearSearch: string
  resultsCount: (shown: number, total: number) => string
  noResultsTitle: string
  noResultsDescription: string
  phoneLabel: string
  addressLabel: string
  websiteLabel: string
  emailLabel: string
  visitWebsite: string
  sendEmail: string
  itemsPerPage: string
  pageOf: (current: number, total: number) => string
  previousPage: string
  nextPage: string
  feedbackButton: string
  feedbackSubject: string
  languageToggleLabel: string
  disclaimerAccuracy: string
  footerAttribution: (lastUpdate: string) => string
}

