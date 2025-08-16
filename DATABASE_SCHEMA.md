# Database Schema for Insights Platform

This document outlines the required database tables and their relationships for the insights platform with all implemented features.

## Core Tables

### 1. posts
Main articles/posts table
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  meta_description TEXT,
  cover_image TEXT,
  author VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  reactions JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'published', -- published, draft, scheduled
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author ON posts(author);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
```

### 2. bookmarks
User bookmarks for saving articles
```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(100) NOT NULL, -- Can be user ID or anonymous identifier
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, post_id)
);

-- Indexes
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_post_id ON bookmarks(post_id);
CREATE INDEX idx_bookmarks_created_at ON bookmarks(created_at);
```

### 3. comments
Hierarchical comments system
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  ip_address INET,
  status VARCHAR(20) DEFAULT 'approved', -- approved, pending, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_comments_created_at ON comments(created_at);
```

### 4. authors (Optional - for future enhancement)
Dedicated authors table for better author management
```sql
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  bio TEXT,
  avatar TEXT,
  email VARCHAR(255) UNIQUE,
  location VARCHAR(100),
  website TEXT,
  twitter VARCHAR(50),
  linkedin VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_authors_slug ON authors(slug);
CREATE INDEX idx_authors_email ON authors(email);
```

## Analytics Tables

### 5. post_views
Detailed view tracking
```sql
CREATE TABLE post_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_post_views_post_id ON post_views(post_id);
CREATE INDEX idx_post_views_created_at ON post_views(created_at);
CREATE INDEX idx_post_views_ip ON post_views(ip_address);
```

### 6. post_reactions
User reactions to articles
```sql
CREATE TABLE post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  reaction_type VARCHAR(20) NOT NULL, -- like, love, insightful, helpful, disagree
  ip_address INET NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(post_id, reaction_type, ip_address)
);

-- Indexes
CREATE INDEX idx_post_reactions_post_id ON post_reactions(post_id);
CREATE INDEX idx_post_reactions_type ON post_reactions(reaction_type);
CREATE INDEX idx_post_reactions_created_at ON post_reactions(created_at);
```

## Newsletter & Subscriptions

### 7. newsletter_subscribers
Newsletter subscription management
```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- active, unsubscribed, bounced
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  source VARCHAR(50) -- where they subscribed from
);

-- Indexes
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at);
```

## Content Management (Future Features)

### 8. post_schedules
For scheduled publishing
```sql
CREATE TABLE post_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, published, failed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_post_schedules_scheduled_for ON post_schedules(scheduled_for);
CREATE INDEX idx_post_schedules_status ON post_schedules(status);
```

### 9. post_drafts
For draft management (alternative approach)
```sql
CREATE TABLE post_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT,
  meta_description TEXT,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  author VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_post_drafts_post_id ON post_drafts(post_id);
CREATE INDEX idx_post_drafts_author ON post_drafts(author);
CREATE INDEX idx_post_drafts_updated_at ON post_drafts(updated_at);
```

## Required Supabase Setup

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on sensitive tables
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Example policies (adjust based on your auth setup)
CREATE POLICY "Users can view their own bookmarks" ON bookmarks
  FOR SELECT USING (true); -- Adjust based on your user system

CREATE POLICY "Users can insert their own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (true); -- Adjust based on your user system

CREATE POLICY "Anyone can view approved comments" ON comments
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);
```

### Functions and Triggers

```sql
-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Sample Data

```sql
-- Insert sample post
INSERT INTO posts (title, slug, content, meta_description, author, tags, status, published_at) VALUES
('Getting Started with Next.js', 'getting-started-nextjs', '<p>This is a comprehensive guide to Next.js...</p>', 'Learn the basics of Next.js development', 'Edison Ade', ARRAY['Next.js', 'React', 'Web Development'], 'published', NOW());

-- Insert sample comment
INSERT INTO comments (post_id, content, author_name, author_email, status) VALUES
(1, 'Great article! Very helpful for beginners.', 'John Doe', 'john@example.com', 'approved');
```

## Migration Notes

1. **Start with core tables**: posts, bookmarks, comments
2. **Add analytics tables**: post_views, post_reactions  
3. **Implement newsletter**: newsletter_subscribers
4. **Future features**: post_schedules, post_drafts, authors

## Performance Considerations

- Use appropriate indexes on frequently queried columns
- Consider partitioning for large analytics tables
- Implement proper caching strategies
- Use database views for complex queries
- Monitor query performance and optimize as needed

## Security Notes

- Always validate and sanitize user input
- Implement rate limiting for comment submissions
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Consider implementing comment moderation workflows 