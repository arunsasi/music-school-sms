
import { useState } from 'react';
import { Student } from '@/types';
import { toast } from 'sonner';

// Mock students data
const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    age: 12,
    guardian: 'Jennifer Thompson',
    mobile: '(555) 123-4567',
    secondaryMobile: '(555) 987-6543',
    smsNotifications: true,
    secondarySmsNotifications: false,
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
    secondaryMobile: '',
    smsNotifications: false,
    secondarySmsNotifications: false,
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
    secondaryMobile: '(555) 765-4321',
    smsNotifications: true,
    secondarySmsNotifications: true,
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
    secondaryMobile: '',
    smsNotifications: true,
    secondarySmsNotifications: false,
    email: 'james@example.com',
    address: '101 Cedar St, Anytown, USA',
    enrollmentDate: '2023-03-01',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Olivia Johnson',
    age: 13,
    guardian: 'Sarah Johnson',
    mobile: '(555) 567-8901',
    secondaryMobile: '',
    smsNotifications: false,
    secondarySmsNotifications: false,
    email: 'sarah@example.com',
    address: '202 Birch St, Anytown, USA',
    enrollmentDate: '2023-03-15',
    status: 'Active'
  },
  {
    id: '6',
    name: 'William Brown',
    age: 11,
    guardian: 'Robert Brown',
    mobile: '(555) 678-9012',
    secondaryMobile: '',
    smsNotifications: false,
    secondarySmsNotifications: false,
    email: 'robert@example.com',
    address: '303 Elm St, Anytown, USA',
    enrollmentDate: '2023-04-01',
    status: 'Inactive'
  },
  {
    id: '7',
    name: 'Ava Garcia',
    age: 9,
    guardian: 'Maria Garcia',
    mobile: '(555) 789-0123',
    secondaryMobile: '(555) 321-0987',
    smsNotifications: true,
    secondarySmsNotifications: true,
    email: 'maria@example.com',
    address: '404 Walnut St, Anytown, USA',
    enrollmentDate: '2023-04-15',
    status: 'Active'
  },
  {
    id: '8',
    name: 'James Miller',
    age: 16,
    guardian: 'David Miller',
    mobile: '(555) 890-1234',
    secondaryMobile: '',
    smsNotifications: true,
    secondarySmsNotifications: false,
    email: 'david@example.com',
    address: '505 Spruce St, Anytown, USA',
    enrollmentDate: '2023-05-01',
    status: 'Active'
  }
];

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Student>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.guardian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      student.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  
  const handleSort = (column: keyof Student) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: (students.length + 1).toString()
    };
    
    setStudents([...students, newStudent]);
    toast.success(`${newStudent.name} has been added successfully`);
    return newStudent;
  };
  
  const updateStudent = (studentData: Student) => {
    const updatedStudents = students.map(student => 
      student.id === studentData.id 
        ? studentData
        : student
    );
    
    setStudents(updatedStudents);
    toast.success(`${studentData.name} has been updated successfully`);
    return studentData;
  };
  
  const deleteStudent = (id: string) => {
    const studentToDelete = students.find(student => student.id === id);
    if (!studentToDelete) return false;
    
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    toast.success(`${studentToDelete.name} has been removed`);
    return true;
  };

  return {
    students,
    filteredStudents,
    searchTerm,
    setSearchTerm,
    handleSort,
    addStudent,
    updateStudent,
    deleteStudent
  };
};
