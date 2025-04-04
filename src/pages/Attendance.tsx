
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAttendanceData } from '@/hooks/useAttendanceData';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import AttendanceHeader from '@/components/attendance/AttendanceHeader';
import AttendanceFilters from '@/components/attendance/AttendanceFilters';
import TodayAttendance from '@/components/attendance/TodayAttendance';
import AttendanceHistory from '@/components/attendance/AttendanceHistory';

const Attendance: React.FC = () => {
  const { hasPermission } = useAuth();
  const isMobile = useIsMobile();
  
  const {
    selectedClass,
    setSelectedClass,
    selectedStudent,
    setSelectedStudent,
    searchTerm,
    setSearchTerm,
    currentDate,
    setCurrentDate,
    selectedTab,
    setSelectedTab,
    filteredClasses,
    filteredStudents,
    markAttendance,
    getAttendanceStatus,
    getFilteredAttendanceRecords,
    canEditAttendance,
    canTakeAttendance,
    getStudentsForClass,
    submitAttendance,
    attendanceSubmitted,
    mockClasses,
    mockStudents
  } = useAttendanceData();

  // If user doesn't have any classes assigned (teacher with no classes)
  if (filteredClasses.length === 0 && !hasPermission(['admin', 'accounts'])) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Attendance Management</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-700">
            You don't have any classes assigned. Please contact an administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <AttendanceHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        canTakeAttendance={canTakeAttendance}
        selectedTab={selectedTab}
      />

      <Tabs defaultValue="today" value={selectedTab} onValueChange={setSelectedTab}>
        <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex justify-between items-center'}`}>
          <TabsList className={isMobile ? 'w-full' : ''}>
            <TabsTrigger value="today" className={isMobile ? 'flex-1' : ''}>Today's Attendance</TabsTrigger>
            <TabsTrigger value="history" className={isMobile ? 'flex-1' : ''}>Attendance History</TabsTrigger>
          </TabsList>
          
          <AttendanceFilters
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredClasses={filteredClasses}
            getStudentsForClass={getStudentsForClass}
            selectedTab={selectedTab}
          />
        </div>

        <TabsContent value="today" className="space-y-4 mt-4">
          <TodayAttendance
            filteredStudents={filteredStudents}
            selectedClass={selectedClass}
            getAttendanceStatus={getAttendanceStatus}
            markAttendance={markAttendance}
            currentDate={currentDate}
            canTakeAttendance={canTakeAttendance}
            canEditAttendance={canEditAttendance}
            submitAttendance={submitAttendance}
            attendanceSubmitted={attendanceSubmitted}
            mockClasses={mockClasses}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-4">
          <AttendanceHistory
            filteredRecords={getFilteredAttendanceRecords()}
            mockStudents={mockStudents}
            mockClasses={mockClasses}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;
