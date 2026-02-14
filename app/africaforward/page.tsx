import Link from 'next/link';
import { ArrowUpRight, Mic, Sparkles, Users } from 'lucide-react';
import { getMarketingPageContent } from '@/lib/marketingPages';

export default async function AfricaForwardPage() {
  const content = await getMarketingPageContent('africaforward');
  const whySection = content.sections.find((section) => section.id === 'why');
  const topicsSection = content.sections.find((section) => section.id === 'topics');
  const episodesSection = content.sections.find((section) => section.id === 'episodes');
  const hostSection = content.sections.find((section) => section.id === 'host');
  const communitySection = content.sections.find((section) => section.id === 'community');
  const partnersSection = content.sections.find((section) => section.id === 'partners');

  return (
    <div className="bg-background min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
      <section className="pt-40 pb-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-stone/25 blur-[110px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-10">
            <Mic className="w-3.5 h-3.5 mr-2 text-brand-gold" />
            {content.hero.eyebrow}
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal tracking-tight leading-[0.95] mb-8">
            {content.hero.titleLine1} <br />
            <span className="text-gray-400 italic">{content.hero.emphasizedTitle}</span>
          </h1>

          <p className="text-xl text-brand-muted font-light leading-relaxed max-w-3xl mb-10">
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
      </section>

      <section className="py-24 px-6 lg:px-8 bg-brand-stone/20 border-y border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {whySection?.title}
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed">
              {whySection?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {(whySection?.cards || []).map((stat) => (
              <div key={stat.title} className="bg-white border border-gray-100 p-8">
                <p className="text-4xl font-serif font-bold text-brand-charcoal mb-2">{stat.title}</p>
                <p className="text-sm uppercase tracking-wider text-brand-muted font-bold">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {topicsSection?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto">
              {topicsSection?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(topicsSection?.cards || []).map((topic) => (
              <article key={topic.title} className="bg-white border border-gray-100 p-8">
                <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-3">{topic.title}</h3>
                <p className="text-brand-muted">{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="episodes" className="py-24 px-6 lg:px-8 bg-brand-stone/20 border-y border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {episodesSection?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              {episodesSection?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(episodesSection?.cards || []).map((episode) => (
              <article key={episode.title} className="bg-white border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted">Episode</p>
                  {episode.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      {episode.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-3">{episode.title}</h3>
                <p className="text-brand-muted mb-6">{episode.description}</p>
                <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-charcoal hover:text-brand-gold transition-colors">
                  Listen
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <article className="bg-white border border-brand-stone/60 p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-5">Meet Your Host</p>
            <h2 className="text-4xl font-serif font-bold text-brand-charcoal mb-4">{hostSection?.cards?.[0]?.title}</h2>
            <p className="text-brand-muted leading-relaxed">
              {hostSection?.cards?.[0]?.description}
            </p>
          </article>

          <article id="community" className="bg-brand-charcoal text-white p-10">
            <div className="inline-flex items-center px-3 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white/70 mb-6">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-brand-gold" />
              {communitySection?.title}
            </div>
            <h2 className="text-4xl font-serif font-bold mb-4">{communitySection?.cards?.[0]?.title}</h2>
            <p className="text-white/75 mb-8">
              {communitySection?.cards?.[0]?.description}
            </p>
            {communitySection?.cards?.[0]?.ctaHref && (
              <Link
                href={communitySection.cards[0].ctaHref}
                className="inline-flex items-center gap-2 bg-white text-brand-charcoal px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-brand-stone transition-colors"
              >
                {communitySection.cards[0].ctaLabel || 'Subscribe'}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </article>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-brand-stone/20 border-y border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {partnersSection?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto">
              {partnersSection?.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {(partnersSection?.items || []).map((partner) => (
              <div key={partner} className="inline-flex items-center gap-2 bg-white border border-gray-100 px-6 py-3">
                <Users className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-bold uppercase tracking-wide text-brand-charcoal">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
