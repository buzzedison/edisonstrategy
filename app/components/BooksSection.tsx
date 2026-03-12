'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Book, Star, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { LandingPageContent } from '@/lib/landingPage';

interface BooksSectionProps {
    content: LandingPageContent['booksSection'];
}

const BooksSection = ({ content }: BooksSectionProps) => {
    return (
        <section className="py-24 px-6 lg:px-8 bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase">{content.badge}</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-medium text-brand-charcoal mb-6 font-serif tracking-tight mt-4"
                    >
                        {content.title} <span className="italic text-gray-400">{content.emphasizedTitle}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-[16px] text-brand-muted leading-[1.8] font-light"
                    >
                        {content.description}
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-14">
                    {content.books.map((book, idx) => (
                        <motion.div
                            key={`${book.title}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="group flex flex-col h-full bg-white border border-gray-100/50 shadow-sm rounded-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={book.imageUrl}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {book.isNew && (
                                    <div className="absolute top-6 left-6 bg-brand-charcoal text-white px-4 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase">
                                        {content.newBadgeLabel}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                            </div>

                            <div className="p-10 flex-grow flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em]">
                                        {book.category}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-brand-gold">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-xs font-bold">
                                            {typeof book.rating === 'number' ? book.rating.toFixed(1) : '-'}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-8 h-[1px] bg-brand-gold/40 mb-5" />

                                <h3 className="text-2xl font-medium text-brand-charcoal mb-5 font-serif leading-tight tracking-tight">
                                    {book.title}
                                </h3>

                                <p className="text-brand-muted font-light text-[14px] leading-[1.8] mb-8 line-clamp-3">
                                    {book.description}
                                </p>

                                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center gap-4">
                                    <Link href={book.detailLink} className="flex-1">
                                        <Button variant="outline" className="w-full rounded-none border-gray-200 hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-500 text-[13px] tracking-wide">
                                            {content.exploreButtonLabel}
                                        </Button>
                                    </Link>
                                    <Link href={book.buyLink} className="flex-1">
                                        <Button className="w-full bg-brand-charcoal hover:bg-black text-white rounded-none transition-all duration-500 text-[13px] tracking-wide">
                                            {content.buyButtonLabel}
                                            <ExternalLink className="ml-2 w-3 h-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BooksSection;
