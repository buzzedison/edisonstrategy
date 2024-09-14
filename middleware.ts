import { NextResponse } from 'next/server';
import { supabase } from './lib/supabaseClient';
import { getSupabaseSession } from './lib/authHelper';

export async function middleware(req: Request) {
  const { session } = await getSupabaseSession(req);

  // If no session exists, redirect to login
  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check if the user has an admin role
  const userRole = session.user.user_metadata?.role;
  
  if (userRole !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Continue if user is an admin
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin'],
};
