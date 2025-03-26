
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Download, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  ArrowUpDown,
  Calendar,
  Phone,
  Mail,
  Eye,
  Presentation,
  CreditCard,
  Filter
} from 'lucide-react';
import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface StudentsListProps {
  students: Student[];
  filteredStudents: Student[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSort: (column: keyof Student) => void;
  handleEditStudent: (student: Student) => void;
  handleDeleteStudent: (id: string) => void;
  viewDetails: (student: Student) => void;
  manageClasses: (student: Student) => void;
  viewPayments: (student: Student) => void;
}

const StudentsList: React.FC<StudentsListProps> = ({
  students,
  filteredStudents,
  searchTerm, 
  setSearchTerm,
  handleSort,
  handleEditStudent,
  handleDeleteStudent,
  viewDetails,
  manageClasses,
  viewPayments
}) => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-stroke bg-transparent focus-visible:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto flex items-center gap-2.5">
              <Filter className="h-5 w-5" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSearchTerm('')} className="cursor-pointer">
              All Students
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSort('name')} className="cursor-pointer">
              Sort by Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('age')} className="cursor-pointer">
              Sort by Age
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('enrollmentDate')} className="cursor-pointer">
              Sort by Enrollment Date
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSearchTerm('active')} className="cursor-pointer">
              Active Students
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm('inactive')} className="cursor-pointer">
              Inactive Students
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-2 text-left dark:bg-meta-4">
              <TableRow>
                <TableHead 
                  className="py-4.5 px-4 font-medium cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="py-4.5 px-4 font-medium cursor-pointer hidden md:table-cell"
                  onClick={() => handleSort('age')}
                >
                  <div className="flex items-center">
                    Age <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="py-4.5 px-4 font-medium hidden md:table-cell">
                  Guardian
                </TableHead>
                <TableHead className="py-4.5 px-4 font-medium hidden lg:table-cell">
                  Contact
                </TableHead>
                <TableHead 
                  className="py-4.5 px-4 font-medium cursor-pointer hidden lg:table-cell"
                  onClick={() => handleSort('enrollmentDate')}
                >
                  <div className="flex items-center">
                    Enrolled <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="py-4.5 px-4 font-medium">Status</TableHead>
                <TableHead className="py-4.5 px-4 text-right font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No students found. Try a different search term.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map(student => (
                  <TableRow key={student.id} className="border-b border-[#eee] dark:border-strokedark">
                    <TableCell className="py-5 px-4 font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="py-5 px-4 hidden md:table-cell">
                      {student.age}
                    </TableCell>
                    <TableCell className="py-5 px-4 hidden md:table-cell">
                      {student.guardian}
                    </TableCell>
                    <TableCell className="py-5 px-4 hidden lg:table-cell">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{student.mobile}</span>
                        </div>
                        {student.email && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm text-muted-foreground">{student.email}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(student.enrollmentDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <Badge 
                        variant={student.status === 'Active' ? 'default' : 'secondary'}
                        className={student.status === 'Active' ? 'bg-green-500' : ''}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditStudent(student)}
                          title="Edit Student"
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
                              onClick={() => viewDetails(student)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => manageClasses(student)}
                            >
                              <Presentation className="mr-2 h-4 w-4" />
                              Manage Classes
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => viewPayments(student)}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Payment History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive cursor-pointer"
                              onClick={() => handleDeleteStudent(student.id)}
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
    </>
  );
};

export default StudentsList;
