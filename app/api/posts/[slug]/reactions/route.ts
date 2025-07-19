import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { reaction } = await request.json();

    if (!slug || !reaction) {
      return NextResponse.json({ error: 'Slug and reaction are required' }, { status: 400 });
    }

    // Valid reaction types
    const validReactions = ['like', 'love', 'insightful', 'helpful', 'disagree'];
    if (!validReactions.includes(reaction)) {
      return NextResponse.json({ error: 'Invalid reaction type' }, { status: 400 });
    }

    // Get client IP for basic tracking
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Get the post
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('id, reactions')
      .eq('slug', slug)
      .single();

    if (fetchError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if user already reacted (basic IP-based check)
    const { data: existingReaction } = await supabase
      .from('post_reactions')
      .select('id, reaction_type')
      .eq('post_id', post.id)
      .eq('ip_address', ip.substring(0, 50))
      .single();

    let updatedReactions = post.reactions || {};

    if (existingReaction) {
      // User already reacted - toggle or change reaction
      if (existingReaction.reaction_type === reaction) {
        // Remove reaction (toggle off)
        await supabase
          .from('post_reactions')
          .delete()
          .eq('id', existingReaction.id);

        // Decrease count
        updatedReactions[reaction] = Math.max((updatedReactions[reaction] || 1) - 1, 0);
      } else {
        // Change reaction
        await supabase
          .from('post_reactions')
          .update({ reaction_type: reaction })
          .eq('id', existingReaction.id);

        // Decrease old reaction count, increase new reaction count
        updatedReactions[existingReaction.reaction_type] = Math.max((updatedReactions[existingReaction.reaction_type] || 1) - 1, 0);
        updatedReactions[reaction] = (updatedReactions[reaction] || 0) + 1;
      }
    } else {
      // New reaction
      await supabase
        .from('post_reactions')
        .insert({
          post_id: post.id,
          reaction_type: reaction,
          ip_address: ip.substring(0, 50),
          created_at: new Date().toISOString()
        });

      // Increase count
      updatedReactions[reaction] = (updatedReactions[reaction] || 0) + 1;
    }

    // Update post reactions count
    const { error: updateError } = await supabase
      .from('posts')
      .update({ reactions: updatedReactions })
      .eq('slug', slug);

    if (updateError) {
      console.error('Error updating reactions:', updateError);
      return NextResponse.json({ error: 'Failed to update reactions' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      reactions: updatedReactions 
    }, { status: 200 });

  } catch (error) {
    console.error('Reaction error:', error);
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

    // Get current reactions
    const { data: post, error } = await supabase
      .from('posts')
      .select('reactions')
      .eq('slug', slug)
      .single();

    if (error || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      reactions: post.reactions || {} 
    }, { status: 200 });

  } catch (error) {
    console.error('Get reactions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 