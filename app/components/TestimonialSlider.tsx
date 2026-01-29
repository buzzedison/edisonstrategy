'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
    {
        quote: "Edison helped us clarify our vision and build a roadmap that made sense. His guidance was invaluable in securing our first round of funding.",
        name: "Sarah Johnson",
        role: "Founder, TechStartup",
        company: "TechStartup",
        image: "/image/edisonaboutnew.jpg", // Placeholder - ideally use real headshots
    },
    {
        quote: "Working with Edison transformed our business. He helped us identify our ideal market and optimize our product for maximum growth.",
        name: "Michael Chen",
        role: "CEO, GrowthSaaS",
        company: "GrowthSaaS",
        image: "/image/edisonaboutnew.jpg",
    },
    {
        quote: "The Enterprise Village partnership opened doors we never imagined. Edison's strategic thinking is unmatched.",
        name: "Amina Hassan",
        role: "Co-Founder, FinTech App",
        company: "FinTech App",
        image: "/image/edisonaboutnew.jpg",
    },
    {
        quote: "A masterclass in leadership and strategy. Every session with Edison leaves us with actionable insights.",
        name: "David Kim",
        role: "CTO, FutureScale",
        company: "FutureScale",
        image: "/image/edisonaboutnew.jpg",
    },
    {
        quote: "We were stuck at a plateau. Edison's framework helped us break through and double our revenue in 6 months.",
        name: "Elena Rodriguez",
        role: "Founder, CreativeStudio",
        company: "CreativeStudio",
        image: "/image/edisonaboutnew.jpg",
    }
];

const TestimonialSlider = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background border-y border-brand-stone/50">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-10 left-10 z-10">
                    <div className="inline-flex items-center px-4 py-1.5 bg-white border border-gray-100 text-brand-muted text-[10px] font-bold tracking-widest uppercase">
                        <Star className="w-3.5 h-3.5 text-brand-gold mr-2 fill-brand-gold" />
                        Wall of Love
                    </div>
                </div>

                <motion.div style={{ x }} className="flex gap-10 px-10">
                    {/* Intro Card */}
                    <div className="min-w-[400px] md:min-w-[600px] flex flex-col justify-center">
                        <h2 className="text-5xl md:text-6xl font-medium text-brand-charcoal font-serif tracking-tight leading-tight">
                            Trusted by <br />
                            <span className="italic text-gray-400">Visionary Founders.</span>
                        </h2>
                        <p className="mt-8 text-lg text-brand-muted max-w-md font-light leading-relaxed">
                            Join the collective of leaders who have transformed their ventures through our systemic partnership.
                        </p>
                    </div>

                    {testimonials.map((testimonial, i) => (
                        <div key={i} className="group relative h-[60vh] w-[400px] md:w-[500px] flex-shrink-0 overflow-hidden bg-white border border-gray-100 p-10 flex flex-col justify-between hover:border-gray-200 transition-all duration-500 shadow-sm hover:shadow-md">
                            <div className="relative z-10">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold opacity-50" />
                                    ))}
                                </div>
                                <p className="text-2xl md:text-2xl font-medium leading-relaxed font-serif text-brand-charcoal">
                                    "{testimonial.quote}"
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center gap-4 mt-8">
                                <div className="h-10 w-10 overflow-hidden bg-brand-stone border border-gray-100">
                                    <div className="w-full h-full bg-gray-200" />
                                </div>
                                <div>
                                    <p className="font-medium text-brand-charcoal">{testimonial.name}</p>
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* CTA Card at the end */}
                    <div className="min-w-[400px] flex items-center justify-center bg-brand-charcoal p-10 text-white text-center shadow-lg">
                        <div>
                            <h3 className="text-3xl font-medium font-serif mb-6">Build Together.</h3>
                            <p className="text-lg mb-8 text-gray-400 font-light">Ready to architect your success story?</p>
                            <button className="px-10 py-4 bg-white text-brand-charcoal font-medium rounded-none hover:bg-brand-stone transition-all">
                                Get Started
                            </button>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialSlider;
