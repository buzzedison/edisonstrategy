'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  postId: number;
  userId?: string;
  variant?: 'default' | 'compact' | 'text';
  className?: string;
}

const BookmarkButton = ({
  postId,
  userId,
  variant = 'default',
  className = ''
}: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // For now, we'll use a simple user ID based on browser storage
  // In a real app, this would come from your auth system
  const currentUserId = userId || 'anonymous-user';

  useEffect(() => {
    checkBookmarkStatus();
  }, [postId, currentUserId]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch(`/api/bookmarks?userId=${currentUserId}`);
      if (response.ok) {
        const data = await response.json();
        const bookmarked = data.bookmarks.some((bookmark: any) =>
          bookmark.posts?.id === postId
        );
        setIsBookmarked(bookmarked);
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const toggleBookmark = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isBookmarked) {
        // Remove bookmark
        const response = await fetch(`/api/bookmarks?userId=${currentUserId}&postId=${postId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setIsBookmarked(false);
        }
      } else {
        // Add bookmark
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: currentUserId,
            postId: postId,
          }),
        });

        if (response.ok) {
          setIsBookmarked(true);
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleBookmark}
        disabled={isLoading}
        className={cn(
          "p-2.5 rounded-full transition-all duration-300 hover:bg-white border border-transparent hover:border-gray-100 shadow-sm disabled:opacity-50 group",
          isBookmarked ? "text-brand-gold bg-white border-gray-100" : "text-brand-muted hover:text-brand-charcoal",
          className
        )}
        title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-4 w-4 fill-current" />
        ) : (
          <Bookmark className="h-4 w-4 group-hover:scale-110 transition-transform" />
        )}
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button
        onClick={toggleBookmark}
        disabled={isLoading}
        className={cn(
          "inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:text-brand-gold disabled:opacity-50",
          isBookmarked ? "text-brand-gold" : "text-brand-muted",
          className
        )}
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Bookmark className="h-3.5 w-3.5" />
        )}
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </button>
    );
  }

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50",
        isBookmarked
          ? "bg-brand-gold text-white shadow-sm ring-4 ring-brand-gold/10"
          : "bg-white text-brand-muted border border-gray-100 hover:border-brand-charcoal hover:text-brand-charcoal shadow-sm",
        className
      )}
    >
      {isLoading ? (
        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isBookmarked ? (
        <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
      ) : (
        <Bookmark className="h-3.5 w-3.5" />
      )}
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};

export default BookmarkButton; 