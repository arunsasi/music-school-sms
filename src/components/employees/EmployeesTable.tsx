
import React from 'react';
import { Edit, Trash2, MoreHorizontal, ArrowUpDown, CheckCircle2, XCircle } from 'lucide-react';
import { Employee } from '@/types';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EmployeesTableProps {
  filteredEmployees: Employee[];
  handleSort: (column: keyof Employee) => void;
  handleEditEmployee: (employee: Employee) => void;
  handleDeleteEmployee: (id: string) => void;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({
  filteredEmployees,
  handleSort,
  handleEditEmployee,
  handleDeleteEmployee
}) => {
  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead 
              className="w-[200px] cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('role')}
            >
              <div className="flex items-center">
                Role <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead 
              className="cursor-pointer hidden md:table-cell"
              onClick={() => handleSort('joiningDate')}
            >
              <div className="flex items-center">
                Joining Date <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hidden lg:table-cell text-right"
              onClick={() => handleSort('salary')}
            >
              <div className="flex items-center justify-end">
                Salary <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No employees found. Try a different search term.
              </TableCell>
            </TableRow>
          ) : (
            filteredEmployees.map(employee => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">
                  {employee.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{employee.role}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div>{employee.mobile}</div>
                  <div className="text-muted-foreground text-sm">{employee.email}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell">
                  ${employee.salary.toLocaleString()}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    {employee.status === 'Active' ? (
                      <>
                        <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-green-500">Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-red-500">Inactive</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesTable;
