import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'event',
    title: 'Event',
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
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Clubhouse', value: 'Clubhouse' },
                    { title: 'LinkedIn Live', value: 'LinkedIn Live' },
                    { title: 'Face to Face', value: 'Face to Face' },
                    { title: 'Webinar', value: 'Webinar' },
                    { title: 'Keynote', value: 'Keynote' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'time',
            title: 'Time/Duration',
            type: 'string',
            description: 'e.g., 12PM GMT / 8:00 AM EST or 2 Hours',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'e.g., Online, The Enterprise Village, Accra',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'eventLink',
            title: 'Event Link',
            type: 'url',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'date',
        },
    },
})
