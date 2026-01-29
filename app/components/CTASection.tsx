'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const CTASection = () => {
    return (
        <section className="relative py-32 px-6 lg:px-8 overflow-hidden bg-brand-charcoal text-white">
            {/* Background Texture - Minimalist */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-charcoal to-brand-dark/50" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-2 mb-8"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-white/20" />
                                ))}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-2">Join the Collective</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 tracking-tight font-serif leading-tight"
                        >
                            Build Your <br />
                            <span className="italic text-gray-400 font-light">Success Story.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl font-light"
                        >
                            Whether you're starting fresh or ready to grow,
                            I give you the tools and plan you need to succeed with confidence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <Link href="/contact">
                                <Button className="h-14 px-10 text-lg bg-white text-brand-charcoal hover:bg-brand-stone rounded-none transition-all duration-300 shadow-sm hover:shadow-lg">
                                    Work With Me
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>

                            <Link href="/subscribe">
                                <Button variant="outline" className="h-14 px-10 text-lg bg-transparent border-white/20 text-white hover:bg-white/5 rounded-none backdrop-blur-sm transition-colors">
                                    Get Updates
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                                <span>No Spam</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                                <span>Pure Value</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual/Abstract Element - Refined */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-sm mx-auto flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-white/5 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-16 border border-white/5 rounded-full"
                            />

                            <div className="text-center">
                                <div className="text-7xl font-serif font-light text-white/10">MMXXVI</div>
                                <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-4">Business Growth</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CTASection;
