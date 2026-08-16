import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getLandingPageContent } from '@/lib/landingPage';

export default async function Home() {
  const c = await getLandingPageContent();
  const portraitSrc = c.hero.portraitImageUrl || '/image/edisonaboutnew.jpg';
  const stats = c.trustBarStats.length
    ? c.trustBarStats.slice(0, 4)
    : [
        { value: '7', label: 'Companies built' },
        { value: '7,400+', label: 'Founders trained' },
        { value: '15', label: 'Countries reached' },
        { value: '$5M+', label: 'Capital raised' },
      ];
  const services = c.packagesSection.packages.slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: c.seo.personName,
    url: c.seo.websiteUrl,
    sameAs: c.seo.socialLinks,
    jobTitle: c.seo.jobTitle,
    worksFor: { '@type': 'Organization', name: c.seo.organizationName },
    description: c.seo.description,
  };

  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <section className="px-5 pb-8 pt-28 sm:px-8 lg:px-12 lg:pb-12 lg:pt-32">
          <div className="mx-auto grid max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] text-white lg:min-h-[690px] lg:grid-cols-[1.08fr_.92fr] lg:rounded-[2rem]">
            <div className="flex flex-col justify-between px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 xl:px-20">
              <div>
                <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  {c.hero.badge || 'Founder, operator and strategy partner'}
                </p>

                <h1 className="max-w-[700px] text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.96] tracking-[-0.055em]">
                  {c.hero.titleLine1}{' '}
                  <span className="text-white/55">{c.hero.emphasizedTitle}</span>
                  {c.hero.titleLine3 ? ` ${c.hero.titleLine3}` : ''}
                </h1>
              </div>

              <div className="mt-16 max-w-xl lg:mt-20">
                <p className="max-w-[31rem] text-base leading-7 text-white/64 sm:text-lg">
                  {c.hero.description}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={c.hero.primaryCta.href}
                    className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c] transition-transform hover:-translate-y-0.5 hover:bg-white"
                  >
                    {c.hero.primaryCta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href={c.hero.secondaryCta.href || '/services'}
                    className="inline-flex w-fit items-center gap-2 px-1 py-3 text-sm font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {c.hero.secondaryCta.label || 'Explore services'}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative min-h-[460px] lg:min-h-full">
              <Image
                src={portraitSrc}
                alt={c.hero.portraitAlt || `${c.seo.personName}, business growth strategist`}
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover object-center grayscale-[12%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#171714]/15 lg:to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#171714] backdrop-blur sm:bottom-8 sm:left-8">
                {c.seo.personName} · {c.seo.jobTitle}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Track record" className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto grid max-w-[92rem] grid-cols-2 border-y border-black/15 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-7 ${index % 2 === 0 ? 'pr-5' : 'border-l border-black/15 pl-5'} ${index > 1 ? 'border-t border-black/15 lg:border-t-0' : ''} lg:border-l lg:border-t-0 lg:px-8 first:lg:border-l-0 first:lg:pl-0`}
              >
                <p className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-black/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Where I come in</p>
                <h2 className="mt-5 max-w-md text-[clamp(2.5rem,4.5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.055em]">
                  The problem is rarely effort. It&apos;s architecture.
                </h2>
              </div>

              <div className="border-t border-black/20">
                {services.map((service, index) => (
                  <Link
                    key={service.name}
                    href={service.ctaHref}
                    className="group grid gap-4 border-b border-black/20 py-7 sm:grid-cols-[3rem_1fr_1fr_auto] sm:items-start sm:gap-6 lg:py-9"
                  >
                    <span className="text-xs font-semibold text-black/35">0{index + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{service.name}</h3>
                      <p className="mt-1 text-xs font-medium text-black/45">{service.forWhom}</p>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-black/60 sm:text-base">{service.description}</p>
                    <ArrowUpRight className="h-5 w-5 text-black/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto grid max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] text-white lg:grid-cols-2 lg:rounded-[2rem]">
            <div className="p-8 sm:p-12 lg:p-16 xl:p-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Built in the real world</p>
              <h2 className="mt-8 max-w-xl text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.06em]">
                Good advice sounds clever. Good strategy changes Monday morning.
              </h2>
            </div>

            <div className="flex flex-col justify-between border-t border-white/15 p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16 xl:p-20">
              <p className="max-w-xl text-xl leading-8 tracking-[-0.02em] text-white/75 sm:text-2xl sm:leading-9">
                I don&apos;t hand you a deck and disappear. We stay close to the work until the decisions are clear, the system holds, and your team can move without theatre.
              </p>

              <Link
                href={c.aboutSection.cta.href || '/about'}
                className="mt-16 inline-flex w-fit items-center gap-2 text-sm font-semibold underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                {c.aboutSection.cta.label || 'Why I do this'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[92rem] border-t border-black/20 pt-12 lg:flex lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">The next move</p>
              <h2 className="mt-6 text-[clamp(3rem,7vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.07em]">
                {c.finalCtaSection.titleLine1}{' '}
                <span className="text-black/35">{c.finalCtaSection.titleLine2}</span>
              </h2>
            </div>
            <div className="mt-10 shrink-0 lg:mt-0">
              <Link
                href={c.finalCtaSection.primaryCta.href}
                className="group inline-flex items-center gap-4 rounded-full bg-[#171714] px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                {c.finalCtaSection.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-black/45">{c.hero.helperText}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
