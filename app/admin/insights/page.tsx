"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Search,
    MoreHorizontal,
    Clock,
    Tag,
    Calendar,
    Filter,
    Library
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
    id: number;
    title: string;
    slug: string;
    author: string;
    status: string;
    created_at: string;
    tags: string[];
    views: number;
    cover_image?: string;
}

export default function InsightsManagement() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        setLoading(true);
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching posts:', error);
        else setPosts(data || []);
        setLoading(false);
    }

    const handleDelete = async (id: number) => {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) {
            alert('Error deleting post: ' + error.message);
        } else {
            setPosts(posts.filter(p => p.id !== id));
            setDeleteConfirm(null);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-serif font-medium text-brand-charcoal mb-2 tracking-tight">Insights Library</h1>
                    <p className="text-brand-muted font-light italic">Refining the collective wisdom of Edison.</p>
                </div>

                <Link href="/admin/insights/new">
                    <button className="px-8 py-4 bg-brand-charcoal text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-sm flex items-center gap-3 group">
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                        New Entry
                    </button>
                </Link>
            </header>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                    <input
                        type="text"
                        placeholder="Search entries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-stone transition-all"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-4 bg-white border border-gray-100 rounded-2xl text-brand-muted hover:text-brand-charcoal transition-all">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredPosts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-white rounded-[2rem] border border-gray-100 p-6 hover:shadow-lg hover:border-brand-stone transition-all duration-500"
                        >
                            <div className="flex flex-col lg:flex-row gap-8 items-center">
                                {/* Thumbnail */}
                                <div className="w-full lg:w-48 aspect-video lg:aspect-square rounded-2xl bg-brand-stone overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 shrink-0">
                                    {post.cover_image ? (
                                        <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-brand-muted italic text-[10px]">No Imagery</div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <div className={cn(
                                            "px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest",
                                            post.status === 'published' ? "bg-white/90 text-green-700" : "bg-white/90 text-brand-gold"
                                        )}>
                                            {post.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow space-y-3 w-full">
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-brand-gold" /> {new Date(post.created_at).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1.5"><Eye className="w-3 h-3 text-brand-gold" /> {post.views || 0} views</span>
                                    </div>
                                    <h3 className="text-2xl font-serif font-medium text-brand-charcoal group-hover:text-brand-muted transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {post.tags?.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-brand-stone rounded-lg text-[9px] font-bold uppercase tracking-widest text-brand-muted italic">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex lg:flex-col gap-2 w-full lg:w-32">
                                    <Link href={`/admin/insights/edit/${post.id}`} className="flex-1">
                                        <button className="w-full px-4 py-3 bg-brand-stone text-brand-charcoal rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-charcoal hover:text-white transition-all flex items-center justify-center gap-2">
                                            <Edit className="w-3 h-3" /> Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => setDeleteConfirm(post.id)}
                                        className="flex-1 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                    <Link href={`/insights/${post.slug}`} target="_blank" className="flex-1 lg:hidden">
                                        <button className="w-full px-4 py-3 bg-white border border-gray-100 text-brand-muted rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-brand-charcoal transition-all flex items-center justify-center gap-2">
                                            <Eye className="w-3 h-3" /> View
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Delete Modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDeleteConfirm(null)}
                            className="absolute inset-0 bg-brand-charcoal/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl space-y-6"
                        >
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-serif font-medium text-brand-charcoal">Rescind Insight?</h3>
                                <p className="text-brand-muted font-light italic">This will permanently remove the entry from the strategic library.</p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-6 py-4 bg-brand-stone text-brand-charcoal rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all font-sans"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                                >
                                    Delete Forever
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {filteredPosts.length === 0 && !loading && (
                <div className="text-center py-20 bg-brand-stone/30 rounded-[3rem] border border-dashed border-gray-200">
                    <Library className="w-12 h-12 text-brand-muted mx-auto mb-4 opacity-20" />
                    <h3 className="text-xl font-serif font-medium text-brand-charcoal italic">The silence is deafening.</h3>
                    <p className="text-brand-muted font-light mt-2 max-w-xs mx-auto">Try a different search or begin your next great dispatch.</p>
                </div>
            )}
        </div>
    );
}
