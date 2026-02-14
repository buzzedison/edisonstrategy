#!/usr/bin/env node

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
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = stripQuotes(trimmed.slice(eqIndex + 1).trim());

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function cleanObject(input) {
  if (Array.isArray(input)) {
    return input.map(cleanObject).filter((item) => item !== undefined);
  }

  if (input && typeof input === 'object') {
    const entries = Object.entries(input)
      .map(([key, value]) => [key, cleanObject(value)])
      .filter(([, value]) => value !== undefined);

    return Object.fromEntries(entries);
  }

  if (input === undefined) return undefined;
  return input;
}

const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');
const force = args.includes('--force');

if (showHelp) {
  console.log(`Seed marketing pages into Sanity.\n\nUsage:\n  npm run seed:marketing-pages\n  npm run seed:marketing-pages -- --force\n\nEnv required:\n  NEXT_PUBLIC_SANITY_PROJECT_ID\n  NEXT_PUBLIC_SANITY_DATASET\n  SANITY_API_WRITE_TOKEN (or SANITY_WRITE_TOKEN)\n`);
  process.exit(0);
}

loadEnvFile(path.join(process.cwd(), '.env.local'));
loadEnvFile(path.join(process.cwd(), '.env'));

const projectId = stripQuotes(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID);
const dataset = stripQuotes(process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production');
const apiVersion = stripQuotes(process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-30');
const token = stripQuotes(process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN);

const missing = [];
if (!projectId) missing.push('NEXT_PUBLIC_SANITY_PROJECT_ID');
if (!dataset) missing.push('NEXT_PUBLIC_SANITY_DATASET');
if (!token) missing.push('SANITY_API_WRITE_TOKEN (or SANITY_WRITE_TOKEN)');

if (missing.length > 0) {
  console.error('Missing required Sanity env vars:');
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

const pages = [
  {
    slug: 'services',
    title: 'Services',
    hero: {
      eyebrow: 'Services for Founders',
      titleLine1: 'Get Clear Direction',
      emphasizedTitle: 'and Better Results.',
      description:
        'I help you build a clear strategy, strong systems, and practical execution plans that move your business forward.',
      primaryCta: { label: 'Book Free Call', href: '/contact' },
    },
    sections: [
      {
        id: 'pillars',
        title: 'How I Help You Grow.',
        cards: [
          {
            title: 'Systems That Scale',
            description: 'I help you set up clear systems so your business can grow without daily confusion.',
            bullets: ['Business Model Design', 'Market Positioning Strategy', 'Roadmap Planning', 'Operational Infrastructure'],
          },
          {
            title: 'Smart Workflows',
            description: 'I help you simplify operations and build workflows that save time and improve results.',
            bullets: ['Revenue Systems Design', 'Marketing Funnel Setup', 'Automation Tech Stack', 'Customer Journey Design'],
          },
          {
            title: 'Long-Term Growth',
            description: 'I help you make better decisions so growth stays consistent over time.',
            bullets: ['Growth Loop Engineering', 'Performance Dashboards', 'Tech Setup Advice', 'Scale Readiness Audits'],
          },
        ],
      },
      {
        id: 'quote',
        title: 'Simple systems grow faster. I help you turn complicated ideas into a clear plan that works every day.',
      },
    ],
    finalCta: {
      title: 'Ready to grow with a clear plan?',
      description: "If you want clearer priorities and faster execution, let's map your next steps together.",
      buttonLabel: 'Book Your Call',
      buttonHref: '/contact',
    },
  },
  {
    slug: 'services-webdev',
    title: 'Services - Web Development',
    hero: {
      eyebrow: 'Web Development',
      titleLine1: 'Websites and Apps',
      emphasizedTitle: 'Built to Grow Your Business.',
      description:
        'I design and build high-performing websites, web apps, and mobile apps that help you attract users, convert leads, and scale operations.',
      primaryCta: { label: 'Start Your Project', href: '/contact' },
      secondaryCta: { label: 'See Full Development', href: '/development' },
      imageAlt: 'Web and mobile development',
    },
    sections: [
      {
        id: 'offers',
        title: 'What You Can Hire Me For',
        description: 'Build the right product, with clean execution and less back-and-forth.',
        cards: [
          {
            title: 'Business Websites',
            description: 'Fast, clear websites that explain what you do and convert visitors into leads.',
            bullets: ['Landing pages', 'Company websites', 'SEO-ready structure'],
          },
          {
            title: 'Web Apps',
            description: 'Custom web applications that automate workflows and support growth.',
            bullets: ['Dashboards', 'Admin portals', 'API integrations'],
          },
          {
            title: 'Mobile Apps',
            description: 'Cross-platform apps that give your users a clean, reliable mobile experience.',
            bullets: ['iOS + Android', 'Product strategy support', 'Launch readiness'],
          },
        ],
      },
    ],
    finalCta: {
      title: 'Need web or mobile development support?',
      description: "Let's map your requirements and timeline, then ship something users love.",
      buttonLabel: 'Book a Call',
      buttonHref: '/contact',
    },
  },
  {
    slug: 'development',
    title: 'Development',
    hero: {
      eyebrow: 'Development Services',
      titleLine1: 'Web and Mobile Apps',
      emphasizedTitle: 'Built for Real Growth.',
      description: 'I build websites and applications that are fast, reliable, and aligned with your business goals.',
      primaryCta: { label: 'Start a Project', href: '/contact' },
      secondaryCta: { label: 'Web Development Page', href: '/services/webdev' },
      imageAlt: 'Development showcase',
    },
    sections: [
      {
        id: 'highlights',
        title: 'Highlights',
        items: ['Clear scope before build starts', 'Weekly progress and clean handoff', 'Focus on speed, quality, and usability'],
      },
      {
        id: 'build',
        title: 'What I Build',
        description: 'Choose what fits your stage now. We can expand as your product grows.',
        cards: [
          {
            title: 'Web Development',
            description: 'Conversion-focused websites and web apps built for speed, clarity, and growth.',
            bullets: ['Next.js websites', 'Custom dashboards', 'API and backend integration'],
          },
          {
            title: 'Mobile App Development',
            description: 'Cross-platform apps that help your business reach users on iOS and Android.',
            bullets: ['React Native apps', 'Feature planning', 'Launch support'],
          },
          {
            title: 'Product Build Support',
            description: 'From idea to launch, get technical execution that stays aligned with business goals.',
            bullets: ['MVP planning', 'Architecture decisions', 'Ongoing iterations'],
          },
        ],
      },
      {
        id: 'process',
        title: 'Simple Build Process',
        description: 'No confusing process. Just clear steps and delivery.',
        cards: [
          { title: '01 Scope', description: 'We define the goal, features, and timeline.' },
          { title: '02 Build', description: 'I build in focused milestones with clear updates.' },
          { title: '03 Launch', description: 'We test, ship, and improve based on real usage.' },
        ],
      },
    ],
    finalCta: {
      title: 'Ready to build your next product?',
      buttonLabel: 'Book a Project Call',
      buttonHref: '/contact',
    },
  },
  {
    slug: 'services-startup',
    title: 'Services - Startup',
    hero: {
      eyebrow: 'Startup Consulting',
      titleLine1: 'Grow Your Startup',
      emphasizedTitle: 'With a Clear Plan.',
      description: 'I help founders move from ideas to traction with practical strategy, execution support, and clear priorities.',
      primaryCta: { label: 'Book a Free Call', href: '/contact' },
      secondaryCta: { label: 'View All Services', href: '/services' },
      imageAlt: 'Edison supporting startup founders',
    },
    sections: [
      {
        id: 'services',
        title: 'How I Help Startups',
        description: 'Strategic support that helps you make better decisions and execute faster.',
        cards: [
          { title: 'Business Model Clarity', description: 'Validate your idea, customer segment, and revenue model before you overbuild.' },
          { title: 'Go-To-Market Plan', description: 'Build a practical launch and distribution plan you can execute weekly.' },
          { title: 'Marketing and Sales', description: 'Set up a simple funnel that brings in leads and converts them consistently.' },
          { title: 'Partnership and Funding Readiness', description: 'Prepare your story, numbers, and positioning before partner or investor conversations.' },
        ],
      },
      {
        id: 'wins',
        title: 'What You Get',
        items: ['Clear priorities for your next growth stage', 'Better traction without random experiments', 'A simple plan your team can execute'],
      },
    ],
    finalCta: {
      title: 'Ready to move your startup forward?',
      buttonLabel: 'Start With a Free Call',
      buttonHref: '/contact',
    },
  },
  {
    slug: 'services-leadership',
    title: 'Services - Leadership',
    hero: {
      eyebrow: 'Leadership Coaching',
      titleLine1: 'Lead with Clarity.',
      emphasizedTitle: 'Create Real Impact.',
      description: 'Personalized coaching to help you lead your team better, make stronger decisions, and grow with confidence.',
      primaryCta: { label: 'Book a Call', href: '/contact' },
      secondaryCta: { label: 'View Coaching Page', href: '/coaching' },
      imageAlt: 'Edison coaching leaders',
    },
    sections: [
      {
        id: 'areas',
        title: 'Coaching Focus Areas',
        description: 'Practical leadership support for founders, operators, and team leads.',
        cards: [
          { title: 'Vision and Strategy', description: 'Set clear direction and align your team around what matters most.' },
          { title: 'Communication and Influence', description: 'Improve how you communicate so your team and stakeholders trust your direction.' },
          { title: 'Team Leadership', description: 'Delegate better, build ownership, and improve team accountability.' },
          { title: 'Resilience and Decision-Making', description: 'Lead confidently through pressure, uncertainty, and fast-moving change.' },
        ],
      },
      {
        id: 'outcomes',
        title: 'Outcomes You Should Expect',
        items: ['Stronger leadership presence', 'Better team performance and alignment', 'Clearer decisions under pressure'],
      },
    ],
    finalCta: {
      title: 'Ready to level up your leadership?',
      buttonLabel: 'Schedule a Call',
      buttonHref: '/contact',
    },
  },
  {
    slug: 'coaching',
    title: 'Coaching',
    hero: {
      eyebrow: 'Coaching For Founders',
      titleLine1: 'Get Clarity,',
      emphasizedTitle: 'Then Execute Better.',
      description: 'I coach founders and teams to simplify growth, make better decisions, and build systems that actually work.',
      primaryCta: { label: 'Book a Free Call', href: '/contact' },
      secondaryCta: { label: 'View Services', href: '/services' },
    },
    sections: [
      {
        id: 'areas',
        title: 'What We Work On',
        description: 'Practical support that helps you lead better and grow with less chaos.',
        cards: [
          { title: 'Founder Coaching', description: 'Get help with decisions, focus, and leadership so you can move faster with less stress.' },
          { title: 'Startup Strategy', description: 'Clarify your offer, positioning, and growth plan so your team knows what to execute next.' },
          { title: 'Team Alignment', description: 'Align goals, roles, and execution rhythms so your team ships consistently.' },
          { title: 'Execution Support', description: 'Translate strategy into practical weekly actions you can actually sustain.' },
        ],
      },
      {
        id: 'outcomes',
        title: 'Benefits You Can Feel Quickly',
        items: ['Clear priorities for the next 90 days', 'Simple systems to run your week better', 'More confident decisions and stronger team execution'],
      },
      {
        id: 'session-flow',
        title: 'How Sessions Work',
        items: ['We define your most important goal first.', 'We map a simple weekly execution plan.', 'You leave each call with clear next steps.'],
      },
    ],
    finalCta: {
      title: "If growth feels messy, let's simplify it.",
      buttonLabel: 'Book Your Call',
      buttonHref: '/contact',
    },
  },
  {
    slug: 'speaking',
    title: 'Speaking',
    hero: {
      eyebrow: 'Speaking',
      titleLine1: 'Talks, Podcasts,',
      emphasizedTitle: 'and Live Audio Sessions.',
      description: 'I share practical ideas on growth, systems, leadership, and innovation for teams, founders, and communities.',
      primaryCta: { label: 'Book Speaking', href: '/contact' },
      secondaryCta: { label: 'View Podcast Options', href: '#podcasts' },
      imageAlt: 'Edison speaking at an event',
    },
    sections: [
      {
        id: 'topics',
        title: 'Speaking Topics',
        description: 'Sessions tailored to your audience and business goals.',
        items: ['African Development', 'High-Performing Teams', 'Future of Business', 'Artificial Intelligence', 'Digital Transformation', 'Startup Growth', 'Leadership', 'Marketing and Branding'],
      },
      {
        id: 'podcasts',
        title: 'Podcasts',
        description: 'Available for podcast interviews and host conversations on startup growth, strategy, and leadership.',
        cards: [
          { title: 'Africa Forward', description: "Weekly podcast featuring ideas and leaders shaping Africa's future.", ctaLabel: 'View Podcast Page', ctaHref: '/africaforward' },
          { title: 'Guest Podcast Features', description: 'Invite me to your show for practical conversations your audience can apply immediately.', ctaLabel: 'Invite Me', ctaHref: '/contact' },
        ],
      },
      {
        id: 'spaces',
        title: 'Spaces / Clubhouse',
        description: 'Live audio rooms for real-time conversations on leadership, startups, growth systems, and market opportunities.',
        items: ['Open to collaborations, co-hosts, and curated communities.'],
      },
      {
        id: 'clients',
        title: 'Past Clients and Partners',
        items: ['UNFPA', 'Yalda', 'AIESEC', 'Enactus', 'GhanaTechLab', 'USIU'],
      },
    ],
    finalCta: {
      title: 'Planning a speaking, podcast, or live audio session?',
      buttonLabel: 'Book a Speaking Session',
      buttonHref: '/contact',
    },
  },
  {
    slug: 'africaforward',
    title: 'Africa Forward',
    hero: {
      eyebrow: 'Weekly Podcast',
      titleLine1: 'Africa Forward',
      emphasizedTitle: 'Ideas Moving a Billion People.',
      description: "Africa Forward is a weekly podcast exploring transformative ideas reshaping technology, leadership, business, and culture across the continent.",
      primaryCta: { label: 'Listen Now', href: '#episodes' },
      secondaryCta: { label: 'Join the Community', href: '#community' },
    },
    sections: [
      {
        id: 'why',
        title: 'Why Africa Forward?',
        description: 'Africa is at a tipping point. Breakthrough innovation, unprecedented investments, and visionary leaders are rewriting the story. Africa Forward turns complex trends into clear, actionable insights for founders, leaders, and change-makers.',
        cards: [
          { title: '1B+', description: 'People Reached' },
          { title: '54', description: 'Countries' },
          { title: '100+', description: 'Episodes' },
          { title: 'Weekly', description: 'New Content' },
        ],
      },
      {
        id: 'topics',
        title: 'Topics We Explore',
        description: "Deep dives into the ideas and innovations shaping Africa's future.",
        cards: [
          { title: 'Transform', description: "Discover technology and innovation shaping Africa's future." },
          { title: 'Cultivate', description: 'Explore sustainable agriculture, climate-smart solutions, and food security.' },
          { title: 'Empower', description: 'Master leadership and high-performance team building.' },
          { title: 'Scale', description: 'Understand capital markets, investment opportunities, and policy design for growth.' },
        ],
      },
      {
        id: 'episodes',
        title: 'Latest Episodes',
        description: "Fresh insights and conversations with Africa's most innovative minds.",
        cards: [
          { title: 'Building Digital Public Goods', description: 'A blueprint for open innovation.', badge: 'Latest' },
          { title: 'Climate-Smart Capital', description: 'Investing in sustainable African futures.' },
          { title: 'AfCFTA & Borderless Payments', description: 'New opportunities in pan-African trade.' },
        ],
      },
      {
        id: 'host',
        title: 'Meet Your Host',
        cards: [
          {
            title: 'Edison Ade',
            description: "Leadership coach and strategist helping founders and innovators across Africa scale meaningful ventures, alongside some of the continent's sharpest minds.",
          },
        ],
      },
      {
        id: 'community',
        title: 'Become Part of the Movement',
        cards: [
          {
            title: 'Get the Weekly Playbook',
            description: 'Receive a concise, actionable insight from each episode directly in your inbox.',
            ctaLabel: 'Subscribe',
            ctaHref: '/subscribe',
          },
        ],
      },
      {
        id: 'partners',
        title: 'Partners & Sponsors',
        description: 'Africa Forward is produced by organizations committed to building a prosperous, empowered Africa.',
        items: ['African Recovery', 'Bloop Global'],
      },
    ],
    finalCta: {
      title: 'Join the conversation shaping Africa forward.',
      buttonLabel: 'Subscribe',
      buttonHref: '/subscribe',
    },
  },
  {
    slug: 'contact',
    title: 'Contact',
    hero: {
      eyebrow: "Let's Talk",
      titleLine1: 'Need Help',
      emphasizedTitle: 'Growing?',
      description: 'Book a call to talk about your goals, growth strategy, website, mobile app, or speaking request.',
      primaryCta: { label: 'Book Your Call', href: '/contact' },
    },
    sections: [
      {
        id: 'direct',
        title: 'Direct Contact',
        cards: [{ title: 'Email', description: 'ask@buzzedison.com' }],
      },
      {
        id: 'prep',
        title: 'Before You Book',
        description: 'I work with founders and teams on strategy, websites, mobile apps, and speaking. Add a few details so I can prepare for your call.',
      },
      {
        id: 'booking',
        title: 'Book a Call',
        description: 'Google Calendar Scheduling',
        items: ['45-Minute Call', 'Remote (Google Meet)'],
      },
    ],
    finalCta: {
      title: 'If growth feels messy, we can fix it together.',
      buttonLabel: 'Book Your Call',
      buttonHref: '/contact',
    },
  },
];

function toDocument(page) {
  return cleanObject({
    _id: `marketingPage.${page.slug}`,
    _type: 'marketingPage',
    title: page.title,
    slug: {
      _type: 'slug',
      current: page.slug,
    },
    hero: page.hero,
    sections: page.sections,
    finalCta: page.finalCta,
  });
}

async function run() {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const slugs = pages.map((page) => page.slug);
  const existing = await client.fetch(
    `*[_type == "marketingPage" && slug.current in $slugs]{"slug": slug.current}`,
    { slugs }
  );
  const existingSlugs = new Set(existing.map((entry) => entry.slug));

  let tx = client.transaction();
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const page of pages) {
    const doc = toDocument(page);
    const exists = existingSlugs.has(page.slug);

    if (force) {
      tx = tx.createOrReplace(doc);
      if (exists) updated += 1;
      else created += 1;
      continue;
    }

    if (exists) {
      skipped += 1;
      continue;
    }

    tx = tx.createIfNotExists(doc);
    created += 1;
  }

  if (created + updated === 0) {
    console.log('No changes needed. All marketing pages already exist.');
    console.log(`Skipped: ${skipped}`);
    return;
  }

  await tx.commit();

  console.log(`Seed complete.${force ? ' (force mode)' : ''}`);
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
}

run().catch((error) => {
  console.error('Failed to seed marketing pages:', error?.message || error);
  process.exit(1);
});
