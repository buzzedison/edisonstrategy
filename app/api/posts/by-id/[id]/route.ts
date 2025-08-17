import { supabase } from '../../../../../lib/supabaseClient';
import { getSupabaseSession } from '../../../../../lib/authHelper';

// GET - Fetch a single post by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch post' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PUT - Update a post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('PUT request for post ID:', params.id);
    // Check admin access - try both server-side session and client-side token
    let isAuthorized = false;
    
    // First try server-side session
    try {
      const { session } = await getSupabaseSession(request);
      if (session?.user && session.user.email === 'buzzedison@gmail.com') {
        isAuthorized = true;
      }
    } catch (error) {
      console.log('Server-side session failed, trying client-side auth');
    }
    
    // If server-side failed, try client-side token
    if (!isAuthorized) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        
        // Verify the token with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (!error && user && user.email === 'buzzedison@gmail.com') {
          isAuthorized = true;
        }
      }
    }
    
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    console.log('Request body received:', {
      ...body,
      content: body.content ? body.content.substring(0, 100) + '...' : 'empty'
    });
    
    const {
      title,
      slug,
      content,
      cover_image,
      meta_description,
      tags,
      status,
      author
    } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return new Response(JSON.stringify({ 
        error: 'Title, slug, and content are required' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // First check if the post exists
    console.log('Checking if post exists with ID:', params.id);
    const { data: existingPost, error: checkError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', params.id)
      .single();

    console.log('Existing post check result:', { existingPost, checkError });

    if (checkError || !existingPost) {
      console.log('Post not found error:', checkError);
      return new Response(JSON.stringify({ error: 'Post not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Process tags
    let processedTags;
    try {
      processedTags = Array.isArray(tags) ? tags : tags?.split(',').map((tag: string) => tag.trim()) || [];
      console.log('Processed tags:', processedTags);
    } catch (error) {
      console.error('Error processing tags:', error);
      processedTags = [];
    }

    // Update the post
    console.log('Attempting to update post with data:', {
      title,
      slug,
      content: content ? content.substring(0, 100) + '...' : 'empty',
      cover_image,
      meta_description,
      tags: processedTags,
      status: status || 'published',
      author: author || 'Edison Ade'
    });

    const { data, error } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        content,
        cover_image,
        meta_description,
        tags: processedTags,
        status: status || 'published',
        author: author || 'Edison Ade',
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id);

    console.log('Update result:', { data, error });

    if (error) {
      console.error('Supabase update error:', error);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If update succeeded, fetch the updated post to return
    const { data: updatedPost, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .single();

    if (fetchError || !updatedPost) {
      console.error('Error fetching updated post:', fetchError);
      // Update succeeded but can't fetch - still return success
      return new Response(JSON.stringify({ 
        message: 'Post updated successfully',
        id: params.id 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(updatedPost), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error updating post - full error:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return new Response(JSON.stringify({ 
      error: 'Failed to update post', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// DELETE - Delete a post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin access - try both server-side session and client-side token
    let isAuthorized = false;
    
    // First try server-side session
    try {
      const { session } = await getSupabaseSession(request);
      if (session?.user && session.user.email === 'buzzedison@gmail.com') {
        isAuthorized = true;
      }
    } catch (error) {
      console.log('Server-side session failed, trying client-side auth');
    }
    
    // If server-side failed, try client-side token
    if (!isAuthorized) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        
        // Verify the token with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (!error && user && user.email === 'buzzedison@gmail.com') {
          isAuthorized = true;
        }
      }
    }
    
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', params.id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete post' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}