"use client";

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const companies = [
  { name: "Bloop Global", href: "/portfolio" },
  { name: "Enterprise Village", href: "/portfolio" },
  { name: "FundDesk", href: "/portfolio" },
  { name: "TaskWit", href: "/portfolio" },
  { name: "CrowdPen", href: "/portfolio" },
  { name: "AgriPro", href: "/portfolio" },
  { name: "African Recovery", href: "/portfolio" },
];

const serviceLinks = [
  { name: "What I Do", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Insights", path: "/insights" },
  { name: "Speaking", path: "/speaking" },
  { name: "Contact", path: "/contact" },
];

const learnLinks = [
  { name: "Books", path: "/books" },
  { name: "Free Tools", path: "/tools/pricing" },
  { name: "Work I've Built", path: "/portfolio" },
  { name: "Events", path: "/events" },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-[#0D0D0B] text-white pt-20 pb-12">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-16">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 pb-16 border-b border-white/[0.07]">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-serif font-bold tracking-tight text-white group-hover:text-amber-300/80 transition-colors">
                BuzzEdison
              </span>
            </Link>
            <p className="text-[14px] text-zinc-500 font-sans leading-relaxed max-w-sm">
              Business growth strategist helping founders across Africa and the diaspora build{" "}
              <span className="text-zinc-300 font-medium">clear systems</span>,{" "}
              smarter execution, and strategies that actually fit their context.
            </p>

            <div className="space-y-1.5">
              <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-600">Based in</p>
              <p className="text-[13px] text-zinc-400 font-sans">Accra, Ghana · Remote-First</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-600">Email</p>
              <a
                href="mailto:ask@buzzedison.com"
                className="text-[13px] text-zinc-400 font-sans hover:text-white transition-colors"
              >
                ask@buzzedison.com
              </a>
            </div>

            <div className="flex gap-4 pt-2">
              {[
                { icon: <Twitter className="w-4 h-4" />, url: 'https://twitter.com/buzzedison', label: 'Twitter/X' },
                { icon: <Linkedin className="w-4 h-4" />, url: 'https://linkedin.com/in/buzzedison', label: 'LinkedIn' },
                { icon: <Instagram className="w-4 h-4" />, url: 'https://instagram.com/buzzedison', label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="text-zinc-600 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Companies */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-600">Companies</h3>
            <ul className="space-y-3">
              {companies.map((co) => (
                <li key={co.name}>
                  <Link
                    href={co.href}
                    className="text-[14px] font-sans text-zinc-500 hover:text-white transition-colors duration-300"
                  >
                    {co.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-600">Links</h3>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-[14px] font-sans text-zinc-500 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + CTA */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-600">Resources</h3>
            <ul className="space-y-3 mb-8">
              {learnLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-[14px] font-sans text-zinc-500 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-6">
              <p className="text-[14px] font-serif italic text-zinc-400 leading-relaxed mb-5">
                &ldquo;If growth feels messy, we can fix it with a clear plan and better systems.&rdquo;
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-white hover:text-amber-300 transition-colors"
              >
                Book Free Call <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-5 text-[11px] font-sans font-medium uppercase tracking-[0.12em] text-zinc-600">
            <span>&copy; {currentYear} BuzzEdison</span>
            <span className="hidden md:inline w-1 h-1 bg-zinc-700 rounded-full" />
            <span className="hidden md:inline">Simple systems. Real growth. Africa-first.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[11px] font-sans font-medium uppercase tracking-[0.12em] text-zinc-600 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] font-sans font-medium uppercase tracking-[0.12em] text-zinc-600 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
