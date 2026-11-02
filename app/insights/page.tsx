import { createClient } from '@supabase/supabase-js';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 9;
// The unfiltered first page adds a featured post above a full grid.
const FIRST_PAGE_POSTS = POSTS_PER_PAGE + 1;
const POST_FIELDS = 'id, title, slug, cover_image, content, tags, created_at, meta_description, author';

interface Post {
  id: number;
  title: string;
  slug: string;
  cover_image?: string | null;
  content?: string | null;
  tags?: string[] | null;
  created_at: string;
  meta_description?: string | null;
  author?: string | null;
}

type SearchParams = { page?: string; tag?: string; q?: string };

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: { fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }) },
  });
}

// Characters that would break a PostgREST `or` filter or act as wildcards.
const cleanSearchTerm = (term: string) => term.replace(/[,()%*\\]/g, ' ').trim().slice(0, 80);

async function getPosts(page: number, tag: string | null, search: string, hasFeatured: boolean) {
  let query = getSupabase()
    .from('posts')
    .select(POST_FIELDS, { count: 'exact' })
    .eq('status', 'published')
    .not('content', 'is', null)
    .neq('content', '<p><br></p>')
    .order('created_at', { ascending: false });

  if (tag) query = query.contains('tags', [tag]);
  if (search) query = query.or(`title.ilike.%${search}%,meta_description.ilike.%${search}%`);

  const firstPageSize = hasFeatured ? FIRST_PAGE_POSTS : POSTS_PER_PAGE;
  const from = page === 1 ? 0 : firstPageSize + (page - 2) * POSTS_PER_PAGE;
  const size = page === 1 ? firstPageSize : POSTS_PER_PAGE;
  const { data, count, error } = await query.range(from, from + size - 1);

  if (error) {
    console.error('Error fetching posts:', error);
    return { posts: [] as Post[], total: 0 };
  }
  return { posts: (data || []) as Post[], total: count || 0 };
}

async function getTopTags() {
  const { data, error } = await getSupabase().from('posts').select('tags').eq('status', 'published');
  if (error || !data) return [];

  const counts: Record<string, number> = {};
  data.forEach(({ tags }) => (tags || []).forEach((tag: string) => tag && (counts[tag] = (counts[tag] || 0) + 1)));

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name]) => name);
}

function readingTime(content?: string | null) {
  const words = content?.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function buildHref(params: { page?: number; tag?: string | null; q?: string }) {
  const query = new URLSearchParams();
  if (params.tag) query.set('tag', params.tag);
  if (params.q) query.set('q', params.q);
  if (params.page && params.page > 1) query.set('page', String(params.page));
  const qs = query.toString();
  return qs ? `/insights?${qs}` : '/insights';
}

function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/45">
      <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingTime(post.content)} min read</span>
    </div>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  const tag = post.tags?.[0];
  return (
    <article className="group">
      <Link href={`/insights/${post.slug}`} className="grid overflow-hidden rounded-[1.5rem] bg-white lg:grid-cols-[1.1fr_.9fr] lg:rounded-[2rem]">
        {post.cover_image && (
          <div className="relative aspect-[16/10] overflow-hidden bg-black/5 lg:aspect-auto lg:min-h-[440px]">
            <Image
              src={post.cover_image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover grayscale-[12%] transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
            Latest{tag ? ` · ${tag}` : ''}
          </p>
          <h2 className="mt-6 text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.045em] text-balance">
            {post.title}
          </h2>
          {post.meta_description && (
            <p className="mt-5 line-clamp-3 text-base leading-7 text-black/58">{post.meta_description}</p>
          )}
          <div className="mt-8 flex items-center justify-between gap-6">
            <PostMeta post={post} />
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function PostCard({ post }: { post: Post }) {
  const tag = post.tags?.[0];
  return (
    <article className="group">
      <Link href={`/insights/${post.slug}`} className="block">
        {post.cover_image && (
          <div className="relative aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-black/5">
            <Image
              src={post.cover_image}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
              className="object-cover grayscale-[12%] transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="mt-6">
          {tag && <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">{tag}</p>}
          <h3 className="mt-3 text-2xl font-medium leading-tight tracking-[-0.035em] text-balance group-hover:underline group-hover:decoration-black/25 group-hover:underline-offset-4">
            {post.title}
          </h3>
          {post.meta_description && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/58">{post.meta_description}</p>
          )}
          <div className="mt-4">
            <PostMeta post={post} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export default async function InsightsPage({ searchParams }: { searchParams: SearchParams }) {
  noStore();

  const parsedPage = parseInt(searchParams.page || '1', 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const tag = searchParams.tag || null;
  const search = cleanSearchTerm(searchParams.q || '');

  const hasFeatured = !tag && !search;
  const [{ posts, total }, tags] = await Promise.all([getPosts(page, tag, search, hasFeatured), getTopTags()]);

  const firstPageSize = hasFeatured ? FIRST_PAGE_POSTS : POSTS_PER_PAGE;
  const totalPages = total <= firstPageSize ? 1 : 1 + Math.ceil((total - firstPageSize) / POSTS_PER_PAGE);
  const showFeatured = page === 1 && hasFeatured && posts.length > 0;
  const featured = showFeatured ? posts[0] : null;
  const gridPosts = showFeatured ? posts.slice(1) : posts;

  const pillClass = (active: boolean) =>
    cn(
      'rounded-full border px-4 py-2 text-xs font-semibold capitalize transition-colors',
      active
        ? 'border-[#1c1c1c] bg-[#1c1c1c] text-white'
        : 'border-black/15 text-black/60 hover:border-black/40 hover:text-black'
    );

  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        <section className="px-5 pb-10 pt-32 sm:px-8 lg:px-12 lg:pb-14 lg:pt-40">
          <div className="mx-auto max-w-[92rem]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Insights</p>
                <h1 className="page-display mt-7">Ideas for building beyond yourself.</h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-black/58">
                  Analysis and frameworks on founder decisions, business systems, product strategy and growth.
                </p>
              </div>

              <form action="/insights" method="get" role="search" className="relative w-full">
                <label htmlFor="insights-search" className="sr-only">Search articles</label>
                <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <input
                  id="insights-search"
                  type="search"
                  name="q"
                  defaultValue={search}
                  placeholder="Search articles"
                  className="w-full rounded-full border border-black/15 bg-white py-4 pl-12 pr-28 text-sm outline-none transition-colors placeholder:text-black/40 focus:border-black/50"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#1c1c1c] px-5 py-2.5 text-xs font-semibold text-white hover:bg-black">
                  Search
                </button>
              </form>
            </div>

            {tags.length > 0 && (
              <nav aria-label="Topics" className="mt-12 flex flex-wrap gap-2 border-t border-black/15 pt-8">
                <Link href="/insights" className={pillClass(!tag && !search)}>All</Link>
                {tags.map((name) => (
                  <Link key={name} href={buildHref({ tag: name })} className={pillClass(tag === name)}>
                    {name}
                  </Link>
                ))}
              </nav>
            )}

            {(search || tag) && (
              <p className="mt-8 text-sm text-black/58">
                {total} {total === 1 ? 'article' : 'articles'}
                {search ? <> matching <span className="font-semibold text-black">“{search}”</span></> : null}
                {tag ? <> in <span className="font-semibold capitalize text-black">{tag}</span></> : null}
                {' · '}
                <Link href="/insights" className="underline decoration-black/25 underline-offset-4 hover:decoration-black">Clear</Link>
              </p>
            )}
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-[92rem]">
            {featured && <FeaturedPost post={featured} />}

            {gridPosts.length > 0 ? (
              <div className={cn('grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3', featured && 'mt-16 lg:mt-20')}>
                {gridPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              !featured && (
                <div className="rounded-[1.5rem] bg-white px-8 py-24 text-center">
                  <p className="text-lg text-black/58">
                    {search ? `No articles match “${search}”.` : 'No articles here yet.'}
                  </p>
                  <Link href="/insights" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/25 underline-offset-4">
                    See all articles
                  </Link>
                </div>
              )
            )}

            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-20 flex items-center justify-between border-t border-black/15 pt-8">
                {page > 1 ? (
                  <Link href={buildHref({ page: page - 1, tag, q: search })} className="inline-flex items-center gap-2 text-sm font-semibold">
                    <ArrowLeft className="h-4 w-4" /> Newer
                  </Link>
                ) : <span />}
                <span className="text-sm text-black/45">Page {page} of {totalPages}</span>
                {page < totalPages ? (
                  <Link href={buildHref({ page: page + 1, tag, q: search })} className="inline-flex items-center gap-2 rounded-full bg-[#1c1c1c] px-5 py-3 text-sm font-semibold text-white hover:bg-black">
                    Older <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : <span />}
              </nav>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
