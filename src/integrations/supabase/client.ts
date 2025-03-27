
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
    }
  }
);
