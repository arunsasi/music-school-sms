
import { useState } from 'react';
import { Employee } from '@/types';
import { toast } from 'sonner';

// Mock employees data
const MOCK_EMPLOYEES: Employee[] = [
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
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'Teacher',
    mobile: '(555) 456-7890',
    email: 'emily@musicschool.com',
    joiningDate: '2023-01-10',
    salary: 3000,
    status: 'Active'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    role: 'Principal',
    mobile: '(555) 567-8901',
    email: 'robert@musicschool.com',
    joiningDate: '2021-06-01',
    salary: 5000,
    status: 'Active'
  },
  {
    id: '6',
    name: 'Amanda Chang',
    role: 'Management',
    mobile: '(555) 678-9012',
    email: 'amanda@musicschool.com',
    joiningDate: '2021-09-15',
    salary: 4200,
    status: 'Active'
  },
  {
    id: '7',
    name: 'David Brown',
    role: 'Accountant',
    mobile: '(555) 789-0123',
    email: 'david@musicschool.com',
    joiningDate: '2022-04-01',
    salary: 3800,
    status: 'Active'
  },
  {
    id: '8',
    name: 'Lisa Chen',
    role: 'Teacher',
    mobile: '(555) 890-1234',
    email: 'lisa@musicschool.com',
    joiningDate: '2023-02-15',
    salary: 3100,
    status: 'Inactive'
  }
];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Employee>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Filter and sort employees
  const filteredEmployees = employees
    .filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.status.toLowerCase().includes(searchTerm.toLowerCase())
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
  
  const handleSort = (column: keyof Employee) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: (employees.length + 1).toString()
    };
    
    setEmployees([...employees, newEmployee]);
    toast.success(`${newEmployee.name} has been added successfully`);
    return newEmployee;
  };
  
  const updateEmployee = (employeeData: Employee) => {    
    const updatedEmployees = employees.map(emp => 
      emp.id === employeeData.id 
        ? employeeData
        : emp
    );
    
    setEmployees(updatedEmployees);
    toast.success(`${employeeData.name} has been updated successfully`);
    return employeeData;
  };
  
  const deleteEmployee = (id: string) => {
    const employeeToDelete = employees.find(emp => emp.id === id);
    if (!employeeToDelete) return;
    
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    toast.success(`${employeeToDelete.name} has been removed`);
  };
  
  return {
    employees,
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    handleSort,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};
