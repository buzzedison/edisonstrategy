'use client';

import { useState, useEffect } from 'react';
import { Heart, ThumbsUp, Lightbulb, HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleReactionsProps {
  slug: string;
  className?: string;
}

const reactionConfig = {
  like: {
    icon: ThumbsUp,
    label: 'Like',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    activeColor: 'bg-blue-600 text-white',
  },
  love: {
    icon: Heart,
    label: 'Love',
    color: 'text-red-600',
    bgColor: 'bg-red-50 hover:bg-red-100',
    activeColor: 'bg-red-600 text-white',
  },
  insightful: {
    icon: Lightbulb,
    label: 'Insightful',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 hover:bg-yellow-100',
    activeColor: 'bg-yellow-600 text-white',
  },
  helpful: {
    icon: HelpCircle,
    label: 'Helpful',
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100',
    activeColor: 'bg-green-600 text-white',
  },
};

const ArticleReactions = ({ slug, className }: ArticleReactionsProps) => {
  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial reactions
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}/reactions`);
        if (response.ok) {
          const data = await response.json();
          setReactions(data.reactions || {});
        }
      } catch (error) {
        console.warn('Failed to load reactions:', error);
      }
    };

    loadReactions();
  }, [slug]);

  const handleReaction = async (reactionType: string) => {
    if (isLoading) return;

    setIsLoading(true);
    const wasActive = userReaction === reactionType;

    try {
      const response = await fetch(`/api/posts/${slug}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reaction: reactionType }),
      });

      if (response.ok) {
        const data = await response.json();
        setReactions(data.reactions || {});
        setUserReaction(wasActive ? null : reactionType);
      }
    } catch (error) {
      console.warn('Failed to update reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Reactions Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          How did you find this article?
        </h3>
        {totalReactions > 0 && (
          <p className="text-sm text-gray-600">
            {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'} so far
          </p>
        )}
      </div>

      {/* Reaction Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {Object.entries(reactionConfig).map(([type, config]) => {
          const Icon = config.icon;
          const count = reactions[type] || 0;
          const isActive = userReaction === type;

          return (
            <button
              key={type}
              onClick={() => handleReaction(type)}
              disabled={isLoading}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95",
                isActive ? config.activeColor : `${config.bgColor} ${config.color}`,
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{config.label}</span>
              {count > 0 && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs",
                  isActive ? "bg-white/20" : "bg-gray-200 text-gray-700"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Reaction Summary */}
      {totalReactions > 0 && (
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
            <div className="flex -space-x-1">
              {Object.entries(reactions)
                .filter(([, count]) => count > 0)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([type]) => {
                  const Icon = reactionConfig[type as keyof typeof reactionConfig]?.icon;
                  const color = reactionConfig[type as keyof typeof reactionConfig]?.color;
                  return Icon ? (
                    <div
                      key={type}
                      className={cn(
                        "w-6 h-6 rounded-full bg-white border-2 border-white flex items-center justify-center",
                        color
                      )}
                    >
                      <Icon className="h-3 w-3" />
                    </div>
                  ) : null;
                })}
            </div>
            <span>
              {Object.entries(reactions)
                .filter(([, count]) => count > 0)
                .length > 1 
                ? `${totalReactions} people reacted to this`
                : `${totalReactions} person reacted to this`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleReactions; 