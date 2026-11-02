'use client';

import { motion } from 'framer-motion';

const GOLD = '#f4f2ec';
const root = { x: 260, y: 56 };
const mid = [
  { x: 96, y: 190 },
  { x: 260, y: 190 },
  { x: 424, y: 190 },
];
const leaves = [
  [40, 96, 152],
  [204, 260, 316],
  [368, 424, 480],
].map((xs, g) => xs.map((x) => ({ x, y: 330, g })));

const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const my = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
};

const view = { once: true, margin: '0px 0px -20% 0px' } as const;

export default function JethroTree() {
  return (
    <svg viewBox="0 0 520 400" role="img" aria-label="One leader sharing the load: three leaders under them, each with a team" className="h-auto w-full max-w-[34rem]">
      {mid.map((m, i) => (
        <motion.path key={`a-${i}`} d={curve(root, m)} fill="none" stroke={GOLD} strokeWidth={2} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }} />
      ))}
      {leaves.map((group, g) =>
        group.map((l, j) => (
          <motion.path key={`b-${g}-${j}`} d={curve(mid[g], l)} fill="none" stroke={GOLD} strokeOpacity={0.6} strokeWidth={1.5} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ duration: 0.9, delay: 1.3 + g * 0.15 + j * 0.08, ease: [0.16, 1, 0.3, 1] }} />
        ))
      )}

      <motion.circle cx={root.x} cy={root.y} r={22} fill={GOLD} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={view} transition={{ type: 'spring', stiffness: 220, damping: 16 }} style={{ transformOrigin: `${root.x}px ${root.y}px` }} />
      {mid.map((m, i) => (
        <motion.circle key={`m-${i}`} cx={m.x} cy={m.y} r={14} fill="#1c1c1c" stroke="#f4f2ec" strokeWidth={2.5} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={view} transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.9 + i * 0.12 }} style={{ transformOrigin: `${m.x}px ${m.y}px` }} />
      ))}
      {leaves.flat().map((l, i) => (
        <motion.circle key={`l-${i}`} cx={l.x} cy={l.y} r={8} fill="#f4f2ec" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={view} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.9 + i * 0.05 }} style={{ transformOrigin: `${l.x}px ${l.y}px` }} />
      ))}

      <text x={root.x + 36} y={root.y + 5} fontSize="14" fontWeight="600" fill="#f4f2ec">Founder</text>
      <text x={mid[2].x + 26} y={mid[2].y + 5} fontSize="14" fontWeight="500" fill="#f4f2ec" fillOpacity={0.8} textAnchor="start">Leaders</text>
      <text x={260} y={378} fontSize="14" fontWeight="500" fill="#f4f2ec" fillOpacity={0.8} textAnchor="middle">Teams who can decide</text>
    </svg>
  );
}
