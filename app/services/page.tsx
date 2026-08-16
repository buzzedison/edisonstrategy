import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const engagements = [
  {
    number: '01',
    name: 'Accelerator Sprint',
    timing: 'Four weeks',
    forWhom: 'For founders with traction, too many priorities, and no clean answer to “what now?”',
    description: 'We pressure-test the opportunity, sharpen the position, and turn a crowded strategy into one decisive 90-day move.',
    outcome: 'You leave knowing what matters now, what can wait, and what your team needs to do next.',
  },
  {
    number: '02',
    name: 'MVP Builder',
    timing: 'Eight weeks',
    forWhom: 'For non-technical founders who need to ship the right product before they spend on the wrong one.',
    description: 'We translate the business case into a lean product: the right scope, the right architecture, and a launch designed to learn.',
    outcome: 'You ship something real customers can use—not an expensive demo built on assumptions.',
  },
  {
    number: '03',
    name: 'Strategy Partner',
    timing: 'Quarterly',
    forWhom: 'For founders carrying the company’s hardest decisions alone.',
    description: 'A weekly operating partnership for the decisions that do not fit neatly inside a department: growth, product, systems, and what to stop doing.',
    outcome: 'The company moves with more clarity and depends less on you to unblock every decision.',
  },
];

const principles = [
  ['Start with the constraint', 'Busy is not the same as blocked. We find the one thing making everything else harder.'],
  ['Make the trade-off visible', 'A strategy is only useful when it makes clear what you will not do.'],
  ['Stay close to the work', 'No deck-and-disappear consulting. The thinking continues until the system holds.'],
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40">
          <div className="mx-auto max-w-[92rem] border-b border-black/20 pb-16 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-24 lg:pb-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Ways to work together</p>
              <h1 className="page-display mt-7 max-w-5xl">
                The right help should make the business feel lighter.
              </h1>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="max-w-lg text-lg leading-8 text-black/60">
                I work with founders at the point where instinct and effort have stopped being enough. We find the constraint, make the hard trade-offs, and build a way forward your team can actually run.
              </p>
              <Link href="/contact" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#1c1c1c] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                Bring me the problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
          <div className="mx-auto max-w-[92rem] border-t border-black/20">
            {engagements.map((item) => (
              <article key={item.name} className="grid gap-6 border-b border-black/20 py-10 sm:grid-cols-[3rem_1fr] lg:grid-cols-[5rem_.75fr_1fr_1fr_auto] lg:gap-10 lg:py-14">
                <p className="text-xs font-semibold text-black/35">{item.number}</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40">{item.timing}</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">{item.name}</h2>
                </div>
                <p className="max-w-sm text-base font-medium leading-7">{item.forWhom}</p>
                <div className="space-y-4 text-sm leading-6 text-black/58 sm:text-base sm:leading-7">
                  <p>{item.description}</p>
                  <p className="font-medium text-black/80">{item.outcome}</p>
                </div>
                <Link href="/contact" aria-label={`Discuss ${item.name}`} className="h-fit text-black/35 transition-colors hover:text-black">
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#1c1c1c] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem] lg:grid lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <h2 className="section-display max-w-xl">
              How the work stays useful.
            </h2>
            <div className="mt-12 border-t border-white/20 lg:mt-0">
              {principles.map(([title, description], index) => (
                <div key={title} className="grid gap-3 border-b border-white/20 py-7 sm:grid-cols-[3rem_.7fr_1fr] sm:gap-8">
                  <span className="text-xs text-white/35">0{index + 1}</span>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm leading-6 text-white/55">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto flex max-w-[92rem] flex-col gap-10 border-t border-black/20 pt-12 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="closing-display max-w-4xl">Not sure which engagement fits?</h2>
            <Link href="/contact" className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#1c1c1c] px-7 py-4 text-sm font-semibold text-white">
              Start with the decision <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
