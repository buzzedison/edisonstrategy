import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    number: '01',
    name: 'Crowdpen',
    tagline: 'A platform for African creators',
    role: 'Founder & Software Architect',
    description:
      'Built to close the monetisation gap for African creators. Crowdpen gives writers, designers, and makers a space to publish, earn, and build a following — without algorithmic gatekeeping.',
    links: [{ label: 'Join the Waitlist', href: 'https://www.crowdpen.co' }],
    tags: ['Product', 'Africa', 'Creator Economy'],
  },
  {
    number: '02',
    name: 'Bloop Global LLC',
    tagline: 'We hunt big ideas and help them win',
    role: 'Managing Consultant',
    description:
      'Strategy and product consultancy operating across the US, UK, Ghana, and Nigeria. We work with ambitious founders from early validation through to launch — defining their market, product, and growth plan.',
    links: [
      { label: 'View Website', href: 'https://www.bloopglobal.com' },
      { label: 'Play Business Games', href: 'https://www.bloopglobal.com/games' },
    ],
    tags: ['Consulting', 'Strategy', 'Global'],
  },
  {
    number: '03',
    name: 'Enterprise Village',
    tagline: 'A venture studio for African founders',
    role: 'Co-founder & Studio Director',
    description:
      'A founder-first venture studio that takes startups from idea to first traction in 12 weeks. We provide capital, mentorship, and operational support to the next generation of African builders.',
    links: [],
    tags: ['Venture Studio', 'Africa', 'Startups'],
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-white text-[#1c1c1c] selection:bg-zinc-200 antialiased">

      {/* Hero */}
      <section className="px-6 lg:px-8 pt-24 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-[76rem] mx-auto">
          <p className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-zinc-400 mb-6">
            My Work
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight mb-6 max-w-2xl">
            Building things that<br />
            <span className="italic">matter on the continent.</span>
          </h1>
          <p className="text-base font-sans text-zinc-600 leading-relaxed max-w-lg">
            A handful of the projects and companies I have built, led, or invested significant energy into over the past 12+ years.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 lg:px-8 pb-32 lg:pb-48">
        <div className="max-w-[76rem] mx-auto">
          <div className="flex flex-col divide-y divide-zinc-100">
            {projects.map((p) => (
              <div
                key={p.number}
                className="grid lg:grid-cols-[120px_1fr_280px] gap-6 lg:gap-16 py-14 lg:py-16 group"
              >
                {/* Number */}
                <div className="flex items-start">
                  <span className="text-5xl font-serif italic text-zinc-200 group-hover:text-zinc-300 transition-colors leading-none">
                    {p.number}.
                  </span>
                </div>

                {/* Main content */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-sans font-bold uppercase tracking-[0.12em] text-zinc-400 border border-zinc-200 rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-serif text-[#1c1c1c] mb-1">{p.name}</h2>
                  <p className="text-[13px] font-sans text-zinc-400 italic mb-5">{p.tagline}</p>
                  <p className="text-[15px] font-sans text-zinc-600 leading-relaxed max-w-xl">{p.description}</p>
                </div>

                {/* Role + links */}
                <div className="flex flex-col justify-between gap-6 lg:pt-1">
                  <div>
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.12em] text-zinc-400 mb-1">Role</p>
                    <p className="text-[13px] font-sans text-[#1c1c1c] font-medium">{p.role}</p>
                  </div>
                  {p.links.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {p.links.map((l) => (
                        <Link
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[12px] font-sans font-semibold text-[#1c1c1c] hover:text-zinc-500 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 pb-32 lg:pb-48">
        <div className="max-w-[76rem] mx-auto">
          <div className="bg-[#f4f2ec] rounded-3xl px-8 py-16 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl lg:text-[40px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight mb-3">
                Want to build something<br />
                <span className="italic">together?</span>
              </h2>
              <p className="text-[15px] font-sans text-zinc-600 max-w-md">
                I occasionally take on consulting projects and partnerships. If you have a bold idea, let&apos;s talk.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1c1c1c] text-white px-8 py-4 rounded-full text-[13px] font-sans font-semibold tracking-wide hover:bg-zinc-800 transition-colors flex-shrink-0"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
