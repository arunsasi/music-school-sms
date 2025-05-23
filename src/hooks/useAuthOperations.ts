
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase, cleanupAuthState, enhancedSignIn, enhancedSignUp } from '@/integrations/supabase/client';
import { User, UserRole } from '@/types/auth';

export function useAuthOperations() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      console.log("Starting login process for:", email);
      
      // Use our enhanced sign-in function for admin or test account
      const { data, error } = await enhancedSignIn(email, password);
      
      if (error) {
        console.error("Login failed:", error);
        throw error;
      }
      
      toast.success('Logged in successfully');
      console.log("Login successful, navigating to dashboard");
      
      // Force a full page refresh to ensure a clean state
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      toast.error(`Login failed. ${error.message || 'Please check your credentials.'}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string, role: UserRole = 'student'): Promise<void> => {
    setLoading(true);
    try {
      console.log("Starting signup process for:", email);
      
      // Use our enhanced sign-up function
      const { data, error } = await enhancedSignUp(email, password, fullName, role);
      
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      
      console.log("Account created successfully");
      toast.success('Account created successfully! Please check your email for verification.');
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      toast.error(`Registration failed. ${error.message || 'Please try again.'}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log("Starting logout process");
      
      // Clean up any existing auth state before logout
      cleanupAuthState();

      // Attempt global signout
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error("Signout error:", error);
        throw error;
      }
      
      toast.success('Logged out successfully');
      console.log("Logout successful, redirecting to home");

      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error logging out:', error.message);
      toast.error('Failed to log out');
      throw error;
    }
  };

  return {
    login,
    signup,
    logout,
    loading
  };
}
