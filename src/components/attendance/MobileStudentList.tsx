
import React from 'react';
import MobileStudentItem from './MobileStudentItem';
import { MockStudent } from '@/data/mockAttendanceData';

interface MobileStudentListProps {
  filteredStudents: MockStudent[];
  getClassName: (classId: string) => string;
  getAttendanceStatus: (studentId: string, date: string) => "Present" | "Late" | "Absent" | undefined;
  markAttendance: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark?: string) => void;
  currentDate: string;
  canTakeOrEditAttendance: () => boolean;
}

const MobileStudentList: React.FC<MobileStudentListProps> = ({
  filteredStudents,
  getClassName,
  getAttendanceStatus,
  markAttendance,
  currentDate,
  canTakeOrEditAttendance
}) => {
  return (
    <div className="divide-y">
      {filteredStudents.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          No students found
        </div>
      ) : (
        filteredStudents.map((student) => {
          const status = getAttendanceStatus(student.id, currentDate);
          
          return (
            <MobileStudentItem
              key={student.id}
              student={student}
              className={getClassName(student.classId)}
              status={status}
              markAttendance={markAttendance}
              canTakeOrEditAttendance={canTakeOrEditAttendance()}
            />
          );
        })
      )}
    </div>
  );
};

export default MobileStudentList;
