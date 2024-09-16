import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Image from 'next/image';
import Script from 'next/script';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, cover_image, tags, meta_description')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    console.error(error);
    return notFound();
  }

  return (
    <article className="min-h-screen bg-gray-50">
      <Script>{`
        document.title = "${post.title}";
        document.querySelector('meta[name="description"]').setAttribute('content', "${post.meta_description}");
        document.querySelector('meta[property="og:title"]').setAttribute('content', "${post.title}");
        document.querySelector('meta[property="og:description"]').setAttribute('content', "${post.meta_description}");
        document.querySelector('meta[property="og:image"]').setAttribute('content', "${post.cover_image}");
      `}</Script>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 pt-24">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-3 mb-8">
            {post.tags && post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-blue-600 hover:shadow-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {post.cover_image && (
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <main>
          <div className="prose prose-lg max-w-none">
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
          </div>
        </main>
      </div>
    </article>
  );
}