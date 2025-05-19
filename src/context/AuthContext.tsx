
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '@/types';
import { toast } from 'sonner';

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

// Role permissions mapping
const rolePermissions: Record<UserRole, string[]> = {
  admin: ['manage_students', 'manage_classes', 'manage_employees', 'manage_finances', 'view_reports', 'manage_settings'],
  teacher: ['view_students', 'manage_attendance', 'view_classes'],
  accounts: ['manage_finances', 'view_reports'],
  student: ['view_classes', 'view_attendance'],
  parent: ['view_student_info']
};

// Auth state cleanup utility
const cleanupAuthState = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  // Setup auth state listener
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Use setTimeout to avoid potential deadlocks
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (error) throw error;
              
              if (profile) {
                const userData: User = {
                  id: session.user.id,
                  email: session.user.email,
                  name: profile.full_name,
                  role: profile.role as UserRole,
                  avatar: '/placeholder.svg'
                };
                
                setUser(userData);
                setUserRole(profile.role as UserRole);
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
              setUser(null);
              setUserRole(null);
            }
          }, 0);
        } else {
          setUser(null);
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error) throw error;
          
          if (profile) {
            const userData: User = {
              id: session.user.id,
              email: session.user.email,
              name: profile.full_name,
              role: profile.role as UserRole,
              avatar: '/placeholder.svg'
            };
            
            setUser(userData);
            setUserRole(profile.role as UserRole);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      console.log("Attempting login for:", email);
      
      // Clean up any existing auth state before login
      cleanupAuthState();

      // Attempt global sign out before sign in
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log("Pre-signin signout failed (this is usually ok):", err);
      }

      console.log("Starting login process with clean state");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Supabase auth error:", error);
        throw error;
      }
      
      console.log("Login successful, navigating to dashboard");
      toast.success('Logged in successfully');
      
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
      // Clean up any existing auth state before signup
      cleanupAuthState();
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Account created successfully');
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Clean up any existing auth state before logout
      cleanupAuthState();

      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      setUser(null);
      toast.success('Logged out successfully');

      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error logging out:', error.message);
      toast.error('Failed to log out');
      throw error;
    }
  };

  const hasPermission = (permission: string | string[]): boolean => {
    if (!user || !user.role) return false;
    
    // Get permissions for the user's role
    const permissions = rolePermissions[user.role] || [];
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Check if the user has any of the required permissions
    if (Array.isArray(permission)) {
      return permission.some(p => permissions.includes(p));
    }
    
    // Check for a single permission
    return permissions.includes(permission);
  };

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
