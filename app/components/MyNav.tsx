"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
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
      { name: 'Events', path: '/events' },
    ]
  },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function DesktopNavItem({ item, pathname }: { item: typeof navItems[0]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = pathname === item.path || pathname.startsWith(item.path + '/');

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.path}
        className={cn(
          "py-2 text-[12px] font-sans font-semibold uppercase tracking-[0.08em] transition-all duration-300 flex items-center gap-1 relative group",
          isActive ? "text-[#1c1c1c]" : "text-zinc-500 hover:text-[#1c1c1c]"
        )}
      >
        {item.name}
        {item.submenu && (
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform duration-300",
              open ? "rotate-180" : ""
            )}
          />
        )}
        {/* Active underline */}
        <span
          className={cn(
            "absolute -bottom-0.5 left-0 h-[2px] bg-[#1c1c1c] transition-all duration-300",
            isActive ? "w-full" : "w-0 group-hover:w-full"
          )}
        />
      </Link>

      <AnimatePresence>
        {item.submenu && open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            // Extra top padding creates a hover bridge to prevent dropdown from closing
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
          >
            <div className="w-56 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-xl py-2 border border-zinc-100 overflow-hidden">
              {item.submenu.map((subItem) => {
                const subActive = pathname === subItem.path;
                return (
                  <Link
                    key={subItem.name}
                    href={subItem.path}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 text-[12px] font-medium transition-colors duration-200",
                      subActive
                        ? "text-[#1c1c1c] bg-zinc-50"
                        : "text-zinc-500 hover:text-[#1c1c1c] hover:bg-zinc-50"
                    )}
                  >
                    <span className={cn("w-1 h-1 rounded-full flex-shrink-0", subActive ? "bg-[#1c1c1c]" : "bg-zinc-300")} />
                    {subItem.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({
  item,
  pathname,
  onClose,
}: {
  item: typeof navItems[0];
  pathname: string;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isActive = pathname === item.path || pathname.startsWith(item.path + '/');

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={() => setExpanded((v) => !v)}
            className={cn(
              "w-full flex items-center justify-between text-lg font-serif font-medium transition-colors",
              isActive ? "text-[#1c1c1c]" : "text-zinc-600 hover:text-[#1c1c1c]"
            )}
          >
            {item.name}
            <ChevronDown
              className={cn(
                "w-4 h-4 opacity-40 transition-transform duration-300",
                expanded ? "rotate-180" : ""
              )}
            />
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-3 pl-4 border-l-2 border-zinc-100 flex flex-col gap-2">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.path}
                      className="text-sm font-medium text-zinc-500 hover:text-[#1c1c1c] flex items-center gap-2 py-1 transition-colors"
                      onClick={onClose}
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          href={item.path}
          className={cn(
            "flex items-center justify-between text-lg font-serif font-medium transition-colors",
            isActive ? "text-[#1c1c1c]" : "text-zinc-600 hover:text-[#1c1c1c]"
          )}
          onClick={onClose}
        >
          {item.name}
          <ArrowRight className="w-4 h-4 opacity-30" />
        </Link>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isSpecializedPage =
    pathname.startsWith('/insights') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/bookmarks') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/books') ||
    pathname.startsWith('/tools');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isSpecializedPage) return null;

  return (
    <motion.nav
      className={cn(
        "fixed w-full z-[100] transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-zinc-100 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[76rem] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/image/logo.svg"
              alt="Buzzedison"
              width={130}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <DesktopNavItem key={item.name} item={item} pathname={pathname} />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/signin"
              className="text-[12px] font-sans font-semibold uppercase tracking-[0.08em] text-zinc-500 hover:text-[#1c1c1c] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-[12px] font-sans font-semibold uppercase tracking-[0.05em] text-white bg-[#1c1c1c] rounded-full hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
            >
              Work With Me
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X className="h-5 w-5 text-[#1c1c1c]" />
              : <Menu className="h-5 w-5 text-[#1c1c1c]" />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-[60px] bg-white/98 backdrop-blur-2xl z-[90] border-t border-zinc-100 overflow-y-auto"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col p-8 gap-6 pb-24">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.name}
                  item={item}
                  pathname={pathname}
                  onClose={() => setMobileMenuOpen(false)}
                />
              ))}

              <div className="flex flex-col gap-3 pt-6 border-t border-zinc-100 mt-2">
                <Link
                  href="/signin"
                  className="w-full px-6 py-3.5 text-sm font-medium text-zinc-600 border border-zinc-200 rounded-full flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/contact"
                  className="w-full px-6 py-3.5 text-sm font-semibold text-white bg-[#1c1c1c] rounded-full flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Work With Me
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
