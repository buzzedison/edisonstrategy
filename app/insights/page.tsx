import { createClient } from '@supabase/supabase-js';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 9;
// The unfiltered first page is a magazine front: lead, side stories, a banner, then a row.
const FIRST_PAGE_POSTS = 12;
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

const byline = (post: Post) => post.author || 'Edison Ade';

function Kicker({ post, light = false }: { post: Post; light?: boolean }) {
  const tag = post.tags?.[0];
  if (!tag) return null;
  return <p className={cn('text-sm font-medium capitalize italic', light ? 'text-white/60' : 'text-black/50')}>{tag}</p>;
}

function Byline({ post, light = false }: { post: Post; light?: boolean }) {
  return (
    <p className={cn('text-xs', light ? 'text-white/60' : 'text-black/50')}>
      <span className="mr-1 italic">by</span><span className="font-semibold uppercase tracking-[0.04em]">{byline(post)}</span>
      <span aria-hidden="true"> · </span>
      <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
      <span aria-hidden="true"> · </span>
      {readingTime(post.content)} min read
    </p>
  );
}

function Cover({ post, ratio = 'aspect-[3/2]', priority = false, sizes }: { post: Post; ratio?: string; priority?: boolean; sizes: string }) {
  if (!post.cover_image) return <div className={cn('w-full bg-black/5', ratio)} />;
  return (
    <div className={cn('relative w-full overflow-hidden bg-black/5', ratio)}>
      <Image src={post.cover_image} alt="" fill priority={priority} sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
    </div>
  );
}

// A side story: picture, kicker, headline, deck, byline.
function Story({ post, headline = 'text-2xl' }: { post: Post; headline?: string }) {
  return (
    <article className="group">
      <Link href={`/insights/${post.slug}`} className="block">
        <Cover post={post} sizes="(min-width: 1024px) 24vw, 100vw" />
        <div className="mt-5 space-y-2.5">
          <Kicker post={post} />
          <h3 className={cn('font-semibold leading-[1.1] tracking-[-0.035em] text-balance group-hover:underline group-hover:decoration-black/25 group-hover:underline-offset-4', headline)}>{post.title}</h3>
          {post.meta_description && <p className="line-clamp-3 text-sm leading-6 text-black/60">{post.meta_description}</p>}
          <Byline post={post} />
        </div>
      </Link>
    </article>
  );
}

// The lead story sits on a dark block, as the centre column.
function Lead({ post }: { post: Post }) {
  return (
    <article className="group h-full">
      <Link href={`/insights/${post.slug}`} className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] text-white lg:rounded-[2rem]">
        <div className="p-7 sm:p-10">
          <Kicker post={post} light />
          <h2 className="mt-4 text-[clamp(2rem,3.4vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-balance">{post.title}</h2>
          {post.meta_description && <p className="mt-5 line-clamp-3 max-w-xl text-base leading-7 text-white/70">{post.meta_description}</p>}
          <div className="mt-6"><Byline post={post} light /></div>
        </div>
        <div className="mt-auto">
          <Cover post={post} ratio="aspect-[4/3]" priority sizes="(min-width: 1024px) 44vw, 100vw" />
        </div>
      </Link>
    </article>
  );
}

function MiniRow({ post }: { post: Post }) {
  return (
    <li>
      <Link href={`/insights/${post.slug}`} className="group flex items-start gap-4 py-4">
        {post.cover_image && (
          <span className="relative h-16 w-20 flex-none overflow-hidden bg-black/5">
            <Image src={post.cover_image} alt="" fill sizes="80px" className="object-cover" />
          </span>
        )}
        <span>
          <span className="block text-base font-semibold leading-snug tracking-[-0.02em] group-hover:underline group-hover:decoration-black/25 group-hover:underline-offset-4">{post.title}</span>
          <span className="mt-1 block text-xs text-black/50">{readingTime(post.content)} min read</span>
        </span>
      </Link>
    </li>
  );
}

// A full-width feature: dark text panel beside a large picture.
function Banner({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link href={`/insights/${post.slug}`} className="grid overflow-hidden rounded-[1.5rem] bg-[#1c1c1c] text-white lg:grid-cols-[.8fr_1.2fr] lg:rounded-[2rem]">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <Kicker post={post} light />
          <h2 className="mt-4 text-[clamp(1.9rem,3vw,3rem)] font-medium leading-[1.04] tracking-[-0.04em] text-balance">{post.title}</h2>
          {post.meta_description && <p className="mt-5 line-clamp-3 max-w-md text-base leading-7 text-white/70">{post.meta_description}</p>}
          <div className="mt-7"><Byline post={post} light /></div>
        </div>
        <div className="order-first lg:order-last">
          <Cover post={post} ratio="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]" sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
      </Link>
    </article>
  );
}

function PostCard({ post }: { post: Post }) {
  return <Story post={post} headline="text-[1.65rem]" />;
}

export default async function InsightsPage({ searchParams }: { searchParams: SearchParams }) {
  noStore();

  const parsedPage = parseInt(searchParams.page || '1', 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const tag = searchParams.tag || null;
  const search = cleanSearchTerm(searchParams.q || '');

  const hasFront = !tag && !search;
  const [{ posts, total }, tags] = await Promise.all([getPosts(page, tag, search, hasFront), getTopTags()]);

  const firstPageSize = hasFront ? FIRST_PAGE_POSTS : POSTS_PER_PAGE;
  const totalPages = total <= firstPageSize ? 1 : 1 + Math.ceil((total - firstPageSize) / POSTS_PER_PAGE);
  const showFront = page === 1 && hasFront && posts.length > 0;

  const [lead, left1, left2, right1, ...restAfterFront] = showFront ? posts : [];
  const sideList = restAfterFront.slice(0, 3);
  const banner = restAfterFront[3];
  const rowPosts = restAfterFront.slice(4);
  const gridPosts = showFront ? [] : posts;

  const topicClass = (active: boolean) =>
    cn(
      'whitespace-nowrap border-b-2 pb-1 text-sm font-medium capitalize transition-colors',
      active ? 'border-[#1c1c1c] text-[#1c1c1c]' : 'border-transparent text-black/55 hover:text-black'
    );

  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <main>
        {/* masthead */}
        <section className="px-5 pb-6 pt-28 sm:px-8 lg:px-12 lg:pt-32">
          <div className="mx-auto max-w-[92rem]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.055em]">Insights</h1>
              <form action="/insights" method="get" role="search" className="relative w-full lg:max-w-sm">
                <label htmlFor="insights-search" className="sr-only">Search articles</label>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45" />
                <input
                  id="insights-search"
                  type="search"
                  name="q"
                  defaultValue={search}
                  placeholder="Search articles"
                  className="w-full rounded-full bg-white py-3.5 pl-11 pr-4 text-sm outline-none ring-1 ring-black/10 transition-shadow placeholder:text-black/40 focus:ring-2 focus:ring-[#1c1c1c]"
                />
              </form>
            </div>

            {tags.length > 0 && (
              <nav aria-label="Topics" className="mt-8 flex gap-6 overflow-x-auto border-t border-black/15 pt-5 [scrollbar-width:none]">
                <Link href="/insights" className={topicClass(!tag && !search)}>Latest</Link>
                {tags.map((name) => (
                  <Link key={name} href={buildHref({ tag: name })} className={topicClass(tag === name)}>
                    {name}
                  </Link>
                ))}
              </nav>
            )}

            {(search || tag) && (
              <p className="mt-6 text-sm text-black/60">
                {total} {total === 1 ? 'article' : 'articles'}
                {search ? <> matching <span className="font-semibold text-black">“{search}”</span></> : null}
                {tag ? <> in <span className="font-semibold capitalize text-black">{tag}</span></> : null}
                {' · '}
                <Link href="/insights" className="underline decoration-black/25 underline-offset-4 hover:decoration-black">Clear</Link>
              </p>
            )}
          </div>
        </section>

        {/* magazine front */}
        {showFront && (
          <section className="px-5 pb-12 pt-6 sm:px-8 lg:px-12 lg:pb-20">
            <div className="mx-auto max-w-[92rem]">
              <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr_1fr] lg:gap-0">
                <div className="order-2 space-y-12 lg:order-1 lg:pr-8">
                  {left1 && <Story post={left1} />}
                  {left2 && <Story post={left2} />}
                </div>
                <div className="order-1 lg:order-2 lg:border-x lg:border-black/15 lg:px-8">{lead && <Lead post={lead} />}</div>
                <div className="order-3 lg:pl-8">
                  {right1 && <Story post={right1} />}
                  {sideList.length > 0 && (
                    <div className="mt-10">
                      <p className="border-b border-black/80 pb-3 text-xs font-semibold uppercase tracking-[0.14em]">More to read</p>
                      <ul className="divide-y divide-black/10">
                        {sideList.map((post) => (
                          <MiniRow key={post.id} post={post} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {banner && (
                <div className="mt-16 lg:mt-24">
                  <Banner post={banner} />
                </div>
              )}

              {rowPosts.length > 0 && (
                <div className="mt-16 grid gap-12 border-t border-black/15 pt-12 lg:mt-24 lg:grid-cols-[.8fr_repeat(3,1fr)] lg:gap-0 lg:pt-14">
                  <div className="lg:pr-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em]">Browse by topic</p>
                    <ul className="mt-5 divide-y divide-black/10 border-t border-black/15">
                      {tags.map((name) => (
                        <li key={name}>
                          <Link href={buildHref({ tag: name })} className="flex items-center justify-between py-3.5 text-base font-semibold capitalize tracking-[-0.02em] transition-colors hover:text-black/60">
                            {name} <ArrowRight className="h-4 w-4" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {rowPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="lg:border-l lg:border-black/15 lg:px-8">
                      <Story post={post} headline="text-[1.4rem]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* filtered results and later pages */}
        {!showFront && (
          <section className="px-5 pb-24 pt-6 sm:px-8 lg:px-12 lg:pb-32">
            <div className="mx-auto max-w-[92rem]">
              {gridPosts.length > 0 ? (
                <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                  {gridPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.5rem] bg-white px-8 py-24 text-center">
                  <p className="text-lg text-black/60">{search ? `No articles match “${search}”.` : 'No articles here yet.'}</p>
                  <Link href="/insights" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-black/25 underline-offset-4">
                    See all articles
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {totalPages > 1 && (
          <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
            <nav aria-label="Pagination" className="mx-auto flex max-w-[92rem] items-center justify-between border-t border-black/15 pt-8">
              {page > 1 ? (
                <Link href={buildHref({ page: page - 1, tag, q: search })} className="inline-flex items-center gap-2 text-sm font-semibold">
                  <ArrowLeft className="h-4 w-4" /> Newer
                </Link>
              ) : <span />}
              <span className="text-sm text-black/50">Page {page} of {totalPages}</span>
              {page < totalPages ? (
                <Link href={buildHref({ page: page + 1, tag, q: search })} className="inline-flex items-center gap-2 rounded-full bg-[#1c1c1c] px-5 py-3 text-sm font-semibold text-white hover:bg-black">
                  Older <ArrowRight className="h-4 w-4" />
                </Link>
              ) : <span />}
            </nav>
          </section>
        )}
      </main>
    </div>
  );
}
