
import React, { useState, useEffect } from 'react';
import { Student, AttendanceRecord, SmsMessage } from '@/types';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Send, Phone, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useStudents } from '@/hooks/useStudents';

// Mock attendance records for today
const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '1', // Emma Thompson
    classId: '101',
    date: new Date().toISOString().split('T')[0],
    status: 'Absent',
    remark: 'No notice provided',
    takenBy: 'teacher1'
  },
  {
    id: '3',
    studentId: '3', // Sophia Martinez
    classId: '102',
    date: new Date().toISOString().split('T')[0],
    status: 'Absent',
    remark: 'Family emergency',
    takenBy: 'teacher2'
  },
  {
    id: '7',
    studentId: '7', // Ava Garcia
    classId: '103',
    date: new Date().toISOString().split('T')[0],
    status: 'Late',
    remark: 'Arrived 15 minutes late',
    takenBy: 'teacher1'
  }
];

const SmsNotifications: React.FC = () => {
  const { students } = useStudents();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentMessages, setSentMessages] = useState<SmsMessage[]>([]);
  
  // Students who are absent or late today and have opted for SMS
  const eligibleStudents = students.filter(student => {
    // Find if student has absence record for today
    const studentRecord = mockAttendance.find(record => record.studentId === student.id);
    const isAbsentOrLate = studentRecord && (studentRecord.status === 'Absent' || studentRecord.status === 'Late');
    const hasSmsEnabled = student.smsNotifications || student.secondarySmsNotifications;
    
    return isAbsentOrLate && hasSmsEnabled;
  });

  const handleSelectAll = () => {
    if (selectedStudents.length === eligibleStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(eligibleStudents.map(student => student.id));
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSendSms = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message to send');
      return;
    }

    if (selectedStudents.length === 0) {
      toast.error('Please select at least one student');
      return;
    }

    setIsSending(true);

    try {
      // In a real application, this would make an API call to send SMS
      // For now, we'll simulate a successful SMS send after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newMessages: SmsMessage[] = selectedStudents.map(studentId => {
        const student = students.find(s => s.id === studentId)!;
        const phoneNumber = student.smsNotifications ? student.mobile : student.secondaryMobile!;
        
        return {
          id: `msg-${Date.now()}-${studentId}`,
          studentId,
          message,
          phoneNumber,
          status: 'sent',
          createdAt: new Date().toISOString(),
          sentAt: new Date().toISOString()
        };
      });
      
      setSentMessages(prev => [...newMessages, ...prev]);
      setSelectedStudents([]);
      setMessage('');
      toast.success(`SMS sent to ${newMessages.length} students`);
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast.error('Failed to send SMS. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">SMS Notifications</h1>
        <p className="text-muted-foreground">Send notifications to absent/late students</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students to notify */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Students Absent/Late Today</CardTitle>
            <CardDescription>
              Only showing students who have opted for SMS notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {eligibleStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No students absent or late today who have opted for SMS notifications
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center">
                  <Checkbox 
                    id="select-all" 
                    checked={selectedStudents.length === eligibleStudents.length && eligibleStudents.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="ml-2 text-sm font-medium cursor-pointer">
                    Select All
                  </label>
                  <Badge className="ml-auto">
                    {selectedStudents.length} selected
                  </Badge>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>SMS Number</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eligibleStudents.map(student => {
                      const attendance = mockAttendance.find(a => a.studentId === student.id);
                      const primarySelected = student.smsNotifications;
                      const phoneToUse = primarySelected ? student.mobile : student.secondaryMobile;
                      
                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={() => toggleStudentSelection(student.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <Badge variant={attendance?.status === 'Absent' ? 'destructive' : 'default'}>
                              {attendance?.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {phoneToUse}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>
        
        {/* SMS Composer */}
        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>
              Write your notification message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message Content
              </label>
              <textarea 
                id="message" 
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full border rounded-md p-2 bg-background border-input focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-32"
              />
              <p className="text-xs text-muted-foreground text-right">
                {message.length} characters
              </p>
            </div>
            
            <Button 
              onClick={handleSendSms} 
              disabled={isSending || selectedStudents.length === 0 || !message.trim()} 
              className="w-full"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send to {selectedStudents.length} Students
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        {/* Message History */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Message History</CardTitle>
            <CardDescription>
              Recent SMS notifications sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sentMessages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No messages sent yet
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentMessages.map(msg => {
                    const student = students.find(s => s.id === msg.studentId);
                    
                    return (
                      <TableRow key={msg.id}>
                        <TableCell className="whitespace-nowrap">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {student?.name || 'Unknown'}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{msg.phoneNumber}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{msg.message}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={msg.status === 'sent' ? 'outline' : 'destructive'} className="flex items-center w-fit">
                            {msg.status === 'sent' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {msg.status === 'sent' ? 'Sent' : 'Failed'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmsNotifications;
