import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Internal reference',
      type: 'reference',
      to: [{type: 'page'}, {type: 'product'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string} | undefined
          if (parent?.linkType === 'internal' && !value) {
            return 'Please select an internal destination.'
          }
          return true
        }),
    }),
    defineField({
      name: 'href',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule
          .uri({scheme: ['http', 'https', 'mailto', 'tel']})
          .custom((value, context) => {
            const parent = context.parent as {linkType?: string} | undefined
            if (parent?.linkType === 'external' && !value) {
              return 'Please enter a URL.'
            }
            return true
          }),
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      title: 'Open in new tab',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      href: 'href',
      internalTitle: 'internal.title',
      internalName: 'internal.name',
    },
    prepare({label, linkType, href, internalTitle, internalName}) {
      const destination =
        linkType === 'external' ? href : internalTitle || internalName || 'Missing destination'
      return {
        title: label || 'Untitled link',
        subtitle: destination,
      }
    },
  },
})
