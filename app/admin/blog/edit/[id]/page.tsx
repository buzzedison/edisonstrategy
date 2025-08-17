'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../../../../lib/supabaseClient';
import { useAuth } from '../../../../../lib/authContext';
import RichTextEditor from '../../../../insights/components/RichTextEditor';
import { ArrowLeft, Save, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const { user, session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState('published');
  const [author, setAuthor] = useState('Edison Ade');

  // Check admin access
  useEffect(() => {
    if (session === null || (user && user.email !== 'buzzedison@gmail.com')) {
      router.push('/dashboard');
      return;
    }
  }, [user, session, router]);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      console.log('Fetching post with params:', params);
      
      if (!params.id) {
        console.log('No ID in params');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching post ID:', params.id);
        const response = await fetch(`/api/posts/by-id/${params.id}`);
        console.log('API response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error:', errorText);
          throw new Error(`Failed to fetch post: ${response.status}`);
        }

        const post = await response.json();
        console.log('Fetched post:', post);
        
        setTitle(post.title || '');
        setSlug(post.slug || '');
        setContent(post.content || '');
        setMetaDescription(post.meta_description || '');
        setTags(Array.isArray(post.tags) ? post.tags.join(', ') : '');
        setCoverImage(post.cover_image || '');
        setStatus(post.status || 'published');
        setAuthor(post.author || 'Edison Ade');
      } catch (error) {
        console.error('Error fetching post:', error);
        alert(`Failed to load post: ${error}`);
        // Don't redirect immediately, let user see the error
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, router]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}-${file.name}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('cover-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('cover-images')
        .getPublicUrl(filePath);

      setCoverImage(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      console.log('🔵 FRONTEND: Starting save process for post ID:', params.id);
      
      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession();
      console.log('🔵 FRONTEND: Session check:', { hasSession: !!session, hasToken: !!session?.access_token });
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if we have a session
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
        console.log('🔵 FRONTEND: Added auth header');
      }

      const requestData = {
        title,
        slug,
        content,
        cover_image: coverImage,
        meta_description: metaDescription,
        tags,
        status,
        author
      };
      
      console.log('🔵 FRONTEND: Sending request to:', `/api/posts/by-id/${params.id}`);
      console.log('🔵 FRONTEND: Request data preview:', {
        title,
        slug,
        contentLength: content?.length || 0,
        tags,
        status,
        author
      });

      const response = await fetch(`/api/posts/by-id/${params.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          title,
          slug,
          content,
          cover_image: coverImage,
          meta_description: metaDescription,
          tags,
          status,
          author
        }),
      });

      console.log('🔵 FRONTEND: Response status:', response.status);
      console.log('🔵 FRONTEND: Response ok:', response.ok);

      if (!response.ok) {
        const error = await response.json();
        console.error('🔴 FRONTEND API ERROR:', error);
        console.error('🔴 FRONTEND Response status:', response.status);
        console.error('🔴 FRONTEND Response headers:', Object.fromEntries(response.headers.entries()));
        throw new Error(error.error || 'Failed to update post');
      }

      const result = await response.json();
      console.log('🟢 FRONTEND: Update successful:', result);
      
      // Store the updated post slug for potential redirect
      const updatedSlug = result.slug || slug;
      
      alert('Post updated successfully!');
      
      // Ask user if they want to view the updated post
      const viewPost = confirm('Would you like to view the updated post?');
      
      if (viewPost) {
        // Open the post in a new tab with cache busting
        const postUrl = `/insights/${updatedSlug}?refresh=${Date.now()}`;
        window.open(postUrl, '_blank');
        
        // Also trigger a page reload for any existing tabs with this post
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('post_updated', `${updatedSlug}:${Date.now()}`);
        }
      }
      
      router.push('/admin/blog/listing');
    } catch (error) {
      console.error('Error updating post:', error);
      alert(`Failed to update post: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession();
      
      const headers: HeadersInit = {};
      
      // Add authorization header if we have a session
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const response = await fetch(`/api/posts/by-id/${params.id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete post');
      }

      alert('Post deleted successfully!');
      router.push('/admin/blog/listing');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(`Failed to delete post: ${error}`);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post ID: {params.id}...</p>
          <p className="text-sm text-gray-500 mt-2">Check console for debug info</p>
        </div>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (session && user?.email !== 'buzzedison@gmail.com') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to edit posts.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blog/listing"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Link
              href={`/insights/${slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Link>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
            
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold shadow-lg"
            >
              <Save className="h-5 w-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Fixed Save Button for Mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold shadow-xl"
          >
            <Save className="h-5 w-5" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter post title..."
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="post-url-slug"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description for SEO..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tag1, tag2, tag3"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {coverImage && (
              <div className="mt-2">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Status and Author */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <RichTextEditor
              value={content}
              onChange={setContent}
            />
          </div>

          {/* Bottom Save Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Make sure to save your changes before leaving this page.
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/blog/listing"
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold shadow-lg"
              >
                <Save className="h-5 w-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Post
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}