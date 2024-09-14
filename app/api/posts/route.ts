import { createClient } from '@supabase/supabase-js';

function assertEnv(value: string | undefined): asserts value is string {
  if (!value) throw new Error("Missing environment variable");
}

assertEnv(process.env.SUPABASE_URL);
assertEnv(process.env.SUPABASE_KEY);

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function GET() {
  const { data: posts, error } = await supabase.from('posts').select('*').eq('is_published', true);
  if (error) return new Response('Failed to load posts', { status: 500 });
  return new Response(JSON.stringify(posts), { status: 200 });
}
