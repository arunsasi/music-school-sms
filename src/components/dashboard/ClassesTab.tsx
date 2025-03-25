
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';

const ClassesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Management</CardTitle>
        <CardDescription>
          View and manage your classes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between">
          <Button asChild>
            <Link to="/classes">
              <Plus className="mr-2 h-4 w-4" />
              Create New Class
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/classes">
              <Calendar className="mr-2 h-4 w-4" />
              View All Classes
            </Link>
          </Button>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Popular Classes</h3>
          <div className="grid gap-4">
            {['Piano Basics', 'Guitar for Beginners', 'Violin Masterclass', 'Vocals Training'].map((cls, i) => (
              <div key={i} className="flex items-center p-3 border rounded-md">
                <div className="h-10 w-10 bg-music-100 dark:bg-music-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-music-500 font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{cls}</h4>
                  <p className="text-sm text-muted-foreground">
                    {10 - i} students enrolled
                  </p>
                </div>
                <Badge variant="secondary">{90 - (i * 10)}% filled</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesTab;
