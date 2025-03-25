
import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockClasses = [
  { id: '1', name: 'Piano Beginners', present: 85, absent: 10, late: 5 },
  { id: '2', name: 'Violin Intermediate', present: 78, absent: 18, late: 4 },
  { id: '3', name: 'Guitar Advanced', present: 92, absent: 5, late: 3 },
  { id: '4', name: 'Vocal Training', present: 80, absent: 15, late: 5 },
  { id: '5', name: 'Drums Beginners', present: 75, absent: 20, late: 5 },
];

const mockStudents = [
  { id: '1', name: 'Emily Johnson', present: 95, absent: 3, late: 2, class: 'Piano Beginners' },
  { id: '2', name: 'Michael Chen', present: 88, absent: 7, late: 5, class: 'Piano Beginners' },
  { id: '3', name: 'Sarah Williams', present: 92, absent: 5, late: 3, class: 'Piano Beginners' },
  { id: '4', name: 'David Rodriguez', present: 85, absent: 10, late: 5, class: 'Violin Intermediate' },
  { id: '5', name: 'Olivia Thompson', present: 98, absent: 1, late: 1, class: 'Violin Intermediate' },
];

// For individual student attendance records
const mockAttendanceDetails = [
  { date: '2023-07-01', status: 'Present', class: 'Piano Beginners' },
  { date: '2023-07-03', status: 'Present', class: 'Piano Beginners' },
  { date: '2023-07-06', status: 'Late', class: 'Piano Beginners' },
  { date: '2023-07-08', status: 'Present', class: 'Piano Beginners' },
  { date: '2023-07-10', status: 'Absent', class: 'Piano Beginners' },
  { date: '2023-07-13', status: 'Present', class: 'Piano Beginners' },
  { date: '2023-07-15', status: 'Present', class: 'Piano Beginners' },
  { date: '2023-07-17', status: 'Present', class: 'Piano Beginners' },
  { date: '2023-07-20', status: 'Present', class: 'Piano Beginners' },
  { date: '2023-07-22', status: 'Present', class: 'Piano Beginners' },
];

const AttendanceReportTab: React.FC = () => {
  const [reportType, setReportType] = useState("class");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [dateRange, setDateRange] = useState("month");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(1)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [showDetails, setShowDetails] = useState(false);

  // Filter classes based on selection
  const filteredClasses = selectedClass === "all" 
    ? mockClasses 
    : mockClasses.filter(c => c.id === selectedClass);

  // Filter students based on class selection
  const filteredStudents = selectedClass === "all"
    ? mockStudents
    : mockStudents.filter(s => s.class === mockClasses.find(c => c.id === selectedClass)?.name);

  const exportReport = () => {
    console.log(`Exporting ${reportType} attendance report...`);
    // In a real app, this would generate a CSV/PDF file
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 p-4 bg-card rounded-md border">
        <div className="space-y-2">
          <Label htmlFor="report-type">Report Type</Label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger id="report-type" className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class">Class Attendance</SelectItem>
              <SelectItem value="student">Student Attendance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="class-select">Class</Label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger id="class-select" className="w-[180px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {mockClasses.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {reportType === "student" && (
          <div className="space-y-2">
            <Label htmlFor="student-select">Student</Label>
            <Select 
              value={selectedStudent} 
              onValueChange={setSelectedStudent}
              disabled={filteredStudents.length === 0}
            >
              <SelectTrigger id="student-select" className="w-[180px]">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {filteredStudents.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="date-range">Date Range</Label>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger id="date-range" className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {dateRange === "custom" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[180px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[180px]"
              />
            </div>
          </>
        )}

        <div className="flex items-end">
          <Button onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Class Attendance Report */}
      {reportType === "class" && (
        <Card>
          <CardHeader>
            <CardTitle>Class Attendance Summary</CardTitle>
            <CardDescription>
              Attendance statistics by class for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredClasses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present %" fill="#10b981" />
                  <Bar dataKey="late" name="Late %" fill="#f59e0b" />
                  <Bar dataKey="absent" name="Absent %" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Present %</TableHead>
                  <TableHead>Late %</TableHead>
                  <TableHead>Absent %</TableHead>
                  <TableHead>Overall Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.present}%</TableCell>
                    <TableCell>{cls.late}%</TableCell>
                    <TableCell>{cls.absent}%</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          cls.present > 90 
                            ? 'bg-green-100 text-green-800' 
                            : cls.present > 80 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {cls.present + cls.late}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Student Attendance Report */}
      {reportType === "student" && selectedStudent && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>
                {mockStudents.find(s => s.id === selectedStudent)?.name} - Attendance Report
              </CardTitle>
              <CardDescription>
                Detailed attendance statistics for the selected student
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[mockStudents.find(s => s.id === selectedStudent)].filter(Boolean)}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present %" fill="#10b981" />
                  <Bar dataKey="late" name="Late %" fill="#f59e0b" />
                  <Bar dataKey="absent" name="Absent %" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Present</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {mockStudents.find(s => s.id === selectedStudent)?.present}%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Late</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {mockStudents.find(s => s.id === selectedStudent)?.late}%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Absent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {mockStudents.find(s => s.id === selectedStudent)?.absent}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {showDetails && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendanceDetails.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            record.status === 'Present' 
                              ? 'bg-green-100 text-green-800' 
                              : record.status === 'Late' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {reportType === "student" && !selectedStudent && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-700">
            Please select a student to view their attendance report.
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceReportTab;
