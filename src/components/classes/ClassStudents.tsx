
import React, { useState, useEffect } from 'react';
import { Class, Student } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, UserMinus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Mock students data
const mockStudents = [
  { id: '1', name: 'Emma Thompson', age: 12, enrollmentDate: '2023-01-15', status: 'Active' },
  { id: '2', name: 'Liam Davis', age: 14, enrollmentDate: '2023-02-01', status: 'Active' },
  { id: '3', name: 'Sophia Martinez', age: 10, enrollmentDate: '2023-02-15', status: 'Active' },
  { id: '4', name: 'Noah Wilson', age: 15, enrollmentDate: '2023-03-01', status: 'Active' },
  { id: '5', name: 'Olivia Johnson', age: 13, enrollmentDate: '2023-03-15', status: 'Active' },
  { id: '6', name: 'William Brown', age: 11, enrollmentDate: '2023-04-01', status: 'Inactive' },
  { id: '7', name: 'Ava Garcia', age: 9, enrollmentDate: '2023-04-15', status: 'Active' },
  { id: '8', name: 'James Miller', age: 16, enrollmentDate: '2023-05-01', status: 'Active' },
];

interface ClassStudentsProps {
  classData: Class | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedClass: Class) => void;
}

const ClassStudents: React.FC<ClassStudentsProps> = ({ classData, isOpen, onClose, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState<typeof mockStudents>([]);
  
  useEffect(() => {
    if (classData) {
      const enrolled = mockStudents.filter(student => 
        classData.students.includes(student.id)
      );
      setEnrolledStudents(enrolled);
    }
  }, [classData]);
  
  const handleRemoveStudent = (studentId: string) => {
    if (!classData) return;
    
    const updatedStudentIds = classData.students.filter(id => id !== studentId);
    onUpdate({
      ...classData,
      students: updatedStudentIds
    });
    
    setEnrolledStudents(prev => prev.filter(student => student.id !== studentId));
    toast.success('Student removed from class');
  };
  
  const handleAddStudent = (student: typeof mockStudents[0]) => {
    if (!classData) return;
    
    // Check if already enrolled
    if (classData.students.includes(student.id)) {
      toast.error('Student is already enrolled in this class');
      return;
    }
    
    const updatedStudentIds = [...classData.students, student.id];
    onUpdate({
      ...classData,
      students: updatedStudentIds
    });
    
    setEnrolledStudents(prev => [...prev, student]);
    toast.success(`${student.name} added to class`);
  };
  
  const availableStudents = mockStudents.filter(student => 
    !classData?.students.includes(student.id) &&
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!classData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full md:max-w-md lg:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl">Students in {classData.name}</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Current Students ({enrolledStudents.length})</h3>
            {enrolledStudents.length === 0 ? (
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-muted-foreground">No students enrolled in this class</p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Age</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrolledStudents.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{student.age}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveStudent(student.id)}
                        >
                          <UserMinus className="h-3.5 w-3.5 mr-1" />
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Add Students</h3>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students to add..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {availableStudents.length === 0 ? (
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-muted-foreground">No matching students found</p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Age</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableStudents.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{student.age}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-500 hover:text-green-600"
                          onClick={() => handleAddStudent(student)}
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
        
        <SheetFooter className="mt-6">
          <Button 
            onClick={onClose}
            className="bg-music-500 hover:bg-music-600"
          >
            <Check className="mr-2 h-4 w-4" />
            Done
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ClassStudents;
