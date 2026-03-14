'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const tabs = [
  {
    id: 'problem',
    label: 'The Problem',
    heading: 'Great ideas stall without the right support.',
    body: "Starting a business is hard. Founders have great ideas but often struggle to execute them. Building an MVP, raising funding, assembling a team, and getting to market can feel like navigating a maze without a map. Many fail not because the idea isn't good — but because they lack the right guidance, tools, and people around them.",
  },
  {
    id: 'solution',
    label: 'The Solution',
    heading: 'A structured path from idea to traction.',
    body: 'Startup Catalyst Mastermind is a founder-focused program designed to help entrepreneurs turn ideas into MVPs, secure funding, and build businesses that last. Monthly mastermind sessions, hands-on workshops, and a curated network of ambitious founders give you the structure and momentum you need to move fast.',
  },
  {
    id: 'goal',
    label: 'The Goal',
    heading: 'Idea to MVP. MVP to funded. Funded to growing.',
    body: "We're not here to give you generic advice or motivational speeches. The goal is concrete: help you move from idea to first customers, get funded, and build a company that compounds. Every session, every framework, every connection is designed to drive one thing — real results.",
  },
];

const pillars = [
  {
    number: '01',
    title: 'Monthly Mastermind Sessions',
    description:
      'Bring your hardest problem. Leave with a plan. Each session is a structured peer-review where founders share what is blocking them and get direct, actionable feedback from the group.',
  },
  {
    number: '02',
    title: 'Skill-Building Workshops',
    description:
      'Fundraising, team building, product development, sales — practical skills taught in the context of real startups, not textbook scenarios.',
  },
  {
    number: '03',
    title: 'Founder Therapy',
    description:
      '72% of founders admit to mental health struggles. We take this seriously. One dedicated session per month on the psychological side of building — burnout, doubt, identity, and resilience.',
  },
];

const reasons = [
  {
    title: 'Proven Expertise',
    body: 'Led by Edison Ade — a founder with 15+ years across Africa, the US, and UK, who has built, failed, rebuilt, and scaled.',
  },
  {
    title: 'Hands-On, Not Motivational',
    body: 'No keynote-style inspiration. Every session has a clear output. You leave with frameworks, decisions, and next steps.',
  },
  {
    title: 'A Curated Community',
    body: 'Every member is vetted. You are in a room with people who are serious, moving fast, and willing to help each other win.',
  },
  {
    title: 'Real Results',
    body: 'Past members have shipped MVPs, raised pre-seed rounds, and grown revenue — within the programme window.',
  },
];

export default function CatalystPage() {
  const [activeTab, setActiveTab] = useState('problem');
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-white text-[#1c1c1c] selection:bg-zinc-200 antialiased">

      {/* Hero */}
      <section className="px-6 lg:px-8 pt-24 lg:pt-36 pb-24 lg:pb-40">
        <div className="max-w-[76rem] mx-auto text-center">
          <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-6">
            Startup Catalyst Mastermind
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-serif text-[#1c1c1c] leading-[1.05] tracking-tight mb-6 max-w-3xl mx-auto">
            Build. Lead.<br />
            <span className="italic">Succeed.</span>
          </h1>
          <p className="text-base font-sans text-zinc-600 leading-relaxed mb-10 max-w-xl mx-auto">
            A founder mastermind for the serious ones — the ones building real companies, solving real problems, and ready to do the work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://airtable.com/appSFdtBZ0mhEzlyF/pag9uDaL9FhNYGYNP/form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1c1c1c] text-white px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-800 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalyst/founder-therapy"
              className="inline-flex items-center justify-center gap-2 border border-zinc-200 text-[#1c1c1c] px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-50 transition-colors"
            >
              Founder Therapy Session
            </Link>
          </div>
        </div>
      </section>

      {/* Problem / Solution / Goal — tabbed */}
      <section className="px-6 lg:px-8 py-24 lg:py-40 bg-[#f4f2ec]">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              The Startup Journey
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight">
              Why most founders<br />
              <span className="italic">don&apos;t make it.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-16">
            {/* Tabs */}
            <div className="flex flex-row lg:flex-col gap-3">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-5 py-3 rounded-full text-[12px] font-sans font-semibold text-left transition-colors ${
                    activeTab === t.id
                      ? 'bg-[#1c1c1c] text-white'
                      : 'border border-zinc-300 text-zinc-600 hover:border-zinc-400 bg-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-8 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h3 className="text-2xl lg:text-3xl font-serif text-[#1c1c1c] mb-4">{active.heading}</h3>
              <p className="text-[15px] font-sans text-zinc-600 leading-relaxed">{active.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Pillars */}
      <section className="px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-16 lg:mb-24">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              How It Works
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight max-w-xl">
              Three pillars.<br />
              <span className="italic">One clear path forward.</span>
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-zinc-100">
            {pillars.map((p) => (
              <div
                key={p.number}
                className="grid lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 py-12 lg:py-14 group"
              >
                <span className="text-5xl font-serif italic text-zinc-200 group-hover:text-zinc-300 transition-colors leading-none">
                  {p.number}.
                </span>
                <div>
                  <h3 className="text-2xl font-serif text-[#1c1c1c] mb-4">{p.title}</h3>
                  <p className="text-[15px] font-sans text-zinc-600 leading-relaxed max-w-xl">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="px-6 lg:px-8 py-24 lg:py-40 bg-[#f4f2ec]">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-16">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              Why Startup Catalyst
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight max-w-xl">
              Built for founders<br />
              <span className="italic">by a founder.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="bg-white rounded-2xl p-8 lg:p-10 border border-zinc-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-xl font-serif text-[#1c1c1c] mb-3">{r.title}</h3>
                <p className="text-[14px] font-sans text-zinc-600 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-[76rem] mx-auto">
          <div className="bg-[#1c1c1c] rounded-3xl px-8 py-16 lg:px-20 lg:py-24 text-center">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              Ready to Apply
            </p>
            <h2 className="text-3xl lg:text-[48px] font-serif text-white leading-[1.1] tracking-tight mb-4 max-w-2xl mx-auto">
              Stop waiting for the right moment.<br />
              <span className="italic">This is it.</span>
            </h2>
            <p className="text-[15px] font-sans text-zinc-400 mb-10 max-w-md mx-auto">
              In partnership with Enterprise Village, Bloop Global, and Taskwit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="https://airtable.com/appSFdtBZ0mhEzlyF/pag9uDaL9FhNYGYNP/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1c1c1c] px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-100 transition-colors"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalyst/founder-therapy"
                className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-400 px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:border-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Founder Therapy Session
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
