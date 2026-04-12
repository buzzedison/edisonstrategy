import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getLandingPageContent } from '@/lib/landingPage';

export default async function Home() {
  const c = await getLandingPageContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": c.seo.personName,
    "url": c.seo.websiteUrl,
    "sameAs": c.seo.socialLinks,
    "jobTitle": c.seo.jobTitle,
    "worksFor": { "@type": "Organization", "name": c.seo.organizationName },
    "description": c.seo.description,
  };

  // Marquee: use Sanity brands if available, else fallback company list
  const marqueeNames = c.brandsSection.brands.length
    ? c.brandsSection.brands.map((b) => b.name)
    : ['Bloop Global', 'Enterprise Village', 'FundDesk', 'TaskWit', 'CrowdPen', 'AgriPro', 'African Recovery'];
  const marqueeItems = [...marqueeNames, ...marqueeNames]; // doubled for seamless loop

  // Stats: use Sanity trustBarStats if populated, else hardcoded defaults
  const stats = c.trustBarStats.length
    ? c.trustBarStats
    : [
        { value: '7', label: 'Companies Built' },
        { value: '7,400+', label: 'Alumni Trained' },
        { value: '15', label: 'Countries Reached' },
        { value: '10,000+', label: 'Community Members' },
      ];

  const portraitSrc = c.hero.portraitImageUrl || '/image/edisonnewb.jpg';

  return (
    <div className="min-h-screen bg-white text-[#111108] antialiased selection:bg-amber-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative bg-[#0C0C0A] text-white overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/[0.06] blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-16 pt-36 lg:pt-44 pb-24 lg:pb-32 flex flex-col lg:flex-row gap-16 lg:gap-0">
            {/* Copy */}
            <div className="flex-1 flex flex-col justify-center lg:pr-20 max-w-[600px]">
              <div className="flex items-center gap-3 mb-10">
                <span className="w-10 h-px bg-amber-400/40" />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-amber-400/70">
                  {c.hero.badge || 'Business Growth Strategist · Accra, Ghana'}
                </span>
              </div>

              <h1 className="font-serif leading-[1.02] tracking-[-0.02em] mb-8 text-white"
                  style={{ fontSize: 'clamp(42px, 6vw, 82px)' }}>
                {c.hero.titleLine1}
                {' '}<br className="hidden lg:block" />
                {c.hero.emphasizedTitle && (
                  <span className="italic text-amber-300/80">{c.hero.emphasizedTitle}</span>
                )}
                {c.hero.titleLine3 && (
                  <>{' '}<br className="hidden lg:block" />{c.hero.titleLine3}</>
                )}
              </h1>

              <p className="text-[17px] font-sans text-zinc-400 leading-[1.7] mb-3 max-w-[480px]">
                {c.hero.description}
              </p>
              {c.hero.helperText && (
                <p className="text-[13px] font-sans text-zinc-600 mb-12 tracking-wide">{c.hero.helperText}</p>
              )}
              <div className="mb-12" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Link
                  href={c.hero.primaryCta.href}
                  className="group inline-flex items-center gap-3 bg-white text-[#0C0C0A] px-8 py-4 rounded-full text-[12px] font-sans font-bold tracking-[0.08em] uppercase hover:bg-amber-50 transition-all duration-300 shadow-xl shadow-black/30"
                >
                  {c.hero.primaryCta.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <p className="text-[12px] font-sans text-zinc-600 italic max-w-[200px] leading-relaxed">
                  No pitch. No pressure.<br />30 minutes, real clarity.
                </p>
              </div>
            </div>

            {/* Portrait */}
            <div className="hidden lg:block lg:w-[42%] xl:w-[38%] relative self-end">
              <div className="absolute inset-0 rounded-2xl border border-amber-400/10 translate-x-3 translate-y-3" />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]" style={{ height: '580px' }}>
                <Image
                  src={portraitSrc}
                  alt={c.hero.portraitAlt || 'Edison Ade — Business Growth Strategist'}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-serif text-lg">{c.seo.personName}</p>
                  <p className="text-zinc-400 text-[12px] font-sans">{c.seo.jobTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STATS BAR ────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-zinc-100">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-zinc-100">
              {stats.map((s) => (
                <div key={s.label} className="py-10 px-6 lg:px-12 text-center lg:text-left">
                  <p className="font-serif text-[40px] lg:text-[52px] leading-none tracking-tight text-[#0C0C0A] mb-1">
                    {s.value}
                  </p>
                  <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MARQUEE ──────────────────────────────────────────────────── */}
        <section className="bg-[#F5F3EE] py-5 overflow-hidden border-b border-zinc-200/60">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 pl-6 lg:pl-16 flex items-center gap-3 pr-8 border-r border-zinc-300/60">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-zinc-400 whitespace-nowrap">
                {c.brandsSection.eyebrow || 'Portfolio'}
              </span>
            </div>
            <div className="overflow-hidden flex-1">
              <div className="marquee-track">
                {marqueeItems.map((name, i) => (
                  <span key={i} className="inline-flex items-center gap-6 mr-10">
                    <span className="text-[13px] font-sans font-semibold text-zinc-600 whitespace-nowrap">{name}</span>
                    <span className="w-1 h-1 rounded-full bg-amber-500/50 flex-shrink-0" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROBLEM ──────────────────────────────────────────────────── */}
        <section className="bg-[#F5F3EE] py-20 lg:py-32">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
              {/* Left */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-6 h-px bg-zinc-400" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-zinc-500">Sound Familiar?</span>
                </div>
                <h2 className="font-serif leading-[1.05] tracking-[-0.02em] text-[#0C0C0A]"
                    style={{ fontSize: 'clamp(38px, 4vw, 56px)' }}>
                  {c.problemSection.heading}
                </h2>
                <div className="mt-12 border-l-2 border-amber-400/60 pl-6">
                  <p className="text-[20px] lg:text-[24px] font-serif italic text-[#0C0C0A] leading-snug mb-3">
                    &ldquo;{c.problemSection.quote}&rdquo;
                  </p>
                  <Link href={c.problemSection.quoteCta.href} className="inline-flex items-center gap-2 text-[12px] font-sans font-bold uppercase tracking-[0.18em] text-amber-700 hover:text-amber-900 transition-colors mt-4">
                    {c.problemSection.quoteCta.label} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right: pain points */}
              <div className="pt-2 lg:pt-16">
                <p className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-zinc-400 mb-8">The frustrating part?</p>
                <p className="text-[17px] font-sans text-zinc-600 leading-[1.7] mb-8">{c.problemSection.intro}</p>
                <div className="space-y-0">
                  {c.problemSection.painPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-5 py-5 border-b border-zinc-200/70 group">
                      <span className="text-[11px] font-sans text-zinc-400 mt-1 w-5 flex-shrink-0 font-bold">0{i + 1}</span>
                      <p className="text-[17px] font-sans text-zinc-700 leading-relaxed group-hover:text-zinc-900 transition-colors">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ABOUT ────────────────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-32">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: dark card */}
              <div className="bg-[#0C0C0A] rounded-3xl p-10 lg:p-14 flex flex-col justify-between min-h-[480px] relative overflow-hidden">
                <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/[0.05] blur-[80px]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-10">
                    <span className="w-6 h-px bg-amber-400/40" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-amber-400/60">
                      {c.aboutSection.badge}
                    </span>
                  </div>
                  <h2 className="text-[32px] lg:text-[40px] font-serif text-white leading-[1.15] tracking-tight mb-6">
                    {c.aboutSection.titleLine1}<br />
                    <em className="italic text-amber-300/70">{c.aboutSection.titleLine2}</em>
                  </h2>
                  <p className="text-[15px] font-sans text-zinc-400 leading-[1.7] max-w-sm">
                    {c.aboutSection.description}
                  </p>
                </div>
                <div className="relative z-10 mt-10 pt-8 border-t border-white/[0.08]">
                  <p className="text-[14px] font-serif italic text-zinc-400 leading-relaxed mb-6">
                    &ldquo;{c.aboutSection.quote}&rdquo;
                  </p>
                  <Link href={c.aboutSection.cta.href} className="inline-flex items-center gap-2.5 text-[12px] font-sans font-bold uppercase tracking-[0.18em] text-white hover:text-amber-300 transition-colors">
                    {c.aboutSection.cta.label} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right: stats + tags */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-zinc-200" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-zinc-400">{c.seo.personName}</span>
                </div>
                <p className="text-[16px] font-sans text-zinc-600 leading-[1.75] mb-10">{c.aboutSection.description}</p>

                {c.aboutSection.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-y border-zinc-100">
                    {c.aboutSection.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-serif text-[36px] lg:text-[44px] leading-none tracking-tight text-[#0C0C0A] mb-1">{stat.value}</p>
                        <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-zinc-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {c.aboutSection.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {c.aboutSection.tags.map((tag) => (
                      <span key={tag} className="px-4 py-1.5 rounded-full border border-zinc-200 text-[12px] font-sans font-medium text-zinc-600 bg-zinc-50">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PACKAGES ─────────────────────────────────────────────────── */}
        <section className="bg-[#0C0C0A] py-20 lg:py-32 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-amber-400/40" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-amber-400/60">
                    {c.packagesSection.eyebrow}
                  </span>
                </div>
                <h2 className="font-serif text-white leading-[1.05] tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                  {c.packagesSection.title}
                </h2>
              </div>
              <p className="text-[13px] font-sans text-zinc-500 lg:pb-2">{c.packagesSection.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
              {c.packagesSection.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-2xl p-8 lg:p-9 flex flex-col border transition-all duration-300 ${
                    pkg.featured
                      ? 'bg-white border-white text-[#0C0C0A]'
                      : 'bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.06] hover:border-white/[0.14]'
                  }`}
                >
                  <div className="mb-6 flex items-center gap-2 flex-wrap">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] ${
                      pkg.featured ? 'bg-amber-100 text-amber-800' : 'bg-white/[0.08] text-zinc-400'
                    }`}>{pkg.tag}</span>
                    {pkg.featured && (
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-amber-500 text-white">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className={`text-[26px] font-serif mb-2 leading-snug tracking-tight ${pkg.featured ? 'text-[#0C0C0A]' : 'text-white'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-[13px] font-sans mb-6 leading-relaxed italic ${pkg.featured ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    For: {pkg.forWhom}
                  </p>
                  <p className={`text-[14px] font-sans leading-[1.7] mb-8 ${pkg.featured ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${pkg.featured ? 'bg-amber-500' : 'bg-amber-500/60'}`} />
                        <p className={`text-[13px] font-sans leading-relaxed ${pkg.featured ? 'text-zinc-600' : 'text-zinc-400'}`}>{f}</p>
                      </div>
                    ))}
                  </div>

                  <div className={`text-[12px] font-sans italic py-5 my-2 border-y ${pkg.featured ? 'border-zinc-100 text-zinc-500' : 'border-white/[0.08] text-zinc-500'}`}>
                    <span className={`font-semibold not-italic ${pkg.featured ? 'text-zinc-700' : 'text-zinc-300'}`}>Outcome: </span>
                    {pkg.outcome}
                  </div>

                  <Link
                    href={pkg.ctaHref}
                    className={`mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[12px] font-sans font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                      pkg.featured ? 'bg-[#0C0C0A] text-white hover:bg-zinc-800' : 'bg-white text-[#0C0C0A] hover:bg-amber-50'
                    }`}
                  >
                    {pkg.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ──────────────────────────────────────────────────── */}
        <section className="bg-[#F5F3EE] py-20 lg:py-32">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-zinc-400" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-zinc-500">The Process</span>
                </div>
                <h2 className="font-serif leading-[1.05] tracking-[-0.02em] text-[#0C0C0A]"
                    style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                  {c.frameworksSection.title}{' '}
                  <span className="italic text-zinc-400">{c.frameworksSection.emphasizedTitle}</span>
                </h2>
              </div>
              <Link href={c.frameworksSection.cta.href} className="group inline-flex items-center gap-2.5 text-[12px] font-sans font-bold uppercase tracking-[0.18em] text-zinc-500 hover:text-[#0C0C0A] transition-colors lg:pb-2">
                {c.frameworksSection.cta.label} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-0 border border-zinc-200/80 rounded-2xl overflow-hidden">
              {c.frameworksSection.frameworks.map((fw, i) => (
                <div
                  key={fw.title}
                  className={`p-10 lg:p-12 flex flex-col gap-6 bg-white ${i < c.frameworksSection.frameworks.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-zinc-200/80' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-zinc-400">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[56px] font-serif text-zinc-100 leading-none font-bold select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-serif text-[#0C0C0A] mb-3 leading-snug">{fw.title}</h3>
                    <p className="text-[14px] font-sans text-zinc-500 leading-[1.7]">{fw.description}</p>
                  </div>
                  {fw.result && (
                    <p className="text-[12px] font-sans font-semibold text-amber-700 uppercase tracking-[0.15em]">
                      → {fw.result}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href={c.frameworksSection.cta.href}
                className="group inline-flex items-center gap-3 bg-[#0C0C0A] text-white px-10 py-4 rounded-full text-[12px] font-sans font-bold tracking-[0.08em] uppercase hover:bg-zinc-800 transition-all duration-300 shadow-lg shadow-black/10"
              >
                {c.frameworksSection.cta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              {c.frameworksSection.ctaHelperText && (
                <p className="mt-3 text-[12px] font-sans text-zinc-400 italic">{c.frameworksSection.ctaHelperText}</p>
              )}
            </div>
          </div>
        </section>

        {/* ─── RESOURCES ────────────────────────────────────────────────── */}
        <section className="bg-[#0C0C0A] py-20 lg:py-32 relative overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
          <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-amber-400/40" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-amber-400/60">
                    {c.contentHubSection.eyebrow}
                  </span>
                </div>
                <h2 className="font-serif text-white leading-[1.05] tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}>
                  {c.contentHubSection.title}
                </h2>
              </div>
              {c.contentHubSection.description && (
                <p className="text-[14px] font-sans text-zinc-500 max-w-xs lg:pb-2">{c.contentHubSection.description}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.contentHubSection.items.map((item, idx) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group bg-white/[0.04] border border-white/[0.07] rounded-2xl p-7 flex flex-col hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-zinc-600">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h3 className="text-[17px] font-serif text-white mb-2.5">{item.title}</h3>
                  <p className="text-[13px] font-sans text-zinc-500 leading-[1.6] flex-1 mb-5">{item.description}</p>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-zinc-500 group-hover:text-amber-400 transition-colors">
                    {item.ctaLabel} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="bg-[#F5F3EE] py-24 lg:py-40">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="w-10 h-px bg-zinc-300" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-zinc-500">
                  {c.finalCtaSection.badge}
                </span>
                <span className="w-10 h-px bg-zinc-300" />
              </div>

              <h2 className="font-serif leading-[1.05] tracking-[-0.025em] text-[#0C0C0A] mb-8"
                  style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}>
                {c.finalCtaSection.titleLine1}
                <br />
                <span className="italic text-zinc-500">{c.finalCtaSection.titleLine2}</span>
              </h2>

              <p className="text-[16px] font-sans text-zinc-500 leading-[1.7] mb-12 max-w-xl mx-auto">
                {c.finalCtaSection.description}
              </p>

              {c.finalCtaSection.checklist.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {c.finalCtaSection.checklist.map((item) => (
                    <span key={item} className="flex items-center gap-2 text-[13px] font-sans text-zinc-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={c.finalCtaSection.primaryCta.href}
                className="group inline-flex items-center gap-3 bg-[#0C0C0A] text-white px-12 py-5 rounded-full text-[12px] font-sans font-bold tracking-[0.08em] uppercase hover:bg-zinc-800 transition-all duration-300 shadow-2xl shadow-zinc-900/20 mb-8"
              >
                {c.finalCtaSection.primaryCta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <p className="text-[13px] font-sans text-zinc-400">
                Or email directly:{' '}
                <a href="mailto:ask@buzzedison.com" className="text-zinc-600 hover:text-[#0C0C0A] transition-colors underline underline-offset-2">
                  ask@buzzedison.com
                </a>
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
