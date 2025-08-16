'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageCircle, 
  User, 
  Calendar, 
  ExternalLink, 
  Check, 
  X, 
  Eye,
  EyeOff,
  Trash2,
  Flag,
  Search,
  Filter
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  status: 'approved' | 'pending' | 'rejected' | 'flagged';
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  post: {
    id: string;
    title: string;
    slug: string;
  };
  flags: number;
  reports: Array<{
    id: string;
    reason: string;
    reported_at: string;
  }>;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - replace with actual Supabase query
      const mockComments: Comment[] = [
        {
          id: '1',
          content: 'This is an amazing article! I really learned a lot about pricing strategies. The value-based pricing section was particularly insightful.',
          created_at: new Date().toISOString(),
          status: 'approved',
          user: {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: '/image/edison.png'
          },
          post: {
            id: '1',
            title: 'Pricing Strategies for Startups',
            slug: 'pricing-strategies-startups'
          },
          flags: 0,
          reports: []
        },
        {
          id: '2',
          content: 'I disagree with some points here. This approach might not work for all types of businesses.',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          status: 'pending',
          user: {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com'
          },
          post: {
            id: '1',
            title: 'Pricing Strategies for Startups',
            slug: 'pricing-strategies-startups'
          },
          flags: 1,
          reports: [
            {
              id: '1',
              reason: 'Inappropriate content',
              reported_at: new Date(Date.now() - 1800000).toISOString()
            }
          ]
        },
        {
          id: '3',
          content: 'Great insights! Can you write more about SaaS pricing models?',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          status: 'approved',
          user: {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com'
          },
          post: {
            id: '2',
            title: 'Building Your First SaaS Product',
            slug: 'building-first-saas'
          },
          flags: 0,
          reports: []
        },
        {
          id: '4',
          content: 'This is spam content with inappropriate links.',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          status: 'flagged',
          user: {
            id: '4',
            name: 'Spam User',
            email: 'spam@example.com'
          },
          post: {
            id: '3',
            title: 'The Future of Web Development',
            slug: 'future-web-development'
          },
          flags: 3,
          reports: [
            {
              id: '2',
              reason: 'Spam',
              reported_at: new Date(Date.now() - 86400000).toISOString()
            },
            {
              id: '3',
              reason: 'Inappropriate links',
              reported_at: new Date(Date.now() - 43200000).toISOString()
            }
          ]
        }
      ];

      setComments(mockComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (commentId: string, newStatus: Comment['status']) => {
    try {
      // Update comment status in database
      // const { error } = await supabase
      //   .from('comments')
      //   .update({ status: newStatus })
      //   .eq('id', commentId);

      // Update local state
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, status: newStatus }
          : comment
      ));
    } catch (error) {
      console.error('Error updating comment status:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete comment from database
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
    .filter(comment => {
      const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comment.post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'most_flagged':
          return b.flags - a.flags;
        default:
          return 0;
      }
    });

  const getStatusColor = (status: Comment['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'flagged':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusCounts = comments.reduce((acc, comment) => {
    acc[comment.status] = (acc[comment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <DashboardLayout title="Comment Moderation" subtitle="Manage and moderate user comments">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Comment Moderation" subtitle="Manage and moderate user comments">
      <div className="space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.approved || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.pending || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flag className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.flagged || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.rejected || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search comments, users, or articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_flagged">Most Flagged</option>
            </select>
          </div>
        </div>

        {/* Comments List */}
        {filteredAndSortedComments.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedComments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {/* User Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {comment.user.avatar ? (
                          <Image
                            src={comment.user.avatar}
                            alt={comment.user.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-600">
                            {comment.user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      {/* User Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{comment.user.name}</span>
                          <span className={cn(
                            "px-2 py-1 text-xs rounded-full",
                            getStatusColor(comment.status)
                          )}>
                            {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                          </span>
                          {comment.flags > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              <Flag className="h-3 w-3" />
                              {comment.flags}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{comment.user.email}</span>
                          <span>•</span>
                          <span>{formatDate(comment.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Article Link */}
                    <Link
                      href={`/insights/${comment.post.slug}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                      target="_blank"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Article
                    </Link>
                  </div>

                  {/* Article Info */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Comment on:</p>
                    <p className="font-medium text-gray-900">{comment.post.title}</p>
                  </div>

                  {/* Comment Content */}
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>

                  {/* Reports */}
                  {comment.reports.length > 0 && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800 mb-2">
                        Reports ({comment.reports.length}):
                      </p>
                      <div className="space-y-1">
                        {comment.reports.map((report) => (
                          <div key={report.id} className="text-sm text-red-700">
                            • {report.reason} - {formatDate(report.reported_at)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {comment.status !== 'approved' && (
                      <button
                        onClick={() => handleStatusChange(comment.id, 'approved')}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </button>
                    )}
                    
                    {comment.status !== 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(comment.id, 'rejected')}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </button>
                    )}
                    
                    {comment.status !== 'pending' && (
                      <button
                        onClick={() => handleStatusChange(comment.id, 'pending')}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                      >
                        <Eye className="h-4 w-4" />
                        Mark Pending
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No comments found' : 'No comments yet'}
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Comments will appear here as users engage with your content'
              }
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 