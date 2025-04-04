
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { Checkbox } from '@/components/ui/checkbox';
import { AttendanceRecord } from '@/types';
import { MockClass, MockStudent } from '@/data/mockAttendanceData';
import { toast } from 'sonner';

interface TodayAttendanceProps {
  filteredStudents: MockStudent[];
  selectedClass: string;
  getAttendanceStatus: (studentId: string, date: string) => "Present" | "Late" | "Absent" | undefined;
  markAttendance: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark?: string) => void;
  currentDate: string;
  canTakeAttendance: () => boolean;
  canEditAttendance: boolean;
  submitAttendance: (classId: string) => void;
  attendanceSubmitted: boolean;
  mockClasses: MockClass[];
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
  const isMobile = useIsMobile();
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  
  const today = new Date().toISOString().split('T')[0];
  const isPastDate = currentDate < today;
  const isFutureDate = currentDate > today;
  
  const canTakeOrEditAttendance = () => {
    if (canEditAttendance) return true;
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

  const getClassName = (classId: string) => {
    const cls = mockClasses.find(c => c.id === classId);
    return cls ? cls.name : 'Unknown Class';
  };

  const toggleStudentExpansion = (studentId: string) => {
    if (expandedStudent === studentId) {
      setExpandedStudent(null);
    } else {
      setExpandedStudent(studentId);
    }
  };

  // Quick mark multiple students as present
  const markAllPresent = () => {
    if (!canTakeOrEditAttendance()) {
      toast.error("You don't have permission to mark attendance");
      return;
    }
    
    filteredStudents.forEach(student => {
      if (!getAttendanceStatus(student.id, currentDate)) {
        markAttendance(student.id, student.classId, 'Present');
      }
    });
    
    toast.success("Marked all students as present");
  };

  if (isMobile) {
    return (
      <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <CardHeader className="flex flex-col gap-2 border-b px-6 py-4">
          <CardTitle className="text-xl font-semibold">
            {selectedClass === "all" 
              ? "Mark Attendance" 
              : `${getClassName(selectedClass)}`}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {currentDate === today 
              ? "Today's attendance" 
              : new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </CardDescription>
          
          {selectedClass !== "all" && !attendanceSubmitted && canTakeOrEditAttendance() && (
            <div className="flex gap-2 mt-2 justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllPresent} 
                className="flex-1"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark All Present
              </Button>
              <Button 
                onClick={handleSubmitAttendance}
                className="bg-primary hover:bg-primary/90 flex-1"
              >
                Submit
              </Button>
            </div>
          )}
          
          {attendanceSubmitted && selectedClass !== "all" && (
            <Badge className="bg-green-100 text-green-800 self-start">
              Attendance Submitted
            </Badge>
          )}
        </CardHeader>
        
        <CardContent className="p-0">
          {isPastDate && !canEditAttendance && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md mx-4 mt-4 p-3 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-yellow-700 text-sm">
                You cannot mark attendance for past dates.
              </p>
            </div>
          )}
          
          {isFutureDate && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md mx-4 mt-4 p-3 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-yellow-700 text-sm">
                You cannot mark attendance for future dates.
              </p>
            </div>
          )}
            
          {attendanceSubmitted && !canEditAttendance && (
            <div className="bg-blue-50 border border-blue-200 rounded-md mx-4 mt-4 p-3 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-blue-700 text-sm">
                Attendance has been submitted already.
              </p>
            </div>
          )}

          <div className="divide-y">
            {filteredStudents.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No students found
              </div>
            ) : (
              filteredStudents.map((student) => {
                const status = getAttendanceStatus(student.id, currentDate);
                const isExpanded = expandedStudent === student.id;
                
                return (
                  <div key={student.id} className="px-4 py-3">
                    <div 
                      className="flex justify-between items-center"
                      onClick={() => toggleStudentExpansion(student.id)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{student.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {getClassName(student.classId)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
                        />
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`${status === 'Present' ? 'bg-green-100 border-green-200' : ''}`}
                          onClick={() => markAttendance(student.id, student.classId, 'Present')}
                          disabled={!canTakeOrEditAttendance()}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Present
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`${status === 'Late' ? 'bg-yellow-100 border-yellow-200' : ''}`}
                          onClick={() => markAttendance(student.id, student.classId, 'Late', 'Arrived late')}
                          disabled={!canTakeOrEditAttendance()}
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Late
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`${status === 'Absent' ? 'bg-red-100 border-red-200' : ''}`}
                          onClick={() => markAttendance(student.id, student.classId, 'Absent')}
                          disabled={!canTakeOrEditAttendance()}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Absent
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Desktop view remains mostly the same
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
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={markAllPresent}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Mark All Present
            </Button>
            <Button 
              onClick={handleSubmitAttendance}
              className="bg-primary hover:bg-primary/90"
            >
              Submit Attendance
            </Button>
          </div>
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
                <TableHead className="py-4 px-4 font-medium">Class</TableHead>
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
                        {student.name}
                      </TableCell>
                      <TableCell className="py-4 px-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayAttendance;
