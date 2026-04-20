import {defineArrayMember, defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

type InternationalizedValue<T> = {_key: string; value?: T}

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'media', title: 'Media'},
    {name: 'nutrition', title: 'Nutrition'},
    {name: 'commerce', title: 'Commerce'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'internationalizedArrayString',
      group: 'details',
      description: 'Per-locale product name.',
      validation: (rule) =>
        rule.custom((value: InternationalizedValue<string>[] | undefined) => {
          if (!value?.length) return 'Add the product name in at least one locale.'
          const missing = value.filter((entry) => !entry?.value?.trim())
          if (missing.length) {
            return `Missing value for locale(s): ${missing.map((m) => m._key).join(', ')}`
          }
          return true
        }),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      description: 'Shared across locales. Use the frontend router to localize URL prefixes.',
      options: {maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      type: 'internationalizedArrayString',
      group: 'details',
      description: 'Short marketing line displayed under the product name (per locale).',
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArraySimpleBlockContent',
      group: 'details',
      description: 'Rich text description, per locale.',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      group: 'details',
      to: [{type: 'category'}],
      description: 'Category references are shared. Link to any locale version of the category.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'flavor',
      title: 'Flavor',
      type: 'internationalizedArrayString',
      group: 'details',
      description: 'e.g. "Original", "Cherry", "Lime" — per locale.',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Limited edition', value: 'limited'},
          {title: 'Sugar free', value: 'sugarFree'},
          {title: 'Caffeinated', value: 'caffeinated'},
          {title: 'Organic', value: 'organic'},
          {title: 'Vegan', value: 'vegan'},
          {title: 'Gluten free', value: 'glutenFree'},
        ],
      },
    }),
    defineField({
      name: 'ingredients',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'allergens',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Milk', value: 'milk'},
          {title: 'Eggs', value: 'eggs'},
          {title: 'Peanuts', value: 'peanuts'},
          {title: 'Tree nuts', value: 'treeNuts'},
          {title: 'Soy', value: 'soy'},
          {title: 'Wheat', value: 'wheat'},
          {title: 'Fish', value: 'fish'},
          {title: 'Shellfish', value: 'shellfish'},
          {title: 'Sesame', value: 'sesame'},
        ],
      },
    }),
    defineField({
      name: 'volumeMl',
      title: 'Volume (ml)',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'abv',
      title: 'Alcohol by volume (%)',
      type: 'number',
      group: 'details',
      description: 'Leave blank for non-alcoholic drinks.',
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image gallery',
      type: 'array',
      group: 'media',
      of: [
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
    }),
    defineField({
      name: 'nutritionFacts',
      title: 'Nutrition facts',
      type: 'nutritionFacts',
      group: 'nutrition',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      group: 'commerce',
      validation: (rule) =>
        rule.regex(/^[A-Z0-9-]+$/, {
          name: 'uppercase alphanumeric with dashes',
          invert: false,
        }),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'commerce',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'currency',
      type: 'string',
      group: 'commerce',
      initialValue: 'USD',
      options: {
        list: [
          {title: 'USD', value: 'USD'},
          {title: 'EUR', value: 'EUR'},
          {title: 'GBP', value: 'GBP'},
          {title: 'CAD', value: 'CAD'},
          {title: 'AUD', value: 'AUD'},
        ],
      },
    }),
    defineField({
      name: 'availability',
      type: 'string',
      group: 'commerce',
      initialValue: 'inStock',
      options: {
        list: [
          {title: 'In stock', value: 'inStock'},
          {title: 'Out of stock', value: 'outOfStock'},
          {title: 'Pre-order', value: 'preOrder'},
          {title: 'Discontinued', value: 'discontinued'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      type: 'date',
      group: 'commerce',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      flavor: 'flavor',
      media: 'heroImage',
      availability: 'availability',
    },
    prepare({name, flavor, media, availability}) {
      const firstLocalized = <T,>(value: InternationalizedValue<T>[] | undefined): T | undefined =>
        Array.isArray(value) ? value.find((entry) => entry?.value != null)?.value : undefined
      const title = firstLocalized<string>(name)
      const subtitleText = firstLocalized<string>(flavor)
      const availabilityLabel =
        availability && availability !== 'inStock' ? ` — ${availability}` : ''
      return {
        title: title || 'Untitled product',
        subtitle: `${subtitleText || ''}${availabilityLabel}`.trim(),
        media,
      }
    },
  },
})
