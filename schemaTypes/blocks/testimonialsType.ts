import {defineArrayMember, defineField, defineType} from 'sanity'
import {CommentIcon, UserIcon} from '@sanity/icons'

export const testimonialsType = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'testimonial',
          type: 'object',
          icon: UserIcon,
          fields: [
            defineField({
              name: 'quote',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required().max(500),
            }),
            defineField({
              name: 'authorName',
              title: 'Author name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authorTitle',
              title: 'Author title / role',
              type: 'string',
            }),
            defineField({
              name: 'authorImage',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                }),
              ],
            }),
            defineField({
              name: 'rating',
              type: 'number',
              validation: (rule) => rule.min(1).max(5).integer(),
            }),
          ],
          preview: {
            select: {
              quote: 'quote',
              authorName: 'authorName',
              media: 'authorImage',
            },
            prepare({quote, authorName, media}) {
              return {
                title: authorName || 'Untitled testimonial',
                subtitle: quote,
                media: media ?? UserIcon,
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
        title: title || 'Testimonials',
        subtitle: `Testimonials — ${count || 0} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})
