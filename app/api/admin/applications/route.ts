import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';

async function isAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!token || !supabaseUrl || !serviceKey) return false;

  const supabase = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await supabase.auth.getUser(token);
  return !error && data.user?.email === 'buzzedison@gmail.com';
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;
    const applications = await client.withConfig({ token, useCdn: false }).fetch(`
      *[_type == "clientApplication"] | order(submittedAt desc) {
        _id, firstName, lastName, email, company, companyStage, whatBuilding, whatWorking,
        whatStuck, whatTried, avoidedDecision, next90Days, service, investmentRange,
        decisionMakers, whyNow, qualificationStatus, emailStatus, emailError, emailSentAt, submittedAt
      }
    `);
    return NextResponse.json({ applications }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load applications';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
