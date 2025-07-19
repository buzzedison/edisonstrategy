-- SIMPLE TEST - Just try to create one table
-- This will help us isolate where the error is coming from

CREATE TABLE IF NOT EXISTS test_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(100) NOT NULL,
  post_id BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

SELECT 'Simple table created!' as result; 