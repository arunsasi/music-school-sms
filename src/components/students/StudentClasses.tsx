
import React, { useState, useEffect } from 'react';
import { Student } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock classes data
const mockClasses = [
  { id: '1', name: 'Piano Beginners', weekday: 'Monday', time: '4:00 PM - 5:00 PM', enrolled: true },
  { id: '2', name: 'Guitar Advanced', weekday: 'Tuesday', time: '5:00 PM - 6:30 PM', enrolled: false },
  { id: '3', name: 'Violin Intermediate', weekday: 'Wednesday', time: '4:30 PM - 6:00 PM', enrolled: true },
  { id: '4', name: 'Vocal Training', weekday: 'Thursday', time: '5:00 PM - 6:00 PM', enrolled: false },
  { id: '5', name: 'Drums Beginners', weekday: 'Friday', time: '4:00 PM - 5:00 PM', enrolled: false },
];

interface StudentClassesProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentClasses: React.FC<StudentClassesProps> = ({ student, isOpen, onClose }) => {
  const [enrolledClasses, setEnrolledClasses] = useState<typeof mockClasses>([]);
  
  useEffect(() => {
    if (student) {
      // In a real app, this would fetch the student's enrolled classes from an API
      setEnrolledClasses(mockClasses.filter(c => c.enrolled));
    }
  }, [student]);
  
  const handleEnrollClass = (classId: string) => {
    // In a real app, this would call an API to enroll the student
    setEnrolledClasses(prev => [
      ...prev,
      mockClasses.find(c => c.id === classId)!
    ]);
    
    toast.success('Student enrolled successfully');
  };
  
  const handleRemoveFromClass = (classId: string) => {
    // In a real app, this would call an API to remove the student
    setEnrolledClasses(prev => prev.filter(c => c.id !== classId));
    
    toast.success('Student removed from class');
  };
  
  if (!student) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md w-full overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>Manage Classes for {student.name}</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Enrolled Classes</h3>
            {enrolledClasses.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-md">
                <p className="text-gray-500">No classes enrolled</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrolledClasses.map(cls => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-xs">
                            <Calendar className="mr-1 h-3 w-3" />
                            {cls.weekday}
                          </div>
                          <div className="flex items-center text-xs mt-1">
                            <Clock className="mr-1 h-3 w-3" />
                            {cls.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleRemoveFromClass(cls.id)}
                        >
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
            <h3 className="text-lg font-medium mb-3">Available Classes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClasses.filter(c => !enrolledClasses.some(ec => ec.id === c.id)).map(cls => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center text-xs">
                          <Calendar className="mr-1 h-3 w-3" />
                          {cls.weekday}
                        </div>
                        <div className="flex items-center text-xs mt-1">
                          <Clock className="mr-1 h-3 w-3" />
                          {cls.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600"
                        onClick={() => handleEnrollClass(cls.id)}
                      >
                        <PlusCircle className="mr-1 h-3 w-3" />
                        Enroll
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <SheetFooter className="mt-6">
          <Button onClick={onClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StudentClasses;
