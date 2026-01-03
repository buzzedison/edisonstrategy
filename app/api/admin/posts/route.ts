import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create admin client with service role key
const getAdminClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is not set');
    }

    if (!serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set. This is required for admin operations.');
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};

export async function GET(request: NextRequest) {
    try {
        const adminClient = getAdminClient();

        const { data: posts, error } = await adminClient
            .from('posts')
            .select('id, title, slug, author, status, created_at, tags, views, cover_image')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ posts: posts || [] }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Admin posts API error:', errorMessage);
        return NextResponse.json({ error: errorMessage, posts: [] }, { status: 500 });
    }
}
