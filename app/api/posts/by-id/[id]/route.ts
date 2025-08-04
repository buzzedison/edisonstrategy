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
      headers: { 'Content-Type': 'application/json' }
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
    // Check admin access
    const { session } = await getSupabaseSession(request);
    if (!session?.user || session.user.email !== 'buzzedison@gmail.com') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
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

    const { data, error } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        content,
        cover_image,
        meta_description,
        tags: Array.isArray(tags) ? tags : tags?.split(',').map((tag: string) => tag.trim()),
        status: status || 'published',
        author: author || 'Edison Ade',
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return new Response(JSON.stringify({ error: 'Failed to update post' }), { 
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
    // Check admin access
    const { session } = await getSupabaseSession(request);
    if (!session?.user || session.user.email !== 'buzzedison@gmail.com') {
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