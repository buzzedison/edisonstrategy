"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Mail, Lock, Loader2, AlertCircle, UserPlus } from 'lucide-react';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signUp(email, password);
      // Success is handled by the parent useEffect redirection
    } catch (error) {
      console.error('Sign up failed:', error);
      setError('Registration failed. Please attempt again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
            Desired Identification
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone group-focus-within:text-brand-gold transition-colors" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-brand-stone/10 border border-transparent rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white transition-all placeholder:text-brand-stone/40"
              placeholder="e.g. counsel@edison.com"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
            Security Protocol
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone group-focus-within:text-brand-gold transition-colors" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-brand-stone/10 border border-transparent rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white transition-all placeholder:text-brand-stone/40"
              placeholder="Min. 8 characters"
              required
            />
          </div>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl text-red-600 text-[11px] font-medium leading-tight"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-brand-charcoal text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-charcoal/5 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Initiate Membership
            <UserPlus className="w-3.5 h-3.5 mb-0.5 group-hover:rotate-12 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
};

export default function SignUpPage() {
  const { user } = useAuth();
  const router = useRouter();

  const adminEmail = 'buzzedison@gmail.com';

  useEffect(() => {
    if (user) {
      if (user.email === adminEmail) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  if (user) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col md:flex-row">
      {/* Left Column: Invitation & Context */}
      <div className="md:w-1/2 bg-brand-charcoal p-12 lg:p-24 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <Link href="/" className="inline-flex items-center gap-2 group relative z-10">
          <ArrowLeft className="w-4 h-4 text-brand-gold group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-stone opacity-60 group-hover:opacity-100 transition-opacity">Back to Library</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-gold border border-white/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Invitation
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight">
            Join the <br />
            <span className="text-brand-stone/40 italic font-light">Edison Collective.</span>
          </h1>

          <p className="max-w-md text-lg text-brand-stone/60 font-light leading-relaxed">
            Unlock exclusive frameworks, track your strategic progression, and contribute to the hive mind of modern strategy.
          </p>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-stone/30 italic">EST. 2024 — ACCESS PROTOCOL</p>
        </div>
      </div>

      {/* Right Column: Enrollment Area */}
      <div className="md:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-sm w-full space-y-10"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-medium text-brand-charcoal">Enroll</h2>
            <p className="text-brand-muted font-light italic text-sm">Become a permanent part of the strategic narrative.</p>
          </div>

          <SignUpForm />

          <p className="text-center text-sm text-brand-muted font-light">
            Already acknowledged? {' '}
            <Link href="/signin" className="text-brand-charcoal font-bold hover:text-brand-gold transition-colors underline underline-offset-4 decoration-brand-stone">
              Identify Yourself.
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
