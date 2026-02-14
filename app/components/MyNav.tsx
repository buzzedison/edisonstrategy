"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Services',
    path: '/services',
    submenu: [
      { name: 'Growth Strategy', path: '/services' },
      { name: 'Website Development', path: '/services/webdev' },
      { name: 'Mobile App Development', path: '/development' },
      { name: 'Founder Coaching', path: '/coaching' },
    ]
  },
  {
    name: 'Insights',
    path: '/insights',
    submenu: [
      { name: 'Latest Insights', path: '/insights' },
      { name: 'Books', path: '/books' },
      { name: 'Free Tools', path: '/tools/pricing' },
    ]
  },
  {
    name: 'Speaking',
    path: '/speaking',
    submenu: [
      { name: 'Speaking Overview', path: '/speaking' },
      { name: 'Podcasts', path: '/speaking#podcasts' },
      { name: 'Spaces/Clubhouse', path: '/speaking#spaces' },
      { name: 'Speaking Topics', path: '/speaking#topics' },
      { name: 'Events', path: '/events' },
    ]
  },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Suppress global navbar on specialized pages
  const isSpecializedPage = pathname.startsWith('/insights') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/bookmarks') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/books') ||
    pathname.startsWith('/tools');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isSpecializedPage) return null;

  return (
    <motion.nav
      className={cn(
        "fixed w-full z-[100] transition-all duration-500",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-gray-100 py-3" : "bg-background/50 backdrop-blur-md py-6"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-serif font-bold text-brand-charcoal tracking-tight group-hover:opacity-80 transition-opacity">BuzzEdison.</span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative group/item">
                <Link
                  href={item.path}
                  className={cn(
                    "px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-1",
                    activeItem === item.name || pathname.startsWith(item.path)
                      ? "text-brand-charcoal"
                      : "text-brand-muted hover:text-brand-charcoal"
                  )}
                  onMouseEnter={() => setActiveItem(item.name)}
                  onMouseLeave={() => setActiveItem('')}
                >
                  {item.name}
                  {item.submenu && (
                    <svg className="w-2.5 h-2.5 opacity-40 group-hover/item:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                <AnimatePresence>
                  {item.submenu && activeItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl py-3 border border-gray-100 overflow-hidden"
                      onMouseEnter={() => setActiveItem(item.name)}
                      onMouseLeave={() => setActiveItem('')}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className="block px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-charcoal hover:bg-brand-stone transition-all"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              href="/signin"
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-charcoal transition-all"
            >
              Client Portal
            </Link>

            <Link href="/contact" className="ml-2">
              <button className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-brand-charcoal rounded-none hover:bg-black transition-all shadow-sm flex items-center gap-2 group">
                Book Free Call
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              className="p-2 hover:bg-brand-stone rounded-none transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-brand-charcoal" /> : <Menu className="h-6 w-6 text-brand-charcoal" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-20 bg-white/95 backdrop-blur-xl z-[90] border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex flex-col p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-4">
                  <Link
                    href={item.path}
                    className="text-2xl font-serif font-medium text-brand-charcoal hover:text-brand-gold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="grid grid-cols-1 gap-3 pl-4 border-l border-gray-100">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className="text-[11px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-charcoal"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-8 mt-auto flex flex-col gap-4">
                <Link
                  href="/signin"
                  className="w-full px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-brand-charcoal border border-brand-stone rounded-none flex items-center justify-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Client Portal
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white bg-brand-charcoal rounded-none flex items-center justify-center gap-3">
                    Book Free Call
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
