'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Services', path: '/services' },
  { name: 'Work', path: '/portfolio' },
  { name: 'Insights', path: '/insights' },
  { name: 'Scorecard', path: '/founder-scorecard' },
  { name: 'Weekly letter', path: '/master-the-system' },
  { name: 'About', path: '/about' },
];

export default function Footer() {
  const pathname = usePathname();
  const isSpecializedPage =
    pathname.startsWith('/insights') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/bookmarks') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/books') ||
    pathname.startsWith('/tools');

  if (isSpecializedPage) return null;

  return (
    <footer className="bg-[#171714] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[92rem]">
        <div className="flex flex-col gap-10 border-b border-white/15 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">BuzzEdison</Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
              Strategy for founders turning conviction into a company that can carry it.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/55">
            {links.map((link) => (
              <Link key={link.name} href={link.path} className="transition-colors hover:text-white">{link.name}</Link>
            ))}
            <a href="mailto:ask@buzzedison.com" className="inline-flex items-center gap-1 transition-colors hover:text-white">
              Email <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BuzzEdison.</p>
          <div className="flex gap-5">
            <a href="https://linkedin.com/in/buzzedison" className="hover:text-white">LinkedIn</a>
            <a href="https://twitter.com/buzzedison" className="hover:text-white">X</a>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
