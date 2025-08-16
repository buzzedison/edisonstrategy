

import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true);

  if (error) {
    return new Response('Failed to load posts', { status: 500 });
  }

  return new Response(JSON.stringify(posts), { status: 200 });
}
