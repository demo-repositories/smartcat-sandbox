import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description: 'Overrides the default page title in search results and social shares.',
      validation: (rule) => rule.max(70).warning('Keep meta titles under 70 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning('Keep meta descriptions under 160 characters.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Used for Open Graph / Twitter cards. Recommended 1200×630.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
