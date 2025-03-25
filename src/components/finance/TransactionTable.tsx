
import React from 'react';
import { Payment } from '@/types/finance';
import { Student, Employee } from '@/types';
import { Edit, Info, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/context/AuthContext';

interface TransactionTableProps {
  payments: Payment[];
  students: Student[];
  employees: Employee[];
  updatePaymentStatus: (id: string, newStatus: 'Paid' | 'Pending' | 'Cancelled') => void;
  startEditPayment: (payment: Payment) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  payments,
  students,
  employees,
  updatePaymentStatus,
  startEditPayment,
}) => {
  const { user, hasPermission } = useAuth();
  const canEditTransactions = hasPermission(['admin', 'accounts']);

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
                {payment.type === 'Fee' ? '+' : '-'}₹{payment.amount.toLocaleString()}
                
                {payment.editHistory && payment.editHistory.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                        <Info className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Edit History</h4>
                        {payment.editHistory.map((edit, index) => (
                          <div key={index} className="border-t pt-2 text-xs">
                            <p><strong>Changed by:</strong> {edit.editedBy}</p>
                            <p><strong>Date:</strong> {new Date(edit.editDate).toLocaleString()}</p>
                            <p><strong>From:</strong> ₹{edit.previousAmount.toLocaleString()}</p>
                            <p><strong>To:</strong> ₹{edit.newAmount.toLocaleString()}</p>
                            <p><strong>Reason:</strong> {edit.note}</p>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
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
                  
                  {canEditTransactions && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => startEditPayment(payment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Transaction</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
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
