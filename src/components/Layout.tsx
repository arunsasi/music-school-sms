
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from './Navbar';
import AppSidebar from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Handle screen resizing for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Don't show layout on the login page
  if (location.pathname === '/') {
    return <div className="bg-gray-2">{children}</div>;
  }

  // Only show navbar and sidebar if authenticated
  if (isAuthenticated) {
    return (
      <SidebarProvider>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Navbar />
              
              <main className="container-main h-full bg-gray-2 dark:bg-boxdark-2">
                <div className="mx-auto">{children}</div>
              </main>
              
              <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground mt-auto">
                <p>© {new Date().getFullYear()} Music School SMS. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  // For unauthenticated users on non-login pages
  return <div className="bg-gray-2">{children}</div>;
};

export default Layout;
