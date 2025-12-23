import { createClient } from '@supabase/supabase-js';
import { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import PostPageClient from './PostPageClient';

// Cache the fetch to avoid double-fetching between generateMetadata and the page
const getPost = cache(async (slug: string) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found | Buzzedison',
    };
  }

  const title = post.title;
  const description = post.meta_description || 'Insights on AI strategy, growth frameworks, and business architecture.';
  const imageUrl = post.cover_image || 'https://www.buzzedison.com/edisonnewb.jpg';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://www.buzzedison.com/insights/${post.slug}`,
      siteName: 'Buzzedison',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author || 'Edison Ade'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return <PostPageClient post={post} />;
}