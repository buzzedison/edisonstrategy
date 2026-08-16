import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

export interface LinkField {
  label: string
  href: string
}

export interface ProblemSection {
  heading: string
  intro: string
  painPoints: string[]
  quote: string
  quoteCta: LinkField
}

export interface PackageItem {
  tag: string
  name: string
  forWhom: string
  description: string
  features: string[]
  outcome: string
  ctaLabel: string
  ctaHref: string
  featured?: boolean
}

export interface PackagesSection {
  eyebrow: string
  title: string
  subtitle: string
  packages: PackageItem[]
}

export interface LandingPageContent {
  seo: {
    personName: string
    websiteUrl: string
    socialLinks: string[]
    jobTitle: string
    organizationName: string
    description: string
  }
  hero: {
    badge: string
    titleLine1: string
    emphasizedTitle: string
    titleLine3: string
    description: string
    helperText: string
    primaryCta: LinkField
    secondaryCta: LinkField
    portraitAlt: string
    portraitImageUrl: string
    backgroundIllustrationUrl: string
    floatingCard: {
      performanceLabel: string
      performancePercent: string
      expertiseValue: string
      expertiseLabel: string
    }
    scrollLabel: string
  }
  trustBarStats: Array<{
    value: string
    label: string
  }>
  brandsSection: {
    eyebrow: string
    title: string
    description: string
    brands: Array<{
      name: string
      website: string
      logoUrl: string
    }>
  }
  frameworksSection: {
    eyebrow: string
    title: string
    emphasizedTitle: string
    cta: LinkField
    ctaHelperText: string
    frameworks: Array<{
      icon: 'trendingUp' | 'brain' | 'target'
      title: string
      description: string
      result: string
    }>
  }
  servicesSection: {
    eyebrow: string
    title: string
    description: string
    primaryCta: LinkField
    services: Array<{
      icon: 'strategy' | 'website' | 'mobile' | 'insights' | 'podcast'
      title: string
      description: string
      outcome: string
      href: string
    }>
  }
  contentHubSection: {
    eyebrow: string
    title: string
    description: string
    items: Array<{
      icon: 'book' | 'mic' | 'insight'
      title: string
      description: string
      href: string
      ctaLabel: string
    }>
  }
  problemSection: ProblemSection
  packagesSection: PackagesSection
  booksSection: {
    badge: string
    title: string
    emphasizedTitle: string
    description: string
    newBadgeLabel: string
    exploreButtonLabel: string
    buyButtonLabel: string
    books: Array<{
      title: string
      description: string
      imageUrl: string
      detailLink: string
      buyLink: string
      rating: number
      category: string
      isNew: boolean
    }>
  }
  testimonialsSection: {
    badge: string
    introTitle: string
    emphasizedTitle: string
    description: string
    testimonials: Array<{
      quote: string
      name: string
      role: string
    }>
    endingCard: {
      title: string
      description: string
      cta: LinkField
    }
  }
  aboutSection: {
    badge: string
    titleLine1: string
    titleLine2: string
    quote: string
    description: string
    tags: string[]
    cta: LinkField
    imageAlt: string
    imageUrl: string
    stats: Array<{
      value: string
      label: string
    }>
  }
  insightsSection: {
    badge: string
    titleLine1: string
    emphasizedTitle: string
    viewAllLink: LinkField
    cards: Array<{
      title: string
      excerpt: string
      href: string
      date: string
      readTime: string
      imageUrl: string
    }>
  }
  finalCtaSection: {
    badge: string
    titleLine1: string
    titleLine2: string
    description: string
    primaryCta: LinkField
    secondaryCta: LinkField
    checklist: string[]
    visualYearText: string
    visualLabel: string
  }
}

export const defaultLandingPageContent: LandingPageContent = {
  seo: {
    personName: 'Edison Ade',
    websiteUrl: 'https://www.buzzedison.com',
    socialLinks: ['https://twitter.com/buzzedison', 'https://linkedin.com/in/buzzedison'],
    jobTitle: 'Business Growth Strategist',
    organizationName: 'The Enterprise Village',
    description: 'I help founders turn hard-won momentum into a business that can make better decisions, move faster, and grow beyond them.',
  },
  hero: {
    badge: 'Founder, operator and strategy partner · Accra → Worldwide',
    titleLine1: 'Your business has outgrown',
    emphasizedTitle: 'guesswork.',
    titleLine3: '',
    description:
      'When every important decision still lands on your desk, growth becomes a more expensive version of chaos. I help you turn hard-won momentum into a company that can think, sell, and move without waiting on you.',
    helperText: 'Bring the messy version. We’ll find the signal.',
    primaryCta: {
      label: 'Find the Real Constraint',
      href: '/contact',
    },
    secondaryCta: {
      label: 'See How I Work',
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
    { value: '7', label: 'Companies Built' },
    { value: '7,400+', label: 'Founders Trained' },
    { value: '15', label: 'Countries Reached' },
    { value: '$5M+', label: 'Capital Raised' },
  ],
  brandsSection: {
    eyebrow: 'Built & Backed',
    title: 'Trusted by founders, teams, and growth-focused brands',
    description:
      'I partner with startups and organizations that want clear strategy, stronger execution, and high-performing websites and mobile apps.',
    brands: [
      { name: 'Bloop Global', website: '/about', logoUrl: '' },
      { name: 'The Enterprise Village', website: '/about', logoUrl: '' },
      { name: 'FundDesk', website: '/ventures', logoUrl: '' },
      { name: 'TaskWit', website: '/ventures', logoUrl: '' },
      { name: 'CrowdPen', website: '/ventures', logoUrl: '' },
      { name: 'AgriPro', website: '/ventures', logoUrl: '' },
    ],
  },
  frameworksSection: {
    eyebrow: 'How It Works',
    title: 'From chaos to a system,',
    emphasizedTitle: 'in three moves.',
    cta: {
      label: 'Book a Free Strategy Call',
      href: '/contact',
    },
    ctaHelperText: 'You leave with next steps — even if we never work together.',
    frameworks: [
      {
        icon: 'target',
        title: 'Diagnose',
        description: 'We find the one constraint actually holding you back — not the ten fake problems hiding it.',
        result: 'One clear priority',
      },
      {
        icon: 'brain',
        title: 'Design',
        description: 'We build your 90-day plan and the systems to run it: offer, pricing, funnel, and team workflows.',
        result: 'A plan your team can execute',
      },
      {
        icon: 'trendingUp',
        title: 'Execute',
        description: 'We work it together, week by week, until growth is repeatable — not random.',
        result: 'Revenue that compounds',
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
  problemSection: {
    heading: "You're not stuck. You're scattered.",
    intro: "You're smart. You work hard. Revenue is coming in — but growth feels random, and you can't tell if the problem is your team, your offer, your market, or you.",
    painPoints: [
      'Revenue is coming in, but growth feels like luck — not a system.',
      'Your team is busy all day, yet the needle-moving work never gets done.',
      'Every big decision still runs on gut feeling and crossed fingers.',
      "You've read the books and done the courses. You're still circling.",
    ],
    quote: "The founders who break through aren't the ones working harder. They're the ones who finally get clear.",
    quoteCta: { label: "Let's get you clear", href: '/contact' },
  },
  packagesSection: {
    eyebrow: 'Work With Me',
    title: 'Three ways to work together.',
    subtitle: 'Custom pricing. Every engagement starts with a free strategy call.',
    packages: [
      {
        tag: '4 Weeks',
        name: 'Accelerator Sprint',
        forWhom: 'Founders with traction, too many priorities, and no clean answer to “what now?”',
        description: 'Four exacting weeks to pressure-test the opportunity, sharpen the position, and turn a crowded strategy into one decisive 90-day move.',
        features: [
          'Business model validation',
          'Market positioning — who this is for, and why you',
          'Go-to-market roadmap — first, next, and later',
          'Strategic priority support',
        ],
        outcome: 'You leave knowing exactly what your next 90 days look like.',
        ctaLabel: 'Find Your Next Move',
        ctaHref: '/contact',
        featured: false,
      },
      {
        tag: '8 Weeks',
        name: 'MVP Builder',
        forWhom: 'Non-technical founders who need to ship the right product before they spend on the wrong one.',
        description: 'We translate the business case into a lean product: the right scope, the right architecture, and a launch built to learn—not just look finished.',
        features: [
          'Full tech architecture for your business needs',
          'Lean development — build what matters',
          'Market launch support',
          'Post-launch iteration framework',
        ],
        outcome: 'A market-ready product built for real users — not a demo.',
        ctaLabel: 'Apply for MVP Builder',
        ctaHref: '/contact',
        featured: true,
      },
      {
        tag: 'Quarterly Retainer',
        name: 'Strategy Partner',
        forWhom: 'Founders carrying the company’s hardest decisions alone.',
        description: 'A weekly operating partnership for the decisions that do not fit neatly inside a department: growth, product, systems, and what to stop doing.',
        features: [
          'Weekly strategy sessions',
          'Go-to-market execution — co-pilot level',
          'Custom revenue systems',
          'Performance dashboards',
        ],
        outcome: 'A business that runs on systems, not on you.',
        ctaLabel: 'Apply for Strategy Partner',
        ctaHref: '/contact',
        featured: false,
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
    introTitle: 'Founders come for strategy.',
    emphasizedTitle: 'They stay for results.',
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
        quote:
          'Every session gave us clear actions we could apply immediately. Huge value.',
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
      label: 'Why I Do This',
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
    titleLine1: 'The next move should',
    titleLine2: 'make the rest easier.',
    description: 'Bring the decision that has been circling your head. We’ll name the real constraint and leave you with a clearer next move.',
    primaryCta: {
      label: 'Bring Me the Problem',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Get Weekly Insights',
      href: '/subscribe',
    },
    checklist: ['Free 30-minute call', 'Leave with a written action plan', 'No pitch, no pressure'],
    visualYearText: 'GROW',
    visualLabel: 'Business Clarity',
  },
}

const LANDING_PAGE_QUERY = groq`*[_type == "landingPage" && _id == "landingPage"][0]{
  seo{
    personName,
    websiteUrl,
    socialLinks,
    jobTitle,
    organizationName,
    description
  },
  hero{
    badge,
    titleLine1,
    emphasizedTitle,
    titleLine3,
    description,
    helperText,
    primaryCta{label, href},
    secondaryCta{label, href},
    portraitAlt,
    "portraitImageUrl": portraitImage.asset->url,
    "backgroundIllustrationUrl": backgroundIllustration.asset->url,
    floatingCard{
      performanceLabel,
      performancePercent,
      expertiseValue,
      expertiseLabel
    },
    scrollLabel
  },
  trustBarStats[]{value, label},
  brandsSection{
    eyebrow,
    title,
    description,
    brands[]{
      name,
      website,
      "logoUrl": logo.asset->url
    }
  },
  frameworksSection{
    eyebrow,
    title,
    emphasizedTitle,
    cta{label, href},
    ctaHelperText,
    frameworks[]{icon, title, description, result}
  },
  servicesSection{
    eyebrow,
    title,
    description,
    primaryCta{label, href},
    services[]{icon, title, description, outcome, href}
  },
  contentHubSection{
    eyebrow,
    title,
    description,
    items[]{icon, title, description, href, ctaLabel}
  },
  booksSection{
    badge,
    title,
    emphasizedTitle,
    description,
    newBadgeLabel,
    exploreButtonLabel,
    buyButtonLabel,
    books[]{
      title,
      description,
      "imageUrl": image.asset->url,
      detailLink,
      buyLink,
      rating,
      category,
      isNew
    }
  },
  problemSection{
    heading,
    intro,
    painPoints,
    quote,
    quoteCta{label, href}
  },
  packagesSection{
    eyebrow,
    title,
    subtitle,
    packages[]{tag, name, forWhom, description, features, outcome, ctaLabel, ctaHref, featured}
  },
  testimonialsSection{
    badge,
    introTitle,
    emphasizedTitle,
    description,
    testimonials[]{quote, name, role},
    endingCard{
      title,
      description,
      cta{label, href}
    }
  },
  aboutSection{
    badge,
    titleLine1,
    titleLine2,
    quote,
    description,
    tags,
    cta{label, href},
    imageAlt,
    "imageUrl": image.asset->url,
    stats[]{value, label}
  },
  insightsSection{
    badge,
    titleLine1,
    emphasizedTitle,
    viewAllLink{label, href},
    cards[]{
      title,
      excerpt,
      href,
      date,
      readTime,
      "imageUrl": image.asset->url
    }
  },
  finalCtaSection{
    badge,
    titleLine1,
    titleLine2,
    description,
    primaryCta{label, href},
    secondaryCta{label, href},
    checklist,
    visualYearText,
    visualLabel
  }
}`

const pickArray = <T>(value: T[] | undefined, fallback: T[]) => {
  return value && value.length > 0 ? value : fallback
}

export function mergeLandingPageContent(
  content?: Partial<LandingPageContent> | null
): LandingPageContent {
  return {
    seo: {
      ...defaultLandingPageContent.seo,
      ...(content?.seo ?? {}),
      socialLinks: pickArray(content?.seo?.socialLinks, defaultLandingPageContent.seo.socialLinks),
    },
    hero: {
      ...defaultLandingPageContent.hero,
      ...(content?.hero ?? {}),
      primaryCta: {
        ...defaultLandingPageContent.hero.primaryCta,
        ...(content?.hero?.primaryCta ?? {}),
      },
      secondaryCta: {
        ...defaultLandingPageContent.hero.secondaryCta,
        ...(content?.hero?.secondaryCta ?? {}),
      },
      floatingCard: {
        ...defaultLandingPageContent.hero.floatingCard,
        ...(content?.hero?.floatingCard ?? {}),
      },
    },
    trustBarStats: pickArray(content?.trustBarStats, defaultLandingPageContent.trustBarStats),
    brandsSection: {
      ...defaultLandingPageContent.brandsSection,
      ...(content?.brandsSection ?? {}),
      brands: pickArray(content?.brandsSection?.brands, defaultLandingPageContent.brandsSection.brands),
    },
    frameworksSection: {
      ...defaultLandingPageContent.frameworksSection,
      ...(content?.frameworksSection ?? {}),
      cta: {
        ...defaultLandingPageContent.frameworksSection.cta,
        ...(content?.frameworksSection?.cta ?? {}),
      },
      frameworks: pickArray(
        content?.frameworksSection?.frameworks,
        defaultLandingPageContent.frameworksSection.frameworks
      ),
    },
    servicesSection: {
      ...defaultLandingPageContent.servicesSection,
      ...(content?.servicesSection ?? {}),
      primaryCta: {
        ...defaultLandingPageContent.servicesSection.primaryCta,
        ...(content?.servicesSection?.primaryCta ?? {}),
      },
      services: pickArray(content?.servicesSection?.services, defaultLandingPageContent.servicesSection.services),
    },
    contentHubSection: {
      ...defaultLandingPageContent.contentHubSection,
      ...(content?.contentHubSection ?? {}),
      items: pickArray(content?.contentHubSection?.items, defaultLandingPageContent.contentHubSection.items),
    },
    problemSection: {
      ...defaultLandingPageContent.problemSection,
      ...(content?.problemSection ?? {}),
      painPoints: pickArray(content?.problemSection?.painPoints, defaultLandingPageContent.problemSection.painPoints),
      quoteCta: {
        ...defaultLandingPageContent.problemSection.quoteCta,
        ...(content?.problemSection?.quoteCta ?? {}),
      },
    },
    packagesSection: {
      ...defaultLandingPageContent.packagesSection,
      ...(content?.packagesSection ?? {}),
      packages: pickArray(content?.packagesSection?.packages, defaultLandingPageContent.packagesSection.packages),
    },
    booksSection: {
      ...defaultLandingPageContent.booksSection,
      ...(content?.booksSection ?? {}),
      books: pickArray(content?.booksSection?.books, defaultLandingPageContent.booksSection.books),
    },
    testimonialsSection: {
      ...defaultLandingPageContent.testimonialsSection,
      ...(content?.testimonialsSection ?? {}),
      testimonials: pickArray(
        content?.testimonialsSection?.testimonials,
        defaultLandingPageContent.testimonialsSection.testimonials
      ),
      endingCard: {
        ...defaultLandingPageContent.testimonialsSection.endingCard,
        ...(content?.testimonialsSection?.endingCard ?? {}),
        cta: {
          ...defaultLandingPageContent.testimonialsSection.endingCard.cta,
          ...(content?.testimonialsSection?.endingCard?.cta ?? {}),
        },
      },
    },
    aboutSection: {
      ...defaultLandingPageContent.aboutSection,
      ...(content?.aboutSection ?? {}),
      tags: pickArray(content?.aboutSection?.tags, defaultLandingPageContent.aboutSection.tags),
      cta: {
        ...defaultLandingPageContent.aboutSection.cta,
        ...(content?.aboutSection?.cta ?? {}),
      },
      stats: pickArray(content?.aboutSection?.stats, defaultLandingPageContent.aboutSection.stats),
    },
    insightsSection: {
      ...defaultLandingPageContent.insightsSection,
      ...(content?.insightsSection ?? {}),
      viewAllLink: {
        ...defaultLandingPageContent.insightsSection.viewAllLink,
        ...(content?.insightsSection?.viewAllLink ?? {}),
      },
      cards: pickArray(content?.insightsSection?.cards, defaultLandingPageContent.insightsSection.cards),
    },
    finalCtaSection: {
      ...defaultLandingPageContent.finalCtaSection,
      ...(content?.finalCtaSection ?? {}),
      primaryCta: {
        ...defaultLandingPageContent.finalCtaSection.primaryCta,
        ...(content?.finalCtaSection?.primaryCta ?? {}),
      },
      secondaryCta: {
        ...defaultLandingPageContent.finalCtaSection.secondaryCta,
        ...(content?.finalCtaSection?.secondaryCta ?? {}),
      },
      checklist: pickArray(
        content?.finalCtaSection?.checklist,
        defaultLandingPageContent.finalCtaSection.checklist
      ),
    },
  }
}

export async function getLandingPageContent(): Promise<LandingPageContent> {
  try {
    const data = await client.fetch<Partial<LandingPageContent> | null>(LANDING_PAGE_QUERY)
    return mergeLandingPageContent(data)
  } catch (error) {
    console.error('Failed to fetch landing page content from Sanity:', error)
    return defaultLandingPageContent
  }
}
