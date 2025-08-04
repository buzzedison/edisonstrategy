'use client';

import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Search, Calendar, User, Eye, Clock, ArrowRight, TrendingUp, BookOpen, Users } from 'lucide-react';
import NewsletterSignup from './components/NewsletterSignup';
import BookmarkButton from './components/BookmarkButton';
import InsightsWithSidebar from '../components/InsightsWithSidebar';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Post {
  id: number; // Keep as number since JavaScript handles bigint as number for our use case
  title: string;
  slug: string;
  cover_image?: string;
  content?: string;
  tags?: string[];
  created_at: string;
  meta_description?: string;
  author?: string;
  views?: number;
  [key: string]: any; // Allow for additional properties
}

// Clean search component
const SearchBar = ({ onSearch, searchTerm }: { onSearch: (term: string) => void; searchTerm: string }) => {
  return (
    <div className="relative max-w-lg">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      />
    </div>
  );
};

// Enhanced PostCard with HBR styling
const PostCard = ({ 
  post, 
  variant = "standard", 
  showImage = true,
  showExcerpt = true,
  showReadMore = true
}: { 
  post: Post; 
  variant?: "featured" | "standard" | "compact" | "minimal";
  showImage?: boolean;
  showExcerpt?: boolean;
  showReadMore?: boolean;
}) => {
  const category = post.tags?.[0];
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const isMinimal = variant === "minimal";

  // Calculate reading time (average 200 words per minute)
  const wordCount = post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  // Format the date for display
  const formattedDate = post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';
  
  if (isFeatured) {
    return (
      <article className="group mb-12">
        <Link href={`/insights/${post.slug}`}>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Featured Image */}
            {showImage && post.cover_image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            )}

            {/* Featured Content */}
            <div className="space-y-4">
              {category && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    {category}
                  </span>
                </div>
              )}

              <h1 className="text-3xl lg:text-4xl font-serif leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {post.title}
              </h1>

              {showExcerpt && post.meta_description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {post.meta_description}
                </p>
              )}

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            {post.author && (
                              <Link 
                                href={`/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`}
                                className="font-medium hover:text-blue-600 transition-colors"
                              >
                                {post.author}
                              </Link>
                            )}
                            <time>{formattedDate}</time>
                            <span>{readingTime} min read</span>
                          </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/insights/${post.slug}`}>
        <div className="space-y-4">
          {/* Image */}
          {showImage && post.cover_image && !isMinimal && (
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-3">
            {category && (
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {category}
              </span>
            )}

            <h2 className={cn(
              "font-serif leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300",
              isCompact ? "text-lg" : "text-xl lg:text-2xl"
            )}>
              {post.title}
            </h2>

            {showExcerpt && !isMinimal && post.meta_description && (
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {post.meta_description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {post.author && (
                  <Link 
                    href={`/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`}
                    className="font-medium hover:text-blue-600 transition-colors"
                  >
                    {post.author}
                  </Link>
                )}
                <time>{formattedDate}</time>
                <span>{readingTime} min read</span>
                {post.views && <span>{post.views.toLocaleString()} views</span>}
              </div>
              <BookmarkButton postId={post.id} variant="compact" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

// Topic filter component
const TopicFilter = ({ categories, selectedTag }: { categories: {name: string, count: number}[], selectedTag: string | null }) => (
  <div className="flex flex-wrap gap-2 mb-8">
    <Link
      href="/insights"
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
        !selectedTag 
          ? "bg-gray-900 text-white" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      )}
    >
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        key={index}
        href={`/insights?tag=${encodeURIComponent(category.name)}`}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
          selectedTag === category.name
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        {category.name}
      </Link>
    ))}
  </div>
);



// Component that uses useSearchParams - needs to be wrapped in Suspense
function InsightsContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [topViewedPosts, setTopViewedPosts] = useState<Post[]>([]);
  const [topCategories, setTopCategories] = useState<{name: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const selectedTag = searchParams.get('tag');
  const postsPerPage = 9;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Main posts query - start with basic columns that should exist
      let query = supabase
        .from('posts')
        .select('*') // Select all columns first to see what's available
        .neq('content', '<p><br></p>') // Exclude posts with empty content
        .not('content', 'is', null) // Exclude posts with null content
        .order('created_at', { ascending: false });

      if (selectedTag) {
        query = query.contains('tags', [selectedTag]);
      }

      query = query.range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
      const { data: postsData, error: postsError } = await query;

      if (postsError) {
        console.error("Error fetching posts:", postsError);
        return;
      }

      // Debug: Log the first post to see what columns are available
      if (postsData && postsData.length > 0) {
        console.log('Available columns in posts:', Object.keys(postsData[0]));
        console.log('Sample post data:', postsData[0]);
      }

      // Fetch latest posts
      const { data: latestPostsData, error: latestError } = await supabase
        .from('posts')
        .select('*')
        .neq('content', '<p><br></p>') // Exclude posts with empty content
        .not('content', 'is', null) // Exclude posts with null content
        .order('created_at', { ascending: false })
        .limit(5);

      if (latestError) {
        console.error("Error fetching latest posts:", latestError);
      }

      // Fetch top viewed posts (simulated)
      const { data: topViewedData, error: topViewedError } = await supabase
        .from('posts')
        .select('*')
        .neq('content', '<p><br></p>') // Exclude posts with empty content
        .not('content', 'is', null) // Exclude posts with null content
        .order('created_at', { ascending: false })
        .limit(3);

      if (topViewedError) {
        console.error("Error fetching top viewed posts:", topViewedError);
      }

      // Add simulated view counts
      const topViewedWithViews = (topViewedData || []).map((post, index) => ({
        ...post,
        views: Math.floor(1000 / (index + 1))
      }));

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('posts')
        .select('tags');

      let topCategoriesData: {name: string, count: number}[] = [];
      if (!categoriesError && categoriesData) {
        const tagCounts: Record<string, number> = {};
        categoriesData.forEach(post => {
          if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => {
              if (tag) {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
              }
            });
          }
        });

        topCategoriesData = Object.entries(tagCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8);
      }

      console.log('Posts fetched:', postsData?.length || 0);
      console.log('Latest posts fetched:', latestPostsData?.length || 0);
      
      setPosts(postsData || []);
      setLatestPosts((latestPostsData || []) as Post[]);
      setTopViewedPosts(topViewedWithViews as Post[]);
      setTopCategories(topCategoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(term.toLowerCase())) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())))
      );
      setFilteredPosts(filtered);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedTag]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  if (loading) {
    return (
      <InsightsWithSidebar>
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex items-center justify-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </InsightsWithSidebar>
    );
  }

  const displayPosts = searchTerm ? filteredPosts : posts;
  const isFirstPageNoTag = currentPage === 1 && !selectedTag && !searchTerm;
  const featuredPost = isFirstPageNoTag && displayPosts.length > 0 ? displayPosts[0] : null;
  const otherPosts = isFirstPageNoTag && displayPosts.length > 0 ? displayPosts.slice(1) : displayPosts;
  
  const paginationBasePath = selectedTag ? `/insights?tag=${selectedTag}&` : '/insights?';
  const hasMorePosts = displayPosts.length === postsPerPage;

  return (
    <InsightsWithSidebar>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Header with search and filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-2">Insights</h1>
              <p className="text-gray-600">Strategic analysis and actionable business insights</p>
            </div>
            <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
          </div>

          {/* Topic filters */}
          {!searchTerm && topCategories.length > 0 && (
            <TopicFilter categories={topCategories} selectedTag={selectedTag} />
          )}

          {/* Search results message */}
          {searchTerm && (
            <div className="mb-8">
              <p className="text-gray-600">
                {filteredPosts.length > 0 
                  ? `Found ${filteredPosts.length} result${filteredPosts.length === 1 ? '' : 's'} for "${searchTerm}"`
                  : `No results found for "${searchTerm}"`
                }
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main content */}
          <main className="lg:col-span-3">
            {/* Featured article */}
            {featuredPost && (
              <PostCard post={featuredPost} variant="featured" />
            )}

            {/* Articles grid */}
            {otherPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {otherPosts.map((post: Post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchTerm 
                    ? `No articles found matching "${searchTerm}"`
                    : selectedTag 
                      ? `No articles found with the tag "${selectedTag}"`
                      : 'No articles available yet'
                  }
                </p>
              </div>
            )}

            {/* Pagination */}
            {!searchTerm && (
              <nav className="flex justify-center items-center mt-16 gap-8">
                {currentPage > 1 && (
                  <Link 
                    href={`${paginationBasePath}page=${currentPage - 1}`} 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Previous
                  </Link>
                )}
                {hasMorePosts && (
                  <Link 
                    href={`${paginationBasePath}page=${currentPage + 1}`} 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </nav>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Newsletter signup */}
              <NewsletterSignup variant="sidebar" />

              {/* The Latest */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">The Latest</h3>
                <div className="space-y-4">
                  {latestPosts.slice(0, 4).map((post: any, index: number) => (
                    <article key={index} className="group">
                      <Link href={`/insights/${post.slug}`}>
                        <div className="space-y-1">
                          {post.tags?.[0] && (
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                              {post.tags[0]}
                            </span>
                          )}
                          <h4 className="font-serif text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {post.author && <span className="font-medium">{post.author}</span>}
                            {post.author && <span className="mx-1">•</span>}
                            <time>
                              {new Date(post.created_at).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'short', day: 'numeric'
                              })}
                            </time>
                          </p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </InsightsWithSidebar>
  );
}

// Main component with Suspense boundary
export default function InsightsPage() {
  return (
    <Suspense fallback={
      <InsightsWithSidebar>
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
            <div className="flex items-center justify-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </InsightsWithSidebar>
    }>
      <InsightsContent />
    </Suspense>
  );
}
