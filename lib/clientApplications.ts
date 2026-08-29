import { client } from '@/sanity/lib/client';

export interface ClientApplicationInput {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  companyStage: string;
  whatBuilding: string;
  whatWorking: string;
  whatStuck: string;
  whatTried: string;
  avoidedDecision: string;
  next90Days: string;
  service: string;
  investmentRange: string;
  decisionMakers: string;
  whyNow: string;
}

function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error('SANITY_API_WRITE_TOKEN is not configured');
  return client.withConfig({ token, useCdn: false });
}

export function assessApplication(input: ClientApplicationInput): 'fit-call' | 'resource-first' {
  const fundedStages = ['early-traction', 'growing-revenue', 'funded'];
  const preparedBudgets = ['2500-5000', '5000-10000', '10000-plus'];
  const hasOperatingFit = fundedStages.includes(input.companyStage);
  const hasPreparedBudget = preparedBudgets.includes(input.investmentRange);
  const strategyFit = input.service !== 'strategy-partner' || ['growing-revenue', 'funded'].includes(input.companyStage);

  return hasOperatingFit && hasPreparedBudget && strategyFit ? 'fit-call' : 'resource-first';
}

export async function recordClientApplication(input: ClientApplicationInput) {
  const submittedAt = new Date().toISOString();
  const qualificationStatus = assessApplication(input);
  const document = await getWriteClient().create({
    _type: 'clientApplication',
    ...input,
    email: input.email.trim().toLowerCase(),
    qualificationStatus,
    emailStatus: 'pending',
    submittedAt,
  });

  return { id: document._id, qualificationStatus };
}

export async function updateApplicationEmailStatus(id: string, status: 'sent' | 'error' | 'not-configured', error = '') {
  await getWriteClient().patch(id).set({
    emailStatus: status,
    emailError: error.slice(0, 500),
    emailSentAt: status === 'sent' ? new Date().toISOString() : null,
  }).commit();
}
