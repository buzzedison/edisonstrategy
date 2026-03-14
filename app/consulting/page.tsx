import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Growth Strategy Consulting for Founders | Buzzedison',
  description:
    'Edison Ade helps founders fix broken systems, sharpen their market position, and grow revenue without burning out their team. Book a free strategy call.',
  keywords: [
    'business strategy consulting',
    'founder coaching',
    'growth strategy',
    'startup consulting',
    'business systems',
    'revenue growth',
    'Edison Ade consulting',
  ],
  openGraph: {
    title: 'Growth Strategy Consulting for Founders | Buzzedison',
    description:
      'Fix business chaos, build smarter workflows, and grow revenue without burning out. Work with Edison Ade.',
    url: 'https://www.buzzedison.com/consulting',
    images: [
      {
        url: 'https://www.buzzedison.com/image/edisonabout.jpg',
        width: 1200,
        height: 630,
        alt: 'Edison Ade — Growth Strategy Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth Strategy Consulting for Founders | Buzzedison',
    description:
      'Fix business chaos, build smarter workflows, and grow revenue without burning out. Work with Edison Ade.',
    images: ['https://www.buzzedison.com/image/edisonabout.jpg'],
  },
};

const services = [
  {
    number: '01',
    title: 'Business Model Clarity',
    description:
      'Most founders are busy but not profitable. We audit your model, kill what is draining you, and double down on what can actually scale.',
    outcomes: ['Revenue model audit', 'Product-market fit diagnosis', 'Pricing & packaging review'],
  },
  {
    number: '02',
    title: 'Market Positioning',
    description:
      'If your target customer can not immediately understand why you and not a competitor, you will always compete on price. We fix that.',
    outcomes: ['Competitive landscape mapping', 'Value proposition sharpening', 'Messaging that converts'],
  },
  {
    number: '03',
    title: 'Systems & Execution',
    description:
      'Strategy without execution is noise. We build the operating rhythms, workflows, and accountability structures that turn plans into results.',
    outcomes: ['Operating cadence design', 'Team & delegation systems', 'KPI dashboard setup'],
  },
];

const process = [
  {
    step: '\'01.',
    title: 'Discovery Call',
    description:
      'We spend 60 minutes mapping your current reality — what is working, what is broken, and where you are losing the most time or money.',
  },
  {
    step: '\'02.',
    title: 'Strategy Sprint',
    description:
      'I build a clear 90-day roadmap tailored to your stage, team size, and market — no generic playbooks, no filler slides.',
  },
  {
    step: '\'03.',
    title: 'Implementation Support',
    description:
      'Optional ongoing advisory to keep execution on track, unblock decisions, and adapt the strategy as your market responds.',
  },
];

const testimonials = [
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    role: 'Founder, TechStartup',
    quote:
      'Edison did not give me a 40-page report I would never read. He gave me three things to fix and a clear order to fix them in. We raised our seed round four months later.',
  },
  {
    initials: 'MC',
    name: 'Michael Chen',
    role: 'CEO, GrowthSaaS',
    quote:
      'In six weeks we went from reactive to intentional. He spotted the pricing issue we had been ignoring for a year and helped us restructure it. ARR went from $50K to $500K in 18 months.',
  },
];

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-white text-[#1c1c1c] selection:bg-zinc-200 antialiased">

      {/* Hero */}
      <section className="px-6 lg:px-8 pt-24 lg:pt-32 pb-24 lg:pb-40">
        <div className="max-w-[76rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left */}
            <div>
              <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-6">
                Growth Strategy Consulting
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight mb-6">
                Your business is busy.<br />
                <span className="italic">Is it growing?</span>
              </h1>
              <p className="text-base font-sans text-zinc-600 leading-relaxed mb-10 max-w-lg">
                Most founders I talk to are not short on effort — they are short on clarity.
                We work together to cut the noise, fix the systems that are leaking revenue,
                and build a plan you can actually execute.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#1c1c1c] text-white px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-800 transition-colors"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 border border-zinc-200 text-[#1c1c1c] px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-50 transition-colors"
                >
                  See What We Cover
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-10 mt-12 pt-10 border-t border-zinc-100">
                <div>
                  <p className="text-3xl font-serif text-[#1c1c1c]">100+</p>
                  <p className="text-[12px] font-sans text-zinc-500 mt-1">Founders Helped</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-[#1c1c1c]">$5M+</p>
                  <p className="text-[12px] font-sans text-zinc-500 mt-1">Revenue Unlocked</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-[#1c1c1c]">12+</p>
                  <p className="text-[12px] font-sans text-zinc-500 mt-1">Years in the Field</p>
                </div>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-[#f4f2ec]">
                <Image
                  src="/image/edisonabout.jpg"
                  alt="Edison Ade — Business Strategy Consultant"
                  width={600}
                  height={680}
                  className="object-cover w-full h-[480px] lg:h-[560px] object-top"
                  priority
                />
              </div>
              {/* Floating quote card */}
              <div className="absolute -bottom-6 -left-6 bg-white border border-zinc-100 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-5 max-w-[220px]">
                <p className="text-[13px] font-serif italic text-[#1c1c1c] leading-snug">
                  &ldquo;Clarity is the leverage most founders are missing.&rdquo;
                </p>
                <p className="text-[11px] font-sans text-zinc-400 mt-2 uppercase tracking-widest">Edison Ade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 lg:px-8 py-24 lg:py-40 bg-[#f4f2ec]">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-16 lg:mb-24">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              What We Work On
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight max-w-xl">
              Three areas that move<br />the needle fastest.
            </h2>
          </div>

          <div className="flex flex-col gap-0 divide-y divide-zinc-200">
            {services.map((s) => (
              <div
                key={s.number}
                className="grid lg:grid-cols-[200px_1fr_280px] gap-6 lg:gap-16 py-12 lg:py-14 group"
              >
                <div>
                  <span className="text-5xl lg:text-6xl font-serif italic text-zinc-300 group-hover:text-zinc-400 transition-colors">
                    {s.number}.
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-[#1c1c1c] mb-4">{s.title}</h3>
                  <p className="text-[15px] font-sans text-zinc-600 leading-relaxed">{s.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {s.outcomes.map((o) => (
                    <div key={o} className="flex items-center gap-2 text-[13px] font-sans text-zinc-600">
                      <span className="w-1 h-1 rounded-full bg-zinc-400 flex-shrink-0" />
                      {o}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 lg:mb-24">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              How It Works
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight">
              Simple process.<br />Real outcomes.
            </h2>
          </div>

          <div className="flex flex-col gap-12 lg:gap-16 relative">
            <div className="absolute left-[2.2rem] top-8 bottom-12 w-[1px] bg-zinc-200 hidden md:block" />
            {process.map((p, idx) => (
              <div key={idx} className="flex items-start gap-8 lg:gap-12 relative z-10">
                <div className="hidden md:flex w-[4.5rem] h-[4.5rem] bg-white rounded-full border border-zinc-200 items-center justify-center shrink-0 shadow-sm">
                  <span className="text-sm font-serif text-zinc-400">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex-1 lg:pt-2">
                  <div className="flex items-baseline gap-6 mb-3">
                    <span className="text-5xl lg:text-6xl font-serif italic text-[#1c1c1c] tracking-tighter">
                      {p.step}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-serif text-[#1c1c1c]">{p.title}</h3>
                  </div>
                  <p className="text-[15px] font-sans text-zinc-600 leading-relaxed lg:pl-[6.5rem] max-w-xl">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 lg:px-8 py-24 lg:py-40 bg-[#f4f2ec]">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-16">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              Founder Stories
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight">
              Results speak louder.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 lg:p-10 border border-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <p className="text-lg font-serif italic text-[#1c1c1c] leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-sans font-bold text-white">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-sans font-semibold text-[#1c1c1c]">{t.name}</p>
                    <p className="text-[12px] font-sans text-zinc-500">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-[76rem] mx-auto">
          <div className="bg-[#1c1c1c] rounded-3xl px-8 py-16 lg:px-20 lg:py-24 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
                Ready to Start
              </p>
              <h2 className="text-3xl lg:text-[44px] font-serif text-white leading-[1.1] tracking-tight mb-4">
                Let&apos;s figure out what is<br />
                <span className="italic">actually holding you back.</span>
              </h2>
              <p className="text-[15px] font-sans text-zinc-400 leading-relaxed">
                No pitch deck. No commitment. Just a clear 30-minute conversation about your business and what you can do next.
              </p>
              <div className="flex items-center gap-6 mt-6 text-[12px] font-sans text-zinc-500">
                <span>✓ Free discovery call</span>
                <span>✓ No fluff</span>
                <span>✓ Clear next steps</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1c1c1c] px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-100 transition-colors"
              >
                Book Your Free Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-400 px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:border-zinc-500 hover:text-zinc-300 transition-colors"
              >
                About Edison
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
