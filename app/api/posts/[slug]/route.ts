import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  const { data: post, error } = await supabase.from('posts').select('*').eq('slug', slug).single();
  if (error) return new Response('Post not found', { status: 404 });
  
  return new Response(JSON.stringify(post), { status: 200 });
}
