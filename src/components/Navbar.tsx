
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  Search
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

// Mock notification data
const mockNotifications = [
  { id: '1', type: 'fee', message: 'Fee payment due for John Doe', date: '2023-10-15' },
  { id: '2', type: 'task', message: 'Prepare exam papers for Class 10', date: '2023-10-14' },
  { id: '3', type: 'announcement', message: 'School closed on October 20th', date: '2023-10-13' },
  { id: '4', type: 'fee', message: 'Fee payment due for Jane Smith', date: '2023-10-12' },
];

interface NavbarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, toggleSidebar }) => {
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
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <Menu className="h-5 w-5 text-black dark:text-white" />
          </Button>
          
          <Link to="/dashboard" className="block flex-shrink-0 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="music-bars h-10">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-xl font-semibold text-primary dark:text-white">Music School</span>
            </div>
          </Link>
        </div>

        <div className="hidden sm:block">
          <form className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-body hover:text-primary dark:text-bodydark dark:hover:fill-primary" />
            </button>

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none text-black dark:text-bodydark dark:placeholder:text-bodydark xl:w-125"
            />
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <Avatar className="h-12 w-12 rounded-full">
                  <AvatarImage src={userAvatar} alt={userDisplayName} />
                  <AvatarFallback className="bg-music-500 text-white">
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
                      <AvatarFallback className="bg-music-500 text-white">
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
