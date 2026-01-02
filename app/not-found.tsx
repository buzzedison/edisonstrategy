'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, BookOpen, Mail, Sparkles, Compass } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-stone/30 flex items-center justify-center p-6 selection:bg-brand-gold/20">
      {/* Background Micro-details */}
      <div className="absolute inset-0 bg-grid-brand-charcoal/[0.02] bg-[length:40px_40px]"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-white border border-gray-100 rounded-full text-[10px] font-bold tracking-widest text-brand-muted uppercase">
            <Sparkles className="h-3.5 w-3.5 mr-2 text-brand-gold" />
            Strategic Deviation
          </div>

          <div className="relative">
            <h1 className="text-[12rem] md:text-[16rem] font-serif font-medium text-brand-charcoal/5 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="h-16 w-16 text-brand-charcoal/10 animate-pulse-subtle" />
            </div>
          </div>

          <div className="space-y-6 -mt-12">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-brand-charcoal tracking-tight">
              Uncharted Territory.
            </h2>
            <p className="text-xl text-brand-muted font-light max-w-xl mx-auto leading-relaxed">
              The directive you're seeking has either been moved or never existed within this framework. Let's redirect your focus.
            </p>
          </div>

          {/* Strategic Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 max-w-xl mx-auto">
            <Link href="/" className="group">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-brand-stone rounded-xl flex items-center justify-center text-brand-charcoal">
                    <Home className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand-charcoal/20 group-hover:text-brand-charcoal group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif font-bold text-brand-charcoal mb-1">Base Command</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Return to Home</p>
              </div>
            </Link>

            <Link href="/insights" className="group">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-brand-stone rounded-xl flex items-center justify-center text-brand-charcoal">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand-charcoal/20 group-hover:text-brand-charcoal group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif font-bold text-brand-charcoal mb-1">Strategic Library</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Insights & Analysis</p>
              </div>
            </Link>
          </div>

          <div className="pt-12 border-t border-gray-100 mt-12">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-6">Need Direct Counsel?</p>
            <Link href="/contact">
              <Button className="h-12 px-8 bg-brand-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-sm">
                Initiate Dialogue
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Brand Signifier */}
        <div className="mt-24 opacity-20">
          <span className="text-sm font-serif italic text-brand-charcoal">BuzzEdison.</span>
        </div>
      </div>
    </div>
  );
}
