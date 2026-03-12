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
            <div className="absolute inset-0 z-0 bg-white" />


            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-16">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-8"
                        >
                            <span className="text-[10px] font-bold text-brand-gold tracking-[0.2em] uppercase">{content.badge}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="text-6xl md:text-7xl font-serif font-medium text-brand-charcoal mb-8 leading-[1.05] tracking-tight"
                        >
                            {content.titleLine1} <br />
                            <span className="italic text-brand-muted">{content.emphasizedTitle}</span> <br />
                            {content.titleLine3}
                        </motion.h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 60 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-[1px] bg-brand-charcoal mb-10"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                            className="text-xl text-brand-charcoal mb-12 leading-relaxed max-w-lg font-light"
                        >
                            {content.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-8 items-center"
                        >
                            <Link href={content.primaryCta.href}>
                                <Button className="h-[56px] px-14 text-[16px] bg-brand-charcoal hover:bg-black text-white rounded-none transition-all duration-500 tracking-wide">
                                    {content.primaryCta.label}
                                    <ArrowRight className="ml-3 h-4 w-4" />
                                </Button>
                            </Link>

                            <Link href={content.secondaryCta.href} className="text-[15px] font-medium text-brand-charcoal border-b border-brand-charcoal pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
                                {content.secondaryCta.label}
                            </Link>
                        </motion.div>
                    </div>

                    <div className="relative h-[600px] w-full hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute top-1/2 right-0 -translate-y-1/2 w-[420px] h-[520px]"
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src={content.portraitImageUrl}
                                    alt={content.portraitAlt}
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    priority
                                />
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
