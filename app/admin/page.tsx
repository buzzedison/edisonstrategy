// app/admin/page.tsx

'use client';

import { useAuth } from '../../lib/authContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not an admin
    if (user?.user_metadata?.role !== 'admin') {
      router.push('/signin');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome Admin {user.email}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
