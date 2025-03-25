
import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { AttendanceRecord } from '@/types';
import { toast } from 'sonner';

interface TodayAttendanceProps {
  filteredStudents: {
    id: string;
    name: string;
    classId: string;
  }[];
  selectedClass: string;
  getAttendanceStatus: (studentId: string, date: string) => "Present" | "Late" | "Absent" | undefined;
  markAttendance: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark?: string) => void;
  currentDate: string;
  canTakeAttendance: () => boolean;
  canEditAttendance: boolean;
  submitAttendance: (classId: string) => void;
  attendanceSubmitted: boolean;
  mockClasses: {
    id: string;
    name: string;
    weekday: string;
    time: string;
    teacherId: string;
  }[];
}

const TodayAttendance: React.FC<TodayAttendanceProps> = ({
  filteredStudents,
  selectedClass,
  getAttendanceStatus,
  markAttendance,
  currentDate,
  canTakeAttendance,
  canEditAttendance,
  submitAttendance,
  attendanceSubmitted,
  mockClasses
}) => {
  const today = new Date().toISOString().split('T')[0];
  const isPastDate = currentDate < today;
  const isFutureDate = currentDate > today;
  
  // Check if attendance can be taken
  const canTakeOrEditAttendance = () => {
    // Admin/accounts can edit anytime
    if (canEditAttendance) return true;
    
    // Teachers can only take for today and if not submitted
    return canTakeAttendance() && !attendanceSubmitted && !isPastDate && !isFutureDate;
  };

  const handleSubmitAttendance = () => {
    if (selectedClass === "all") {
      toast.error("Please select a specific class to submit attendance");
      return;
    }
    
    if (!canTakeAttendance()) {
      toast.error("Attendance can only be taken for the current day");
      return;
    }
    
    submitAttendance(selectedClass);
  };

  // Get class name
  const getClassName = (classId: string) => {
    const cls = mockClasses.find(c => c.id === classId);
    return cls ? cls.name : 'Unknown Class';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            {selectedClass === "all" 
              ? "Mark Attendance for All Classes" 
              : `Mark Attendance for ${getClassName(selectedClass)}`}
          </CardTitle>
          <CardDescription>
            {currentDate === today 
              ? "Today's attendance" 
              : `Attendance for ${new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
          </CardDescription>
        </div>
        
        {selectedClass !== "all" && !attendanceSubmitted && canTakeOrEditAttendance() && (
          <Button onClick={handleSubmitAttendance}>
            Submit Attendance
          </Button>
        )}

        {attendanceSubmitted && selectedClass !== "all" && (
          <Badge className="bg-green-100 text-green-800">
            Attendance Submitted
          </Badge>
        )}
      </CardHeader>
      
      <CardContent>
        {isPastDate && !canEditAttendance && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-700">
              You cannot mark attendance for past dates. Please contact an administrator.
            </p>
          </div>
        )}
        
        {isFutureDate && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-700">
              You cannot mark attendance for future dates.
            </p>
          </div>
        )}
          
        {attendanceSubmitted && !canEditAttendance && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
            <p className="text-blue-700">
              Attendance has been submitted and can only be edited by administrators.
            </p>
          </div>
        )}
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => {
                const status = getAttendanceStatus(student.id, currentDate);
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{getClassName(student.classId)}</TableCell>
                    <TableCell>
                      {status && (
                        <Badge
                          className={
                            status === 'Present' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : status === 'Late'
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {/* No editable remarks for now */}
                      -
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={status === 'Present' ? 'bg-green-100' : ''}
                          onClick={() => markAttendance(student.id, student.classId, 'Present')}
                          disabled={!canTakeOrEditAttendance()}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Present
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={status === 'Late' ? 'bg-yellow-100' : ''}
                          onClick={() => markAttendance(student.id, student.classId, 'Late', 'Arrived late')}
                          disabled={!canTakeOrEditAttendance()}
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Late
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={status === 'Absent' ? 'bg-red-100' : ''}
                          onClick={() => markAttendance(student.id, student.classId, 'Absent')}
                          disabled={!canTakeOrEditAttendance()}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Absent
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TodayAttendance;
