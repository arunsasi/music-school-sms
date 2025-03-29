
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-2 dark:bg-boxdark">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-[500px] p-4 sm:p-12.5 xl:p-17.5">
        <div className="mb-8 flex justify-center">
          <div className="music-bars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
          Music School Management System
        </h2>
        <AuthForm />
        <div className="mt-6 text-center">
          <p className="text-sm text-body dark:text-bodydark">
            © {new Date().getFullYear()} Music School SMS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
