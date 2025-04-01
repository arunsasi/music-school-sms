import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { AttendanceRecord } from '@/types';
import { MockClass, MockStudent } from '@/data/mockAttendanceData';

interface AttendanceHistoryProps {
  filteredRecords: AttendanceRecord[];
  mockStudents: MockStudent[];
  mockClasses: MockClass[];
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
  filteredRecords,
  mockStudents,
  mockClasses
}) => {
  // Get student name by ID
  const getStudentName = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  // Get class name by ID
  const getClassName = (classId: string) => {
    const cls = mockClasses.find(c => c.id === classId);
    return cls ? cls.name : 'Unknown';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>
          View past attendance records
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
              <TableHead>Recorded By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No attendance records found
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{getStudentName(record.studentId)}</TableCell>
                  <TableCell>{getClassName(record.classId)}</TableCell>
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
                  <TableCell>
                    {record.editedBy ? (
                      <span className="text-sm text-muted-foreground">
                        Edited
                        {record.editedAt && ` on ${new Date(record.editedAt).toLocaleDateString()}`}
                      </span>
                    ) : '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
