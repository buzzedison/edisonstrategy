import { NextResponse } from 'next/server';
import { supabase } from './lib/supabaseClient';
import { getSupabaseSession } from './lib/authHelper';

export async function middleware(req: Request) {
  console.log('🔍 Middleware triggered for:', req.url);
  
  const { session } = await getSupabaseSession(req);
  
  console.log('📋 Session status:', {
    hasSession: !!session,
    hasUser: !!session?.user,
    userEmail: session?.user?.email
  });

  // If no session exists, redirect to signin
  if (!session || !session.user) {
    console.log('❌ No session or user, redirecting to signin');
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Check if the user is the admin (your email)
  const userEmail = session.user.email;
  const adminEmail = 'buzzedison@gmail.com'; // Your admin email
  
  console.log('🔐 Admin check:', {
    userEmail,
    adminEmail,
    isMatch: userEmail === adminEmail,
    emailType: typeof userEmail,
    adminType: typeof adminEmail
  });
  
  if (userEmail !== adminEmail) {
    console.log('❌ Email mismatch, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  console.log('✅ Admin access granted');
  // Continue if user is an admin
  return NextResponse.next();
}

export const config = {
  matcher: [], // Temporarily disabled for testing
};
