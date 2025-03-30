// @ts-nocheck
import { defineType, defineArrayMember } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for your portfolio case studies. It's used in 'portfolio.ts' and controls
 * how you structure your content.
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Define block styles and options
      options: {
        // Styles let you set what your user can mark up blocks with
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'Quote', value: 'blockquote'},
        ],
        // Lists for bullet points and numbered lists
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Number', value: 'number'},
        ],
        // Marks for inline formatting
        marks: {
          // Decorators for basic formatting
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
            {title: 'Code', value: 'code'},
            {title: 'Underline', value: 'underline'},
            {title: 'Strike', value: 'strike-through'},
          ],
          // Annotations for advanced formatting (like links)
          annotations: [
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                  validation: Rule => Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel']
                  })
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  description: 'Read https://css-tricks.com/use-target_blank/',
                  type: 'boolean'
                }
              ]
            },
          ],
        },
      },
    }),
    // You can add additional types here. Example:
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
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
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
    defineArrayMember({
      type: 'code',
      name: 'code',
      title: 'Code Block',
      options: {
        language: 'javascript',
        withFilename: true,
      },
    }),
    defineArrayMember({
      name: 'callout',
      title: 'Callout',
      type: 'object',
      fields: [
        {
          name: 'content',
          title: 'Content',
          type: 'text',
        },
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
              { title: 'Error', value: 'error' },
            ],
            layout: 'radio',
          },
          initialValue: 'info',
        },
      ],
      preview: {
        select: {
          content: 'content',
          type: 'type',
        },
        prepare({ content, type }) {
          return {
            title: `${type.charAt(0).toUpperCase() + type.slice(1)} Callout`,
            subtitle: content,
          }
        },
      },
    }),
  ],
}) 