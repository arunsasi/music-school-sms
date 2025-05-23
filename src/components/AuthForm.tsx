
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import AuthErrorAlert from '@/components/auth/AuthErrorAlert';

const AuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [authError, setAuthError] = useState<string | null>(null);

  const handleTabChange = (value: string) => {
    setAuthError(null);
    setActiveTab(value as 'login' | 'signup');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to Music School</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to access your account or create a new one
        </p>
      </div>

      <AuthErrorAlert error={authError} setError={setAuthError} />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setAuthError={setAuthError}
          />
        </TabsContent>

        <TabsContent value="signup">
          <SignupForm 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setAuthError={setAuthError}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
