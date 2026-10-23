-- Heart of Life Line Care Foundation (HLLCAF)
-- Complete, All-in-One Supabase Setup Script
-- Safe to run on fresh or existing databases (Idempotent)

-- 1. Create members table if it does not exist yet
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    gender TEXT,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT,
    occupation TEXT,
    reason TEXT,
    photo_path TEXT,
    consent_agreed BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- In case table already existed, ensure photo_path column exists
ALTER TABLE public.members
  ADD COLUMN IF NOT EXISTS photo_path TEXT;

-- 2. Enable Row Level Security (RLS) on members table
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- 3. Member Table Policies (Write-only for public, Read for authenticated admins)
DROP POLICY IF EXISTS "Allow public insert to members" ON public.members;
CREATE POLICY "Allow public insert to members" 
ON public.members 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read" ON public.members;
CREATE POLICY "Allow authenticated read" 
ON public.members 
FOR SELECT 
TO authenticated 
USING (true);

-- 4. Create private storage bucket for member photos (up to 2MB)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-photos',
  'member-photos',
  false,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Policies: Allow public visitors to upload photos
DROP POLICY IF EXISTS "Public can upload member photos" ON storage.objects;
CREATE POLICY "Public can upload member photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'member-photos');

-- 6. Storage Policies: Only authenticated Foundation coordinators can view photos
DROP POLICY IF EXISTS "Admins can view member photos" ON storage.objects;
CREATE POLICY "Admins can view member photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'member-photos');
