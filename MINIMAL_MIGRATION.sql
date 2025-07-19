-- MINIMAL MIGRATION - Just add the missing columns first
-- Run this step by step

-- Step 1: Add missing columns to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS author VARCHAR(100) DEFAULT 'Edison Ade';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'published';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Step 2: Update existing posts to have proper values (run this separately if needed)
-- UPDATE posts SET author = 'Edison Ade' WHERE author IS NULL;
-- UPDATE posts SET status = 'published' WHERE status IS NULL;
-- UPDATE posts SET published_at = created_at WHERE published_at IS NULL AND created_at IS NOT NULL;
-- UPDATE posts SET updated_at = created_at WHERE updated_at IS NULL AND created_at IS NOT NULL;

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);

-- Verify the columns were added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position; 