import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const getSupabaseSession = async (req: Request) => {
  try {
    const cookieStore = cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      return { session: null };
    }

    return { session };
  } catch (error) {
    console.error('Error getting session:', error);
    return { session: null };
  }
};
