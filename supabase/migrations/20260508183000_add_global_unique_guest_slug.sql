-- Drop the composite unique index (invitation_id, slug)
DROP INDEX IF EXISTS idx_guests_invitation_slug;

-- Add a globally unique constraint on slug
CREATE UNIQUE INDEX idx_guests_slug ON guests(slug);

-- Update generate_guest_slug function to be globally unique
CREATE OR REPLACE FUNCTION generate_guest_slug(inv_id UUID)
RETURNS TEXT AS $$
DECLARE
  new_slug TEXT;
  counter INTEGER := 1;
BEGIN
  new_slug := substr(md5(random()::text), 1, 6);
  WHILE EXISTS (SELECT 1 FROM guests WHERE slug = new_slug) LOOP
    counter := counter + 1;
    new_slug := substr(md5(random()::text || counter::text), 1, 6);
  END LOOP;
  RETURN new_slug;
END;
$$ LANGUAGE plpgsql;
