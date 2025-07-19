import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Get user's bookmarks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const { data: bookmarks, error } = await supabase
      .from('bookmarks')
      .select(`
        id,
        created_at,
        posts (
          id,
          title,
          slug,
          cover_image,
          meta_description,
          created_at,
          author,
          tags
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookmarks:', error);
      return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
    }

    return NextResponse.json({ bookmarks: bookmarks || [] });
  } catch (error) {
    console.error('Error in GET /api/bookmarks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add bookmark
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, postId } = body;

    if (!userId || !postId) {
      return NextResponse.json({ error: 'User ID and Post ID required' }, { status: 400 });
    }

    // Check if bookmark already exists
    const { data: existing, error: checkError } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing bookmark:', checkError);
      return NextResponse.json({ error: 'Failed to check bookmark' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ message: 'Bookmark already exists' }, { status: 200 });
    }

    // Create new bookmark
    const { data: bookmark, error } = await supabase
      .from('bookmarks')
      .insert([
        {
          user_id: userId,
          post_id: postId,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating bookmark:', error);
      return NextResponse.json({ error: 'Failed to create bookmark' }, { status: 500 });
    }

    return NextResponse.json({ bookmark, message: 'Bookmark added successfully' });
  } catch (error) {
    console.error('Error in POST /api/bookmarks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Remove bookmark
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const postId = searchParams.get('postId');

    if (!userId || !postId) {
      return NextResponse.json({ error: 'User ID and Post ID required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);

    if (error) {
      console.error('Error removing bookmark:', error);
      return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/bookmarks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 