import { Metadata } from 'next';
import { supabase } from '../../lib/supabaseClient';
import NavbarNew from '../components/MyNav';

import { AuthProvider } from '../../lib/authContext';

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = params;

  // Fetch the post data based on the slug from Supabase
  const { data: post, error } = await supabase
    .from('posts')
    .select('title, meta_description, cover_image')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist.',
      openGraph: {
        title: 'Post Not Found',
        description: 'This post does not exist.',
        images: ['/default-image.jpg'], // Provide a default image if needed
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Post Not Found',
        description: 'This post does not exist.',
        images: ['/default-image.jpg'],
      },
    };
  }

  // Return metadata for OpenGraph and Twitter
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

export default function InsightsLayout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <NavbarNew />
      <main>{children}</main>

    </AuthProvider>
  );
}
