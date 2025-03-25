
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface DashboardHeaderProps {
  user: { name: string } | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's what's happening today.
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" className="hidden md:flex">
          <Clock className="mr-2 h-4 w-4" />
          Activity Log
        </Button>
        <Button className="bg-music-500 hover:bg-music-600">
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
