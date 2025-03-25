
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Music4 } from 'lucide-react';

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
    <div className="glass-card w-full max-w-md mx-auto overflow-hidden">
      <div className="flex flex-col items-center justify-center p-8">
        <div className="music-bars mb-2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-1">Music School SMS</h2>
        <p className="text-muted-foreground text-sm mb-6 text-center">
          Sign in to access your account
        </p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-music-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-music-500 hover:bg-music-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
      
      <div className="bg-muted/50 p-4 border-t">
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
