"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight, Sparkles, Shield, Clock, Globe } from 'lucide-react';
import { getDefaultMarketingPageContent, getMarketingPageContent, type MarketingPageContent } from '@/lib/marketingPages';

export default function ContactPage() {
    const [content, setContent] = React.useState<MarketingPageContent>(() => getDefaultMarketingPageContent('contact'));
    const directSection = content.sections.find((section) => section.id === 'direct');
    const prepSection = content.sections.find((section) => section.id === 'prep');
    const bookingSection = content.sections.find((section) => section.id === 'booking');

    React.useEffect(() => {
        async function fetchContent() {
            const pageContent = await getMarketingPageContent('contact');
            setContent(pageContent);
        }
        fetchContent();
    }, []);

    return (
        <div className="bg-white min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-stone/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 rounded-full text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-12"
                        >
                            <Sparkles className="h-3.5 w-3.5 mr-2 text-brand-gold" />
                            {content.hero.eyebrow}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-6xl md:text-8xl font-serif font-bold text-brand-charcoal tracking-tight leading-[0.9] mb-12"
                        >
                            {content.hero.titleLine1} <br />
                            <span className="text-gray-400 italic">{content.hero.emphasizedTitle}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-xl md:text-2xl text-brand-muted font-light leading-relaxed max-w-2xl"
                        >
                            {content.hero.description}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main Intake Section */}
            <section className="pb-32 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* Sidebar: Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="lg:col-span-4 space-y-12"
                        >
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-charcoal border-b border-brand-stone pb-4 mb-8">{directSection?.title}</h3>
                                <div className="space-y-10">
                                    <div className="group cursor-pointer">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2 transition-colors group-hover:text-brand-gold">
                                            {directSection?.cards?.[0]?.title || 'Email'}
                                        </p>
                                        <a href={`mailto:${directSection?.cards?.[0]?.description || 'ask@buzzedison.com'}`} className="text-xl font-serif group-hover:text-brand-charcoal transition-colors">
                                            {directSection?.cards?.[0]?.description || 'ask@buzzedison.com'}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 bg-brand-stone/30 rounded-[3rem] border border-brand-stone/50 hover:bg-white hover:shadow-2xl hover:shadow-brand-charcoal/5 transition-all duration-700">
                                <Shield className="w-8 h-8 text-brand-gold mb-6" />
                                <h4 className="text-lg font-serif font-bold text-brand-charcoal mb-4">{prepSection?.title}</h4>
                                <p className="text-sm text-brand-muted font-light leading-relaxed opacity-80">
                                    {prepSection?.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pl-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Currently Booking Calls</span>
                            </div>
                        </motion.div>

                        {/* Main: Calendar Booking */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="lg:col-span-8"
                        >
                            <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-brand-charcoal/5 overflow-hidden relative">
                                <div className="p-12 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-charcoal flex items-center justify-center text-white">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-serif font-bold text-brand-charcoal">{bookingSection?.title}</h3>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{bookingSection?.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-gold" /> {bookingSection?.items?.[0]}</div>
                                        <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-brand-gold" /> {bookingSection?.items?.[1]}</div>
                                    </div>
                                </div>

                                <div className="bg-brand-stone/10 p-4 md:p-8">
                                    <iframe
                                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0cfx_8uXRMAd69sMhA26BXX7exBnW3KDFUtLtoJq9_Llw5b94mWxB7NOqmhaUxM135XnFTPz3L?gv=true"
                                        className="w-full h-[700px] border-0 rounded-[2.5rem] bg-white shadow-inner"
                                        title="Google Calendar Appointment Scheduling"
                                    ></iframe>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-40 bg-brand-charcoal relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-tight mb-16">
                            &ldquo;{content.finalCta.title}&rdquo;
                        </h2>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-[1px] bg-brand-gold/30 mb-8" />
                            <Link href={content.finalCta.button.href} className="flex items-center gap-8 group">
                                <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs transition-all group-hover:tracking-[0.6em]">{content.finalCta.button.label}</span>
                                <ArrowUpRight className="w-6 h-6 text-brand-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
