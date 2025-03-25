
import React from 'react';
import { Payment } from '@/types/finance';
import { Student, Employee } from '@/types';
import TransactionTable from './TransactionTable';

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
    <div className="bg-card rounded-md border shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <p className="text-sm text-muted-foreground">
          Showing {filteredPayments.length} of {allPaymentsCount} transactions
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <TransactionTable 
          payments={filteredPayments}
          students={students}
          employees={employees}
          updatePaymentStatus={updatePaymentStatus}
        />
      </div>
    </div>
  );
};

export default TransactionHistory;
