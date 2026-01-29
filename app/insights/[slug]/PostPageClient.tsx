'use client';

import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, Twitter, Facebook, Linkedin, Copy, FileText, ArrowRight, Sparkles } from 'lucide-react';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import ReadingProgress from '../components/ReadingProgress';
import BookmarkButton from '../components/BookmarkButton';
import Comments from '../components/Comments';
import { useAuth } from '../../../lib/authContext';
import { Button } from "@/components/ui/button";
import InsightsWithSidebar from '../../components/InsightsWithSidebar';

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
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="flex items-center gap-4 py-6 border-t border-b border-gray-100 my-8">
            <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">Share:</span>
            </div>
            <div className="flex items-center gap-3">
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-charcoal transition-colors"><Twitter className="h-4 w-4" /></a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-charcoal transition-colors"><Linkedin className="h-4 w-4" /></a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-charcoal transition-colors"><Facebook className="h-4 w-4" /></a>
                <button onClick={copyToClipboard} className="text-gray-400 hover:text-brand-charcoal transition-colors"><Copy className="h-4 w-4" /></button>
            </div>
        </div>
    );
};

// Related posts component
const RelatedPosts = ({ currentPostId, tags }: { currentPostId: number; tags: string[] }) => {
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchRelatedPosts = async () => {
            if (!tags || !tags.length) return;
            const freshSupabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                {
                    auth: { persistSession: false },
                    global: { fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }) }
                }
            );
            const { data, error } = await freshSupabase
                .from('posts')
                .select('id, title, slug, cover_image, created_at, tags')
                .neq('id', currentPostId)
                .overlaps('tags', tags)
                .limit(3);

            if (!error && data) setRelatedPosts(data as Post[]);
        };
        fetchRelatedPosts();
    }, [currentPostId, tags]);

    if (relatedPosts.length === 0) return null;

    return (
        <section className="mt-24 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-8">
                <Sparkles className="h-5 w-5 text-brand-gold" />
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">Keep Reading</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/insights/${post.slug}`} className="group block">
                        <div className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                            {post.cover_image && (
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={post.cover_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-3">
                                    {post.tags?.[0] && (
                                        <span className="text-[10px] font-bold tracking-wider text-brand-muted uppercase">{post.tags[0]}</span>
                                    )}
                                </div>
                                <h3 className="font-serif font-bold text-lg mb-2 text-brand-charcoal group-hover:text-brand-charcoal transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <div className="mt-auto pt-4 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default function PostPageClient({ post: initialPost }: { post: Post }) {
    const [post, setPost] = useState<Post>(initialPost);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Sync state when props change (crucial for router.refresh())
    useEffect(() => {
        setPost(initialPost);
    }, [initialPost]);

    const refreshPost = async () => {
        setLoading(true);
        const freshSupabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                auth: { persistSession: false },
                global: { fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }) }
            }
        );

        const { data, error } = await freshSupabase
            .from('posts')
            .select('*')
            .eq('slug', initialPost.slug)
            .single();

        if (!error && data) {
            setPost(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const updated = localStorage.getItem('post_updated');
            if (updated) {
                const [updatedSlug] = updated.split(':');
                if (updatedSlug === post.slug) {
                    refreshPost();
                    localStorage.removeItem('post_updated');
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [post.slug]);

    useEffect(() => {
        // Track view after 3 seconds
        const timer = setTimeout(async () => {
            try {
                await fetch(`/api/posts/${post.slug}/views`, { method: 'POST' });
            } catch (error) { console.warn('Failed to track view:', error); }
        }, 3000);
        return () => clearTimeout(timer);
    }, [post.slug]);

    const wordCount = post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / 200);
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://buzzedison.com/insights/${post.slug}`;

    return (
        <InsightsWithSidebar
            headerActions={<BookmarkButton postId={post.id} variant="compact" />}
        >
            <div className="min-h-screen bg-background selection:bg-brand-gold/20 selection:text-brand-charcoal">
                <Script id="structured-data" type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title || "",
                        "description": post.meta_description || "",
                        "image": post.cover_image || "",
                        "author": { "@type": "Person", "name": post.author || "Edison Ade" },
                        "publisher": { "@type": "Organization", "name": "BuzzEdison" },
                        "datePublished": post.created_at || "",
                    })}
                </Script>

                <ReadingProgress />

                <article className="max-w-3xl mx-auto px-6 py-20 md:py-32">
                    {/* Header */}
                    <header className="mb-16">
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map((tag: string) => (
                                    <span key={tag} className="px-4 py-1.5 bg-white border border-gray-100 text-brand-muted text-[10px] font-bold uppercase tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-brand-charcoal mb-10 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-muted border-t border-gray-100 pt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 overflow-hidden bg-brand-stone relative border border-gray-100">
                                    <Image src="/image/edisonaboutnew.jpg" alt="Edison Ade" fill className="object-cover grayscale" />
                                </div>
                                <span className="text-brand-charcoal">{post.author || "Edison Ade"}</span>
                            </div>
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            <time dateTime={post.created_at}>
                                {post.created_at && new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </time>
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span>{readingTime} min read</span>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.cover_image && (
                        <div className="relative aspect-[21/10] mb-20 overflow-hidden shadow-sm border border-white">
                            <Image
                                src={post.cover_image}
                                alt={post.title || ""}
                                fill
                                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg prose-slate max-w-none
            prose-headings:font-serif prose-headings:font-medium prose-headings:text-brand-charcoal prose-headings:mt-16 prose-headings:mb-8
            prose-p:text-brand-muted prose-p:leading-[1.9] prose-p:font-light prose-p:mb-10 text-[18px]
            prose-a:text-brand-charcoal prose-a:underline decoration-brand-gold/40 underline-offset-4 hover:decoration-brand-gold transition-all
            prose-blockquote:border-l-0 prose-blockquote:bg-white prose-blockquote:py-12 prose-blockquote:px-12 prose-blockquote:not-italic prose-blockquote:text-brand-charcoal prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:leading-relaxed prose-blockquote:my-16 prose-blockquote:border border-gray-50 prose-blockquote:shadow-sm
            prose-img:shadow-sm prose-img:my-16
            prose-strong:font-bold prose-strong:text-brand-charcoal
            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-10 prose-li:text-brand-muted prose-li:mb-4 prose-li:marker:text-brand-gold
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-10
            prose-hr:border-gray-100 prose-hr:my-20
          ">
                        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-20">
                        <SocialShare title={post.title || ""} url={currentUrl} />

                        {/* Admin Controls */}
                        {user?.email === 'buzzedison@gmail.com' && post.id && (
                            <div className="flex gap-4 mt-12 p-6 bg-white border border-gray-100 shadow-sm">
                                <button onClick={refreshPost} className="text-[10px] font-bold uppercase tracking-widest text-green-600 hover:underline">
                                    {loading ? 'Refreshing...' : 'Refresh Data'}
                                </button>
                                <Link href={`/admin/insights/edit/${post.id}`} className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:underline">Edit Post</Link>
                            </div>
                        )}
                    </div>

                    {/* Author Bio (Editorial Style) */}
                    <div className="mt-24 p-10 bg-white border border-gray-100 flex flex-col md:flex-row items-center gap-10 shadow-sm">
                        <div className="w-24 h-24 bg-brand-stone overflow-hidden flex-shrink-0 relative border-2 border-white shadow-sm ring-1 ring-gray-100">
                            <Image src="/image/edisonaboutnew.jpg" alt="Edison Ade" fill className="object-cover grayscale" />
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="font-serif font-bold text-brand-charcoal text-xl mb-3">Authored by Edison Ade</h3>
                            <p className="text-brand-muted text-sm leading-relaxed font-light mb-4">
                                I show founders how to use AI and better systems to grow faster, save time, and build something that lasts.
                            </p>
                            <Link href="/about" className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors">
                                Full Story <ArrowRight className="inline-block ml-1 h-3 w-3" />
                            </Link>
                        </div>
                    </div>

                    <RelatedPosts currentPostId={post.id || 0} tags={post.tags || []} />

                    {/* Newsletter CTA - Premium Style */}
                    <section className="mt-32 text-center bg-brand-charcoal text-white p-16 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 max-w-lg mx-auto">
                            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-white uppercase mb-8">
                                <Sparkles className="w-3.5 h-3.5 mr-2 text-brand-gold" />
                                Strategic Updates
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6">Master the System.</h3>
                            <p className="text-gray-400 mb-10 font-light text-lg">
                                Weekly insights on AI strategy, growth frameworks, and business architecture.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Entry email..."
                                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                />
                                <Button className="bg-white hover:bg-brand-stone text-brand-charcoal font-bold px-8 py-4 h-auto text-[11px] uppercase tracking-widest transition-all rounded-none">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </section>

                    <div className="mt-24 pt-24 border-t border-gray-100">
                        <Comments postSlug={post.slug || ""} />
                    </div>
                </article>
            </div>
        </InsightsWithSidebar>
    );
}
