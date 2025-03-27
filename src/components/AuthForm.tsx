
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Music } from 'lucide-react';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
    } catch (error) {
      // Error is already handled in the auth context
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo credentials for easy access
  const demoCredentials = [
    { role: 'Admin', email: 'admin@musicschool.com', password: 'password' },
    { role: 'Accounts', email: 'accounts@musicschool.com', password: 'password' },
    { role: 'Teacher', email: 'teacher@musicschool.com', password: 'password' },
  ];

  const setDemoUser = (email: string) => {
    setEmail(email);
    setPassword('password');
  };

  return (
    <div className="minimal-login p-7">
      <div className="flex justify-center mb-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
          <Music size={24} />
        </span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <Label htmlFor="email" className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-boxdark"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="password" className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-boxdark"
            />
          </div>
        </div>
        
        <div className="mb-5">
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-opacity-90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </form>
      
      <div className="mt-6 border-t border-stroke dark:border-strokedark pt-4">
        <p className="text-sm text-center text-muted-foreground mb-2">Demo Accounts</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {demoCredentials.map((cred) => (
            <Button
              key={cred.role}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setDemoUser(cred.email)}
            >
              {cred.role}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
