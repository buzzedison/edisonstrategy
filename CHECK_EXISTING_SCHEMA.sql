-- DIAGNOSTIC SCRIPT - Run this first to see your current database structure
-- This will help us understand what columns already exist

-- Check what columns exist in your posts table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;

-- Check what tables already exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check if specific columns exist
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='author') 
        THEN 'author column EXISTS' 
        ELSE 'author column MISSING' 
    END as author_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='views') 
        THEN 'views column EXISTS' 
        ELSE 'views column MISSING' 
    END as views_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='tags') 
        THEN 'tags column EXISTS' 
        ELSE 'tags column MISSING' 
    END as tags_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='reactions') 
        THEN 'reactions column EXISTS' 
        ELSE 'reactions column MISSING' 
    END as reactions_status; 