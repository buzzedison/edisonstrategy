'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Download, Sparkles, Lock, Users, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    title: 'Map Your AI-Powered Funnel in 60 Minutes',
    desc: 'Use a simple AI prompt sequence to design your entire funnel — from first touch to closed sale — before writing a single word of copy or setting up a single tool.',
  },
  {
    number: '02',
    title: 'Build a Lead Magnet That Sells With AI',
    desc: 'How to use AI to create a high-converting lead magnet in under a day. The exact prompts, formats, and Canva workflows that get 2–5% opt-in rates from cold traffic.',
  },
  {
    number: '03',
    title: 'Automate Your 7-Email Welcome Sequence',
    desc: 'The AI-written email sequence that runs 24/7 — building trust, demonstrating expertise, and warming strangers into ready buyers. Set it up once, let it run forever.',
  },
  {
    number: '04',
    title: 'Use AI to Turn Content Into a Lead Engine',
    desc: 'The exact system for using AI to plan, write, and schedule LinkedIn content that drives traffic into your funnel — without spending hours staring at a blank screen.',
  },
  {
    number: '05',
    title: 'Automate Follow-Up & Close More Clients',
    desc: 'AI tools and automation sequences that follow up, qualify, and convert leads into paying clients — so you spend your time on conversations that are already warm.',
  },
];

const PROOF_POINTS = [
  { stat: '7,400+', label: 'Founders & Operators Trained' },
  { stat: '92%', label: 'Program Completion Rate' },
  { stat: '5', label: 'Operating Ventures Built' },
  { stat: '10+', label: 'Years Execution Experience' },
];

export default function FreePage() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setSuccess(true);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-brand-charcoal flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl text-center"
        >
          <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight">
            Check your inbox.
          </h1>
          <p className="font-sans text-white/60 text-lg font-light leading-relaxed mb-10">
            The <span className="text-white font-medium">AI &amp; Automation Sales Funnel Playbook</span> is on its way to <span className="text-brand-gold">{email}</span>. Check your spam folder if it doesn&apos;t arrive within 5 minutes.
          </p>
          <div className="bg-white/5 border border-white/10 p-8 text-left mb-10">
            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4">While you wait</p>
            <p className="font-sans text-white/70 font-light leading-relaxed">
              I&apos;ll be sending you a short follow-up series over the next two weeks — practical frameworks, real case studies, and the exact systems I use with founders across markets and sectors. Every email is useful. Unsubscribe anytime.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            Back to buzzedison.com <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">

      {/* Hero */}
      <section className="bg-brand-charcoal pt-32 pb-0 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-end">

            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="pb-20"
            >
              <div className="inline-flex items-center px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/20 text-[10px] font-bold tracking-widest text-brand-gold uppercase mb-10">
                <Download className="w-3.5 h-3.5 mr-2" />
                Free Resource — Instant Access
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[0.92] mb-8">
                The AI &amp;<br />
                Automation<br />
                <span className="text-brand-gold italic">Sales Funnel</span><br />
                Playbook.
              </h1>

              <p className="font-sans text-xl text-white/60 font-light leading-relaxed max-w-lg mb-10">
                A free step-by-step PDF that shows founders exactly how to build a sales funnel using AI and automation — so it captures leads and closes clients while you sleep.
              </p>

              <div className="space-y-3 mb-12">
                {[
                  'Build your entire funnel with AI in under a day',
                  'The automated 7-email sequence that converts strangers to clients',
                  'AI prompts that turn LinkedIn content into qualified leads',
                  'Automation tools that follow up and close — without you lifting a finger',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                    <p className="font-sans text-white/70 text-sm font-light">{point}</p>
                  </div>
                ))}
              </div>

              <div className="font-sans flex items-center gap-6 text-[11px] font-medium uppercase tracking-widest text-white/30">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  No spam. Ever.
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  Join 7,400+ founders
                </div>
              </div>
            </motion.div>

            {/* Right: Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:self-end"
            >
              <div className="bg-white p-10 shadow-2xl shadow-black/30 relative">
                {/* Gold accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" />

                <div className="mb-8">
                  <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-3">Free Download</div>
                  <h2 className="text-2xl font-serif font-bold text-brand-charcoal leading-tight">
                    Get the Playbook.<br />
                    <span className="text-brand-muted font-light italic">Build your AI funnel today.</span>
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block font-sans text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Edison"
                      required
                      className="w-full font-sans px-4 py-3.5 border border-zinc-200 text-brand-charcoal placeholder:text-zinc-300 text-sm font-light focus:outline-none focus:border-brand-charcoal transition-colors bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-sans text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full font-sans px-4 py-3.5 border border-zinc-200 text-brand-charcoal placeholder:text-zinc-300 text-sm font-light focus:outline-none focus:border-brand-charcoal transition-colors bg-white"
                    />
                  </div>

                  {error && (
                    <p className="font-sans text-red-500 text-xs font-light">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-charcoal hover:bg-black text-white py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Me the Playbook
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="font-sans text-center text-[10px] text-zinc-400 font-light pt-2">
                    Free forever. Unsubscribe anytime.
                  </p>
                </form>

                {/* Social proof strip */}
                <div className="mt-8 pt-8 border-t border-zinc-100 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['bg-brand-gold', 'bg-zinc-400', 'bg-zinc-600', 'bg-zinc-800'].map((c, i) => (
                      <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white`} />
                    ))}
                  </div>
                  <p className="font-sans text-[11px] text-zinc-400 font-light">
                    <span className="text-brand-charcoal font-medium">7,400+</span> founders already building smarter.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand-stone/40 border-y border-brand-stone py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-zinc-200">
            {PROOF_POINTS.map((p) => (
              <div key={p.stat} className="text-center px-6">
                <div className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal mb-1">{p.stat}</div>
                <div className="font-sans text-[11px] font-medium uppercase tracking-widest text-brand-muted">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-6">What&apos;s Inside</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight leading-tight">
              5 Steps to a Funnel That<br />
              <span className="text-gray-400 italic">Runs Itself With AI.</span>
            </h2>
          </div>

          <div className="space-y-0">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="grid md:grid-cols-12 gap-8 items-start py-10 border-b border-brand-stone/60 group"
              >
                <div className="md:col-span-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">{step.number}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-serif font-bold text-brand-charcoal group-hover:text-brand-gold transition-colors duration-500 leading-snug">
                    {step.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="font-sans text-brand-muted font-light leading-relaxed">{step.desc}</p>
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <div className="w-8 h-8 border border-brand-stone flex items-center justify-center group-hover:bg-brand-charcoal group-hover:border-brand-charcoal transition-all">
                    <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-28 px-6 lg:px-8 bg-brand-stone/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-6">This Is For You If…</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-12">
                You have the skills.<br />
                <span className="text-gray-400 italic">Just not the system.</span>
              </h2>
              <div className="space-y-5">
                {[
                  "You're a founder or consultant with real expertise but a funnel that doesn't reflect it",
                  "You've heard about AI tools but don't know how to wire them into a real sales system",
                  "You're spending hours on content and outreach with nothing automated behind it",
                  "You want leads coming in and follow-ups going out — without doing it all manually",
                  "You're ready to build a funnel once and let it work for you around the clock",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <p className="font-sans text-brand-muted leading-relaxed font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini CTA card */}
            <div className="bg-brand-charcoal p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="relative z-10">
                <Sparkles className="w-8 h-8 text-brand-gold mb-8" />
                <blockquote className="text-2xl md:text-3xl font-serif italic text-white/90 leading-relaxed mb-10">
                  &ldquo;You have the infrastructure of a globally sought-after expert. What you need is a single coherent funnel that converts your credibility into revenue.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                    <Image
                      src="/image/edisonnew.jpg"
                      alt="Edison Ade"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-white font-medium text-sm">Edison Ade</p>
                    <p className="font-sans text-white/40 text-[11px] uppercase tracking-widest">Managing Partner, Enterprise Village</p>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-white/10">
                  <a
                    href="#get-playbook"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-3 bg-white text-brand-charcoal px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-brand-stone transition-colors"
                  >
                    Get the Free Playbook
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Edison */}
      <section className="py-28 px-6 lg:px-8 border-t border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="relative aspect-square overflow-hidden bg-brand-stone">
                <Image
                  src="/image/edisonnew.jpg"
                  alt="Edison Ade"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>
            <div className="lg:col-span-9 lg:pt-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-6">Who Wrote This</div>
              <h2 className="text-4xl font-serif font-bold text-brand-charcoal mb-8 tracking-tight">
                Edison Ade.
              </h2>
              <div className="font-sans space-y-5 text-brand-muted font-light leading-relaxed max-w-2xl">
                <p>
                  Edison is a practical systems thinker — Managing Partner of Enterprise Village, founder of Taskwit (7,400+ alumni), and Executive Director of African Recovery. He has spent over a decade helping founders and organisations build the infrastructure to scale.
                </p>
                <p>
                  This playbook distils the exact AI and automation systems used across five operating ventures — from $300 cohorts to $100,000 technology contracts — into a framework any ambitious founder can deploy in under 30 days.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { icon: Zap, label: 'Bloop Global', sub: 'Tech Development', href: 'https://bloopglobal.com' },
                  { icon: TrendingUp, label: 'Enterprise Village', sub: 'Managing Partner', href: 'https://enterprisevillage.io' },
                  { icon: Users, label: 'Taskwit', sub: '7,400+ Alumni', href: 'https://taskwit.co' },
                ].map(({ icon: Icon, label, sub, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-brand-stone/50 hover:bg-brand-stone px-5 py-3 transition-colors group">
                    <Icon className="w-4 h-4 text-brand-gold" />
                    <div>
                      <p className="font-sans text-[11px] font-bold text-brand-charcoal group-hover:text-brand-gold transition-colors">{label}</p>
                      <p className="font-sans text-[10px] text-brand-muted uppercase tracking-widest">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 lg:px-8 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight mb-8">
              &ldquo;AI doesn&apos;t replace<br /> your hustle. It multiplies it.&rdquo;
            </h2>
            <p className="font-sans text-white/50 text-lg font-light mb-12">
              Get the playbook. Build the funnel. Let automation do the rest.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-3 bg-white text-brand-charcoal px-12 py-5 text-xs font-bold uppercase tracking-wider hover:bg-brand-stone transition-colors"
            >
              Get the Free Playbook
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
