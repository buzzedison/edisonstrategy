import React from 'react';
import type { Metadata } from 'next';

const title = 'Insights for Founders: Strategy, Systems & Growth';
const description = 'Practical analysis and frameworks from Edison Ade on founder decisions, business systems, product strategy, AI, and sustainable growth.';

export const metadata: Metadata = {
  title,
  description,
  keywords: ['founder insights', 'business strategy articles', 'startup systems', 'AI for business', 'African business'],
  alternates: { canonical: '/insights' },
  openGraph: { title, description, url: '/insights', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="insights-layout">
      {/* You can add common elements for all insight pages here */}
      {children}
    </div>
  );
}
