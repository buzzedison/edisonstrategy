'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a[href], button, [role="button"], summary, label[for]';
const TEXT_FIELD = 'input, textarea, select, [contenteditable="true"]';
const MAGNETIC = 'a[class*="rounded-full"], button[class*="rounded-full"]';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<'idle' | 'link' | 'text'>('idle');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) {
        magnet.style.translate = '';
        magnet.style.transition = 'translate 500ms cubic-bezier(0.16, 1, 0.3, 1)';
        magnet = null;
      }
    };

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest(TEXT_FIELD)) setMode('text');
      else if (target.closest(INTERACTIVE)) setMode('link');
      else setMode('idle');

      const m = target.closest(MAGNETIC) as HTMLElement | null;
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        m.style.transition = 'translate 120ms ease-out';
        m.style.translate = `${dx * 14}px ${dy * 10}px`;
      }
    };
    const onLeave = () => {
      setVisible(false);
      release();
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.classList.remove('has-cursor');
      release();
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = mode === 'link' ? 64 : mode === 'text' ? 4 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300] mix-blend-difference">
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white"
          initial={false}
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.82 : 1,
            backgroundColor: mode === 'link' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          initial={false}
          animate={{ width: mode === 'link' ? 0 : 6, height: mode === 'link' ? 0 : 6, opacity: visible && mode !== 'text' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
}
