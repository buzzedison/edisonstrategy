import type { Metadata } from 'next';
import FounderScorecardClient from './FounderScorecardClient';

export const metadata: Metadata = {
  title: 'Founder Bottleneck Scorecard',
  description: 'A free four-minute assessment to find the operating constraint that keeps important work returning to the founder.',
  alternates: { canonical: '/founder-scorecard' },
  openGraph: {
    title: 'Is your company growing—or becoming more dependent on you?',
    description: 'Find your primary founder bottleneck and get a practical seven-day action plan.',
    type: 'website',
  },
};

export default function FounderScorecardPage() {
  return <FounderScorecardClient />;
}
