ALTER TABLE wedding_frame
ADD COLUMN frame_url_instagram TEXT;

-- Update RLS policies to include new column
DROP POLICY IF EXISTS "Public read wedding_frame" ON wedding_frame;
CREATE POLICY "Public read wedding_frame" ON wedding_frame
  FOR SELECT USING (is_visible = true);

DROP POLICY IF EXISTS "Admin manage wedding_frame" ON wedding_frame;
CREATE POLICY "Admin manage wedding_frame" ON wedding_frame
  FOR ALL USING (auth.role() = 'authenticated');
