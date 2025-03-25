
import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  XCircle 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data for the attendance system
const mockClasses = [
  { id: '1', name: 'Piano Beginners', weekday: 'Monday', time: '4:00 PM - 5:00 PM' },
  { id: '2', name: 'Violin Intermediate', weekday: 'Tuesday', time: '5:00 PM - 6:30 PM' },
  { id: '3', name: 'Guitar Advanced', weekday: 'Wednesday', time: '6:00 PM - 7:30 PM' },
  { id: '4', name: 'Vocal Training', weekday: 'Thursday', time: '4:30 PM - 6:00 PM' },
  { id: '5', name: 'Drums Beginners', weekday: 'Friday', time: '5:00 PM - 6:00 PM' },
];

const mockStudents = [
  { id: '1', name: 'Emily Johnson', class: 'Piano Beginners' },
  { id: '2', name: 'Michael Chen', class: 'Piano Beginners' },
  { id: '3', name: 'Sarah Williams', class: 'Piano Beginners' },
  { id: '4', name: 'David Rodriguez', class: 'Violin Intermediate' },
  { id: '5', name: 'Olivia Thompson', class: 'Violin Intermediate' },
  { id: '6', name: 'James Wilson', class: 'Guitar Advanced' },
  { id: '7', name: 'Sophia Martinez', class: 'Guitar Advanced' },
  { id: '8', name: 'Ethan Brown', class: 'Vocal Training' },
  { id: '9', name: 'Ava Garcia', class: 'Drums Beginners' },
  { id: '10', name: 'Noah Smith', class: 'Drums Beginners' },
];

// Sample attendance records
const initialAttendanceRecords = [
  { id: '1', studentId: '1', date: '2023-06-12', status: 'Present', remark: '' },
  { id: '2', studentId: '2', date: '2023-06-12', status: 'Late', remark: 'Arrived 15 mins late' },
  { id: '3', studentId: '3', date: '2023-06-12', status: 'Absent', remark: 'Sick leave' },
  { id: '4', studentId: '4', date: '2023-06-13', status: 'Present', remark: '' },
  { id: '5', studentId: '5', date: '2023-06-13', status: 'Present', remark: '' },
];

const Attendance: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("today");
  const [selectedClass, setSelectedClass] = useState("all"); // Changed from empty string to "all"
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState(initialAttendanceRecords);

  // Filter students based on selected class and search term
  const filteredStudents = mockStudents.filter(student => {
    return (
      (selectedClass === "all" || student.class === selectedClass) && // Updated condition to check for "all"
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Mark attendance function
  const markAttendance = (studentId: string, status: 'Present' | 'Late' | 'Absent', remark: string = '') => {
    // Check if there's an existing record for this student on this date
    const existingRecordIndex = attendanceRecords.findIndex(
      record => record.studentId === studentId && record.date === currentDate
    );

    if (existingRecordIndex !== -1) {
      // Update existing record
      const updatedRecords = [...attendanceRecords];
      updatedRecords[existingRecordIndex] = {
        ...updatedRecords[existingRecordIndex],
        status,
        remark
      };
      setAttendanceRecords(updatedRecords);
    } else {
      // Create new record
      const newRecord = {
        id: `${Date.now()}`,
        studentId,
        date: currentDate,
        status,
        remark
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }

    // Show toast notification
    toast.success(`Marked ${status} for ${mockStudents.find(s => s.id === studentId)?.name}`);
  };

  // Get attendance status for a student on the current date
  const getAttendanceStatus = (studentId: string) => {
    const record = attendanceRecords.find(
      r => r.studentId === studentId && r.date === currentDate
    );
    return record ? record.status : undefined;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setCurrentDate(new Date().toISOString().split('T')[0])}>
            Today
          </Button>
          <div className="flex items-center space-x-2 bg-background border rounded-md px-3 py-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <Input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="border-0 p-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="today" onValueChange={setSelectedTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="today">Today's Attendance</TabsTrigger>
            <TabsTrigger value="history">Attendance History</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[180px]">
                <span className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by class" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {mockClasses.map(c => (
                  <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance for {new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
              <CardDescription>
                Click on the appropriate status to mark attendance for each student
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No students found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => {
                      const status = getAttendanceStatus(student.id);
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>
                            {status && (
                              <Badge
                                className={
                                  status === 'Present' 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                    : status === 'Late'
                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                    : 'bg-red-100 text-red-800 hover:bg-red-100'
                                }
                              >
                                {status}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {attendanceRecords.find(r => r.studentId === student.id && r.date === currentDate)?.remark || '-'}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className={status === 'Present' ? 'bg-green-100' : ''}
                                onClick={() => markAttendance(student.id, 'Present')}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Present
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className={status === 'Late' ? 'bg-yellow-100' : ''}
                                onClick={() => markAttendance(student.id, 'Late', 'Arrived late')}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Late
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className={status === 'Absent' ? 'bg-red-100' : ''}
                                onClick={() => markAttendance(student.id, 'Absent')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Absent
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>
                View past attendance records for all students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No attendance records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    attendanceRecords
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((record) => {
                        const student = mockStudents.find(s => s.id === record.studentId);
                        if (!student) return null;
                        
                        return (
                          <TableRow key={record.id}>
                            <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  record.status === 'Present' 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                    : record.status === 'Late'
                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                    : 'bg-red-100 text-red-800 hover:bg-red-100'
                                }
                              >
                                {record.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{record.remark || '-'}</TableCell>
                          </TableRow>
                        );
                      })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;
