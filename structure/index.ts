import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {DocumentIcon, TagIcon, TranslateIcon, PackageIcon} from '@sanity/icons'
import {LOCALES, LOCALIZED_DOCUMENT_TYPES, type LocaleId} from '../lib/locales'
import {getFlagIcon} from '../lib/flagIcons'

type LocalizedTypeConfig = {
  type: 'page' | 'category'
  title: string
  icon: React.ComponentType
}

const LOCALIZED_TYPES: LocalizedTypeConfig[] = [
  {type: 'page', title: 'Landing pages', icon: DocumentIcon},
  {type: 'category', title: 'Categories', icon: TagIcon},
]

function localizedListItem(S: StructureBuilder, {type, title, icon}: LocalizedTypeConfig) {
  return S.listItem()
    .id(`${type}-by-locale`)
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .id(`${type}-locales`)
        .title(title)
        .items([
          ...LOCALES.map((locale) => localeChild(S, type, locale.id, locale.title)),
          S.divider(),
          S.listItem()
            .id(`${type}-missing-language`)
            .title('Missing language')
            .icon(TranslateIcon)
            .child(
              S.documentList()
                .id(`${type}-missing-language-list`)
                .title(`${title} — missing language`)
                .schemaType(type)
                .filter('_type == $type && !defined(language)')
                .params({type})
                .apiVersion('2025-01-01'),
            ),
        ]),
    )
}

function localeChild(
  S: StructureBuilder,
  type: LocalizedTypeConfig['type'],
  localeId: LocaleId,
  localeTitle: string,
) {
  return S.listItem()
    .id(`${type}-${localeId}`)
    .title(localeTitle)
    .icon(getFlagIcon(localeId))
    .child(
      S.documentList()
        .id(`${type}-${localeId}-list`)
        .title(`${localeTitle} ${type === 'page' ? 'pages' : 'categories'}`)
        .schemaType(type)
        .filter('_type == $type && language == $language')
        .params({type, language: localeId})
        .apiVersion('2025-01-01')
        .initialValueTemplates([
          S.initialValueTemplateItem(`${type}-by-locale`, {language: localeId}),
        ])
        .canHandleIntent((intentName, params) => {
          if (intentName !== 'create') return false
          return params.template === `${type}-by-locale` && params.language === localeId
        }),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      ...LOCALIZED_TYPES.map((cfg) => localizedListItem(S, cfg)),

      S.divider(),

      S.documentTypeListItem('product').title('Products').icon(PackageIcon),

      S.divider(),

      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return (
          id !== undefined &&
          !LOCALIZED_DOCUMENT_TYPES.includes(id as (typeof LOCALIZED_DOCUMENT_TYPES)[number]) &&
          id !== 'product'
        )
      }),
    ])
