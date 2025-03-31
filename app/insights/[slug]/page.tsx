import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Script from 'next/script';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    };
  }

  return {
    title: post.title,
    description: post.content?.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content?.replace(/<[^>]*>/g, '').substring(0, 160),
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !post) {
    notFound();
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