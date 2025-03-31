
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from './Navbar';
import AppSidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
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
  
  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Don't show layout on the login page
  if (location.pathname === '/') {
    return <div className="bg-gray-2">{children}</div>;
  }

  // Only show navbar and sidebar if authenticated
  if (isAuthenticated) {
    return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className={`sidebar fixed left-0 top-0 z-10 h-screen w-72.5 flex-shrink-0 bg-sidebar-background text-sidebar-foreground lg:static ${sidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'} lg:translate-x-0 transition-transform duration-300 ease-linear`}>
            <AppSidebar />
          </div>
          
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden min-h-screen">
            <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            
            <main className="container-main flex-grow bg-gray-2 dark:bg-boxdark-2 min-h-[calc(100vh-130px)]">
              <div className="mx-auto">{children}</div>
            </main>
            
            <footer className="py-4 px-6 border-t bg-white text-center text-sm text-body mt-auto w-full">
              <p>© {new Date().getFullYear()} Music School SMS. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    );
  }

  // For unauthenticated users on non-login pages
  return <div className="bg-gray-2">{children}</div>;
};

export default Layout;
