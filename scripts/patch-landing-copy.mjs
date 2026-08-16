#!/usr/bin/env node
// Targeted copy update for the landingPage singleton (June 2026 homepage redesign).
// Patches only the fields the redesign changed — leaves images, packages,
// testimonial quotes, and everything else untouched.
// Usage: node scripts/patch-landing-copy.mjs

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@sanity/client';

function stripQuotes(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/^['"]|['"]$/g, '');
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = stripQuotes(trimmed.slice(eqIndex + 1).trim());
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(process.cwd(), '.env.local'));
loadEnvFile(path.join(process.cwd(), '.env'));

const projectId = stripQuotes(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID);
const dataset = stripQuotes(process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production');
const token = stripQuotes(process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN);

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2025-03-30', token, useCdn: false });

const set = {
  // Hero
  'hero.badge': 'Founder, operator and strategy partner · Accra → Worldwide',
  'hero.titleLine1': 'Your business has outgrown',
  'hero.emphasizedTitle': 'guesswork.',
  'hero.titleLine3': '',
  'hero.description':
    'When every important decision still lands on your desk, growth becomes a more expensive version of chaos. I help you turn hard-won momentum into a company that can think, sell, and move without waiting on you.',
  'hero.helperText': 'Bring the messy version. We’ll find the signal.',
  'hero.primaryCta.label': 'Find the Real Constraint',
  'hero.secondaryCta.label': 'See How I Work',
  'aboutSection.cta.label': 'Why I Do This',

  // Ways to work together
  'packagesSection.packages': [
    {
      _type: 'object', _key: 'package-1', tag: '4 Weeks', name: 'Accelerator Sprint',
      forWhom: 'Founders with traction, too many priorities, and no clean answer to “what now?”',
      description: 'Four exacting weeks to pressure-test the opportunity, sharpen the position, and turn a crowded strategy into one decisive 90-day move.',
      features: ['Business model validation', 'Market positioning', 'Go-to-market roadmap', 'Strategic priority support'],
      outcome: 'You leave knowing exactly what your next 90 days look like.', ctaLabel: 'Find Your Next Move', ctaHref: '/contact', featured: false,
    },
    {
      _type: 'object', _key: 'package-2', tag: '8 Weeks', name: 'MVP Builder',
      forWhom: 'Non-technical founders who need to ship the right product before they spend on the wrong one.',
      description: 'We translate the business case into a lean product: the right scope, the right architecture, and a launch built to learn—not just look finished.',
      features: ['Product architecture', 'Lean development', 'Market launch support', 'Post-launch learning loop'],
      outcome: 'A market-ready product built for real users—not a demo.', ctaLabel: 'Build the Right Thing', ctaHref: '/contact', featured: true,
    },
    {
      _type: 'object', _key: 'package-3', tag: 'Quarterly Retainer', name: 'Strategy Partner',
      forWhom: 'Founders carrying the company’s hardest decisions alone.',
      description: 'A weekly operating partnership for the decisions that do not fit neatly inside a department: growth, product, systems, and what to stop doing.',
      features: ['Weekly strategy sessions', 'Go-to-market execution', 'Custom revenue systems', 'Performance dashboards'],
      outcome: 'A business that runs on systems, not on you.', ctaLabel: 'Talk Through the Problem', ctaHref: '/contact', featured: false,
    },
  ],

  // Proof strip in hero
  trustBarStats: [
    { _type: 'object', _key: 'trust-stat-1', value: '7', label: 'Companies Built' },
    { _type: 'object', _key: 'trust-stat-2', value: '7,400+', label: 'Founders Trained' },
    { _type: 'object', _key: 'trust-stat-3', value: '15', label: 'Countries Reached' },
    { _type: 'object', _key: 'trust-stat-4', value: '$5M+', label: 'Capital Raised' },
  ],

  // Marquee
  'brandsSection.eyebrow': 'Built & Backed',
  'brandsSection.brands': [
    { _type: 'object', _key: 'brand-1', name: 'Bloop Global', website: '/about' },
    { _type: 'object', _key: 'brand-2', name: 'The Enterprise Village', website: '/about' },
    { _type: 'object', _key: 'brand-3', name: 'FundDesk', website: '/ventures' },
    { _type: 'object', _key: 'brand-4', name: 'TaskWit', website: '/ventures' },
    { _type: 'object', _key: 'brand-5', name: 'CrowdPen', website: '/ventures' },
    { _type: 'object', _key: 'brand-6', name: 'AgriPro', website: '/ventures' },
  ],

  // How it works
  'frameworksSection.eyebrow': 'How It Works',
  'frameworksSection.title': 'From chaos to a system,',
  'frameworksSection.emphasizedTitle': 'in three moves.',
  'frameworksSection.cta.label': 'Book a Free Strategy Call',
  'frameworksSection.ctaHelperText': 'You leave with next steps — even if we never work together.',
  'frameworksSection.frameworks': [
    {
      _type: 'object', _key: 'framework-1', icon: 'target',
      title: 'Diagnose',
      description: 'We find the one constraint actually holding you back — not the ten fake problems hiding it.',
      result: 'One clear priority',
    },
    {
      _type: 'object', _key: 'framework-2', icon: 'brain',
      title: 'Design',
      description: 'We build your 90-day plan and the systems to run it: offer, pricing, funnel, and team workflows.',
      result: 'A plan your team can execute',
    },
    {
      _type: 'object', _key: 'framework-3', icon: 'trendingUp',
      title: 'Execute',
      description: 'We work it together, week by week, until growth is repeatable — not random.',
      result: 'Revenue that compounds',
    },
  ],

  // Testimonials heading
  'testimonialsSection.introTitle': 'Founders come for strategy.',
  'testimonialsSection.emphasizedTitle': 'They stay for results.',

  // Final CTA
  'finalCtaSection.titleLine1': 'The next move should',
  'finalCtaSection.titleLine2': 'make the rest easier.',
  'finalCtaSection.description':
    'Bring the decision that has been circling your head. We’ll name the real constraint and leave you with a clearer next move.',
  'finalCtaSection.primaryCta.label': 'Bring Me the Problem',
  'finalCtaSection.checklist': ['Free 30-minute call', 'Leave with a written action plan', 'No pitch, no pressure'],
};

const result = await client.patch('landingPage').set(set).commit();
console.log('Patched landingPage. Revision:', result._rev);
