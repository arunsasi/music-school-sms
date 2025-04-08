
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
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from './ui/sidebar';

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
    icon: <CalendarDays size={20} />,
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
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <Sidebar className={cn("h-full", className)}>
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="music-bars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 className="text-lg font-bold">Music School</h1>
        </div>
      </div>

      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === item.path}
                tooltip={item.title}
              >
                <Link to={item.path} className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <div className="mt-auto p-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
