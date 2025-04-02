
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Bell, 
  Sun,
  Moon,
  Menu,
  LogOut,
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
        return 'bg-destructive';
      case 'task':
        return 'bg-warning';
      case 'announcement':
        return 'bg-info';
      default:
        return 'bg-muted';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <SidebarTrigger className="mr-2" />
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
                className="text-foreground hover:text-primary"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </li>

            {/* Notifications */}
            <li>
              <Sheet open={notificationOpen} onOpenChange={setNotificationOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {hasUnreadNotifications && <span className="absolute -top-0.5 right-0 h-2 w-2 rounded-full bg-destructive"></span>}
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
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
            </li>
          </ul>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={userAvatar} alt={userDisplayName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
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
