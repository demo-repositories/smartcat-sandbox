import {defineArrayMember, defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export const ctaType = defineType({
  name: 'callToAction',
  title: 'Call to action',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'actions',
      title: 'Buttons',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      validation: (rule) => rule.min(1).max(2),
    }),
    defineField({
      name: 'background',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Muted', value: 'muted'},
          {title: 'Accent', value: 'accent'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'body'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled CTA',
        subtitle: subtitle ? `Call to action — ${subtitle}` : 'Call to action',
        media: RocketIcon,
      }
    },
  },
})
