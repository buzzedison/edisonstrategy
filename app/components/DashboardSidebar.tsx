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

const DashboardSidebar = ({ isOpen, onToggle, isCollapsed = false, onCollapsedChange }: DashboardSidebarProps) => {
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
        { name: 'Write Article', href: '/admin/blog/new', icon: PlusCircle, count: null },
        { name: 'Manage Posts', href: '/admin/blog/listing', icon: BookOpen, count: null },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, count: null },
        { name: 'Comments', href: '/admin/comments', icon: MessageCircle, count: null },
        { name: 'Admin Panel', href: '/admin', icon: Shield, count: null },
      ]
    });
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "lg:w-20" : "lg:w-80",
        "w-80"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/" className={cn(
            "flex items-center gap-3",
            isCollapsed && "lg:justify-center"
          )}>
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className={cn(
              "text-xl font-bold text-gray-900 transition-all duration-300",
              isCollapsed && "lg:hidden"
            )}>Insights</span>
          </Link>
          
          {/* Desktop collapse toggle */}
          <button
            onClick={() => onCollapsedChange?.(!isCollapsed)}
            className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {/* Mobile close button */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile Section */}
        {user.isLoggedIn ? (
          <div className={cn(
            "p-6 border-b border-gray-200 transition-all duration-300",
            isCollapsed && "lg:px-3"
          )}>
            <div className={cn(
              "flex items-center gap-3 mb-4",
              isCollapsed && "lg:justify-center lg:mb-2"
            )}>
              <div className="relative">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-gray-600">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className={cn(
                "flex-1 min-w-0",
                isCollapsed && "lg:hidden"
              )}>
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={cn(
              "grid grid-cols-2 gap-3 transition-all duration-300",
              isCollapsed && "lg:hidden"
            )}>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{stats.bookmarks}</div>
                <div className="text-xs text-blue-600">Bookmarks</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{stats.views}</div>
                <div className="text-xs text-green-600">Views</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={cn(
            "p-6 border-b border-gray-200 transition-all duration-300",
            isCollapsed && "lg:px-3"
          )}>
            <div className={cn(
              "text-center",
              isCollapsed && "lg:px-0"
            )}>
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">Sign in to access your bookmarks and personalized content</p>
              <div className="space-y-3">
                <Link
                  href="/signin"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full justify-center"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                
                {/* Developer helper - remove in production */}
                <button
                  onClick={() => setUser({ ...user, isLoggedIn: true })}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Quick Login (Dev)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className={cn(
          "flex-1 overflow-y-auto p-4 transition-all duration-300",
          isCollapsed && "lg:px-2"
        )}>
          <nav className="space-y-6">
            {navigationItems.map((section) => (
              <div key={section.title}>
                <h3 className={cn(
                  "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2 transition-all duration-300",
                  isCollapsed && "lg:hidden"
                )}>
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-700 hover:bg-gray-100",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className={cn(
                        "flex-1 transition-all duration-300",
                        isCollapsed && "lg:hidden"
                      )}>{item.name}</span>
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                      {item.count !== null && item.count > 0 && (
                        <span className={cn(
                          "bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full min-w-[20px] text-center transition-all duration-300",
                          isCollapsed && "lg:absolute lg:-top-1 lg:-right-1 lg:bg-blue-600 lg:text-white lg:text-[10px] lg:w-4 lg:h-4 lg:flex lg:items-center lg:justify-center lg:p-0 lg:min-w-0"
                        )}>
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
          <div className={cn(
            "border-t border-gray-200 p-4 transition-all duration-300",
            isCollapsed && "lg:px-2"
          )}>
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all duration-300 relative group",
                isCollapsed && "lg:justify-center lg:px-2"
              )}
              title={isCollapsed ? "Sign Out" : undefined}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span className={cn(
                "transition-all duration-300",
                isCollapsed && "lg:hidden"
              )}>Sign Out</span>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Sign Out
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardSidebar; 