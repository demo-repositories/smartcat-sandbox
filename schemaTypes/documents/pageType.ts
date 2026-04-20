import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const pageType = defineType({
  name: 'page',
  title: 'Landing page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'pageBuilder',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', language: 'language'},
    prepare({title, subtitle, language}) {
      const languageLabel = language ? ` · ${String(language).toUpperCase()}` : ''
      return {
        title: title || 'Untitled page',
        subtitle: `${subtitle ? `/${subtitle}` : 'No slug set'}${languageLabel}`,
      }
    },
  },
})
