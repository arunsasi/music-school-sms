
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-music-100 dark:bg-music-900 bg-music-pattern">
      <div className="text-center px-6 py-8 glass-card max-w-md mx-auto animate-fade-in">
        <div className="inline-block p-4 rounded-full bg-music-200 dark:bg-music-800 mb-6">
          <Music className="h-10 w-10 text-music-500" />
        </div>
        
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-xl font-medium mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-3">
          <Button asChild className="w-full bg-music-500 hover:bg-music-600">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/">Go to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
