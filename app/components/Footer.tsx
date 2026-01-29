"use client";

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Youtube, Mail, ArrowUpRight, Sparkles, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Suppress global footer on specialized pages (matching Navbar logic)
  const isSpecializedPage = pathname.startsWith('/insights') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/bookmarks') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/books') ||
    pathname.startsWith('/tools');

  if (isSpecializedPage) return null;

  return (
    <footer className="bg-background border-t border-brand-stone/50 pt-32 pb-12 relative overflow-hidden">
      {/* Sublte top pattern/texture */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">

          {/* Section 1: Brand Strategy */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <Link href="/" className="inline-block group mb-8">
                <span className="text-4xl font-serif font-bold tracking-tight text-brand-charcoal group-hover:opacity-80 transition-opacity">
                  BuzzEdison<span className="text-brand-gold">.</span>
                </span>
              </Link>
              <p className="text-xl text-brand-muted font-light leading-relaxed max-w-md">
                Strategic counsel for founders and high-impact leaders. We build <span className="text-brand-charcoal font-medium">systems that scale</span> and strategies that endure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal">Global Presence</h4>
                <p className="text-sm text-brand-muted font-light flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  Remote-First. <br />HQ: Accra, Ghana.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal">Direct Line</h4>
                <p className="text-sm text-brand-muted font-light flex items-start gap-2">
                  <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  ask@buzzedison.com
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                { icon: <Twitter className="w-4 h-4" />, url: 'https://twitter.com/buzzedison', label: 'Twitter' },
                { icon: <Linkedin className="w-4 h-4" />, url: 'https://linkedin.com/in/buzzedison', label: 'LinkedIn' },
                { icon: <Instagram className="w-4 h-4" />, url: 'https://instagram.com/buzzedison', label: 'Instagram' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 flex items-center justify-center bg-brand-stone/30 text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-500 border border-transparent hover:shadow-xl hover:shadow-brand-charcoal/10"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Core Frameworks */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-charcoal border-b border-brand-stone pb-4">Anchors</h3>
            <ul className="space-y-5">
              {['Services', 'Portfolio', 'Ventures', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-brand-muted hover:text-brand-charcoal transition-all text-[15px] font-light flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: The Library */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-charcoal border-b border-brand-stone pb-4">Library</h3>
            <ul className="space-y-5">
              {[
                { name: 'Articles', path: '/insights' },
                { name: 'Frameworks', path: '/services' },
                { name: 'Books', path: '/books' },
                { name: 'Resources', path: '/tools/pricing' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-brand-muted hover:text-brand-charcoal transition-all text-[15px] font-light flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Direct Engagement */}
          <div className="lg:col-span-3 space-y-10">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-charcoal border-b border-brand-stone pb-4">Directives</h3>
            <div className="space-y-8">
              <div className="p-8 bg-brand-stone/30 border border-brand-stone/50 hover:bg-background hover:shadow-2xl hover:shadow-brand-charcoal/5 transition-all duration-700 group cursor-pointer">
                <Sparkles className="w-6 h-6 text-brand-gold mb-4 group-hover:rotate-12 transition-transform" />
                <p className="text-sm text-brand-muted mb-6 font-light leading-relaxed">
                  "Strategy without systems is just a hallucination. Let's build something real."
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors">
                  Inquire Now <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center gap-3 pl-2">
                <div className="w-2 h-2 bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Available for Consultation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted/50">
            <span>&copy; {currentYear} BuzzEdison</span>
            <span className="hidden md:inline w-1 h-1 bg-brand-stone rounded-full" />
            <span className="text-brand-stone">Strategic Systems Engineering</span>
          </div>

          <div className="flex items-center gap-12">
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60 hover:text-brand-charcoal transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60 hover:text-brand-charcoal transition-colors">Client Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;