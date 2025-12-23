'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Reply, Send, User, Calendar, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  author_name: string;
  author_email: string;
  created_at: string;
  parent_id?: string;
  replies: Comment[];
  status: 'approved' | 'pending' | 'rejected';
}

interface CommentsProps {
  postSlug: string;
}

const Comments = ({ postSlug }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    content: '',
    author_name: '',
    author_email: ''
  });

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();

    if (!formData.content.trim() || !formData.author_name.trim() || !formData.author_email.trim()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          parent_id: parentId || null,
        }),
      });

      if (response.ok) {
        setFormData({ content: '', author_name: '', author_email: '' });
        setReplyingTo(null);
        await fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
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

  const CommentForm = ({ parentId, onCancel }: { parentId?: string; onCancel?: () => void }) => (
    <form onSubmit={(e) => handleSubmit(e, parentId)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="author_name" className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">
            Name *
          </label>
          <input
            type="text"
            id="author_name"
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            className="w-full px-4 py-3 bg-brand-stone/50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-brand-charcoal focus:border-brand-charcoal transition-all text-sm outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="author_email" className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">
            Email *
          </label>
          <input
            type="email"
            id="author_email"
            value={formData.author_email}
            onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
            className="w-full px-4 py-3 bg-brand-stone/50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-brand-charcoal focus:border-brand-charcoal transition-all text-sm outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">
          Comment *
        </label>
        <textarea
          id="content"
          rows={4}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-3 bg-brand-stone/50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-brand-charcoal focus:border-brand-charcoal transition-all text-sm outline-none resize-none"
          placeholder={parentId ? "Write your reply..." : "Share your thoughts..."}
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-charcoal text-white rounded-xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-[11px] font-bold uppercase tracking-widest shadow-sm"
        >
          {submitting ? (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          {submitting ? 'Sending...' : 'Post Comment'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-charcoal transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <div className={`${depth > 0 ? 'ml-6 md:ml-12 mt-6' : 'mb-8'}`}>
      <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-brand-stone border border-gray-100 flex items-center justify-center">
              <User className="h-5 w-5 text-brand-muted" />
            </div>
            <div>
              <div className="font-serif font-bold text-brand-charcoal">{comment.author_name}</div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-brand-muted">
                <Calendar className="h-3 w-3" />
                {formatDate(comment.created_at)}
              </div>
            </div>
          </div>

          <button
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-stone hover:bg-gray-100 rounded-full text-[9px] font-bold uppercase tracking-widest text-brand-charcoal transition-all"
          >
            <Reply className="h-3 w-3" />
            Reply
          </button>
        </div>

        {/* Comment Content */}
        <div className="text-brand-muted leading-relaxed font-light mb-2 pl-2">
          {comment.content}
        </div>

        {/* Reply Form */}
        {replyingTo === comment.id && (
          <div className="mt-8 pt-8 border-t border-gray-50">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal mb-6">
              Reply to {comment.author_name}
            </h4>
            <CommentForm
              parentId={comment.id}
              onCancel={() => setReplyingTo(null)}
            />
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="h-6 w-6 text-brand-gold" />
          <h3 className="text-2xl font-serif font-bold text-brand-charcoal">Comments</h3>
        </div>
        <div className="animate-pulse space-y-6">
          {[1, 2].map(i => (
            <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 bg-brand-stone rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-brand-stone rounded w-32"></div>
                  <div className="h-3 bg-brand-stone rounded w-20"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-brand-stone rounded w-full"></div>
                <div className="h-4 bg-brand-stone rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-brand-gold" />
          <h3 className="text-2xl font-serif font-bold text-brand-charcoal">
            Insights ({comments.length})
          </h3>
        </div>
      </div>

      {/* Comment Form */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal mb-8">Join the Discussion</h4>
        <CommentForm />
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-20 bg-brand-stone/30 rounded-[2.5rem] border border-dashed border-gray-200">
          <MessageCircle className="h-12 w-12 text-gray-200 mx-auto mb-6" />
          <h4 className="text-xl font-serif font-bold text-brand-charcoal mb-2">No discussion yet</h4>
          <p className="text-brand-muted font-light">Be the first to offer your perspective.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments; 