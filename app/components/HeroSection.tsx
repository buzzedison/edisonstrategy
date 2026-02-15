'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Sparkles, Zap, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import type { LandingPageContent } from '@/lib/landingPage';

interface HeroSectionProps {
    content: LandingPageContent['hero'];
}

const HeroSection = ({ content }: HeroSectionProps) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl"
                >
                    <Image
                        src={content.backgroundIllustrationUrl}
                        alt=""
                        fill
                        className="object-contain filter blur-[80px] opacity-30"
                    />
                </motion.div>

                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#E8DCC6]/20 rounded-full blur-[150px] opacity-30" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#D6E4F0]/20 rounded-full blur-[120px] opacity-20" />
            </div >

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-16">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center px-5 py-2 bg-white/60 backdrop-blur-sm border border-gray-100 mb-10"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-brand-gold mr-2.5" />
                            <span className="text-[10px] font-bold text-brand-muted tracking-[0.2em] uppercase">{content.badge}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-brand-charcoal mb-10 leading-[1.08] tracking-tight"
                        >
                            {content.titleLine1} <br />
                            <span className="italic font-light opacity-50">{content.emphasizedTitle}</span> <br />
                            {content.titleLine3}
                        </motion.h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-[1px] bg-brand-gold mb-10"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                            className="text-lg text-brand-muted mb-12 leading-[1.8] max-w-lg font-light"
                        >
                            {content.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <Link href={content.primaryCta.href}>
                                <Button className="h-[56px] px-12 text-[15px] bg-brand-charcoal hover:bg-black text-white rounded-none shadow-lg hover:shadow-xl transition-all duration-500 tracking-wide">
                                    {content.primaryCta.label}
                                    <ArrowRight className="ml-3 h-4 w-4" />
                                </Button>
                            </Link>

                            <Link href={content.secondaryCta.href}>
                                <Button variant="ghost" className="h-[56px] px-10 text-[15px] text-brand-charcoal hover:bg-white/50 rounded-none transition-all duration-500 border border-transparent hover:border-gray-200 tracking-wide">
                                    <Play className="mr-2 h-3.5 w-3.5" />
                                    {content.secondaryCta.label}
                                </Button>
                            </Link>

                            {content.helperText ? (
                                <p className="text-xs text-brand-muted font-light mt-3 sm:mt-0 sm:self-center sm:ml-2">{content.helperText}</p>
                            ) : null}
                        </motion.div>
                    </div>

                    <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[500px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] p-2.5 border border-gray-100/80 z-20"
                        >
                            <div className="relative w-full h-full overflow-hidden bg-gray-50">
                                <Image
                                    src={content.portraitImageUrl}
                                    alt={content.portraitAlt}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/15 to-transparent" />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-20 right-4 w-44 p-5 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 z-30"
                        >
                            <div className="flex items-center gap-2.5 mb-2">
                                <div className="w-6 h-6 flex items-center justify-center text-brand-gold">
                                    <Zap size={12} className="fill-current" />
                                </div>
                                <span className="text-[9px] font-bold text-brand-muted tracking-[0.2em] uppercase">{content.floatingCard.performanceLabel}</span>
                            </div>
                            <div className="h-[2px] w-full bg-gray-100 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: content.floatingCard.performancePercent }}
                                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                                    className="h-full bg-brand-gold"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-24 left-4 w-48 p-5 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 z-30"
                        >
                            <span className="text-2xl font-serif font-medium text-brand-charcoal block mb-1">{content.floatingCard.expertiseValue}</span>
                            <p className="text-[9px] text-brand-muted uppercase tracking-[0.2em] font-bold">{content.floatingCard.expertiseLabel}</p>
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-brand-gold/[0.06] rounded-full -z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gray-200/10 rounded-full -z-10" />

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="absolute -right-20 bottom-10 w-64 h-64 z-10 hidden xl:block"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={content.backgroundIllustrationUrl}
                                    alt="Systems Visualization"
                                    fill
                                    className="object-contain shadow-2xl grayscale brightness-110"
                                />
                                <div className="absolute inset-0 bg-brand-stone/10 mix-blend-overlay" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            >
                <span className="text-[9px] font-bold text-brand-muted/40 tracking-[0.3em] uppercase">{content.scrollLabel}</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-4 h-4 text-brand-muted/30" />
                </motion.div>
            </motion.div>
        </section >
    );
};

export default HeroSection;
