
import React, { useState } from 'react';
import { useFinanceData } from '@/hooks/useFinanceData';
import { mockStudents, mockEmployees } from '@/data/mockData';
import FinanceSummaryCards from '@/components/finance/FinanceSummaryCards';
import FinanceFilters from '@/components/finance/FinanceFilters';
import AddTransactionDialog from '@/components/finance/AddTransactionDialog';
import EditTransactionDialog from '@/components/finance/EditTransactionDialog';
import TransactionHistory from '@/components/finance/TransactionHistory';
import PendingFeesReport from '@/components/finance/PendingFeesReport';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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
  
  const [activeTab, setActiveTab] = useState('transactions');

  // Access control - only admin and accounts can access
  if (!hasPermission(['admin', 'accounts'])) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex rounded-md mb-4 w-full sm:w-auto bg-white dark:bg-boxdark p-1">
          <TabsTrigger value="transactions">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="pending-fees">
            Pending Fees
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-6">
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
        </TabsContent>
        
        <TabsContent value="pending-fees">
          <PendingFeesReport />
        </TabsContent>
      </Tabs>

      <AddTransactionDialog 
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        newPayment={newPayment}
        setNewPayment={setNewPayment}
        handleAddPayment={handleAddPayment}
        students={mockStudents}
        employees={mockEmployees}
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
