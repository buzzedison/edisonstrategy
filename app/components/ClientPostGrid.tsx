'use client';

import { motion } from 'framer-motion';
import HeroPostCard from './HeroPostCard';

interface Post {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  content: string;
  tags: string[];
  created_at: string;
}

const ClientPostGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post: Post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <HeroPostCard post={post} />
        </motion.div>
      ))}
    </div>
  );
};

export default ClientPostGrid;