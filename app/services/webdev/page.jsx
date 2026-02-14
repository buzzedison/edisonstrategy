import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Code2, Globe, Smartphone } from 'lucide-react';
import { getMarketingPageContent } from '@/lib/marketingPages';

export default async function WebDevelopmentPage() {
  const content = await getMarketingPageContent('services-webdev');
  const offers = content.sections.find((section) => section.id === 'offers');
  const icons = [Globe, Code2, Smartphone];

  return (
    <div className="bg-background min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
      <section className="pt-40 pb-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-stone/25 blur-[110px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-8">{content.hero.eyebrow}</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal leading-[0.95] tracking-tight mb-8">
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

          <div className="relative">
            <div className="bg-brand-stone/40 p-4 border border-brand-stone/60">
              <Image
                src={content.hero.imageUrl || '/image/webdev.png'}
                alt={content.hero.imageAlt || 'Web and mobile development'}
                width={700}
                height={520}
                className="w-full h-[420px] object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-brand-stone/20 border-y border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {offers?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto">
              {offers?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(offers?.cards || []).map((offer, index) => {
              const Icon = icons[index] || Globe;
              return (
              <article key={offer.title} className="bg-white border border-gray-100 p-8">
                <div className="w-12 h-12 bg-brand-stone flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-brand-charcoal" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-3">{offer.title}</h3>
                <p className="text-brand-muted mb-6">{offer.description}</p>
                <ul className="space-y-3">
                  {(offer.bullets || []).map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-brand-muted">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            )})}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-charcoal p-12 md:p-16 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                {content.finalCta.title}
              </h2>
              <p className="text-white/75 text-lg">
                {content.finalCta.description}
              </p>
            </div>
            <Link
              href={content.finalCta.button.href}
              className="inline-flex items-center gap-2 bg-white text-brand-charcoal px-10 py-4 text-sm font-bold uppercase tracking-wider hover:bg-brand-stone transition-colors"
            >
              {content.finalCta.button.label}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
