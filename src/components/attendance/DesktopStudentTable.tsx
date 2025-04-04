
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import AttendanceStatusBadge from './AttendanceStatusBadge';
import AttendanceActions from './AttendanceActions';
import { MockStudent } from '@/data/mockAttendanceData';

interface DesktopStudentTableProps {
  filteredStudents: MockStudent[];
  getClassName: (classId: string) => string;
  getAttendanceStatus: (studentId: string, date: string) => "Present" | "Late" | "Absent" | undefined;
  markAttendance: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark?: string) => void;
  currentDate: string;
  canTakeOrEditAttendance: () => boolean;
}

const DesktopStudentTable: React.FC<DesktopStudentTableProps> = ({
  filteredStudents,
  getClassName,
  getAttendanceStatus,
  markAttendance,
  currentDate,
  canTakeOrEditAttendance
}) => {
  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50 text-left">
          <TableRow>
            <TableHead className="py-4 px-4 font-medium">Student</TableHead>
            <TableHead className="py-4 px-4 font-medium">Class</TableHead>
            <TableHead className="py-4 px-4 font-medium">Status</TableHead>
            <TableHead className="py-4 px-4 font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No students found
              </TableCell>
            </TableRow>
          ) : (
            filteredStudents.map((student) => {
              const status = getAttendanceStatus(student.id, currentDate);
              return (
                <TableRow key={student.id}>
                  <TableCell className="py-4 px-4 font-medium">
                    {student.name}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    {getClassName(student.classId)}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <AttendanceStatusBadge status={status} />
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <AttendanceActions
                      studentId={student.id}
                      classId={student.classId}
                      status={status}
                      markAttendance={markAttendance}
                      disabled={!canTakeOrEditAttendance()}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DesktopStudentTable;
