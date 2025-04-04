
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AttendanceStatusBadge from './AttendanceStatusBadge';
import AttendanceActions from './AttendanceActions';

interface MobileStudentItemProps {
  student: { id: string; name: string; classId: string };
  className: string;
  status?: 'Present' | 'Late' | 'Absent';
  isExpanded: boolean;
  toggleExpansion: () => void;
  markAttendance: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark?: string) => void;
  canTakeOrEditAttendance: boolean;
}

const MobileStudentItem: React.FC<MobileStudentItemProps> = ({
  student,
  className,
  status,
  isExpanded,
  toggleExpansion,
  markAttendance,
  canTakeOrEditAttendance
}) => {
  return (
    <div className="px-4 py-3">
      <div 
        className="flex justify-between items-center"
        onClick={toggleExpansion}
      >
        <div className="flex flex-col">
          <span className="font-medium">{student.name}</span>
          <span className="text-xs text-muted-foreground">
            {className}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AttendanceStatusBadge status={status} />
          <ChevronDown 
            className={`h-4 w-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
          />
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          <AttendanceActions
            studentId={student.id}
            classId={student.classId}
            status={status}
            markAttendance={markAttendance}
            disabled={!canTakeOrEditAttendance}
          />
        </div>
      )}
    </div>
  );
};

export default MobileStudentItem;
