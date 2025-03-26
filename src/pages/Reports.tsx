
import React, { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import AttendanceReportTab from '@/components/reports/AttendanceReportTab';
import FinanceReportTab from '@/components/reports/FinanceReportTab';
import OverviewReportTab from '@/components/reports/OverviewReportTab';
import StudentsReportTab from '@/components/reports/StudentsReportTab';

const Reports: React.FC = () => {
  const { hasPermission } = useAuth();
  const [timeRange, setTimeRange] = useState("month");
  
  // Function to handle report export
  const exportReport = (reportType: string) => {
    console.log(`Exporting ${reportType} report...`);
    // Implementation for exporting reports would go here
  };
  
  // Access control - only admin and accounts can access finance reports
  if (!hasPermission(['admin', 'accounts', 'teacher'])) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time range" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="financial" disabled={!hasPermission(['admin', 'accounts'])}>Financial</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewReportTab exportReport={exportReport} />
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <AttendanceReportTab />
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          {hasPermission(['admin', 'accounts']) ? (
            <FinanceReportTab />
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-yellow-700">
                You don't have permission to view financial reports.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="students">
          <StudentsReportTab exportReport={exportReport} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
