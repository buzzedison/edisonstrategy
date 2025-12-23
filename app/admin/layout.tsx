"use client";

import { useAuth } from '@/lib/authContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    BookOpen,
    PenTool,
    Settings,
    LogOut,
    ChevronRight,
    BarChart3,
    MessageSquare,
    Library
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const adminNav = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Insights Library', path: '/admin/insights', icon: Library },
    { name: 'New Entry', path: '/admin/insights/new', icon: PenTool },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Comments', path: '/admin/comments', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [initializing, setInitializing] = useState(true);

    const adminEmail = 'buzzedison@gmail.com';
    const isAdmin = user?.email === adminEmail;

    useEffect(() => {
        // Small delay to allow auth state to settle
        const timer = setTimeout(() => {
            setInitializing(false);
            if (!user || !isAdmin) {
                router.push('/signin');
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [user, isAdmin, router]);

    if (initializing) {
        return (
            <div className="min-h-screen bg-brand-stone flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user || !isAdmin) return null;

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex">
            {/* Admin Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 bg-white border-r border-gray-100 transition-all duration-500 z-50",
                isSidebarOpen ? "w-64" : "w-20"
            )}>
                <div className="h-full flex flex-col p-6">
                    <div className="mb-12 flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-charcoal rounded-lg flex items-center justify-center">
                            <span className="text-white font-serif font-bold text-xs">BE</span>
                        </div>
                        {isSidebarOpen && (
                            <span className="font-serif font-bold text-brand-charcoal tracking-tight">Edison.Admin</span>
                        )}
                    </div>

                    <nav className="flex-grow space-y-2">
                        {adminNav.map((item) => {
                            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                                        isActive
                                            ? "bg-brand-stone text-brand-charcoal shadow-sm"
                                            : "text-brand-muted hover:text-brand-charcoal hover:bg-brand-stone/50"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "w-5 h-5 transition-colors",
                                        isActive ? "text-brand-charcoal" : "text-brand-muted group-hover:text-brand-charcoal"
                                    )} />
                                    {isSidebarOpen && (
                                        <span className="text-[11px] font-bold uppercase tracking-widest">{item.name}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-6 border-t border-gray-100 italic font-serif text-[10px] text-brand-muted mb-6">
                        {isSidebarOpen && "Strategic Control Center"}
                    </div>

                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:text-red-600 hover:bg-red-50 transition-all duration-300 mt-auto group"
                    >
                        <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        {isSidebarOpen && (
                            <span className="text-[11px] font-bold uppercase tracking-widest text-inherit">Sign Out</span>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={cn(
                "flex-grow transition-all duration-500 min-h-screen",
                isSidebarOpen ? "pl-64" : "pl-20"
            )}>
                <div className="p-8 lg:p-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
