
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { cleanupAuthState } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthErrorAlertProps {
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ error, setError }) => {
  const [isCleaningState, setIsCleaningState] = React.useState(false);

  if (!error) return null;

  // Function to clear auth state and reset forms
  const handleResetAuthState = async () => {
    setIsCleaningState(true);
    try {
      setError(null);
      cleanupAuthState();
      toast.success('Authentication state has been reset');
    } catch (error) {
      console.error('Error clearing auth state:', error);
      toast.error('Failed to reset authentication state');
    } finally {
      setIsCleaningState(false);
    }
  };

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex-1">
        {error}
      </AlertDescription>
      <Button 
        size="sm" 
        variant="outline" 
        className="ml-2 h-6"
        onClick={handleResetAuthState}
        disabled={isCleaningState}
      >
        {isCleaningState ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <RefreshCw className="h-3 w-3" />
        )}
        <span className="sr-only">Reset Auth State</span>
      </Button>
    </Alert>
  );
};

export default AuthErrorAlert;
