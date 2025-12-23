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

// Enhanced PostCard with Magazine styling
const PostCard = ({
  post,
  variant = "standard",
  showImage = true,
  showExcerpt = true,
}: {
  post: Post;
  variant?: "featured" | "standard" | "compact" | "minimal";
  showImage?: boolean;
  showExcerpt?: boolean;
}) => {
  const category = post.tags?.[0];
  const isFeatured = variant === "featured";

  const wordCount = post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  const formattedDate = post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';

  if (isFeatured) {
    return (
      <article className="group mb-20">
        <Link href={`/insights/${post.slug}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {showImage && post.cover_image && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-brand-stone">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  priority
                />
              </div>
            )}

            <div className="space-y-6">
              {category && (
                <div className="inline-flex items-center px-3 py-1 bg-brand-stone border border-gray-100 rounded-full">
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                    {category}
                  </span>
                </div>
              )}

              <h1 className="text-4xl lg:text-5xl font-serif leading-tight text-brand-charcoal transition-colors duration-300">
                {post.title}
              </h1>

              {showExcerpt && post.meta_description && (
                <p className="text-lg text-brand-muted leading-relaxed font-light line-clamp-3">
                  {post.meta_description}
                </p>
              )}

              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-muted pt-4">
                {post.author && (
                  <span className="text-brand-charcoal">{post.author}</span>
                )}
                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                <time>{formattedDate}</time>
                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
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
        <div className="space-y-6">
          {showImage && post.cover_image && (
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-brand-stone">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
            </div>
          )}

          <div className="space-y-4">
            {category && (
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                {category}
              </span>
            )}

            <h2 className="text-2xl font-serif leading-tight text-brand-charcoal transition-colors duration-300">
              {post.title}
            </h2>

            {showExcerpt && post.meta_description && (
              <p className="text-brand-muted font-light text-sm leading-relaxed line-clamp-2">
                {post.meta_description}
              </p>
            )}

            <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-brand-muted pt-2 uppercase">
              <time>{formattedDate}</time>
              <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

// Topic filter component
const TopicFilter = ({ categories, selectedTag }: { categories: { name: string, count: number }[], selectedTag: string | null }) => (
  <div className="flex flex-wrap gap-2 mb-12">
    <Link
      href="/insights"
      className={cn(
        "px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 border",
        !selectedTag
          ? "bg-brand-charcoal text-white border-brand-charcoal shadow-sm"
          : "bg-white text-brand-muted border-gray-100 hover:border-brand-charcoal hover:text-brand-charcoal"
      )}
    >
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        key={index}
        href={`/insights?tag=${encodeURIComponent(category.name)}`}
        className={cn(
          "px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 border",
          selectedTag === category.name
            ? "bg-brand-charcoal text-white border-brand-charcoal shadow-sm"
            : "bg-white text-brand-muted border-gray-100 hover:border-brand-charcoal hover:text-brand-charcoal"
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
  const [topCategories, setTopCategories] = useState<{ name: string, count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const selectedTag = searchParams.get('tag');
  const postsPerPage = 9;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .neq('content', '<p><br></p>')
        .not('content', 'is', null)
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

      // Fetch latest posts
      const { data: latestPostsData } = await supabase
        .from('posts')
        .select('*')
        .neq('content', '<p><br></p>')
        .not('content', 'is', null)
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('posts')
        .select('tags');

      let topCategoriesData: { name: string, count: number }[] = [];
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

      setPosts(postsData || []);
      setLatestPosts((latestPostsData || []) as Post[]);
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
        <div className="min-h-screen bg-brand-stone/30 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-charcoal"></div>
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
      <div className="min-h-screen bg-brand-stone/30">
        <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
          {/* Header with search and filters */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 bg-white border border-gray-100 rounded-full text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-4">
                  <BookOpen className="h-3.5 w-3.5 mr-2 text-brand-gold" />
                  Strategic Library
                </div>
                <h1 className="text-5xl md:text-6xl font-serif text-brand-charcoal mb-4 tracking-tight">Articles.</h1>
                <p className="text-brand-muted font-light text-lg">Analysis and frameworks for the modern builder.</p>
              </div>
              <div className="w-full lg:max-w-md">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted group-focus-within:text-brand-charcoal transition-colors" />
                  <input
                    type="text"
                    placeholder="Search for systems, AI, strategy..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-sm bg-white border border-gray-100 rounded-2xl focus:ring-1 focus:ring-brand-charcoal focus:border-brand-charcoal transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Topic filters */}
            {!searchTerm && topCategories.length > 0 && (
              <TopicFilter categories={topCategories} selectedTag={selectedTag} />
            )}
          </div>

          <div>
            {/* Main content */}
            <main>
              {/* Featured article */}
              {featuredPost && (
                <PostCard post={featuredPost} variant="featured" />
              )}

              {/* Articles grid */}
              {otherPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {otherPosts.map((post: Post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-white rounded-[2.5rem] border border-gray-100">
                  <BookOpen className="h-12 w-12 text-gray-100 mx-auto mb-6" />
                  <p className="text-brand-muted text-lg font-light">
                    {searchTerm
                      ? `No matches for "${searchTerm}"`
                      : 'Collection coming soon.'
                    }
                  </p>
                </div>
              )}

              {/* Pagination */}
              {!searchTerm && (
                <nav className="flex justify-center items-center mt-24 gap-4">
                  {currentPage > 1 && (
                    <Link
                      href={`${paginationBasePath}page=${currentPage - 1}`}
                      className="h-12 px-8 inline-flex items-center gap-2 text-brand-charcoal bg-white rounded-full border border-gray-100 text-[11px] font-bold uppercase tracking-widest hover:bg-brand-stone transition-all shadow-sm"
                    >
                      <ArrowRight className="h-4 w-4 rotate-180" />
                      Previous
                    </Link>
                  )}
                  {hasMorePosts && (
                    <Link
                      href={`${paginationBasePath}page=${currentPage + 1}`}
                      className="h-12 px-8 inline-flex items-center gap-2 text-white bg-brand-charcoal rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-sm"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </nav>
              )}
            </main>
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
