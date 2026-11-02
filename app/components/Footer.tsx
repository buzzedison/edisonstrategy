'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const columns = [
  {
    title: 'Work with me',
    links: [
      { name: 'Services', path: '/services' },
      { name: 'Work', path: '/portfolio' },
      { name: 'Speaking', path: '/speaking' },
    ],
  },
  {
    title: 'Read',
    links: [
      { name: 'Insights', path: '/insights' },
      { name: 'Faith & Leadership', path: '/faith' },
      { name: 'Weekly letter', path: '/master-the-system' },
    ],
  },
  {
    title: 'Start here',
    links: [
      { name: 'Founder Scorecard', path: '/founder-scorecard' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isSpecializedPage =
    (pathname.startsWith('/insights/') && pathname !== '/insights/') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/bookmarks') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/books') ||
    pathname.startsWith('/tools');

  if (isSpecializedPage) return null;

  return (
    <footer className="overflow-hidden bg-[#171714] px-5 pb-6 pt-16 text-white sm:px-8 lg:px-12 lg:pt-24">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <p className="max-w-lg text-3xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-4xl">
              Build a company that can carry itself.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c] transition-transform active:scale-[0.97]"
            >
              Start a conversation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="mailto:ask@buzzedison.com" className="group mt-6 flex w-fit items-center gap-2 text-lg text-white/70 transition-colors hover:text-white">
              ask@buzzedison.com <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-sm font-medium text-white/45">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.path} className="text-base text-white/85 transition-colors hover:text-white">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 hover:bg-[length:100%_1px]">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <motion.p
          aria-hidden
          initial={{ y: '45%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 select-none whitespace-nowrap text-[clamp(3.5rem,18.7vw,21rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.92] lg:mt-24"
          style={{ marginLeft: '-0.04em' }}
        >
          Edison Ade
        </motion.p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Edison Ade. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://linkedin.com/in/buzzedison" className="transition-colors hover:text-white">LinkedIn</a>
            <a href="https://twitter.com/buzzedison" className="transition-colors hover:text-white">X</a>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
