import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Get comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // First, get the post ID from the slug
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (postError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get comments for this post
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }

    // Organize comments into a tree structure (parent/child relationships)
    const commentsMap = new Map();
    const rootComments: any[] = [];

    comments?.forEach(comment => {
      commentsMap.set(comment.id, { ...comment, replies: [] });
    });

    comments?.forEach(comment => {
      if (comment.parent_id) {
        const parent = commentsMap.get(comment.parent_id);
        if (parent) {
          parent.replies.push(commentsMap.get(comment.id));
        }
      } else {
        rootComments.push(commentsMap.get(comment.id));
      }
    });

    return NextResponse.json({ comments: rootComments });
  } catch (error) {
    console.error('Error in GET /api/posts/[slug]/comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { content, author_name, author_email, parent_id } = body;

    if (!content || !author_name || !author_email) {
      return NextResponse.json(
        { error: 'Content, author name, and email are required' },
        { status: 400 }
      );
    }

    // Get the post ID from the slug
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (postError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get client IP for basic spam prevention
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Create new comment
    const { data: comment, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: post.id,
          content: content.trim(),
          author_name: author_name.trim(),
          author_email: author_email.trim(),
          parent_id: parent_id || null,
          ip_address: ip,
          status: 'approved', // In a real app, you might want moderation
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }

    return NextResponse.json({ comment, message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error in POST /api/posts/[slug]/comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a comment (for moderation)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');

    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error('Error deleting comment:', error);
      return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/posts/[slug]/comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 