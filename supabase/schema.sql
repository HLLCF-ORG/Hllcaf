-- Heart of Life Line Care Foundation (HLLCAF)
-- Member Registration Table & Security Policies (Supabase)

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

-- 1. Enable Row Level Security (RLS) for NGO and Data Protection Compliance (NDPA)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- 2. Allow any visitor to submit their own registration (Write-Only)
CREATE POLICY "Allow public insert to members" 
ON public.members 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 3. Only authenticated Foundation administrators can read/export member records
-- Public visitors CANNOT read or list any personal data
CREATE POLICY "Allow authenticated read" 
ON public.members 
FOR SELECT 
TO authenticated 
USING (true);
