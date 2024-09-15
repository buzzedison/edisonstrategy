import { supabase } from '../../lib/supabaseClient'; // Use the shared Supabase client
import PostCard from './components/PostCard';
import Link from 'next/link'; // Import Link from next/link for client-side navigation

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function InsightsPage({ searchParams }: any) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  // Fetch posts from Supabase
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, cover_image, content, tags, created_at, meta_description')
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

  // Separate the featured post and latest posts
  const [featuredPost, ...latestPosts] = signedPosts;
  const twoMainPosts = latestPosts.slice(0, 2); // Pick the two main posts
  const remainingPosts = latestPosts.slice(2); // The rest will be on the right column

  // Use the meta description for the excerpt
  const excerpt = featuredPost.meta_description ? featuredPost.meta_description : 'No description available';

  return (
    <div className="max-w-7xl mx-auto px-4 py-20"> {/* Increased top padding */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column - Featured Article and two main articles */}
        <div className="lg:col-span-3">
          {featuredPost && (
            <div className="mb-8">
              <img
                src={featuredPost.cover_image}
                alt={featuredPost.title}
                className="object-cover w-full h-96 mb-4 rounded-lg shadow-lg transition-shadow duration-300"
              />
              <Link href={`/insights/${featuredPost.slug}`} className="text-3xl font-bold mb-2 hover:text-blue-600">
                  {featuredPost.title}
              </Link>
              <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
              <Link href={`/insights/${featuredPost.slug}`} className="text-blue-600 hover:underline">
                  Read More
              </Link>
            </div>
          )}

          {/* Two Cards under the featured post */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {twoMainPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right Column - Latest Articles */}
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold mb-6">The Latest</h3>
          <div className="space-y-6">
            {remainingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {page > 1 && (
          <Link href={`?page=${page - 1}`}>
            <a className="px-4 py-2 bg-blue-600 text-white rounded mx-1 hover:bg-blue-700 transition-colors duration-300">
              Previous
            </a>
          </Link>
        )}
        {remainingPosts.length === 5 && (
          <Link href={`?page=${page + 1}`}>
            <a className="px-4 py-2 bg-blue-600 text-white rounded mx-1 hover:bg-blue-700 transition-colors duration-300">
              Next
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
