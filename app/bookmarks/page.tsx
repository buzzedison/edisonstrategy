'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Search, Calendar, Tag, Trash2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardLayout from '../components/DashboardLayout';

interface BookmarkedPost {
  id: string;
  created_at: string;
  posts: {
    id: number;
    title: string;
    slug: string;
    cover_image?: string;
    meta_description?: string;
    created_at: string;
    author?: string;
    tags?: string[];
  };
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkedPost[]>([]);

  // Simple user ID - in a real app, this would come from your auth system
  const userId = 'anonymous-user';

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    filterBookmarks();
  }, [bookmarks, searchTerm, selectedTag]);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bookmarks?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks || []);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookmarks = () => {
    let filtered = bookmarks;

    if (searchTerm.trim()) {
      filtered = filtered.filter(bookmark =>
        bookmark.posts.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bookmark.posts.meta_description &&
          bookmark.posts.meta_description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(bookmark =>
        bookmark.posts.tags?.includes(selectedTag)
      );
    }

    setFilteredBookmarks(filtered);
  };

  const removeBookmark = async (postId: number) => {
    try {
      const response = await fetch(`/api/bookmarks?userId=${userId}&postId=${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookmarks(prev => prev.filter(bookmark => bookmark.posts.id !== postId));
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  // Get all unique tags from bookmarked posts
  const allTags = Array.from(
    new Set(bookmarks.flatMap(bookmark => bookmark.posts.tags || []))
  ).sort();

  if (loading) {
    return (
      <DashboardLayout title="Bookmarks" subtitle="Your saved articles">
        <div className="animate-pulse">
          <div className="grid gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-4">
                  <div className="w-32 h-24 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Your Bookmarks" subtitle={`${bookmarks.length} saved article${bookmarks.length !== 1 ? 's' : ''}`}>
      <div className="max-w-5xl mx-auto">

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Tag Filter */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-white appearance-none outline-none cursor-pointer min-w-[160px]"
              >
                <option value="">All tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks List */}
        {filteredBookmarks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
              <Bookmark className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-3">
              {bookmarks.length === 0 ? 'No bookmarks yet' : 'No bookmarks match your search'}
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {bookmarks.length === 0
                ? 'Start bookmarking articles to build your personal reading list.'
                : 'Try adjusting your search or filter criteria to find what you are looking for.'
              }
            </p>
            {bookmarks.length === 0 && (
              <Link
                href="/insights"
                className="inline-flex items-center px-6 py-3 bg-brand-dark text-white rounded-xl hover:bg-brand-accent transition-colors font-medium"
              >
                Browse Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBookmarks.map((bookmark) => (
              <article key={bookmark.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                <div className="flex gap-6">
                  {/* Article Image */}
                  {bookmark.posts.cover_image && (
                    <div className="flex-shrink-0 hidden sm:block">
                      <div className="w-48 h-32 rounded-xl overflow-hidden relative">
                        <Image
                          src={bookmark.posts.cover_image}
                          alt={bookmark.posts.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {bookmark.posts.tags && bookmark.posts.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {bookmark.posts.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs font-bold tracking-wider text-brand-accent uppercase"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <Link href={`/insights/${bookmark.posts.slug}`}>
                            <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-dark hover:text-brand-accent transition-colors line-clamp-2 mb-3">
                              {bookmark.posts.title}
                            </h2>
                          </Link>

                          {bookmark.posts.meta_description && (
                            <p className="text-gray-600 line-clamp-2 mb-4 font-light leading-relaxed">
                              {bookmark.posts.meta_description}
                            </p>
                          )}
                        </div>

                        {/* Remove Bookmark Button */}
                        <button
                          onClick={() => removeBookmark(bookmark.posts.id)}
                          className="flex-shrink-0 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {new Date(bookmark.posts.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>
                        Saved {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 