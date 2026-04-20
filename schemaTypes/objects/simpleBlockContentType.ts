import {defineArrayMember, defineType} from 'sanity'

export const simpleBlockContentType = defineType({
  name: 'simpleBlockContent',
  title: 'Simple block content',
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
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
              },
            ],
          }),
        ],
      },
    }),
  ],
})
