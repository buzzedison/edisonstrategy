import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const topics = [
  ['Building beyond the founder', 'How leaders create companies that keep their judgment without keeping every decision.'],
  ['Africa’s next business advantage', 'What builders can see when they stop importing assumptions and start designing from context.'],
  ['AI after the excitement', 'Where intelligent tools create actual leverage—and where they simply make noise faster.'],
  ['From idea to operating system', 'The decisions, habits, and infrastructure that turn early momentum into durable growth.'],
];

const partners = ['UNFPA', 'YALDA', 'AIESEC', 'Enactus', 'GhanaTechLab', 'USIU'];

export default function SpeakingPage() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Speaking · Podcasts · Leadership rooms</p>
              <h1 className="page-display mt-7 max-w-5xl">Ideas should still be useful after the applause.</h1>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">I speak about the decisions behind growth: what founders carry, what teams need, and what becomes possible when we build from the realities of African markets instead of around them.</p>
              <Link href="/contact" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#1c1c1c] px-6 py-3.5 text-sm font-semibold text-white">Discuss your audience <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></Link>
            </div>
            <div className="relative min-h-[480px] overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] lg:min-h-[650px] lg:rounded-[2rem]">
              <Image src="/image/edisonnew.jpg" alt="Edison Ade speaking" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover grayscale-[15%]" />
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem] lg:grid lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Current conversations</p>
              <h2 className="section-display mt-5 max-w-md">A strong talk gives the room a better question.</h2>
            </div>
            <div className="mt-12 border-t border-black/20 lg:mt-0">
              {topics.map(([title, description], index) => (
                <article key={title} className="grid gap-3 border-b border-black/20 py-7 sm:grid-cols-[3rem_.8fr_1.2fr] sm:gap-8 lg:py-9">
                  <span className="text-xs text-black/35">0{index + 1}</span>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="text-sm leading-6 text-black/58 sm:text-base sm:leading-7">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1c1c1c] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Formats</p>
              <h2 className="section-display mt-6 max-w-xl">Keynotes, podcasts, and rooms where people can think out loud.</h2>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/55">Every session is shaped around the audience. No recycled deck with a new event logo. We agree on the tension in the room and build from there.</p>
              <Link href="/africaforward" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline decoration-white/25 underline-offset-4 hover:decoration-white">Explore Africa Forward <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="border-t border-white/20 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Selected organisations</p>
              <div className="mt-8 grid grid-cols-2 border-l border-t border-white/15 sm:grid-cols-3">
                {partners.map((partner) => <div key={partner} className="border-b border-r border-white/15 px-5 py-7 text-sm font-semibold text-white/65">{partner}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto flex max-w-[92rem] flex-col gap-10 border-t border-black/20 pt-12 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="closing-display max-w-4xl">What does your audience need to see differently?</h2>
            <Link href="/contact" className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#1c1c1c] px-7 py-4 text-sm font-semibold text-white">Talk through the room <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
        </section>
      </main>
    </div>
  );
}
