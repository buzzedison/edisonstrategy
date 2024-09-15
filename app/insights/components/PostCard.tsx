"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    content: string;
    tags: string[];
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const coverImageUrl = post.cover_image.startsWith('http')
    ? post.cover_image
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cover-images/${post.cover_image}`;

  useEffect(() => {
    console.log('Cover Image URL:', coverImageUrl);
  }, [coverImageUrl]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {coverImageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={coverImageUrl}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          <Link href={`/insights/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-gray-600">
          {post.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
        </p>
        {post.tags && (
          <div className="mt-4">
            {post.tags.map((tag) => (
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
    </div>
  );
};

export default PostCard;
