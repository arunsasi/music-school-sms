
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CardTitle, CardDescription, CardHeader } from '@/components/ui/card';

interface AttendanceCardHeaderProps {
  selectedClass: string;
  getClassName: (classId: string) => string;
  currentDate: string;
  today: string;
  attendanceSubmitted: boolean;
  canTakeOrEditAttendance: () => boolean;
  markAllPresent: () => void;
  handleSubmitAttendance: () => void;
  isMobile: boolean;
}

const AttendanceCardHeader: React.FC<AttendanceCardHeaderProps> = ({
  selectedClass,
  getClassName,
  currentDate,
  today,
  attendanceSubmitted,
  canTakeOrEditAttendance,
  markAllPresent,
  handleSubmitAttendance,
  isMobile
}) => {
  return (
    <CardHeader className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row items-center justify-between'} border-b px-6 py-4`}>
      <div>
        <CardTitle className="text-xl font-semibold">
          {selectedClass === "all" 
            ? isMobile ? "Mark Attendance" : "Mark Attendance for All Classes"
            : isMobile ? `${getClassName(selectedClass)}` : `Mark Attendance for ${getClassName(selectedClass)}`}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {currentDate === today 
            ? "Today's attendance" 
            : isMobile 
              ? new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
              : `Attendance for ${new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
        </CardDescription>
      </div>
      
      {selectedClass !== "all" && !attendanceSubmitted && canTakeOrEditAttendance() && (
        <div className={`flex gap-2 ${isMobile ? 'mt-2 justify-between' : ''}`}>
          <Button 
            variant="outline"
            onClick={markAllPresent}
            className={isMobile ? 'flex-1' : ''}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Mark All Present
          </Button>
          <Button 
            onClick={handleSubmitAttendance}
            className={`bg-primary hover:bg-primary/90 ${isMobile ? 'flex-1' : ''}`}
          >
            {isMobile ? 'Submit' : 'Submit Attendance'}
          </Button>
        </div>
      )}

      {attendanceSubmitted && selectedClass !== "all" && (
        <Badge className="bg-green-100 text-green-800 self-start">
          Attendance Submitted
        </Badge>
      )}
    </CardHeader>
  );
};

export default AttendanceCardHeader;
