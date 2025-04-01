
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Box, CssBaseline, styled } from '@mui/material';
import Navbar from './Navbar';
import AppSidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: 'calc(100vh - 64px)', // Navbar height is 64px by default
  backgroundColor: theme.palette.grey[100],
}));

const Footer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  width: '100%',
}));

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
    return <Box sx={{ bgcolor: 'grey.100' }}>{children}</Box>;
  }

  // Only show navbar and sidebar if authenticated
  if (isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
        <CssBaseline />
        {/* Sidebar */}
        <Box
          component="nav"
          sx={{
            width: 240,
            flexShrink: 0,
            display: { xs: sidebarOpen ? 'block' : 'none', lg: 'block' },
            position: { xs: 'fixed', lg: 'static' },
            zIndex: 10,
            height: '100vh',
            transition: 'transform 300ms ease-in-out',
            transform: {
              xs: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              lg: 'translateX(0)'
            },
            boxShadow: '4px 0 10px rgba(0, 0, 0, 0.05)'
          }}
        >
          <AppSidebar />
        </Box>
        
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          backgroundColor: '#f5f7fa',
          ml: { xs: 0, lg: '0' }
        }}>
          <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          
          <Main sx={{ 
            bgcolor: '#f5f7fa',
            px: { xs: 2, sm: 3, md: 4 },
            py: 3
          }}>
            {children}
          </Main>
          
          <Footer>
            <p>© {new Date().getFullYear()} Music School SMS. All rights reserved.</p>
          </Footer>
        </Box>
      </Box>
    );
  }

  // For unauthenticated users on non-login pages
  return <Box sx={{ bgcolor: 'grey.100' }}>{children}</Box>;
};

export default Layout;
