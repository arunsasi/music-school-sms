
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AttendanceHeaderProps {
  currentDate: string;
  setCurrentDate: (date: string) => void;
  canTakeAttendance: () => boolean;
  selectedTab: string;
}

const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  currentDate,
  setCurrentDate,
  canTakeAttendance,
  selectedTab
}) => {
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          onClick={() => setCurrentDate(today)}
          disabled={selectedTab === "history"}
        >
          Today
        </Button>
        <div className="flex items-center space-x-2 bg-background border rounded-md px-3 py-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <Input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="border-0 p-0 shadow-none focus-visible:ring-0"
            max={canTakeAttendance() ? undefined : today}
            disabled={selectedTab === "history"}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceHeader;
