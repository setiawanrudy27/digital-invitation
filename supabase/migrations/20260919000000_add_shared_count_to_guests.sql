-- Add column to track how many times an invitation link has been shared to a guest
ALTER TABLE guests ADD COLUMN IF NOT EXISTS shared_count INTEGER NOT NULL DEFAULT 0;