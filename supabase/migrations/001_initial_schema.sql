-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: invitations (main invitation container)
-- =====================================================
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  wedding_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: couples (data mempelai)
-- =====================================================
CREATE TABLE couples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  person_type VARCHAR(10) CHECK (person_type IN ('groom', 'bride')),
  full_name VARCHAR(255) NOT NULL,
  nickname VARCHAR(100),
  father_name VARCHAR(255),
  mother_name VARCHAR(255),
  child_order VARCHAR(10),
  instagram_username VARCHAR(100),
  photo_url TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: events (manajemen acara)
-- =====================================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  until_finish BOOLEAN DEFAULT false,
  timezone VARCHAR(50) DEFAULT 'Asia/Jakarta',
  google_maps_link TEXT,
  address TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: guests (tamu undangan)
-- =====================================================
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  slug VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_guests_invitation_slug ON guests(invitation_id, slug);

-- =====================================================
-- TABLE: gallery_photos (galeri foto)
-- =====================================================
CREATE TABLE gallery_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: gallery_videos (galeri video)
-- =====================================================
CREATE TABLE gallery_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  youtube_url TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: live_streaming
-- =====================================================
CREATE TABLE live_streaming (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE UNIQUE,
  stream_url TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: music (musik undangan)
-- =====================================================
CREATE TABLE music (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE UNIQUE,
  music_url TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: wedding_frame
-- =====================================================
CREATE TABLE wedding_frame (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE UNIQUE,
  frame_url TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: love_stories (cerita cinta timeline)
-- =====================================================
CREATE TABLE love_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  story_date DATE NOT NULL,
  photo_url TEXT,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: quotes (kutipan)
-- =====================================================
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  source VARCHAR(255),
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: bank_accounts (rekening untuk gift)
-- =====================================================
CREATE TABLE bank_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  bank_name VARCHAR(100) NOT NULL,
  account_number VARCHAR(50) NOT NULL,
  account_holder VARCHAR(255) NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: qris (QR code untuk gift)
-- =====================================================
CREATE TABLE qris (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE UNIQUE,
  qris_url TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: rsvps (konfirmasi kehadiran)
-- =====================================================
CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  guest_name VARCHAR(255) NOT NULL,
  guest_slug VARCHAR(255),
  attending BOOLEAN NOT NULL,
  guest_count INTEGER DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: thank_you (ucapan terima kasih)
-- =====================================================
CREATE TABLE thank_you (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE UNIQUE,
  photo_url TEXT,
  message TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: settings (pengaturan undangan)
-- =====================================================
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE UNIQUE,
  show_couple_photo BOOLEAN DEFAULT true,
  show_events BOOLEAN DEFAULT true,
  show_love_story BOOLEAN DEFAULT true,
  show_gallery BOOLEAN DEFAULT true,
  show_quote BOOLEAN DEFAULT true,
  payment_method VARCHAR(20) DEFAULT 'both' CHECK (payment_method IN ('transfer', 'qris', 'both')),
  whatsapp_template TEXT DEFAULT 'Halo {{guest_name}}, kami mengundang Anda ke pernikahan kami. Lihat undangan di: {{invite_link}}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Enable RLS (Row Level Security) on all tables
-- =====================================================
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_streaming ENABLE ROW LEVEL SECURITY;
ALTER TABLE music ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_frame ENABLE ROW LEVEL SECURITY;
ALTER TABLE love_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE qris ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE thank_you ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS Policies
-- =====================================================

-- Public read access for invitation-related tables (tamu undangan can view)
CREATE POLICY "Public read invitations" ON invitations FOR SELECT USING (true);
CREATE POLICY "Public read couples" ON couples FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read gallery_photos" ON gallery_photos FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read gallery_videos" ON gallery_videos FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read live_streaming" ON live_streaming FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read music" ON music FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read wedding_frame" ON wedding_frame FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read love_stories" ON love_stories FOR SELECT USING (true);
CREATE POLICY "Public read quotes" ON quotes FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read bank_accounts" ON bank_accounts FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read qris" ON qris FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read thank_you" ON thank_you FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

-- RSVP and guest messages can be created by anyone
CREATE POLICY "Anyone can create RSVP" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read RSVP" ON rsvps FOR SELECT USING (true);

-- Authenticated users (admin) can manage all tables
CREATE POLICY "Admin manage invitations" ON invitations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage couples" ON couples FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage guests" ON guests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage gallery_photos" ON gallery_photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage gallery_videos" ON gallery_videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage live_streaming" ON live_streaming FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage music" ON music FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage wedding_frame" ON wedding_frame FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage love_stories" ON love_stories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage quotes" ON quotes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage bank_accounts" ON bank_accounts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage qris" ON qris FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage rsvps" ON rsvps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage thank_you" ON thank_you FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- Storage Buckets (for file uploads)
-- =====================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('music', 'music', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('qris', 'qris', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('couple-photos', 'couple-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('story-photos', 'story-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('thank-you-photos', 'thank-you-photos', true);

-- Storage policies - public read
CREATE POLICY "Public read photos" ON storage.objects FOR SELECT USING (bucket_id = 'photos');
CREATE POLICY "Public read music" ON storage.objects FOR SELECT USING (bucket_id = 'music');
CREATE POLICY "Public read qris" ON storage.objects FOR SELECT USING (bucket_id = 'qris');
CREATE POLICY "Public read couple-photos" ON storage.objects FOR SELECT USING (bucket_id = 'couple-photos');
CREATE POLICY "Public read story-photos" ON storage.objects FOR SELECT USING (bucket_id = 'story-photos');
CREATE POLICY "Public read thank-you-photos" ON storage.objects FOR SELECT USING (bucket_id = 'thank-you-photos');

-- Storage policies - authenticated upload
CREATE POLICY "Admin upload photos" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'photos');
CREATE POLICY "Admin upload music" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'music');
CREATE POLICY "Admin upload qris" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'qris');
CREATE POLICY "Admin upload couple-photos" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'couple-photos');
CREATE POLICY "Admin upload story-photos" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'story-photos');
CREATE POLICY "Admin upload thank-you-photos" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'thank-you-photos');

-- Storage policies - authenticated delete
CREATE POLICY "Admin delete photos" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete music" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete qris" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete couple-photos" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete story-photos" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete thank-you-photos" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');

-- =====================================================
-- Function: Auto-generate slug for guests
-- =====================================================
CREATE OR REPLACE FUNCTION generate_guest_slug(inv_id UUID)
RETURNS TEXT AS $$
DECLARE
  new_slug TEXT;
  counter INTEGER := 1;
BEGIN
  -- Generate a random 6-character alphanumeric slug
  new_slug := substr(md5(random()::text), 1, 6);
  
  -- Check for uniqueness, regenerate if needed
  WHILE EXISTS (SELECT 1 FROM guests WHERE invitation_id = inv_id AND slug = new_slug) LOOP
    counter := counter + 1;
    new_slug := substr(md5(random()::text || counter::text), 1, 6);
  END LOOP;
  
  RETURN new_slug;
END;
$$ LANGUAGE plpgsql;
