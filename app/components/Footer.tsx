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
    <footer className="bg-background border-t border-gray-100 pt-36 pb-12 relative overflow-hidden">
      {/* Sublte top gold accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[1px] bg-brand-gold/30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-28">

          {/* Section 1: Brand Strategy */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <Link href="/" className="inline-block group mb-10">
                <span className="text-4xl font-serif font-bold tracking-tight text-brand-charcoal group-hover:opacity-80 transition-opacity duration-500">
                  BuzzEdison<span className="text-brand-gold">.</span>
                </span>
              </Link>
              <p className="text-[16px] text-brand-muted font-light leading-[1.9] max-w-md">
                Practical support for founders and teams. I help you build <span className="text-brand-charcoal font-medium">systems that scale</span>, websites that convert, and mobile apps people use.
              </p>
            </div>

            {/* Gold accent */}
            <div className="w-12 h-[1px] bg-brand-gold/40" />

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal">Where I Work</h4>
                <p className="text-[14px] text-brand-muted font-light flex items-start gap-2.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                  Remote-First. <br />HQ: Accra, Ghana.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal">Email</h4>
                <p className="text-[14px] text-brand-muted font-light flex items-start gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                  ask@buzzedison.com
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              {[
                { icon: <Twitter className="w-4 h-4" />, url: 'https://twitter.com/buzzedison', label: 'Twitter' },
                { icon: <Linkedin className="w-4 h-4" />, url: 'https://linkedin.com/in/buzzedison', label: 'LinkedIn' },
                { icon: <Instagram className="w-4 h-4" />, url: 'https://instagram.com/buzzedison', label: 'Instagram' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 flex items-center justify-center bg-brand-stone/30 text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all duration-700 border border-transparent hover:shadow-xl hover:shadow-brand-charcoal/5"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Core Frameworks */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal border-b border-gray-100 pb-5">Explore</h3>
            <ul className="space-y-6">
              {['Services', 'Portfolio', 'Ventures', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-brand-muted hover:text-brand-charcoal transition-all duration-500 text-[14px] font-light flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-500">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: The Library */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal border-b border-gray-100 pb-5">Learn</h3>
            <ul className="space-y-6">
              {[
                { name: 'Articles', path: '/insights' },
                { name: 'Services', path: '/services' },
                { name: 'Books', path: '/books' },
                { name: 'Resources', path: '/tools/pricing' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-brand-muted hover:text-brand-charcoal transition-all duration-500 text-[14px] font-light flex items-center group"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-500">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Direct Engagement */}
          <div className="lg:col-span-3 space-y-10">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal border-b border-gray-100 pb-5">Start Here</h3>
            <div className="space-y-8">
              <div className="p-8 bg-brand-stone/20 border border-gray-100/50 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-700 group cursor-pointer">
                <Sparkles className="w-5 h-5 text-brand-gold mb-5 group-hover:rotate-12 transition-transform duration-500" />
                <p className="text-[14px] text-brand-muted mb-6 font-light leading-[1.8]">
                  &ldquo;If growth feels messy, we can fix it with a clear plan and better systems.&rdquo;
                </p>
                <div className="w-8 h-[1px] bg-brand-gold/30 mb-5" />
                <Link href="/contact" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-charcoal hover:text-brand-gold transition-colors duration-500">
                  Book Free Call <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex items-center gap-3 pl-2">
                <div className="w-1.5 h-1.5 bg-green-500 animate-pulse rounded-full" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-muted">Now Booking New Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-muted/40">
            <span>&copy; {currentYear} BuzzEdison</span>
            <span className="hidden md:inline w-1 h-1 bg-brand-gold/20 rounded-full" />
            <span className="text-brand-muted/30">Growth Strategy, Web, and Mobile</span>
          </div>

          <div className="flex items-center gap-12">
            <Link href="/privacy" className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted/40 hover:text-brand-charcoal transition-colors duration-500">Privacy Policy</Link>
            <Link href="/terms" className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted/40 hover:text-brand-charcoal transition-colors duration-500">Client Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
