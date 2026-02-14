// @ts-nocheck
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'marketingPage',
  title: 'Marketing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug Key',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'titleLine1', title: 'Title Line 1', type: 'string' }),
        defineField({ name: 'emphasizedTitle', title: 'Emphasized Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string' }),
          ],
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string' }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'imageAlt', title: 'Hero Image Alt', type: 'string' }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'Section ID', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({
              name: 'items',
              title: 'Simple Items',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'cards',
              title: 'Cards',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                    defineField({ name: 'badge', title: 'Badge', type: 'string' }),
                    defineField({
                      name: 'bullets',
                      title: 'Bullets',
                      type: 'array',
                      of: [defineArrayMember({ type: 'string' })],
                    }),
                    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
                    defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'description',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'id',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'finalCta',
      title: 'Final CTA',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({ name: 'buttonLabel', title: 'Button Label', type: 'string' }),
        defineField({ name: 'buttonHref', title: 'Button Href', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
