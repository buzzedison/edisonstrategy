-- TARGETED MIGRATION SCRIPT
-- Based on your existing database structure
-- Run this in your Supabase SQL editor

-- ============================================================================
-- 1. ADD MISSING COLUMNS TO POSTS TABLE
-- ============================================================================

-- Add author column (this is the main one that was missing)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='author') THEN
        ALTER TABLE posts ADD COLUMN author VARCHAR(100) DEFAULT 'Edison Ade';
        -- Update existing posts to have your name as author
        UPDATE posts SET author = 'Edison Ade' WHERE author IS NULL;
    END IF;
END $$;

-- Add status column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='status') THEN
        ALTER TABLE posts ADD COLUMN status VARCHAR(20) DEFAULT 'published';
        -- Update existing posts to be published
        UPDATE posts SET status = 'published' WHERE status IS NULL;
    END IF;
END $$;

-- Add created_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='created_at') THEN
        ALTER TABLE posts ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Add published_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='published_at') THEN
        ALTER TABLE posts ADD COLUMN published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Set published_at to created_at for existing posts (only if both columns exist)
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='created_at') 
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='published_at') THEN
        UPDATE posts SET published_at = created_at WHERE published_at IS NULL;
    END IF;
END $$;

-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='updated_at') THEN
        ALTER TABLE posts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Set updated_at to created_at for existing posts (only if both columns exist)
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='created_at') 
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='updated_at') THEN
        UPDATE posts SET updated_at = created_at WHERE updated_at IS NULL;
    END IF;
END $$;

-- ============================================================================
-- 2. CREATE INDEXES ON POSTS TABLE (only if they don't exist)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);

-- ============================================================================
-- 3. CREATE NEW FEATURE TABLES
-- ============================================================================

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(100) NOT NULL,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, post_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_post_id ON bookmarks(post_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_created_at ON bookmarks(created_at);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  ip_address INET,
  status VARCHAR(20) DEFAULT 'approved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);

-- Post views table (for detailed analytics)
CREATE TABLE IF NOT EXISTS post_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_post_views_post_id ON post_views(post_id);
CREATE INDEX IF NOT EXISTS idx_post_views_created_at ON post_views(created_at);
CREATE INDEX IF NOT EXISTS idx_post_views_ip ON post_views(ip_address);

-- Post reactions table
CREATE TABLE IF NOT EXISTS post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  reaction_type VARCHAR(20) NOT NULL,
  ip_address INET NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(post_id, reaction_type, ip_address)
);

CREATE INDEX IF NOT EXISTS idx_post_reactions_post_id ON post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_type ON post_reactions(reaction_type);
CREATE INDEX IF NOT EXISTS idx_post_reactions_created_at ON post_reactions(created_at);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  source VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at);

-- ============================================================================
-- 4. CREATE FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 5. ENABLE ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Anyone can view approved comments" ON comments;
CREATE POLICY "Anyone can view approved comments" ON comments
  FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Anyone can insert comments" ON comments;
CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can manage bookmarks" ON bookmarks;
CREATE POLICY "Users can manage bookmarks" ON bookmarks
  FOR ALL USING (true);

-- ============================================================================
-- 6. VERIFY MIGRATION
-- ============================================================================

-- Check that everything was created successfully
SELECT 
    'posts' as table_name,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='author') 
         THEN '✅ author column added' 
         ELSE '❌ author column missing' END as author_status,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='bookmarks') 
         THEN '✅ bookmarks table created' 
         ELSE '❌ bookmarks table missing' END as bookmarks_status,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='comments') 
         THEN '✅ comments table created' 
         ELSE '❌ comments table missing' END as comments_status;

-- Show final posts table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;

SELECT 'Migration completed successfully! 🎉' as result; 