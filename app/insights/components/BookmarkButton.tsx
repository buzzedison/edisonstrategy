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
          "p-2 rounded-full transition-all duration-200 hover:bg-gray-100 disabled:opacity-50",
          isBookmarked ? "text-blue-600" : "text-gray-400 hover:text-gray-600",
          className
        )}
        title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
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
          "inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 disabled:opacity-50",
          isBookmarked ? "text-blue-600" : "text-gray-600",
          className
        )}
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
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
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50",
        isBookmarked 
          ? "bg-blue-50 text-blue-600 hover:bg-blue-100" 
          : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700",
        className
      )}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isBookmarked ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};

export default BookmarkButton; 