import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Compass, Sparkles, Users } from 'lucide-react';
import { getMarketingPageContent } from '@/lib/marketingPages';

export default async function CoachingConsultingPage() {
  const content = await getMarketingPageContent('coaching');
  const areas = content.sections.find((section) => section.id === 'areas');
  const outcomes = content.sections.find((section) => section.id === 'outcomes');
  const sessionFlow = content.sections.find((section) => section.id === 'session-flow');

  return (
    <div className="bg-background min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
      <section className="pt-40 pb-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-stone/25 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-10">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-brand-gold" />
              {content.hero.eyebrow}
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal tracking-tight leading-[0.95] mb-10">
              {content.hero.titleLine1} <br />
              <span className="text-gray-400 italic">{content.hero.emphasizedTitle}</span>
            </h1>

            <p className="text-xl md:text-2xl text-brand-muted font-light leading-relaxed max-w-3xl mb-12">
              {content.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={content.hero.primaryCta.href}
                className="inline-flex items-center gap-2 bg-brand-charcoal hover:bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-wider transition-colors"
              >
                {content.hero.primaryCta.label}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              {content.hero.secondaryCta && (
                <Link
                  href={content.hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-charcoal border border-brand-charcoal/20 hover:border-brand-charcoal transition-colors"
                >
                  {content.hero.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-brand-stone/20 border-y border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {areas?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              {areas?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(areas?.cards || []).map((item) => (
              <article key={item.title} className="bg-white border border-gray-100 p-8">
                <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-3">{item.title}</h3>
                <p className="text-brand-muted leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-8">
              {outcomes?.title}
            </h2>
            <div className="space-y-4">
              {(outcomes?.items || []).map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold mt-1" />
                  <p className="text-brand-muted text-lg">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-brand-charcoal text-white p-10">
            <h3 className="text-3xl font-serif font-bold mb-6">{sessionFlow?.title}</h3>
            <div className="space-y-5 text-white/80">
              {(sessionFlow?.items || []).map((item, index) => {
                const Icon = index === 0 ? Compass : index === 1 ? Users : Sparkles;
                return (
                  <div key={item} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-brand-gold mt-1" />
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-8 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-tight mb-10">
            &ldquo;{content.finalCta.title}&rdquo;
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
