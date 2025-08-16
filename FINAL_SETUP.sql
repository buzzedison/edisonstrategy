-- FINAL SETUP - Add security policies and triggers
-- Run this to complete your insights platform setup

-- ============================================================================
-- 1. ENABLE ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on feature tables
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. CREATE SECURITY POLICIES
-- ============================================================================

-- Comments policies
DROP POLICY IF EXISTS "Anyone can view approved comments" ON comments;
CREATE POLICY "Anyone can view approved comments" ON comments
  FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Anyone can insert comments" ON comments;
CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Bookmarks policies (allow all for now - you can restrict based on your auth system)
DROP POLICY IF EXISTS "Users can manage bookmarks" ON bookmarks;
CREATE POLICY "Users can manage bookmarks" ON bookmarks
  FOR ALL USING (true);

-- Newsletter policies
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- ============================================================================
-- 3. ADD TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ============================================================================

-- Add trigger to posts table for updated_at
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add trigger to comments table for updated_at  
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. CREATE A TEST COMMENT (Optional)
-- ============================================================================

-- Insert a test comment on your first post (optional)
-- INSERT INTO comments (post_id, content, author_name, author_email, status) 
-- SELECT id, 'Welcome to the new comments system! 🎉', 'System', 'system@buzzedison.com', 'approved'
-- FROM posts 
-- ORDER BY id 
-- LIMIT 1
-- ON CONFLICT DO NOTHING;

-- ============================================================================
-- 5. VERIFICATION
-- ============================================================================

-- Check RLS is enabled
SELECT 
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('bookmarks', 'comments', 'newsletter_subscribers')
ORDER BY tablename;

-- Check policies exist
SELECT 
    tablename,
    policyname
FROM pg_policies 
WHERE tablename IN ('bookmarks', 'comments', 'newsletter_subscribers')
ORDER BY tablename, policyname;

-- Final success message
SELECT '🎉 Your insights platform is fully set up and ready to go!' as result; 