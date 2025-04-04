
import React from 'react';
import AttendanceStatusBadge from './AttendanceStatusBadge';
import AttendanceActions from './AttendanceActions';

interface MobileStudentItemProps {
  student: { id: string; name: string; classId: string };
  className: string;
  status?: 'Present' | 'Late' | 'Absent';
  markAttendance: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark?: string) => void;
  canTakeOrEditAttendance: boolean;
}

const MobileStudentItem: React.FC<MobileStudentItemProps> = ({
  student,
  className,
  status,
  markAttendance,
  canTakeOrEditAttendance
}) => {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <span className="font-medium">{student.name}</span>
          <span className="text-xs text-muted-foreground">
            {className}
          </span>
        </div>
        <AttendanceStatusBadge status={status} />
      </div>
      
      <div className="mt-2">
        <AttendanceActions
          studentId={student.id}
          classId={student.classId}
          status={status}
          markAttendance={markAttendance}
          disabled={!canTakeOrEditAttendance}
        />
      </div>
    </div>
  );
};

export default MobileStudentItem;
