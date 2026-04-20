import {defineField, defineType} from 'sanity'

export const nutritionFactsType = defineType({
  name: 'nutritionFacts',
  title: 'Nutrition Facts',
  type: 'object',
  fields: [
    defineField({
      name: 'servingSize',
      title: 'Serving size',
      type: 'string',
      description: 'e.g. "330 ml (1 can)"',
    }),
    defineField({
      name: 'calories',
      title: 'Calories (kcal)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'totalFat',
      title: 'Total fat (g)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'sodium',
      title: 'Sodium (mg)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'totalCarbohydrates',
      title: 'Total carbohydrates (g)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'sugars',
      title: 'Sugars (g)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'addedSugars',
      title: 'Added sugars (g)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'protein',
      title: 'Protein (g)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'caffeine',
      title: 'Caffeine (mg)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
  ],
})
