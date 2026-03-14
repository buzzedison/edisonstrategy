import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Courses | Coming Soon | Buzzedison',
  description:
    'Practical courses for founders — on pricing, systems, growth, and execution. Join the waitlist to be first in when they launch.',
};

const upcoming = [
  {
    title: 'Pricing with Confidence',
    description: 'Stop guessing and start charging what your work is worth. A practical course on value-based pricing for founders.',
    tag: 'Business Strategy',
  },
  {
    title: 'Build Your Operating System',
    description: 'The systems and workflows that let you scale without burning out your team — or yourself.',
    tag: 'Systems & Execution',
  },
  {
    title: 'From Idea to First Customers',
    description: 'A step-by-step framework for validating your idea, finding early adopters, and making your first sales.',
    tag: 'Founder Fundamentals',
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white text-[#1c1c1c] selection:bg-zinc-200 antialiased">

      {/* Hero */}
      <section className="px-6 lg:px-8 pt-24 lg:pt-36 pb-24 lg:pb-40">
        <div className="max-w-[76rem] mx-auto">
          <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-6">
            Courses
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-serif text-[#1c1c1c] leading-[1.05] tracking-tight mb-6 max-w-2xl">
            Learning that actually<br />
            <span className="italic">moves your business.</span>
          </h1>
          <p className="text-base font-sans text-zinc-600 leading-relaxed mb-10 max-w-lg">
            Practical, no-fluff courses built for founders who are too busy for theory and need tools they can use this week. Launching soon.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1c1c1c] text-white px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-800 transition-colors"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Upcoming courses */}
      <section className="px-6 lg:px-8 py-24 lg:py-40 bg-[#f4f2ec]">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-16">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              Coming Soon
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight">
              What&apos;s in the pipeline.
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-zinc-200">
            {upcoming.map((c, idx) => (
              <div key={c.title} className="grid lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 py-12 lg:py-14 group">
                <span className="text-5xl font-serif italic text-zinc-300 group-hover:text-zinc-400 transition-colors leading-none">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <div>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2">
                    {c.tag}
                  </p>
                  <h3 className="text-2xl font-serif text-[#1c1c1c] mb-4">{c.title}</h3>
                  <p className="text-[15px] font-sans text-zinc-600 leading-relaxed max-w-xl">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 mt-5 text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-zinc-400 border border-zinc-300 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    In Development
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In the meantime */}
      <section className="px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-16">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              While You Wait
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight">
              Start here.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-[#f4f2ec] rounded-2xl p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Free Tools</p>
                <h3 className="text-xl font-serif text-[#1c1c1c] mb-3">Pricing Calculators</h3>
                <p className="text-[13px] font-sans text-zinc-600 leading-relaxed">
                  Value-based, cost-plus, target return — free tools to price your work with confidence.
                </p>
              </div>
              <Link href="/tools/pricing" className="mt-6 inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-[0.1em] text-[#1c1c1c] hover:text-zinc-500 transition-colors">
                Try the Tools <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-[#f4f2ec] rounded-2xl p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Insights</p>
                <h3 className="text-xl font-serif text-[#1c1c1c] mb-3">Essays & Playbooks</h3>
                <p className="text-[13px] font-sans text-zinc-600 leading-relaxed">
                  Actionable writing on building, pricing, systems, and what it takes to grow without burning out.
                </p>
              </div>
              <Link href="/insights" className="mt-6 inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-[0.1em] text-[#1c1c1c] hover:text-zinc-500 transition-colors">
                Read the Insights <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-[#f4f2ec] rounded-2xl p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Coaching</p>
                <h3 className="text-xl font-serif text-[#1c1c1c] mb-3">Work With Edison</h3>
                <p className="text-[13px] font-sans text-zinc-600 leading-relaxed">
                  Skip the waiting list. Book a 1-on-1 strategy session and get clarity on your biggest challenge now.
                </p>
              </div>
              <Link href="/coaching" className="mt-6 inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-[0.1em] text-[#1c1c1c] hover:text-zinc-500 transition-colors">
                Book a Session <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
