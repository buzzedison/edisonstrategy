"use client";

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Mail, ArrowUpRight, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Suppress global footer on specialized pages
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
    <footer className="bg-white border-t border-zinc-100 pt-20 pb-12 relative">
      <div className="max-w-[76rem] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

          {/* Section 1: Brand Strategy */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Link href="/" className="inline-block group mb-6">
                <span className="text-2xl font-serif font-bold tracking-tight text-[#1c1c1c] group-hover:opacity-80 transition-opacity">
                  Buzzedison
                </span>
              </Link>
              <p className="text-[14px] text-zinc-600 font-sans leading-relaxed max-w-sm">
                Practical support for founders and teams. I help you build <span className="text-[#1c1c1c] font-medium">systems that scale</span>, websites that convert, and mobile apps people use.
              </p>
            </div>

            <div className="w-8 h-[1px] bg-zinc-200" />

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="text-[11px] font-sans font-medium uppercase tracking-widest text-zinc-400">Where I Work</h4>
                <p className="text-[13px] text-zinc-600 font-sans flex items-start gap-2 leading-relaxed">
                  Remote-First. <br />HQ: Accra, Ghana.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-[11px] font-sans font-medium uppercase tracking-widest text-zinc-400">Email</h4>
                <p className="text-[13px] text-zinc-600 font-sans flex items-start gap-2">
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
                  className="text-zinc-400 hover:text-[#1c1c1c] transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Core Frameworks */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-serif text-[#1c1c1c]">Explore</h3>
            <ul className="space-y-3">
              {['Services', 'Portfolio', 'Ventures', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-zinc-500 hover:text-[#1c1c1c] transition-colors duration-300 text-[14px] font-sans"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: The Library */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-serif text-[#1c1c1c]">Learn</h3>
            <ul className="space-y-3">
              {[
                { name: 'Articles', path: '/insights' },
                { name: 'Services', path: '/services' },
                { name: 'Books', path: '/books' },
                { name: 'Resources', path: '/tools/pricing' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-zinc-500 hover:text-[#1c1c1c] transition-colors duration-300 text-[14px] font-sans"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Direct Engagement */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-serif text-[#1c1c1c]">Start Here</h3>
            <div className="space-y-6">
              <div className="bg-zinc-50/50 border border-zinc-100 p-6 flex flex-col items-start group hover:border-zinc-200 transition-colors">
                <p className="text-[14px] text-zinc-600 mb-6 font-serif italic leading-relaxed">
                  &ldquo;If growth feels messy, we can fix it with a clear plan and better systems.&rdquo;
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-[#1c1c1c] hover:text-zinc-500 transition-colors">
                  Book Free Call <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-zinc-500">Now Booking New Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-zinc-400">
            <span>&copy; {currentYear} Buzzedison</span>
            <span className="hidden md:inline w-1 h-1 bg-zinc-200 rounded-full" />
            <span className="hidden md:inline">Growth Strategy, Web, and Mobile</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-zinc-400 hover:text-[#1c1c1c] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-zinc-400 hover:text-[#1c1c1c] transition-colors">Client Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
