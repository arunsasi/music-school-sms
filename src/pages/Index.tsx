
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/context/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-music-100 dark:bg-music-900 bg-music-pattern">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center md:text-left order-2 md:order-1 animate-fade-in">
            <div className="inline-block">
              <div className="music-bars mb-2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-music-500">Music School</span> Student Management System
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              A comprehensive platform to manage students, classes, and the administration of your music school.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="glass-card p-4 px-6 flex items-center">
                <div className="mr-3 bg-music-200 dark:bg-music-800 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-music-600 dark:text-music-400">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">Students</div>
                  <div className="text-xs text-muted-foreground">Easy enrollment</div>
                </div>
              </div>
              
              <div className="glass-card p-4 px-6 flex items-center">
                <div className="mr-3 bg-music-200 dark:bg-music-800 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-music-600 dark:text-music-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">Classes</div>
                  <div className="text-xs text-muted-foreground">Smart scheduling</div>
                </div>
              </div>
              
              <div className="glass-card p-4 px-6 flex items-center">
                <div className="mr-3 bg-music-200 dark:bg-music-800 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-music-600 dark:text-music-400">
                    <path d="M12 1v22"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">Finance</div>
                  <div className="text-xs text-muted-foreground">Payment tracking</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 animate-fade-in animation-delay-100">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
