
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

// Import dashboard components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentEnrollments from '@/components/dashboard/RecentEnrollments';
import UpcomingClasses from '@/components/dashboard/UpcomingClasses';
import TasksReminders from '@/components/dashboard/TasksReminders';
import StudentsTab from '@/components/dashboard/StudentsTab';
import ClassesTab from '@/components/dashboard/ClassesTab';
import FinancesTab from '@/components/dashboard/FinancesTab';

// Import mock data
import { 
  MOCK_STATS, 
  MOCK_RECENT_STUDENTS, 
  MOCK_UPCOMING_CLASSES, 
  MOCK_RECENT_PAYMENTS,
  MOCK_TASKS
} from '@/components/dashboard/data';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <DashboardHeader user={user} />
      
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <StatsCards stats={MOCK_STATS} />
          
          {/* Recent and Upcoming */}
          <div className="grid gap-4 md:grid-cols-2">
            <RecentEnrollments students={MOCK_RECENT_STUDENTS} />
            <UpcomingClasses classes={MOCK_UPCOMING_CLASSES} />
          </div>
          
          {/* Tasks and Reminders */}
          <TasksReminders initialTasks={MOCK_TASKS} />
        </TabsContent>
        
        <TabsContent value="students">
          <StudentsTab stats={MOCK_STATS} />
        </TabsContent>
        
        <TabsContent value="classes">
          <ClassesTab />
        </TabsContent>
        
        <TabsContent value="finances">
          <FinancesTab 
            stats={MOCK_STATS} 
            recentPayments={MOCK_RECENT_PAYMENTS} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
