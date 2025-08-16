'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Calendar, Edit, Trash2, ExternalLink, Search, Filter } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { cn } from '@/lib/utils';

interface UserComment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  post_id: string;
  post: {
    id: string;
    title: string;
    slug: string;
    cover_image: string;
    author: string;
  };
}

export default function UserCommentsPage() {
  const [comments, setComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, oldest
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchUserComments();
  }, []);

  const fetchUserComments = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - replace with actual Supabase query when you have user auth
      const mockComments: UserComment[] = [
        {
          id: '1',
          content: 'Great article! This really helped me understand the pricing strategies better. I especially liked the section about value-based pricing.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          post_id: '1',
          post: {
            id: '1',
            title: 'Pricing Strategies for Startups',
            slug: 'pricing-strategies-startups',
            cover_image: '/image/pricingbook.webp',
            author: 'Edison Ade'
          }
        },
        {
          id: '2',
          content: 'I have a question about implementing this in React. Has anyone tried using this approach with Next.js?',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString(),
          post_id: '2',
          post: {
            id: '2',
            title: 'The Future of Web Development',
            slug: 'future-of-web-development',
            cover_image: '/image/webdev.png',
            author: 'Edison Ade'
          }
        },
        {
          id: '3',
          content: 'This is exactly what I needed to read today. Building my first SaaS and these insights are invaluable. Thank you for sharing!',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          updated_at: new Date(Date.now() - 172800000).toISOString(),
          post_id: '3',
          post: {
            id: '3',
            title: 'Building Your First SaaS Product',
            slug: 'building-first-saas-product',
            cover_image: '/image/accelerate.png',
            author: 'Edison Ade'
          }
        }
      ];

      setComments(mockComments);
    } catch (error) {
      console.error('Error fetching user comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = (commentId: string, currentContent: string) => {
    setEditingComment(commentId);
    setEditContent(currentContent);
  };

  const handleSaveEdit = async (commentId: string) => {
    try {
      // Update comment in database
      // const { error } = await supabase
      //   .from('comments')
      //   .update({ content: editContent, updated_at: new Date().toISOString() })
      //   .eq('id', commentId);

      // Update local state
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: editContent, updated_at: new Date().toISOString() }
          : comment
      ));
      
      setEditingComment(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      // Delete from database
      // const { error } = await supabase
      //   .from('comments')
      //   .delete()
      //   .eq('id', commentId);

      // Update local state
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const filteredAndSortedComments = comments
    .filter(comment => 
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === 'recent' ? dateB - dateA : dateA - dateB;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <DashboardLayout title="My Comments" subtitle="Manage your article comments">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex gap-4">
                <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Comments" subtitle={`${comments.length} comments posted`}>
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
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

        {/* Comments List */}
        {filteredAndSortedComments.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedComments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Article Info */}
                  <div className="flex items-start gap-4 mb-4">
                    {comment.post.cover_image && (
                      <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={comment.post.cover_image}
                          alt={comment.post.title}
                          width={80}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                            {comment.post.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            By {comment.post.author} • {formatDate(comment.created_at)}
                            {comment.updated_at !== comment.created_at && (
                              <span className="ml-2 text-xs text-gray-400">(edited)</span>
                            )}
                          </p>
                        </div>
                        
                        <Link
                          href={`/insights/${comment.post.slug}#comment-${comment.id}`}
                          className="text-blue-600 hover:text-blue-700 p-1"
                          title="View on article"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="mb-4">
                    {editingComment === comment.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(comment.id)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingComment(null);
                              setEditContent('');
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    )}
                  </div>

                  {/* Actions */}
                  {editingComment !== comment.id && (
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleEditComment(comment.id, comment.content)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                      
                      <div className="flex-1"></div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MessageCircle className="h-3 w-3" />
                        <span>Comment</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No comments found' : 'No comments yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : 'Start engaging with articles by leaving thoughtful comments'
              }
            </p>
            {!searchTerm && (
              <Link
                href="/insights"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Browse Articles
              </Link>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 