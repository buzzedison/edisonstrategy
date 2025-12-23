'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  Target,
  Zap,
  Users,
  Building,
  Brain,
  Calendar,
  MapPin,
  Clock,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Shield,
  Play
} from 'lucide-react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import { supabase } from '@/lib/supabaseClient';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  time: string;
  type: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  meta_description: string;
  created_at: string;
  tags: string[];
}

interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  excerpt: string;
}

export default function AboutPage() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [latestInsights, setLatestInsights] = useState<Post[]>([]);
  const [featuredWorks, setFeaturedWorks] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch next event from Sanity
        const upcomingEvent = await client.fetch(groq`
          *[_type == "event" && date >= now()] | order(date asc)[0] {
            _id, title, date, location, time, type
          }
        `);
        setNextEvent(upcomingEvent);

        // Fetch latest insights from Supabase
        const { data: posts } = await supabase
          .from('posts')
          .select('id, title, slug, meta_description, created_at, tags')
          .neq('content', '<p><br></p>')
          .order('created_at', { ascending: false })
          .limit(3);
        setLatestInsights((posts || []) as Post[]);

        // Fetch featured portfolio from Sanity
        const works = await client.fetch(groq`
          *[_type == "portfolio" && featured == true] | order(projectDate desc)[0..2] {
            _id, title, slug, mainImage, excerpt
          }
        `);
        setFeaturedWorks(works);
      } catch (error) {
        console.error('Error fetching dynamic About data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
      {/* Hero Section: Portrait-led Editorial */}
      <section className="pt-40 pb-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-stone/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 rounded-full text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-12">
                <Sparkles className="h-3.5 w-3.5 mr-2 text-brand-gold" />
                Strategic Architect
              </div>

              <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-charcoal tracking-tight leading-[0.9] mb-12">
                Edison <br />
                <span className="text-gray-400 italic">Ade.</span>
              </h1>

              <p className="text-2xl md:text-3xl text-brand-muted font-light leading-relaxed mb-12">
                I build the <span className="text-brand-charcoal font-medium underline decoration-brand-gold/30 underline-offset-8">systems</span> that turn vision into high-leverage outcomes.
              </p>

              <div className="space-y-8 text-lg text-brand-muted font-light leading-relaxed max-w-xl">
                <p>
                  Specializing in the intersection of business strategy and systems engineering, I partner with founders and organizations to architect scalable growth.
                </p>
                <p>
                  My work is characterized by "Quiet Premium"—a focus on deep impact over noise, building resilient frameworks that sustain long-term excellence.
                </p>
              </div>

              <div className="mt-16 flex flex-wrap gap-8 items-center">
                <Link href="/contact" className="px-12 py-6 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                  Initiate Engagement
                </Link>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-brand-stone flex items-center justify-center group-hover:bg-brand-stone transition-all">
                    <Play className="w-4 h-4 text-brand-charcoal ml-1" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Watch Philosophy</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[4rem] overflow-hidden bg-brand-stone"
            >
              <Image
                src="/image/edisonnew.jpg"
                alt="Edison Ade"
                fill
                priority
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Directives: The 3 Pillars */}
      <section className="py-24 bg-brand-stone/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Systems That Scale", desc: "Engineering the operational infrastructure needed to support rapid expansion without friction." },
              { icon: Zap, title: "Smart Workflows", desc: "Eliminating digital waste through intelligent process automation and high-efficiency tooling." },
              { icon: TrendingUp, title: "Long-Term Growth", desc: "Drafting strategic blueprints that ensure consistency, profitability, and market leadership." }
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-10 bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl hover:shadow-brand-charcoal/5 transition-all"
              >
                <pillar.icon className="w-10 h-10 text-brand-gold mb-8" />
                <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">{pillar.title}</h3>
                <p className="text-brand-muted font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Briefing: Dynamic Sanity Event */}
      {nextEvent && (
        <section className="py-32 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-brand-charcoal rounded-[4rem] p-12 md:p-24 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <div className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-12">
                    <Calendar className="w-4 h-4" /> Next Strategic Briefing
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tight">
                    {nextEvent.title}
                  </h2>
                  <div className="flex flex-wrap gap-8 text-white/60 text-sm font-light uppercase tracking-widest">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-gold" /> {nextEvent.location}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-gold" /> {nextEvent.time}</div>
                  </div>
                </div>
                <div className="flex justify-start lg:justify-end">
                  <Link href="/events" className="px-12 py-6 bg-white text-brand-charcoal rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all">
                    Register for Session
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Selected Insights: Dynamic Supabase Posts */}
      {latestInsights.length > 0 && (
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-4">Strategic Archives</div>
                <h2 className="text-5xl font-serif font-bold text-brand-charcoal">Selected Insights.</h2>
              </div>
              <Link href="/insights" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-charcoal transition-colors group">
                Enter the Library <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {latestInsights.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/insights/${post.slug}`}>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-6">{post.tags?.[0]}</div>
                    <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4 group-hover:text-brand-gold transition-colors duration-500">{post.title}</h3>
                    <p className="text-sm text-brand-muted font-light leading-relaxed mb-8 line-clamp-2">{post.meta_description}</p>
                    <div className="w-12 h-[1px] bg-brand-stone group-hover:w-24 group-hover:bg-brand-charcoal transition-all duration-700" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Selected Works Strip: Sanity Portfolio */}
      {featuredWorks.length > 0 && (
        <section className="py-24 bg-brand-charcoal text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <h2 className="text-5xl font-serif font-bold">Selected Works.</h2>
              <Link href="/portfolio" className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group">
                Examine All Strategies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {featuredWorks.map((work, idx) => (
                <motion.div
                  key={work._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/portfolio/${work.slug.current}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 bg-white/5">
                      {work.mainImage && (
                        <Image
                          src={urlFor(work.mainImage).url()}
                          alt={work.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <h3 className="text-2xl font-serif font-bold group-hover:text-brand-gold transition-colors">{work.title}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Narrative CTA */}
      <section className="py-40 px-6 lg:px-8 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal mb-12 tracking-tight">
              Let's Architect <br /> your <span className="text-gray-400 italic">Evolution.</span>
            </h2>
            <p className="text-xl text-brand-muted font-light leading-relaxed mb-16 max-w-2xl mx-auto">
              The status quo is your only competitor. I'm ready to help you engineer a system that makes it obsolete.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-8 group">
              <span className="text-brand-charcoal font-bold uppercase tracking-[0.4em] text-xs">Initiate a Strategic Dialogue</span>
              <div className="w-20 h-[1px] bg-brand-stone group-hover:w-40 group-hover:bg-brand-charcoal transition-all duration-700" />
              <ArrowUpRight className="w-6 h-6 text-brand-charcoal" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}