'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, BookOpen, Users, MapPin, ExternalLink, Twitter, Linkedin, Globe } from 'lucide-react';

interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  created_at: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  cover_image?: string;
  meta_description?: string;
  created_at: string;
  tags?: string[];
  views?: number;
}

export default function AuthorPage() {
  const params = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    memberSince: ''
  });

  useEffect(() => {
    if (params.slug) {
      fetchAuthorData();
    }
  }, [params.slug]);

  const fetchAuthorData = async () => {
    setLoading(true);
    try {
      // For now, we'll create a mock author based on the slug
      // In a real implementation, you'd have an authors table
      const authorSlug = params.slug as string;
      
      // Fetch posts by this author
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('author', authorSlug.replace('-', ' '))
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
      }

      // Create mock author data (in real app, this would come from authors table)
      const mockAuthor: Author = {
        id: '1',
        name: authorSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        slug: authorSlug,
        bio: `${authorSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} is a passionate writer and entrepreneur focused on business strategy, innovation, and growth. With years of experience in the industry, they share insights and practical advice to help others succeed.`,
        avatar: '/image/edison.png', // Default avatar
        location: 'San Francisco, CA',
        website: 'https://buzzedison.com',
        twitter: 'buzzedison',
        linkedin: 'buzzedison',
        created_at: '2020-01-01'
      };

      setAuthor(mockAuthor);
      setPosts(postsData || []);

      // Calculate stats
      const totalViews = (postsData || []).reduce((sum, post) => sum + (post.views || 0), 0);
      setStats({
        totalPosts: postsData?.length || 0,
        totalViews,
        memberSince: new Date(mockAuthor.created_at).getFullYear().toString()
      });

    } catch (error) {
      console.error('Error fetching author data:', error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-8 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!author) {
    notFound();
  }

  const calculateReadingTime = (content: string) => {
    const wordCount = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    return Math.ceil(wordCount / 200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Author Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                    {author.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{author.name}</h1>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                {author.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{author.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Writing since {stats.memberSince}</span>
                </div>
              </div>

              {/* Bio */}
              {author.bio && (
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {author.bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-4">
                {author.website && (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
                {author.twitter && (
                  <a
                    href={`https://twitter.com/${author.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                )}
                {author.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${author.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex md:flex-col gap-6 md:gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalPosts}</div>
                <div className="text-sm text-gray-600">Articles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Articles by {author.name}
            </h2>
            <span className="text-gray-600">
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-600">
                {author.name} hasn't published any articles yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                  <Link href={`/insights/${post.slug}`}>
                    <div className="flex gap-6">
                      {/* Article Image */}
                      {post.cover_image && (
                        <div className="flex-shrink-0">
                          <div className="w-32 h-24 rounded-lg overflow-hidden">
                            <Image
                              src={post.cover_image}
                              alt={post.title}
                              width={128}
                              height={96}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      )}

                      {/* Article Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>

                        {post.meta_description && (
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {post.meta_description}
                          </p>
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(post.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          {post.views && (
                            <span>{post.views.toLocaleString()} views</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 