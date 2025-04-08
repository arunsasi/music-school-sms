
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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

// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password123', // In a real app, this would be hashed
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatar: '/placeholder.svg'
  },
  {
    id: '2',
    email: 'teacher@example.com',
    password: 'password123', // In a real app, this would be hashed
    name: 'Teacher User',
    role: 'teacher' as UserRole,
    avatar: '/placeholder.svg'
  }
];

// Mock permissions based on roles
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
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('musicSchoolUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('musicSchoolUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('musicSchoolUser', JSON.stringify(userWithoutPassword));
        navigate('/dashboard');
      } else {
        throw new Error('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('musicSchoolUser');
    setUser(null);
    navigate('/');
    toast.success('Logged out successfully');
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
