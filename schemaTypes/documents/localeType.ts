import {defineField, defineType} from 'sanity'
import {TranslateIcon} from '@sanity/icons'

export const localeType = defineType({
  name: 'locale',
  title: 'Locale',
  type: 'document',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Display name',
      type: 'string',
      description: 'e.g. "English", "français"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Language tag',
      type: 'string',
      description: 'IANA / IETF language tag such as "en", "en-US", "fr", "de-CH".',
      validation: (rule) =>
        rule.required().regex(/^[a-z]{2,3}(-[A-Z]{2})?$/, {
          name: 'IETF language tag',
          invert: false,
        }),
    }),
    defineField({
      name: 'fallback',
      title: 'Fallback locale',
      type: 'reference',
      to: [{type: 'locale'}],
      description: 'Used when a translation is missing for this locale.',
    }),
    defineField({
      name: 'default',
      title: 'Default locale',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tag', isDefault: 'default'},
    prepare({title, subtitle, isDefault}) {
      return {
        title: title || 'Untitled locale',
        subtitle: `${subtitle || 'no tag'}${isDefault ? ' (default)' : ''}`,
      }
    },
  },
})
