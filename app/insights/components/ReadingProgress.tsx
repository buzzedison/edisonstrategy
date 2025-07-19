'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ReadingProgressProps {
  className?: string;
}

const ReadingProgress = ({ className }: ReadingProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      
      if (documentHeight <= 0) return 0;
      
      const progress = (scrollTop / documentHeight) * 100;
      return Math.min(Math.max(progress, 0), 100);
    };

    const handleScroll = () => {
      const newProgress = calculateProgress();
      setProgress(newProgress);
      
      // Show progress bar after scrolling a bit
      setIsVisible(newProgress > 5);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
          className
        )}
        style={{ width: `${progress}%` }}
      />
      
      {/* Circular progress indicator (optional) */}
      <div
        className={cn(
          "fixed bottom-8 right-8 z-50 transition-all duration-300 ease-out",
          isVisible && progress > 10 && progress < 95 ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}
      >
        <div className="relative w-12 h-12">
          {/* Background circle */}
          <svg
            className="w-12 h-12 transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <path
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Progress circle */}
            <path
              className="text-blue-600"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={`${progress}, 100`}
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadingProgress; 