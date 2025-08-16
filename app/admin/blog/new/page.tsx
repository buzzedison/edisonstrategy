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

  // Check if user is admin (your email)
  const adminEmail = 'buzzedison@gmail.com';
  const isAdmin = user?.email === adminEmail;

  console.log('🔍 Admin Blog Component Debug:', {
    hasSession: !!session,
    hasUser: !!user,
    userEmail: user?.email,
    adminEmail,
    isAdmin,
    emailMatch: user?.email === adminEmail
  });

  // Only redirect when we have definitive auth state
  useEffect(() => {
    console.log('🔄 Admin Blog useEffect triggered:', {
      hasSession: !!session,
      hasUser: !!user,
      isAdmin,
      userEmail: user?.email
    });

    // Only redirect if we're sure there's no session after a delay
    if (!session && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        if (!session) {
          console.log('❌ No session after delay, redirecting to signin');
          router.push('/signin');
        }
      }, 1000); // Give auth time to load

      return () => clearTimeout(timer);
    }
  }, [session, user, router]);

  // Show loading while auth is initializing
  if (!session || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is loaded but not admin, show access denied
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h1>
          <p className="mb-4">You don't have admin privileges to access this page.</p>
          <p className="text-sm text-gray-600 mb-4">Current email: {user.email}</p>
          <p className="text-sm text-gray-600 mb-4">Required email: buzzedison@gmail.com</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
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
          .from('cover-images')
          .upload(`1e7kp8l_1/${fileName}`, coverImage, {
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Error uploading cover image: ${uploadError.message}`);
        }

        if (uploadData) {
          // Get the public URL of the uploaded file
          const { data } = supabase.storage.from('cover-images').getPublicUrl(`1e7kp8l_1/${fileName}`);
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
        status: 'published',
        author: 'Edison Ade'
      }).select();

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error(`Error creating post: ${insertError.message || 'Unknown error'}`);
      }

      if (!insertData || insertData.length === 0) {
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