import { notFound } from 'next/navigation'; // To handle 404 errors
import { supabase } from '../../../lib/supabaseClient'; // Use the shared Supabase client
import Image from 'next/image'; // Use next/image for optimized image loading

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = params;

  // Fetch post data from Supabase
  const { data: post, error } = await supabase
    .from('posts')
    .select('title, meta_description, cover_image')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    };
  }

  const coverImageUrl = post.cover_image
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cover-images/${post.cover_image}`
    : '/default-image.jpg'; // Fallback image URL

  return {
    title: post.title,
    description: post.meta_description || 'An insightful post from our blog.',
    openGraph: {
      title: post.title,
      description: post.meta_description || 'An insightful post from our blog.',
      images: [
        {
          url: coverImageUrl,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description || 'An insightful post from our blog.',
      images: [coverImageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  // Fetch the post data from Supabase based on the slug
  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, cover_image, tags, meta_description')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    console.error(error);
    return notFound(); // Display a 404 page if the post is not found
  }

  const coverImageUrl = post.cover_image
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cover-images/${post.cover_image}`
    : '/default-image.jpg'; // Fallback image

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      {coverImageUrl && (
        <div className="relative w-full h-64 mb-8">
          <Image
            src={coverImageUrl}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <div className="prose max-w-none">
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      </div>

      {post.tags && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-4 mb-4"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
