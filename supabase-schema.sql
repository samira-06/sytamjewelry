-- Sytam Jewelry - Old site Supabase Schema
-- Exécutez ceci dans l'éditeur SQL de Supabase

CREATE TABLE IF NOT EXISTS store_data (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'
);

-- Insert default admin password
INSERT INTO store_data (key, value) 
VALUES ('admin', '{"password": "sytam2025"}')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE store_data ENABLE ROW LEVEL SECURITY;

-- Allow public read/write (since this is a frontend-only app with anon key)
CREATE POLICY "Allow public read" ON store_data FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON store_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON store_data FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON store_data FOR DELETE USING (true);
