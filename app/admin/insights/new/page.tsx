"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    Eye,
    Image as ImageIcon,
    X,
    Loader2,
    Sparkles,
    Type,
    Hash,
    Search,
    Globe
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';

const RichTextEditor = dynamic(() => import('@/app/insights/components/RichTextEditor'), {
    ssr: false,
    loading: () => <div className="h-96 w-full bg-brand-stone/30 animate-pulse rounded-2xl" />
});

export default function PostEditor() {
    const router = useRouter();
    const params = useParams();
    const isNew = !params.id;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const titleRef = useRef<HTMLTextAreaElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        tags: '',
        meta_description: '',
        status: 'published' as 'published' | 'draft',
        cover_image: ''
    });

    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (!isNew) {
            fetchPost();
        }
    }, [params.id]);

    async function fetchPost() {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title || '',
                    slug: data.slug || '',
                    content: data.content || '',
                    tags: data.tags?.join(', ') || '',
                    meta_description: data.meta_description || '',
                    status: data.status || 'published',
                    cover_image: data.cover_image || ''
                });
                setPreviewUrl(data.cover_image || '');
            }
        } catch (err) {
            console.error('Error fetching post:', err);
        } finally {
            setFetching(false);
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: isNew ? title.toLowerCase().trim().replace(/[\s\W-]+/g, '-') : prev.slug
        }));

        // Auto-resize
        if (titleRef.current) {
            titleRef.current.style.height = 'auto';
            titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
        }
    };

    // Initial resize
    useEffect(() => {
        if (!fetching && titleRef.current) {
            titleRef.current.style.height = 'auto';
            titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
        }
    }, [fetching]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);

        try {
            let cover_image = formData.cover_image;

            if (coverFile) {
                const fileExt = coverFile.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('cover-images')
                    .upload(fileName, coverFile);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage.from('cover-images').getPublicUrl(fileName);
                cover_image = urlData.publicUrl;
            }

            const postData = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                cover_image,
                author: 'Edison Ade' // Default author
            };

            if (isNew) {
                const { error } = await supabase.from('posts').insert([postData]);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('posts').update(postData).eq('id', params.id);
                if (error) throw error;
            }


            // Trigger local refresh signal for any open viewer tabs
            if (typeof window !== 'undefined') {
                localStorage.setItem('post_updated', `${formData.slug}:${Date.now()}`);
            }

            router.refresh();
            router.push('/admin/insights');
        } catch (err) {
            console.error('Error saving post:', err);
            alert('Failed to save post. Check console.');
        } finally {
            setSaving(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center py-40">
                <Loader2 className="w-10 h-10 animate-spin text-brand-charcoal" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Editorial Header */}
            <header className="flex items-center justify-between mb-16">
                <Link href="/admin/insights" className="group flex items-center gap-3 text-brand-muted hover:text-brand-charcoal transition-colors">
                    <div className="p-2 bg-brand-stone rounded-full group-hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
                </Link>

                <div className="flex items-center gap-4">
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                        className="bg-brand-stone px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-brand-charcoal border-none focus:ring-1 focus:ring-brand-gold outline-none"
                    >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    <button
                        onClick={() => handleSubmit()}
                        disabled={saving}
                        className="px-8 py-3 bg-brand-charcoal text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-sm"
                    >
                        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        {isNew ? 'Dispatch' : 'Update'}
                    </button>
                </div>
            </header>

            <div className="space-y-12">
                {/* Title Input */}
                <div className="space-y-4">
                    <textarea
                        ref={titleRef}
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="Insight Title..."
                        rows={1}
                        className="w-full bg-transparent border-none p-0 text-5xl md:text-6xl font-serif font-medium text-brand-charcoal placeholder:text-brand-stone focus:ring-0 outline-none leading-tight resize-none overflow-hidden"
                    />
                    <div className="flex items-center gap-3 text-brand-muted">
                        <Globe className="w-3.5 h-3.5" />
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            placeholder="url-slug-auto-generated"
                            className="bg-brand-stone/40 px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase border-none focus:ring-1 focus:ring-brand-gold outline-none w-full max-w-sm"
                        />
                    </div>
                </div>

                {/* Cover Image Upload Area */}
                <section className="relative group">
                    <div className={cn(
                        "w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-brand-stone transition-all duration-700 relative flex items-center justify-center border border-dashed border-gray-200 group-hover:border-brand-gold",
                        previewUrl ? "border-solid border-gray-100" : ""
                    )}>
                        {previewUrl ? (
                            <>
                                <img src={previewUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => { setCoverFile(null); setPreviewUrl(''); setFormData(p => ({ ...p, cover_image: '' })) }}
                                        className="p-4 bg-white/90 rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center gap-4 text-brand-muted hover:text-brand-charcoal transition-colors">
                                <div className="p-6 bg-white rounded-full shadow-sm group-hover:bg-brand-gold group-hover:text-white transition-all">
                                    <ImageIcon className="w-8 h-8" />
                                </div>
                                <div className="text-center">
                                    <span className="text-[11px] font-bold uppercase tracking-widest block mb-1">Upload Masthead</span>
                                    <span className="text-[10px] italic font-light">Recommended: 2400 x 1000px</span>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        )}
                    </div>
                </section>

                {/* Rich Text Content */}
                <section className="prose prose-xl max-w-none">
                    <RichTextEditor
                        value={formData.content}
                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                        placeholder="The world is waiting for your next strategic breakthrough..."
                    />
                </section>

                {/* Metadata section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-brand-muted">
                            <Hash className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Taxonomy</span>
                        </div>
                        <input
                            type="text"
                            placeholder="strategy, inversion, growth (comma separated)"
                            value={formData.tags}
                            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                            className="w-full bg-brand-stone/30 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-brand-gold outline-none"
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-brand-muted">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Metadata</span>
                        </div>
                        <textarea
                            placeholder="A compelling summary for search engines..."
                            value={formData.meta_description}
                            onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                            rows={3}
                            className="w-full bg-brand-stone/30 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-brand-gold outline-none resize-none"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
