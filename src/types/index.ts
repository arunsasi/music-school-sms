
export interface DashboardStats {
  totalStudents: number;
  totalEmployees: number;
  totalClasses: number;
  activeStudents: number;
  totalRevenue: number;
  totalExpenses: number;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  guardian: string;
  mobile: string;
  email: string;
  address: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive';
  classId?: string; // Added for attendance feature
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  mobile: string;
  email: string;
  joiningDate: string;
  salary: number;
  status: 'Active' | 'Inactive';
}

export interface Subject {
  id: string;
  name: string;
  description: string;
}

export interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Class {
  id: string;
  name: string;
  subject: Subject;
  teacherId: string;
  schedule: ScheduleItem[];
  fee: number;
  students: string[];
  weekday?: string; // Added for attendance feature
  time?: string; // Added for attendance feature
}

export type UserRole = 'admin' | 'teacher' | 'accounts' | 'student' | 'parent';

// Extended User interface that includes additional properties from Supabase Auth User
export interface User {
  id: string;
  email?: string;
  // Custom app properties
  name?: string;
  role?: UserRole;
  avatar?: string;
  // Add any other properties that might be accessed
  full_name?: string; // From Supabase profiles
}

export interface Teacher extends Employee {
  classes: string[]; // Class IDs assigned to teacher
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'Present' | 'Late' | 'Absent';
  remark: string;
  takenBy: string;
  editedBy?: string;
  editedAt?: string;
}
