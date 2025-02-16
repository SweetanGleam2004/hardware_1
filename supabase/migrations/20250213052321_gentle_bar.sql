/*
  # Add user roles and permissions

  1. New Tables
    - `roles` table for user role management
    - Add role column to profiles table
  
  2. Security
    - Add policies for role-based access
*/

-- Create roles enum
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Add role to profiles
ALTER TABLE profiles ADD COLUMN role user_role DEFAULT 'user'::user_role;

-- Admin role policies for products
CREATE POLICY "Admins can manage products"
    ON products FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'::user_role
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'::user_role
        )
    );