"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Sparkles, Target, Zap, Users, Shield, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const VentureCard = ({
    title,
    role,
    description,
    link,
    icon: Icon,
    index,
    tags
}: {
    title: string;
    role: string;
    description: string;
    link: string;
    icon: any;
    index: number;
    tags: string[];
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
                <div className="flex justify-between items-start mb-12">
                    <div className="w-20 h-20 bg-brand-stone/30 flex items-center justify-center text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-white transition-all duration-700">
                        <Icon className="w-10 h-10" />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end">
                        {tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold bg-brand-stone/50 px-3 py-1">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-4">{role}</div>
                    <h3 className="text-4xl font-serif font-bold text-brand-charcoal mb-6 group-hover:text-brand-gold transition-colors">{title}</h3>
                    <p className="text-lg text-brand-muted font-light leading-relaxed">{description}</p>
                </div>

                <div className="mt-auto">
                    <Link
                        href={link}
                        target="_blank"
                        className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-all group/link"
                    >
                        Explore Project <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default function VenturesPage() {
    const ventures = [
        {
            title: "Crowdpen",
            role: "Co-Founder",
            description: "A platform that helps founders and creators build, grow, and earn from their ideas.",
            link: "https://crowdpen.co",
            icon: Zap,
            tags: ["Scale", "Monetization", "Startup"]
        },
        {
            title: "Bloop Global",
            role: "Lead Strategist",
            description: "A digital agency building websites and mobile apps that are fast, useful, and built to grow.",
            link: "https://bloopglobal.com",
            icon: Globe,
            tags: ["Engineering", "Digital", "Advisory"]
        },
        {
            title: "Taskwit",
            role: "Executive Director",
            description: "Bridging the gap between leadership and digital proficiency through targeted skills training and professional development.",
            link: "https://taskwit.co",
            icon: Users,
            tags: ["Skills", "Leadership", "Talent"]
        },
        {
            title: "African Recovery",
            role: "Executive Director",
            description: "Supporting leaders through mentorship, leadership development, and practical growth programs.",
            link: "https://africanrecovery.org",
            icon: Shield,
            tags: ["Impact", "Mentorship", "Africa"]
        },
        {
            title: "The Enterprise Village",
            role: "Managing Partner",
            description: "A startup hub helping founders with space, support, and structure to launch and grow.",
            link: "https://enterprisevillage.com", // Assuming domain based on context
            icon: Target,
            tags: ["Infrastructure", "Ecosystem", "Ghana"]
        },
        {
            title: "Souled Out",
            role: "Convener",
            description: "A community focused on purpose, growth, and leadership.",
            link: "#", // Direct contact or specific subpage later
            icon: Heart,
            tags: ["Ministry", "Purpose", "Growth"]
        }
    ];

    return (
        <div className="bg-background min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
            {/* Hero Section */}
            <section className="pt-40 pb-32 px-6 lg:px-8 relative overflow-hidden bg-background">
                {/* Background Textures */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />

                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-stone/20 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* Decorative Illustration Element */}
                <div className="absolute -bottom-24 -left-20 w-96 h-96 opacity-10 pointer-events-none">
                    <Image
                        src="/image/systems-illustration.png"
                        alt=""
                        fill
                        className="object-contain grayscale"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-12"
                        >
                            <Sparkles className="h-3.5 w-3.5 mr-2 text-brand-gold" />
                            Projects and Ventures
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-serif font-medium text-brand-charcoal tracking-tight leading-[1.1] mb-12"
                        >
                            Ventures I Build <br />
                            <span className="text-gray-400 italic">and Support.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-2xl md:text-3xl text-brand-muted font-light leading-relaxed max-w-3xl mb-16"
                        >
                            I build and support ventures that solve real problems through strategy, technology, and execution.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Ventures Grid */}
            <section className="py-24 px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        {ventures.map((venture, index) => (
                            <VentureCard key={venture.title} {...venture} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Narrative Section */}
            <section className="py-40 px-6 lg:px-8 bg-background border-y border-brand-stone/50">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif italic text-brand-charcoal/80 leading-tight mb-16">
                            "Real leadership is helping people do better work with better systems."
                        </h2>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-[1px] bg-brand-gold mb-6" />
                            <p className="text-brand-charcoal font-bold uppercase tracking-[0.4em] text-[10px]">Built for Growth</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Partnership CTA */}
            <section className="py-40 px-6 lg:px-8 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-brand-charcoal p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tight">Want to Build <br /> <span className="text-brand-gold italic">Something Great?</span></h2>
                            <p className="text-xl text-white/60 font-light leading-relaxed mb-12">
                                I am open to working with founders, teams, and partners building meaningful products.
                            </p>

                            <Link href="/contact" className="inline-flex items-center gap-4 bg-brand-gold hover:bg-white text-brand-charcoal px-16 py-8 rounded-none text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                Book a Call
                                <ArrowUpRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
