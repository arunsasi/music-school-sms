
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface AttendanceActionsProps {
  studentId: string;
  classId: string;
  status?: 'Present' | 'Late' | 'Absent';
  markAttendance: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark?: string) => void;
  disabled: boolean;
}

const AttendanceActions: React.FC<AttendanceActionsProps> = ({
  studentId,
  classId,
  status,
  markAttendance,
  disabled
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className={status === 'Present' ? 'bg-green-100' : ''}
        onClick={() => markAttendance(studentId, classId, 'Present')}
        disabled={disabled}
      >
        <CheckCircle2 className="h-4 w-4 mr-1" />
        Present
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className={status === 'Late' ? 'bg-yellow-100' : ''}
        onClick={() => markAttendance(studentId, classId, 'Late', 'Arrived late')}
        disabled={disabled}
      >
        <Clock className="h-4 w-4 mr-1" />
        Late
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className={status === 'Absent' ? 'bg-red-100' : ''}
        onClick={() => markAttendance(studentId, classId, 'Absent')}
        disabled={disabled}
      >
        <XCircle className="h-4 w-4 mr-1" />
        Absent
      </Button>
    </div>
  );
};

export default AttendanceActions;
