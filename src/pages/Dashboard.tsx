
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
  const isTeacher = user?.role === 'teacher';
  
  // Filter data for teacher role
  const filteredClasses = isTeacher 
    ? MOCK_UPCOMING_CLASSES.filter(cls => cls.teacher === user?.name) 
    : MOCK_UPCOMING_CLASSES;
  
  // Filter tasks for teacher role
  const filteredTasks = isTeacher
    ? MOCK_TASKS.filter(task => task.assignedTo === user?.name || task.assignedTo === 'All Teachers')
    : MOCK_TASKS;
  
  return (
    <div className="space-y-6">
      <DashboardHeader user={user} />
      
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {!isTeacher && <TabsTrigger value="students">Students</TabsTrigger>}
          <TabsTrigger value="classes">Classes</TabsTrigger>
          {!isTeacher && <TabsTrigger value="finances">Finances</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards - Show limited stats for teachers */}
          {isTeacher ? (
            <StatsCards stats={{
              totalStudents: MOCK_STATS.totalStudents,
              totalClasses: filteredClasses.length,
              activeStudents: MOCK_STATS.activeStudents,
              totalEmployees: 0,
              totalRevenue: 0,
              totalExpenses: 0
            }} />
          ) : (
            <StatsCards stats={MOCK_STATS} />
          )}
          
          {/* Recent and Upcoming */}
          <div className="grid gap-4 md:grid-cols-2">
            {!isTeacher && <RecentEnrollments students={MOCK_RECENT_STUDENTS} />}
            <UpcomingClasses classes={filteredClasses} />
            {isTeacher && (
              <div className="md:col-span-1">
                <TasksReminders initialTasks={filteredTasks} />
              </div>
            )}
          </div>
          
          {/* Tasks and Reminders for non-teachers */}
          {!isTeacher && <TasksReminders initialTasks={MOCK_TASKS} />}
        </TabsContent>
        
        {!isTeacher && (
          <TabsContent value="students">
            <StudentsTab stats={MOCK_STATS} />
          </TabsContent>
        )}
        
        <TabsContent value="classes">
          <ClassesTab />
        </TabsContent>
        
        {!isTeacher && (
          <TabsContent value="finances">
            <FinancesTab 
              stats={MOCK_STATS} 
              recentPayments={MOCK_RECENT_PAYMENTS} 
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Dashboard;
