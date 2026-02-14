import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Mic, Radio, Users } from 'lucide-react';
import { getMarketingPageContent } from '@/lib/marketingPages';

export default async function SpeakingPage() {
  const content = await getMarketingPageContent('speaking');
  const topicsSection = content.sections.find((section) => section.id === 'topics');
  const podcastsSection = content.sections.find((section) => section.id === 'podcasts');
  const spacesSection = content.sections.find((section) => section.id === 'spaces');
  const clientsSection = content.sections.find((section) => section.id === 'clients');

  return (
    <div className="bg-background min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
      <section className="pt-40 pb-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-stone/25 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-8">{content.hero.eyebrow}</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal tracking-tight leading-[0.95] mb-8">
              {content.hero.titleLine1} <br />
              <span className="text-gray-400 italic">{content.hero.emphasizedTitle}</span>
            </h1>
            <p className="text-xl text-brand-muted font-light leading-relaxed max-w-2xl mb-10">
              {content.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={content.hero.primaryCta.href}
                className="inline-flex items-center gap-2 bg-brand-charcoal text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                {content.hero.primaryCta.label}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              {content.hero.secondaryCta && (
                <Link
                  href={content.hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-brand-charcoal/20 text-brand-charcoal px-8 py-4 text-sm font-bold uppercase tracking-wider hover:border-brand-charcoal transition-colors"
                >
                  {content.hero.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          <div className="bg-brand-stone/35 border border-brand-stone/60 p-4">
            <Image
              src={content.hero.imageUrl || '/image/edisonnew.jpg'}
              alt={content.hero.imageAlt || 'Edison speaking at an event'}
              width={700}
              height={520}
              className="w-full h-[420px] object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section id="topics" className="py-24 px-6 lg:px-8 bg-brand-stone/20 border-y border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {topicsSection?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              {topicsSection?.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(topicsSection?.items || []).map((topic) => (
              <div key={topic} className="bg-white border border-gray-100 px-5 py-4">
                <p className="text-sm font-medium text-brand-charcoal">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="podcasts" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {podcastsSection?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto">
              {podcastsSection?.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(podcastsSection?.cards || []).map((card, index) => (
              <article key={card.title} className="bg-white border border-gray-100 p-8">
                <div className="w-12 h-12 bg-brand-stone flex items-center justify-center mb-6">
                  {index === 0 ? <Mic className="w-6 h-6 text-brand-charcoal" /> : <Users className="w-6 h-6 text-brand-charcoal" />}
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-3">{card.title}</h3>
                <p className="text-brand-muted mb-6">{card.description}</p>
                {card.ctaLabel && card.ctaHref && (
                  <Link href={card.ctaHref} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-charcoal hover:text-brand-gold transition-colors">
                    {card.ctaLabel}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="spaces" className="py-24 px-6 lg:px-8 bg-brand-stone/20 border-y border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <article className="bg-white border border-gray-100 p-8">
              <div className="w-12 h-12 bg-brand-stone flex items-center justify-center mb-6">
                <Radio className="w-6 h-6 text-brand-charcoal" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-brand-charcoal mb-3">{spacesSection?.title}</h2>
              <p className="text-brand-muted mb-6">
                {spacesSection?.description}
              </p>
              {(spacesSection?.items || []).map((item) => (
                <p key={item} className="flex items-start gap-2 text-brand-muted">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold mt-1" />
                  {item}
                </p>
              ))}
            </article>

            <article className="bg-white border border-gray-100 p-8">
              <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-5">{clientsSection?.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {(clientsSection?.items || []).map((client) => (
                  <div key={client} className="bg-brand-stone/30 px-4 py-3 text-center text-sm font-medium text-brand-charcoal">
                    {client}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-8 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-tight mb-10">
            {content.finalCta.title}
          </h2>
          <Link
            href={content.finalCta.button.href}
            className="inline-flex items-center gap-2 bg-white text-brand-charcoal px-10 py-4 text-sm font-bold uppercase tracking-wider hover:bg-brand-stone transition-colors"
          >
            {content.finalCta.button.label}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
