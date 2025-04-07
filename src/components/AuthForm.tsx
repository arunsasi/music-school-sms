
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AtSign, Lock, LogIn, UserPlus } from 'lucide-react';

const AuthForm: React.FC = () => {
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');
  
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
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
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would connect to your signup API
    // For now, we'll just show a toast message
    toast.info('Signup functionality will be implemented with Supabase integration');
    
    // Reset form
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupPasswordConfirm('');
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
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">Sign in to access your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </span>
            )}
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">
              Demo Accounts
            </span>
          </div>
        </div>
        
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
      </TabsContent>
      
      <TabsContent value="signup" className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-muted-foreground text-sm">Sign up to get started</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-password-confirm">Confirm Password</Label>
            <Input
              id="signup-password-confirm"
              type="password"
              placeholder="Confirm your password"
              value={signupPasswordConfirm}
              onChange={(e) => setSignupPasswordConfirm(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
          >
            <span className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </span>
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
