'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Post {
  id: string;
  title: string;
  // Add other properties as needed
}

export default function AdminBlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*');
      
      if (error) {
        console.error('Error fetching posts', error);
      } else {
        setPosts(data as Post[]);
      }
    }

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      console.error('Error deleting post', error);
    } else {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Manage Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
