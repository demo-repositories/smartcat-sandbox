import {defineArrayMember, defineType} from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page builder',
  type: 'array',
  of: [
    defineArrayMember({type: 'hero'}),
    defineArrayMember({type: 'features'}),
    defineArrayMember({type: 'callToAction'}),
    defineArrayMember({type: 'testimonials'}),
    defineArrayMember({type: 'richText'}),
    defineArrayMember({type: 'productShowcase'}),
    defineArrayMember({type: 'imageGallery'}),
    defineArrayMember({type: 'faqs'}),
  ],
  options: {
    insertMenu: {
      filter: true,
      showIcons: true,
      groups: [
        {
          name: 'marketing',
          title: 'Marketing',
          of: ['hero', 'callToAction', 'testimonials', 'productShowcase'],
        },
        {
          name: 'content',
          title: 'Content',
          of: ['features', 'richText', 'imageGallery', 'faqs'],
        },
      ],
      views: [{name: 'grid'}, {name: 'list'}],
    },
  },
})
