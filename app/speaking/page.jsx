import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const title = 'Speaking · Edison Ade';
const description = 'Talks on the founder bottleneck, the Jethro Principle, and faith that holds up under scrutiny.';

export const metadata = {
  title: { absolute: title },
  description,
  keywords: ['Edison Ade speaker', 'founder bottleneck talk', 'Christian leadership speaker', 'apologetics speaker', 'startup keynote speaker'],
  alternates: { canonical: '/speaking' },
  openGraph: { title, description, url: '/speaking', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

const bookingEmail = 'mailto:ask@buzzedison.com?subject=Speaking%20invitation';

const talks = [
  ['The Founder Bottleneck', 'Founder events, accelerators', 'Why your company still waits on you, and the system that frees it'],
  ['The Jethro Principle', 'Leadership retreats, churches', 'Leaders are called to multiply, not to carry everything alone'],
  ['Clarity Before Scale', 'Startup and SME audiences', 'How to pick the one priority that matters for the next 90 days'],
  ['Faith That Thinks', 'Campuses, churches, Q&A nights', 'Honest answers to the hardest questions about God'],
  ['Calling and Work', 'Christian professionals', 'Why business can be ministry, and what that demands of you'],
];

const partners = ['UNFPA', 'YALDA', 'AIESEC', 'Enactus', 'GhanaTechLab', 'USIU'];

export default function SpeakingPage() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Speaking</p>
              <h1 className="page-display mt-7 max-w-5xl">Talks for leaders who are tired of being the answer to everything.</h1>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">Edison speaks to founders, executives, churches and campuses on building organisations that don&rsquo;t depend on one person, and on faith that holds up under scrutiny.</p>
              <a href={bookingEmail} className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#1c1c1c] px-6 py-3.5 text-sm font-semibold text-white">Book Edison <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></a>
            </div>
            <div className="relative min-h-[480px] overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] lg:min-h-[650px] lg:rounded-[2rem]">
              <Image src="/image/edisonnew.jpg" alt="Edison Ade speaking" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover grayscale-[15%]" />
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <h2 className="section-display">Talks</h2>
            <div className="mt-12 border-t border-black/20">
              <div className="hidden gap-8 border-b border-black/20 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40 md:grid md:grid-cols-[3rem_1fr_1fr_1.4fr]">
                <span /><span>Talk</span><span>Best for</span><span>The takeaway</span>
              </div>
              {talks.map(([talk, bestFor, takeaway], index) => (
                <article key={talk} className="grid gap-2 border-b border-black/20 py-7 md:grid-cols-[3rem_1fr_1fr_1.4fr] md:items-baseline md:gap-8 lg:py-9">
                  <span className="text-xs text-black/35">0{index + 1}</span>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{talk}</h3>
                  <p className="text-sm text-black/50"><span className="md:hidden">Best for: </span>{bestFor}</p>
                  <p className="text-sm leading-6 text-black/65 sm:text-base sm:leading-7">{takeaway}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
          <div className="mx-auto grid max-w-[92rem] gap-14 rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:p-12 lg:grid-cols-2 lg:gap-24 lg:rounded-[2rem] lg:p-20">
            <div>
              <h2 className="section-display max-w-xl">Speaker bio</h2>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">Edison Ade is a founder, operator and strategy partner who helps growing companies outgrow founder-dependent growth. He has built 7 companies, trained more than 7,400 founders across 15 countries, and helped raise over $5M. He also writes and speaks on Christian leadership and apologetics, making the case for faith to thinking professionals.</p>
              <a href={bookingEmail} className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c]">Book Edison <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></a>
            </div>
            <div className="border-t border-white/20 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Selected organisations</p>
              <div className="mt-8 grid grid-cols-2 border-l border-t border-white/15 sm:grid-cols-3">
                {partners.map((partner) => <div key={partner} className="border-b border-r border-white/15 px-5 py-7 text-sm font-semibold text-white/65">{partner}</div>)}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
