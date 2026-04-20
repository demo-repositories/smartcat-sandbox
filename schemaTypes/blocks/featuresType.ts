import {defineArrayMember, defineField, defineType} from 'sanity'
import {ThLargeIcon, SparklesIcon} from '@sanity/icons'

export const featuresType = defineType({
  name: 'features',
  title: 'Features',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'columns',
      title: 'Columns per row',
      type: 'number',
      options: {
        list: [
          {title: '2', value: 2},
          {title: '3', value: 3},
          {title: '4', value: 4},
        ],
        layout: 'radio',
      },
      initialValue: 3,
    }),
    defineField({
      name: 'items',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feature',
          type: 'object',
          icon: SparklesIcon,
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon image',
              type: 'image',
              options: {hotspot: false},
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', media: 'icon'},
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Untitled feature',
                subtitle,
                media: media ?? SparklesIcon,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'heading', count: 'items.length'},
    prepare({title, count}) {
      return {
        title: title || 'Untitled features',
        subtitle: `Features — ${count || 0} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})
