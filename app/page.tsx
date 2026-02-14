import { type ComponentType } from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  CheckCircle,
  FileText,
  Globe,
  Mic,
  MonitorSmartphone,
  Smartphone,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSection from './components/HeroSection';
import CTASection from './components/CTASection';
import BooksSection from './components/BooksSection';
import Link from 'next/link';
import { getLandingPageContent } from '@/lib/landingPage';
import { supabase } from '@/lib/supabaseClient';

const frameworkIconMap: Record<string, ComponentType<{ className?: string }>> = {
  trendingUp: TrendingUp,
  brain: Brain,
  target: Target,
};

const serviceIconMap: Record<string, ComponentType<{ className?: string }>> = {
  strategy: Target,
  website: MonitorSmartphone,
  mobile: Smartphone,
  insights: TrendingUp,
  podcast: Mic,
};

const hubIconMap: Record<string, ComponentType<{ className?: string }>> = {
  book: BookOpen,
  mic: Mic,
  insight: TrendingUp,
};

interface InsightPost {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  cover_image: string | null;
  created_at: string;
}

interface InsightCard {
  title: string;
  excerpt: string;
  href: string;
  date: string;
  readTime: string;
  imageUrl?: string | null;
}

const fetchPosts = async (): Promise<InsightPost[]> => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, slug, title, content, cover_image, created_at')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching homepage posts:', error);
    return [];
  }

  return (posts as InsightPost[]) || [];
};

const getExcerpt = (htmlContent: string | null) => {
  if (!htmlContent) {
    return 'Read the full article for practical insights and next steps.';
  }

  const plainText = htmlContent.replace(/<[^>]*>/g, '').trim();
  if (!plainText) {
    return 'Read the full article for practical insights and next steps.';
  }

  return plainText.length > 140 ? `${plainText.substring(0, 140)}...` : plainText;
};

const getReadTime = (htmlContent: string | null) => {
  if (!htmlContent) {
    return '5 min read';
  }

  const plainText = htmlContent.replace(/<[^>]*>/g, ' ').trim();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default async function Home() {
  const [landingContent, posts] = await Promise.all([getLandingPageContent(), fetchPosts()]);

  const postCards: InsightCard[] = posts.map((post) => ({
    title: post.title,
    excerpt: getExcerpt(post.content),
    href: `/insights/${post.slug}`,
    date: post.created_at,
    readTime: getReadTime(post.content),
    imageUrl: post.cover_image,
  }));

  const selectedInsights: InsightCard[] =
    postCards.length > 0 ? postCards : landingContent.insightsSection.cards;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": landingContent.seo.personName,
    "url": landingContent.seo.websiteUrl,
    "sameAs": landingContent.seo.socialLinks,
    "jobTitle": landingContent.seo.jobTitle,
    "worksFor": {
      "@type": "Organization",
      "name": landingContent.seo.organizationName,
    },
    "description": landingContent.seo.description,
  };

  return (
    <div className="min-h-screen bg-background selection:bg-brand-charcoal selection:text-brand-stone">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection content={landingContent.hero} />

      <section className="py-8 px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-brand-muted">
            {landingContent.trustBarStats.map((stat, i) => (
              <div key={`${stat.value}-${i}`} className="flex items-center gap-3">
                <span className="text-xl font-serif font-semibold text-brand-charcoal">{stat.value}</span>
                <span className="text-xs text-brand-muted font-light">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-brand-stone/40 border-b border-brand-stone">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase mb-5 text-center">{landingContent.brandsSection.eyebrow}</p>
          <h2 className="text-2xl md:text-3xl text-brand-charcoal font-serif text-center mb-4">{landingContent.brandsSection.title}</h2>
          <p className="text-brand-muted text-center max-w-3xl mx-auto mb-12">{landingContent.brandsSection.description}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {landingContent.brandsSection.brands.map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                href={brand.website || '/contact'}
                className="group bg-white border border-gray-100 h-24 px-6 flex items-center justify-center hover:shadow-sm transition-all"
              >
                {brand.logoUrl ? (
                  <div className="relative h-10 w-full">
                    <Image src={brand.logoUrl} alt={brand.name} fill className="object-contain" />
                  </div>
                ) : (
                  <span className="text-sm font-medium text-brand-charcoal group-hover:text-brand-gold transition-colors">{brand.name}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-8 bg-background relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[1px] bg-brand-gold/40" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase mb-6">{landingContent.frameworksSection.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-brand-charcoal tracking-tight mb-4">
              {landingContent.frameworksSection.title} <span className="italic text-gray-400">{landingContent.frameworksSection.emphasizedTitle}</span>
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {landingContent.frameworksSection.frameworks.map((item, idx) => {
              const Icon = frameworkIconMap[item.icon] || TrendingUp;

              return (
                <div key={`${item.title}-${idx}`} className={`group py-12 px-10 ${idx < landingContent.frameworksSection.frameworks.length - 1 ? 'md:border-r md:border-gray-100' : ''}`}>
                  <div className="w-12 h-12 bg-brand-stone/60 flex items-center justify-center text-brand-charcoal mb-8 group-hover:bg-brand-charcoal group-hover:text-white transition-all duration-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-medium text-brand-charcoal mb-5 tracking-tight">{item.title}</h3>
                  <p className="text-brand-muted leading-[1.8] font-light text-[15px] mb-6">{item.description}</p>
                  <p className="text-[12px] font-semibold text-brand-charcoal flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                    {item.result}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link href={landingContent.frameworksSection.cta.href}>
              <Button className="h-[56px] px-14 text-[15px] bg-brand-charcoal hover:bg-black text-white rounded-none shadow-lg hover:shadow-xl transition-all duration-500 tracking-wide">
                {landingContent.frameworksSection.cta.label}
                <Calendar className="ml-3 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-brand-muted mt-4 font-light">{landingContent.frameworksSection.ctaHelperText}</p>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase mb-4">{landingContent.servicesSection.eyebrow}</p>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-4">{landingContent.servicesSection.title}</h2>
              <p className="text-brand-muted max-w-2xl">{landingContent.servicesSection.description}</p>
            </div>
            <Link href={landingContent.servicesSection.primaryCta.href}>
              <Button className="rounded-none bg-brand-charcoal hover:bg-black text-white px-8 py-6">
                {landingContent.servicesSection.primaryCta.label}
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {landingContent.servicesSection.services.map((service, idx) => {
              const Icon = serviceIconMap[service.icon] || Building2;

              return (
                <div key={`${service.title}-${idx}`} className="border border-gray-100 p-8 bg-background hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 bg-brand-stone flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-brand-charcoal" />
                  </div>
                  <h3 className="text-xl font-medium text-brand-charcoal mb-3">{service.title}</h3>
                  <p className="text-brand-muted text-sm leading-7 mb-5">{service.description}</p>
                  <p className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal mb-6">{service.outcome}</p>
                  <Link href={service.href} className="inline-flex items-center text-sm font-medium text-brand-charcoal hover:text-brand-gold">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-8 bg-brand-stone/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase mb-4">{landingContent.contentHubSection.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-4">{landingContent.contentHubSection.title}</h2>
            <p className="text-brand-muted">{landingContent.contentHubSection.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {landingContent.contentHubSection.items.map((item, idx) => {
              const Icon = hubIconMap[item.icon] || Globe;

              return (
                <div key={`${item.title}-${idx}`} className="bg-white border border-gray-100 p-8">
                  <Icon className="w-6 h-6 text-brand-charcoal mb-5" />
                  <h3 className="text-xl text-brand-charcoal mb-3 font-medium">{item.title}</h3>
                  <p className="text-sm text-brand-muted leading-7 mb-6">{item.description}</p>
                  <Link href={item.href} className="inline-flex items-center text-sm font-medium text-brand-charcoal hover:text-brand-gold">
                    {item.ctaLabel} <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BooksSection content={landingContent.booksSection} />

      <section className="py-36 px-6 lg:px-8 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[1px] bg-brand-gold/30" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 pb-12 border-b border-gray-100">
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-5 py-2 bg-brand-stone/50 border border-gray-100 text-[9px] font-bold tracking-[0.25em] text-brand-muted uppercase mb-8">
                <BookOpen className="h-3 w-3 mr-2.5" />
                {landingContent.insightsSection.badge}
              </div>
              <h2 className="text-5xl md:text-6xl font-medium text-brand-charcoal tracking-tight leading-[1.1]">
                {landingContent.insightsSection.titleLine1} <br />
                <span className="text-gray-400 italic font-serif">{landingContent.insightsSection.emphasizedTitle}</span>
              </h2>
            </div>
            <Link href={landingContent.insightsSection.viewAllLink.href} className="hidden md:flex items-center text-[13px] font-medium text-brand-charcoal hover:text-brand-gold transition-colors duration-500 group tracking-wide">
              {landingContent.insightsSection.viewAllLink.label} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-20">
            {selectedInsights.map((card, index) => (
              <article key={`${card.title}-${index}`} className="group flex flex-col h-full cursor-pointer">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[11px] font-bold text-brand-gold tracking-[0.15em]">0{index + 1}</span>
                  <div className="h-[1px] flex-1 bg-gray-100" />
                </div>

                <Link href={card.href} className="block overflow-hidden mb-8 relative border border-gray-100 shadow-sm">
                  {card.imageUrl ? (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="h-64 w-full bg-brand-stone flex items-center justify-center">
                      <FileText className="h-10 w-10 text-brand-muted" />
                    </div>
                  )}
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-muted">
                    <span>{formatDate(card.date)}</span>
                    <span className="w-1 h-1 bg-brand-gold/40 rounded-full" />
                    <span>{card.readTime}</span>
                  </div>

                  <h3 className="text-2xl font-medium text-brand-charcoal mb-4 group-hover:text-brand-gold transition-colors duration-500 leading-snug tracking-tight">
                    <Link href={card.href}>{card.title}</Link>
                  </h3>

                  <p className="text-brand-muted mb-8 line-clamp-3 leading-[1.8] font-light text-[15px]">
                    {card.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <Link href={card.href} className="inline-flex items-center text-[13px] text-brand-charcoal font-medium group-hover:text-brand-gold transition-colors duration-500 tracking-wide">
                      Read Insight <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-brand-charcoal text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase mb-4">{landingContent.testimonialsSection.badge}</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{landingContent.testimonialsSection.introTitle} <span className="italic text-white/70">{landingContent.testimonialsSection.emphasizedTitle}</span></h2>
            <p className="text-gray-300">{landingContent.testimonialsSection.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {landingContent.testimonialsSection.testimonials.map((testimonial, idx) => (
              <div key={`${testimonial.name}-${idx}`} className="border border-white/10 p-8 bg-white/[0.02]">
                <p className="text-gray-200 leading-7 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="font-medium text-white">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">{testimonial.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={landingContent.testimonialsSection.endingCard.cta.href}>
              <Button className="bg-white text-brand-charcoal hover:bg-brand-stone rounded-none px-10 py-6">
                {landingContent.testimonialsSection.endingCard.cta.label}
              </Button>
            </Link>
            <p className="text-gray-400 text-sm mt-4">{landingContent.testimonialsSection.endingCard.description}</p>
          </div>
        </div>
      </section>

      <CTASection content={landingContent.finalCtaSection} />
    </div>
  );
}
