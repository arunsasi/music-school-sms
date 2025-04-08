import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  FileBarChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  MessageSquare,
  Mail
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';

// Define the sidebar items
const sidebarItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: 'Students',
    path: '/students',
    icon: <GraduationCap size={20} />,
  },
  {
    title: 'Classes',
    path: '/classes',
    icon: <Calendar size={20} />,
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: <Users size={20} />,
  },
  {
    title: 'Attendance',
    path: '/attendance',
    icon: <ClipboardCheck size={20} />,
  },
  {
    title: 'SMS Notifications',
    path: '/sms',
    icon: <MessageSquare size={20} />,
  },
  {
    title: 'Finance',
    path: '/finance',
    icon: <DollarSign size={20} />,
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <FileBarChart size={20} />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings size={20} />,
  },
];

interface AppSidebarProps {
  className?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ className }) => {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isCollapsed, setIsCollapsed] = useState(!isMobile);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  // Toggle collapse only if not on mobile
  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Collapse on mobile
  const collapseOnMobile = () => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-secondary border-r border-r-border",
        isCollapsed ? 'w-16' : 'w-60',
        className
      )}
    >
      <div className="flex items-center justify-between py-3 px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="music-bars">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1 className="text-lg font-bold">Music School</h1>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleCollapse}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          {sidebarItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              onClick={collapseOnMobile}
            >
              <Button
                variant="ghost"
                className={cn(
                  "justify-start px-4 mb-1 w-full font-normal",
                  location.pathname === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground",
                  isCollapsed && "px-2.5"
                )}
              >
                <div className="flex items-center">
                  {item.icon}
                  {!isCollapsed && <span className="ml-2">{item.title}</span>}
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AppSidebar;
