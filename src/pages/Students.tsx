
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
  Calendar,
  Phone,
  Mail,
  MapPin,
  Filter
} from 'lucide-react';
import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import StudentForm from '@/components/StudentForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Mock students data
const MOCK_STUDENTS: Student[] = [
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
  },
  {
    id: '5',
    name: 'Olivia Johnson',
    age: 13,
    guardian: 'Sarah Johnson',
    mobile: '(555) 567-8901',
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
    email: 'david@example.com',
    address: '505 Spruce St, Anytown, USA',
    enrollmentDate: '2023-05-01',
    status: 'Active'
  }
];

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Student>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.guardian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
    setIsAddingStudent(false);
    toast.success(`${newStudent.name} has been added successfully`);
  };
  
  const updateStudent = (studentData: Omit<Student, 'id'>) => {
    if (!editingStudent) return;
    
    const updatedStudents = students.map(student => 
      student.id === editingStudent.id 
        ? { ...studentData, id: editingStudent.id } 
        : student
    );
    
    setStudents(updatedStudents);
    setEditingStudent(null);
    toast.success(`${studentData.name} has been updated successfully`);
  };
  
  const deleteStudent = (id: string) => {
    const studentToDelete = students.find(student => student.id === id);
    if (!studentToDelete) return;
    
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    toast.success(`${studentToDelete.name} has been removed`);
  };
  
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">Students</h2>
          <p className="text-sm text-muted-foreground">
            Manage your enrolled students
          </p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button variant="outline" className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            className="bg-music-500 hover:bg-music-600"
            onClick={() => setIsAddingStudent(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-stroke bg-transparent focus-visible:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto flex items-center gap-2.5">
              <Filter className="h-5 w-5" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSearchTerm('')} className="cursor-pointer">
              All Students
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSort('name')} className="cursor-pointer">
              Sort by Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('age')} className="cursor-pointer">
              Sort by Age
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('enrollmentDate')} className="cursor-pointer">
              Sort by Enrollment Date
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSearchTerm('active')} className="cursor-pointer">
              Active Students
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm('inactive')} className="cursor-pointer">
              Inactive Students
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-2 text-left dark:bg-meta-4">
              <TableRow>
                <TableHead 
                  className="py-4.5 px-4 font-medium cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="py-4.5 px-4 font-medium cursor-pointer hidden md:table-cell"
                  onClick={() => handleSort('age')}
                >
                  <div className="flex items-center">
                    Age <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="py-4.5 px-4 font-medium hidden md:table-cell">
                  Guardian
                </TableHead>
                <TableHead className="py-4.5 px-4 font-medium hidden lg:table-cell">
                  Contact
                </TableHead>
                <TableHead 
                  className="py-4.5 px-4 font-medium cursor-pointer hidden lg:table-cell"
                  onClick={() => handleSort('enrollmentDate')}
                >
                  <div className="flex items-center">
                    Enrolled <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="py-4.5 px-4 font-medium">Status</TableHead>
                <TableHead className="py-4.5 px-4 text-right font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No students found. Try a different search term.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map(student => (
                  <TableRow key={student.id} className="border-b border-[#eee] dark:border-strokedark">
                    <TableCell className="py-5 px-4 font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="py-5 px-4 hidden md:table-cell">
                      {student.age}
                    </TableCell>
                    <TableCell className="py-5 px-4 hidden md:table-cell">
                      {student.guardian}
                    </TableCell>
                    <TableCell className="py-5 px-4 hidden lg:table-cell">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{student.mobile}</span>
                        </div>
                        {student.email && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm text-muted-foreground">{student.email}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(student.enrollmentDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <Badge 
                        variant={student.status === 'Active' ? 'default' : 'secondary'}
                        className={student.status === 'Active' ? 'bg-green-500' : ''}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setEditingStudent(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Manage Classes</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Payment History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive cursor-pointer"
                              onClick={() => deleteStudent(student.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {isAddingStudent && (
        <StudentForm
          isOpen={isAddingStudent}
          onClose={() => setIsAddingStudent(false)}
          onSubmit={addStudent}
        />
      )}
      
      {editingStudent && (
        <StudentForm
          isOpen={!!editingStudent}
          onClose={() => setEditingStudent(null)}
          onSubmit={updateStudent}
          initialData={editingStudent}
        />
      )}
    </div>
  );
};

export default Students;
