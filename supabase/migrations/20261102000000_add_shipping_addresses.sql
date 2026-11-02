-- =====================================================
-- TABLE: shipping_addresses (alamat pengiriman fisik untuk gift)
-- =====================================================
CREATE TABLE shipping_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  recipient_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE shipping_addresses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read shipping_addresses" ON shipping_addresses FOR SELECT USING (is_visible = true);
CREATE POLICY "Admin manage shipping_addresses" ON shipping_addresses FOR ALL USING (auth.role() = 'authenticated');
