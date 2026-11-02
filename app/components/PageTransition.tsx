'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type Phase = 'hidden' | 'cover' | 'reveal';

const EASE = [0.76, 0, 0.24, 1] as const;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('hidden');
  const pending = useRef<string | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout>>();

  const go = useCallback(
    (href: string) => {
      pending.current = href;
      setPhase('cover');
      window.setTimeout(() => router.push(href), 620);
      // if the route never changes (same page, error), lift the curtain anyway
      fallback.current = setTimeout(() => {
        if (pending.current) {
          pending.current = null;
          setPhase('reveal');
        }
      }, 5000);
    },
    [router]
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const a = (e.target as Element | null)?.closest('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // hashes and same-page links keep native behaviour
      e.preventDefault();
      if (pending.current) return;
      go(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [go]);

  // the new route has arrived: lift the curtain
  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    clearTimeout(fallback.current);
    const t = setTimeout(() => setPhase('reveal'), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[250] flex items-center justify-center bg-[#171714]"
      style={{ borderRadius: '50% 50% 0 0 / 14vh 14vh 0 0', willChange: 'transform' }}
      initial={{ y: '102%' }}
      animate={{ y: phase === 'cover' ? '0%' : phase === 'reveal' ? '-102%' : '102%' }}
      transition={phase === 'hidden' ? { duration: 0 } : { duration: phase === 'cover' ? 0.62 : 0.7, ease: EASE }}
      onAnimationComplete={() => {
        if (phase === 'reveal') setPhase('hidden');
      }}
    >
      <motion.span
        className="text-[clamp(2rem,6vw,4.5rem)] font-semibold tracking-[-0.05em] text-[#f4f2ec]"
        initial={false}
        animate={{ opacity: phase === 'cover' ? 1 : 0, y: phase === 'cover' ? 0 : phase === 'reveal' ? -16 : 16 }}
        transition={{ duration: 0.35, delay: phase === 'cover' ? 0.25 : 0 }}
      >
        BuzzEdison
      </motion.span>
    </motion.div>
  );
}
