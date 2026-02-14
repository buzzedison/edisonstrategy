'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import type { LandingPageContent } from '@/lib/landingPage';

interface CTASectionProps {
    content: LandingPageContent['finalCtaSection'];
}

const CTASection = ({ content }: CTASectionProps) => {
    return (
        <section className="relative py-36 px-6 lg:px-8 overflow-hidden bg-brand-charcoal text-white">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-charcoal to-brand-dark/50" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-3 mb-10"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10" />
                                ))}
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500 pl-2">{content.badge}</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 tracking-tight font-serif leading-[1.1]"
                        >
                            {content.titleLine1} <br />
                            <span className="italic text-gray-500 font-light">{content.titleLine2}</span>
                        </motion.h2>

                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 60 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="h-[1px] bg-brand-gold mb-10"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="text-[16px] text-gray-400 mb-12 leading-[1.8] max-w-xl font-light"
                        >
                            {content.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <Link href={content.primaryCta.href}>
                                <Button className="h-[56px] px-12 text-[15px] bg-white text-brand-charcoal hover:bg-brand-stone rounded-none transition-all duration-500 shadow-sm hover:shadow-xl tracking-wide">
                                    {content.primaryCta.label}
                                    <ArrowRight className="ml-3 h-4 w-4" />
                                </Button>
                            </Link>

                            <Link href={content.secondaryCta.href}>
                                <Button variant="outline" className="h-[56px] px-12 text-[15px] bg-transparent border-white/15 text-white hover:bg-white/5 rounded-none backdrop-blur-sm transition-all duration-500 tracking-wide">
                                    {content.secondaryCta.label}
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 flex flex-wrap items-center gap-6 text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600"
                        >
                            {content.checklist.map((item) => (
                                <div key={item} className="flex items-center gap-2.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-sm mx-auto flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-white/[0.04] rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-16 border border-white/[0.04] rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-32 border border-brand-gold/[0.06] rounded-full"
                            />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-gold/20 rounded-full" />
                            </motion.div>

                            <div className="text-center">
                                <div className="text-7xl font-serif font-light text-white/[0.06] tracking-widest">{content.visualYearText}</div>
                                <div className="w-8 h-[1px] bg-brand-gold/20 mx-auto mt-6 mb-4" />
                                <div className="text-[9px] font-bold text-white/15 uppercase tracking-[0.4em]">{content.visualLabel}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CTASection;
