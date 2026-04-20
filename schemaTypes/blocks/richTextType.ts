import {defineArrayMember, defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const richTextType = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              defineArrayMember({type: 'link', name: 'link'}),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', type: 'string'}),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max width',
      type: 'string',
      options: {
        list: [
          {title: 'Narrow (prose)', value: 'narrow'},
          {title: 'Default', value: 'default'},
          {title: 'Wide', value: 'wide'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {content: 'content'},
    prepare({content}) {
      const block = Array.isArray(content)
        ? content.find((item: {_type?: string}) => item._type === 'block')
        : undefined
      const text = block?.children
        ?.filter((child: {_type?: string}) => child._type === 'span')
        ?.map((child: {text?: string}) => child.text)
        ?.join('')
      return {
        title: text || 'Rich text',
        subtitle: 'Rich text',
        media: TextIcon,
      }
    },
  },
})
