
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
    <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
        <div>
          <CardTitle className="text-xl font-semibold">
            {selectedClass === "all" 
              ? "Mark Attendance for All Classes" 
              : `Mark Attendance for ${getClassName(selectedClass)}`}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {currentDate === today 
              ? "Today's attendance" 
              : `Attendance for ${new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
          </CardDescription>
        </div>
        
        {selectedClass !== "all" && !attendanceSubmitted && canTakeOrEditAttendance() && (
          <Button 
            onClick={handleSubmitAttendance}
            className="bg-music-500 hover:bg-music-600"
          >
            Submit Attendance
          </Button>
        )}

        {attendanceSubmitted && selectedClass !== "all" && (
          <Badge className="bg-green-100 text-green-800">
            Attendance Submitted
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        {isPastDate && !canEditAttendance && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md mx-6 mt-6 p-3 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-700 text-sm">
              You cannot mark attendance for past dates. Please contact an administrator.
            </p>
          </div>
        )}
        
        {isFutureDate && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md mx-6 mt-6 p-3 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-yellow-700 text-sm">
              You cannot mark attendance for future dates.
            </p>
          </div>
        )}
          
        {attendanceSubmitted && !canEditAttendance && (
          <div className="bg-blue-50 border border-blue-200 rounded-md mx-6 mt-6 p-3 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
            <p className="text-blue-700 text-sm">
              Attendance has been submitted and can only be edited by administrators.
            </p>
          </div>
        )}

        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 text-left">
              <TableRow>
                <TableHead className="py-4 px-4 font-medium">Student</TableHead>
                <TableHead className="py-4 px-4 font-medium hidden md:table-cell">Class</TableHead>
                <TableHead className="py-4 px-4 font-medium">Status</TableHead>
                <TableHead className="py-4 px-4 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => {
                  const status = getAttendanceStatus(student.id, currentDate);
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="py-4 px-4 font-medium">
                        <div className="flex flex-col">
                          <span>{student.name}</span>
                          <span className="text-xs text-muted-foreground md:hidden mt-1">
                            {getClassName(student.classId)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 hidden md:table-cell">
                        {getClassName(student.classId)}
                      </TableCell>
                      <TableCell className="py-4 px-4">
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
                      <TableCell className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={status === 'Present' ? 'bg-green-100' : ''}
                            onClick={() => markAttendance(student.id, student.classId, 'Present')}
                            disabled={!canTakeOrEditAttendance()}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Present</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={status === 'Late' ? 'bg-yellow-100' : ''}
                            onClick={() => markAttendance(student.id, student.classId, 'Late', 'Arrived late')}
                            disabled={!canTakeOrEditAttendance()}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Late</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={status === 'Absent' ? 'bg-red-100' : ''}
                            onClick={() => markAttendance(student.id, student.classId, 'Absent')}
                            disabled={!canTakeOrEditAttendance()}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Absent</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayAttendance;
