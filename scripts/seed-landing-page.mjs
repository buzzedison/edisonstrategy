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

function makeKey(prefix, index) {
  return `${prefix}-${index + 1}`;
}

function resolvePublicAssetPath(urlPath) {
  if (typeof urlPath !== 'string' || urlPath.length === 0) return null;
  if (/^https?:\/\//i.test(urlPath)) return null;

  const normalized = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
  const noPublicPrefix = normalized.startsWith('public/')
    ? normalized.slice('public/'.length)
    : normalized;

  return path.join(process.cwd(), 'public', noPublicPrefix);
}

const imageRefCache = new Map();

async function uploadImageAsset(client, imagePath, missingImages) {
  if (!imagePath) return undefined;

  const localPath = resolvePublicAssetPath(imagePath);
  if (!localPath) return undefined;

  if (!fs.existsSync(localPath)) {
    missingImages.add(imagePath);
    return undefined;
  }

  if (imageRefCache.has(localPath)) {
    return imageRefCache.get(localPath);
  }

  const asset = await client.assets.upload('image', fs.createReadStream(localPath), {
    filename: path.basename(localPath),
  });

  const ref = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };

  imageRefCache.set(localPath, ref);
  return ref;
}

const args = process.argv.slice(2);
const force = args.includes('--force');
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
  console.log(`Seed full landing page singleton into Sanity, including image assets.\n\nUsage:\n  npm run seed:landing-page\n  npm run seed:landing-page -- --force\n\nEnv required:\n  NEXT_PUBLIC_SANITY_PROJECT_ID\n  NEXT_PUBLIC_SANITY_DATASET\n  SANITY_API_WRITE_TOKEN (or SANITY_WRITE_TOKEN)\n`);
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

const landingDefaults = {
  seo: {
    personName: 'Edison Ade',
    websiteUrl: 'https://www.buzzedison.com',
    socialLinks: ['https://twitter.com/buzzedison', 'https://linkedin.com/in/buzzedison'],
    jobTitle: 'Business Growth Strategist',
    organizationName: 'The Enterprise Village',
    description: 'I help founders grow with simple systems, strong execution, and practical insights.',
  },
  hero: {
    badge: 'For Founders Who Want Real Growth',
    titleLine1: 'Grow Faster with',
    emphasizedTitle: 'Simple Systems',
    titleLine3: 'and Better Execution',
    description:
      'I help you fix business chaos, build smarter workflows, and grow revenue without burning out your team.',
    helperText: 'Free 30-min strategy call - Clear next steps',
    primaryCta: {
      label: 'Book a Free Strategy Call',
      href: '/contact',
    },
    secondaryCta: {
      label: 'See Services',
      href: '/services',
    },
    portraitAlt: 'Edison Ade - Business Growth Strategist',
    portraitImageUrl: '/image/edisonaboutnew.jpg',
    backgroundIllustrationUrl: '/image/systems-illustration.png',
    floatingCard: {
      performanceLabel: 'Growth Score',
      performancePercent: '82%',
      expertiseValue: '15+ Years',
      expertiseLabel: 'Building and scaling businesses',
    },
    scrollLabel: 'Scroll',
  },
  trustBarStats: [
    { value: '15+', label: 'Years Experience' },
    { value: '$5M+', label: 'Capital Raised' },
    { value: '50+', label: 'Startups Advised' },
    { value: '10k+', label: 'People Impacted' },
  ],
  brandsSection: {
    eyebrow: 'Brands I Work With',
    title: 'Trusted by founders, teams, and growth-focused brands',
    description:
      'I partner with startups and organizations that want clear strategy, stronger execution, and high-performing websites and mobile apps.',
    brands: [
      { name: 'The Enterprise Village', website: '/about', logoUrl: '' },
      { name: 'Bloop Global', website: '/about', logoUrl: '' },
      { name: 'GrowthSaaS', website: '/services', logoUrl: '' },
      { name: 'FutureScale', website: '/services', logoUrl: '' },
    ],
  },
  frameworksSection: {
    eyebrow: 'What You Get',
    title: 'Clear Plan.',
    emphasizedTitle: 'Better Results.',
    cta: {
      label: 'Start with a Free Call',
      href: '/contact',
    },
    ctaHelperText: 'No pressure - You leave with actionable next steps',
    frameworks: [
      {
        icon: 'target',
        title: 'Clear Growth Plan',
        description: 'You get a simple roadmap for what to do first, next, and later.',
        result: 'Less guesswork, faster decisions',
      },
      {
        icon: 'brain',
        title: 'Smarter Systems',
        description: 'You get workflows that save time and reduce daily business stress.',
        result: 'More output with less chaos',
      },
      {
        icon: 'trendingUp',
        title: 'Consistent Growth',
        description: 'You get practical structure that helps you scale without breaking your team.',
        result: 'Stronger revenue and execution',
      },
    ],
  },
  servicesSection: {
    eyebrow: 'Services',
    title: 'How I can help your business',
    description: 'Pick what you need right now. Every service is focused on measurable outcomes.',
    primaryCta: {
      label: 'View All Services',
      href: '/services',
    },
    services: [
      {
        icon: 'strategy',
        title: 'Growth Strategy',
        description: 'Build a practical 90-day growth plan with clear priorities.',
        outcome: 'Know exactly what to do next',
        href: '/consulting',
      },
      {
        icon: 'website',
        title: 'Website Development',
        description: 'Build high-converting websites that communicate value and drive leads.',
        outcome: 'More qualified inquiries and trust',
        href: '/services/webdev',
      },
      {
        icon: 'mobile',
        title: 'Mobile App Development',
        description: 'Plan and build mobile apps with clean UX and business goals in mind.',
        outcome: 'Ship faster with fewer mistakes',
        href: '/development',
      },
      {
        icon: 'insights',
        title: 'Founder Coaching',
        description: 'Work through blockers, improve execution, and lead with clarity.',
        outcome: 'Better leadership and team focus',
        href: '/coaching',
      },
      {
        icon: 'podcast',
        title: 'Podcast and Speaking',
        description: 'Book me to share practical growth, systems, and founder lessons.',
        outcome: 'Give your audience useful, actionable ideas',
        href: '/speaking',
      },
    ],
  },
  contentHubSection: {
    eyebrow: 'Learn From Me',
    title: 'Books, podcast conversations, and practical insights',
    description: 'If you are not ready to work together yet, start here.',
    items: [
      {
        icon: 'book',
        title: 'Books',
        description: 'Deep guides on writing, pricing, and strategic thinking.',
        href: '/books',
        ctaLabel: 'Explore Books',
      },
      {
        icon: 'mic',
        title: 'Podcast and Speaking',
        description: 'Conversations and talks on growth, systems, and leadership.',
        href: '/speaking',
        ctaLabel: 'See Speaking Topics',
      },
      {
        icon: 'insight',
        title: 'Insights',
        description: 'Short, practical articles you can apply to your business this week.',
        href: '/insights',
        ctaLabel: 'Read Insights',
      },
    ],
  },
  booksSection: {
    badge: 'Books',
    title: 'Strategic',
    emphasizedTitle: 'Library',
    description: 'Books to help you think better, move faster, and build a stronger business.',
    newBadgeLabel: 'New',
    exploreButtonLabel: 'Read Summary',
    buyButtonLabel: 'Buy Now',
    books: [
      {
        title: 'Write Without Limits',
        description: 'Simple frameworks to turn ideas into books people finish and recommend.',
        imageUrl: '/image/writewithout.png',
        detailLink: '/books/writershandbook',
        buyLink: 'https://paystack.com/buy/write-without-limits-ebook',
        rating: 4.9,
        category: 'Writing',
        isNew: true,
      },
      {
        title: 'Pricing Strategy',
        description: 'Learn how to price for growth, margin, and customer trust.',
        imageUrl: '/image/pricingbook.webp',
        detailLink: '/books/pricing',
        buyLink: 'https://buzzedison.gumroad.com/l/pricingstrategy',
        rating: 4.8,
        category: 'Business',
        isNew: false,
      },
      {
        title: 'The Art of Inversion',
        description: 'A practical way to solve hard problems by thinking from the end result backwards.',
        imageUrl: '/image/inversion.png',
        detailLink: '/books/inversion',
        buyLink: 'https://buzzedison.gumroad.com/l/inversion',
        rating: 4.6,
        category: 'Decision Making',
        isNew: false,
      },
    ],
  },
  testimonialsSection: {
    badge: 'Client Results',
    introTitle: 'Founders trust me for',
    emphasizedTitle: 'clarity and execution',
    description: 'Real feedback from people I have worked with.',
    testimonials: [
      {
        quote:
          'Edison helped us simplify our strategy. We moved faster and closed key deals in the next quarter.',
        name: 'Sarah Johnson',
        role: 'Founder, TechStartup',
      },
      {
        quote:
          'We were stuck. His systems approach gave us structure and helped us scale without chaos.',
        name: 'Michael Chen',
        role: 'CEO, GrowthSaaS',
      },
      {
        quote: 'Every session gave us clear actions we could apply immediately. Huge value.',
        name: 'Amina Hassan',
        role: 'Co-Founder, FinTech App',
      },
    ],
    endingCard: {
      title: 'Ready to grow with clarity?',
      description: 'Let us map your next 90 days together.',
      cta: {
        label: 'Book a Call',
        href: '/contact',
      },
    },
  },
  aboutSection: {
    badge: 'About',
    titleLine1: 'Helping Founders',
    titleLine2: 'Build Better Businesses',
    quote: 'Simple systems help good ideas become real results.',
    description:
      'I work with founders and teams to build clear strategy, smart systems, and strong execution habits.',
    tags: ['Strategy', 'Systems', 'Execution', 'Leadership'],
    cta: {
      label: 'Read My Story',
      href: '/about',
    },
    imageAlt: 'Edison Ade',
    imageUrl: '/image/edisonaboutnew.jpg',
    stats: [
      { value: '15+', label: 'Years of Experience' },
      { value: '$5M+', label: 'Capital Raised' },
      { value: '10k+', label: 'People Reached' },
    ],
  },
  insightsSection: {
    badge: 'Latest Insights',
    titleLine1: 'Practical',
    emphasizedTitle: 'Insights',
    viewAllLink: {
      label: 'View All Insights',
      href: '/insights',
    },
    cards: [],
  },
  finalCtaSection: {
    badge: 'Next Step',
    titleLine1: 'Want Better Growth',
    titleLine2: 'Without the Chaos?',
    description: 'Book a free strategy call and leave with a clear plan you can execute.',
    primaryCta: {
      label: 'Book a Free Call',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Get Weekly Insights',
      href: '/subscribe',
    },
    checklist: ['Free 30-min call', 'Clear action plan', 'No pressure to commit'],
    visualYearText: 'GROW',
    visualLabel: 'Business Clarity',
  },
};

async function buildLandingPageDoc(client) {
  const missingImages = new Set();

  const heroPortraitImage = await uploadImageAsset(client, landingDefaults.hero.portraitImageUrl, missingImages);
  const heroBackgroundIllustration = await uploadImageAsset(
    client,
    landingDefaults.hero.backgroundIllustrationUrl,
    missingImages
  );

  const brandEntries = await Promise.all(
    landingDefaults.brandsSection.brands.map(async (brand, index) => {
      const logo = await uploadImageAsset(client, brand.logoUrl, missingImages);
      return cleanObject({
        _type: 'object',
        _key: makeKey('brand', index),
        name: brand.name,
        website: brand.website,
        logo,
      });
    })
  );

  const bookEntries = await Promise.all(
    landingDefaults.booksSection.books.map(async (book, index) => {
      const image = await uploadImageAsset(client, book.imageUrl, missingImages);
      return cleanObject({
        _type: 'object',
        _key: makeKey('book', index),
        title: book.title,
        description: book.description,
        image,
        detailLink: book.detailLink,
        buyLink: book.buyLink,
        rating: book.rating,
        category: book.category,
        isNew: book.isNew,
      });
    })
  );

  const insightCards = await Promise.all(
    landingDefaults.insightsSection.cards.map(async (card, index) => {
      const image = await uploadImageAsset(client, card.imageUrl, missingImages);
      return cleanObject({
        _type: 'object',
        _key: makeKey('insight-card', index),
        title: card.title,
        excerpt: card.excerpt,
        href: card.href,
        date: card.date,
        readTime: card.readTime,
        image,
      });
    })
  );

  const aboutImage = await uploadImageAsset(client, landingDefaults.aboutSection.imageUrl, missingImages);

  const landingPageDoc = cleanObject({
    _id: 'landingPage',
    _type: 'landingPage',

    seo: { ...landingDefaults.seo },

    hero: {
      badge: landingDefaults.hero.badge,
      titleLine1: landingDefaults.hero.titleLine1,
      emphasizedTitle: landingDefaults.hero.emphasizedTitle,
      titleLine3: landingDefaults.hero.titleLine3,
      description: landingDefaults.hero.description,
      helperText: landingDefaults.hero.helperText,
      primaryCta: { ...landingDefaults.hero.primaryCta },
      secondaryCta: { ...landingDefaults.hero.secondaryCta },
      portraitImage: heroPortraitImage,
      portraitAlt: landingDefaults.hero.portraitAlt,
      backgroundIllustration: heroBackgroundIllustration,
      floatingCard: { ...landingDefaults.hero.floatingCard },
      scrollLabel: landingDefaults.hero.scrollLabel,
    },

    trustBarStats: landingDefaults.trustBarStats.map((stat, index) => ({
      _type: 'object',
      _key: makeKey('trust-stat', index),
      value: stat.value,
      label: stat.label,
    })),

    brandsSection: {
      eyebrow: landingDefaults.brandsSection.eyebrow,
      title: landingDefaults.brandsSection.title,
      description: landingDefaults.brandsSection.description,
      brands: brandEntries,
    },

    frameworksSection: {
      eyebrow: landingDefaults.frameworksSection.eyebrow,
      title: landingDefaults.frameworksSection.title,
      emphasizedTitle: landingDefaults.frameworksSection.emphasizedTitle,
      cta: { ...landingDefaults.frameworksSection.cta },
      ctaHelperText: landingDefaults.frameworksSection.ctaHelperText,
      frameworks: landingDefaults.frameworksSection.frameworks.map((framework, index) => ({
        _type: 'object',
        _key: makeKey('framework', index),
        icon: framework.icon,
        title: framework.title,
        description: framework.description,
        result: framework.result,
      })),
    },

    servicesSection: {
      eyebrow: landingDefaults.servicesSection.eyebrow,
      title: landingDefaults.servicesSection.title,
      description: landingDefaults.servicesSection.description,
      primaryCta: { ...landingDefaults.servicesSection.primaryCta },
      services: landingDefaults.servicesSection.services.map((service, index) => ({
        _type: 'object',
        _key: makeKey('service', index),
        icon: service.icon,
        title: service.title,
        description: service.description,
        outcome: service.outcome,
        href: service.href,
      })),
    },

    contentHubSection: {
      eyebrow: landingDefaults.contentHubSection.eyebrow,
      title: landingDefaults.contentHubSection.title,
      description: landingDefaults.contentHubSection.description,
      items: landingDefaults.contentHubSection.items.map((item, index) => ({
        _type: 'object',
        _key: makeKey('content-item', index),
        icon: item.icon,
        title: item.title,
        description: item.description,
        href: item.href,
        ctaLabel: item.ctaLabel,
      })),
    },

    booksSection: {
      badge: landingDefaults.booksSection.badge,
      title: landingDefaults.booksSection.title,
      emphasizedTitle: landingDefaults.booksSection.emphasizedTitle,
      description: landingDefaults.booksSection.description,
      newBadgeLabel: landingDefaults.booksSection.newBadgeLabel,
      exploreButtonLabel: landingDefaults.booksSection.exploreButtonLabel,
      buyButtonLabel: landingDefaults.booksSection.buyButtonLabel,
      books: bookEntries,
    },

    testimonialsSection: {
      badge: landingDefaults.testimonialsSection.badge,
      introTitle: landingDefaults.testimonialsSection.introTitle,
      emphasizedTitle: landingDefaults.testimonialsSection.emphasizedTitle,
      description: landingDefaults.testimonialsSection.description,
      testimonials: landingDefaults.testimonialsSection.testimonials.map((testimonial, index) => ({
        _type: 'object',
        _key: makeKey('testimonial', index),
        quote: testimonial.quote,
        name: testimonial.name,
        role: testimonial.role,
      })),
      endingCard: {
        title: landingDefaults.testimonialsSection.endingCard.title,
        description: landingDefaults.testimonialsSection.endingCard.description,
        cta: { ...landingDefaults.testimonialsSection.endingCard.cta },
      },
    },

    aboutSection: {
      badge: landingDefaults.aboutSection.badge,
      titleLine1: landingDefaults.aboutSection.titleLine1,
      titleLine2: landingDefaults.aboutSection.titleLine2,
      quote: landingDefaults.aboutSection.quote,
      description: landingDefaults.aboutSection.description,
      tags: [...landingDefaults.aboutSection.tags],
      cta: { ...landingDefaults.aboutSection.cta },
      image: aboutImage,
      imageAlt: landingDefaults.aboutSection.imageAlt,
      stats: landingDefaults.aboutSection.stats.map((stat, index) => ({
        _type: 'object',
        _key: makeKey('about-stat', index),
        value: stat.value,
        label: stat.label,
      })),
    },

    insightsSection: {
      badge: landingDefaults.insightsSection.badge,
      titleLine1: landingDefaults.insightsSection.titleLine1,
      emphasizedTitle: landingDefaults.insightsSection.emphasizedTitle,
      viewAllLink: { ...landingDefaults.insightsSection.viewAllLink },
      cards: insightCards,
    },

    finalCtaSection: {
      badge: landingDefaults.finalCtaSection.badge,
      titleLine1: landingDefaults.finalCtaSection.titleLine1,
      titleLine2: landingDefaults.finalCtaSection.titleLine2,
      description: landingDefaults.finalCtaSection.description,
      primaryCta: { ...landingDefaults.finalCtaSection.primaryCta },
      secondaryCta: { ...landingDefaults.finalCtaSection.secondaryCta },
      checklist: [...landingDefaults.finalCtaSection.checklist],
      visualYearText: landingDefaults.finalCtaSection.visualYearText,
      visualLabel: landingDefaults.finalCtaSection.visualLabel,
    },
  });

  return {
    landingPageDoc,
    missingImages: [...missingImages],
  };
}

async function run() {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const existing = await client.getDocument('landingPage');

  if (!force && existing) {
    console.log('Landing page document already exists. Skipping (use --force to overwrite).');
    return;
  }

  const { landingPageDoc, missingImages } = await buildLandingPageDoc(client);

  if (force) {
    await client.createOrReplace(landingPageDoc);
    console.log('Landing page seeded (replaced existing document).');
  } else {
    await client.createIfNotExists(landingPageDoc);
    console.log('Landing page seeded (created singleton).');
  }

  console.log(`Image assets linked: ${imageRefCache.size}`);

  if (missingImages.length > 0) {
    console.log('Missing local images (skipped):');
    for (const imagePath of missingImages) {
      console.log(`- ${imagePath}`);
    }
  }
}

run().catch((error) => {
  console.error('Failed to seed landing page:', error?.message || error);
  process.exit(1);
});
