import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {languageFilter} from '@sanity/language-filter'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {DEFAULT_LOCALE, LOCALES, LOCALIZED_DOCUMENT_TYPES} from './lib/locales'

const supportedLanguages = LOCALES.map(({id, title}) => ({id, title}))

export default defineConfig({
  name: 'default',
  title: 'Smartcat sandbox',

  projectId: '4b7y61cv',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: [...LOCALIZED_DOCUMENT_TYPES],
    }),
    internationalizedArray({
      languages: supportedLanguages,
      defaultLanguages: [DEFAULT_LOCALE],
      fieldTypes: ['string', 'text', 'simpleBlockContent'],
      languageFilter: {
        documentTypes: ['product'],
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type !== 'global') return prev
      return prev.filter(
        (item) =>
          !LOCALIZED_DOCUMENT_TYPES.includes(
            item.templateId as (typeof LOCALIZED_DOCUMENT_TYPES)[number],
          ),
      )
    },
  },

  templates: (prev: Template[]) => {
    const localizedTemplates: Template[] = LOCALIZED_DOCUMENT_TYPES.map((type) => ({
      id: `${type}-by-locale`,
      title: `${type === 'page' ? 'Landing page' : 'Category'} (by locale)`,
      schemaType: type,
      parameters: [{name: 'language', type: 'string'}],
      value: ({language}: {language: string}) => ({language}),
    }))
    return [...prev, ...localizedTemplates]
  },
})
