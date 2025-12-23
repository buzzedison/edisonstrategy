"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';
import SignInForm from './components/SignInForm';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
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
      {/* Left Column: Branding & Messaging */}
      <div className="md:w-1/2 bg-brand-charcoal p-12 lg:p-24 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

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
            Members Access
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight">
            Strategic Counsel. <br />
            <span className="text-brand-stone/40 italic font-light">Unmatched Insights.</span>
          </h1>

          <p className="max-w-md text-lg text-brand-stone/60 font-light leading-relaxed">
            Welcome back to the collective. Access your saved frameworks, bookmarked dispatches, and deep-dive strategies.
          </p>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-stone/30 italic">EST. 2024 — BUZZEDISON STRATEGY</p>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="md:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-sm w-full space-y-10"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-medium text-brand-charcoal">Sign In</h2>
            <p className="text-brand-muted font-light italic text-sm">Continue your journey through the strategic landscape.</p>
          </div>

          <SignInForm />

          <p className="text-center text-sm text-brand-muted font-light">
            New to the collective? {' '}
            <Link href="/signup" className="text-brand-charcoal font-bold hover:text-brand-gold transition-colors underline underline-offset-4 decoration-brand-stone">
              Join Us.
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
