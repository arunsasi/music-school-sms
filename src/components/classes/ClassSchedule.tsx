
import React from 'react';
import { Class } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TeacherInfo {
  [key: string]: {
    name: string;
    email: string;
    phone: string;
  };
}

// Mock teacher data
const teacherInfo: TeacherInfo = {
  '1': { name: 'John Smith', email: 'john.smith@example.com', phone: '(555) 123-4567' },
  '2': { name: 'Sarah Johnson', email: 'sarah.johnson@example.com', phone: '(555) 234-5678' },
  '3': { name: 'Michael Lee', email: 'michael.lee@example.com', phone: '(555) 345-6789' },
};

interface ClassScheduleProps {
  classData: Class | null;
  isOpen: boolean;
  onClose: () => void;
}

const ClassSchedule: React.FC<ClassScheduleProps> = ({ classData, isOpen, onClose }) => {
  if (!classData) return null;
  
  const teacher = teacherInfo[classData.teacherId] || { 
    name: 'Unknown Teacher', 
    email: 'unknown@example.com', 
    phone: 'Not available' 
  };
  
  // Sort days to get a logical order
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sortedSchedule = [...classData.schedule].sort((a, b) => 
    days.indexOf(a.day) - days.indexOf(b.day)
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full md:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">{classData.name} Schedule</SheetTitle>
          <Badge variant="outline" className="w-fit mt-2">
            {classData.subject.name}
          </Badge>
        </SheetHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Class Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedSchedule.map((sch, index) => (
                <div 
                  key={index} 
                  className={`flex items-start py-3 ${
                    index < sortedSchedule.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="w-24 flex-shrink-0">
                    <Badge variant="outline" className="font-medium">
                      {sch.day}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>
                      {sch.startTime} - {sch.endTime}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Instructor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Name</div>
                  <div className="text-sm">{teacher.name}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-muted-foreground mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm">{teacher.email}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-muted-foreground mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <div className="text-sm">{teacher.phone}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-muted-foreground mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Total Students</span>
                </div>
                <Badge variant="secondary">{classData.students.length}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <SheetFooter className="mt-6">
          <Button onClick={onClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ClassSchedule;
