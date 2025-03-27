
import { DashboardStats } from '@/types';

// Mock dashboard stats
export const MOCK_STATS: DashboardStats = {
  totalStudents: 156,
  totalEmployees: 14,
  totalClasses: 35,
  activeStudents: 142,
  totalRevenue: 24650,
  totalExpenses: 18240,
};

// Mock recent students
export const MOCK_RECENT_STUDENTS = [
  { id: '1', name: 'Emma Thompson', subject: 'Piano', date: '2023-06-01', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Liam Davis', subject: 'Guitar', date: '2023-06-03', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Sophia Martinez', subject: 'Violin', date: '2023-06-05', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Noah Wilson', subject: 'Drums', date: '2023-06-07', avatar: 'https://i.pravatar.cc/150?img=4' },
];

// Mock upcoming classes
export const MOCK_UPCOMING_CLASSES = [
  { id: '1', name: 'Beginner Piano', teacher: 'John Smith', time: '09:00 - 10:00', day: 'Monday', students: 8 },
  { id: '2', name: 'Intermediate Guitar', teacher: 'Sarah Johnson', time: '11:00 - 12:30', day: 'Tuesday', students: 6 },
  { id: '3', name: 'Advanced Violin', teacher: 'Michael Lee', time: '14:00 - 15:30', day: 'Wednesday', students: 4 },
  { id: '4', name: 'Group Vocals', teacher: 'Lisa Chen', time: '16:00 - 17:00', day: 'Thursday', students: 12 },
];

// Mock recent payments
export const MOCK_RECENT_PAYMENTS = [
  { id: '1', student: 'Emma Thompson', amount: 300, date: '2023-06-01', status: 'Paid' },
  { id: '2', name: 'John Davis', amount: 450, date: '2023-06-02', status: 'Pending' },
  { id: '3', name: 'Robert Johnson', amount: 380, date: '2023-06-03', status: 'Paid' },
  { id: '4', name: 'Sarah Williams', amount: 300, date: '2023-06-04', status: 'Cancelled' },
];

// Mock tasks
export const MOCK_TASKS = [
  { id: '1', title: 'Call student parents', completed: false, dueDate: '2023-06-15', assignedTo: 'All Teachers' },
  { id: '2', title: 'Prepare for recital', completed: false, dueDate: '2023-06-20', assignedTo: 'John Smith' },
  { id: '3', title: 'Order new equipment', completed: true, dueDate: '2023-06-10', assignedTo: 'Admin' },
  { id: '4', title: 'Review curriculum', completed: false, dueDate: '2023-06-25', assignedTo: 'All Teachers' },
];
