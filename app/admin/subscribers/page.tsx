"use client";

import { useEffect, useMemo, useState } from 'react';
import { Download, Mail, Search, Target, Users } from 'lucide-react';
import { useAuth } from '@/lib/authContext';

interface Subscriber {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  latestSource?: string;
  sources?: string[];
  founderScore?: string;
  scoreBand?: string;
  primaryConstraint?: string;
  kitStatus?: 'pending' | 'subscribed' | 'error';
  firstSubscribedAt?: string;
  lastSubscribedAt?: string;
}

const sourceLabels: Record<string, string> = {
  master_the_system: 'Master the System',
  founder_bottleneck_scorecard: 'Founder Scorecard',
  website: 'Website',
};

function csvCell(value: string | undefined) {
  return `"${(value || '').replace(/"/g, '""')}"`;
}

export default function SubscribersPage() {
  const { session } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [source, setSource] = useState('all');

  useEffect(() => {
    if (!session?.access_token) return;

    async function loadSubscribers() {
      try {
        const response = await fetch('/api/admin/subscribers', {
          headers: { Authorization: `Bearer ${session?.access_token}` },
          cache: 'no-store',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to load subscribers');
        setSubscribers(data.subscribers || []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load subscribers');
      } finally {
        setLoading(false);
      }
    }

    loadSubscribers();
  }, [session?.access_token]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return subscribers.filter((subscriber) => {
      const matchesSearch = !query || [
        subscriber.email,
        subscriber.firstName,
        subscriber.lastName,
        subscriber.primaryConstraint,
        subscriber.scoreBand,
      ].some((value) => value?.toLowerCase().includes(query));
      const matchesSource = source === 'all' || subscriber.sources?.includes(source) || subscriber.latestSource === source;
      return matchesSearch && matchesSource;
    });
  }, [search, source, subscribers]);

  const scorecardCount = subscribers.filter((subscriber) => subscriber.sources?.includes('founder_bottleneck_scorecard')).length;
  const letterCount = subscribers.filter((subscriber) => subscriber.sources?.includes('master_the_system')).length;
  const newThisMonth = subscribers.filter((subscriber) => {
    if (!subscriber.firstSubscribedAt) return false;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    return new Date(subscriber.firstSubscribedAt) >= cutoff;
  }).length;

  function exportCsv() {
    const headers = ['First name', 'Last name', 'Email', 'Source', 'Founder score', 'Score band', 'Primary constraint', 'Kit status', 'First subscribed'];
    const rows = filtered.map((subscriber) => [
      subscriber.firstName,
      subscriber.lastName,
      subscriber.email,
      sourceLabels[subscriber.latestSource || ''] || subscriber.latestSource,
      subscriber.founderScore,
      subscriber.scoreBand,
      subscriber.primaryConstraint,
      subscriber.kitStatus,
      subscriber.firstSubscribedAt,
    ].map(csvCell).join(','));
    const blob = new Blob([[headers.map(csvCell).join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `buzzedison-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">Audience</p>
          <h1 className="text-4xl font-serif font-medium tracking-tight text-brand-charcoal">Newsletter subscribers</h1>
          <p className="mt-2 font-light text-brand-muted">Every signup, with the context needed to serve them well.</p>
        </div>
        <button onClick={exportCsv} disabled={!filtered.length} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-charcoal px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white disabled:opacity-40">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total subscribers', value: subscribers.length, icon: Users },
          { label: 'New in 30 days', value: newThisMonth, icon: Mail },
          { label: 'Scorecard leads', value: scorecardCount, icon: Target },
          { label: 'Letter signups', value: letterCount, icon: Mail },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
            <stat.icon className="mb-5 h-5 w-5 text-brand-muted" />
            <p className="text-3xl font-serif text-brand-charcoal">{stat.value}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, score or constraint…" className="w-full rounded-2xl border border-gray-100 bg-white py-4 pl-12 pr-5 text-sm outline-none focus:ring-2 focus:ring-brand-stone" />
        </label>
        <select value={source} onChange={(event) => setSource(event.target.value)} className="rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm text-brand-charcoal outline-none">
          <option value="all">All sources</option>
          <option value="master_the_system">Master the System</option>
          <option value="founder_bottleneck_scorecard">Founder Scorecard</option>
          <option value="website">Website</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-charcoal border-t-transparent" /></div>
        ) : error ? (
          <div className="p-10 text-sm text-red-700">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-brand-muted">No subscribers match this view yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="border-b border-gray-100 bg-brand-stone/50 text-[9px] font-bold uppercase tracking-[0.16em] text-brand-muted">
                <tr>
                  <th className="px-6 py-4">Subscriber</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Scorecard result</th>
                  <th className="px-6 py-4">Kit</th>
                  <th className="px-6 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((subscriber) => (
                  <tr key={subscriber._id} className="align-top hover:bg-brand-stone/20">
                    <td className="px-6 py-5">
                      <p className="font-medium text-brand-charcoal">{[subscriber.firstName, subscriber.lastName].filter(Boolean).join(' ') || '—'}</p>
                      <a href={`mailto:${subscriber.email}`} className="mt-1 block text-sm text-brand-muted hover:text-brand-charcoal">{subscriber.email}</a>
                    </td>
                    <td className="px-6 py-5 text-sm text-brand-muted">{sourceLabels[subscriber.latestSource || ''] || subscriber.latestSource || 'Website'}</td>
                    <td className="px-6 py-5">
                      {subscriber.founderScore ? (
                        <>
                          <p className="font-medium text-brand-charcoal">{subscriber.founderScore} · {subscriber.scoreBand}</p>
                          <p className="mt-1 max-w-xs text-sm text-brand-muted">{subscriber.primaryConstraint}</p>
                        </>
                      ) : <span className="text-brand-muted">—</span>}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${subscriber.kitStatus === 'subscribed' ? 'bg-green-50 text-green-700' : subscriber.kitStatus === 'error' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                        {subscriber.kitStatus || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-brand-muted">{subscriber.firstSubscribedAt ? new Date(subscriber.firstSubscribedAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

