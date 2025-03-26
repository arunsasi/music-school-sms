
import React from 'react';
import { Student } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CalendarDays } from 'lucide-react';

interface Payment {
  id: string;
  classId: string;
  className: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

// Mock payment data
const mockPayments: Payment[] = [
  { id: '1', classId: '1', className: 'Piano Beginners', amount: 300, date: '2023-06-15', status: 'Paid' },
  { id: '2', classId: '1', className: 'Piano Beginners', amount: 300, date: '2023-07-15', status: 'Pending' },
  { id: '3', classId: '3', className: 'Violin Intermediate', amount: 320, date: '2023-06-20', status: 'Paid' },
  { id: '4', classId: '3', className: 'Violin Intermediate', amount: 320, date: '2023-07-20', status: 'Overdue' },
];

interface StudentPaymentsProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentPayments: React.FC<StudentPaymentsProps> = ({ student, isOpen, onClose }) => {
  if (!student) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md w-full overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>Payment History for {student.name}</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-500">Total Paid</h4>
                <DollarSign className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-semibold text-green-600">$620</p>
            </div>
            
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-500">Pending</h4>
                <CalendarDays className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="text-2xl font-semibold text-yellow-600">$620</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Recent Transactions</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.className}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          payment.status === 'Paid' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : payment.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <SheetFooter className="mt-6">
          <Button onClick={onClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StudentPayments;
