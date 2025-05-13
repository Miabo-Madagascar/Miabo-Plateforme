/*
  # Fix profiles RLS policies

  1. Changes
    - Add policy to allow inserting new profiles during registration
    - Update select policy to allow viewing profiles during authentication
    - Keep existing policies for profile updates

  2. Security
    - Maintains RLS enabled on profiles table
    - Ensures users can only update their own profiles
    - Allows profile creation during registration
    - Allows profile viewing during authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

-- Create new policies
CREATE POLICY "Enable insert for authentication" 
ON profiles FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT 
TO public
USING (
  -- Allow viewing during registration/login
  (auth.role() = 'authenticated' AND id = auth.uid()) OR
  -- Allow viewing during profile creation
  (auth.role() = 'anon' AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = profiles.id
  ))
);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO public
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);