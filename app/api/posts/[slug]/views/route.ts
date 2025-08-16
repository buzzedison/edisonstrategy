import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Get client IP for basic tracking (to prevent spam)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // Get user agent for basic bot detection
    const userAgent = request.headers.get('user-agent') || '';
    
    // Basic bot detection (you can enhance this)
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    
    if (isBot) {
      return NextResponse.json({ message: 'Bot detected, view not counted' }, { status: 200 });
    }

    // First, get the current post to check if it exists
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('id, views')
      .eq('slug', slug)
      .single();

    if (fetchError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Update the view count
    const newViewCount = (post.views || 0) + 1;
    
    const { error: updateError } = await supabase
      .from('posts')
      .update({ views: newViewCount })
      .eq('slug', slug);

    if (updateError) {
      console.error('Error updating views:', updateError);
      return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
    }

    // Optionally, log the view for analytics (create a views_log table)
    try {
      await supabase
        .from('post_views')
        .insert({
          post_id: post.id,
          ip_address: ip.substring(0, 50), // Truncate IP for privacy
          user_agent: userAgent.substring(0, 200), // Truncate user agent
          viewed_at: new Date().toISOString()
        });
    } catch (logError) {
      // Don't fail the main request if logging fails
      console.warn('Failed to log view:', logError);
    }

    return NextResponse.json({ 
      success: true, 
      views: newViewCount 
    }, { status: 200 });

  } catch (error) {
    console.error('View tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Get current view count
    const { data: post, error } = await supabase
      .from('posts')
      .select('views')
      .eq('slug', slug)
      .single();

    if (error || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      views: post.views || 0 
    }, { status: 200 });

  } catch (error) {
    console.error('Get views error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 