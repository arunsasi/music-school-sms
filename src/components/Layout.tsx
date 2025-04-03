
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Box } from '@mui/material';
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
    return <Box sx={{ bgcolor: 'grey.100' }}>{children}</Box>;
  }

  // Only show navbar and sidebar if authenticated
  if (isAuthenticated) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <AppSidebar />
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
  return <Box sx={{ bgcolor: 'grey.100' }}>{children}</Box>;
};

export default Layout;
