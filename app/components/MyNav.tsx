'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CornerDownLeft,
  Gauge,
  Heart,
  Home,
  Layers,
  LayoutGrid,
  Mail,
  Mic,
  Search,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Services', path: '/services' },
  { name: 'Work', path: '/portfolio' },
  { name: 'Insights', path: '/insights' },
  { name: 'Faith & Leadership', path: '/faith' },
  { name: 'Speaking', path: '/speaking' },
  { name: 'About', path: '/about' },
];

type Command = { label: string; hint: string; href: string; icon: React.ComponentType<{ className?: string }>; group: 'Pages' | 'Do' };

const commands: Command[] = [
  { label: 'Home', hint: 'Back to the start', href: '/', icon: Home, group: 'Pages' },
  { label: 'Services', hint: 'Sprint, MVP Builder, Strategy Partner', href: '/services', icon: Layers, group: 'Pages' },
  { label: 'Work', hint: 'Selected projects', href: '/portfolio', icon: Briefcase, group: 'Pages' },
  { label: 'Insights', hint: 'Essays and ideas', href: '/insights', icon: BookOpen, group: 'Pages' },
  { label: 'Faith & Leadership', hint: 'The Jethro Principle and more', href: '/faith', icon: Heart, group: 'Pages' },
  { label: 'Speaking', hint: 'Talks and invitations', href: '/speaking', icon: Mic, group: 'Pages' },
  { label: 'About', hint: 'Who I am', href: '/about', icon: User, group: 'Pages' },
  { label: 'Take the Founder Scorecard', hint: 'Four minutes, free', href: '/founder-scorecard', icon: Gauge, group: 'Do' },
  { label: 'Read the weekly letter', hint: 'Master the System, every Thursday', href: '/master-the-system', icon: Mail, group: 'Do' },
  { label: 'Start a conversation', hint: 'Tell me what feels stuck', href: '/contact', icon: ArrowUpRight, group: 'Do' },
  { label: 'Email Edison', hint: 'ask@buzzedison.com', href: 'mailto:ask@buzzedison.com', icon: Mail, group: 'Do' },
];

const tabs = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Services', path: '/services', icon: Layers },
  { name: 'Insights', path: '/insights', icon: BookOpen },
  { name: 'About', path: '/about', icon: User },
];

const sheetLinks = [
  { name: 'Work', path: '/portfolio', icon: Briefcase },
  { name: 'Faith & Leadership', path: '/faith', icon: Heart },
  { name: 'Speaking', path: '/speaking', icon: Mic },
  { name: 'Scorecard', path: '/founder-scorecard', icon: Gauge },
];

const spring = { type: 'spring', stiffness: 520, damping: 38 } as const;

const isActive = (pathname: string, path: string) => (path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`));

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const lastY = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 34, mass: 0.4 });

  const isSpecializedPage =
    (pathname.startsWith('/insights/') && pathname !== '/insights/') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/bookmarks') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/books') ||
    pathname.startsWith('/tools');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q)) : commands;
  }, [query]);

  const go = useCallback(
    (href: string) => {
      setPaletteOpen(false);
      setSheetOpen(false);
      if (href.startsWith('mailto:')) window.location.href = href;
      else router.push(href);
    },
    [router]
  );

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  // hide on the way down, return on the way up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 160);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
    setPaletteOpen(false);
    setHidden(false);
  }, [pathname]);

  // ⌘K / Ctrl+K and Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      } else if (e.key === 'Escape') {
        setPaletteOpen(false);
        setSheetOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [paletteOpen]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    const lock = paletteOpen || sheetOpen;
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [paletteOpen, sheetOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle('has-tabbar', !isSpecializedPage);
    return () => document.documentElement.classList.remove('has-tabbar');
  }, [isSpecializedPage]);

  if (isSpecializedPage) return null;

  const onPaletteKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault();
      go(results[cursor].href);
    }
  };

  const shortcut = isMac ? '⌘K' : 'Ctrl K';
  const barHidden = hidden && !paletteOpen && !sheetOpen;

  return (
    <>
      {/* reading progress */}
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-[#171714]" style={{ scaleX: progress }} />

      {/* desktop island */}
      <motion.header
        initial={false}
        animate={{ y: barHidden ? -110 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-4 z-[100] hidden justify-center px-6 lg:flex"
      >
        <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-[#f4f2ec]/85 p-2 pl-7 shadow-[0_8px_30px_-12px_rgba(23,23,20,0.35)] ring-1 ring-black/10 backdrop-blur-xl">
          <Link href="/" aria-label="BuzzEdison home" className="mr-5 text-xl font-semibold tracking-[-0.04em] text-[#171714] xl:text-2xl">
            BuzzEdison
          </Link>

          <nav aria-label="Primary navigation" className="flex items-center" onMouseLeave={() => setHovered(null)}>
            {navItems.map((item) => {
              const active = isActive(pathname, item.path);
              const lit = hovered ? hovered === item.path : active;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  aria-current={active ? 'page' : undefined}
                  onMouseEnter={() => setHovered(item.path)}
                  onFocus={() => setHovered(item.path)}
                  onBlur={() => setHovered(null)}
                  className={cn(
                    'relative rounded-full px-4 py-3 text-[15px] font-medium transition-colors xl:px-5 xl:text-base',
                    active || lit ? 'text-black' : 'text-black/55'
                  )}
                >
                  {lit && (
                    <motion.span layoutId="nav-pill" transition={spring} className="absolute inset-0 -z-0 rounded-full bg-black/[0.07]" />
                  )}
                  <span className="relative">{item.name}</span>
                  {active && <span aria-hidden className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black" />}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Search the site"
            aria-keyshortcuts="Control+K Meta+K"
            className="ml-3 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-black/55 transition-colors hover:bg-black/[0.06] hover:text-black"
          >
            <Search className="h-[18px] w-[18px]" />
            <kbd className="rounded-md bg-black/[0.07] px-1.5 py-0.5 font-sans text-[11px] font-medium text-black/60">{shortcut}</kbd>
          </button>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#171714] px-6 py-3.5 text-[15px] font-semibold text-white transition-transform active:scale-[0.97] xl:px-7 xl:text-base"
          >
            Let&apos;s talk
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.header>

      {/* mobile top bar */}
      <motion.header
        initial={false}
        animate={{ y: barHidden ? -72 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[100] flex h-14 items-center justify-between bg-[#f4f2ec]/85 px-5 backdrop-blur-xl lg:hidden"
      >
        <Link href="/" aria-label="BuzzEdison home" className="text-lg font-semibold tracking-[-0.04em] text-[#171714]">
          BuzzEdison
        </Link>
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          aria-label="Search the site"
          className="grid h-10 w-10 place-items-center rounded-full bg-black/[0.06] transition-transform active:scale-90"
        >
          <Search className="h-[18px] w-[18px]" />
        </button>
      </motion.header>

      {/* mobile tab bar */}
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-3 bottom-3 z-[100] lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <motion.div
          initial={false}
          animate={{ y: barHidden ? 120 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-md items-center justify-between rounded-[1.75rem] bg-[#171714]/95 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          {tabs.map((tab) => {
            const active = isActive(pathname, tab.path);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.name}
                href={tab.path}
                aria-current={active ? 'page' : undefined}
                className={cn('relative flex flex-1 flex-col items-center gap-0.5 rounded-[1.25rem] py-2 text-[11px] font-medium transition-colors active:scale-95', active ? 'text-black' : 'text-white/60')}
              >
                {active && <motion.span layoutId="tab-pill" transition={spring} className="absolute inset-0 rounded-[1.25rem] bg-[#f4f2ec]" />}
                <Icon className="relative h-5 w-5" />
                <span className="relative">{tab.name}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-label="More"
            aria-expanded={sheetOpen}
            className="relative flex flex-1 flex-col items-center gap-0.5 rounded-[1.25rem] py-2 text-[11px] font-medium text-white/60 transition-transform active:scale-95"
          >
            <LayoutGrid className="h-5 w-5" />
            <span>More</span>
          </button>
        </motion.div>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <div className="fixed inset-0 z-[130] lg:hidden">
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setSheetOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="More"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 420, damping: 40 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 500) setSheetOpen(false);
              }}
              className="absolute inset-x-0 bottom-0 rounded-t-[2rem] bg-[#f4f2ec] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3"
            >
              <div aria-hidden className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-black/20" />
              <div className="grid grid-cols-2 gap-3">
                {sheetLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className="flex flex-col gap-6 rounded-2xl bg-white p-4 text-[#171714] transition-transform active:scale-[0.97]"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-base font-semibold tracking-[-0.02em]">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/contact"
                className="mt-4 flex h-14 items-center justify-center gap-2 rounded-full bg-[#171714] text-base font-semibold text-white transition-transform active:scale-[0.98]"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* command palette */}
      <AnimatePresence>
        {paletteOpen && (
          <div className="fixed inset-0 z-[140] flex items-start justify-center px-4 pt-[14vh]">
            <motion.button
              type="button"
              aria-label="Close search"
              onClick={() => setPaletteOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search the site"
              onKeyDown={onPaletteKey}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-[#f4f2ec] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <Search className="h-5 w-5 text-black/45" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where to? Try “scorecard”…"
                  aria-label="Search pages and actions"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full bg-transparent text-lg text-[#171714] outline-none placeholder:text-black/40"
                />
                <kbd className="rounded-md bg-black/[0.07] px-1.5 py-0.5 text-[11px] font-medium text-black/55">Esc</kbd>
              </div>
              <ul role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto border-t border-black/10 p-2">
                {results.length === 0 && <li className="px-4 py-8 text-center text-black/50">Nothing found for “{query}”.</li>}
                {results.map((cmd, i) => {
                  const Icon = cmd.icon;
                  const showGroup = i === 0 || results[i - 1].group !== cmd.group;
                  return (
                    <li key={cmd.label} role="presentation">
                      {showGroup && <p className="px-3 pb-1 pt-3 text-sm font-medium text-black/50">{cmd.group === 'Pages' ? 'Pages' : 'Quick actions'}</p>}
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === cursor}
                        onMouseMove={() => setCursor(i)}
                        onClick={() => go(cmd.href)}
                        className={cn('flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors', i === cursor ? 'bg-black/[0.07]' : '')}
                      >
                        <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-white text-[#171714]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-[#171714]">{cmd.label}</span>
                          <span className="block truncate text-sm text-black/50">{cmd.hint}</span>
                        </span>
                        {i === cursor && <CornerDownLeft className="h-4 w-4 flex-none text-black/40" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
