'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function NewsletterInline({ source = 'home_closing' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setError('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not subscribe you.');
      setState('sent');
    } catch (err) {
      setState('idle');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (state === 'sent') {
    return (
      <div role="status" className="flex items-center gap-4 rounded-[1.5rem] bg-white p-6 sm:p-8">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-[#1c1c1c] text-white">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <p className="text-lg font-semibold tracking-[-0.02em]">You&rsquo;re in.</p>
          <p className="text-base text-black/60">Check your inbox to confirm. The first letter lands this Thursday.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className="block text-sm font-medium text-black/60">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="h-14 min-w-0 flex-1 rounded-full bg-white px-6 text-base text-[#1c1c1c] outline-none ring-1 ring-black/10 transition-shadow placeholder:text-black/35 focus:ring-2 focus:ring-[#1c1c1c]"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#1c1c1c] px-8 text-base font-semibold text-white transition-transform active:scale-[0.97] disabled:opacity-70"
        >
          {state === 'sending' ? 'Joining…' : 'Join free'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}
