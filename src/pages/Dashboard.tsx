
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  Clock, 
  BarChart3,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Plus,
  Check,
  MoreVertical, // Add the missing MoreVertical icon import
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { DashboardStats } from '@/types';

// Mock dashboard stats
const MOCK_STATS: DashboardStats = {
  totalStudents: 156,
  totalEmployees: 14,
  totalClasses: 35,
  activeStudents: 142,
  totalRevenue: 24650,
  totalExpenses: 18240,
};

// Mock recent students
const MOCK_RECENT_STUDENTS = [
  { id: '1', name: 'Emma Thompson', subject: 'Piano', date: '2023-06-01', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Liam Davis', subject: 'Guitar', date: '2023-06-03', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Sophia Martinez', subject: 'Violin', date: '2023-06-05', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Noah Wilson', subject: 'Drums', date: '2023-06-07', avatar: 'https://i.pravatar.cc/150?img=4' },
];

// Mock upcoming classes
const MOCK_UPCOMING_CLASSES = [
  { id: '1', name: 'Beginner Piano', teacher: 'John Smith', time: '09:00 - 10:00', day: 'Monday', students: 8 },
  { id: '2', name: 'Intermediate Guitar', teacher: 'Sarah Johnson', time: '11:00 - 12:30', day: 'Tuesday', students: 6 },
  { id: '3', name: 'Advanced Violin', teacher: 'Michael Lee', time: '14:00 - 15:30', day: 'Wednesday', students: 4 },
  { id: '4', name: 'Group Vocals', teacher: 'Lisa Chen', time: '16:00 - 17:00', day: 'Thursday', students: 12 },
];

// Mock recent payments
const MOCK_RECENT_PAYMENTS = [
  { id: '1', student: 'Emma Thompson', amount: 300, date: '2023-06-01', status: 'Paid' },
  { id: '2', name: 'John Davis', amount: 450, date: '2023-06-02', status: 'Pending' },
  { id: '3', name: 'Robert Johnson', amount: 380, date: '2023-06-03', status: 'Paid' },
  { id: '4', name: 'Sarah Williams', amount: 300, date: '2023-06-04', status: 'Cancelled' },
];

// Mock tasks
const MOCK_TASKS = [
  { id: '1', title: 'Call student parents', completed: false, dueDate: '2023-06-15' },
  { id: '2', title: 'Prepare for recital', completed: false, dueDate: '2023-06-20' },
  { id: '3', title: 'Order new equipment', completed: true, dueDate: '2023-06-10' },
  { id: '4', title: 'Review curriculum', completed: false, dueDate: '2023-06-25' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [tasks, setTasks] = useState(MOCK_TASKS);
  
  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here's what's happening today.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Clock className="mr-2 h-4 w-4" />
            Activity Log
          </Button>
          <Button className="bg-music-500 hover:bg-music-600">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{MOCK_STATS.totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +4.2% from last month
                  </span>
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Active Students</span>
                    <span>{MOCK_STATS.activeStudents} / {MOCK_STATS.totalStudents}</span>
                  </div>
                  <Progress 
                    value={(MOCK_STATS.activeStudents / MOCK_STATS.totalStudents) * 100} 
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
                <div className="text-2xl font-bold">{MOCK_STATS.totalClasses}</div>
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
                  ${MOCK_STATS.totalRevenue.toLocaleString()}
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
                    <span>${MOCK_STATS.totalExpenses.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(MOCK_STATS.totalExpenses / MOCK_STATS.totalRevenue) * 100} 
                    className="h-1.5"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent and Upcoming */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Recent Enrollments</CardTitle>
                <CardDescription>
                  New students who recently joined
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_RECENT_STUDENTS.map(student => (
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
            
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>
                  Classes scheduled for the next few days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_UPCOMING_CLASSES.map(cls => (
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
          </div>
          
          {/* Tasks and Reminders */}
          <Card className="dashboard-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tasks & Reminders</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-3 border rounded-md transition-colors ${
                      task.completed ? 'bg-muted/50 border-muted' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-6 w-6 mr-2 rounded-full border ${
                          task.completed 
                            ? 'bg-music-500 border-music-500 text-white' 
                            : 'border-input bg-background'
                        }`}
                        onClick={() => toggleTaskComplete(task.id)}
                      >
                        {task.completed && <Check className="h-3 w-3" />}
                      </Button>
                      <div className={`${task.completed ? 'text-muted-foreground line-through' : ''}`}>
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
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
                    <p className="text-3xl font-bold text-music-500">{MOCK_STATS.totalStudents}</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-md">
                    <p className="text-3xl font-bold text-music-500">{MOCK_STATS.activeStudents}</p>
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
        </TabsContent>
        
        <TabsContent value="classes">
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
        </TabsContent>
        
        <TabsContent value="finances">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>
                Track income, expenses and financial metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between">
                <Button asChild>
                  <Link to="/finance">
                    <Plus className="mr-2 h-4 w-4" />
                    Record Transaction
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/finance">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Financial Reports
                  </Link>
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Monthly Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Revenue</span>
                      <span className="font-bold text-lg">${MOCK_STATS.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Expenses</span>
                      <span className="font-bold text-lg">${MOCK_STATS.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between items-center">
                      <span className="text-sm font-medium">Net Profit</span>
                      <span className="font-bold text-lg text-green-500">
                        ${(MOCK_STATS.totalRevenue - MOCK_STATS.totalExpenses).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Recent Payments</h3>
                  <div className="space-y-3">
                    {MOCK_RECENT_PAYMENTS.map(payment => (
                      <div key={payment.id} className="flex justify-between items-center p-2 border-b last:border-0">
                        <div>
                          <p className="font-medium text-sm">{payment.student || payment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${payment.amount}</p>
                          <Badge 
                            variant={
                              payment.status === 'Paid' 
                                ? 'default' 
                                : payment.status === 'Pending' 
                                  ? 'secondary' 
                                  : 'destructive'
                            }
                            className="text-xs"
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
