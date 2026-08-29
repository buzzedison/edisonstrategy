// @ts-nocheck
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'firstName', title: 'First name', type: 'string' }),
    defineField({ name: 'lastName', title: 'Last name', type: 'string' }),
    defineField({ name: 'latestSource', title: 'Latest signup source', type: 'string' }),
    defineField({ name: 'sources', title: 'Signup sources', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'founderScore', title: 'Founder score', type: 'string' }),
    defineField({ name: 'scoreBand', title: 'Score band', type: 'string' }),
    defineField({ name: 'primaryConstraint', title: 'Primary constraint', type: 'string' }),
    defineField({
      name: 'kitStatus',
      title: 'Kit status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Subscribed', value: 'subscribed' },
          { title: 'Error', value: 'error' },
        ],
      },
    }),
    defineField({ name: 'kitSubscriberId', title: 'Kit subscriber ID', type: 'string' }),
    defineField({ name: 'kitError', title: 'Kit error', type: 'text' }),
    defineField({ name: 'firstSubscribedAt', title: 'First subscribed', type: 'datetime' }),
    defineField({ name: 'lastSubscribedAt', title: 'Latest signup', type: 'datetime' }),
    defineField({ name: 'updatedAt', title: 'Updated', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'email', firstName: 'firstName', source: 'latestSource' },
    prepare({ title, firstName, source }) {
      return {
        title: firstName ? `${firstName} · ${title}` : title,
        subtitle: source ? `Source: ${source}` : 'Newsletter subscriber',
      };
    },
  },
});
