import type { ClientApplicationInput } from '@/lib/clientApplications';

type QualificationStatus = 'fit-call' | 'resource-first';

const bookingUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0cfx_8uXRMAd69sMhA26BXX7exBnW3KDFUtLtoJq9_Llw5b94mWxB7NOqmhaUxM135XnFTPz3L?gv=true';
const serviceLabels: Record<string, string> = {
  'accelerator-sprint': 'Accelerator Sprint',
  'mvp-builder': 'MVP Builder',
  'strategy-partner': 'Strategy Partner',
  'not-sure': 'Not sure yet',
};
const stageLabels: Record<string, string> = {
  idea: 'Idea or exploration',
  'pre-revenue': 'Building, pre-revenue',
  'early-traction': 'Early customers or traction',
  'growing-revenue': 'Growing, recurring revenue',
  funded: 'Funded with a team',
};
const budgetLabels: Record<string, string> = {
  'under-1000': 'Under $1,000',
  '1000-2500': '$1,000–$2,500',
  '2500-5000': '$2,500–$5,000',
  '5000-10000': '$5,000–$10,000',
  '10000-plus': '$10,000+',
};

async function sendEmail(payload: { to: string; subject: string; text: string; replyTo: string; idempotencyKey: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || 'BuzzEdison <applications@buzzedison.com>';
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': payload.idempotencyKey,
      'User-Agent': 'BuzzEdison/1.0',
    },
    body: JSON.stringify({
      from,
      to: [payload.to],
      subject: payload.subject,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(typeof data.message === 'string' ? data.message : `Resend returned ${response.status}`);
  return data.id as string | undefined;
}

function applicantMessage(input: ClientApplicationInput, status: QualificationStatus) {
  if (status === 'fit-call') {
    return `Hi ${input.firstName},

Thank you for giving me the honest context behind ${input.company}.

There appears to be enough fit for a focused 30-minute conversation. We will use it to test the problem, timing, and whether an engagement is the right next move.

Choose a time: ${bookingUrl}

Bring the live decision. You do not need to prepare a polished presentation.

Edison
BuzzEdison`;
  }

  return `Hi ${input.firstName},

Thank you for sharing the context behind ${input.company}.

A paid engagement may be premature right now, but you can still leave with a useful next step. Take the free Founder Bottleneck Scorecard to identify where the business depends most heavily on you:

https://www.buzzedison.com/founder-scorecard

You can also join Master the System for one useful operating idea each week:

https://www.buzzedison.com/master-the-system

Edison
BuzzEdison`;
}

function adminMessage(input: ClientApplicationInput, status: QualificationStatus) {
  return `NEW CLIENT APPLICATION

Next step: ${status === 'fit-call' ? 'Fit call' : 'Resource first'}
Founder: ${input.firstName} ${input.lastName}
Company: ${input.company}
Email: ${input.email}
Stage: ${stageLabels[input.companyStage] || input.companyStage}
Closest service: ${serviceLabels[input.service] || input.service}
Prepared investment: ${budgetLabels[input.investmentRange] || input.investmentRange}

WHAT THEY ARE BUILDING
${input.whatBuilding}

WHAT IS WORKING
${input.whatWorking}

WHAT FEELS STUCK
${input.whatStuck}

WHAT THEY TRIED
${input.whatTried}

DECISION BEING AVOIDED
${input.avoidedDecision}

REQUIRED CHANGE IN 90 DAYS
${input.next90Days}

DECISION-MAKERS
${input.decisionMakers}

WHY NOW
${input.whyNow}

Review: https://www.buzzedison.com/admin/applications`;
}

export async function sendApplicationEmails(input: ClientApplicationInput, status: QualificationStatus, applicationId: string) {
  const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'ask@buzzedison.com';
  const replyTo = process.env.RESEND_REPLY_TO_EMAIL || 'ask@buzzedison.com';
  const service = serviceLabels[input.service] || input.service;
  const prefix = status === 'fit-call' ? 'Fit call' : 'Resource first';
  const results = await Promise.allSettled([
    sendEmail({
      to: adminEmail,
      replyTo: input.email,
      subject: `[${prefix}] ${input.company} · ${service}`,
      text: adminMessage(input, status),
      idempotencyKey: `${applicationId}-admin`,
    }),
    sendEmail({
      to: input.email,
      replyTo,
      subject: status === 'fit-call' ? 'Next step: choose a time with BuzzEdison' : 'Your next step from BuzzEdison',
      text: applicantMessage(input, status),
      idempotencyKey: `${applicationId}-applicant`,
    }),
  ]);
  const errors = results.flatMap((result) => result.status === 'rejected' ? [result.reason instanceof Error ? result.reason.message : 'Email delivery failed'] : []);
  return { sent: errors.length === 0, errors };
}

