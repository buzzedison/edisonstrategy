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
      <div className={`bg-brand-stone p-8 rounded-[2rem] border border-gray-100 shadow-sm ${className}`}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl border border-gray-50 shadow-sm mb-4">
            <Mail className="h-6 w-6 text-brand-gold" />
          </div>
          <h3 className="text-xl font-serif font-bold text-brand-charcoal mb-2">
            Weekly Updates
          </h3>
          <p className="text-sm text-brand-muted font-light leading-relaxed">
            Zero noise. Pure high-level strategy for founders and engineers.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-4">
            <CheckCircle className="h-10 w-10 text-brand-gold mx-auto mb-3" />
            <p className="text-sm font-medium text-brand-charcoal">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email..."
              className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-xl focus:ring-1 focus:ring-brand-charcoal focus:border-brand-charcoal transition-all text-sm outline-none"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-brand-charcoal hover:bg-black disabled:bg-gray-400 text-white text-[11px] font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all shadow-sm"
            >
              {status === 'loading' ? 'Encrypting...' : 'Access Now'}
            </button>
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-widest justify-center">
                <AlertCircle className="h-3.5 w-3.5" />
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
      <div className={`bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm ${className}`}>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-stone rounded-2xl border border-gray-50">
              <Mail className="h-6 w-6 text-brand-gold" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-2">
              Stay ahead of the curve
            </h3>
            <p className="text-brand-muted font-light text-sm leading-relaxed mb-6 md:mb-0">
              Analysis and growth frameworks delivered directly to your tactical stack.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {status === 'success' ? (
              <div className="flex items-center gap-3 text-brand-gold bg-brand-stone px-6 py-3 rounded-xl border border-gray-50">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="px-5 py-3.5 bg-brand-stone border border-gray-100 rounded-xl focus:ring-1 focus:ring-brand-charcoal focus:border-brand-charcoal text-sm outline-none min-w-[280px]"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-brand-charcoal hover:bg-black disabled:bg-gray-400 text-white text-[11px] font-bold uppercase tracking-widest py-3.5 px-8 rounded-xl transition-all shadow-sm whitespace-nowrap"
                >
                  {status === 'loading' ? 'Joining...' : 'Subscribe'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-widest mt-3 justify-center md:justify-start">
                <AlertCircle className="h-3.5 w-3.5" />
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
    <div className={`text-center bg-brand-charcoal text-white p-12 md:p-20 rounded-[3rem] relative overflow-hidden shadow-2xl ${className}`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-xl mx-auto relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/10 rounded-3xl mb-8">
          <Mail className="h-8 w-8 text-brand-gold" />
        </div>
        <h3 className="text-3xl md:text-5xl font-serif font-medium mb-4 leading-tight">
          Master the System.
        </h3>
        <p className="text-gray-400 mb-10 font-light text-lg max-w-md mx-auto">
          Insights on growth architecture, smart automation, and legacy building. Zero fluff.
        </p>

        {status === 'success' ? (
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-brand-gold mx-auto mb-6 drop-shadow-lg" />
            <p className="text-xl font-serif font-medium mb-2">You're in.</p>
            <p className="text-gray-400 font-light">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-brand-gold focus:outline-none focus:border-brand-gold transition-all text-lg"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-white hover:bg-brand-stone disabled:bg-gray-300 text-brand-charcoal text-[11px] font-bold uppercase tracking-widest py-4 px-10 rounded-2xl transition-all shadow-md active:scale-95"
              >
                {status === 'loading' ? 'Processing...' : 'Access Now'}
              </button>
            </div>
            {status === 'error' && (
              <div className="flex items-center justify-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{message}</span>
              </div>
            )}
          </form>
        )}

        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mt-10">
          Unsubscribe anytime. We respect your attention.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup; 