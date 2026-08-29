"use client";

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronDown, CircleDollarSign, Search, Users } from 'lucide-react';
import { useAuth } from '@/lib/authContext';

interface Application {
  _id: string; firstName: string; lastName?: string; email: string; company: string; companyStage: string;
  whatBuilding: string; whatWorking: string; whatStuck: string; whatTried: string; avoidedDecision: string;
  next90Days: string; service: string; investmentRange: string; decisionMakers: string; whyNow: string;
  qualificationStatus: 'fit-call' | 'resource-first'; emailStatus?: 'pending' | 'sent' | 'error' | 'not-configured';
  emailError?: string; emailSentAt?: string; submittedAt: string;
}

const serviceLabels: Record<string, string> = { 'accelerator-sprint': 'Accelerator Sprint', 'mvp-builder': 'MVP Builder', 'strategy-partner': 'Strategy Partner', 'not-sure': 'Not sure' };
const stageLabels: Record<string, string> = { idea: 'Idea', 'pre-revenue': 'Pre-revenue', 'early-traction': 'Early traction', 'growing-revenue': 'Growing revenue', funded: 'Funded' };
const budgetLabels: Record<string, string> = { 'under-1000': 'Under $1,000', '1000-2500': '$1,000–$2,500', '2500-5000': '$2,500–$5,000', '5000-10000': '$5,000–$10,000', '10000-plus': '$10,000+' };

export default function ApplicationsPage() {
  const { session } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.access_token) return;
    fetch('/api/admin/applications', { headers: { Authorization: `Bearer ${session.access_token}` }, cache: 'no-store' })
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error); return data; })
      .then((data) => setApplications(data.applications || []))
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : 'Unable to load applications'))
      .finally(() => setLoading(false));
  }, [session?.access_token]);

  const filtered = useMemo(() => applications.filter((application) => {
    const query = search.toLowerCase();
    const matchesSearch = !query || [application.firstName, application.lastName, application.email, application.company, application.whatStuck].some((value) => value?.toLowerCase().includes(query));
    return matchesSearch && (filter === 'all' || application.qualificationStatus === filter);
  }), [applications, filter, search]);

  const fitCount = applications.filter((application) => application.qualificationStatus === 'fit-call').length;
  const preparedCount = applications.filter((application) => ['2500-5000', '5000-10000', '10000-plus'].includes(application.investmentRange)).length;

  return (
    <div className="space-y-10">
      <header><p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-brand-muted">Pipeline</p><h1 className="text-4xl font-medium tracking-tight text-brand-charcoal">Client applications</h1><p className="mt-2 font-light text-brand-muted">The context behind every request to work together.</p></header>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { label: 'Total applications', value: applications.length, icon: Users },
          { label: 'Fit-call invitations', value: fitCount, icon: CheckCircle2 },
          { label: 'Prepared budgets', value: preparedCount, icon: CircleDollarSign },
        ].map((stat) => <div key={stat.label} className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm"><stat.icon className="mb-5 h-5 w-5 text-brand-muted" /><p className="text-3xl text-brand-charcoal">{stat.value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-muted">{stat.label}</p></div>)}
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <label className="relative flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search founder, company, email or problem…" className="w-full rounded-2xl border border-gray-100 bg-white py-4 pl-12 pr-5 text-sm outline-none" /></label>
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm"><option value="all">All next steps</option><option value="fit-call">Fit call</option><option value="resource-first">Resource first</option></select>
      </div>
      {loading ? <div className="flex justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-charcoal border-t-transparent" /></div> : error ? <p className="rounded-2xl bg-red-50 p-6 text-sm text-red-700">{error}</p> : (
        <div className="space-y-4">
          {filtered.map((application) => {
            const expanded = open === application._id;
            return <article key={application._id} className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
              <button onClick={() => setOpen(expanded ? null : application._id)} className="grid w-full gap-5 p-6 text-left md:grid-cols-[1.2fr_.8fr_.7fr_auto] md:items-center md:p-8">
                <div><p className="font-semibold text-brand-charcoal">{application.firstName} {application.lastName}</p><p className="mt-1 text-sm text-brand-muted">{application.company} · {application.email}</p></div>
                <div><p className="text-sm font-medium">{serviceLabels[application.service] || application.service}</p><p className="mt-1 text-xs text-brand-muted">{stageLabels[application.companyStage]} · {budgetLabels[application.investmentRange]}</p></div>
                <div><span className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${application.qualificationStatus === 'fit-call' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{application.qualificationStatus === 'fit-call' ? 'Fit call' : 'Resource first'}</span><p className="mt-2 text-xs text-brand-muted">Email: {application.emailStatus || 'pending'} · {new Date(application.submittedAt).toLocaleDateString()}</p></div>
                <ChevronDown className={`h-5 w-5 text-brand-muted transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
              {expanded && <div className="border-t border-gray-100 bg-brand-stone/20 p-6 md:p-8">{application.emailError && <p className="mb-6 rounded-xl bg-red-50 p-4 text-xs text-red-700">Email delivery: {application.emailError}</p>}<div className="grid gap-7 md:grid-cols-2">{[
                ['What they are building', application.whatBuilding], ['What is working', application.whatWorking], ['What feels stuck', application.whatStuck], ['What they tried', application.whatTried], ['Decision being avoided', application.avoidedDecision], ['Required 90-day change', application.next90Days], ['Decision-makers', application.decisionMakers], ['Why now', application.whyNow],
              ].map(([label, value]) => <div key={label}><p className="text-[9px] font-bold uppercase tracking-[.16em] text-brand-muted">{label}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-brand-charcoal/75">{value}</p></div>)}</div><a href={`mailto:${application.email}`} className="mt-8 inline-flex rounded-full bg-brand-charcoal px-5 py-3 text-xs font-semibold text-white">Email {application.firstName}</a></div>}
            </article>;
          })}
          {!filtered.length && <div className="rounded-[2rem] border border-gray-100 bg-white p-16 text-center text-brand-muted">No applications match this view.</div>}
        </div>
      )}
    </div>
  );
}
