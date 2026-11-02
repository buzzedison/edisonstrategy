import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

const title = 'Faith & Leadership · Edison Ade';
const description = 'Apologetics and Christian leadership: faith that thinks, leadership that multiplies.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ['Christian apologetics', 'Christian leadership', 'faith and work', 'Jethro Principle', 'Edison Ade'],
  alternates: { canonical: '/faith' },
  openGraph: { title, description, url: '/faith', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

const speakingEmail = 'mailto:ask@buzzedison.com?subject=Speaking%20invitation';

const tracks = [
  {
    label: 'Apologetics',
    title: 'Faith that thinks',
    body: 'For skeptics, seekers and believers who want reasons, not slogans. Is there evidence for God? Can a scientist believe? Why does God allow suffering? Did the resurrection happen? I take the questions seriously and answer them with respect.',
    href: '/insights?tag=apologetics',
    cta: 'Read apologetics',
  },
  {
    label: 'Christian leadership',
    title: 'Leadership that multiplies',
    body: 'For pastors, founders and professionals who lead people. Stewardship, calling, delegation, integrity under pressure, and building teams that outlast you, starting with the Jethro Principle.',
    href: '#jethro-principle',
    cta: 'Start with the Jethro Principle',
  },
];

const startHere = [
  {
    title: 'The Jethro Principle',
    note: 'Moses and the first founder bottleneck',
    href: '#jethro-principle',
  },
  {
    title: 'Where Did Christian Doctrine Come From?',
    note: 'A clear-eyed look at how the church found its beliefs',
    href: '/insights/where-did-christian-doctrine-come-from-a-clear-eyed-look-at-how-the-church-found-its-beliefs',
  },
  {
    title: '9th Century Archaeology and the Bible',
    note: 'What the stones say about the biblical record',
    href: '/insights/9th-century-archaeology-and-the-bible-the-stones-do-not-lie',
  },
];

export default function FaithPage() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="mx-auto max-w-[92rem] border-b border-black/20 pb-16 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-24 lg:pb-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Faith &amp; Leadership</p>
              <h1 className="page-display mt-7 max-w-5xl">Faith that thinks. Leadership that multiplies.</h1>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="max-w-lg text-lg leading-8 text-black/60">Honest answers to hard questions about God, and practical wisdom for leaders who believe their work is a calling.</p>
              <a href={speakingEmail} className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#1c1c1c] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                Invite Edison to speak <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/42">Why this is here</p>
            </div>
            <div className="max-w-2xl space-y-6 text-lg leading-8 text-black/65">
              <p>Most of my week is spent with founders, systems and strategy. But the reason I do this work is older than any business framework. I believe people are made to create, to lead and to serve, and that faith in Christ can stand up to the toughest questions a thinking person can ask.</p>
              <p className="font-semibold text-black">This is where I write and teach about both.</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/42">Two tracks</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {tracks.map((track, index) => (
                <Link
                  key={track.title}
                  href={track.href}
                  className={`group flex min-h-[380px] flex-col justify-between rounded-[1.5rem] p-8 transition-transform hover:-translate-y-1 sm:p-10 lg:rounded-[2rem] lg:p-12 ${
                    index === 0 ? 'bg-[#1c1c1c] text-white' : 'border border-black/15 bg-white'
                  }`}
                >
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${index === 0 ? 'text-white/40' : 'text-black/40'}`}>{track.label}</p>
                    <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">{track.title}</h2>
                    <p className={`mt-6 max-w-xl text-base leading-7 ${index === 0 ? 'text-white/60' : 'text-black/58'}`}>{track.body}</p>
                  </div>
                  <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">
                    {track.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="jethro-principle" className="scroll-mt-24 bg-[#1c1c1c] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">The Jethro Principle</p>
              <h2 className="section-display mt-6 max-w-2xl">The founder bottleneck is 3,000 years old.</h2>
            </div>
            <div className="max-w-2xl space-y-6 text-lg leading-8 text-white/65">
              <p>In Exodus 18, Moses sat from morning to evening settling every dispute himself. His father-in-law, Jethro, told him plainly: what you are doing is not good. You will wear yourself out, and the people with you. Raise capable leaders and share the load.</p>
              <p>I call it the Jethro Principle, and it sits under all my work. Leaders are not meant to be the answer to every question. They are meant to multiply.</p>
              <p className="font-semibold text-white">A founder should remain important without remaining the bottleneck.</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem] lg:grid lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
            <div>
              <h2 className="section-display max-w-md">Start here</h2>
            </div>
            <div className="mt-12 border-t border-black/20 lg:mt-0">
              {startHere.map((item, index) => (
                <Link key={item.title} href={item.href} className="group grid gap-3 border-b border-black/20 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8 lg:py-9">
                  <span className="text-xs text-black/35">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-black/55">{item.note}</p>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 text-black/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black sm:block" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
          <div className="mx-auto max-w-[92rem] rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-20 lg:rounded-[2rem] lg:p-20">
            <div>
              <h2 className="closing-display max-w-4xl">Invite me</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">I speak to churches, campus fellowships, leadership retreats and business audiences on faith, calling and leadership.</p>
            </div>
            <div className="mt-10 flex shrink-0 flex-col gap-4 lg:mt-0">
              <a href={speakingEmail} className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f2ec] px-7 py-4 text-sm font-semibold text-[#1c1c1c]">
                Invite Edison to speak <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link href="/speaking" className="inline-flex w-fit items-center gap-2 px-1 py-2 text-sm font-medium text-white/65 hover:text-white">
                See all talks <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
