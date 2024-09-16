// app/components/HeroPostCard.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tag, Clock, ArrowRight } from 'lucide-react';

interface HeroPostCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    content: string;
    tags: string[];
    created_at: string;
  };
}

const HeroPostCard: React.FC<HeroPostCardProps> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  const coverImageUrl = post.cover_image.startsWith('http')
    ? post.cover_image
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cover-images/${post.cover_image}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/insights/${post.slug}`}>
        <div className="block">
          <div className="relative w-full h-64">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {post.title}
              </h2>
              <div className="flex items-center text-xs text-gray-300">
                <Clock size={14} className="mr-1" />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HeroPostCard;