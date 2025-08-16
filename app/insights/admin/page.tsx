"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';
import { Loader2, UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

// Import Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Dynamically import RichTextEditor
const RichTextEditor = dynamic(() => import('../components/RichTextEditor'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64 border rounded-md"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
});

interface FormData {
  title: string;
  slug: string;
  content: string;
  tags: string;
  metaDescription: string;
  coverImage?: FileList;
}

export default function AdminPage() {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<FormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const titleValue = watch('title');

  useEffect(() => {
    if (titleValue) {
      setValue('slug', generateSlug(titleValue));
    }
  }, [titleValue, setValue]);

  const generateSlug = (title: string) =>
    title?.toLowerCase().trim().replace(/[\s\W-]+/g, '-') || '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setStatusMessage(null); 
      setUploadProgress(0);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      }
      reader.readAsDataURL(file);
    } else {
      setCoverImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const fileInputRegistration = register('coverImage');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setStatusMessage(null);
    setUploadProgress(0);
    let coverImageUrl = '';

    try {
      if (coverImageFile) {
        const uniqueFileName = `${uuidv4()}-${coverImageFile.name}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('cover-images') 
          .upload(uniqueFileName, coverImageFile, { cacheControl: '3600', upsert: false });
        setUploadProgress(50); 

        if (fileError) throw new Error(`Image upload failed: ${fileError.message}`);
        
        const { data: urlData } = supabase.storage.from('cover-images').getPublicUrl(uniqueFileName);
        coverImageUrl = urlData?.publicUrl || '';
        setUploadProgress(100);
      }

      const { error: insertError } = await supabase.from('posts').insert([
        {
          title: data.title,
          slug: data.slug,
          content: data.content,
          tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(tag => tag),
          cover_image: coverImageUrl || null,
          meta_description: data.metaDescription || null,
        },
      ]);

      if (insertError) throw new Error(`Post creation failed: ${insertError.message}`);

      setStatusMessage({ type: 'success', message: 'Post created successfully! Redirecting...' });
      reset(); 
      setCoverImageFile(null);
      setImagePreviewUrl(null);
      setTimeout(() => router.push('/insights'), 2000); 

    } catch (error: any) {
      console.error("Error during post creation:", error);
      setStatusMessage({ type: 'error', message: error.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl font-bold tracking-tight">Create New Insight</CardTitle>
          <CardDescription>Fill in the details below to publish a new blog post.</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            
             {statusMessage && (
              <Alert variant={statusMessage.type === 'error' ? 'destructive' : 'default'}>
                {statusMessage.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{statusMessage.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>{statusMessage.message}</AlertDescription>
              </Alert>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                placeholder="Enter post title"
                {...register('title', { required: 'Title is required' })}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            
            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (Auto-generated)</Label>
              <Input 
                id="slug"
                placeholder="post-slug-will-appear-here"
                {...register('slug', { required: 'Slug is required' })}
                readOnly 
                className="bg-muted text-muted-foreground"
              />
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div className="prose prose-sm max-w-none border rounded-md min-h-[300px] p-2 focus-within:ring-2 focus-within:ring-ring">
                <RichTextEditor
                  onChange={(value) => setValue('content', value)} 
                />
              </div>
               <input type="hidden" {...register('content', { required: 'Content cannot be empty' })} />
               {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <div className={`flex items-center justify-center w-full p-6 border-2 border-dashed rounded-md ${errors.coverImage ? 'border-destructive' : 'border-border'} hover:border-primary transition-colors`}>
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Drag & drop image here, or click to select</p>
                  <Input 
                    id="coverImage" 
                    type="file" 
                    accept="image/*" 
                    className="sr-only" 
                    {...fileInputRegistration} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                      fileInputRegistration.onChange(e); 
                      handleFileChange(e); 
                    }}
                  />
                  <Label htmlFor="coverImage" className="mt-2 text-sm font-medium text-primary hover:text-primary/80 cursor-pointer">
                    Select File
                  </Label>
                </div>
              </div>
              {imagePreviewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <Image src={imagePreviewUrl} alt="Cover preview" width={200} height={100} className="rounded-md object-cover border" />
                </div>
              )}
              {coverImageFile && !loading && (
                <p className="text-sm text-muted-foreground mt-1">Selected: {coverImageFile.name}</p>
              )}
              {loading && coverImageFile && (
                <div className="mt-2">
                  <p className="text-sm text-primary">Uploading: {uploadProgress}%</p>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
              {errors.coverImage && <p className="text-sm text-destructive mt-1">{errors.coverImage.message}</p>}
            </div>

            {/* Tags & Meta Description (Side-by-side on larger screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input 
                  id="tags"
                  placeholder="e.g., technology, strategy, growth"
                  {...register('tags')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description (for SEO)</Label>
                <Textarea 
                  id="metaDescription"
                  placeholder="Brief summary for search engines (approx. 160 chars)"
                  {...register('metaDescription')}
                  rows={3}
                />
              </div>
            </div>

          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={loading} className="w-full md:w-auto ml-auto">
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...</>
              ) : (
                'Publish Post'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
