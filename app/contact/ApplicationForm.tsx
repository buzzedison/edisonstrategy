"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const initialState = {
  firstName: '', lastName: '', email: '', company: '', companyStage: '', whatBuilding: '',
  whatWorking: '', whatStuck: '', whatTried: '', avoidedDecision: '', next90Days: '',
  service: 'not-sure', investmentRange: '', decisionMakers: '', whyNow: '',
};

const fieldClass = 'mt-2 w-full rounded-xl border border-black/15 bg-[#faf9f5] px-4 py-3.5 text-sm outline-none transition focus:border-black/50 focus:ring-2 focus:ring-black/5';

export default function ApplicationForm({ defaultService = 'not-sure' }: { defaultService?: string }) {
  const [form, setForm] = useState({ ...initialState, service: defaultService });
  const [status, setStatus] = useState<'idle' | 'sending' | 'fit-call' | 'resource-first'>('idle');
  const [error, setError] = useState('');

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not save your application.');
      setStatus(data.nextStep);
    } catch (submitError) {
      setStatus('idle');
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong.');
    }
  }

  if (status === 'fit-call') {
    return (
      <div>
        <div className="mb-8 rounded-[1.5rem] bg-[#1c1c1c] p-7 text-white sm:p-9">
          <CheckCircle2 className="h-8 w-8 text-white/70" />
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Your application is in.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/62">There appears to be enough fit for a focused conversation. Choose a 30-minute time below. We will use the call to test the problem, the timing, and whether an engagement is the right next move.</p>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white p-2 sm:p-4">
          <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0cfx_8uXRMAd69sMhA26BXX7exBnW3KDFUtLtoJq9_Llw5b94mWxB7NOqmhaUxM135XnFTPz3L?gv=true" className="h-[720px] w-full border-0 bg-white" title="Book a fit call with Edison Ade" />
        </div>
      </div>
    );
  }

  if (status === 'resource-first') {
    return (
      <div className="rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:p-12">
        <CheckCircle2 className="h-9 w-9 text-white/70" />
        <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em]">Thank you for the honest context.</h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">A paid engagement may be premature right now. Start by identifying where the business depends most heavily on you. The free scorecard will give you a useful diagnosis and a clearer next move.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/founder-scorecard" className="inline-flex items-center gap-2 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c]">Take the scorecard <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/master-the-system" className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-semibold text-white/70">Join the weekly letter <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    );
  }

  const questions = [
    ['whatBuilding', '1. What are you building?', 'Describe the business, product, and customer.'],
    ['whatWorking', '2. What is working already?', 'Revenue, customers, team, traction, funding, or repeatable demand.'],
    ['whatStuck', '3. What feels stuck?', 'Where does momentum slow down or return to you?'],
    ['whatTried', '4. What have you tried?', 'Tell me what changed, what did not, and what you learned.'],
    ['avoidedDecision', '5. What decision are you currently avoiding?', 'The trade-off, commitment, or uncomfortable choice underneath the noise.'],
    ['next90Days', '6. What would need to change in the next 90 days?', 'Describe the result that would make this work worthwhile.'],
    ['decisionMakers', '9. Who else is involved in the decision?', 'Name the roles—not private details—and explain how the decision will be made.'],
    ['whyNow', '10. Why do you want to solve this now?', 'What happens if nothing changes?'],
  ] as const;

  return (
    <form onSubmit={submit} className="rounded-[1.5rem] border border-black/10 bg-white p-6 sm:p-10 lg:rounded-[2rem] lg:p-12">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">First name<input required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={fieldClass} autoComplete="given-name" /></label>
        <label className="text-sm font-semibold">Last name <span className="font-normal text-black/40">(optional)</span><input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={fieldClass} autoComplete="family-name" /></label>
        <label className="text-sm font-semibold">Email<input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={fieldClass} autoComplete="email" /></label>
        <label className="text-sm font-semibold">Company<input required value={form.company} onChange={(e) => update('company', e.target.value)} className={fieldClass} autoComplete="organization" /></label>
      </div>

      <label className="mt-7 block text-sm font-semibold">Company stage
        <select required value={form.companyStage} onChange={(e) => update('companyStage', e.target.value)} className={fieldClass}>
          <option value="">Choose the closest stage</option><option value="idea">Idea or exploration</option><option value="pre-revenue">Building, pre-revenue</option><option value="early-traction">Early customers or traction</option><option value="growing-revenue">Growing, recurring revenue</option><option value="funded">Funded with a team</option>
        </select>
      </label>

      <div className="mt-9 space-y-7">
        {questions.slice(0, 6).map(([field, label, placeholder]) => (
          <label key={field} className="block text-sm font-semibold">{label}<textarea required rows={4} value={form[field]} onChange={(e) => update(field, e.target.value)} placeholder={placeholder} className={fieldClass} /></label>
        ))}
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <label className="text-sm font-semibold">7. Which service appears closest?
          <select required value={form.service} onChange={(e) => update('service', e.target.value)} className={fieldClass}><option value="not-sure">Not sure yet</option><option value="accelerator-sprint">Accelerator Sprint</option><option value="mvp-builder">MVP Builder</option><option value="strategy-partner">Strategy Partner</option></select>
        </label>
        <label className="text-sm font-semibold">8. What investment have you prepared?
          <select required value={form.investmentRange} onChange={(e) => update('investmentRange', e.target.value)} className={fieldClass}><option value="">Choose a range</option><option value="under-1000">Under $1,000</option><option value="1000-2500">$1,000–$2,500</option><option value="2500-5000">$2,500–$5,000</option><option value="5000-10000">$5,000–$10,000</option><option value="10000-plus">$10,000+</option></select>
        </label>
      </div>

      <div className="mt-7 space-y-7">
        {questions.slice(6).map(([field, label, placeholder]) => (
          <label key={field} className="block text-sm font-semibold">{label}<textarea required rows={4} value={form[field]} onChange={(e) => update(field, e.target.value)} placeholder={placeholder} className={fieldClass} /></label>
        ))}
      </div>

      <label className="mt-7 flex items-start gap-3 text-sm leading-6 text-black/55"><input required type="checkbox" className="mt-1 h-4 w-4 accent-black" />I agree that BuzzEdison may use this information to review my application and contact me about it.</label>
      {error && <p className="mt-5 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={status === 'sending'} className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#1c1c1c] px-7 py-4 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto">
        {status === 'sending' ? 'Submitting…' : 'Submit the problem'}{status !== 'sending' && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      </button>
      <p className="mt-4 text-xs leading-5 text-black/40">Submitting is not a commitment to work together. It gives both sides enough context to decide the right next step.</p>
    </form>
  );
}

