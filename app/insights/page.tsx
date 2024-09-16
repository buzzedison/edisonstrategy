import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

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
}

const PostCard = ({ post, isFeatured = false }: { post: Post; isFeatured?: boolean }) => (
  <div className={`mb-8 ${isFeatured ? 'border-b border-gray-200 pb-8' : ''}`}>
    <div className="relative aspect-video mb-4 overflow-hidden rounded">
      <Image
        src={post.cover_image}
        alt={post.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
    <Link href={`/insights/${post.slug}`} className="group">
      <h2 className={`font-serif ${isFeatured ? 'text-3xl' : 'text-xl'} font-bold mb-2 group-hover:text-blue-800 transition-colors duration-200`}>
        {post.title}
      </h2>
    </Link>
    <p className="text-gray-600 mb-3 line-clamp-2">{post.meta_description}</p>
    <Link href={`/insights/${post.slug}`} className="text-blue-800 font-semibold hover:underline">
      Read More
    </Link>
  </div>
);

export default async function InsightsPage({ searchParams }: any) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, cover_image, content, tags, created_at, meta_description')
    .order('created_at', { ascending: false })
    .range((page - 1) * 7, page * 7 - 1);

  if (error) {
    console.error(error);
    return <p className="text-center text-red-600">Error loading posts</p>;
  }

  const signedPosts = await Promise.all(
    posts.map(async (post: Post) => {
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('cover-images')
        .createSignedUrl(post.cover_image, 60 * 60);

      if (signedUrlError) {
        console.error(signedUrlError);
        return post;
      }

      return { ...post, cover_image: signedUrlData.signedUrl };
    })
  );

  const [featuredPost, ...otherPosts] = signedPosts;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
      <h1 className="font-serif text-4xl font-bold mb-12 text-center">Insights & Analysis</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {featuredPost && <PostCard post={featuredPost} isFeatured={true} />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherPosts.slice(0, 4).map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="font-serif text-xl font-bold mb-4">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(signedPosts.flatMap((post: Post) => post.tags))).slice(0, 8).map((tag: unknown, index: number) => (
                <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                  {String(tag)}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-serif text-xl font-bold mb-4">Latest Insights</h3>
          {otherPosts.slice(4).map((post: Post) => (
            <div key={post.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <Link href={`/insights/${post.slug}`} className="group">
                <h4 className="font-serif text-lg font-semibold mb-2 group-hover:text-blue-800 transition-colors duration-200">
                  {post.title}
                </h4>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-2">{post.meta_description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        {page > 1 && (
          <Link href={`?page=${page - 1}`} className="px-4 py-2 bg-blue-800 text-white rounded mr-2 hover:bg-blue-900 transition-colors duration-200">
            Previous
          </Link>
        )}
        {otherPosts.length === 6 && (
          <Link href={`?page=${page + 1}`} className="px-4 py-2 bg-blue-800 text-white rounded ml-2 hover:bg-blue-900 transition-colors duration-200">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}