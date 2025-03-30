// @ts-nocheck
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short description of the project that appears in listings',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'projectDate',
      title: 'Project Date',
      type: 'date',
      description: 'When was the project completed',
      options: {
        dateFormat: 'MMMM YYYY',
      },
    }),
    defineField({
      name: 'projectURL',
      title: 'Project URL',
      type: 'url',
      description: 'The URL to the live project (if applicable)',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Main content of the case study',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'result',
          fields: [
            { name: 'metric', type: 'string', title: 'Metric' },
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
        },
      ],
      description: 'Key results and metrics from the project',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote' },
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'role', type: 'string', title: 'Role' },
        { name: 'company', type: 'string', title: 'Company' },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies or tools used in the project',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Services you provided for this project',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Should this project be featured on the homepage?',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in featured projects list (lower numbers appear first)',
      hidden: ({ document }) => !document?.featured,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, client, media } = selection
      return {
        title,
        subtitle: client && `Client: ${client}`,
        media,
      }
    },
  },
}) 