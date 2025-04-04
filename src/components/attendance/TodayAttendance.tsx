
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { MockClass, MockStudent } from '@/data/mockAttendanceData';
import MobileStudentList from './MobileStudentList';
import DesktopStudentTable from './DesktopStudentTable';
import AttendanceCardHeader from './AttendanceCardHeader';
import AttendanceWarning from './AttendanceWarning';

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

  return (
    <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <AttendanceCardHeader
        selectedClass={selectedClass}
        getClassName={getClassName}
        currentDate={currentDate}
        today={today}
        attendanceSubmitted={attendanceSubmitted}
        canTakeOrEditAttendance={canTakeOrEditAttendance}
        markAllPresent={markAllPresent}
        handleSubmitAttendance={handleSubmitAttendance}
        isMobile={isMobile}
      />
      
      <CardContent className="p-0">
        {isPastDate && !canEditAttendance && (
          <AttendanceWarning 
            type="past" 
            className={isMobile ? "mx-4 mt-4" : "mx-6 mt-6"} 
          />
        )}
        
        {isFutureDate && (
          <AttendanceWarning 
            type="future" 
            className={isMobile ? "mx-4 mt-4" : "mx-6 mt-6"} 
          />
        )}
          
        {attendanceSubmitted && !canEditAttendance && (
          <AttendanceWarning 
            type="submitted" 
            className={isMobile ? "mx-4 mt-4" : "mx-6 mt-6"} 
          />
        )}

        {isMobile ? (
          <MobileStudentList
            filteredStudents={filteredStudents}
            getClassName={getClassName}
            getAttendanceStatus={getAttendanceStatus}
            markAttendance={markAttendance}
            currentDate={currentDate}
            canTakeOrEditAttendance={canTakeOrEditAttendance()}
          />
        ) : (
          <DesktopStudentTable
            filteredStudents={filteredStudents}
            getClassName={getClassName}
            getAttendanceStatus={getAttendanceStatus}
            markAttendance={markAttendance}
            currentDate={currentDate}
            canTakeOrEditAttendance={canTakeOrEditAttendance}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TodayAttendance;
