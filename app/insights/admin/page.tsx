"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';  // Import Supabase client
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';  // Import uuid for generating unique file names
import dynamic from 'next/dynamic';  // Import dynamic for RichTextEditor

// Dynamically import RichTextEditor to prevent SSR issues if needed
const RichTextEditor = dynamic(() => import('../components/RichTextEditor'), { ssr: false });

export default function AdminPage() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null); // State for the cover image file

  // Auto-generate slug
  const generateSlug = (title: string) =>
    title?.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);  // Store the selected file in the state
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    let coverImageUrl = '';

    // Upload file to Supabase Storage if a file was selected
    if (coverImageFile) {
      const uniqueFileName = `${uuidv4()}-${coverImageFile.name}`;
      const { data: fileData, error: fileError } = await supabase.storage
        .from('cover-images')
        .upload(uniqueFileName, coverImageFile);

      if (fileError) {
        console.error(fileError);
        alert('Error uploading cover image');
        setLoading(false);
        return;
      }

      // Get the public URL for the uploaded image
      coverImageUrl = supabase.storage.from('cover-images').getPublicUrl(uniqueFileName).data.publicUrl;
    }

    try {
      // Insert the post into Supabase with the cover image URL
      const { error } = await supabase.from('posts').insert([
        {
          title: data.title,
          slug: data.slug,
          content: data.content,
          tags: data.tags.split(',').map((tag: string) => tag.trim()),
          cover_image: coverImageUrl,
          meta_description: data.metaDescription,
        },
      ]);

      if (error) {
        console.error(error);
        alert('Error creating post');
      } else {
        alert('Post created successfully!');
        router.push('/insights');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">Create New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Title */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Title</label>
          <input
            {...register('title', { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            type="text"
            placeholder="Enter post title"
            onChange={(e) => setValue('slug', generateSlug(e.target.value))}
          />
          {errors.title && <span className="text-red-500 text-sm mt-1">Title is required</span>}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Slug</label>
          <input
            {...register('slug', { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none bg-gray-100 focus:ring-2 focus:ring-blue-500 transition duration-200"
            type="text"
            placeholder="Auto-generated slug"
            readOnly
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Content</label>
          <RichTextEditor
            onChange={(value) => setValue('content', value)}
          />
          {errors.content && <span className="text-red-500 text-sm mt-1">Content is required</span>}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
          <input
            {...register('tags')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            type="text"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onChange={handleFileChange}
          />
          {coverImageFile && (
            <p className="text-sm text-gray-500 mt-2">Selected file: {coverImageFile.name}</p>
          )}
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Meta Description</label>
          <textarea
            {...register('metaDescription')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Brief description for SEO"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-white mx-auto" />
            ) : (
              'Publish Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
