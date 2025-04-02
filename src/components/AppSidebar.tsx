
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
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
  User
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

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
  {
    label: 'Profile',
    icon: User,
    href: '/profile',
    allowedRoles: ['admin', 'accounts', 'teacher'] as UserRole[],
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
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="music-bars flex-shrink-0">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Music School</h1>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                  tooltip={item.label}
                >
                  <Link to={item.href} className={cn(
                    "flex items-center gap-3",
                    isActive && "text-primary"
                  )}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="flex items-center gap-2 p-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <HelpCircle className="h-5 w-5" />
          <span>Help & Support</span>
        </div>
        <div className="p-4 text-xs text-muted-foreground text-center">
          Version 1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
