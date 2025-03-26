
import React from 'react';
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
  
  // Don't show layout on the login page
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  // Only show navbar and sidebar if authenticated
  if (isAuthenticated) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-1 container-main animate-fade-in w-full">
              {children}
            </main>
            <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Music School SMS. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  // For unauthenticated users on non-login pages
  return <>{children}</>;
};

export default Layout;
