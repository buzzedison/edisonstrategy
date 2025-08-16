'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Calendar, Eye, BookOpen, Search, Filter, ThumbsUp, Smile, Flame } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { cn } from '@/lib/utils';

interface LikedArticle {
  id: string;
  reaction_type: 'like' | 'love' | 'fire' | 'smile';
  created_at: string;
  post: {
    id: string;
    title: string;
    slug: string;
    content: string;
    cover_image: string;
    created_at: string;
    author: string;
    tags: string[];
    view_count: number;
  };
}

const reactionIcons = {
  like: ThumbsUp,
  love: Heart,
  fire: Flame,
  smile: Smile
};

const reactionLabels = {
  like: 'Liked',
  love: 'Loved',
  fire: 'Fire',
  smile: 'Enjoyed'
};

export default function LikedArticlesPage() {
  const [likedArticles, setLikedArticles] = useState<LikedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [reactionFilter, setReactionFilter] = useState('all'); // all, like, love, fire, smile
  const [sortBy, setSortBy] = useState('recent'); // recent, oldest

  useEffect(() => {
    fetchLikedArticles();
  }, []);

  const fetchLikedArticles = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - replace with actual Supabase query when you have user auth
      const mockLikedArticles: LikedArticle[] = [
        {
          id: '1',
          reaction_type: 'love',
          created_at: new Date().toISOString(),
          post: {
            id: '1',
            title: 'The Art of Inversion: Think Backwards to Solve Problems',
            slug: 'art-of-inversion',
            content: 'Inversion is a powerful mental model that helps you solve complex problems...',
            cover_image: '/image/inversion.png',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            author: 'Edison Ade',
            tags: ['Mental Models', 'Problem Solving', 'Strategy'],
            view_count: 1250
          }
        },
        {
          id: '2',
          reaction_type: 'fire',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          post: {
            id: '2',
            title: 'Pricing Strategies for Startups',
            slug: 'pricing-strategies-startups',
            content: 'How to price your product for maximum growth and profitability...',
            cover_image: '/image/pricingbook.webp',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            author: 'Edison Ade',
            tags: ['Business', 'Pricing', 'Startups'],
            view_count: 2100
          }
        },
        {
          id: '3',
          reaction_type: 'like',
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          post: {
            id: '3',
            title: 'Building Your First SaaS Product',
            slug: 'building-first-saas-product',
            content: 'A comprehensive guide to launching your SaaS from idea to revenue...',
            cover_image: '/image/accelerate.png',
            created_at: new Date(Date.now() - 259200000).toISOString(),
            author: 'Edison Ade',
            tags: ['SaaS', 'Entrepreneurship', 'Product'],
            view_count: 1800
          }
        },
        {
          id: '4',
          reaction_type: 'smile',
          created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
          post: {
            id: '4',
            title: 'The Future of Web Development',
            slug: 'future-of-web-development',
            content: 'Exploring the latest trends and technologies shaping web development...',
            cover_image: '/image/webdev.png',
            created_at: new Date(Date.now() - 345600000).toISOString(),
            author: 'Edison Ade',
            tags: ['Technology', 'Web Development', 'Trends'],
            view_count: 950
          }
        }
      ];

      setLikedArticles(mockLikedArticles);
    } catch (error) {
      console.error('Error fetching liked articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedArticles = likedArticles
    .filter(item => {
      const matchesSearch = item.post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesReaction = reactionFilter === 'all' || item.reaction_type === reactionFilter;
      return matchesSearch && matchesReaction;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === 'recent' ? dateB - dateA : dateA - dateB;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

  const reactionCounts = likedArticles.reduce((acc, item) => {
    acc[item.reaction_type] = (acc[item.reaction_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <DashboardLayout title="Liked Articles" subtitle="Articles you've reacted to">
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
    <DashboardLayout title="Liked Articles" subtitle={`${likedArticles.length} articles you've reacted to`}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(reactionLabels).map(([type, label]) => {
            const Icon = reactionIcons[type as keyof typeof reactionIcons];
            const count = reactionCounts[type] || 0;
            return (
              <div key={type} className="bg-white rounded-xl shadow-sm p-4 text-center">
                <div className={cn(
                  "w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center",
                  type === 'love' && "bg-red-100 text-red-600",
                  type === 'like' && "bg-blue-100 text-blue-600",
                  type === 'fire' && "bg-orange-100 text-orange-600",
                  type === 'smile' && "bg-yellow-100 text-yellow-600"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search liked articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Reaction Filter */}
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-gray-400" />
              <select
                value={reactionFilter}
                onChange={(e) => setReactionFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Reactions</option>
                <option value="love">❤️ Loved</option>
                <option value="fire">🔥 Fire</option>
                <option value="like">👍 Liked</option>
                <option value="smile">😊 Enjoyed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles List */}
        {filteredAndSortedArticles.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedArticles.map((item) => {
              const ReactionIcon = reactionIcons[item.reaction_type];
              return (
                <article key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/insights/${item.post.slug}`} className="block p-6">
                    <div className="flex gap-4">
                      {/* Article Image */}
                      {item.post.cover_image && (
                        <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                          <Image
                            src={item.post.cover_image}
                            alt={item.post.title}
                            width={128}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                          {/* Reaction Badge */}
                          <div className={cn(
                            "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md",
                            item.reaction_type === 'love' && "bg-red-500 text-white",
                            item.reaction_type === 'like' && "bg-blue-500 text-white",
                            item.reaction_type === 'fire' && "bg-orange-500 text-white",
                            item.reaction_type === 'smile' && "bg-yellow-500 text-white"
                          )}>
                            <ReactionIcon className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                      
                      {/* Article Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                            {item.post.title}
                          </h3>
                        </div>
                        
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
                            <ReactionIcon className="h-3 w-3" />
                            <span>{reactionLabels[item.reaction_type]} {formatTimeAgo(item.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(item.post.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.post.view_count.toLocaleString()} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || reactionFilter !== 'all' ? 'No articles found' : 'No liked articles yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || reactionFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start exploring articles and react to ones you find interesting'
              }
            </p>
            {!searchTerm && reactionFilter === 'all' && (
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