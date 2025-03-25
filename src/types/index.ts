
export type UserRole = 'admin' | 'accounts' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Principal' | 'Management' | 'Teacher' | 'Accountant' | 'Other';
  mobile: string;
  email: string;
  joiningDate: string;
  salary: number;
  status: 'Active' | 'Inactive';
}

export interface Student {
  id: string;
  name: string;
  age: number;
  guardian: string;
  mobile: string;
  email?: string;
  address: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive';
}

export interface Subject {
  id: string;
  name: string;
  description: string;
}

export interface Class {
  id: string;
  name: string;
  subject: Subject;
  teacherId: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  fee: number;
  students: string[]; // student IDs
}

export interface Attendance {
  id: string;
  classId: string;
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  remark?: string;
}

export interface Payment {
  id: string;
  type: 'Salary' | 'Fee' | 'Expense';
  amount: number;
  date: string;
  description: string;
  paidTo?: string; // employee ID for salary
  paidBy?: string; // student ID for fee
  status: 'Paid' | 'Pending' | 'Cancelled';
}

export interface DashboardStats {
  totalStudents: number;
  totalEmployees: number;
  totalClasses: number;
  activeStudents: number;
  totalRevenue: number;
  totalExpenses: number;
}
