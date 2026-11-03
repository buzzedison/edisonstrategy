'use client';

import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, Twitter, Facebook, Linkedin, Copy, Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import Script from 'next/script';
import { useState, useEffect, useMemo } from 'react';
import ReadingProgress from '../components/ReadingProgress';
import BookmarkButton from '../components/BookmarkButton';
import Comments from '../components/Comments';
import NewsletterInline from '../../components/NewsletterInline';
import { useAuth } from '../../../lib/authContext';

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

const formatLongDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// Headings of the article, used for the "In this article" column.
const extractHeadings = (html: string) =>
    Array.from((html || '').matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi))
        .map((m) => m[1].replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim())
        .filter(Boolean)
        .slice(0, 5);

// The first words of the opening paragraph are set as a lead-in, as an editorial opening.
const withLeadIn = (html: string) => {
    const m = (html || '').match(/<p[^>]*>\s*([^<]{12,})/);
    if (!m) return html;
    const words = m[1].split(/\s+/);
    if (words.length < 6) return html;
    const lead = words.slice(0, 4).join(' ');
    return html.replace(m[1], `<span class="lead-in">${lead}</span> ${words.slice(4).join(' ')}`);
};

const SocialShare = ({ title, url }: { title: string; url: string }) => {
    const [copied, setCopied] = useState(false);
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const links = [
        { name: 'Share on X', href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, Icon: Twitter },
        { name: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, Icon: Linkedin },
        { name: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, Icon: Facebook },
    ];

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="flex items-center gap-2" aria-label="Share this article" role="group">
            <Share2 className="mr-1 h-4 w-4 text-black/45" aria-hidden="true" />
            {links.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="grid h-10 w-10 place-items-center rounded-full text-black/55 ring-1 ring-black/10 transition-colors hover:bg-[#1c1c1c] hover:text-white">
                    <Icon className="h-4 w-4" />
                </a>
            ))}
            <button type="button" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} className="grid h-10 w-10 place-items-center rounded-full text-black/55 ring-1 ring-black/10 transition-colors hover:bg-[#1c1c1c] hover:text-white">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
        </div>
    );
};

const FounderScorecardCta = () => (
    <aside aria-label="Founder Scorecard" className="mt-16 flex flex-col gap-6 rounded-[1.5rem] bg-[#1c1c1c] p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
            <p className="text-2xl font-medium tracking-[-0.035em]">Find the constraint keeping decisions on your desk.</p>
            <p className="mt-2 text-base text-white/65">The Founder Scorecard: free, four minutes, three moves for the next seven days.</p>
        </div>
        <Link href="/founder-scorecard" className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#f4f2ec] px-6 py-3.5 text-sm font-semibold text-[#1c1c1c] transition-transform active:scale-[0.97]">
            Take the Scorecard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
    </aside>
);

const RelatedPosts = ({ currentPostId, tags }: { currentPostId: number; tags: string[] }) => {
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchRelatedPosts = async () => {
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
                .select('id, title, slug, cover_image, created_at, tags, meta_description')
                .neq('id', currentPostId)
                .overlaps('tags', tags)
                .limit(3);

            let list = !error && data ? (data as Post[]) : [];
            if (list.length < 3) {
                // top up with the latest articles so the row is never lopsided
                const { data: latest } = await freshSupabase
                    .from('posts')
                    .select('id, title, slug, cover_image, created_at, tags, meta_description')
                    .eq('status', 'published')
                    .neq('id', currentPostId)
                    .order('created_at', { ascending: false })
                    .limit(6);
                const have = new Set(list.map((p) => p.id));
                list = [...list, ...((latest || []) as Post[]).filter((p) => !have.has(p.id))].slice(0, 3);
            }
            setRelatedPosts(list);
        };
        fetchRelatedPosts();
    }, [currentPostId, tags]);

    if (relatedPosts.length === 0) return null;

    return (
        <section aria-labelledby="keep-reading" className="mt-24 border-t border-black/15 pt-12">
            <h2 id="keep-reading" className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">Keep reading</h2>
            <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-0">
                {relatedPosts.map((post, i) => (
                    <article key={post.id} className={`group ${i > 0 ? 'md:border-l md:border-black/15 md:pl-8' : ''} ${i < relatedPosts.length - 1 ? 'md:pr-8' : ''}`}>
                        <Link href={`/insights/${post.slug}`} className="block">
                            {post.cover_image && (
                                <div className="relative aspect-[3/2] overflow-hidden bg-black/5">
                                    <Image src={post.cover_image} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                                </div>
                            )}
                            <div className="mt-5 space-y-2.5">
                                {post.tags?.[0] && <p className="text-sm font-medium capitalize italic text-black/50">{post.tags[0]}</p>}
                                <h3 className="text-2xl font-semibold leading-[1.1] tracking-[-0.035em] text-balance group-hover:underline group-hover:decoration-black/25 group-hover:underline-offset-4">{post.title}</h3>
                                {post.meta_description && <p className="line-clamp-3 text-sm leading-6 text-black/60">{post.meta_description}</p>}
                            </div>
                        </Link>
                    </article>
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
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    // always the canonical URL, so server and client render the same share links
    const currentUrl = `https://buzzedison.com/insights/${post.slug}`;
    const headings = useMemo(() => extractHeadings(post.content), [post.content]);
    const body = useMemo(() => withLeadIn(post.content || ''), [post.content]);
    const author = post.author || 'Edison Ade';

    return (
        <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
            <Script id="structured-data" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title || "",
                    "description": post.meta_description || "",
                    "image": post.cover_image || "",
                    "author": { "@type": "Person", "name": author },
                    "publisher": { "@type": "Organization", "name": "Edison Ade" },
                    "datePublished": post.created_at || "",
                })}
            </Script>

            <ReadingProgress />

            <article>
                {/* Top: title block with key points, then the cover picture */}
                <header className="px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-32">
                    <div className="mx-auto max-w-[92rem]">
                        <div aria-hidden="true" className="h-3 w-full bg-[#1c1c1c]" />

                        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_21rem] lg:gap-20">
                            <div>
                                {post.tags?.[0] && <p className="text-base font-medium capitalize italic text-black/55">{post.tags[0]}</p>}
                                <h1 className="mt-4 max-w-4xl text-[clamp(1.875rem,3.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance">{post.title}</h1>
                                {post.meta_description && (
                                    <p className="mt-6 max-w-3xl text-lg italic leading-8 text-black/65 sm:text-xl sm:leading-9">{post.meta_description}</p>
                                )}
                                <p className="mt-8 text-sm">
                                    <span className="mr-1.5 italic">by</span>
                                    <span className="font-bold uppercase tracking-[0.06em]">{author}</span>
                                    <span className="text-black/55"> · {post.created_at && formatLongDate(post.created_at)} · {readingTime} min read</span>
                                </p>
                            </div>

                            <aside className={`lg:border-l lg:border-black/15 lg:pl-10 ${headings.length ? '' : 'hidden lg:block'}`} aria-label={headings.length ? 'In this article' : 'Topics'}>
                                <h2 className="text-xs font-bold uppercase tracking-[0.22em]">{headings.length ? 'In this article' : 'Topics'}</h2>
                                <ul className="mt-6 space-y-5">
                                    {(headings.length ? headings : post.tags || []).map((item) => (
                                        <li key={item} className="flex gap-3 text-base leading-6 text-black/80">
                                            <span aria-hidden="true" className="mt-2 h-2 w-2 flex-none bg-[#1c1c1c]" />
                                            <span className={headings.length ? '' : 'capitalize'}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        </div>

                        {post.cover_image && (
                            <figure className="mt-12 lg:mt-16">
                                <div className="relative aspect-[16/9] overflow-hidden bg-black/5 lg:aspect-[21/9]">
                                    <Image src={post.cover_image} alt={post.title || ''} fill priority sizes="(min-width: 1472px) 1472px, 100vw" className="object-cover" />
                                </div>
                            </figure>
                        )}
                    </div>
                </header>

                {/* Body: sidebar and reading column */}
                <div className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
                    <div className="mx-auto grid max-w-[92rem] gap-12 border-t border-black/15 pt-12 lg:grid-cols-[15rem_minmax(0,42rem)_1fr] lg:gap-16 lg:pt-16">
                        <aside className="order-2 space-y-8 lg:order-1 lg:sticky lg:top-28 lg:self-start">
                            <div className="flex flex-wrap items-center gap-2">
                                {post.tags?.map((tag) => (
                                    <Link key={tag} href={`/insights?tag=${encodeURIComponent(tag)}`} className="border border-black/20 px-3 py-1.5 text-sm capitalize transition-colors hover:border-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white">
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                            <p className="text-sm leading-6 text-black/65">
                                Part of the <Link href="/insights" className="underline decoration-black/30 underline-offset-4 hover:decoration-black">Insights</Link> library by {author}.
                            </p>
                            <Link href="/master-the-system" className="group inline-flex items-center gap-1.5 text-sm font-semibold">
                                Get the weekly letter <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                            <div className="flex items-center gap-4">
                                <BookmarkButton postId={post.id} variant="compact" />
                            </div>
                            <SocialShare title={post.title || ''} url={currentUrl} />
                        </aside>

                        <div className="order-1 min-w-0 lg:order-2">
                            <div
                                className="prose prose-lg max-w-none text-[1.1875rem] leading-[1.85] text-[#1c1c1c]/90
                                prose-p:my-0 prose-p:mb-7 prose-p:leading-[1.85]
                                prose-headings:font-semibold prose-headings:tracking-[-0.035em] prose-headings:text-[#1c1c1c] prose-h2:mb-5 prose-h2:mt-14 prose-h2:text-3xl prose-h3:mt-10 prose-h3:text-2xl
                                prose-a:text-[#1c1c1c] prose-a:underline prose-a:decoration-black/30 prose-a:underline-offset-4 hover:prose-a:decoration-black
                                prose-strong:font-semibold prose-strong:text-[#1c1c1c]
                                prose-blockquote:my-12 prose-blockquote:border-0 prose-blockquote:border-t-4 prose-blockquote:border-[#1c1c1c] prose-blockquote:bg-transparent prose-blockquote:px-0 prose-blockquote:pt-6 prose-blockquote:text-2xl prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:leading-snug prose-blockquote:tracking-[-0.02em]
                                prose-img:my-12 prose-img:w-full
                                prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-3 prose-li:marker:text-[#1c1c1c]
                                prose-hr:my-16 prose-hr:border-black/15
                                [&_.lead-in]:mr-1 [&_.lead-in]:text-[0.82em] [&_.lead-in]:font-bold [&_.lead-in]:uppercase [&_.lead-in]:tracking-[0.14em]"
                            >
                                <div dangerouslySetInnerHTML={{ __html: body }} />
                            </div>

                            <FounderScorecardCta />

                            {user?.email === 'buzzedison@gmail.com' && post.id && (
                                <div className="mt-10 flex gap-6 rounded-2xl bg-white p-6 text-sm font-semibold">
                                    <button onClick={refreshPost} className="text-green-700 hover:underline">{loading ? 'Refreshing...' : 'Refresh data'}</button>
                                    <Link href={`/admin/insights/edit/${post.id}`} className="hover:underline">Edit post</Link>
                                </div>
                            )}

                            <div className="mt-16 flex flex-col items-start gap-6 rounded-[1.5rem] bg-white p-8 sm:flex-row sm:items-center sm:p-10">
                                <div className="relative h-24 w-24 flex-none overflow-hidden rounded-full bg-black/5">
                                    <Image src="/image/edisonaboutnew.jpg" alt="Edison Ade" fill sizes="96px" className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold tracking-[-0.03em]">Written by Edison Ade</h3>
                                    <p className="mt-2 text-base leading-7 text-black/65">
                                        I help founders build companies that can think, sell and move without waiting on them.
                                    </p>
                                    <Link href="/about" className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                                        About Edison <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="order-3 hidden lg:block" />
                    </div>

                    <div className="mx-auto max-w-[92rem]">
                        <RelatedPosts currentPostId={post.id || 0} tags={post.tags || []} />

                        <section aria-labelledby="letter-heading" className="mt-24 grid gap-10 border-t border-black/15 pt-12 lg:grid-cols-2 lg:items-center lg:gap-24">
                            <div>
                                <h2 id="letter-heading" className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">One idea every Thursday.</h2>
                                <p className="mt-4 max-w-md text-lg leading-8 text-black/60">Master the System: weekly insights on strategy, systems and growth.</p>
                            </div>
                            <NewsletterInline source="insight_article" />
                        </section>

                        <div className="mx-auto mt-24 max-w-[42rem] border-t border-black/15 pt-12 lg:ml-[calc(15rem+4rem)]">
                            <Comments postSlug={post.slug || ""} />
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
