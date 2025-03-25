
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import { DashboardStats } from '@/types';

interface StudentsTabProps {
  stats: DashboardStats;
}

const StudentsTab: React.FC<StudentsTabProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Management</CardTitle>
        <CardDescription>
          View and manage your students
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between">
          <Button asChild>
            <Link to="/students">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Student
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/students">
              <Users className="mr-2 h-4 w-4" />
              View All Students
            </Link>
          </Button>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-muted/30 rounded-md">
              <p className="text-3xl font-bold text-music-500">{stats.totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-md">
              <p className="text-3xl font-bold text-music-500">{stats.activeStudents}</p>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-md">
              <p className="text-3xl font-bold text-music-500">12</p>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-md">
              <p className="text-3xl font-bold text-music-500">8</p>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsTab;
