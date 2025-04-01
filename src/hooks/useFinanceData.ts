
import { useState } from 'react';
import { Payment } from '@/types/finance';
import { useAuth } from '@/context/AuthContext';
import { mockPayments } from '@/data/mockPayments';
import { 
  calculateTotalIncome,
  calculateTotalExpenses,
  calculatePendingIncome,
  countTransactionsByTypeAndStatus,
  getCurrentMonthTransactions,
  filterPayments
} from '@/utils/financeCalculations';
import {
  createPayment,
  updatePaymentStatus as updateStatus,
  editPaymentAmount
} from '@/utils/paymentOperations';

export const useFinanceData = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [editNote, setEditNote] = useState("");
  const itemsPerPage = 5;
  
  const [newPayment, setNewPayment] = useState({
    type: 'Fee',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    paidBy: '',
    paidTo: '',
    status: 'Paid'
  });

  // Calculate summary statistics using utility functions
  const totalIncome = calculateTotalIncome(payments);
  const totalExpenses = calculateTotalExpenses(payments);
  const pendingIncome = calculatePendingIncome(payments);

  // Get transaction counts
  const { 
    paidFeesCount,
    paidSalariesCount,
    paidExpensesCount,
    pendingFeesCount 
  } = countTransactionsByTypeAndStatus(payments);

  // Filter payments based on type and search term
  const filteredPayments = filterPayments(payments, filterType, searchTerm);

  // Get current month transactions for history display with pagination
  const currentMonthTransactions = getCurrentMonthTransactions(filteredPayments);
  const totalPages = Math.ceil(currentMonthTransactions.length / itemsPerPage);
  
  // Get current page of transactions
  const currentTransactions = currentMonthTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddPayment = () => {
    const updatedPayments = createPayment(newPayment, payments);
    setPayments(updatedPayments);
    
    setNewPayment({
      type: 'Fee',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paidBy: '',
      paidTo: '',
      status: 'Paid'
    });
    
    setIsAddDialogOpen(false);
  };

  const updatePaymentStatus = (id: string, newStatus: 'Paid' | 'Pending' | 'Cancelled') => {
    const updatedPayments = updateStatus(payments, id, newStatus);
    setPayments(updatedPayments);
  };

  // Functions for editing transactions
  const startEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setIsEditDialogOpen(true);
  };

  const handleEditPayment = (newAmount: number) => {
    if (!editingPayment) return;
    
    const updatedPayments = editPaymentAmount(
      payments,
      editingPayment.id,
      newAmount,
      user?.name || 'Unknown user',
      editNote
    );
    
    setPayments(updatedPayments);
    setIsEditDialogOpen(false);
    setEditingPayment(null);
    setEditNote("");
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    payments,
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
    editingPayment,
    setEditingPayment,
    startEditPayment,
    handleEditPayment,
    editNote,
    setEditNote
  };
};
