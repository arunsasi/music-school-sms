
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Bell, 
  Sun,
  Moon,
  Menu,
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
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
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

// Mock notification data
const mockNotifications = [
  { id: '1', type: 'fee', message: 'Fee payment due for John Doe', date: '2023-10-15', read: false },
  { id: '2', type: 'task', message: 'Prepare exam papers for Class 10', date: '2023-10-14', read: false },
  { id: '3', type: 'announcement', message: 'School closed on October 20th', date: '2023-10-13', read: true },
  { id: '4', type: 'fee', message: 'Fee payment due for Jane Smith', date: '2023-10-12', read: true },
];

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

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
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'task':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'announcement':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Get the current page title
  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (path === '') return 'Home';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const pageTitle = getPageTitle();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {!isMobile && <SidebarTrigger className="mr-2" />}
          
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] p-0 max-w-[300px]">
                <AppSidebar />
              </SheetContent>
            </Sheet>
          )}
          
          {/* Page title - show only on mobile */}
          {isMobile && (
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
          )}
          
          {/* Breadcrumbs - hide on mobile */}
          {!isMobile && (
            <nav className="flex">
              <ol className="flex items-center space-x-1 text-sm">
                <li>
                  <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </li>
                <li className="font-medium text-foreground">{pageTitle}</li>
              </ol>
            </nav>
          )}
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="text-foreground hover:text-primary"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <Sheet open={notificationOpen} onOpenChange={setNotificationOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    {unreadNotifications}
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="h-[100dvh] w-[90vw] sm:max-w-[420px] overflow-y-auto">
              <SheetHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <SheetTitle>Notifications</SheetTitle>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Mark all as read
                  </Button>
                </div>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {mockNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="font-medium">No notifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  mockNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border",
                        "transition-colors hover:bg-muted",
                        notification.read ? "opacity-70" : ""
                      )}
                    >
                      <div className="mt-1.5">
                        <span className={cn(
                          "flex h-2 w-2 rounded-full",
                          notification.read ? "bg-muted-foreground" : "bg-destructive"
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <Badge variant="outline" className={cn(
                            "ml-2 text-[10px] py-0 h-5",
                            getNotificationTypeColor(notification.type)
                          )}>
                            {notification.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                <Button variant="outline" size="sm" className="w-full">
                  View all notifications
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={userAvatar} alt={userDisplayName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(userDisplayName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userDisplayName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex cursor-pointer items-center text-destructive focus:text-destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
