
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '@/types/auth';
import { useAuthOperations } from '@/hooks/useAuthOperations';
import { usePermissions } from '@/hooks/usePermissions';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  hasPermission: (permission: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { login, signup, logout, loading } = useAuthOperations();
  const { hasPermission } = usePermissions(user);

  // Setup auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Auth state changed: ${event}`, session?.user?.id);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlocks
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (error) {
                console.error("Error fetching profile:", error);
                throw error;
              }
              
              if (profile) {
                const userData: User = {
                  id: session.user.id,
                  email: session.user.email,
                  name: profile.full_name,
                  role: profile.role as UserRole,
                  avatar: '/placeholder.svg'
                };
                
                console.log("Setting authenticated user:", userData.name, userData.role);
                setUser(userData);
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
              setUser(null);
            }
          }, 0);
        } else {
          console.log("No active session, clearing user state");
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Checking for existing session:", !!session);
      
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error) {
            console.error("Error fetching initial profile:", error);
            throw error;
          }
          
          if (profile) {
            const userData: User = {
              id: session.user.id,
              email: session.user.email,
              name: profile.full_name,
              role: profile.role as UserRole,
              avatar: '/placeholder.svg'
            };
            
            console.log("Setting initial user from existing session:", userData.name, userData.role);
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching initial user profile:', error);
          // Don't clear user state here as it might be a temporary error
        }
      }
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
