/*
  # Update profiles table and policies

  1. Changes
    - Add profile_image column
    - Add updated_at column and trigger
    - Add role validation constraint
*/

-- Add profile_image and updated_at columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'profile_image'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_image text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Add role validation if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_role_check'
  ) THEN
    ALTER TABLE profiles 
    ADD CONSTRAINT profiles_role_check 
    CHECK (role = ANY (ARRAY['student'::text, 'tutor'::text, 'parent'::text]));
  END IF;
END $$;

-- Function to update profile timestamp
CREATE OR REPLACE FUNCTION update_profile_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS update_profile_timestamp ON profiles;
CREATE TRIGGER update_profile_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_timestamp();