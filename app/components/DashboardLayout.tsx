'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-brand-stone/30">
      {/* Sidebar - Unified Overlay */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="transition-all duration-300">
        {/* Top Bar - Premium Unified */}
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
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-brand-muted group-hover:text-brand-gold transition-colors">Dashboard</span>
                </div>
              </button>

              {/* Page title */}
              <div className="hidden sm:block border-l border-gray-100 pl-8">
                {title && (
                  <h1 className="text-xl font-serif font-bold text-brand-charcoal tracking-tight">{title}</h1>
                )}
              </div>
            </div>

            <Link href="/" className="text-xl font-serif font-bold text-brand-charcoal tracking-tight hover:opacity-80 transition-opacity">
              BuzzEdison.
            </Link>

            <div className="flex items-center gap-4">
              {/* Optional dashboard actions */}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 