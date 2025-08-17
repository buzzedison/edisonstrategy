-- 🔍 SUPABASE DEBUG QUERIES
-- Copy and paste these queries into your Supabase dashboard's SQL editor

-- ====================================
-- 1. CHECK RECENT UPDATES
-- ====================================
SELECT 
  id,
  title,
  slug,
  updated_at,
  created_at,
  -- Show how recently updated
  EXTRACT(EPOCH FROM (NOW() - updated_at)) / 60 as minutes_since_update
FROM posts 
ORDER BY updated_at DESC 
LIMIT 10;

-- ====================================
-- 2. CHECK SPECIFIC POST BY ID
-- ====================================
-- Replace 'YOUR_POST_ID' with the actual post ID you're testing
SELECT 
  *,
  EXTRACT(EPOCH FROM (NOW() - updated_at)) / 60 as minutes_since_update
FROM posts 
WHERE id = YOUR_POST_ID;

-- ====================================
-- 3. CHECK SPECIFIC POST BY SLUG
-- ====================================
-- Replace 'your-post-slug' with the actual slug you're testing
SELECT 
  *,
  EXTRACT(EPOCH FROM (NOW() - updated_at)) / 60 as minutes_since_update
FROM posts 
WHERE slug = 'your-post-slug';

-- ====================================
-- 4. CHECK ALL POSTS UPDATED TODAY
-- ====================================
SELECT 
  id,
  title,
  slug,
  updated_at,
  created_at
FROM posts 
WHERE updated_at >= CURRENT_DATE
ORDER BY updated_at DESC;

-- ====================================
-- 5. CHECK POSTS UPDATED IN LAST HOUR
-- ====================================
SELECT 
  id,
  title,
  slug,
  updated_at,
  -- Show content preview
  SUBSTRING(content, 1, 100) as content_preview
FROM posts 
WHERE updated_at >= NOW() - INTERVAL '1 hour'
ORDER BY updated_at DESC;

-- ====================================
-- 6. FULL POST CONTENT CHECK
-- ====================================
-- Replace 'YOUR_POST_ID' with the ID of the post you just edited
SELECT 
  id,
  title,
  slug,
  content,
  updated_at,
  LENGTH(content) as content_length
FROM posts 
WHERE id = YOUR_POST_ID;

-- ====================================
-- 7. CHECK FOR DUPLICATE SLUGS
-- ====================================
SELECT 
  slug,
  COUNT(*) as count,
  STRING_AGG(id::text, ', ') as post_ids
FROM posts 
GROUP BY slug 
HAVING COUNT(*) > 1;

-- ====================================
-- INSTRUCTIONS:
-- ====================================
-- 1. Go to your Supabase dashboard
-- 2. Navigate to "SQL Editor"
-- 3. Copy and paste any of these queries
-- 4. Replace placeholder values (YOUR_POST_ID, your-post-slug)
-- 5. Run the query to see real database data
-- 6. Check if your recent edits appear in the results
