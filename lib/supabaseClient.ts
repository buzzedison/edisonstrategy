import { createClient } from '@supabase/supabase-js'; // Import createClient from Supabase SDK

// Ensure environment variables are set correctly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Remove console logs that expose sensitive information
// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Key:", supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is missing from environment variables.");
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey); // Create and export the Supabase client
