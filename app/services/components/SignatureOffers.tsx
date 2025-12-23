"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Rocket, Code, ChartLine, Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface OfferProps {
  icon: React.ReactNode;
  title: string;
  forText: string;
  duration: string;
  includes: string[];
  outcome: string;
  index: number;
}

const OfferCard: React.FC<OfferProps> = ({
  icon,
  title,
  forText,
  duration,
  includes,
  outcome,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white border border-gray-100 p-8 rounded-[2.5rem] hover:shadow-2xl hover:shadow-brand-charcoal/5 transition-all duration-700 flex flex-col h-full"
    >
      <div className="mb-8 flex justify-between items-start">
        <div className="w-14 h-14 rounded-2xl bg-brand-stone/30 flex items-center justify-center text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted/50 mb-1">{duration}</div>
          <div className="text-xl font-serif font-bold text-brand-charcoal">Custom Quote</div>
        </div>
      </div>

      <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-3">{title}</h3>
      <p className="text-sm text-brand-muted font-light mb-8 leading-relaxed">
        <span className="font-medium text-brand-charcoal/70">Ideal for:</span> {forText}
      </p>

      <div className="space-y-4 mb-10 flex-grow">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 mb-4">Core Deliverables</h4>
        <ul className="space-y-3">
          {includes.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-1 w-4 h-4 rounded-full bg-brand-stone/50 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-brand-charcoal" />
              </div>
              <span className="text-sm text-brand-muted font-light leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-8 border-t border-gray-50 mt-auto">
        <div className="mb-8">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 mb-2">Strategic ROI</h4>
          <p className="text-sm text-brand-charcoal italic font-serif leading-relaxed">"{outcome}"</p>
        </div>

        <Link href="/contact" className="w-full inline-flex items-center justify-center gap-2 bg-brand-stone/30 hover:bg-brand-charcoal hover:text-white text-brand-charcoal py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all duration-500 group/btn">
          Inquire for Details <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const SignatureOffers: React.FC = () => {
  const offers = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Accelerator Sprint",
      forText: "Founders and experts needing to validate a high-impact concept rapidly.",
      duration: "4 Week Intensive",
      includes: [
        "Business Model Validation",
        "Crystal Market Positioning",
        "Go-to-Market Roadmap",
        "Strategic Priority Support"
      ],
      outcome: "Raw ideas transformed into a validated path for revenue.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "MVP Builder",
      forText: "Non-technical visionaries ready to launch and iterate on a digital product.",
      duration: "Typical 8 Week Build",
      includes: [
        "Full Tech Architecture",
        "Lean Product Development",
        "Market Launch Support",
        "Post-Launch Iteration"
      ],
      outcome: "A market-ready platform designed for early-stage scalability.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Strategy Partner",
      forText: "Mission-driven leaders seeking long-term fractional COO/CTO guidance.",
      duration: "Quarterly Retainer",
      includes: [
        "Weekly Strategy Sessions",
        "GTM Execution Co-Pilot",
        "Custom Revenue Systems",
        "Performance Dashboards"
      ],
      outcome: "A robust, scalable organization with engineering-grade strategy.",
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 rounded-full text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-8">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-brand-gold" />
              Direct Engagement
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-charcoal tracking-tight leading-tight">
              Strategic <br />
              <span className="text-gray-400">Partnerships.</span>
            </h2>
          </div>
          <p className="text-xl text-brand-muted font-light max-w-sm leading-relaxed mb-4">
            High-leverage support designed to move the needle with precision and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureOffers;