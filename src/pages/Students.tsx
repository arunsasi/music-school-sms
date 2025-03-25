
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
  XCircle,
  Calendar,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import StudentForm from '@/components/StudentForm';

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
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState<keyof Student>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  // Filter and sort students
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage your enrolled students
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="hidden md:flex"
            onClick={() => setIsGridView(!isGridView)}
          >
            {isGridView ? 'List View' : 'Grid View'}
          </Button>
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
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
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
              All Students
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSort('name')}>
              Sort by Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('age')}>
              Sort by Age
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('enrollmentDate')}>
              Sort by Enrollment Date
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSearchTerm('active')}>
              Active Students
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm('inactive')}>
              Inactive Students
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {isGridView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No students found. Try a different search term.
            </div>
          ) : (
            filteredStudents.map(student => (
              <Card key={student.id} className="dashboard-card h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <Badge 
                      variant={student.status === 'Active' ? 'default' : 'secondary'}
                      className={student.status === 'Active' ? 'bg-green-500' : ''}
                    >
                      {student.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Age: {student.age} years
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">Guardian:</span>
                      <span>{student.guardian}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span>{student.mobile}</span>
                    </div>
                    {student.email && (
                      <div className="flex items-start text-sm">
                        <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span>{student.email}</span>
                      </div>
                    )}
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span className="truncate">{student.address}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex justify-between w-full">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingStudent(student)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Manage Classes</DropdownMenuItem>
                        <DropdownMenuItem>Payment History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteStudent(student.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th 
                  className="py-3 px-4 text-left font-medium cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left font-medium cursor-pointer hidden md:table-cell"
                  onClick={() => handleSort('age')}
                >
                  <div className="flex items-center">
                    Age <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium hidden md:table-cell">
                  Guardian
                </th>
                <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">
                  Contact
                </th>
                <th 
                  className="py-3 px-4 text-left font-medium cursor-pointer hidden lg:table-cell"
                  onClick={() => handleSort('enrollmentDate')}
                >
                  <div className="flex items-center">
                    Enrolled <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-muted-foreground">
                    No students found. Try a different search term.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="border-t">
                    <td className="py-3 px-4 font-medium">
                      {student.name}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      {student.age}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      {student.guardian}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div>{student.mobile}</div>
                      {student.email && (
                        <div className="text-muted-foreground text-xs">{student.email}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={student.status === 'Active' ? 'default' : 'secondary'}
                        className={student.status === 'Active' ? 'bg-green-500' : ''}
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Manage Classes</DropdownMenuItem>
                            <DropdownMenuItem>Payment History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => deleteStudent(student.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
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
