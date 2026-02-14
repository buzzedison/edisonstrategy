import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Code2, Globe, Smartphone, Layers3 } from 'lucide-react';
import { getMarketingPageContent } from '@/lib/marketingPages';

export default async function DevelopmentPage() {
  const content = await getMarketingPageContent('development');
  const highlights = content.sections.find((section) => section.id === 'highlights');
  const buildSection = content.sections.find((section) => section.id === 'build');
  const processSection = content.sections.find((section) => section.id === 'process');
  const serviceIcons = [Globe, Smartphone, Layers3];

  return (
    <div className="bg-background min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
      <section className="pt-40 pb-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-stone/20 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-stone border border-gray-100 text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-10">
              <Code2 className="w-3.5 h-3.5 text-brand-gold" />
              {content.hero.eyebrow}
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal leading-[0.95] tracking-tight mb-8">
              {content.hero.titleLine1} <br />
              <span className="text-gray-400 italic">{content.hero.emphasizedTitle}</span>
            </h1>

            <p className="text-xl text-brand-muted font-light leading-relaxed max-w-2xl mb-10">
              {content.hero.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
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

            <div className="space-y-3">
              {(highlights?.items || []).map((item) => (
                <p key={item} className="flex items-center gap-2 text-brand-muted">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" /> {item}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-brand-stone/35 border border-brand-stone/60 p-4">
            <Image
              src={content.hero.imageUrl || '/image/webdev.png'}
              alt={content.hero.imageAlt || 'Development showcase'}
              width={700}
              height={560}
              className="w-full h-[460px] object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-brand-stone/20 border-y border-brand-stone/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {buildSection?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto">
              {buildSection?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(buildSection?.cards || []).map((item, index) => {
              const Icon = serviceIcons[index] || Globe;
              return (
              <article key={item.title} className="bg-white border border-gray-100 p-8">
                <div className="w-12 h-12 bg-brand-stone flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-brand-charcoal" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-3">{item.title}</h3>
                <p className="text-brand-muted mb-6">{item.description}</p>
                <ul className="space-y-3">
                  {(item.bullets || []).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-brand-muted">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold mt-0.5" />
                      {bullet}
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
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight mb-4">
              {processSection?.title}
            </h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              {processSection?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(processSection?.cards || []).map((item) => (
              <article key={item.title} className="bg-white border border-brand-stone/60 p-8">
                <p className="text-xs font-bold tracking-[0.25em] text-brand-gold mb-4">{item.title?.split(' ')[0]}</p>
                <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-3">
                  {item.title?.split(' ').slice(1).join(' ') || item.title}
                </h3>
                <p className="text-brand-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-8 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-brand-gold/10 blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
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
