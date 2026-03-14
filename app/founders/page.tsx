import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Founders Circle | Community for Ambitious Founders | Buzzedison',
  description:
    'Founders Circle is an exclusive community designed to connect, support, and empower founders throughout their entrepreneurial journeys. Join serious builders across Africa and beyond.',
};

const offerings = [
  {
    number: '01',
    title: 'Curated Community',
    description:
      'Members are hand-selected based on their ambition, experience, and willingness to support fellow founders. Quality over quantity — always.',
  },
  {
    number: '02',
    title: 'Peer-to-Peer Learning',
    description:
      'Regular events, workshops, and focused forums where founders share real expertise, not sanitised success stories.',
  },
  {
    number: '03',
    title: 'Expert Access',
    description:
      'Mentors, investors, and operators who have done it — offering guidance and honest feedback, not motivational noise.',
  },
  {
    number: '04',
    title: 'Exclusive Events',
    description:
      'Private gatherings, workshops, and retreats built around deep work and genuine connection — not networking theatre.',
  },
];

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-white text-[#1c1c1c] selection:bg-zinc-200 antialiased">

      {/* Hero */}
      <section className="px-6 lg:px-8 pt-20 lg:pt-24 mb-24 lg:mb-40">
        <div className="max-w-[76rem] mx-auto rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm">
          {/* Left */}
          <div className="flex-1 bg-[#f4f2ec] px-8 py-16 lg:px-20 lg:py-28 flex flex-col justify-center text-center md:text-left">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-6">
              Founders Circle
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight mb-6">
              Empowering Founders,<br />
              <span className="italic">Together.</span>
            </h1>
            <p className="text-base font-sans text-zinc-600 leading-relaxed mb-10 max-w-md mx-auto md:mx-0">
              An exclusive community designed to connect, support, and elevate founders throughout their entrepreneurial journeys. A collaborative space to share knowledge, navigate challenges, and unlock new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="https://airtable.com/app6sLDmnMh84vOP4/pagUnNFYcByTVbday/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1c1c1c] text-white px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-800 transition-colors"
              >
                Join the Circle
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#offerings"
                className="inline-flex items-center justify-center gap-2 border border-zinc-300 text-[#1c1c1c] px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="md:w-5/12 relative min-h-[360px] lg:min-h-full">
            <Image
              src="/image/founders.png"
              alt="Founders collaborating"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="px-6 lg:px-8 py-24 lg:py-40 bg-[#f4f2ec]">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-16 lg:mb-24">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              What We Offer
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight max-w-xl">
              A better way<br />
              <span className="italic">to grow your startup.</span>
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-zinc-200">
            {offerings.map((o) => (
              <div
                key={o.number}
                className="grid lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 py-12 lg:py-14 group"
              >
                <span className="text-5xl font-serif italic text-zinc-300 group-hover:text-zinc-400 transition-colors leading-none">
                  {o.number}.
                </span>
                <div>
                  <h3 className="text-2xl font-serif text-[#1c1c1c] mb-4">{o.title}</h3>
                  <p className="text-[15px] font-sans text-zinc-600 leading-relaxed max-w-xl">{o.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Also explore */}
      <section className="px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-16">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
              Go Deeper
            </p>
            <h2 className="text-4xl lg:text-[48px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight">
              More ways to<br />
              <span className="italic">level up.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-[#f4f2ec] rounded-2xl p-8 lg:p-10 flex flex-col justify-between min-h-[240px]">
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Programme</p>
                <h3 className="text-2xl font-serif text-[#1c1c1c] mb-4">Startup Catalyst Mastermind</h3>
                <p className="text-[14px] font-sans text-zinc-600 leading-relaxed">
                  A structured 12-week programme for founders who want to move from idea to traction — fast.
                </p>
              </div>
              <Link
                href="/catalyst"
                className="mt-8 inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-[0.1em] text-[#1c1c1c] hover:text-zinc-500 transition-colors"
              >
                See the Programme <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-[#f4f2ec] rounded-2xl p-8 lg:p-10 flex flex-col justify-between min-h-[240px]">
              <div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Coaching</p>
                <h3 className="text-2xl font-serif text-[#1c1c1c] mb-4">1-on-1 Founder Coaching</h3>
                <p className="text-[14px] font-sans text-zinc-600 leading-relaxed">
                  Private sessions built around your specific stage and challenges — strategy, systems, clarity.
                </p>
              </div>
              <Link
                href="/coaching"
                className="mt-8 inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-[0.1em] text-[#1c1c1c] hover:text-zinc-500 transition-colors"
              >
                Book a Session <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 pb-32 lg:pb-48">
        <div className="max-w-[76rem] mx-auto">
          <div className="bg-[#1c1c1c] rounded-3xl px-8 py-16 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl lg:text-[40px] font-serif text-white leading-[1.1] tracking-tight mb-4">
                Ready to accelerate<br />
                <span className="italic">your startup journey?</span>
              </h2>
              <p className="text-[15px] font-sans text-zinc-400">
                Join a community of serious founders who are building real things and helping each other win.
              </p>
            </div>
            <Link
              href="https://airtable.com/app6sLDmnMh84vOP4/pagUnNFYcByTVbday/form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1c1c1c] px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-100 transition-colors flex-shrink-0"
            >
              Become a Member
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
