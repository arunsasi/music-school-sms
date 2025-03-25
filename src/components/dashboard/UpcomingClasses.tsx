
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Class {
  id: string;
  name: string;
  teacher: string;
  time: string;
  day: string;
  students: number;
}

interface UpcomingClassesProps {
  classes: Class[];
}

const UpcomingClasses: React.FC<UpcomingClassesProps> = ({ classes }) => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
        <CardDescription>
          Classes scheduled for the next few days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map(cls => (
            <div key={cls.id} className="border rounded-md p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{cls.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {cls.teacher}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {cls.day}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{cls.time}</span>
                <span>
                  <Users className="inline h-3 w-3 mr-1" />
                  {cls.students} students
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to="/classes" className="flex items-center justify-center">
            View all classes
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingClasses;
