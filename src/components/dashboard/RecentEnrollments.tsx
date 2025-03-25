
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  subject: string;
  date: string;
  avatar: string;
}

interface RecentEnrollmentsProps {
  students: Student[];
}

const RecentEnrollments: React.FC<RecentEnrollmentsProps> = ({ students }) => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
        <CardDescription>
          New students who recently joined
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {students.map(student => (
            <div key={student.id} className="flex items-center">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="bg-music-200 text-music-700">
                  {student.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{student.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {student.subject}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enrolled on {new Date(student.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to="/students" className="flex items-center justify-center">
            View all students
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentEnrollments;
