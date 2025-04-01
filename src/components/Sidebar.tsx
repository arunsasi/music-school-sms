
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
    <div className="flex h-screen flex-col overflow-y-auto bg-sidebar-background border-r border-sidebar-border shadow-lg" style={{ backgroundColor: '#1A1F2C' }}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 border-b border-sidebar-border">
        <Link to="/dashboard">
          <div className="flex items-center gap-2">
            <div className="music-bars flex-shrink-0">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Music School</h1>
              <p className="text-xs font-medium text-white/70">Management System</p>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Sidebar Menu */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-medium text-white/60">MENU</h3>
            <ul className="mb-6 flex flex-col gap-2">
              {filteredNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-md px-4 py-3 font-medium transition-all duration-200 ease-in-out",
                        isActive 
                          ? "bg-music-500/20 text-white" 
                          : "text-white/70 hover:bg-sidebar-accent hover:text-white"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-music-500" : "text-white/70")} />
                      <span className="btn-text-visible">{item.label}</span>
                      {isActive && (
                        <span className="absolute right-0 block h-full w-1 bg-music-500 rounded-l-md"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
      
      {/* Sidebar Footer */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-md p-2 hover:bg-sidebar-accent">
          <HelpCircle className="h-5 w-5" />
          <span className="btn-text-visible">Help & Support</span>
        </div>
        <div className="mt-4 text-xs text-white/50 text-center">
          Version 1.0.0
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
