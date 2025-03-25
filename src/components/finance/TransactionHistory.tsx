
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionTable from './TransactionTable';

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

interface TransactionHistoryProps {
  filteredPayments: Payment[];
  allPaymentsCount: number;
  students: Student[];
  employees: Employee[];
  updatePaymentStatus: (id: string, newStatus: 'Paid' | 'Pending' | 'Cancelled') => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  filteredPayments,
  allPaymentsCount,
  students,
  employees,
  updatePaymentStatus,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          View all financial transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionTable 
          payments={filteredPayments}
          students={students}
          employees={employees}
          updatePaymentStatus={updatePaymentStatus}
        />
      </CardContent>
      <CardFooter className="justify-between border-t px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredPayments.length}</strong> of <strong>{allPaymentsCount}</strong> transactions
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransactionHistory;
