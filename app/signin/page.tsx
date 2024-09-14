'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';
import SignInForm from './components/SignInForm'




export default function SignInPage() {
  const { user } = useAuth();  // Get the user from the Auth context
  const router = useRouter();

  // If user is already signed in, redirect to the dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user) {
    return null; // Show nothing or a loading spinner while redirecting
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
