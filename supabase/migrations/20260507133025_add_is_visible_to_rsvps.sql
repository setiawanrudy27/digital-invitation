-- Add is_visible column to rsvps table
ALTER TABLE rsvps ADD COLUMN is_visible BOOLEAN DEFAULT true;