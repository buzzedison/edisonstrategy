'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const C = 260;
const R = 168;
const labels = ['Pricing', 'Hiring', 'Product', 'Support', 'Spend', 'Marketing', 'Sales', 'Planning'];
const nodes = labels.map((label, i) => {
  const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
  return { label, x: C + R * Math.cos(a), y: C + R * Math.sin(a), lx: C + (R + 42) * Math.cos(a), ly: C + (R + 42) * Math.sin(a), a };
});

const GOLD = '#f4f2ec';

export default function BottleneckGraphic() {
  const [carried, setCarried] = useState(false);

  return (
    <div className="w-full">
      <svg viewBox="0 0 520 520" role="img" aria-label={carried ? 'Work flowing between teammates without passing through the founder' : 'Every decision routed through the founder in the centre'} className="mx-auto h-auto w-full max-w-[34rem]">
        {/* spokes */}
        {nodes.map((n, i) => (
          <motion.line
            key={`spoke-${i}`}
            x1={n.x}
            y1={n.y}
            x2={C}
            y2={C}
            stroke={GOLD}
            strokeWidth={1.5}
            initial={false}
            animate={{ opacity: carried ? 0.08 : 0.5 }}
            transition={{ duration: 0.6 }}
          />
        ))}
        {/* ring */}
        {nodes.map((n, i) => {
          const m = nodes[(i + 1) % nodes.length];
          return (
            <motion.line
              key={`ring-${i}`}
              x1={n.x}
              y1={n.y}
              x2={m.x}
              y2={m.y}
              stroke={GOLD}
              strokeWidth={1.5}
              initial={false}
              animate={{ opacity: carried ? 0.5 : 0, pathLength: carried ? 1 : 0 }}
              transition={{ duration: 0.8, delay: carried ? i * 0.05 : 0 }}
            />
          );
        })}

        {/* packets */}
        <g key={carried ? 'carried' : 'routed'}>
          {nodes.map((n, i) => {
            const m = nodes[(i + 1) % nodes.length];
            const to = carried ? m : { x: C, y: C };
            return (
              <motion.circle
                key={`p-${i}`}
                r={5}
                fill="#f4f2ec"
                initial={{ cx: n.x, cy: n.y, opacity: 0 }}
                animate={{ cx: [n.x, to.x], cy: [n.y, to.y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: carried ? 1.8 : 2.4, delay: i * (carried ? 0.22 : 0.3), repeat: Infinity, ease: 'easeInOut', times: [0, 0.15, 0.85, 1] }}
              />
            );
          })}
        </g>

        {/* the founder */}
        <motion.circle
          cx={C}
          cy={C}
          fill="none"
          stroke={GOLD}
          strokeWidth={2}
          initial={false}
          animate={carried ? { r: 14, opacity: 0.5 } : { r: [40, 48, 40], opacity: 1 }}
          transition={carried ? { duration: 0.6 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx={C} cy={C} fill={GOLD} initial={false} animate={{ r: carried ? 6 : 30 }} transition={{ type: 'spring', stiffness: 160, damping: 18 }} />
        <motion.text x={C} y={C + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill="#1c1c1c" initial={false} animate={{ opacity: carried ? 0 : 1 }}>
          You
        </motion.text>

        {/* team nodes */}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r={9} fill="#1c1c1c" stroke="#f4f2ec" strokeWidth={2} />
            <text x={n.lx} y={n.ly + 5} textAnchor="middle" fontSize="14" fontWeight="500" fill="#f4f2ec" fillOpacity={0.85}>
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="mx-auto mt-6 flex w-fit rounded-full bg-white/10 p-1.5" role="group" aria-label="Show how work flows">
        <button
          type="button"
          aria-pressed={!carried}
          onClick={() => setCarried(false)}
          className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${!carried ? 'bg-[#f4f2ec] text-[#1c1c1c]' : 'text-white/70 hover:text-white'}`}
        >
          Through you
        </button>
        <button
          type="button"
          aria-pressed={carried}
          onClick={() => setCarried(true)}
          className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${carried ? 'bg-[#f4f2ec] text-[#1c1c1c]' : 'text-white/70 hover:text-white'}`}
        >
          Carried by the system
        </button>
      </div>
    </div>
  );
}
