'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function DebugSupabase() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState('');
  const [slug, setSlug] = useState('');

  const testQuery = async (type: string) => {
    setLoading(true);
    setResults(null);

    try {
      // Create fresh client
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: { persistSession: false },
          global: {
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'X-Debug': Date.now().toString()
            }
          }
        }
      );

      let query;
      
      switch (type) {
        case 'all':
          query = supabase
            .from('posts')
            .select('id, title, slug, updated_at, created_at')
            .order('updated_at', { ascending: false })
            .limit(10);
          break;
          
        case 'by-id':
          if (!postId) {
            alert('Please enter a post ID');
            setLoading(false);
            return;
          }
          query = supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single();
          break;
          
        case 'by-slug':
          if (!slug) {
            alert('Please enter a slug');
            setLoading(false);
            return;
          }
          query = supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .single();
          break;
          
        default:
          throw new Error('Invalid query type');
      }

      const { data, error } = await query;

      if (error) {
        setResults({ error: error.message, details: error });
      } else {
        setResults({ 
          data, 
          timestamp: new Date().toISOString(),
          type,
          count: Array.isArray(data) ? data.length : 1
        });
      }
    } catch (err: any) {
      setResults({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">🔍 Supabase Debug Console</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Query Controls */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Query Tests</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => testQuery('all')}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Latest 10 Posts'}
              </button>
              
              <div className="border-t pt-4">
                <label className="block text-sm font-medium mb-2">Test by Post ID:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    placeholder="Enter post ID (e.g., 123)"
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => testQuery('by-id')}
                    disabled={loading || !postId}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Query
                  </button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <label className="block text-sm font-medium mb-2">Test by Slug:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Enter slug (e.g., my-post-slug)"
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => testQuery('by-slug')}
                    disabled={loading || !slug}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    Query
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Raw SQL Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">📝 Sample Queries</h2>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-100 p-3 rounded">
                <strong>Recent Updates:</strong>
                <pre className="mt-1 text-xs">
{`SELECT id, title, slug, 
  updated_at, created_at 
FROM posts 
ORDER BY updated_at DESC 
LIMIT 5;`}
                </pre>
              </div>
              
              <div className="bg-gray-100 p-3 rounded">
                <strong>Specific Post:</strong>
                <pre className="mt-1 text-xs">
{`SELECT * FROM posts 
WHERE id = YOUR_POST_ID;`}
                </pre>
              </div>
              
              <div className="bg-gray-100 p-3 rounded">
                <strong>By Slug:</strong>
                <pre className="mt-1 text-xs">
{`SELECT * FROM posts 
WHERE slug = 'your-slug-here';`}
                </pre>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-700">
                💡 <strong>Tip:</strong> Copy these queries and run them directly in your Supabase dashboard's SQL editor for the most accurate results.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">📊 Query Results</h2>
            
            {results.error ? (
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <h3 className="font-semibold text-red-800">Error:</h3>
                <p className="text-red-700">{results.error}</p>
                {results.details && (
                  <pre className="mt-2 text-xs text-red-600 overflow-auto">
                    {JSON.stringify(results.details, null, 2)}
                  </pre>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Query Type: <strong>{results.type}</strong></span>
                  <span>Count: <strong>{results.count}</strong></span>
                  <span>Timestamp: <strong>{results.timestamp}</strong></span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded">
                  <pre className="text-xs overflow-auto max-h-96">
                    {JSON.stringify(results.data, null, 2)}
                  </pre>
                </div>
                
                {Array.isArray(results.data) && results.data.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-semibold mb-2">Quick Summary:</h3>
                    <div className="text-sm space-y-1">
                      {results.data.slice(0, 3).map((post: any, idx: number) => (
                        <div key={idx} className="flex justify-between">
                          <span>{post.title?.substring(0, 40)}...</span>
                          <span className="text-gray-500">
                            {new Date(post.updated_at).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">🎯 What to Check:</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>1. <strong>Latest Posts:</strong> Are your recent edits showing up in the updated_at timestamps?</li>
            <li>2. <strong>Specific Post:</strong> Enter the ID of a post you just edited to see if changes are there</li>
            <li>3. <strong>Content Match:</strong> Does the content in the database match what you expected?</li>
            <li>4. <strong>Timestamps:</strong> Is the updated_at field recent (within the last few minutes)?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
