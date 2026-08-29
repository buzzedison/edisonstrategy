import { createHash } from 'crypto';
import { client } from '@/sanity/lib/client';

type SignupFields = Record<string, string>;

interface RecordSignupInput {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  fields?: SignupFields;
}

function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;

  if (!token) {
    throw new Error('SANITY_API_WRITE_TOKEN is not configured');
  }

  return client.withConfig({ token, useCdn: false });
}

function subscriberId(email: string) {
  const digest = createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
  return `newsletterSubscriber.${digest}`;
}

export async function recordNewsletterSignup(input: RecordSignupInput) {
  const writeClient = getWriteClient();
  const email = input.email.trim().toLowerCase();
  const source = (input.source || 'website').trim().slice(0, 80);
  const id = subscriberId(email);
  const now = new Date().toISOString();
  const existing = await writeClient.fetch<{
    firstName?: string;
    lastName?: string;
    firstSubscribedAt?: string;
    sources?: string[];
    founderScore?: string;
    scoreBand?: string;
    primaryConstraint?: string;
  } | null>(
    `*[_id == $id][0]{firstName, lastName, firstSubscribedAt, sources, founderScore, scoreBand, primaryConstraint}`,
    { id }
  );

  const sources = Array.from(new Set([...(existing?.sources || []), source]));

  await writeClient.createOrReplace({
    _id: id,
    _type: 'newsletterSubscriber',
    email,
    firstName: (input.firstName || existing?.firstName || '').trim().slice(0, 100),
    lastName: (input.lastName || existing?.lastName || '').trim().slice(0, 100),
    latestSource: source,
    sources,
    founderScore: input.fields?.founder_score || existing?.founderScore || '',
    scoreBand: input.fields?.score_band || existing?.scoreBand || '',
    primaryConstraint: input.fields?.primary_constraint || existing?.primaryConstraint || '',
    kitStatus: 'pending',
    firstSubscribedAt: existing?.firstSubscribedAt || now,
    lastSubscribedAt: now,
    updatedAt: now,
  });

  return id;
}

export async function updateNewsletterDelivery(
  id: string,
  kitStatus: 'subscribed' | 'error',
  details?: { kitSubscriberId?: string; error?: string }
) {
  const writeClient = getWriteClient();
  await writeClient
    .patch(id)
    .set({
      kitStatus,
      kitSubscriberId: details?.kitSubscriberId || '',
      kitError: details?.error?.slice(0, 240) || '',
      updatedAt: new Date().toISOString(),
    })
    .commit();
}
