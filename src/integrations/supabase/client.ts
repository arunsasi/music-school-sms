
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vbshuwdbpkccpnkuxsca.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZic2h1d2RicGtjY3Bua3V4c2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NzkxMTUsImV4cCI6MjA1ODQ1NTExNX0.NZkpcm-hdbL9qswlNKZgbO3CAGBtWQexFSOwgJsySTY";

// Create and configure the Supabase client with proper auth settings
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
      debug: false // Disable debug mode to reduce logging noise
    }
  }
);

// Utility function to clean auth state - can be used when debugging
export const cleanupAuthState = () => {
  console.log("Performing thorough auth state cleanup");
  
  // Clear all auth tokens from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log(`Removing localStorage key: ${key}`);
      localStorage.removeItem(key);
    }
  });
  
  // Also clean sessionStorage to be thorough
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log(`Removing sessionStorage key: ${key}`);
      sessionStorage.removeItem(key);
    }
  });
};

// Enhanced login function to handle the specific database errors we're encountering
export const enhancedSignIn = async (email: string, password: string) => {
  try {
    console.log("Starting enhanced sign-in process for:", email);
    
    // Clean up any existing auth state
    cleanupAuthState();
    
    // Attempt a global sign-out first
    try {
      await supabase.auth.signOut({ scope: 'global' });
      console.log("Global sign-out completed successfully");
    } catch (err) {
      console.log("Pre-login sign-out encountered an error (continuing):", err);
    }
    
    // Add a small delay to ensure state is cleared properly
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Attempt login with specific error handling for database issues
    console.log("Attempting login with clean state");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error("Authentication error:", error);
      
      // Detect specific database schema errors
      if (error.message?.includes("sql: Scan error") && error.message?.includes("email_change")) {
        throw new Error("Login system is experiencing database issues. Please try using a different browser or clearing your cookies, or contact support.");
      }
      
      throw error;
    }
    
    console.log("Login successful:", !!data.user);
    return { data, error: null };
  } catch (error: any) {
    console.error("Enhanced sign-in failed:", error);
    return { 
      data: null, 
      error: {
        message: error.message || "Login failed. Please check your credentials or try again later."
      } 
    };
  }
};
