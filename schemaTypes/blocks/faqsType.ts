import {defineArrayMember, defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faqsType = defineType({
  name: 'faqs',
  title: 'FAQs',
  type: 'object',
  icon: HelpCircleIcon,
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
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'faq',
          type: 'object',
          icon: HelpCircleIcon,
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Numbered', value: 'number'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                    ],
                    annotations: [defineArrayMember({type: 'link', name: 'link'})],
                  },
                }),
              ],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'question'},
            prepare({title}) {
              return {title: title || 'Untitled question', media: HelpCircleIcon}
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
        title: title || 'FAQs',
        subtitle: `FAQs — ${count || 0} question${count === 1 ? '' : 's'}`,
      }
    },
  },
})
