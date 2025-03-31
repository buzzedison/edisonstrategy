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
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'web' },
          { title: 'Mobile Development', value: 'mobile' },
          { title: 'UI/UX Design', value: 'design' },
          { title: 'Consulting', value: 'consulting' },
        ],
      },
    }),
    defineField({
      name: 'projectDate',
      title: 'Project Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Set to true to feature this project on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage',
    },
    prepare(selection) {
      const { client } = selection
      return { ...selection, subtitle: client ? `Client: ${client}` : '' }
    },
  },
}) 