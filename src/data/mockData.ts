
import { Student, Employee } from '@/types';

// Mock students data for the finance page
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    age: 12,
    guardian: 'Jennifer Thompson',
    mobile: '(555) 123-4567',
    email: 'jennifer@example.com',
    address: '123 Maple St, Anytown, USA',
    enrollmentDate: '2023-01-15',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Liam Davis',
    age: 14,
    guardian: 'Mark Davis',
    mobile: '(555) 234-5678',
    email: 'mark@example.com',
    address: '456 Oak St, Anytown, USA',
    enrollmentDate: '2023-02-01',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Sophia Martinez',
    age: 10,
    guardian: 'Elena Martinez',
    mobile: '(555) 345-6789',
    email: 'elena@example.com',
    address: '789 Pine St, Anytown, USA',
    enrollmentDate: '2023-02-15',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Noah Wilson',
    age: 15,
    guardian: 'James Wilson',
    mobile: '(555) 456-7890',
    email: 'james@example.com',
    address: '101 Cedar St, Anytown, USA',
    enrollmentDate: '2023-03-01',
    status: 'Active'
  }
];

// Mock employees data for the finance page
export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Teacher',
    mobile: '(555) 123-4567',
    email: 'john@musicschool.com',
    joiningDate: '2022-03-15',
    salary: 3500,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Teacher',
    mobile: '(555) 234-5678',
    email: 'sarah@musicschool.com',
    joiningDate: '2022-05-20',
    salary: 3200,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Michael Lee',
    role: 'Teacher',
    mobile: '(555) 345-6789',
    email: 'michael@musicschool.com',
    joiningDate: '2022-08-01',
    salary: 3300,
    status: 'Active'
  }
];
