import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

const title = 'About Edison Ade: Founder, Operator & Strategy Partner';
const description = 'Meet Edison Ade, a founder and operator helping entrepreneurs turn difficult decisions into products, systems, and companies their teams can carry.';

export const metadata: Metadata = {
  title,
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Edison Ade · Founder and operator</p>
              <h1 className="page-display mt-7 max-w-5xl">
                I have spent my career turning ideas into things that have to work.
              </h1>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-black/60">
                Companies. Products. Programmes. Teams. The kind of work where a clever answer is useless unless people can execute it on Monday.
              </p>
            </div>
            <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] lg:min-h-[680px] lg:rounded-[2rem]">
              <Image src="/image/edisonnew.jpg" alt="Edison Ade" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-center grayscale-[12%]" />
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[92rem] gap-12 border-y border-black/20 py-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:py-20">
            <h2 className="section-display max-w-lg">The work changed. The question did not.</h2>
            <div className="max-w-2xl space-y-7 text-lg leading-8 text-black/65">
              <p>I started by building my own companies. That taught me what most advice leaves out: decisions are made with imperfect information, systems meet real people, and growth exposes every shortcut you took earlier.</p>
              <p>Since then, I have worked with founders across markets and sectors to find the decision underneath the noise—then turn that decision into a product, operating system, or plan the team can carry.</p>
              <p>I am most useful when the business has momentum but the old way of running it no longer fits. When the founder is still the answer to every question. When there are more opportunities than conviction. When the next move matters too much to guess.</p>
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
              <h2 className="closing-display mt-7 max-w-4xl">A founder should remain important without remaining the bottleneck.</h2>
            </div>
            <Link href="/contact" className="group mt-10 inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#f4f2ec] px-7 py-4 text-sm font-semibold text-[#1c1c1c] lg:mt-0">
              Bring me the problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
