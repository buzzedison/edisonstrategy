// app/insights/[slug]/page.tsx

import { notFound } from 'next/navigation'; // To handle 404 errors
import { supabase } from '../../../lib/supabaseClient'; // Use the shared Supabase client
import Image from 'next/image'; // Use next/image for optimized image loading
import Script from 'next/script'; // Use next/script for adding scripts to the document head

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
    .select('id, title, content, cover_image, tags, meta_description')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    console.error(error);
    return notFound(); // Display a 404 page if the post is not found
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <Script>
        {`
          document.title = "${post.title}";
          document.querySelector('meta[name="description"]').setAttribute('content', "${post.meta_description}");
          document.querySelector('meta[property="og:title"]').setAttribute('content', "${post.title}");
          document.querySelector('meta[property="og:description"]').setAttribute('content', "${post.meta_description}");
          document.querySelector('meta[property="og:image"]').setAttribute('content', "${post.cover_image}");
        `}
      </Script>
      {post.cover_image && (
        <div className="relative w-full h-64 mb-8">
          <Image
            src={post.cover_image}
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
