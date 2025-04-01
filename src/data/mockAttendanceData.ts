
import { AttendanceRecord, Class, Student } from '@/types';

// Mock data for classes
export const mockClasses: Class[] = [
  { id: '1', name: 'Piano Beginners', weekday: 'Monday', time: '4:00 PM - 5:00 PM', teacherId: '3' },
  { id: '2', name: 'Violin Intermediate', weekday: 'Tuesday', time: '5:00 PM - 6:30 PM', teacherId: '3' },
  { id: '3', name: 'Guitar Advanced', weekday: 'Wednesday', time: '6:00 PM - 7:30 PM', teacherId: '4' },
  { id: '4', name: 'Vocal Training', weekday: 'Thursday', time: '4:30 PM - 6:00 PM', teacherId: '4' },
  { id: '5', name: 'Drums Beginners', weekday: 'Friday', time: '5:00 PM - 6:00 PM', teacherId: '5' },
];

// Mock data for students
export const mockStudents: Student[] = [
  { id: '1', name: 'Emily Johnson', classId: '1' },
  { id: '2', name: 'Michael Chen', classId: '1' },
  { id: '3', name: 'Sarah Williams', classId: '1' },
  { id: '4', name: 'David Rodriguez', classId: '2' },
  { id: '5', name: 'Olivia Thompson', classId: '2' },
  { id: '6', name: 'James Wilson', classId: '3' },
  { id: '7', name: 'Sophia Martinez', classId: '3' },
  { id: '8', name: 'Ethan Brown', classId: '4' },
  { id: '9', name: 'Ava Garcia', classId: '5' },
  { id: '10', name: 'Noah Smith', classId: '5' },
];

// Sample attendance records
export const initialAttendanceRecords: AttendanceRecord[] = [
  { id: '1', studentId: '1', classId: '1', date: '2023-06-12', status: 'Present', remark: '', takenBy: '3' },
  { id: '2', studentId: '2', classId: '1', date: '2023-06-12', status: 'Late', remark: 'Arrived 15 mins late', takenBy: '3' },
  { id: '3', studentId: '3', classId: '1', date: '2023-06-12', status: 'Absent', remark: 'Sick leave', takenBy: '3' },
  { id: '4', studentId: '4', classId: '2', date: '2023-06-13', status: 'Present', remark: '', takenBy: '3' },
  { id: '5', studentId: '5', classId: '2', date: '2023-06-13', status: 'Present', remark: '', takenBy: '3' },
];
