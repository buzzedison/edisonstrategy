import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Minus } from 'lucide-react';
import type { Metadata } from 'next';

const title = 'Services · The Carry System';
const description = 'Accelerator Sprint, MVP Builder and Strategy Partner for founders whose companies still wait on them.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ['founder strategy sprint', '90-day execution plan', 'MVP builder', 'strategy partner', 'founder dependency'],
  alternates: { canonical: '/services' },
  openGraph: { title, description, url: '/services', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

const sprintDeliverables = [
  'Business and growth diagnostic',
  'Constraint analysis',
  'Positioning and opportunity review',
  'Strategic trade-off decisions',
  'One 90-day growth priority',
  'Execution roadmap',
  'Team alignment session',
];

const pathways = [
  {
    name: 'MVP Builder',
    number: '02',
    problem: 'founders who know what must be built but need it shipped.',
    timing: 'Typically eight weeks',
    promise: 'a focused product real customers can use, test and pay for, built from the business case, not a feature wish list.',
    cta: 'Discuss a build',
    service: 'mvp-builder',
    deliverables: [
      'Business-case validation',
      'Customer and product assumptions',
      'MVP scope',
      'User journey and product requirements',
      'Product design and development',
      'Working launch',
      'Initial customer-learning plan',
    ],
    fit: ['A clear business problem', 'Access to target customers', 'A decision-maker available each week', 'Budget for product delivery'],
    notIncluded: 'Brand identity, ongoing maintenance, paid software, or complex integrations outside the agreed MVP scope.',
    evidence: {
      title: 'Crowdpen · From concept to 1,500 beta users',
      body: 'The constraint was a fragmented creator workflow. The decision was to unify writing, engagement, and monetisation in one focused platform, then learn from real users.',
      href: '/portfolio',
    },
  },
  {
    name: 'Strategy Partner',
    number: '03',
    problem: 'established founders whose company returns to them for every hard decision.',
    timing: 'Selective · 12 weeks',
    promise: 'decision-making judgment transferred into your team, operating rhythms that hold, and a calendar with room in it.',
    cta: 'Apply for a partnership',
    service: 'strategy-partner',
    deliverables: [
      'Weekly founder strategy session',
      'Decision and priority support between sessions',
      'Monthly leadership and operating review',
      'Leadership and delegation systems',
      '90-day company priorities',
      'Founder-dependency reduction plan',
    ],
    fit: ['A functioning business', 'A team responsible for execution', 'Meaningful revenue or funding', 'Cross-functional decisions', 'A willingness to stop doing things'],
    notIncluded: 'Day-to-day management, project management, unlimited access, or taking execution ownership away from your leadership team.',
    evidence: {
      title: 'Operating experience that has had to scale',
      body: 'The approach comes from building seven companies and repeatable systems that have supported more than 7,400 founders and operators.',
      href: '/portfolio',
    },
  },
];

const decisionGuide = [
  ['Growth feels chaotic', 'Accelerator Sprint', 'Start here'],
  ['The product is clear but unbuilt', 'MVP Builder', 'Build after diagnosis'],
  ['The founder remains the operating system', 'Strategy Partner', 'Transfer decision-making'],
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40">
          <div className="mx-auto max-w-[92rem] border-b border-black/20 pb-16 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-24 lg:pb-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Services</p>
              <h1 className="page-display mt-7 max-w-5xl">Every engagement runs on The Carry System.</h1>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="max-w-lg text-lg leading-8 text-black/60">Find the constraint. Make the trade-off. Build the system. Stay until it holds. The offer you choose depends on where your constraint sits.</p>
              <Link href="/contact?service=accelerator-sprint" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#1c1c1c] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                Bring me the problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
          <div className="mx-auto grid max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] text-white lg:grid-cols-[.82fr_1.18fr] lg:rounded-[2rem]">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  <span>01</span><span className="h-1 w-1 rounded-full bg-white/25" /><span>Flagship</span><span className="h-1 w-1 rounded-full bg-white/25" /><span>Four weeks</span>
                </div>
                <h2 className="mt-7 text-5xl font-medium leading-[.95] tracking-[-0.055em] sm:text-6xl">Accelerator Sprint</h2>
                <p className="mt-8 max-w-xl text-lg leading-8 text-white/80"><span className="text-white/45">For:</span> founders with traction, too many priorities, and no clear answer to &ldquo;what now?&rdquo;</p>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/65"><span className="text-white/45">You leave with:</span> the one constraint holding the business back, named and agreed, plus a focused 90-day execution plan your team can run.</p>
              </div>
              <div className="mt-12 border-t border-white/15 pt-8">
                <p className="text-xs uppercase tracking-[0.16em] text-white/40">How the Sprint is scoped</p>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/55">We agree the right scope after our first conversation, based on the constraint and the work actually required.</p>
                <Link href="/contact?service=accelerator-sprint" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c]">
                  Start with a Sprint <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="border-t border-white/15 bg-white/[.045] p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">You leave with</p>
              <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {sprintDeliverables.map((item) => (
                  <p key={item} className="flex items-start gap-3 border-t border-white/12 pt-5 text-sm leading-6 text-white/72">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />{item}
                  </p>
                ))}
              </div>
              <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/38">Best for</p>
                  <p className="mt-3 text-sm leading-6 text-white/62">Founders with traction, too many priorities, and no clean answer to “what now?”</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/38">Outside the scope</p>
                  <p className="mt-3 text-sm leading-6 text-white/62">Product development, campaign execution, and becoming your team’s project manager.</p>
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-white/15 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38">The experience behind the diagnosis</p>
                <p className="mt-3 text-lg font-medium">Seven companies built · 7,400+ founders trained · 15 countries reached</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/42">Which engagement is right?</p>
                <h2 className="section-display mt-6 max-w-xl">The problem determines the path.</h2>
              </div>
              <div className="border-t border-black/20">
                {decisionGuide.map(([problem, offer, role], index) => (
                  <div key={offer} className="grid gap-3 border-b border-black/20 py-7 sm:grid-cols-[3rem_1.2fr_.8fr_.7fr] sm:gap-7">
                    <span className="text-xs text-black/35">0{index + 1}</span>
                    <p className="font-medium">{problem}</p>
                    <p className="text-sm font-semibold">{offer}</p>
                    <p className="text-sm text-black/48">{role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {pathways.map((offer, index) => (
          <section key={offer.name} className={`px-5 py-20 sm:px-8 lg:px-12 lg:py-28 ${index % 2 === 0 ? 'bg-white' : ''}`}>
            <div className="mx-auto max-w-[92rem]">
              <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
                <div>
                  <div className="flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40"><span>{offer.number}</span><span>·</span><span>{offer.timing}</span></div>
                  <h2 className="section-display mt-6">{offer.name}</h2>
                  <p className="mt-7 max-w-lg text-lg font-medium leading-8"><span className="text-black/45">For:</span> {offer.problem}</p>
                  <p className="mt-4 max-w-lg text-base leading-7 text-black/58"><span className="text-black/40">You leave with:</span> {offer.promise}</p>
                  <Link href={`/contact?service=${offer.service}`} className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#1c1c1c] px-6 py-3.5 text-sm font-semibold text-white">
                    {offer.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">What you receive</p>
                      <ul className="mt-5 border-t border-black/15">
                        {offer.deliverables.map((item) => <li key={item} className="flex gap-3 border-b border-black/15 py-3.5 text-sm leading-6"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-black/45" />{item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">A strong fit has</p>
                      <ul className="mt-5 border-t border-black/15">
                        {offer.fit.map((item) => <li key={item} className="flex gap-3 border-b border-black/15 py-3.5 text-sm leading-6"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-black/45" />{item}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-5 md:grid-cols-[1.15fr_.85fr]">
                    <Link href={offer.evidence.href} className="group rounded-2xl bg-[#1c1c1c] p-7 text-white">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38">Relevant evidence</p>
                      <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{offer.evidence.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/58">{offer.evidence.body}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">See selected work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                    </Link>
                    <div className="rounded-2xl border border-black/15 p-7">
                      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40"><Minus className="h-3 w-3" /> Not included</p>
                      <p className="mt-4 text-sm leading-6 text-black/58">{offer.notIncluded}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="bg-[#1c1c1c] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">A joined-up service</p>
              <h2 className="section-display mt-6 max-w-xl">Each brand has one clear job.</h2>
            </div>
            <div className="border-t border-white/20">
              {[
                ['BuzzEdison', 'Diagnoses the opportunity, defines the product, and leads the strategy.'],
                ['Bloop Global', 'Provides the product design and engineering team when something needs to be shipped.'],
                ['Latitude 5', 'Builds and invests where there is deeper venture-level conviction.'],
              ].map(([brand, role], index) => (
                <div key={brand} className="grid gap-3 border-b border-white/20 py-7 sm:grid-cols-[3rem_.55fr_1fr] sm:gap-8">
                  <span className="text-xs text-white/30">0{index + 1}</span><h3 className="font-semibold">{brand}</h3><p className="text-sm leading-6 text-white/55">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto flex max-w-[92rem] flex-col gap-10 border-t border-black/20 pt-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">Not sure which?</p>
              <h2 className="closing-display mt-6 max-w-4xl">Start with the free 4-minute Founder Bottleneck Scorecard.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">It shows where your constraint sits and gives you three moves for the next seven days.</p>
              <p className="mt-6 max-w-2xl text-sm leading-6 text-black/48">If you are still searching for an idea, I may not be the right partner yet. If you have momentum but the old way of operating is breaking, we should talk.</p>
            </div>
            <Link href="/founder-scorecard" className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#1c1c1c] px-7 py-4 text-sm font-semibold text-white">
              Take the Scorecard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
