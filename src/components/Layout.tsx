
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from './Navbar';
import AppSidebar from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Don't show layout on the login page
  if (location.pathname === '/') {
    return <div className="bg-background min-h-screen">{children}</div>;
  }

  // Only show navbar and sidebar if authenticated
  if (isAuthenticated) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <div className="flex-shrink-0 bg-sidebar border-r border-sidebar-border">
          <AppSidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
            {children}
          </main>
          <footer className="py-4 px-6 text-center border-t border-border">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Music School SMS. All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
  }

  // For unauthenticated users on non-login pages
  return <div className="bg-background min-h-screen">{children}</div>;
};

export default Layout;
