'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Book, Star, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

const books = [
    {
        title: "Write Without Limits",
        description: "100 Tips for Transforming Ideas into Bestselling Books. Master the psychological triggers and proven formulas that make readers addicted to your writing.",
        image: "/image/writewithout.png",
        link: "/books/writershandbook",
        buyLink: "https://paystack.com/buy/write-without-limits-ebook",
        rating: 4.9,
        category: "Writing & Publishing",
        isNew: true,
    },
    {
        title: "Pricing Strategy",
        description: "Master the art of pricing to boost your business success. Dive into various pricing models, strategies, and customer psychology.",
        image: "/image/pricingbook.webp",
        link: "/books/pricing",
        buyLink: "https://buzzedison.gumroad.com/l/pricingstrategy",
        rating: 4.8,
        category: "Business Strategy",
    },
    {
        title: "The Art of Inversion",
        description: "Discover how to solve problems by approaching them backwards. Learn to think differently and find innovative solutions.",
        image: "/image/inversion.png",
        link: "/books/inversion",
        buyLink: "https://buzzedison.gumroad.com/l/inversion",
        rating: 4.6,
        category: "Problem Solving",
    },
];

const BooksSection = () => {
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
                        <Book className="w-4 h-4 text-brand-gold mr-2" />
                        <span className="text-[10px] font-bold tracking-widest text-brand-muted uppercase">Publications & Books</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-medium text-brand-charcoal mb-6 font-serif tracking-tight"
                    >
                        Strategic <span className="italic text-gray-400">Library</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-brand-muted leading-relaxed font-light"
                    >
                        Deep-dive guides designed to help you master new skills,
                        structure your thinking, and build a lasting business.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {books.map((book, idx) => (
                        <motion.div
                            key={book.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {book.isNew && (
                                    <div className="absolute top-6 left-6 bg-brand-charcoal text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                        New Release
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            <div className="p-10 flex-grow flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                                        {book.category}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-brand-gold">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-xs font-bold">{book.rating}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-medium text-brand-charcoal mb-4 font-serif leading-tight">
                                    {book.title}
                                </h3>

                                <p className="text-brand-muted font-light text-sm leading-relaxed mb-8 line-clamp-3">
                                    {book.description}
                                </p>

                                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center gap-4">
                                    <Link href={book.link} className="flex-1">
                                        <Button variant="outline" className="w-full rounded-full border-gray-200 hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-300">
                                            Explore
                                        </Button>
                                    </Link>
                                    <Link href={book.buyLink} className="flex-1">
                                        <Button className="w-full bg-brand-charcoal hover:bg-black text-white rounded-full transition-all duration-300">
                                            Buy Now
                                            <ExternalLink className="ml-2 w-3.5 h-3.5" />
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
