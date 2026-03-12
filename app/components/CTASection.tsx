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
        <section className="relative py-32 px-6 lg:px-8 bg-brand-charcoal text-white">

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
                            className="text-5xl md:text-7xl font-sans font-medium mb-6 tracking-tight leading-[1.05]"
                        >
                            {content.titleLine1} <br />
                            <span className="font-serif italic text-white/50">{content.titleLine2}</span>
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
                            className="text-xl text-gray-400 mb-12 leading-relaxed max-w-xl font-light"
                        >
                            {content.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            className="flex flex-col sm:flex-row gap-8 items-center"
                        >
                            <Link href={content.primaryCta.href}>
                                <Button className="h-[56px] px-14 text-[16px] bg-white text-brand-charcoal hover:bg-gray-200 rounded-none transition-all duration-300 tracking-wide">
                                    {content.primaryCta.label}
                                    <ArrowRight className="ml-3 h-4 w-4" />
                                </Button>
                            </Link>

                            <Link href={content.secondaryCta.href} className="text-[15px] font-medium text-white border-b border-white pb-1 hover:text-white/70 hover:border-white/70 transition-colors">
                                {content.secondaryCta.label}
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

                    <div className="hidden lg:flex flex-col items-center justify-center opacity-40">
                        <div className="text-[140px] font-serif font-light text-white tracking-widest leading-none">
                            {content.visualYearText}
                        </div>
                        <div className="text-[12px] font-bold text-white uppercase tracking-[0.5em] mt-4">
                            {content.visualLabel}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CTASection;
