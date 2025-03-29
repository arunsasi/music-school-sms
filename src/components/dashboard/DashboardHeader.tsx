
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface DashboardHeaderProps {
  user: { name?: string; role?: string } | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const { hasPermission } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const displayName = user?.name || 'User';
  
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-title-lg font-bold text-black dark:text-white">Dashboard</h2>
        <p className="text-sm text-body dark:text-bodydark">
          {isTeacher 
            ? `Welcome back, ${displayName}! Here's an overview of your classes.` 
            : `Welcome back, ${displayName}! Here's what's happening today.`}
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" className="hidden md:flex">
          <Calendar className="mr-2 h-4 w-4" />
          Today's Schedule
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
