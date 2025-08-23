// app/component/SubscribeForm.tsx

"use client"

import React, { useState } from 'react';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage('🎉 Welcome! Check your email to confirm your subscription.');
        setEmail('');
        setFirstName('');
      } else {
        setIsSuccess(false);
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Practical solutions for creators and founders</h2>
        <p className="mb-6 text-gray-600">Subscribe to receive weekly tips to help you grow as a creator or founder</p>
        
        {message && (
          <div className={`mb-4 p-3 rounded-md ${
            isSuccess 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
              First Name (optional)
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your first name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="consent"
              required
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
              I agree to receive newsletters and accept the{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                data privacy statement
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className={`w-full py-3 px-4 rounded-md font-semibold transition-colors ${
              isLoading || !email
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            } text-white`}
          >
            {isLoading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          No spam. Unsubscribe anytime. Powered by Kit.
        </p>
      </div>
    </div>
  );
};

export default SubscribeForm;
