// app/insights/[slug]/page.tsx

import { notFound } from 'next/navigation'; // To handle 404 errors
import { supabase } from '../../../lib/supabaseClient'; // Use the shared Supabase client

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  // Fetch the post data from Supabase based on the slug
  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, cover_image, tags')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    console.error(error);
    return notFound(); // Display a 404 page if the post is not found
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {post.cover_image && (
        <div className="relative w-full h-64 mb-6">
          <img
            src={post.cover_image}
            alt={post.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose max-w-none">
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      </div>

      {post.tags && (
        <div className="mt-6">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
