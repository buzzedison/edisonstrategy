'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';

type Stat = { value: string; label: string };

const parse = (value: string) => {
  const match = value.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], target: parseFloat(match[2].replace(/,/g, '')), suffix: match[3] };
};

function Figure({ value, delay }: { value: string; delay: number }) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || !parsed) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(parsed.target);
      return;
    }
    setShown(0);
    const controls = animate(0, parsed.target, {
      duration: 2.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!parsed) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>
        {parsed.prefix}
        {(shown ?? parsed.target).toLocaleString('en-US')}
        {parsed.suffix}
      </span>
    </span>
  );
}

export default function StatsBand({ stats, title }: { stats: Stat[]; title?: string }) {
  return (
    <section aria-label="Track record" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[92rem] text-center">
        {title && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 text-base font-medium text-black/55 sm:text-lg lg:mb-20"
          >
            {title}
          </motion.p>
        )}
        <dl className="grid gap-16 sm:gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center"
            >
              <dd className="order-1 text-[clamp(5.5rem,24vw,8rem)] font-semibold leading-[0.85] tracking-[-0.04em] text-[#171714] tabular-nums md:text-[clamp(4rem,10vw,10rem)]">
                <Figure value={stat.value} delay={index * 0.12} />
              </dd>
              <dt className="order-2 mt-6 text-lg font-medium text-black/60 sm:text-xl">{stat.label}</dt>
              <span
                aria-hidden
                className="order-3 mt-6 block h-1 w-10 origin-center rounded-full bg-[#171714] transition-[width] duration-500 ease-out group-hover:w-24"
              />
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
