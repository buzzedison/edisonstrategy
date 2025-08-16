'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, Calendar, Clock, BookOpen, Search, Filter } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { cn } from '@/lib/utils';

interface HistoryItem {
  id: string;
  post_id: string;
  viewed_at: string;
  post: {
    id: string;
    title: string;
    slug: string;
    content: string;
    cover_image: string;
    created_at: string;
    author: string;
    tags: string[];
  };
}

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all'); // all, today, week, month

  useEffect(() => {
    fetchReadingHistory();
  }, []);

  const fetchReadingHistory = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - replace with actual Supabase query when you have user auth
      const mockHistory: HistoryItem[] = [
        {
          id: '1',
          post_id: '1',
          viewed_at: new Date().toISOString(),
          post: {
            id: '1',
            title: 'The Future of Web Development',
            slug: 'future-of-web-development',
            content: 'Exploring the latest trends and technologies...',
            cover_image: '/image/webdev.png',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            author: 'Edison Ade',
            tags: ['Technology', 'Web Development']
          }
        },
        {
          id: '2',
          post_id: '2',
          viewed_at: new Date(Date.now() - 3600000).toISOString(),
          post: {
            id: '2',
            title: 'Pricing Strategies for Startups',
            slug: 'pricing-strategies-startups',
            content: 'How to price your product for maximum growth...',
            cover_image: '/image/pricingbook.webp',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            author: 'Edison Ade',
            tags: ['Business', 'Pricing', 'Startups']
          }
        },
        {
          id: '3',
          post_id: '3',
          viewed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          post: {
            id: '3',
            title: 'Building Your First SaaS Product',
            slug: 'building-first-saas-product',
            content: 'A comprehensive guide to launching your SaaS...',
            cover_image: '/image/accelerate.png',
            created_at: new Date(Date.now() - 259200000).toISOString(),
            author: 'Edison Ade',
            tags: ['SaaS', 'Entrepreneurship', 'Product']
          }
        }
      ];

      setHistory(mockHistory);
    } catch (error) {
      console.error('Error fetching reading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (timeFilter === 'all') return true;
    
    const viewedDate = new Date(item.viewed_at);
    const now = new Date();
    
    switch (timeFilter) {
      case 'today':
        return viewedDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return viewedDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return viewedDate >= monthAgo;
      default:
        return true;
    }
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <DashboardLayout title="Reading History" subtitle="Track your reading journey">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Reading History" subtitle={`${history.length} articles read`}>
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your reading history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <article key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/insights/${item.post.slug}`} className="block p-6">
                  <div className="flex gap-4">
                    {/* Article Image */}
                    {item.post.cover_image && (
                      <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.post.cover_image}
                          alt={item.post.title}
                          width={128}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Article Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                        {item.post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </p>
                      
                      {/* Tags */}
                      {item.post.tags && item.post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>Read {formatTimeAgo(item.viewed_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(item.post.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>By {item.post.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || timeFilter !== 'all' ? 'No articles found' : 'No reading history yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || timeFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start exploring articles to build your reading history'
              }
            </p>
            {!searchTerm && timeFilter === 'all' && (
              <Link
                href="/insights"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Articles
              </Link>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 