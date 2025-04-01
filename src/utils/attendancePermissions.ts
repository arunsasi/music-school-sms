
import { UserRole } from '@/types';

// Check if attendance can be edited (only admin/accounts can edit)
export const canEditAttendance = (userRole?: UserRole) => {
  return userRole === 'admin' || userRole === 'accounts';
};

// Check if attendance can be taken (teacher can only take for current day)
export const canTakeAttendanceForDate = (currentDate: string, userRole?: UserRole) => {
  const today = new Date().toISOString().split('T')[0];
  return currentDate === today || userRole === 'admin' || userRole === 'accounts';
};

// Filter classes based on teacher if user is a teacher
export const filterClassesByTeacher = (classes: any[], userId?: string, userRole?: UserRole) => {
  if (userRole === 'teacher') {
    return classes.filter(cls => cls.teacherId === userId);
  }
  return classes;
};
