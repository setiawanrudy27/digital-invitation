ALTER TABLE shipping_addresses
  DROP COLUMN IF EXISTS recipient_name,
  DROP COLUMN IF EXISTS phone;
