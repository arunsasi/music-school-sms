
import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  FileText, 
  Filter, 
  PieChart, 
  Users 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Mock data for reports
const attendanceData = [
  { name: 'Piano Beginners', present: 85, absent: 10, late: 5 },
  { name: 'Violin Intermediate', present: 78, absent: 18, late: 4 },
  { name: 'Guitar Advanced', present: 92, absent: 5, late: 3 },
  { name: 'Vocal Training', present: 80, absent: 15, late: 5 },
  { name: 'Drums Beginners', present: 75, absent: 20, late: 5 },
];

const financialData = [
  { month: 'Jan', income: 5200, expenses: 3800, profit: 1400 },
  { month: 'Feb', income: 5500, expenses: 4000, profit: 1500 },
  { month: 'Mar', income: 6000, expenses: 4200, profit: 1800 },
  { month: 'Apr', income: 5800, expenses: 4100, profit: 1700 },
  { month: 'May', income: 6200, expenses: 4300, profit: 1900 },
  { month: 'Jun', income: 6500, expenses: 4500, profit: 2000 },
];

const studentDistributionData = [
  { name: 'Piano', value: 35, color: '#8884d8' },
  { name: 'Violin', value: 25, color: '#82ca9d' },
  { name: 'Guitar', value: 20, color: '#ffc658' },
  { name: 'Vocal', value: 15, color: '#ff8042' },
  { name: 'Drums', value: 5, color: '#0088fe' },
];

const studentGrowthData = [
  { month: 'Jan', students: 42 },
  { month: 'Feb', students: 47 },
  { month: 'Mar', students: 52 },
  { month: 'Apr', students: 58 },
  { month: 'May', students: 63 },
  { month: 'Jun', students: 68 },
];

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  // Helper functions for fake dynamic data
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const exportReport = (reportName: string) => {
    console.log(`Exporting ${reportName} report...`);
    // This would actually generate and download a report in a real application
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time range" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground">
                  +3% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$6,500</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Student Growth</CardTitle>
                <CardDescription>
                  New student enrollments over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="students" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>
                  Income vs. Expenses
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#8884d8" name="Income" />
                    <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => exportReport('overview')}>
              <Download className="mr-2 h-4 w-4" />
              Export Overview Report
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Attendance by Class</CardTitle>
                <CardDescription>
                  Present, absent, and late percentages
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#82ca9d" name="Present %" />
                    <Bar dataKey="absent" fill="#ff8042" name="Absent %" />
                    <Bar dataKey="late" fill="#ffc658" name="Late %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Attendance</CardTitle>
                <CardDescription>
                  Weekly attendance statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>Monday</div>
                    <div className="font-medium">{getRandomInt(75, 95)}%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Tuesday</div>
                    <div className="font-medium">{getRandomInt(75, 95)}%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Wednesday</div>
                    <div className="font-medium">{getRandomInt(75, 95)}%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Thursday</div>
                    <div className="font-medium">{getRandomInt(75, 95)}%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Friday</div>
                    <div className="font-medium">{getRandomInt(75, 95)}%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Saturday</div>
                    <div className="font-medium">{getRandomInt(75, 95)}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Students with Perfect Attendance</CardTitle>
                <CardDescription>
                  Students who never missed a class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>Emily Johnson</div>
                    <div className="font-medium">100%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>James Wilson</div>
                    <div className="font-medium">100%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Sophia Martinez</div>
                    <div className="font-medium">100%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Michael Chen</div>
                    <div className="font-medium">100%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Olivia Thompson</div>
                    <div className="font-medium">100%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => exportReport('attendance')}>
              <Download className="mr-2 h-4 w-4" />
              Export Attendance Report
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Financial Trends</CardTitle>
                <CardDescription>
                  Income, expenses, and profit over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#8884d8" name="Income" />
                    <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
                    <Bar dataKey="profit" fill="#ffc658" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Income Breakdown</CardTitle>
                <CardDescription>
                  Sources of revenue
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <RePieChart>
                    <Pie
                      data={[
                        { name: 'Piano Classes', value: 45, color: '#8884d8' },
                        { name: 'Violin Classes', value: 25, color: '#82ca9d' },
                        { name: 'Guitar Classes', value: 15, color: '#ffc658' },
                        { name: 'Vocal Classes', value: 10, color: '#ff8042' },
                        { name: 'Drums Classes', value: 5, color: '#0088fe' },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Piano Classes', value: 45, color: '#8884d8' },
                        { name: 'Violin Classes', value: 25, color: '#82ca9d' },
                        { name: 'Guitar Classes', value: 15, color: '#ffc658' },
                        { name: 'Vocal Classes', value: 10, color: '#ff8042' },
                        { name: 'Drums Classes', value: 5, color: '#0088fe' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>
                  Where the money goes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <RePieChart>
                    <Pie
                      data={[
                        { name: 'Teacher Salaries', value: 65, color: '#8884d8' },
                        { name: 'Facility Rent', value: 15, color: '#82ca9d' },
                        { name: 'Equipment', value: 10, color: '#ffc658' },
                        { name: 'Admin Expenses', value: 5, color: '#ff8042' },
                        { name: 'Marketing', value: 5, color: '#0088fe' },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Teacher Salaries', value: 65, color: '#8884d8' },
                        { name: 'Facility Rent', value: 15, color: '#82ca9d' },
                        { name: 'Equipment', value: 10, color: '#ffc658' },
                        { name: 'Admin Expenses', value: 5, color: '#ff8042' },
                        { name: 'Marketing', value: 5, color: '#0088fe' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => exportReport('financial')}>
              <Download className="mr-2 h-4 w-4" />
              Export Financial Report
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Distribution by Instrument</CardTitle>
                <CardDescription>
                  Breakdown of student enrollment
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={studentDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {studentDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Student Growth</CardTitle>
                <CardDescription>
                  New student enrollments over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="students" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Student Age Distribution</CardTitle>
                <CardDescription>
                  Number of students by age group
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart 
                    data={[
                      { age: 'Under 10', count: 12 },
                      { age: '10-15', count: 24 },
                      { age: '16-20', count: 18 },
                      { age: '21-30', count: 8 },
                      { age: 'Over 30', count: 6 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Number of Students" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => exportReport('students')}>
              <Download className="mr-2 h-4 w-4" />
              Export Student Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
