'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Services', path: '/services' },
  { name: 'Work', path: '/portfolio' },
  { name: 'Insights', path: '/insights' },
  { name: 'About', path: '/about' },
];

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
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  if (isSpecializedPage) return null;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300',
        scrolled || mobileMenuOpen
          ? 'border-black/10 bg-[#f4f2ec]/95 backdrop-blur-xl'
          : 'border-transparent bg-[#f4f2ec]'
      )}
    >
      <div className="mx-auto flex h-20 max-w-[98rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="BuzzEdison home">
          <Image src="/image/logo.svg" alt="BuzzEdison" width={132} height={40} priority className="h-8 w-auto" />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-black',
                  active ? 'text-black' : 'text-black/50'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden items-center gap-2 rounded-full bg-[#171714] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 lg:inline-flex"
        >
          Let&apos;s talk <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="rounded-full p-2 lg:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-black/10 px-5 pb-7 pt-5 sm:px-8 lg:hidden">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path} className="border-b border-black/10 py-4 text-xl font-medium">
                {item.name}
              </Link>
            ))}
            <Link href="/contact" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#171714] px-5 py-3 text-sm font-semibold text-white">
              Let&apos;s talk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
