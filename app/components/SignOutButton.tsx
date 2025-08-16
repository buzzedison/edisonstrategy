// app/components/SignOutButton.tsx

'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';  // Correctly import supabase

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/login');
    } else {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Sign Out
    </button>
  );
}
