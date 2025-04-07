
import { UserRole } from '@/types';
import { MockClass } from '@/data/mockAttendanceData';

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
export const filterClassesByTeacher = (classes: MockClass[], userId?: string, userRole?: UserRole) => {
  if (userRole === 'teacher' && userId) {
    return classes.filter(cls => cls.teacherId === userId);
  }
  return classes;
};

// Check if the user can access the attendance management for a specific class
export const canAccessAttendance = (classId: string, teacherClasses: MockClass[], userRole?: UserRole) => {
  // Admin and accounts can access any class
  if (userRole === 'admin' || userRole === 'accounts') return true;
  
  // Teachers can only access their assigned classes
  if (userRole === 'teacher') {
    return teacherClasses.some(cls => cls.id === classId);
  }
  
  return false;
};
