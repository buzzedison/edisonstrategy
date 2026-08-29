// @ts-nocheck
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'clientApplication',
  title: 'Client Application',
  type: 'document',
  fields: [
    defineField({ name: 'firstName', title: 'First name', type: 'string' }),
    defineField({ name: 'lastName', title: 'Last name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'companyStage', title: 'Company stage', type: 'string' }),
    defineField({ name: 'whatBuilding', title: 'What are you building?', type: 'text' }),
    defineField({ name: 'whatWorking', title: 'What is working already?', type: 'text' }),
    defineField({ name: 'whatStuck', title: 'What feels stuck?', type: 'text' }),
    defineField({ name: 'whatTried', title: 'What have you tried?', type: 'text' }),
    defineField({ name: 'avoidedDecision', title: 'Decision being avoided', type: 'text' }),
    defineField({ name: 'next90Days', title: 'Required change in 90 days', type: 'text' }),
    defineField({ name: 'service', title: 'Closest service', type: 'string' }),
    defineField({ name: 'investmentRange', title: 'Prepared investment', type: 'string' }),
    defineField({ name: 'decisionMakers', title: 'Other decision-makers', type: 'text' }),
    defineField({ name: 'whyNow', title: 'Why now?', type: 'text' }),
    defineField({
      name: 'qualificationStatus',
      title: 'Next step',
      type: 'string',
      options: { list: [
        { title: 'Fit call', value: 'fit-call' },
        { title: 'Resource first', value: 'resource-first' },
      ] },
    }),
    defineField({
      name: 'emailStatus',
      title: 'Email delivery',
      type: 'string',
      options: { list: [
        { title: 'Pending', value: 'pending' },
        { title: 'Sent', value: 'sent' },
        { title: 'Error', value: 'error' },
        { title: 'Not configured', value: 'not-configured' },
      ] },
    }),
    defineField({ name: 'emailError', title: 'Email error', type: 'text' }),
    defineField({ name: 'emailSentAt', title: 'Email sent', type: 'datetime' }),
    defineField({ name: 'submittedAt', title: 'Submitted', type: 'datetime' }),
  ],
  preview: {
    select: { firstName: 'firstName', lastName: 'lastName', company: 'company', service: 'service' },
    prepare({ firstName, lastName, company, service }) {
      return { title: `${firstName || ''} ${lastName || ''}`.trim() || company || 'Client application', subtitle: `${company || 'No company'} · ${service || 'Not sure'}` };
    },
  },
});
