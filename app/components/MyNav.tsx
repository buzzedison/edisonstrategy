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
      { name: 'Growth Strategy', path: '/consulting' },
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
        "fixed w-full z-[100] transition-all duration-700",
        scrolled ? "bg-white/95 backdrop-blur-xl border-b border-zinc-100 py-4 shadow-sm" : "bg-transparent py-6"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[76rem] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <span className="text-xl lg:text-2xl font-serif font-bold text-[#1c1c1c] tracking-tight group-hover:text-zinc-600 transition-colors">
              Buzzedison
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group/item">
                <Link
                  href={item.path}
                  className={cn(
                    "py-2 text-[12px] font-sans font-medium uppercase tracking-[0.05em] transition-all duration-300 flex items-center gap-1.5",
                    activeItem === item.name || pathname.startsWith(item.path)
                      ? "text-[#1c1c1c]"
                      : "text-zinc-500 hover:text-[#1c1c1c]"
                  )}
                  onMouseEnter={() => setActiveItem(item.name)}
                  onMouseLeave={() => setActiveItem('')}
                >
                  {item.name}
                  {item.submenu && (
                    <svg className="w-2.5 h-2.5 opacity-40 group-hover/item:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                <AnimatePresence>
                  {item.submenu && activeItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-xl py-3 border border-zinc-100 overflow-hidden mt-1"
                      onMouseEnter={() => setActiveItem(item.name)}
                      onMouseLeave={() => setActiveItem('')}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className="block px-6 py-2.5 text-[12px] font-sans font-medium text-zinc-600 hover:text-[#1c1c1c] hover:bg-zinc-50 transition-colors duration-300"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/signin"
              className="text-[12px] font-sans font-bold uppercase tracking-[0.05em] text-zinc-500 hover:text-[#1c1c1c] transition-colors"
            >
              Sign In
            </Link>

            <Link href="/contact" className="ml-2">
              <button className="px-6 py-2.5 text-[12px] font-sans font-medium uppercase tracking-[0.05em] text-white bg-[#1c1c1c] rounded-full hover:bg-black transition-colors shadow-sm flex items-center gap-2 duration-300">
                Contact Us
              </button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              className="p-2 hover:bg-zinc-50 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-[#1c1c1c]" /> : <Menu className="h-5 w-5 text-[#1c1c1c]" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-[70px] bg-white/95 backdrop-blur-2xl z-[90] border-t border-zinc-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-70px)] min-h-screen">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-4">
                  <Link
                    href={item.path}
                    className="text-lg font-serif font-medium text-[#1c1c1c] hover:text-zinc-500 transition-colors flex items-center justify-between"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {!item.submenu && <ArrowRight className="w-4 h-4 opacity-30" />}
                  </Link>
                  {item.submenu && (
                    <div className="grid grid-cols-1 gap-3 pl-4 border-l border-zinc-100">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className="text-sm font-medium text-zinc-500 hover:text-[#1c1c1c] flex items-center gap-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="w-1 h-1 rounded-full bg-zinc-200" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-8 mt-auto flex flex-col gap-3 pb-20">
                <Link
                  href="/signin"
                  className="w-full px-6 py-3.5 text-sm font-medium text-zinc-600 border border-zinc-200/60 rounded-full flex items-center justify-center gap-3 bg-zinc-50 hover:bg-zinc-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Client Portal
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-6 py-3.5 text-sm font-medium text-white bg-[#1c1c1c] rounded-full flex items-center justify-center gap-3 shadow-md hover:bg-black transition-colors">
                    Contact Us
                    <ArrowRight className="w-3 h-3" />
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
