'use client';

import { motion } from 'framer-motion';

export default function MethodRail({ steps }: { steps: number }) {
  return (
    <div aria-hidden className="relative mt-14 hidden lg:block">
      <motion.div
        className="absolute left-0 right-0 top-[11px] h-[3px] origin-left rounded-full bg-[#1c1c1c]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${steps}, minmax(0, 1fr))` }}>
        {Array.from({ length: steps }).map((_, i) => (
          <motion.span
            key={i}
            className="block h-6 w-6 rounded-full border-[3px] border-[#1c1c1c] bg-[#f4f2ec]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 + i * 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}
