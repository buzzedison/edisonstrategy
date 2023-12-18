import React from 'react';
import { signIn } from 'next-auth/react';

const SignInForm: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    // Call signIn method from NextAuth, or your custom sign-in logic
    signIn('credentials', { email, password, redirect: false });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {/* Other form elements */}
      <div>
        <label htmlFor="email-address" className="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
      </div>
      {/* Rest of the form elements */}
      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign In</button>
      </div>
    </form>
  );
};

export default SignInForm;
