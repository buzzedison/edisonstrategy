import React from 'react';

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