-- Heart of Life Line Care Foundation (HLLCAF)
-- Migration 002: Passport photograph upload for member registration
-- Run this once in the Supabase SQL Editor.

-- 1. Store the uploaded photo's file path on each member record
ALTER TABLE public.members
  ADD COLUMN IF NOT EXISTS photo_path TEXT;

-- 2. Create a PRIVATE storage bucket for member photos
--    (not publicly readable; limited to images up to 2MB)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-photos',
  'member-photos',
  false,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 3. Website visitors may UPLOAD a photo, but cannot list, view,
--    overwrite, or delete any photos (NDPA data protection).
DROP POLICY IF EXISTS "Public can upload member photos" ON storage.objects;
CREATE POLICY "Public can upload member photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'member-photos');

-- 4. Only signed-in Foundation administrators can view member photos
DROP POLICY IF EXISTS "Admins can view member photos" ON storage.objects;
CREATE POLICY "Admins can view member photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'member-photos');
