'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardLayout from '../components/DashboardLayout';
import { 
  BookOpen, 
  Bookmark, 
  MessageCircle, 
  Heart, 
  Eye, 
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';

interface DashboardStats {
  bookmarks: number;
  comments: number;
  views: number;
  reactions: number;
  readingTime: number; // in minutes
  articlesRead: number;
}

interface RecentActivity {
  id: string;
  type: 'bookmark' | 'comment' | 'reaction' | 'view';
  title: string;
  slug: string;
  timestamp: string;
  excerpt?: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    bookmarks: 0,
    comments: 0,
    views: 0,
    reactions: 0,
    readingTime: 0,
    articlesRead: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [recentBookmarks, setRecentBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock user ID - replace with actual auth
  const userId = 'anonymous-user';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch bookmarks
      const bookmarksRes = await fetch(`/api/bookmarks?userId=${userId}`);
      if (bookmarksRes.ok) {
        const bookmarksData = await bookmarksRes.json();
        const bookmarks = bookmarksData.bookmarks || [];
        setStats(prev => ({ ...prev, bookmarks: bookmarks.length }));
        setRecentBookmarks(bookmarks.slice(0, 3));
        
        // Create recent activity from bookmarks
        const bookmarkActivity: RecentActivity[] = bookmarks.slice(0, 3).map((bookmark: any) => ({
          id: bookmark.id,
          type: 'bookmark' as const,
          title: bookmark.posts?.title || 'Untitled',
          slug: bookmark.posts?.slug || '',
          timestamp: bookmark.created_at,
          excerpt: bookmark.posts?.meta_description
        }));
        
        setRecentActivity(bookmarkActivity);
      }

      // Mock additional stats (in a real app, these would come from your analytics)
      setStats(prev => ({
        ...prev,
        comments: Math.floor(Math.random() * 20) + 5,
        views: Math.floor(Math.random() * 1000) + 100,
        reactions: Math.floor(Math.random() * 50) + 10,
        readingTime: Math.floor(Math.random() * 300) + 60,
        articlesRead: Math.floor(Math.random() * 50) + 10
      }));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatReadingTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'bookmark': return <Bookmark className="h-4 w-4 text-blue-500" />;
      case 'comment': return <MessageCircle className="h-4 w-4 text-green-500" />;
      case 'reaction': return <Heart className="h-4 w-4 text-red-500" />;
      case 'view': return <Eye className="h-4 w-4 text-gray-500" />;
      default: return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityText = (activity: RecentActivity) => {
    switch (activity.type) {
      case 'bookmark': return 'Bookmarked';
      case 'comment': return 'Commented on';
      case 'reaction': return 'Reacted to';
      case 'view': return 'Viewed';
      default: return 'Interacted with';
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Dashboard" subtitle="Welcome back! Here's what's happening.">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back! Here's what's happening.">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bookmarks</p>
                <p className="text-3xl font-bold text-gray-900">{stats.bookmarks}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Bookmark className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <Link 
                href="/bookmarks"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reading Time</p>
                <p className="text-3xl font-bold text-gray-900">{formatReadingTime(stats.readingTime)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">This month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Articles Read</p>
                <p className="text-3xl font-bold text-gray-900">{stats.articlesRead}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">This month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement</p>
                <p className="text-3xl font-bold text-gray-900">{stats.reactions + stats.comments}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Comments & reactions</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No recent activity</p>
                  <Link 
                    href="/insights"
                    className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
                  >
                    Start reading articles
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {getActivityText(activity)}{' '}
                          <Link 
                            href={`/insights/${activity.slug}`}
                            className="font-medium text-blue-600 hover:text-blue-700"
                          >
                            {activity.title}
                          </Link>
                        </p>
                        {activity.excerpt && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {activity.excerpt}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Bookmarks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Bookmarks</h3>
                <Link 
                  href="/bookmarks"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentBookmarks.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No bookmarks yet</p>
                  <Link 
                    href="/insights"
                    className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
                  >
                    Discover articles to bookmark
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="flex gap-3">
                      {bookmark.posts?.cover_image && (
                        <div className="flex-shrink-0">
                          <Image
                            src={bookmark.posts.cover_image}
                            alt={bookmark.posts.title}
                            width={60}
                            height={40}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/insights/${bookmark.posts?.slug}`}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                        >
                          {bookmark.posts?.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          Bookmarked {new Date(bookmark.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/insights"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Browse Articles</span>
            </Link>
            
            <Link 
              href="/bookmarks"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Bookmark className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">My Bookmarks</span>
            </Link>
            
            <Link 
              href="/insights?sort=views"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Trending</span>
            </Link>
            
            <Link 
              href="/dashboard/profile"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Star className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">My Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}