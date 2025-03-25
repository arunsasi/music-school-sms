
import React, { useState } from 'react';
import { 
  ChevronDown, 
  Download, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  ArrowUpDown,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Employee } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import EmployeeForm from '@/components/EmployeeForm';

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

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Employee>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  
  // Filter and sort employees
  const filteredEmployees = employees
    .filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
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
    setIsAddingEmployee(false);
    toast.success(`${newEmployee.name} has been added successfully`);
  };
  
  const updateEmployee = (employeeData: Omit<Employee, 'id'>) => {
    if (!editingEmployee) return;
    
    const updatedEmployees = employees.map(emp => 
      emp.id === editingEmployee.id 
        ? { ...employeeData, id: editingEmployee.id } 
        : emp
    );
    
    setEmployees(updatedEmployees);
    setEditingEmployee(null);
    toast.success(`${employeeData.name} has been updated successfully`);
  };
  
  const deleteEmployee = (id: string) => {
    const employeeToDelete = employees.find(emp => emp.id === id);
    if (!employeeToDelete) return;
    
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    toast.success(`${employeeToDelete.name} has been removed`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            Manage your school's staff and faculty
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            className="bg-music-500 hover:bg-music-600"
            onClick={() => setIsAddingEmployee(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSearchTerm('')}>
              All Employees
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSearchTerm('teacher')}>
              Teachers Only
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm('management')}>
              Management Only
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm('accountant')}>
              Accountants Only
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSearchTerm('active')}>
              Active Employees
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm('inactive')}>
              Inactive Employees
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="w-[200px] cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center">
                  Role <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead 
                className="cursor-pointer hidden md:table-cell"
                onClick={() => handleSort('joiningDate')}
              >
                <div className="flex items-center">
                  Joining Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hidden lg:table-cell text-right"
                onClick={() => handleSort('salary')}
              >
                <div className="flex items-center justify-end">
                  Salary <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No employees found. Try a different search term.
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    {employee.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.role}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>{employee.mobile}</div>
                    <div className="text-muted-foreground text-sm">{employee.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(employee.joiningDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    ${employee.salary.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      {employee.status === 'Active' ? (
                        <>
                          <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                          <span className="text-green-500">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="mr-1 h-4 w-4 text-red-500" />
                          <span className="text-red-500">Inactive</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingEmployee(employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteEmployee(employee.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {isAddingEmployee && (
        <EmployeeForm
          isOpen={isAddingEmployee}
          onClose={() => setIsAddingEmployee(false)}
          onSubmit={addEmployee}
        />
      )}
      
      {editingEmployee && (
        <EmployeeForm
          isOpen={!!editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSubmit={updateEmployee}
          initialData={editingEmployee}
        />
      )}
    </div>
  );
};

export default Employees;
