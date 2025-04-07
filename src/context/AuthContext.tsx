
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '@/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes when Supabase auth fails
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@musicschool.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Accounts User',
    email: 'accounts@musicschool.com',
    role: 'accounts',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Teacher User',
    email: 'teacher@musicschool.com',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

// For demo, all passwords are 'password'
const MOCK_PASSWORD = 'password';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  // Set up auth state listener and check for existing session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata.full_name,
          role: session.user.user_metadata.role as UserRole || 'student',
          avatar: session.user.user_metadata.avatar_url,
        } : null);
        
        if (session?.user) {
          // Use setTimeout to avoid deadlock with Supabase client
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata.full_name,
        role: session.user.user_metadata.role as UserRole || 'student',
        avatar: session.user.user_metadata.avatar_url,
      } : null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, full_name, email')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      if (data) {
        setUserRole(data.role as UserRole);
        setUser(prev => prev ? {
          ...prev,
          role: data.role as UserRole,
          name: data.full_name || prev.name,
        } : null);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Try to login with Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.log('Supabase login error, falling back to mock users:', error.message);
        
        // Fallback to mock users for demo
        const foundUser = MOCK_USERS.find(u => u.email === email);
        
        if (!foundUser || password !== MOCK_PASSWORD) {
          throw new Error('Invalid email or password');
        }
        
        // Set mock user in state
        const mockUser = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role as UserRole,
          avatar: foundUser.avatar
        };
        
        setUser(mockUser);
        setUserRole(mockUser.role as UserRole);
        
        // Store mock user in localStorage as fallback
        localStorage.setItem('musicSchoolUser', JSON.stringify(mockUser));
        
        // Show success toast
        toast.success(`Welcome back, ${mockUser.name}!`);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        toast.success('Login successful!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'student' // Default role for new users
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Account created! Please check your email to confirm your account.');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Try Supabase logout first
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase logout error:', error);
      }
      
      // Also clear any local storage as fallback
      localStorage.removeItem('musicSchoolUser');
      setUser(null);
      setUserRole(null);
      
      toast.info('You have been logged out');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
      throw error;
    }
  };

  const hasPermission = (requiredRoles: UserRole[]): boolean => {
    if (!user || !user.role) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      signup,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
