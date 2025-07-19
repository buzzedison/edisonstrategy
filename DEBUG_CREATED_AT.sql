-- DEBUG SCRIPT - Let's test the created_at column specifically

-- Test 1: Can we select from created_at?
SELECT id, title, created_at FROM posts LIMIT 1;

-- Test 2: Check if the column exists (case sensitive)
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'posts' 
AND column_name ILIKE '%created%';

-- Test 3: Try to update a specific row to see where the error occurs
-- (Replace 1 with an actual ID from your posts table)
UPDATE posts SET views = views + 1 WHERE id = 1;

-- Test 4: Check the exact error location - try this simple update
DO $$ 
BEGIN
    -- This should work if created_at exists
    IF EXISTS (SELECT 1 FROM posts WHERE created_at IS NOT NULL LIMIT 1) THEN
        RAISE NOTICE 'created_at column is accessible and has data';
    ELSE 
        RAISE NOTICE 'created_at column exists but has no data';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error accessing created_at: %', SQLERRM;
END $$; 