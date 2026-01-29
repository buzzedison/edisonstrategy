'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background pt-20">
            {/* Ambient Background - Refined with Grid and Illustration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-multiply" />

                {/* Decorative Illustration Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl"
                >
                    <Image
                        src="/image/systems-illustration.png"
                        alt=""
                        fill
                        className="object-contain filter blur-[60px] opacity-40"
                    />
                </motion.div>

                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#E8DCC6]/30 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#D6E4F0]/30 rounded-full blur-[100px] opacity-30" />
            </div >

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content - Refined & SEO-Forward */}
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center px-4 py-1.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 mb-8"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-brand-gold mr-2" />
                            <span className="text-xs font-semibold text-brand-muted tracking-widest uppercase">Business & AI Strategy</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-brand-charcoal mb-8 leading-[1.1] tracking-tight"
                        >
                            Build a Business <br />
                            <span className="italic font-light opacity-60">That Scales</span> <br />
                            with Smart Systems.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-xl text-brand-muted mb-10 leading-relaxed max-w-lg font-light"
                        >
                            I show founders how to use AI and better systems to grow faster,
                            save time, and build something that lasts.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <Link href="/tools/pitch-deck">
                                <Button className="h-14 px-10 text-lg bg-brand-charcoal hover:bg-black text-white rounded-none shadow-lg hover:shadow-xl transition-all duration-300">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>

                            <Link href="/vision">
                                <Button variant="ghost" className="h-14 px-8 text-lg text-brand-charcoal hover:bg-white/50 rounded-none transition-all duration-300 border border-transparent hover:border-gray-200">
                                    View Our Vision
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Content - Elegant Composition */}
                    <div className="relative h-[550px] w-full hidden lg:block perspective-1000">
                        {/* Main Portrait Card - Refined */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[480px] bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] p-2.5 border border-white/60 backdrop-blur-sm z-20"
                        >
                            <div className="relative w-full h-full overflow-hidden bg-gray-50">
                                <Image
                                    src="/image/edisonaboutnew.jpg"
                                    alt="Edison Ade - Business & AI Strategist"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 to-transparent" />
                            </div>
                        </motion.div>

                        {/* Minimalist Floating Stats */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-24 right-4 w-44 p-4 bg-white/90 backdrop-blur-md shadow-sm border border-gray-100 z-30"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <div className="w-6 h-6 rounded-full bg-brand-dark/5 flex items-center justify-center text-brand-dark">
                                    <Zap size={12} className="fill-current" />
                                </div>
                                <span className="text-[10px] font-bold text-brand-muted tracking-widest uppercase">Performance</span>
                            </div>
                            <div className="h-1 w-full bg-gray-100 overflow-hidden">
                                <div className="h-full w-4/5 bg-brand-gold" />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-28 left-4 w-48 p-4 bg-white/90 backdrop-blur-md shadow-sm border border-gray-100 z-30"
                        >
                            <span className="text-2xl font-serif font-medium text-brand-charcoal block mb-0.5">15+ Years</span>
                            <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">Domain Expertise</p>
                        </motion.div>

                        {/* Abstract Decorative Rings - Faded */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-brand-gold/10 rounded-full -z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gray-200/20 rounded-full -z-10" />

                        {/* Secondary Illustration for Visual Richness */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="absolute -right-20 bottom-10 w-64 h-64 z-10 hidden xl:block"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/image/systems-illustration.png"
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
        </section >
    );
};

export default HeroSection;
