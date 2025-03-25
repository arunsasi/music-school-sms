
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  DollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { DashboardStats } from '@/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Students
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +4.2% from last month
            </span>
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Active Students</span>
              <span>{stats.activeStudents} / {stats.totalStudents}</span>
            </div>
            <Progress 
              value={(stats.activeStudents / stats.totalStudents) * 100} 
              className="h-1.5"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Classes
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalClasses}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              +2.5% from last month
            </span>
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex flex-col space-y-0.5">
              <span className="text-muted-foreground text-xs">Today</span>
              <span className="font-semibold text-sm">8 Classes</span>
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-muted-foreground text-xs">This Week</span>
              <span className="font-semibold text-sm">24 Classes</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.totalRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500 flex items-center">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2.1% from last month
            </span>
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Expenses</span>
              <span>${stats.totalExpenses.toLocaleString()}</span>
            </div>
            <Progress 
              value={(stats.totalExpenses / stats.totalRevenue) * 100} 
              className="h-1.5"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
