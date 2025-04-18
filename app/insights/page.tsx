import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";

export const revalidate = 60;

interface Post {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  content: string;
  tags: string[];
  created_at: string;
  meta_description: string;
  author?: string;
  views?: number;
}

interface Category {
  name: string;
  count: number;
}

// Enhanced PostCard with support for different layout modes
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

  // Format the date for display
  const formattedDate = post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';
  
  return (
    <div className={cn(
      "group", 
      isFeatured ? "mb-12 pb-10 border-b border-gray-200" : "mb-8",
      isMinimal && "border-b border-gray-100 pb-4 last:border-b-0 mb-4"
    )}>
      {showImage && post.cover_image && !isMinimal && (
        <Link href={`/insights/${post.slug}`} className={cn(
          "block relative overflow-hidden rounded-md shadow-sm mb-4",
          isFeatured ? "aspect-[16/9]" : "aspect-video"
        )}>
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={isFeatured}
          />
        </Link>
      )}
      
      {/* Category Label */}
      {category && (
        <p className={cn(
          "text-sm font-semibold uppercase tracking-wide mb-1",
          isFeatured ? "text-blue-700" : "text-blue-600"
        )}>
          {category}
        </p>
      )}
      
      <Link href={`/insights/${post.slug}`}>
        <h2 className={cn(
          "font-serif font-bold mb-2 group-hover:text-blue-700 transition-colors duration-200",
          isFeatured ? 'text-3xl md:text-4xl leading-tight' : 
            isCompact ? 'text-lg md:text-xl leading-snug' : 
              isMinimal ? 'text-base leading-snug' : 'text-xl md:text-2xl leading-tight'
        )}>
          {post.title}
        </h2>
      </Link>
      
      {/* Author and date */}
      {!isMinimal && (
        <p className="text-gray-500 text-sm mb-3">
          {post.author && <span className="font-medium">{post.author}</span>}
          {post.author && formattedDate && <span className="mx-1">•</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </p>
      )}
      
      {/* Excerpt */}
      {showExcerpt && !isMinimal && (
        <p className={cn(
          "text-gray-700 mb-3 leading-relaxed",
          isFeatured ? "line-clamp-3 text-base" : isCompact ? "line-clamp-2 text-sm" : "line-clamp-2 text-sm md:text-base"
        )}>
          {post.meta_description || post.content?.replace(/<[^>]*>/g, '').substring(0, 180)}
        </p>
      )}
      
      {/* Read More Link */}
      {showReadMore && !isMinimal && (
        <Link 
          href={`/insights/${post.slug}`} 
          className="text-gray-500 hover:text-blue-600 font-medium hover:underline text-sm transition-colors duration-150"
        >
          Read More →
        </Link>
      )}
    </div>
  );
};

async function getUniqueTags() {
  const { data, error } = await supabase
    .from('posts')
    .select('tags');

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  const allTags = data.flatMap(post => post.tags || []);
  return Array.from(new Set(allTags)).filter(tag => tag);
}

async function getLatestPosts(limit: number = 4) {
  const { data, error } = await supabase
    .from('posts')
    .select('title, slug, created_at, tags')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
  return data || [];
}

// New function to get top viewed posts (mock data as views might not be in your schema)
async function getTopViewedPosts(limit: number = 3) {
  // For demo purposes - in real implementation you'd likely:
  // - Have a 'views' column or a separate analytics table
  // - Or integrate with an analytics service
  
  // For now, we'll just fetch recent posts and pretend they're top viewed
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, cover_image, tags, created_at')
    .order('created_at', { ascending: false }) // In real implementation: order by views
    .limit(limit);

  if (error) {
    console.error("Error fetching top viewed posts:", error);
    return [];
  }
  
  // Simulate view counts for display purposes
  return (data || []).map((post, index) => ({
    ...post,
    views: Math.floor(1000 / (index + 1)) // Fake view counts: 1000, 500, 333...
  }));
}

// New function to get top categories based on post count
async function getTopCategories(limit: number = 8) {
  const { data, error } = await supabase
    .from('posts')
    .select('tags');

  if (error) {
    console.error("Error fetching posts for categories:", error);
    return [];
  }

  // Count posts per tag
  const tagCounts: Record<string, number> = {};
  data.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (tag) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      });
    }
  });

  // Convert to array, sort by count, and take top N
  const sortedCategories = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  return sortedCategories;
}

export default async function InsightsPage({ searchParams }: { searchParams: { page?: string; tag?: string } }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const selectedTag = searchParams.tag;
  const postsPerPage = 6;

  // Main posts query
  let query = supabase
    .from('posts')
    .select('id, title, slug, cover_image, content, tags, created_at, meta_description')
    .order('created_at', { ascending: false });

  if (selectedTag) {
    query = query.contains('tags', [selectedTag]);
  }

  query = query.range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
  const { data: posts, error: postsError } = await query;

  // Additional data for enhanced layout
  const latestPosts = await getLatestPosts(5);
  const topViewedPosts = await getTopViewedPosts(3);
  const topCategories = await getTopCategories(8);

  if (postsError) {
    console.error("Error fetching posts:", postsError);
    return <p className="text-center text-red-600 py-40">Error loading posts. Please try again later.</p>;
  }

  const processedPosts = posts || [];
  const isFirstPageNoTag = currentPage === 1 && !selectedTag;
  const featuredPost = isFirstPageNoTag && processedPosts.length > 0 ? processedPosts[0] : null;
  const otherPosts = isFirstPageNoTag && processedPosts.length > 0 ? processedPosts.slice(1) : processedPosts;
  
  const paginationBasePath = selectedTag ? `/insights?tag=${selectedTag}&` : '/insights?';
  const hasMorePosts = processedPosts.length === postsPerPage;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 pt-28 md:pt-36">
      {/* Popular Topics Section - Moved to the top */}
      {topCategories.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Popular Topics</h2>
            <Link href="/insights" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {topCategories.map((category, index) => (
              <Link
                key={index}
                href={`/insights?tag=${encodeURIComponent(category.name)}`}
                className={cn(
                  "inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150",
                  "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
                  selectedTag === category.name && "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                )}
              >
                {category.name}
                <span className="ml-1 text-xs text-gray-500">({category.count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Top Viewed Posts */}
      {isFirstPageNoTag && topViewedPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Most Read</h2>
            <Link href="/insights" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topViewedPosts.map((post, index) => (
              <div key={post.id} className="flex items-start">
                <span className="text-2xl font-serif font-bold text-gray-300 mr-4">0{index + 1}</span>
                <div>
                  {post.tags?.[0] && (
                    <p className="text-sm font-semibold text-blue-600 uppercase mb-1">{post.tags[0]}</p>
                  )}
                  <Link href={`/insights/${post.slug}`}>
                    <h3 className="font-serif font-bold text-lg mb-1 hover:text-blue-700 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500">{post.views?.toLocaleString()} views</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <main className="lg:col-span-8">
          
          {/* Featured Content Layout - First Page Only */}
          {isFirstPageNoTag && featuredPost && (
            <div className="mb-16">
              <h2 className="font-serif text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Featured</h2>
              
              {/* Main Featured Post */}
              <PostCard post={featuredPost} variant="featured" />
              
              {/* Secondary Posts Grid */}
              {otherPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {otherPosts.slice(0, 4).map((post: Post) => (
                    <PostCard key={post.id} post={post} variant="standard" />
                  ))}
                </div>
              )}
              
              {/* Remaining Posts (if any) */}
              {otherPosts.length > 4 && (
                <>
                  <h2 className="font-serif text-2xl font-bold mt-16 mb-6 pb-2 border-b border-gray-200">More Insights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {otherPosts.slice(4).map((post: Post) => (
                      <PostCard key={post.id} post={post} variant="compact" />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Standard Grid for Other Pages / Tag Filtered Views */}
          {!isFirstPageNoTag && processedPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {processedPosts.map((post: Post) => (
                <PostCard key={post.id} post={post} variant="standard" />
              ))}
            </div>
          )}

          {/* No Results Message */}
          {processedPosts.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-10 text-center">
              <p className="text-gray-600 mb-3">No posts found {selectedTag ? `with the tag "${selectedTag}"` : ''}.</p>
              <Link href="/insights" className="text-blue-600 hover:underline font-medium">
                View all insights
              </Link>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-10">
            {/* The Latest Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-serif text-xl font-bold mb-6 pb-2 border-b border-gray-200">The Latest</h3>
              <ul className="space-y-4">
                {latestPosts.map((post: { slug: string; title: string; tags?: string[]; created_at?: string }, index: number) => (
                  <li key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    {post.tags?.[0] && (
                      <p className="text-xs font-semibold text-blue-600 uppercase mb-1">{post.tags[0]}</p>
                    )}
                    <Link 
                      href={`/insights/${post.slug}`} 
                      className="font-serif font-semibold text-gray-800 hover:text-blue-700 hover:underline transition-colors text-base leading-snug block"
                    >
                      {post.title}
                    </Link>
                    {post.created_at && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                    )}
                  </li>
                ))}
                {latestPosts.length === 0 && (
                  <p className="text-sm text-gray-500">No recent posts found.</p>
                )}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-20 space-x-6">
        {currentPage > 1 && (
          <Link href={`${paginationBasePath}page=${currentPage - 1}`} className="text-gray-600 hover:text-blue-700 hover:underline font-medium text-sm transition-colors duration-150">
              ← Previous Page
          </Link>
        )}
        {hasMorePosts && (
          <Link href={`${paginationBasePath}page=${currentPage + 1}`} className="text-gray-600 hover:text-blue-700 hover:underline font-medium text-sm transition-colors duration-150">
              Next Page →
          </Link>
        )}
      </div>
    </div>
  );
}
