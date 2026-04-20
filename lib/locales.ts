export const LOCALES = [
  {id: 'en', title: 'English'},
  {id: 'fr', title: 'Français'},
  {id: 'es', title: 'Español'},
] as const

export type LocaleId = (typeof LOCALES)[number]['id']

export const DEFAULT_LOCALE: LocaleId = 'en'

export const LOCALIZED_DOCUMENT_TYPES = ['page', 'category'] as const
export type LocalizedDocumentType = (typeof LOCALIZED_DOCUMENT_TYPES)[number]
