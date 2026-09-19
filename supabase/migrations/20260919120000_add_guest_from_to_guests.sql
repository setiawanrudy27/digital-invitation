-- Add column to track where a guest invitation came from (Tamu Dari)
ALTER TABLE guests ADD COLUMN IF NOT EXISTS guest_from VARCHAR(255);