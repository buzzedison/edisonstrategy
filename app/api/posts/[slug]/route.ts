"use client";

import { supabase } from '../../../../lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    return new Response('Post not found', { status: 404 });
  }
  
  return new Response(JSON.stringify(post), { status: 200 });
}
