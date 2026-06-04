-- Add show_rsvp column to settings table
ALTER TABLE settings ADD COLUMN show_rsvp BOOLEAN DEFAULT true;
