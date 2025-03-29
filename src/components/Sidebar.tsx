
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react';

// Define the navigation items with access control
const navItems = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    allowedRoles: ['admin', 'accounts', 'teacher'] as UserRole[],
  },
  {
    label: 'Employees',
    icon: Users,
    href: '/employees',
    allowedRoles: ['admin', 'accounts'] as UserRole[],
  },
  {
    label: 'Students',
    icon: GraduationCap,
    href: '/students',
    allowedRoles: ['admin', 'accounts', 'teacher'] as UserRole[],
  },
  {
    label: 'Classes',
    icon: Calendar,
    href: '/classes',
    allowedRoles: ['admin', 'accounts', 'teacher'] as UserRole[],
  },
  {
    label: 'Attendance',
    icon: Clock,
    href: '/attendance',
    allowedRoles: ['admin', 'accounts', 'teacher'] as UserRole[],
  },
  {
    label: 'Finance',
    icon: DollarSign,
    href: '/finance',
    allowedRoles: ['admin', 'accounts'] as UserRole[],
  },
  {
    label: 'Reports',
    icon: BarChart3,
    href: '/reports',
    allowedRoles: ['admin', 'accounts'] as UserRole[],
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    allowedRoles: ['admin'] as UserRole[],
  },
];

const AppSidebar: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const location = useLocation();

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    user && hasPermission(item.allowedRoles)
  );

  return (
    <Sidebar className="dark:bg-boxdark flex h-screen w-72.5 flex-col overflow-y-auto duration-300 ease-linear lg:static lg:translate-x-0">
      <SidebarHeader className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <div className="flex items-center gap-2">
          <div className="music-bars flex-shrink-0">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-bodydark">Music School</h1>
            <p className="text-xs font-medium text-bodydark/70">Management System</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {filteredNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.href}
                  className={cn(
                    "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark duration-300 ease-in-out hover:bg-graydark",
                    location.pathname === item.href
                      ? "bg-graydark text-white"
                      : "text-bodydark"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 mt-auto">
        <div className="flex items-center gap-2 text-bodydark/80 hover:text-white transition-colors cursor-pointer">
          <HelpCircle className="h-5 w-5" />
          <span>Help & Support</span>
        </div>
        <div className="mt-4 text-xs text-bodydark/50 text-center">
          Version 1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
