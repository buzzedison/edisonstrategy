"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Brain, Target, Shield, Zap, Globe, Cpu, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import SignatureOffers from './components/SignatureOffers';
import { getDefaultMarketingPageContent, getMarketingPageContent, type MarketingPageContent } from '@/lib/marketingPages';

const StrategicPillar = ({
  title,
  subtitle,
  services,
  icon: Icon,
  index
}: {
  title: string;
  subtitle: string;
  services: string[];
  icon: any;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="flex flex-col h-full bg-white border border-gray-100 p-10 lg:p-14 hover:shadow-2xl hover:shadow-brand-charcoal/5 transition-all duration-1000">
        <div className="w-20 h-20 bg-brand-stone/30 flex items-center justify-center text-brand-charcoal mb-12 group-hover:bg-brand-charcoal group-hover:text-white transition-all duration-700">
          <Icon className="w-10 h-10" />
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-serif font-bold text-brand-charcoal mb-4 group-hover:text-brand-gold transition-colors">{title}</h3>
          <p className="text-lg text-brand-muted font-light leading-relaxed">{subtitle}</p>
        </div>

        <div className="space-y-4 mb-14 mt-auto">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 mb-6">What You Get</h4>
          <div className="grid grid-cols-1 gap-4">
            {services.map((service, i) => (
              <div key={i} className="flex items-center gap-4 text-brand-muted font-light group/item">
                <div className="w-1.5 h-1.5 bg-brand-gold/40 group-hover/item:scale-150 transition-transform" />
                <span className="text-[15px]">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors">
          Book a Free Call <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [content, setContent] = React.useState<MarketingPageContent>(() => getDefaultMarketingPageContent('services'));

  React.useEffect(() => {
    async function fetchPageContent() {
      const pageContent = await getMarketingPageContent('services');
      setContent(pageContent);
    }
    fetchPageContent();
  }, []);

  const pillarsSection = content.sections.find((section) => section.id === 'pillars');
  const quoteSection = content.sections.find((section) => section.id === 'quote');
  const pillarIcons = [Target, TrendingUp, Cpu];
  const pillars = (pillarsSection?.cards || []).map((card, index) => ({
    title: card.title,
    subtitle: card.description || '',
    services: card.bullets || [],
    icon: pillarIcons[index] || Target,
  }));

  return (
    <div className="bg-background min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
      {/* Hero Section - Refined Editorial Style */}
      <section className="pt-40 pb-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-stone/20 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-12"
            >
              <Shield className="h-3.5 w-3.5 mr-2" />
              {content.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif font-bold text-brand-charcoal tracking-tight leading-[0.9] mb-12"
            >
              {content.hero.titleLine1} <br />
              <span className="text-gray-400">{content.hero.emphasizedTitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-2xl md:text-3xl text-brand-muted font-light leading-relaxed max-w-3xl mb-16"
            >
              {content.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              <Link href={content.hero.primaryCta.href}>
                <Button className="bg-brand-charcoal hover:bg-black text-white px-12 py-8 rounded-none text-lg transition-all shadow-sm hover:shadow-2xl">
                  {content.hero.primaryCta.label}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Section */}
      <section className="py-32 px-6 lg:px-8 bg-background relative border-y border-brand-stone/50">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-brand-charcoal mb-8 tracking-tight">
              {(pillarsSection?.title || 'How I Help You Grow.').split('. ')[0]} <span className="text-gray-400 italic">{(pillarsSection?.title || '').split('. ')[1] || ''}</span>
            </h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {pillars.map((pillar, index) => (
              <StrategicPillar key={pillar.title} {...pillar} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Signature Offers Component */}
      <SignatureOffers />

      {/* Trust Quote Section */}
      <section className="py-40 px-6 lg:px-8 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-tight mb-16 px-4">
              "{quoteSection?.title}"
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-12 h-1 bg-brand-gold mb-6" />
              <p className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs">Edison Ade</p>
              <p className="text-white/30 text-xs mt-2 font-medium">FOUNDER STRATEGY PARTNER</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-40 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-stone/30 p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-charcoal mb-8 tracking-tight">
                {content.finalCta.title}
              </h2>
              <p className="text-xl text-brand-muted font-light leading-relaxed mb-12">
                {content.finalCta.description}
              </p>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                <span className="text-sm font-bold uppercase tracking-widest text-brand-charcoal">Limited Call Slots Each Week</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <Link href={content.finalCta.button.href}>
                <Button className="bg-brand-charcoal hover:bg-black text-white px-16 py-10 rounded-none text-xl transition-all shadow-2xl hover:scale-105 active:scale-95">
                  {content.finalCta.button.label}
                </Button>
              </Link>
              <p className="mt-8 text-brand-muted font-light text-sm italic">"Simple systems. Better growth."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
