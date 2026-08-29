import { NextRequest, NextResponse } from 'next/server';
import { recordClientApplication, updateApplicationEmailStatus, type ClientApplicationInput } from '@/lib/clientApplications';
import { sendApplicationEmails } from '@/lib/applicationEmails';

const requiredFields: Array<keyof ClientApplicationInput> = [
  'firstName', 'email', 'company', 'companyStage', 'whatBuilding', 'whatWorking',
  'whatStuck', 'whatTried', 'avoidedDecision', 'next90Days', 'service',
  'investmentRange', 'decisionMakers', 'whyNow',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const missing = requiredFields.find((field) => !body[field] || String(body[field]).trim().length === 0);
    if (missing) return NextResponse.json({ error: 'Please complete every required question.' }, { status: 400 });

    const email = String(body.email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    const cleanString = (value: unknown, length = 3000) => typeof value === 'string' ? value.trim().slice(0, length) : '';
    const clean: ClientApplicationInput = {
      firstName: cleanString(body.firstName, 100),
      lastName: cleanString(body.lastName, 100),
      email: cleanString(body.email, 320),
      company: cleanString(body.company, 160),
      companyStage: cleanString(body.companyStage, 60),
      whatBuilding: cleanString(body.whatBuilding),
      whatWorking: cleanString(body.whatWorking),
      whatStuck: cleanString(body.whatStuck),
      whatTried: cleanString(body.whatTried),
      avoidedDecision: cleanString(body.avoidedDecision),
      next90Days: cleanString(body.next90Days),
      service: cleanString(body.service, 80),
      investmentRange: cleanString(body.investmentRange, 80),
      decisionMakers: cleanString(body.decisionMakers),
      whyNow: cleanString(body.whyNow),
    };
    const result = await recordClientApplication(clean);

    if (!process.env.RESEND_API_KEY) {
      await updateApplicationEmailStatus(result.id, 'not-configured', 'RESEND_API_KEY is not configured');
    } else {
      const delivery = await sendApplicationEmails(clean, result.qualificationStatus, result.id);
      await updateApplicationEmailStatus(result.id, delivery.sent ? 'sent' : 'error', delivery.errors.join(' | '));
      if (!delivery.sent) {
        console.error('Application email delivery failed:', { applicationId: result.id, errors: delivery.errors });
      }
    }

    return NextResponse.json({ success: true, nextStep: result.qualificationStatus });
  } catch (error) {
    console.error('Client application error:', error);
    return NextResponse.json({ error: 'We could not save your application. Please try again.' }, { status: 500 });
  }
}
