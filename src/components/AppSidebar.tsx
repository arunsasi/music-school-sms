
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
  User,
  LogOut
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  const { user, hasPermission, logout } = useAuth();
  const location = useLocation();

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    user && hasPermission(item.allowedRoles)
  );
  
  // Extract initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get user display name, with fallbacks
  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.full_name) return user.full_name;
    return user?.email?.split('@')[0] || 'User';
  };

  const userDisplayName = getUserDisplayName();
  const userAvatar = user?.avatar || '';

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-5">
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
        
        {/* User info */}
        <div className="px-4 py-3 border-y border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={userAvatar} alt={userDisplayName} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(userDisplayName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{userDisplayName}</span>
              <span className="text-xs text-muted-foreground capitalize">{user?.role || 'User'}</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
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
                    "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-sidebar-foreground hover:bg-sidebar-muted"
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-primary" : "text-sidebar-foreground"
                    )} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
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
        <div 
          onClick={logout}
          className="flex items-center gap-2 p-4 text-destructive hover:bg-destructive/10 transition-colors cursor-pointer rounded-md mx-2 mb-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
