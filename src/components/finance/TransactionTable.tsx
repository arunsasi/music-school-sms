
import React from 'react';
import { UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Payment {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  paidBy?: string;
  paidTo?: string;
  status: string;
}

interface Student {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
}

interface TransactionTableProps {
  payments: Payment[];
  students: Student[];
  employees: Employee[];
  updatePaymentStatus: (id: string, newStatus: 'Paid' | 'Pending' | 'Cancelled') => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  payments,
  students,
  employees,
  updatePaymentStatus,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Person</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No transactions found
            </TableCell>
          </TableRow>
        ) : (
          payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={
                    payment.type === 'Fee' 
                      ? 'border-green-500 text-green-500' 
                      : payment.type === 'Salary'
                      ? 'border-blue-500 text-blue-500'
                      : 'border-orange-500 text-orange-500'
                  }
                >
                  {payment.type}
                </Badge>
              </TableCell>
              <TableCell className="font-medium max-w-[200px] truncate">
                {payment.description}
              </TableCell>
              <TableCell>
                {payment.paidBy && (
                  <div className="flex items-center">
                    <UserCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                    {students.find(s => s.id === payment.paidBy)?.name || 'Unknown'}
                  </div>
                )}
                {payment.paidTo && (
                  <div className="flex items-center">
                    <UserCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                    {employees.find(e => e.id === payment.paidTo)?.name || 'Unknown'}
                  </div>
                )}
                {!payment.paidBy && !payment.paidTo && '-'}
              </TableCell>
              <TableCell className={payment.type === 'Fee' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {payment.type === 'Fee' ? '+' : '-'}${payment.amount.toFixed(2)}
              </TableCell>
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
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Select 
                    value={payment.status} 
                    onValueChange={(value: 'Paid' | 'Pending' | 'Cancelled') => updatePaymentStatus(payment.id, value)}
                  >
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
