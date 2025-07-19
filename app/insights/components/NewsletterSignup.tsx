'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'sidebar' | 'inline';
  className?: string;
}

const NewsletterSignup = ({ variant = 'default', className = '' }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      // Replace this with your actual newsletter signup logic
      // This could be Mailchimp, ConvertKit, or your own API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email for confirmation.');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200 ${className}`}>
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-3">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Get Weekly Insights
          </h3>
          <p className="text-sm text-gray-600">
            Join 1,000+ founders getting actionable business strategies every week.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-700">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Mail className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Never miss an insight
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest business strategies and startup insights delivered to your inbox.
            </p>

            {status === 'success' ? (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm whitespace-nowrap"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                <AlertCircle className="h-4 w-4" />
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
          <Mail className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">
          Join 1,000+ Entrepreneurs
        </h3>
        <p className="text-blue-100 mb-6">
          Get weekly insights on building and scaling successful businesses. No spam, just actionable strategies.
        </p>

        {status === 'success' ? (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-lg">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-blue-600 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {status === 'loading' ? 'Subscribing...' : 'Get Weekly Insights'}
            </button>
            {status === 'error' && (
              <div className="flex items-center justify-center gap-2 text-red-200">
                <AlertCircle className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}
          </form>
        )}

        <p className="text-xs text-blue-200 mt-4">
          Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup; 