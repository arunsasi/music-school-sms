
import React from 'react';
import { useFinanceData } from '@/hooks/useFinanceData';
import { mockStudents, mockEmployees } from '@/data/mockData';
import FinanceSummaryCards from '@/components/finance/FinanceSummaryCards';
import FinanceFilters from '@/components/finance/FinanceFilters';
import AddTransactionDialog from '@/components/finance/AddTransactionDialog';
import TransactionHistory from '@/components/finance/TransactionHistory';

const Finance: React.FC = () => {
  const {
    filterType,
    setFilterType,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    newPayment,
    setNewPayment,
    totalIncome,
    totalExpenses,
    pendingIncome,
    paidFeesCount,
    paidSalariesCount,
    paidExpensesCount,
    pendingFeesCount,
    filteredPayments,
    handleAddPayment,
    updatePaymentStatus,
    payments
  } = useFinanceData();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
        <AddTransactionDialog 
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
          newPayment={newPayment}
          setNewPayment={setNewPayment}
          handleAddPayment={handleAddPayment}
          students={mockStudents}
          employees={mockEmployees}
        />
      </div>

      <FinanceSummaryCards 
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        pendingIncome={pendingIncome}
        paidFeesCount={paidFeesCount}
        paidSalariesCount={paidSalariesCount}
        paidExpensesCount={paidExpensesCount}
        pendingFeesCount={pendingFeesCount}
      />

      <FinanceFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <TransactionHistory 
        filteredPayments={filteredPayments}
        allPaymentsCount={payments.length}
        students={mockStudents}
        employees={mockEmployees}
        updatePaymentStatus={updatePaymentStatus}
      />
    </div>
  );
};

export default Finance;
