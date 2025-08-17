'use client';


import { supabase } from '../../../lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Facebook, Linkedin, Copy, Eye, User, FileText, Edit, Trash2 } from 'lucide-react';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ReadingProgress from '../components/ReadingProgress';
import ArticleReactions from '../components/ArticleReactions';
import BookmarkButton from '../components/BookmarkButton';
import Comments from '../components/Comments';
import InsightsWithSidebar from '../../components/InsightsWithSidebar';

import { useAuth } from '../../../lib/authContext';

type Props = {
  params: {
    slug: string;
  };
};

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

// Social sharing component
const SocialShare = ({ title, url }: { title: string; url: string }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
      <div className="flex items-center gap-2">
        <Share2 className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Share this post:</span>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors"
          aria-label="Copy link"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Related posts component
const RelatedPosts = ({ currentPostId, tags }: { currentPostId: number; tags: string[] }) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!tags.length) return;

      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, cover_image, created_at, tags')
        .neq('id', currentPostId)
        .overlaps('tags', tags)
        .limit(3);

      if (!error && data) {
        setRelatedPosts(data as Post[]);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, tags]);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/insights/${post.slug}`} className="group">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              {post.cover_image && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                {post.tags?.[0] && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                    {post.tags[0]}
                  </span>
                )}
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  // Function to refresh post data
  const refreshPost = () => {
    setRefreshKey(prev => prev + 1);
    setLoading(true);
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.slug) return;
      
      // Add cache busting to ensure fresh data
      const timestamp = new Date().getTime();
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single();

      if (error || !data) {
        console.error('Error fetching post:', error);
        setLoading(false);
        setPost(null);
        return;
      }

      setPost(data);
      setLoading(false);

      // Track view after a short delay (to ensure it's not a bounce)
      const viewTimer = setTimeout(async () => {
        try {
          await fetch(`/api/posts/${params.slug}/views`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.warn('Failed to track view:', error);
        }
      }, 3000); // Track after 3 seconds

      return () => clearTimeout(viewTimer);
    };

    fetchPost();
  }, [params.slug, refreshKey]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post && !loading) {
    return (
      <InsightsWithSidebar>
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
              <p className="text-gray-600">
                The article you're looking for doesn't exist or may have been moved.
              </p>
            </div>
            <div className="space-y-4">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Insights
              </Link>
              <div className="pt-4">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </InsightsWithSidebar>
    );
  }

  // Calculate reading time
  const wordCount = post?.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://buzzedison.com/insights/${post?.slug}`;

  return (
    <InsightsWithSidebar>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post?.title || "",
          "description": post?.meta_description || post?.content?.replace(/<[^>]*>/g, '').substring(0, 160) || "",
          "image": post?.cover_image || "",
          "author": {
            "@type": "Person",
            "name": post?.author || "Edison Ade"
          },
          "publisher": {
            "@type": "Organization",
            "name": "BuzzEdison",
            "logo": {
              "@type": "ImageObject",
              "url": "https://buzzedison.com/logo.svg"
            }
          },
          "datePublished": post?.created_at || "",
          "dateModified": post?.created_at || "",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": currentUrl
          }
        })}
      </Script>

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <article className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link 
              href="/insights" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Reading indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Estimated read time: {readingTime} minutes</span>
                  <span>{wordCount.toLocaleString()} words</span>
                </div>
              </div>
          {/* Article Header */}
          <header className="mb-12">
            {/* Tags */}
            {post?.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/insights?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-full transition-colors"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              {post?.title}
            </h1>
            
            {/* Visual separator */}
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-8"></div>

            {/* Meta information and actions */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                {post?.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <Link 
                      href={`/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`}
                      className="font-medium hover:text-blue-600 transition-colors"
                    >
                      {post.author}
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post?.created_at}>
                    {post?.created_at && new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                {readingTime > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                )}
                {post?.views && (
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <BookmarkButton postId={post?.id || 0} variant="compact" />
                <SocialShare 
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://buzzedison.com'}/insights/${post?.slug}`}
                  title={post?.title || ""}
                />
                
                {/* Admin Controls */}
                {user?.email === 'buzzedison@gmail.com' && post?.id && (
                  <>
                    <button
                      onClick={refreshPost}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                      title="Refresh post data"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh
                    </button>
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Meta description */}
            {post?.meta_description && (
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                {post.meta_description}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {post?.cover_image && (
            <div className="relative aspect-video mb-12 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={post.cover_image}
                alt={post?.title || ""}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <main className="article-typography text-lg leading-8 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
          </main>

          {/* Article Reactions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <ArticleReactions slug={post?.slug || ""} />
          </div>

          {/* Social Share */}
          <div className="mt-12">
            <SocialShare title={post?.title || ""} url={currentUrl} />
          </div>

          {/* Comments Section */}
          <div className="mt-16">
            <Comments postSlug={post?.slug || ""} />
          </div>

          {/* Related Posts */}
          <RelatedPosts currentPostId={post?.id || 0} tags={post?.tags || []} />

              {/* Call to Action */}
              <section className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Turn Your Ideas Into Income?
                  </h3>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                    Get actionable strategies and insights delivered to your inbox. Join other founders and creators building successful businesses.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Start a Project
                    </Link>
                    <Link 
                      href="/subscribe" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg border border-blue-200 transition-colors"
                    >
                      Subscribe to Newsletter
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block w-80">
              <div className="space-y-6">
                {/* Author Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      EA
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Edison Ade</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Empowering visionary leaders to build profitable businesses with purpose.
                    </p>
                    <Link 
                      href="/about"
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-3">Never Miss an Update</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get weekly insights on building profitable businesses delivered to your inbox.
                  </p>
                  <Link 
                    href="/subscribe"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Subscribe Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </InsightsWithSidebar>
  );
}