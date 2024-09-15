// app/insights/page.tsx

import { supabase } from '../../lib/supabaseClient'; // Use the shared Supabase client
import PostCard from './components/PostCard';

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function InsightsPage({ searchParams }: any) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  // Fetch posts from Supabase
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, cover_image, content, tags')
    .order('created_at', { ascending: false })
    .range((page - 1) * 5, page * 5 - 1);

  if (error) {
    console.error(error);
    return <p>Error loading posts</p>;
  }

  // Generate signed URLs for cover images
  const signedPosts = await Promise.all(
    posts.map(async (post) => {
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('cover-images')
        .createSignedUrl(post.cover_image, 60 * 60); // URL valid for 1 hour

      if (signedUrlError) {
        console.error(signedUrlError);
        return post; // Return the post without modifying if there's an error
      }

      return { ...post, cover_image: signedUrlData.signedUrl };
    })
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <a
          href={`?page=${page - 1}`}
          className={`px-4 py-2 mx-1 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300'}`}
        >
          Previous
        </a>
        <a
          href={`?page=${page + 1}`}
          className="px-4 py-2 mx-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Next
        </a>
      </div>
    </div>
  );
}
