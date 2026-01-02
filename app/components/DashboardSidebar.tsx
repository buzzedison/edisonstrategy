'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';
import {
  BookOpen,
  Bookmark,
  User,
  Settings,
  LogOut,
  LogIn,
  Home,
  TrendingUp,
  MessageCircle,
  Bell,
  Search,
  PlusCircle,
  BarChart3,
  Shield,
  Menu,
  X,
  Heart,
  Eye,
  Calendar,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

// Mock user - replace with your actual auth system
const mockUser = {
  id: '1',
  name: 'Edison Ade',
  email: 'edison@buzzedison.com',
  avatar: '/image/edison.png',
  role: 'admin', // 'admin' or 'user'
  isLoggedIn: true // This would come from your auth system
};

const DashboardSidebar = ({ isOpen, onToggle }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user: authUser, session, signOut } = useAuth();
  const [user, setUser] = useState(mockUser);
  const [stats, setStats] = useState({
    bookmarks: 0,
    comments: 0,
    views: 0,
    reactions: 0
  });

  useEffect(() => {
    // Update user state based on auth
    if (authUser && session) {
      setUser({
        id: authUser.id,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        avatar: authUser.user_metadata?.avatar || '/image/edison.png',
        role: authUser.email === 'buzzedison@gmail.com' ? 'admin' : 'user',
        isLoggedIn: true
      });
    } else {
      setUser({ ...mockUser, isLoggedIn: false });
    }

    // Fetch user stats
    fetchUserStats();
  }, [authUser, session]);

  const fetchUserStats = async () => {
    try {
      // Fetch bookmarks count
      const bookmarksRes = await fetch(`/api/bookmarks?userId=${user.id}`);
      if (bookmarksRes.ok) {
        const bookmarksData = await bookmarksRes.json();
        setStats(prev => ({ ...prev, bookmarks: bookmarksData.bookmarks?.length || 0 }));
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleLogout = async () => {
    // Confirm logout
    const confirmLogout = confirm('Are you sure you want to sign out?');
    if (!confirmLogout) return;

    try {
      // Use the signOut method from auth context
      await signOut();

      // Clear any additional local storage
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      sessionStorage.clear();

      // Update user state
      setUser({ ...user, isLoggedIn: false });

      // Redirect to home page
      router.push('/');

      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('There was an error signing out. Please try again.');
    }
  };

  const navigationItems = [
    {
      title: 'Discover',
      items: [
        { name: 'All Articles', href: '/insights', icon: BookOpen, count: null },
        { name: 'Trending', href: '/insights?sort=views', icon: TrendingUp, count: null },
        { name: 'Latest', href: '/insights?sort=date', icon: Calendar, count: null },
      ]
    },
    {
      title: 'Personal',
      items: [
        { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark, count: stats.bookmarks },
        { name: 'Reading History', href: '/dashboard/history', icon: Eye, count: null },
        { name: 'My Comments', href: '/dashboard/comments', icon: MessageCircle, count: stats.comments },
        { name: 'Liked Articles', href: '/dashboard/liked', icon: Heart, count: stats.reactions },
      ]
    },
    {
      title: 'Account',
      items: [
        { name: 'Profile', href: '/dashboard/profile', icon: User, count: null },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings, count: null },
        { name: 'Newsletter', href: '/dashboard/newsletter', icon: Mail, count: null },
      ]
    }
  ];

  // Add admin section if user is admin
  if (user.isLoggedIn && user.role === 'admin') {
    navigationItems.push({
      title: 'Admin',
      items: [
        { name: 'Write Article', href: '/admin/insights/new', icon: PlusCircle, count: null },
        { name: 'Manage Posts', href: '/admin/insights', icon: BookOpen, count: null },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, count: null },
        { name: 'Comments', href: '/admin/comments', icon: MessageCircle, count: null },
        { name: 'Admin Panel', href: '/admin', icon: Shield, count: null },
      ]
    });
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-brand-stone border-r border-gray-100 z-[60] transform transition-all duration-500 ease-out w-80 shadow-2xl overflow-hidden flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-white/30 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-charcoal flex items-center justify-center shadow-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-brand-charcoal">BuzzEdison.</span>
          </Link>

          <button
            onClick={onToggle}
            className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 shadow-sm group"
          >
            <X className="h-5 w-5 text-brand-charcoal group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* User Profile Section - Minimized */}
        <div className="p-8 border-b border-gray-100">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover grayscale"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-serif font-semibold bg-white text-brand-charcoal">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-brand-gold rounded-full border-2 border-brand-stone"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-serif font-medium text-brand-charcoal truncate">{user.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted truncate">
                    {user.role === 'admin' ? 'Strategic Lead' : 'Partner'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-white border border-gray-50 shadow-sm flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-brand-muted" />
              </div>
              <p className="text-xs text-brand-muted mb-6 leading-relaxed">Join for personalized business insights.</p>
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-charcoal text-white rounded-full hover:bg-black transition-all text-[11px] font-bold uppercase tracking-widest w-full justify-center shadow-sm"
              >
                <LogIn className="h-3.5 w-3.5" />
                Auth Access
              </Link>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <nav className="space-y-8">
            {navigationItems.map((section) => (
              <div key={section.title}>
                <h3 className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-4 px-3">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onToggle}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 group",
                        pathname === item.href
                          ? "bg-white text-brand-charcoal shadow-sm border border-gray-100 font-medium scale-[1.02]"
                          : "text-brand-muted hover:text-brand-charcoal hover:bg-white/50"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 flex-shrink-0 transition-colors",
                        pathname === item.href ? "text-brand-charcoal" : "text-brand-muted group-hover:text-brand-charcoal"
                      )} />
                      <span className="flex-1">{item.name}</span>

                      {item.count !== null && item.count > 0 && (
                        <span className="bg-brand-stone border border-gray-100 text-brand-charcoal text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        {user.isLoggedIn && (
          <div className="border-t border-gray-100 p-6 bg-white/30 backdrop-blur-sm">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 w-full transition-all duration-300"
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardSidebar; 