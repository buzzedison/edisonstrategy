import { supabase } from '../lib/supabaseClient';
// import MastermindSection from './components/MastermindSection';
import AboutSection from './components/AboutNew';
import Hero from './components/HeroStart';
import ClientPostGrid from './components/ClientPostGrid';

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

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <Hero/>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800 tracking-tight">
          Unconventional Insights on Business, Faith, and the Human Experience
        </h2>
        <ClientPostGrid posts={posts} />
      </section>

      <AboutSection />
      {/* <MastermindSection /> */}
    </div>
  );
}