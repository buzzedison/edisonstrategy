import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

const title = 'About Edison Ade · Founder, Operator, Christian Thinker';
const description = '7 companies built, 7,400+ founders trained. The story and convictions behind Edison\'s work.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ['Edison Ade', 'entrepreneur', 'business strategist', 'startup operator'],
  alternates: { canonical: '/about' },
  openGraph: { title, description, url: '/about', type: 'profile' },
  twitter: { card: 'summary_large_image', title, description },
};

const record = [
  { value: '7', label: 'Companies built' },
  { value: '7,400+', label: 'Founders trained' },
  { value: '15', label: 'Countries reached' },
  { value: '$5M+', label: 'Capital raised' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Edison Ade · Founder, operator, Christian thinker</p>
              <h1 className="page-display mt-7 max-w-5xl">
                I have spent my career turning ideas into things that have to work.
              </h1>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">
                Companies. Products. Programmes. Teams. Work where a clever answer is useless unless people can execute it on Monday.
              </p>
            </div>
            <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] lg:min-h-[680px] lg:rounded-[2rem]">
              <Image src="/image/edisonnew.jpg" alt="Edison Ade" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-center grayscale-[12%]" />
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[92rem] border-y border-black/20">
            <div className="grid gap-8 py-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:py-20">
              <h2 className="section-display max-w-lg">Where it started</h2>
              <div className="max-w-2xl space-y-7 text-lg leading-8 text-black/65">
                <p>Building my own ventures taught me what most advice leaves out. Decisions are made with imperfect information. Systems meet real people. Growth exposes every shortcut you took earlier.</p>
              </div>
            </div>
            <div className="grid gap-8 border-t border-black/20 py-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:py-20">
              <h2 className="section-display max-w-lg">What I do now</h2>
              <div className="max-w-2xl space-y-7 text-lg leading-8 text-black/65">
                <p>I partner with founders who have momentum but whose companies still wait on them for every hard call. Together we find the decision underneath the noise, then turn it into a product, operating system or plan the team can carry.</p>
                <p>I have built 7 companies, trained more than 7,400 founders across 15 countries, and helped raise over $5M. Recent work includes Crowdpen, a platform for creators that grew from idea to 1,500 beta users.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[92rem] grid-cols-2 border-y border-black/15 lg:grid-cols-4">
            {record.map((stat, index) => (
              <div key={stat.label} className={`py-8 ${index % 2 ? 'border-l border-black/15 pl-5' : 'pr-5'} ${index > 1 ? 'border-t border-black/15 lg:border-t-0' : ''} lg:border-l lg:px-8 first:lg:border-l-0 first:lg:pl-0`}>
                <p className="text-4xl font-semibold tracking-[-0.05em]">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-black/48">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[92rem] rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-20 lg:rounded-[2rem] lg:p-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">What I believe</p>
              <div className="mt-7 max-w-2xl space-y-6 text-lg leading-8 text-white/65">
                <p>I am a follower of Jesus, and my faith shapes how I see this work. Scripture is full of leaders who learned they could not carry everything alone, from Moses taking Jethro&rsquo;s advice to Paul entrusting the work to others who would teach others. I believe leaders are called to multiply, not to hoard.</p>
                <p>That conviction also drives my work in apologetics and Christian leadership. I write and speak for thinking people who want honest answers on faith, work and calling.</p>
              </div>
              <h2 className="closing-display mt-12 max-w-4xl">A founder should remain important without remaining the bottleneck.</h2>
            </div>
            <div className="mt-10 flex shrink-0 flex-col gap-4 lg:mt-0">
              <Link href="/contact" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f2ec] px-7 py-4 text-sm font-semibold text-[#1c1c1c]">
                Bring me the problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/faith" className="inline-flex w-fit items-center gap-2 px-1 py-2 text-sm font-medium text-white/65 hover:text-white">
                Faith &amp; Leadership <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
