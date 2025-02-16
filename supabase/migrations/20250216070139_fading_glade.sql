/*
  # Make user an admin

  Updates the specified user's role to admin in the profiles table
*/

UPDATE profiles 
SET role = 'admin'::user_role 
WHERE email = 'sweetan2004@gmail.com';