'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Search, Calendar, Tag, Trash2 } from 'lucide-react';
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
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-4">
                  <div className="w-32 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
      <div className="max-w-6xl mx-auto">{/* Content moved inside DashboardLayout */}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tag Filter */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bookmarks List */}
        {filteredBookmarks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {bookmarks.length === 0 ? 'No bookmarks yet' : 'No bookmarks match your search'}
            </h3>
            <p className="text-gray-600 mb-6">
              {bookmarks.length === 0 
                ? 'Start bookmarking articles to build your reading list'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {bookmarks.length === 0 && (
              <Link
                href="/insights"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Articles
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBookmarks.map((bookmark) => (
              <article key={bookmark.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex gap-6">
                  {/* Article Image */}
                  {bookmark.posts.cover_image && (
                    <div className="flex-shrink-0">
                      <div className="w-32 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={bookmark.posts.cover_image}
                          alt={bookmark.posts.title}
                          width={128}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link href={`/insights/${bookmark.posts.slug}`}>
                          <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                            {bookmark.posts.title}
                          </h2>
                        </Link>

                        {bookmark.posts.meta_description && (
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {bookmark.posts.meta_description}
                          </p>
                        )}

                        {/* Tags */}
                        {bookmark.posts.tags && bookmark.posts.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {bookmark.posts.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {bookmark.posts.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                                +{bookmark.posts.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(bookmark.posts.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          {bookmark.posts.author && (
                            <span>by {bookmark.posts.author}</span>
                          )}
                          <span>
                            Bookmarked {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Remove Bookmark Button */}
                      <button
                        onClick={() => removeBookmark(bookmark.posts.id)}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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