import Image from 'next/image';
import Link from 'next/link';
import StatsBand from '@/app/components/StatsBand';
import NewsletterInline from '@/app/components/NewsletterInline';
import BottleneckGraphic from '@/app/components/graphics/BottleneckGraphic';
import JethroTree from '@/app/components/graphics/JethroTree';
import MethodRail from '@/app/components/graphics/MethodRail';
import { ArrowRight, ArrowUpRight, Compass, Gauge, Hammer, Hourglass, Mail } from 'lucide-react';
import { getLandingPageContent } from '@/lib/landingPage';

const goals = [
  { title: 'Stop being the bottleneck', meta: 'Founder Scorecard · Four minutes, free', href: '/founder-scorecard' },
  { title: 'Know what to do next', meta: 'Accelerator Sprint · Four weeks', href: '/services' },
  { title: 'Build the right product', meta: 'MVP Builder · About eight weeks', href: '/services' },
  { title: 'Let your team decide', meta: 'Strategy Partner · Twelve weeks', href: '/services' },
];

const audienceIcons = [Hourglass, Compass, Hammer];

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
    timing: 'Flagship · Four weeks',
    forWhom: 'For founders with traction, too many priorities, and no clear answer to “what now?”',
    description: 'We identify the constraint holding the business back and turn it into one focused 90-day execution plan.',
  },
  {
    number: '02',
    name: 'MVP Builder',
    timing: 'Typically eight weeks',
    forWhom: 'For founders who know what must be built but need help shipping it.',
    description: 'We turn the business case into a focused product real customers can use, test, and pay for.',
  },
  {
    number: '03',
    name: 'Strategy Partner',
    timing: 'Selective · 12 weeks',
    forWhom: 'For established founders whose company returns to them for every hard decision.',
    description: 'An operating partnership that transfers judgment into the team and reduces founder dependency.',
  },
];

const method = [
  {
    number: '01',
    title: 'Find the constraint',
    description: 'The one issue making everything else harder.',
  },
  {
    number: '02',
    title: 'Make the trade-off',
    description: 'What matters now, and what deliberately waits.',
  },
  {
    number: '03',
    title: 'Build the system',
    description: 'Strategy, product, workflow or rhythm your team can run.',
  },
  {
    number: '04',
    title: 'Stay close to reality',
    description: 'We keep going until the system holds under pressure.',
  },
];

export default async function Home() {
  const content = await getLandingPageContent();
  const portraitSrc = content.hero.portraitImageUrl || '/image/edisonaboutnew.jpg';
  const cmsStats = content.trustBarStats.filter((stat) => !/capital|raised/i.test(stat.label)).slice(0, 3);
  const stats = cmsStats.length
    ? cmsStats
    : [
        { value: '7', label: 'Companies built' },
        { value: '7,400+', label: 'Founders trained' },
        { value: '15', label: 'Countries reached' },
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
        <section className="relative isolate overflow-hidden bg-[#141414] text-white">
          <div className="mx-auto max-w-[92rem]">
            <div className="relative flex flex-col justify-end px-5 pb-12 pt-[52svh] sm:px-8 sm:pt-[56svh] lg:min-h-[calc(100svh-9rem)] lg:px-12 lg:pb-20 lg:pt-44">
              {/* portrait lit on the right, fading into the dark */}
              <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[62%]">
                <Image src={portraitSrc} alt="Edison Ade, founder, operator and strategy partner" fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover object-[60%_18%] lg:[mask-image:linear-gradient(to_right,transparent,black_38%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent lg:via-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#141414] to-transparent" />
              </div>
              <div className="max-w-3xl">
                <h1 className="text-[clamp(3.25rem,6.6vw,7.25rem)] font-medium leading-[0.94] tracking-[-0.06em] text-balance">
                  Your business has outgrown guesswork.
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
                  Founder strategist, operator and Christian thinker. I help founders build companies that can think, sell and move without waiting on them.
                </p>
                <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                  <Link href="/founder-scorecard" className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#f4f2ec] px-8 py-4 text-base font-semibold text-[#1c1c1c] transition-transform active:scale-[0.97] sm:w-fit">
                    Find your bottleneck (4 min)
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <div className="text-sm leading-5 text-white/70">
                    <p className="font-semibold text-white">{stats[1]?.value ?? '7,400+'} founders trained</p>
                    <p>{stats[0]?.value ?? '7'} companies built · {stats[2]?.value ?? '15'} countries</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-0 sm:px-8 lg:px-12">
            <div className="pt-4">
              <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">What do you need most?</h2>
              <div className="mt-8 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
                {goals.map((goal) => (
                  <Link key={goal.title} href={goal.href} className="group flex min-h-[220px] flex-col justify-between border-b border-white/20 p-6 transition-colors hover:bg-white/[0.06] sm:border-l lg:min-h-[260px] lg:p-8 lg:first:border-l-0 sm:first:border-l-0 lg:[&:nth-child(2)]:border-l sm:[&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l">
                    <h3 className="text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-[1.7rem]">{goal.title}</h3>
                    <div className="mt-10 flex items-end justify-between gap-4 text-sm text-white/65">
                      <p>{goal.meta}</p>
                      <ArrowRight className="h-5 w-5 flex-none transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            </div>
          </div>
        </section>

        <StatsBand stats={stats} title="Built in the real world." />

        <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:p-12 lg:rounded-[2rem] lg:p-16 grid max-w-[92rem] items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">When momentum becomes complicated</p>
              <h2 className="section-display mt-6 max-w-xl">Your business is growing. Your way of running it is not.</h2>
              <div className="mt-10 max-w-xl space-y-5 text-lg leading-8 text-white/75">
                <p>You have customers, a team and more opportunities than you can chase. You also have a queue of decisions waiting on you.</p>
                <p>The team is busy, but progress feels uneven.</p>
                <p className="font-semibold text-white">The problem is rarely effort. It is the system underneath the effort.</p>
                <Link href="/founder-scorecard" className="group inline-flex items-center gap-2 pt-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  Find the real constraint in four minutes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
            <BottleneckGraphic />
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <h2 className="section-display max-w-4xl">This is for founders who have traction—but need a better way to carry it.</h2>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {audiences.map((item, i) => {
                const Icon = audienceIcons[i];
                return (
                  <article key={item.title} className="group flex min-h-[300px] flex-col justify-between rounded-[1.5rem] bg-white p-8 transition-transform duration-500 hover:-translate-y-1.5 sm:p-10 lg:rounded-[2rem]">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f4f2ec] text-[#1c1c1c] transition-colors duration-500 group-hover:bg-[#1c1c1c] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <div className="mt-12">
                      <h3 className="text-2xl font-semibold tracking-[-0.035em] sm:text-[1.65rem]">{item.title}</h3>
                      <p className="mt-3 max-w-xs text-base leading-7 text-black/60">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-7 text-black/55">If you are still searching for an idea, I may not be the right partner yet. If you have momentum but the old way of operating is starting to break, we should talk.</p>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:p-12 lg:rounded-[2rem] lg:p-16 max-w-[92rem]">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">The default starting point</p>
                <h2 className="section-display mt-6 max-w-xl">Start by finding the constraint.</h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/68">Most founders begin with the Accelerator Sprint. The diagnosis determines whether the next move is a product build, an operating partnership, or execution by your own team.</p>
              </div>
              <div>
                <Link href="/services" className="group block rounded-[1.5rem] bg-[#2a2a2a] p-8 text-white  sm:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">{offers[0].timing}</p><h3 className="mt-4 text-4xl font-medium tracking-[-0.05em]">{offers[0].name}</h3></div>
                    <ArrowUpRight className="h-5 w-5 text-white/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-8 max-w-xl text-lg font-medium leading-8 text-white/82">{offers[0].forWhom}</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">{offers[0].description}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">See the flagship Sprint <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48">What the diagnosis may lead to</p>
                <div className="mt-3 border-t border-white/20">
                  {offers.slice(1).map((offer) => (
                    <Link key={offer.name} href="/services" className="group grid gap-5 border-b border-white/20 py-7 sm:grid-cols-[3rem_.8fr_1.2fr_auto] sm:gap-7">
                      <span className="text-xs font-semibold text-white/40">{offer.number}</span>
                      <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/48">{offer.timing}</p><h3 className="mt-2 text-xl font-semibold tracking-[-0.035em]">{offer.name}</h3></div>
                      <div><p className="text-sm font-medium leading-6">{offer.forWhom}</p><p className="mt-2 text-sm leading-6 text-white/68">{offer.description}</p></div>
                      <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </Link>
                  ))}
                </div>
                <Link href="/services" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold underline decoration-white/35 underline-offset-4 hover:decoration-white">
                  Compare scope and fit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">The method</p>
            <h2 className="section-display mt-6 max-w-4xl">The Carry System</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">A company you can step away from for a week is not an accident. It is built. This is how.</p>
            <MethodRail steps={method.length} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {method.map((step, i) => (
                <article key={step.title} className="flex min-h-[260px] flex-col justify-between rounded-[1.5rem] bg-white p-7 sm:p-8">
                  <p className="text-5xl font-semibold tracking-[-0.06em] text-black/15">{i + 1}</p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.035em]">{step.title}</h3>
                    <p className="mt-3 text-base leading-7 text-black/60">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:p-12 lg:rounded-[2rem] lg:p-16 grid max-w-[92rem] items-center gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">What I believe</p>
              <h2 className="section-display mt-6 max-w-2xl">The founder bottleneck is 3,000 years old.</h2>
              <div className="mt-10 max-w-2xl space-y-6 text-lg leading-8 text-white/75">
                <p>In Exodus 18, Moses sat from morning to evening settling every dispute himself. His father-in-law, Jethro, told him plainly: what you are doing is not good. You will wear yourself out, and the people with you. Raise capable leaders and share the load.</p>
                <p>I call it the Jethro Principle, and it sits under all my work. Leaders are not meant to be the answer to every question. They are meant to multiply.</p>
                <p className="font-semibold text-white">A founder should remain important without remaining the bottleneck.</p>
                <Link href="/faith#jethro-principle" className="group inline-flex items-center gap-2 pt-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  Read the Jethro Principle <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
            <div className="flex justify-center"><JethroTree /></div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[92rem] items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Built in the real world</p>
              <h2 className="section-display mt-6 max-w-xl">The work is the argument.</h2>
              <p className="mt-8 max-w-lg text-lg leading-8 text-black/65">
                Crowdpen is a platform where writers publish, grow a readership and take part in paid challenges. I took it from idea to a working product with real users.
              </p>
              <div className="mt-10 flex items-end gap-5">
                <p className="text-7xl font-semibold leading-[0.85] tracking-[-0.06em] sm:text-8xl">1,500</p>
                <p className="pb-1 text-base leading-6 text-black/60">beta users<br />from a standing start</p>
              </div>
              <Link href="/portfolio" className="group mt-12 inline-flex w-fit items-center gap-3 rounded-full bg-[#1c1c1c] px-6 py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.97]">
                See the work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <Link href="/portfolio" aria-label="See the Crowdpen case study" className="group relative block pb-10 pl-0 sm:pl-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white transition-transform duration-700 ease-out group-hover:scale-[1.015] lg:rounded-[2rem]">
                <Image src="/image/crowdpen-ui.jpg" alt="The Crowdpen reading feed, with stories by Edison and other writers" fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover object-left-top" />
              </div>
              <div className="absolute bottom-0 left-0 w-[42%] max-w-[15rem] overflow-hidden rounded-[1.25rem] ring-8 ring-[#f4f2ec] transition-transform duration-700 ease-out group-hover:-translate-y-2 sm:w-[34%]">
                <div className="relative aspect-[4/3]">
                  <Image src="/image/crowdpen-tee.jpg" alt="Edison in a Crowdpen T-shirt in front of a bookshelf shaped like Africa" fill sizes="240px" className="object-cover" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Start with something useful</p>
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

        <section className="px-5 pb-8 pt-16 sm:px-8 lg:px-12 lg:pb-12 lg:pt-28">
          <div className="mx-auto max-w-[92rem]">
            <div className="flex flex-col items-center rounded-[1.5rem] bg-[#1c1c1c] px-6 py-20 text-center text-white sm:px-12 lg:rounded-[2rem] lg:px-20 lg:py-32">
              <h2 className="closing-display max-w-5xl text-balance">Bring me the decision that keeps following you home.</h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">You don&rsquo;t need a perfect brief. Tell me what is changing and what feels stuck. You leave with the next move named.</p>
              <Link href="/contact" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#f4f2ec] px-8 py-4 text-base font-semibold text-[#1c1c1c] transition-transform active:scale-[0.97]">
                Start the conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/founder-scorecard" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition-colors hover:text-white">
                Or take the four-minute Scorecard first <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-2 lg:items-center lg:gap-24">
              <div>
                <h2 className="section-display max-w-xl">One idea every Thursday.</h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-black/60">
                  Master the System: one precise idea each week for building a company that can think, sell and move without waiting for you.
                </p>
              </div>
              <div>
                <NewsletterInline />
                <p className="mt-4 text-sm text-black/50">Free. One email a week. Unsubscribe any time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
