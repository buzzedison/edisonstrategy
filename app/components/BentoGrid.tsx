'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Dumbbell, Wallet, Brain, Sparkles, Layers, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const BentoGrid = () => {
    return (
        <section className="py-32 px-6 lg:px-8 bg-brand-stone/30">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-6"
                    >
                        <Layers className="w-4 h-4 text-brand-gold mr-2" />
                        <span className="text-[10px] font-bold tracking-widest text-brand-muted uppercase">Frameworks & Tools</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-medium text-brand-charcoal mb-6 font-serif tracking-tight"
                    >
                        Tools to <span className="italic text-gray-400">Build</span> Your Business
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-brand-muted leading-relaxed font-light"
                    >
                        Free tools and systems to help you grow your business,
                        save time, and make better decisions.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)]">

                    {/* Large Card - Pitch Deck */}
                    <Link href="/tools/pitch-deck" className="md:col-span-2 lg:col-span-2 row-span-2">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative h-full overflow-hidden rounded-[2.5rem] bg-white p-10 transition-all duration-500 border border-gray-100/80 shadow-sm hover:shadow-xl"
                        >
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-charcoal text-white transition-opacity group-hover:opacity-90">
                                        <FileText className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-4 text-3xl font-medium text-brand-charcoal font-serif">Pitch Deck Generator</h3>
                                    <p className="max-w-md text-lg text-brand-muted leading-relaxed font-light">
                                        Create a pitch deck that gets you funded. Built on intelligent frameworks that help you tell a compelling story.
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-4">
                                    <span className="rounded-full bg-brand-stone/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-muted border border-gray-100">Smart Systems</span>
                                    <span className="rounded-full bg-brand-stone/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-muted border border-gray-100">Pro Frameworks</span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Tall Card - Fitness */}
                    <Link href="/tools/fitness" className="md:col-span-1 lg:col-span-1 row-span-2">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative h-full overflow-hidden rounded-[2.5rem] bg-brand-charcoal p-8 transition-all duration-500 shadow-sm hover:shadow-xl"
                        >
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="mb-auto">
                                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-stone/10 text-brand-stone group-hover:bg-brand-stone/20 transition-colors">
                                        <Dumbbell className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-medium text-white font-serif">Founder Fitness</h3>
                                    <p className="text-gray-400 font-light leading-relaxed">Stay fit and sharp with a workout plan built for busy founders.</p>
                                </div>

                                <div className="mt-8 space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-brand-gold/50" />
                                            <div className="h-1 w-24 rounded-full bg-white/10" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Standard Card - Finance */}
                    <Link href="/tools/finance" className="md:col-span-1 lg:col-span-1">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative h-full overflow-hidden rounded-[2.5rem] bg-white p-8 transition-all duration-500 border border-gray-100/80 shadow-sm hover:shadow-xl"
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-stone border border-gray-100 text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-white transition-all">
                                <Wallet className="h-5 w-5" />
                            </div>
                            <h3 className="mb-2 text-xl font-medium text-brand-charcoal font-serif">Money & Runway</h3>
                            <p className="text-sm text-brand-muted font-light">See how long your cash will last.</p>
                        </motion.div>
                    </Link>

                    {/* Standard Card - AI */}
                    <Link href="/insights?tag=ai" className="md:col-span-1 lg:col-span-1">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative h-full overflow-hidden rounded-[2.5rem] bg-white p-8 transition-all duration-500 border border-gray-100/80 shadow-sm hover:shadow-xl"
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-stone border border-gray-100 text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-white transition-all">
                                <Brain className="h-5 w-5" />
                            </div>
                            <h3 className="mb-2 text-xl font-medium text-brand-charcoal font-serif">AI Strategy</h3>
                            <p className="text-sm text-brand-muted font-light">Do more with less using AI.</p>
                        </motion.div>
                    </Link>

                    {/* Wide Card - More Resources */}
                    <Link href="/resources" className="md:col-span-2 lg:col-span-2">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group relative h-full overflow-hidden rounded-[2.5rem] bg-brand-charcoal p-8 transition-all duration-500 shadow-sm hover:shadow-xl text-white"
                        >
                            <div className="relative z-10 flex items-center justify-between h-full">
                                <div>
                                    <h3 className="mb-2 text-2xl font-medium font-serif">Learning Center</h3>
                                    <p className="text-gray-400 font-light">Bite-sized guides to help you scale.</p>
                                </div>
                                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
