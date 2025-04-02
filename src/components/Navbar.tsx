
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  Search,
  Home,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  HelpCircle,
  User
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { UserRole } from '@/types';

// Mock notification data
const mockNotifications = [
  { id: '1', type: 'fee', message: 'Fee payment due for John Doe', date: '2023-10-15' },
  { id: '2', type: 'task', message: 'Prepare exam papers for Class 10', date: '2023-10-14' },
  { id: '3', type: 'announcement', message: 'School closed on October 20th', date: '2023-10-13' },
  { id: '4', type: 'fee', message: 'Fee payment due for Jane Smith', date: '2023-10-12' },
];

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

const Navbar: React.FC = () => {
  const { user, logout, hasPermission } = useAuth();
  const location = useLocation();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hasUnreadNotifications = true; // This would be dynamic in a real app

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    user && hasPermission(item.allowedRoles)
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

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
  const userEmail = user?.email || '';
  const userAvatar = user?.avatar || '';

  // Function to get notification badge color
  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'fee':
        return 'bg-danger';
      case 'task':
        return 'bg-warning';
      case 'announcement':
        return 'bg-info';
      default:
        return 'bg-body';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md dark:bg-boxdark dark:shadow-none">
      <div className="flex flex-wrap items-center justify-between px-4 py-2 md:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="music-bars flex-shrink-0">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="hidden text-xl font-semibold md:block">Music School</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] pt-10">
              <div className="flex flex-col space-y-1 py-2">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                      location.pathname === item.href 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {filteredNavItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link to={item.href}>
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === item.href && "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-2">
            {/* Theme Toggle */}
            <li>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className="text-black hover:text-primary dark:text-bodydark dark:hover:text-white"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </li>

            {/* Notifications */}
            <li>
              <Sheet open={notificationOpen} onOpenChange={setNotificationOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-black hover:text-primary dark:text-bodydark dark:hover:text-white relative">
                    <Bell className="h-5 w-5" />
                    {hasUnreadNotifications && <span className="absolute -top-0.5 right-0 h-2 w-2 rounded-full bg-meta-1"></span>}
                  </Button>
                </SheetTrigger>
                <SheetContent className="sheet-content-scrollable">
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {mockNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-gray dark:hover:bg-meta-4/10 transition-colors">
                        <div className={`w-2 h-2 mt-2 rounded-full ${getNotificationTypeColor(notification.type)}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black dark:text-white">{notification.message}</p>
                          <p className="text-xs text-body dark:text-bodydark mt-1">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </li>
          </ul>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <Avatar className="h-10 w-10 rounded-full">
                  <AvatarImage src={userAvatar} alt={userDisplayName} />
                  <AvatarFallback className="bg-primary text-white">
                    {getInitials(userDisplayName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-62.5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <DropdownMenuLabel className="border-b border-stroke px-4.5 py-4 dark:border-strokedark">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black dark:text-white">{userDisplayName}</span>
                  <span className="text-xs text-body dark:text-bodydark">{userEmail}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-3.5 px-4.5 py-3 text-sm font-medium duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4/10">
                <Link to="/profile" className="flex w-full items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta-2/10">
                    <Avatar className="h-full w-full rounded-full">
                      <AvatarImage src={userAvatar} alt={userDisplayName} />
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials(userDisplayName)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">
                      My Profile
                    </p>
                    <p className="text-xs text-body dark:text-bodydark">View your profile details</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3.5 px-4.5 py-3 text-sm font-medium duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4/10">
                <Link to="/settings" className="flex w-full items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta-3/10">
                    <Settings className="h-5 w-5 text-meta-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">
                      Account Settings
                    </p>
                    <p className="text-xs text-body dark:text-bodydark">Manage your account</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-b border-stroke dark:border-strokedark" />
              <DropdownMenuItem className="flex items-center gap-3.5 px-4.5 py-3 text-sm font-medium text-danger duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta-1/10">
                  <LogOut className="h-5 w-5 text-meta-1" />
                </div>
                <div className="flex grow items-center justify-between" onClick={logout}>
                  <div>
                    <p className="text-sm font-medium">Log Out</p>
                    <p className="text-xs text-body dark:text-bodydark">Sign out of your account</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
