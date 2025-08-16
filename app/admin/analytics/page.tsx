'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MessageCircle, 
  Heart,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { cn } from '@/lib/utils';

interface AnalyticsData {
  overview: {
    totalViews: number;
    totalUsers: number;
    totalComments: number;
    totalReactions: number;
    viewsChange: number;
    usersChange: number;
    commentsChange: number;
    reactionsChange: number;
  };
  topArticles: Array<{
    id: string;
    title: string;
    slug: string;
    views: number;
    comments: number;
    reactions: number;
    publishedAt: string;
  }>;
  viewsOverTime: Array<{
    date: string;
    views: number;
    uniqueViews: number;
  }>;
  userEngagement: {
    avgTimeOnPage: number;
    bounceRate: number;
    pagesPerSession: number;
    returnVisitorRate: number;
  };
}

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d, 1y

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - replace with actual analytics queries
      const mockData: AnalyticsData = {
        overview: {
          totalViews: 45672,
          totalUsers: 12543,
          totalComments: 1234,
          totalReactions: 3456,
          viewsChange: 12.5,
          usersChange: 8.3,
          commentsChange: -2.1,
          reactionsChange: 15.7
        },
        topArticles: [
          {
            id: '1',
            title: 'Pricing Strategies for Startups',
            slug: 'pricing-strategies-startups',
            views: 8934,
            comments: 156,
            reactions: 423,
            publishedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: '2',
            title: 'The Art of Inversion',
            slug: 'art-of-inversion',
            views: 7245,
            comments: 98,
            reactions: 312,
            publishedAt: '2024-01-05T00:00:00Z'
          },
          {
            id: '3',
            title: 'Building Your First SaaS Product',
            slug: 'building-first-saas',
            views: 6789,
            comments: 134,
            reactions: 278,
            publishedAt: '2024-01-10T00:00:00Z'
          },
          {
            id: '4',
            title: 'The Future of Web Development',
            slug: 'future-web-development',
            views: 5432,
            comments: 87,
            reactions: 201,
            publishedAt: '2024-01-15T00:00:00Z'
          }
        ],
        viewsOverTime: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          views: Math.floor(Math.random() * 2000) + 1000,
          uniqueViews: Math.floor(Math.random() * 1500) + 800
        })),
        userEngagement: {
          avgTimeOnPage: 3.2,
          bounceRate: 34.5,
          pagesPerSession: 2.8,
          returnVisitorRate: 42.3
        }
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatChange = (change: number) => {
    const isPositive = change > 0;
    return (
      <span className={cn(
        "inline-flex items-center gap-1 text-sm",
        isPositive ? "text-green-600" : "text-red-600"
      )}>
        <TrendingUp className={cn("h-3 w-3", !isPositive && "rotate-180")} />
        {Math.abs(change)}%
      </span>
    );
  };

  if (loading) {
    return (
      <DashboardLayout title="Analytics" subtitle="Content performance and user insights">
        <div className="animate-pulse space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          
          {/* Chart Area */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-80 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analyticsData) return null;

  return (
    <DashboardLayout title="Analytics" subtitle="Content performance and user insights">
      <div className="space-y-6">
        {/* Time Range Filter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(analyticsData.overview.totalViews)}
                  </p>
                  {formatChange(analyticsData.overview.viewsChange)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(analyticsData.overview.totalUsers)}
                  </p>
                  {formatChange(analyticsData.overview.usersChange)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Comments</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(analyticsData.overview.totalComments)}
                  </p>
                  {formatChange(analyticsData.overview.commentsChange)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reactions</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(analyticsData.overview.totalReactions)}
                  </p>
                  {formatChange(analyticsData.overview.reactionsChange)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Views Over Time Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Views Over Time</h3>
            <div className="h-64 flex items-end justify-between gap-1">
              {analyticsData.viewsOverTime.slice(-14).map((day, index) => {
                const maxViews = Math.max(...analyticsData.viewsOverTime.map(d => d.views));
                const height = (day.views / maxViews) * 100;
                return (
                  <div key={day.date} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${day.views} views on ${new Date(day.date).toLocaleDateString()}`}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Engagement */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg. Time on Page</span>
                <span className="font-semibold text-gray-900">
                  {analyticsData.userEngagement.avgTimeOnPage} min
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bounce Rate</span>
                <span className="font-semibold text-gray-900">
                  {analyticsData.userEngagement.bounceRate}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pages per Session</span>
                <span className="font-semibold text-gray-900">
                  {analyticsData.userEngagement.pagesPerSession}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Return Visitor Rate</span>
                <span className="font-semibold text-gray-900">
                  {analyticsData.userEngagement.returnVisitorRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Articles */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Articles</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Article</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Views</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Comments</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Reactions</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Published</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analyticsData.topArticles.map((article, index) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white",
                          index === 0 && "bg-yellow-500",
                          index === 1 && "bg-gray-400",
                          index === 2 && "bg-orange-600",
                          index > 2 && "bg-gray-300 text-gray-600"
                        )}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{article.title}</p>
                          <p className="text-sm text-gray-500">/insights/{article.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">
                        {formatNumber(article.views)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">
                        {article.comments}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">
                        {article.reactions}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-gray-600">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 