"use client"

import { supabase } from '../lib/supabaseClient';
import MastermindSection from './components/MastermindSection';
import AboutSection from './components/AboutNew';
import HeroMain from './components/HeroMain';
import HeroPostCard from './components/HeroPostCard';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  content: string;
  tags: string[];
  created_at: string;
}

const fetchPosts = async () => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) throw error;
  return posts as Post[];
};

const PostsGrid = async () => {
  const posts = await fetchPosts();

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <HeroMain />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h2 
          className="text-4xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800 tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Unconventional Insights on Business, Faith, and the Human Experience
        </motion.h2>
        <PostsGrid />
      </section>

      <AboutSection />
      <MastermindSection />
    </div>
  );
}