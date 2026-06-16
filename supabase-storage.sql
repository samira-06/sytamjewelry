-- Créer le bucket public pour les images produits
INSERT INTO storage.buckets (id, name, public)
VALUES ('sytam-images', 'sytam-images', true)
ON CONFLICT (id) DO NOTHING;

-- Permettre l'upload anonyme (via la clé anon)
CREATE POLICY "anon_insert_sytam_images" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'sytam-images');

-- Permettre la lecture publique
CREATE POLICY "anon_select_sytam_images" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'sytam-images');

-- Permettre la suppression par l'admin
CREATE POLICY "anon_delete_sytam_images" ON storage.objects
  FOR DELETE TO anon
  USING (bucket_id = 'sytam-images');
