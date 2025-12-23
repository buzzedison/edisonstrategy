'use client';

import { useState } from 'react';
import { Menu, X, Bookmark } from 'lucide-react';
import Link from 'next/link';
import DashboardSidebar from './DashboardSidebar';

interface InsightsWithSidebarProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  headerActions?: React.ReactNode;
  hideBookmarkShortcut?: boolean;
}

const InsightsWithSidebar = ({
  children,
  showSidebar = true,
  headerActions,
  hideBookmarkShortcut = false
}: InsightsWithSidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-brand-stone/30">
      {/* Sidebar - Pure Overlay */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="transition-all duration-300">
        {/* Global Navigation Header */}
        <div className="sticky top-0 z-30 bg-white/50 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-3 group transition-all"
              >
                <div className="p-2 bg-brand-stone rounded-xl group-hover:bg-brand-charcoal group-hover:text-white transition-all shadow-sm border border-gray-100/50">
                  <Menu className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start -space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal">Menu</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-brand-muted group-hover:text-brand-gold transition-colors">Library</span>
                </div>
              </button>
            </div>

            <Link href="/" className="text-xl font-serif font-bold text-brand-charcoal tracking-tight hover:opacity-80 transition-opacity">
              BuzzEdison.
            </Link>

            <div className="flex items-center gap-4">
              {headerActions}
              {!hideBookmarkShortcut && !headerActions && (
                <Link
                  href="/bookmarks"
                  className="p-2 hover:bg-brand-stone rounded-xl transition-colors text-brand-muted hover:text-brand-charcoal"
                  title="Your Bookmarks"
                >
                  <Bookmark className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InsightsWithSidebar; 