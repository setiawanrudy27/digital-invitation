-- Add user_id to invitations table
ALTER TABLE invitations ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for faster queries
CREATE INDEX idx_invitations_user_id ON invitations(user_id);

-- Update RLS policies for invitations to filter by user_id
DROP POLICY IF EXISTS "Public read invitations" ON invitations;
DROP POLICY IF EXISTS "Admin manage invitations" ON invitations;

-- Users can only read their own invitations
CREATE POLICY "Users can read own invitations" ON invitations
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only manage their own invitations
CREATE POLICY "Users can manage own invitations" ON invitations
  FOR ALL USING (auth.uid() = user_id);

-- Update other tables to ensure users can only access data from their invitations
-- This requires joining with invitations table or storing user_id in each table
-- For simplicity, we'll ensure the application filters by invitation_id
