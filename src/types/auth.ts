
import { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'teacher' | 'accounts' | 'student' | 'parent';

export interface User {
  id: string;
  email?: string | null;
  name?: string;
  role?: UserRole;
  avatar?: string;
  full_name?: string;
}

export const rolePermissions: Record<UserRole, string[]> = {
  admin: ['manage_students', 'manage_classes', 'manage_employees', 'manage_finances', 'view_reports', 'manage_settings'],
  teacher: ['view_students', 'manage_attendance', 'view_classes'],
  accounts: ['manage_finances', 'view_reports'],
  student: ['view_classes', 'view_attendance'],
  parent: ['view_student_info']
};
