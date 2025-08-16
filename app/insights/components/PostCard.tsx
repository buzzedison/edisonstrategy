"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

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
  const coverImageUrl = post.cover_image.startsWith("http")
    ? post.cover_image
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cover-images/${post.cover_image}`;

  useEffect(() => {
    console.log("Cover Image URL:", coverImageUrl);
  }, [coverImageUrl]);

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 group">
      {coverImageUrl && (
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={coverImageUrl}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            className="group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 space-y-4">
        <h2 className="text-3xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
          <Link href={`/insights/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-gray-300 leading-relaxed">
          {post.content.replace(/<[^>]+>/g, "").substring(0, 150)}...
        </p>
        <div className="flex flex-wrap mt-4 space-x-2">
          {post.tags &&
            post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-yellow-500 text-black rounded-full px-4 py-1 text-sm font-semibold"
              >
                #{tag}
              </span>
            ))}
        </div>
        <Link
          href={`/insights/${post.slug}`}
          className="inline-block mt-6 bg-yellow-500 text-black font-semibold rounded-full px-6 py-3 text-lg hover:bg-yellow-600 hover:text-white transition-colors duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
