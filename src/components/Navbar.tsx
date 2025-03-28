
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  X
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
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

// Mock notification data
const mockNotifications = [
  { id: '1', type: 'fee', message: 'Fee payment due for John Doe', date: '2023-10-15' },
  { id: '2', type: 'task', message: 'Prepare exam papers for Class 10', date: '2023-10-14' },
  { id: '3', type: 'announcement', message: 'School closed on October 20th', date: '2023-10-13' },
  { id: '4', type: 'fee', message: 'Fee payment due for Jane Smith', date: '2023-10-12' },
];

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const hasUnreadNotifications = true; // This would be dynamic in a real app

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
        return 'bg-red-500';
      case 'task':
        return 'bg-yellow-500';
      case 'announcement':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <header className="navbar py-3 px-4 border-b bg-background sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <SidebarTrigger className="mr-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
          
          <div className="music-bars hidden md:flex mr-2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <Link to="/dashboard" className="flex items-center text-xl font-semibold">
            <span className="text-music-500 font-bold">Music School</span> <span className="ml-1 text-muted-foreground">SMS</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">          
          <Sheet open={notificationOpen} onOpenChange={setNotificationOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="h-5 w-5" />
                {hasUnreadNotifications && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-music-500"></span>}
              </Button>
            </SheetTrigger>
            <SheetContent className="sheet-content-scrollable">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {mockNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-muted transition-colors">
                    <div className={`w-2 h-2 mt-2 rounded-full ${getNotificationTypeColor(notification.type)}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userDisplayName} />
                  <AvatarFallback className="bg-music-200 text-music-700">
                    {getInitials(userDisplayName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">{userDisplayName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="flex w-full items-center">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex w-full items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
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
