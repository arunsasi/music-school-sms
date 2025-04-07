
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { Music } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    setIsLoading(false);
  }, [isAuthenticated, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="music-bars animate-pulse">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Left side - Content */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-8 bg-primary/5">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="music-bars">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1 className="text-3xl font-bold">Music School</h1>
          </div>
          
          <h2 className="text-4xl font-extrabold tracking-tight">
            Streamline Your <span className="text-primary">Music School</span> Management
          </h2>
          
          <p className="text-muted-foreground text-lg">
            All-in-one solution for managing students, classes, attendance, 
            and finances for your music school.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-background p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-1">Student Management</h3>
              <p className="text-sm text-muted-foreground">Track progress, attendance, and payments</p>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-1">Class Scheduling</h3>
              <p className="text-sm text-muted-foreground">Organize and manage class schedules</p>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-1">Attendance Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor student attendance easily</p>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-1">Financial Reports</h3>
              <p className="text-sm text-muted-foreground">Manage finances and generate reports</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex flex-col items-center text-center mb-8">
            <div className="music-bars mb-4">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1 className="text-2xl font-bold">Music School Management System</h1>
          </div>
          
          <div className="bg-card shadow-lg rounded-xl p-6 border border-border">
            <AuthForm />
          </div>
          
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Music School SMS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
