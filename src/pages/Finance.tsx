
import React from 'react';
import { useFinanceData } from '@/hooks/useFinanceData';
import { mockStudents, mockEmployees } from '@/data/mockData';
import FinanceSummaryCards from '@/components/finance/FinanceSummaryCards';
import FinanceFilters from '@/components/finance/FinanceFilters';
import AddTransactionDialog from '@/components/finance/AddTransactionDialog';
import EditTransactionDialog from '@/components/finance/EditTransactionDialog';
import TransactionHistory from '@/components/finance/TransactionHistory';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const Finance: React.FC = () => {
  const { hasPermission } = useAuth();
  const {
    filterType,
    setFilterType,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
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
    currentTransactions,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    handleAddPayment,
    updatePaymentStatus,
    payments,
    editingPayment,
    startEditPayment,
    handleEditPayment,
    editNote,
    setEditNote
  } = useFinanceData();

  // Access control - only admin and accounts can access
  if (!hasPermission(['admin', 'accounts'])) {
    return <Navigate to="/dashboard" replace />;
  }

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
        currentTransactions={currentTransactions}
        allPaymentsCount={payments.length}
        students={mockStudents}
        employees={mockEmployees}
        updatePaymentStatus={updatePaymentStatus}
        startEditPayment={startEditPayment}
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
      />

      {editingPayment && (
        <EditTransactionDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          payment={editingPayment}
          editNote={editNote}
          setEditNote={setEditNote}
          handleEditPayment={handleEditPayment}
        />
      )}
    </div>
  );
};

export default Finance;
