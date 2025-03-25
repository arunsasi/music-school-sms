
import React from 'react';
import { Payment } from '@/types/finance';
import { Student, Employee } from '@/types';
import { BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TransactionTable from './TransactionTable';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface TransactionHistoryProps {
  filteredPayments: Payment[];
  currentTransactions: Payment[];
  allPaymentsCount: number;
  students: Student[];
  employees: Employee[];
  updatePaymentStatus: (id: string, newStatus: 'Paid' | 'Pending' | 'Cancelled') => void;
  startEditPayment: (payment: Payment) => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  filteredPayments,
  currentTransactions,
  allPaymentsCount,
  students,
  employees,
  updatePaymentStatus,
  startEditPayment,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
}) => {
  return (
    <div className="bg-card rounded-md border shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <p className="text-sm text-muted-foreground">
            Showing {currentTransactions.length} of {filteredPayments.length} transactions (latest one month)
          </p>
        </div>
        <Button asChild>
          <Link to="/reports">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Reports
          </Link>
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <TransactionTable 
          payments={currentTransactions}
          students={students}
          employees={employees}
          updatePaymentStatus={updatePaymentStatus}
          startEditPayment={startEditPayment}
        />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={prevPage} disabled={currentPage === 1} />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext onClick={nextPage} disabled={currentPage === totalPages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
