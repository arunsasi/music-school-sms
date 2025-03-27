
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

interface DashboardHeaderProps {
  user: { name: string; role: string } | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const { hasPermission } = useAuth();
  const isTeacher = user?.role === 'teacher';
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {isTeacher 
            ? `Welcome back, ${user?.name}! Here's an overview of your classes.` 
            : `Welcome back, ${user?.name}! Here's what's happening today.`}
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
