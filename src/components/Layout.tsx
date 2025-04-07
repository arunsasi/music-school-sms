
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from './Navbar';
import AppSidebar from './AppSidebar';
import TodayScheduleModal from './schedule/TodayScheduleModal';
import { Calendar } from 'lucide-react';
import { Button } from './ui/button';

// Mock schedule data - in a real app, this would come from an API or context
const todaySchedule = [
  {
    id: '1',
    title: 'Piano Lesson - Beginner',
    time: '9:00 AM - 10:00 AM',
    teacher: 'John Smith',
    location: 'Room 101',
    status: 'completed' as const
  },
  {
    id: '2',
    title: 'Guitar Group Class',
    time: '11:30 AM - 12:30 PM',
    teacher: 'Maria Rodriguez',
    location: 'Studio B',
    status: 'ongoing' as const
  },
  {
    id: '3',
    title: 'Violin Lesson - Advanced',
    time: '2:00 PM - 3:30 PM',
    teacher: 'David Chen',
    location: 'Room 205',
    status: 'upcoming' as const
  }
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Global effect to clean up any remaining body styles on navigation
  useEffect(() => {
    document.body.removeAttribute('style');
    
    // Also clean up on unmount
    return () => {
      document.body.removeAttribute('style');
    };
  }, [location.pathname]);
  
  // Don't show layout on the login page
  if (location.pathname === '/') {
    return <div className="bg-background min-h-screen">{children}</div>;
  }

  // Only show navbar and sidebar if authenticated
  if (isAuthenticated) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        {!isMobile && (
          <div className="flex-shrink-0 bg-sidebar border-r border-sidebar-border">
            <AppSidebar />
          </div>
        )}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
            {children}
          </main>
          <footer className="py-2 px-4 md:px-6 flex justify-between items-center border-t border-border">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Music School SMS. All rights reserved.</p>
            <div className="flex items-center">
              <TodayScheduleModal 
                scheduleItems={todaySchedule}
                trigger={
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Today's Schedule
                  </Button>
                }
              />
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // For unauthenticated users on non-login pages
  return <div className="bg-background min-h-screen">{children}</div>;
};

export default Layout;
