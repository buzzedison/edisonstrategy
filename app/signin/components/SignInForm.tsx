"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/authContext';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const adminEmail = 'buzzedison@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn(email, password);

      // Redirect based on email
      if (email === adminEmail) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      setError('Invalid credentials. Please verify your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email-address" className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
            Email Identity
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone group-focus-within:text-brand-gold transition-colors" />
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="w-full pl-12 pr-6 py-4 bg-brand-stone/10 border border-transparent rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white transition-all placeholder:text-brand-stone/40"
              placeholder="e.g. strategy@edison.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
              Security Key
            </label>
            <button type="button" className="text-[9px] font-bold uppercase tracking-widest text-brand-stone hover:text-brand-charcoal transition-colors">
              Recover
            </button>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone group-focus-within:text-brand-gold transition-colors" />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full pl-12 pr-6 py-4 bg-brand-stone/10 border border-transparent rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold focus:bg-white transition-all placeholder:text-brand-stone/40"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Access Collective
            <div className="w-1.5 h-1.5 bg-brand-gold rounded-full group-hover:scale-150 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
};

export default SignInForm;
