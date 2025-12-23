"use client";

import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import {
  Plus,
  Library,
  BarChart3,
  Users,
  ArrowUpRight,
  TrendingUp,
  Clock,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalComments: 0,
    engagementRate: '0%'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: posts, error } = await supabase
          .from('posts')
          .select('views, id');

        if (error) throw error;

        const totalViews = posts?.reduce((acc, post) => acc + (post.views || 0), 0) || 0;
        const totalPosts = posts?.length || 0;

        setStats({
          totalPosts,
          totalViews,
          totalComments: 0, // Fallback for now
          engagementRate: '4.2%' // Mock engagement
        });
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const quickActions = [
    { title: 'Write New Insight', desc: 'Craft your next masterpiece', href: '/admin/insights/new', icon: Plus, color: 'bg-brand-charcoal text-white' },
    { title: 'Manage Library', desc: 'Refine your existing wisdom', href: '/admin/insights', icon: Library, color: 'bg-brand-stone text-brand-charcoal' },
    { title: 'View Analytics', desc: 'Understand your impact', href: '/admin/analytics', icon: BarChart3, color: 'bg-white text-brand-charcoal border border-gray-100' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-serif font-medium text-brand-charcoal mb-2 tracking-tight">
          Welcome back, <span className="italic font-light">Edison.</span>
        </h1>
        <p className="text-brand-muted font-light">Your strategic command center is ready.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Insights', value: stats.totalPosts, icon: Library, trend: '+3 this month' },
          { label: 'Strategic Reach', value: stats.totalViews.toLocaleString(), icon: Users, trend: '85% active' },
          { label: 'Conversations', value: stats.totalComments, icon: MessageSquare, trend: 'Active engagement' },
          { label: 'Growth Velocity', value: stats.engagementRate, icon: TrendingUp, trend: 'Steady climb' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-stone rounded-2xl text-brand-charcoal">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B4B1AD]">{stat.trend}</span>
            </div>
            <div className="text-3xl font-serif font-medium text-brand-charcoal mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted">Directives</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {quickActions.map((action, i) => (
            <Link key={action.title} href={action.href}>
              <motion.div
                whileHover={{ y: -5 }}
                className={cn(
                  "p-8 rounded-[2.5rem] flex flex-col items-start transition-all duration-300 group shadow-sm",
                  action.color
                )}
              >
                <div className="p-4 rounded-full bg-white/20 mb-6 group-hover:rotate-12 transition-transform">
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">{action.title}</h3>
                <p className="text-sm opacity-60 mb-8 font-light italic">{action.desc}</p>
                <div className="mt-auto w-full flex justify-end">
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/25 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity Mockup */}
      <section className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted">Recent Dispatches</h2>
          <Link href="/admin/insights" className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:underline">View All Library</Link>
        </div>
        <div className="space-y-6">
          {[1, 2].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 group cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-stone overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="w-full h-full bg-[#E5E2DE]" />
                </div>
                <div>
                  <h4 className="font-serif font-medium text-brand-charcoal group-hover:text-brand-muted transition-colors">The Inversion Method: Strategic Problem Solving</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 2 hours ago
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold italic">Published</span>
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-charcoal transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
