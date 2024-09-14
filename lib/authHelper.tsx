import { supabase } from './supabaseClient';

export const getSupabaseSession = async (req: Request) => {
  const supabaseAccessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!supabaseAccessToken) {
    return { session: null };
  }

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return { session: null };
  }

  return { session };
};
