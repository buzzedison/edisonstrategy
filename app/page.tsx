import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Gauge, Mail } from 'lucide-react';
import { getLandingPageContent } from '@/lib/landingPage';

const audiences = [
  {
    number: '01',
    title: 'The founder bottleneck',
    description: 'Your company cannot move quickly without you.',
  },
  {
    number: '02',
    title: 'The growth question',
    description: 'You have several possible opportunities but no clear 90-day priority.',
  },
  {
    number: '03',
    title: 'The product decision',
    description: 'You need to build the right product before spending on the wrong one.',
  },
];

const offers = [
  {
    number: '01',
    name: 'Accelerator Sprint',
    timing: 'Four weeks',
    forWhom: 'For founders with traction, too many priorities, and no clear answer to “what now?”',
    description: 'We identify the constraint, sharpen the position, and create one decisive 90-day plan.',
  },
  {
    number: '02',
    name: 'MVP Builder',
    timing: 'Eight weeks',
    forWhom: 'For non-technical founders who need to build the right product before investing in the wrong one.',
    description: 'We turn the business case into a focused MVP with the right scope, architecture, and learning goals.',
  },
  {
    number: '03',
    name: 'Strategy Partner',
    timing: 'Quarterly',
    forWhom: 'For founders carrying the company’s hardest decisions alone.',
    description: 'A recurring operating partnership across growth, product, systems, team structure, and what to stop doing.',
  },
];

const method = [
  {
    number: '01',
    title: 'Find the constraint',
    description: 'We identify the one issue making everything else harder.',
  },
  {
    number: '02',
    title: 'Make the trade-off',
    description: 'We decide what matters now—and what will deliberately wait.',
  },
  {
    number: '03',
    title: 'Build the system',
    description: 'We create the strategy, product, workflow, or operating rhythm your team can actually use.',
  },
  {
    number: '04',
    title: 'Stay close to reality',
    description: 'The work continues until the decision is clear and the system holds under pressure.',
  },
];

export default async function Home() {
  const content = await getLandingPageContent();
  const portraitSrc = content.hero.portraitImageUrl || '/image/edisonaboutnew.jpg';
  const stats = content.trustBarStats.length
    ? content.trustBarStats.slice(0, 4)
    : [
        { value: '7', label: 'Companies built' },
        { value: '7,400+', label: 'Founders trained' },
        { value: '15', label: 'Countries reached' },
        { value: '$5M+', label: 'Capital raised' },
      ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.seo.personName,
    url: content.seo.websiteUrl,
    sameAs: content.seo.socialLinks,
    jobTitle: content.seo.jobTitle,
    worksFor: { '@type': 'Organization', name: content.seo.organizationName },
    description: content.seo.description,
  };

  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main>
        <section className="px-5 pb-8 pt-28 sm:px-8 lg:px-12 lg:pb-12 lg:pt-32">
          <div className="mx-auto grid max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] text-white lg:min-h-[720px] lg:grid-cols-[1.08fr_.92fr] lg:rounded-[2rem]">
            <div className="flex flex-col justify-between px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 xl:px-20">
              <div>
                <p className="mb-9 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                  Founder, operator and strategy partner
                </p>
                <h1 className="max-w-[760px] text-[clamp(3rem,5.5vw,5.75rem)] font-medium leading-[0.96] tracking-[-0.058em] text-balance">
                  Your business has outgrown guesswork.
                </h1>
              </div>

              <div className="mt-14 max-w-xl lg:mt-16">
                <p className="max-w-[34rem] text-base leading-7 text-white/64 sm:text-lg">
                  When every important decision still lands on your desk, growth becomes a more expensive version of chaos. I help you turn hard-won momentum into a company that can think, sell, and move without waiting on you.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href="/founder-scorecard" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c] transition-transform hover:-translate-y-0.5 hover:bg-white">
                    Find the real constraint
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="/services" className="inline-flex w-fit items-center gap-2 px-1 py-3 text-sm font-medium text-white/65 transition-colors hover:text-white">
                    See how I work <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative min-h-[460px] lg:min-h-full">
              <Image src={portraitSrc} alt="Edison Ade, founder, operator and strategy partner" fill priority sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover object-center grayscale-[12%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#1c1c1c]/15 lg:to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#1c1c1c] backdrop-blur sm:bottom-8 sm:left-8">
                {content.seo.personName} · {content.seo.jobTitle}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Track record" className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto grid max-w-[92rem] grid-cols-2 border-y border-black/15 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`py-7 ${index % 2 === 0 ? 'pr-5' : 'border-l border-black/15 pl-5'} ${index > 1 ? 'border-t border-black/15 lg:border-t-0' : ''} lg:border-l lg:border-t-0 lg:px-8 first:lg:border-l-0 first:lg:pl-0`}>
                <p className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-black/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/42">When momentum becomes complicated</p>
              <h2 className="section-display mt-6 max-w-xl">Your business is growing. Your way of running it is not.</h2>
            </div>
            <div className="max-w-2xl space-y-6 text-lg leading-8 text-black/62">
              <p>You have customers, ideas, opportunities, and a team.</p>
              <p>You also have too many decisions waiting for you.</p>
              <p>Every important approval still lands on your desk. Priorities keep shifting. Your team is busy, but progress feels inconsistent. You are unsure whether the next move is to hire, build, reposition, raise, or stop.</p>
              <p className="font-semibold text-black">The problem is rarely effort. It is usually the system underneath the effort.</p>
              <Link href="/founder-scorecard" className="group inline-flex items-center gap-2 pt-2 text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
                Find the real constraint in four minutes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem] border-t border-black/20 pt-12">
            <h2 className="section-display max-w-4xl">This is for founders who have traction—but need a better way to carry it.</h2>
            <div className="mt-14 grid border-l border-t border-black/15 md:grid-cols-3">
              {audiences.map((item) => (
                <article key={item.title} className="min-h-[240px] border-b border-r border-black/15 p-7 sm:p-9 lg:p-10">
                  <p className="text-xs font-semibold text-black/32">{item.number}</p>
                  <h3 className="mt-12 text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-black/55 sm:text-base sm:leading-7">{item.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-6 text-black/48">If you are still searching for an idea, I may not be the right partner yet. If you have momentum but the old way of operating is starting to break, we should talk.</p>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[92rem]">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/42">Ways to work together</p>
                <h2 className="section-display mt-6 max-w-xl">The right strategy should change what happens on Monday morning.</h2>
              </div>
              <div className="border-t border-black/20">
                {offers.map((offer) => (
                  <Link key={offer.name} href="/services" className="group grid gap-5 border-b border-black/20 py-8 sm:grid-cols-[3rem_.8fr_1.2fr_auto] sm:gap-7 lg:py-10">
                    <span className="text-xs font-semibold text-black/32">{offer.number}</span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/38">{offer.timing}</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">{offer.name}</h3>
                    </div>
                    <div>
                      <p className="font-medium leading-7">{offer.forWhom}</p>
                      <p className="mt-3 text-sm leading-6 text-black/55">{offer.description}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-black/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
                  </Link>
                ))}
                <Link href="/services" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
                  Choose the right starting point <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1c1c1c] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <h2 className="section-display max-w-4xl">Clarity is not the deliverable. It is what enables execution.</h2>
            <div className="mt-14 grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
              {method.map((step) => (
                <article key={step.title} className="min-h-[280px] border-b border-r border-white/15 p-7 sm:p-9">
                  <p className="text-xs font-semibold text-white/30">{step.number}</p>
                  <h3 className="mt-14 text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/52">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-white lg:grid-cols-[.9fr_1.1fr] lg:rounded-[2rem]">
            <div className="relative min-h-[480px] lg:min-h-[680px]">
              <Image src="/image/edisonnew.jpg" alt="Edison Ade at work" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover grayscale-[12%]" />
            </div>
            <div className="flex flex-col justify-between border-t border-black/10 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16 xl:p-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">Built in the real world</p>
                <h2 className="section-display mt-7 max-w-xl">The work is the argument.</h2>
                <div className="mt-8 max-w-xl space-y-5 text-base leading-7 text-black/58 sm:text-lg sm:leading-8">
                  <p>I have built companies, products, teams, communities, and growth systems across markets and sectors.</p>
                  <p>My work sits at the intersection of strategy and implementation: turning complicated opportunities into decisions, products, and operating systems people can actually use.</p>
                </div>
              </div>
              <Link href="/portfolio" className="group mt-12 inline-flex w-fit items-center gap-2 text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
                See the work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[92rem] gap-12 border-y border-black/20 py-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:py-24">
            <h2 className="closing-display max-w-3xl">A founder should remain important without remaining the bottleneck.</h2>
            <div className="max-w-2xl space-y-6 text-lg leading-8 text-black/60">
              <p>I do not believe founders need more generic advice, more dashboards, or another strategy document that disappears into a folder.</p>
              <p>They need someone who understands the pressure of making decisions with incomplete information—and who can stay close enough to help turn those decisions into something the team can carry.</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/42">Start with something useful</p>
              <h2 className="section-display mt-6">You do not need to become a client to leave with more clarity.</h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Link href="/founder-scorecard" className="group flex min-h-[360px] flex-col justify-between rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white transition-transform hover:-translate-y-1 sm:p-10 lg:rounded-[2rem] lg:p-12">
                <div>
                  <Gauge className="h-7 w-7 text-white/70" />
                  <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Free · Four minutes</p>
                  <h3 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">Founder Bottleneck Scorecard</h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-white/58">Find the operating constraint keeping important decisions on your desk and get three moves for the next seven days.</p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">Take the scorecard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>

              <Link href="/master-the-system" className="group flex min-h-[360px] flex-col justify-between rounded-[1.5rem] border border-black/15 bg-white p-8 transition-transform hover:-translate-y-1 sm:p-10 lg:rounded-[2rem] lg:p-12">
                <div>
                  <Mail className="h-7 w-7 text-black/55" />
                  <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-black/38">Free · Every Thursday</p>
                  <h3 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">Master the System</h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-black/55">One precise idea each week for building a company that can think, sell, and move without waiting for you.</p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">Read about the letter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[92rem] rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:p-12 lg:grid lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20 lg:rounded-[2rem] lg:p-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/38">The next move</p>
              <h2 className="closing-display mt-7 max-w-4xl">Bring me the decision that keeps following you home.</h2>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="max-w-lg text-base leading-7 text-white/58 sm:text-lg sm:leading-8">You do not need a perfect brief. Tell me what is changing, what feels stuck, and why it matters now. We will find the real question together.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/contact" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c] hover:bg-white">
                  Start the conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/insights" className="inline-flex w-fit items-center gap-2 px-1 py-3 text-sm font-medium text-white/60 hover:text-white">Read the insights <ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
