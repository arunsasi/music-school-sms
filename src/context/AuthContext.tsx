
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, cleanupAuthState, enhancedSignIn, enhancedSignUp } from '@/integrations/supabase/client';
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
                setUserRole(profile.role as UserRole);
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
              setUser(null);
              setUserRole(null);
            }
          }, 0);
        } else {
          console.log("No active session, clearing user state");
          setUser(null);
          setUserRole(null);
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
            setUserRole(profile.role as UserRole);
          }
        } catch (error) {
          console.error('Error fetching initial user profile:', error);
          // Don't clear user state here as it might be a temporary error
        }
      }
      
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

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
      
      setUser(null);
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
