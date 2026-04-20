import {defineArrayMember, defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const productShowcaseType = defineType({
  name: 'productShowcase',
  title: 'Product showcase',
  type: 'object',
  icon: PackageIcon,
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
      name: 'layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Carousel', value: 'carousel'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'products',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})],
      validation: (rule) => rule.min(1).max(12).unique(),
    }),
  ],
  preview: {
    select: {title: 'heading', count: 'products.length'},
    prepare({title, count}) {
      return {
        title: title || 'Product showcase',
        subtitle: `Product showcase — ${count || 0} product${count === 1 ? '' : 's'}`,
        media: PackageIcon,
      }
    },
  },
})
