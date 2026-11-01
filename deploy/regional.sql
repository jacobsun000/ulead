BEGIN;
CREATE TABLE IF NOT EXISTS media_assets (
  source_url text PRIMARY KEY,
  china_url text UNIQUE NOT NULL,
  blob_url text,
  object_key text UNIQUE NOT NULL,
  sha256 text NOT NULL
);
ALTER TABLE contact_us ADD COLUMN IF NOT EXISTS region text NOT NULL DEFAULT 'cn';
ALTER TABLE contact_us ADD COLUMN IF NOT EXISTS remote_id integer;
ALTER TABLE contact_us ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
CREATE UNIQUE INDEX IF NOT EXISTS contact_remote_id ON contact_us (remote_id) WHERE remote_id IS NOT NULL;
CREATE TABLE IF NOT EXISTS sync_state (
  name text PRIMARY KEY,
  last_success timestamptz,
  last_error text,
  version text
);
CREATE TABLE IF NOT EXISTS legacy_contact_ids (id integer PRIMARY KEY);
COMMIT;
