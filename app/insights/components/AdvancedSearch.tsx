'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Clock, User, SortAsc, SortDesc, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFilters {
  query: string;
  author: string;
  dateRange: 'all' | 'week' | 'month' | '3months' | 'year';
  readingTime: 'all' | 'quick' | 'medium' | 'long'; // <5min, 5-15min, >15min
  sortBy: 'date' | 'views' | 'title';
  sortOrder: 'asc' | 'desc';
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
  className?: string;
}

const AdvancedSearch = ({ onSearch, onReset, className }: AdvancedSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    author: '',
    dateRange: 'all',
    readingTime: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    const active = filters.query !== '' || 
                  filters.author !== '' || 
                  filters.dateRange !== 'all' || 
                  filters.readingTime !== 'all' ||
                  filters.sortBy !== 'date' ||
                  filters.sortOrder !== 'desc';
    setHasActiveFilters(active);
  }, [filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      query: '',
      author: '',
      dateRange: 'all',
      readingTime: 'all',
      sortBy: 'date',
      sortOrder: 'desc',
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
    onReset();
    setIsOpen(false);
  };

  const dateRangeOptions = [
    { value: 'all', label: 'All time' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
    { value: '3months', label: 'Past 3 months' },
    { value: 'year', label: 'Past year' },
  ];

  const readingTimeOptions = [
    { value: 'all', label: 'Any length' },
    { value: 'quick', label: 'Quick read (< 5 min)' },
    { value: 'medium', label: 'Medium read (5-15 min)' },
    { value: 'long', label: 'Long read (> 15 min)' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Date published' },
    { value: 'views', label: 'Most viewed' },
    { value: 'title', label: 'Title' },
  ];

  return (
    <div className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={filters.query}
          onChange={(e) => handleFilterChange('query', e.target.value)}
          className="w-full pl-10 pr-12 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200",
            hasActiveFilters ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
          )}
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Advanced Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Author Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                <User className="h-3 w-3 inline mr-1" />
                Author
              </label>
              <input
                type="text"
                placeholder="Filter by author..."
                value={filters.author}
                onChange={(e) => handleFilterChange('author', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                <Calendar className="h-3 w-3 inline mr-1" />
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reading Time Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                <Clock className="h-3 w-3 inline mr-1" />
                Reading Time
              </label>
              <select
                value={filters.readingTime}
                onChange={(e) => handleFilterChange('readingTime', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {readingTimeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {filters.sortOrder === 'asc' ? <SortAsc className="h-3 w-3 inline mr-1" /> : <SortDesc className="h-3 w-3 inline mr-1" />}
                Sort By
              </label>
              <div className="flex gap-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.author && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              Author: {filters.author}
              <button
                onClick={() => handleFilterChange('author', '')}
                className="hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.dateRange !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
              <button
                onClick={() => handleFilterChange('dateRange', 'all')}
                className="hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.readingTime !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {readingTimeOptions.find(opt => opt.value === filters.readingTime)?.label}
              <button
                onClick={() => handleFilterChange('readingTime', 'all')}
                className="hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch; 