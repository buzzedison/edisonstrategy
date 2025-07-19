'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

interface InsightsWithSidebarProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const InsightsWithSidebar = ({ children, showSidebar = true }: InsightsWithSidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isCollapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-80'}`}>
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Insights</h1>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page Content */}
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InsightsWithSidebar; 