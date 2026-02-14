// @ts-nocheck
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO / JSON-LD',
      type: 'object',
      fields: [
        defineField({ name: 'personName', title: 'Person Name', type: 'string' }),
        defineField({ name: 'websiteUrl', title: 'Website URL', type: 'string' }),
        defineField({
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({ name: 'jobTitle', title: 'Job Title', type: 'string' }),
        defineField({ name: 'organizationName', title: 'Organization Name', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
      ],
    }),

    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'titleLine1', title: 'Title Line 1', type: 'string' }),
        defineField({ name: 'emphasizedTitle', title: 'Emphasized Title', type: 'string' }),
        defineField({ name: 'titleLine3', title: 'Title Line 3', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
        defineField({ name: 'helperText', title: 'Helper Text', type: 'string' }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'portraitImage',
          title: 'Portrait Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'portraitAlt', title: 'Portrait Alt Text', type: 'string' }),
        defineField({
          name: 'backgroundIllustration',
          title: 'Background Illustration',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'floatingCard',
          title: 'Floating Card',
          type: 'object',
          fields: [
            defineField({ name: 'performanceLabel', title: 'Performance Label', type: 'string' }),
            defineField({ name: 'performancePercent', title: 'Performance Percent', type: 'string' }),
            defineField({ name: 'expertiseValue', title: 'Expertise Value', type: 'string' }),
            defineField({ name: 'expertiseLabel', title: 'Expertise Label', type: 'string' }),
          ],
        }),
        defineField({ name: 'scrollLabel', title: 'Scroll Label', type: 'string' }),
      ],
    }),

    defineField({
      name: 'trustBarStats',
      title: 'Trust Bar Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'brandsSection',
      title: 'Brands Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'brands',
          title: 'Brands',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Brand Name', type: 'string' }),
                defineField({ name: 'website', title: 'Website/Link', type: 'string' }),
                defineField({
                  name: 'logo',
                  title: 'Logo',
                  type: 'image',
                  options: { hotspot: true },
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'website',
                  media: 'logo',
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'frameworksSection',
      title: 'Frameworks Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'emphasizedTitle', title: 'Emphasized Title', type: 'string' }),
        defineField({
          name: 'cta',
          title: 'Section CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({ name: 'ctaHelperText', title: 'CTA Helper Text', type: 'string' }),
        defineField({
          name: 'frameworks',
          title: 'Framework Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Trending Up', value: 'trendingUp' },
                      { title: 'Brain', value: 'brain' },
                      { title: 'Target', value: 'target' },
                    ],
                    layout: 'dropdown',
                  },
                }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
                defineField({ name: 'result', title: 'Result Text', type: 'string' }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'result',
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'services',
          title: 'Service Cards',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Strategy', value: 'strategy' },
                      { title: 'Website', value: 'website' },
                      { title: 'Mobile', value: 'mobile' },
                      { title: 'Insights', value: 'insights' },
                      { title: 'Podcast', value: 'podcast' },
                    ],
                    layout: 'dropdown',
                  },
                }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
                defineField({ name: 'outcome', title: 'Outcome', type: 'string' }),
                defineField({ name: 'href', title: 'Link', type: 'string' }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'outcome',
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'contentHubSection',
      title: 'Content Hub Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'items',
          title: 'Hub Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Book', value: 'book' },
                      { title: 'Mic', value: 'mic' },
                      { title: 'Insight', value: 'insight' },
                    ],
                    layout: 'dropdown',
                  },
                }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'href', title: 'Link', type: 'string' }),
                defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'ctaLabel',
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'booksSection',
      title: 'Books Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'emphasizedTitle', title: 'Emphasized Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
        defineField({ name: 'newBadgeLabel', title: 'New Badge Label', type: 'string' }),
        defineField({ name: 'exploreButtonLabel', title: 'Explore Button Label', type: 'string' }),
        defineField({ name: 'buyButtonLabel', title: 'Buy Button Label', type: 'string' }),
        defineField({
          name: 'books',
          title: 'Books',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({ name: 'detailLink', title: 'Detail Link', type: 'string' }),
                defineField({ name: 'buyLink', title: 'Buy Link', type: 'string' }),
                defineField({ name: 'rating', title: 'Rating', type: 'number' }),
                defineField({ name: 'category', title: 'Category', type: 'string' }),
                defineField({ name: 'isNew', title: 'Show New Badge', type: 'boolean' }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'category',
                  media: 'image',
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'introTitle', title: 'Intro Title', type: 'string' }),
        defineField({ name: 'emphasizedTitle', title: 'Emphasized Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 5 }),
                defineField({ name: 'name', title: 'Name', type: 'string' }),
                defineField({ name: 'role', title: 'Role', type: 'string' }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'role',
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'endingCard',
          title: 'Ending Card',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({
              name: 'cta',
              title: 'CTA',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'href', title: 'Link', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'titleLine1', title: 'Title Line 1', type: 'string' }),
        defineField({ name: 'titleLine2', title: 'Title Line 2', type: 'string' }),
        defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
        defineField({
          name: 'tags',
          title: 'Tags',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'insightsSection',
      title: 'Insights Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'titleLine1', title: 'Title Line 1', type: 'string' }),
        defineField({ name: 'emphasizedTitle', title: 'Emphasized Title', type: 'string' }),
        defineField({
          name: 'viewAllLink',
          title: 'View All Link',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
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
                defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
                defineField({ name: 'href', title: 'Link', type: 'string' }),
                defineField({ name: 'date', title: 'Date', type: 'date' }),
                defineField({ name: 'readTime', title: 'Read Time', type: 'string' }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'readTime',
                  media: 'image',
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'finalCtaSection',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'titleLine1', title: 'Title Line 1', type: 'string' }),
        defineField({ name: 'titleLine2', title: 'Title Line 2', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'checklist',
          title: 'Checklist Items',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({ name: 'visualYearText', title: 'Visual Year Text', type: 'string' }),
        defineField({ name: 'visualLabel', title: 'Visual Label', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Landing Page Content',
        subtitle: 'Homepage singleton document',
      }
    },
  },
})
