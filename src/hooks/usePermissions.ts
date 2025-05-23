
import { rolePermissions } from '@/types/auth';
import type { User, UserRole } from '@/types/auth';

export function usePermissions(user: User | null) {
  const hasPermission = (permission: string | string[]): boolean => {
    if (!user || !user.role) return false;
    
    // Get permissions for the user's role
    const permissions = rolePermissions[user.role as UserRole] || [];
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Check if the user has any of the required permissions
    if (Array.isArray(permission)) {
      return permission.some(p => permissions.includes(p));
    }
    
    // Check for a single permission
    return permissions.includes(permission);
  };

  return {
    hasPermission
  };
}
