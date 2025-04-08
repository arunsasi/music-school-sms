
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Finance from './pages/Finance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import SmsNotifications from './pages/SmsNotifications';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="music-school-theme">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/sms" element={<SmsNotifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
