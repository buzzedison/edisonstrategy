import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Image from 'next/image';
import Script from 'next/script';
import { Metadata } from 'next';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('title, meta_description, cover_image')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.meta_description,
    openGraph: {
      title: post.title,
      description: post.meta_description,
      images: [
        {
          url: post.cover_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description,
      images: [post.cover_image],
    },
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
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
        </main>
      </div>
    </article>
  );
}