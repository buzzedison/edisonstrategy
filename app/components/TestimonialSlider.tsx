'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Star, Quote } from 'lucide-react';
import type { LandingPageContent } from '@/lib/landingPage';

interface TestimonialSliderProps {
    content: LandingPageContent['testimonialsSection'];
}

const TestimonialSlider = ({ content }: TestimonialSliderProps) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[1px] bg-brand-gold/30 z-10" />

            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-12 left-12 z-10">
                    <div className="inline-flex items-center px-5 py-2 bg-white/80 backdrop-blur-sm border border-gray-100 text-brand-muted text-[9px] font-bold tracking-[0.25em] uppercase">
                        <Star className="w-3 h-3 text-brand-gold mr-2.5 fill-brand-gold" />
                        {content.badge}
                    </div>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-12">
                    <div className="min-w-[400px] md:min-w-[550px] flex flex-col justify-center">
                        <h2 className="text-5xl md:text-6xl font-medium text-brand-charcoal font-serif tracking-tight leading-[1.1]">
                            {content.introTitle} <br />
                            <span className="italic text-gray-400">{content.emphasizedTitle}</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-brand-gold mt-10 mb-8" />
                        <p className="text-[16px] text-brand-muted max-w-md font-light leading-[1.8]">
                            {content.description}
                        </p>
                    </div>

                    {content.testimonials.map((testimonial, i) => (
                        <div key={`${testimonial.name}-${i}`} className="group relative h-[55vh] w-[400px] md:w-[480px] flex-shrink-0 overflow-hidden bg-white border border-gray-100/60 p-12 flex flex-col justify-between hover:border-gray-200/80 transition-all duration-700 shadow-[0_2px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                            <div className="absolute top-8 right-10 text-brand-gold/[0.08]">
                                <Quote className="w-16 h-16" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <Star key={starIndex} className="w-3.5 h-3.5 text-brand-gold fill-brand-gold opacity-40" />
                                    ))}
                                </div>
                                <div className="w-8 h-[1px] bg-brand-gold/40 mb-8" />
                                <p className="text-xl md:text-[22px] font-medium leading-[1.6] font-serif text-brand-charcoal">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center gap-4 mt-10">
                                <div className="h-11 w-11 overflow-hidden bg-brand-stone border border-gray-100 flex items-center justify-center">
                                    <span className="text-[13px] font-bold text-brand-charcoal">{testimonial.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-brand-charcoal text-[15px]">{testimonial.name}</p>
                                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-muted">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="min-w-[400px] flex items-center justify-center bg-brand-charcoal p-12 text-white text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
                        <div>
                            <div className="w-10 h-[1px] bg-brand-gold mx-auto mb-8" />
                            <h3 className="text-3xl font-medium font-serif mb-6 tracking-tight">{content.endingCard.title}</h3>
                            <p className="text-[15px] mb-10 text-gray-400 font-light leading-[1.7]">{content.endingCard.description}</p>
                            <Link href={content.endingCard.cta.href} className="inline-block px-12 py-4 bg-white text-brand-charcoal font-medium rounded-none hover:bg-brand-stone transition-all duration-500 text-[14px] tracking-wide">
                                {content.endingCard.cta.label}
                            </Link>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialSlider;
