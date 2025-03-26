
import React from 'react';
import { Class } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, DollarSign, Edit, MoreHorizontal, Presentation, Trash2, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface ClassesTableProps {
  classes: Class[];
  teacherNames: { [key: string]: string };
  onEditClass: (cls: Class) => void;
  onDeleteClass: (id: string) => void;
  onViewSchedule: (cls: Class) => void;
  onManageStudents: (cls: Class) => void;
}

const ClassesTable: React.FC<ClassesTableProps> = ({
  classes,
  teacherNames,
  onEditClass,
  onDeleteClass,
  onViewSchedule,
  onManageStudents,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-2 text-left dark:bg-meta-4">
            <TableRow>
              <TableHead className="py-4.5 px-4 font-medium">Class Name</TableHead>
              <TableHead className="py-4.5 px-4 font-medium">Subject</TableHead>
              <TableHead className="py-4.5 px-4 font-medium hidden md:table-cell">Instructor</TableHead>
              <TableHead className="py-4.5 px-4 font-medium hidden lg:table-cell">Schedule</TableHead>
              <TableHead className="py-4.5 px-4 font-medium hidden lg:table-cell">Fee</TableHead>
              <TableHead className="py-4.5 px-4 font-medium">Students</TableHead>
              <TableHead className="py-4.5 px-4 text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No classes found. Try a different search term.
                </TableCell>
              </TableRow>
            ) : (
              classes.map(cls => (
                <TableRow key={cls.id} className="border-b border-[#eee] dark:border-strokedark">
                  <TableCell className="py-5 px-4 font-medium">
                    {cls.name}
                  </TableCell>
                  <TableCell className="py-5 px-4">
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">
                      {cls.subject.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5 px-4 hidden md:table-cell">
                    {teacherNames[cls.teacherId]}
                  </TableCell>
                  <TableCell className="py-5 px-4 hidden lg:table-cell">
                    <div className="space-y-1">
                      {cls.schedule.map((sch, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                          <span>{sch.day}: {sch.startTime} - {sch.endTime}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${cls.fee}/month</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{cls.students.length}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEditClass(cls)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => onViewSchedule(cls)}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            View Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => onManageStudents(cls)}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Manage Students
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={() => onDeleteClass(cls.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClassesTable;
