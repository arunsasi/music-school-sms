
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Box, CssBaseline, styled } from '@mui/material';
import Navbar from './Navbar';

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
  
  // Don't show layout on the login page
  if (location.pathname === '/') {
    return <Box sx={{ bgcolor: 'grey.100' }}>{children}</Box>;
  }

  // Only show navbar if authenticated
  if (isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa', flexDirection: 'column' }}>
        <CssBaseline />
        <Navbar />
        
        <Main sx={{ 
          bgcolor: '#f5f7fa',
          px: { xs: 2, sm: 3, md: 4 },
          py: 3,
          flexGrow: 1
        }}>
          {children}
        </Main>
        
        <Footer>
          <p>© {new Date().getFullYear()} Music School SMS. All rights reserved.</p>
        </Footer>
      </Box>
    );
  }

  // For unauthenticated users on non-login pages
  return <Box sx={{ bgcolor: 'grey.100' }}>{children}</Box>;
};

export default Layout;
