"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../lib/authContext';

// Dynamically import ReactQuill to avoid server-side rendering issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Create Supabase client outside of the component if possible, or ensure this is in an environment where process.env is accessible
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateBlogPost() {
  const { user, session } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Redirect to signin if there's no session, but only on the client side
  useEffect(() => {
    if (!session && typeof window !== 'undefined') {
      router.push('/signin');
    }
  }, [session, router]);

  // If there's no session, don't render anything or show a loading state
  if (!session) {
    return null; // or return <div>Loading...</div>;
  }

  // Function to handle form submission
  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let coverImageUrl = '';

      if (coverImage) {
        // Generate a unique file name
        const fileName = `${Date.now()}-${coverImage.name}`;
        
        // Upload the file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('cover-image')
          .upload(`1e7kp8l_1/${fileName}`, coverImage, {
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Error uploading cover image: ${uploadError.message}`);
        }

        if (uploadData) {
          // Get the public URL of the uploaded file
          const { data } = supabase.storage.from('cover-image').getPublicUrl(`1e7kp8l_1/${fileName}`);
          if (!data) throw new Error('Error getting public URL: No data returned');
          coverImageUrl = data.publicUrl;
        } else {
          throw new Error('Upload successful but no data returned');
        }
      }

      const { data: insertData, error: insertError } = await supabase.from('posts').insert({
        title,
        slug,
        content,
        cover_image: coverImageUrl,
        meta_description: metaDescription,
        tags: tags.split(',').map(tag => tag.trim()),
        is_published: true,
        published_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error(`Error creating post: ${insertError.message || 'Unknown error'}`);
      }

      if (!insertData) {
        throw new Error('Post creation successful but no data returned');
      }

      setSuccess(true);
      // Reset form fields after successful submission
      setTitle('');
      setSlug('');
      setMetaDescription('');
      setContent('');
      setCoverImage(null);
      setTags('');
    } catch (err) {
      console.error('Error in createPost:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while creating the post');
    } finally {
      setLoading(false);
    }
  };

  // Handle cover image change
  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImage(event.target.files[0]);
    } else {
      console.warn('No file selected or file selection cancelled');
    }
  };

  return (
    <form onSubmit={createPost} className="container mx-auto max-w-4xl py-12 px-6">
      <h1 className="text-6xl font-bold mb-12 text-center text-gray-800 pt-24">Create Blog Post</h1>
      <p className="text-center mb-8">Logged in as: {user?.email}</p>

      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">Post created successfully!</div>}

      <div className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-6 text-4xl font-bold border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
          className="w-full p-4 text-xl border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Meta Description"
          className="w-full p-4 text-xl border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />
      </div>

      <div className="mb-8">
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="w-full p-4 text-xl border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent"
        />
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full p-4 text-xl border-b border-gray-200 focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />
      </div>

      <div className="mb-8">
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your story..."
          className="bg-white"
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          style={{ minHeight: '400px' }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}