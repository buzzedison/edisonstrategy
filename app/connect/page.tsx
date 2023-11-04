"use client"
// pages/AuthPage.tsx
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import SignInForm from './components/SignIn';
import SignUpForm from './components/SignUp';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { data: session, status } = useSession();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>
        </div>
        {isLogin ? <SignInForm /> : <SignUpForm />}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isLogin ? "New to us?" : "Already have an account?"}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <div>
              <button
                onClick={toggleForm}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                {isLogin ? "Create an account" : "Sign in to your account"}
              </button>
            </div>

            <div>
              {/* This button could trigger Google OAuth flow */}
              <button
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
