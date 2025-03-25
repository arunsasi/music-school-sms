
import { useState } from 'react';
import { Payment, EditHistory } from '@/types/finance';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

// Mock data
const mockPayments = [
  { 
    id: '1', 
    type: 'Fee' as const, 
    amount: 12000, 
    date: '2023-07-05', 
    description: 'Piano Beginners - July 2023', 
    paidBy: '1', 
    status: 'Paid' as const
  },
  { 
    id: '2', 
    type: 'Fee' as const, 
    amount: 15000, 
    date: '2023-07-06', 
    description: 'Violin Intermediate - July 2023', 
    paidBy: '4', 
    status: 'Paid' as const 
  },
  { 
    id: '3', 
    type: 'Salary' as const, 
    amount: 25000, 
    date: '2023-06-30', 
    description: 'Teacher Salary - June 2023', 
    paidTo: '3', 
    status: 'Paid' as const 
  },
  { 
    id: '4', 
    type: 'Expense' as const, 
    amount: 3500, 
    date: '2023-07-10', 
    description: 'New music equipment', 
    status: 'Paid' as const 
  },
  { 
    id: '5', 
    type: 'Fee' as const, 
    amount: 12000, 
    date: '2023-07-15', 
    description: 'Piano Beginners - August 2023', 
    paidBy: '1', 
    status: 'Pending' as const 
  },
];

// Function to get only current month transactions
const getCurrentMonthTransactions = (payments: Payment[]) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
  return payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    return paymentDate >= firstDayOfMonth;
  });
};

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

  // Calculate summary statistics
  const totalIncome = payments
    .filter(p => p.type === 'Fee' && p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalExpenses = payments
    .filter(p => (p.type === 'Salary' || p.type === 'Expense') && p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const pendingIncome = payments
    .filter(p => p.type === 'Fee' && p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);

  // Count transactions by type and status
  const paidFeesCount = payments.filter(p => p.type === 'Fee' && p.status === 'Paid').length;
  const paidSalariesCount = payments.filter(p => p.type === 'Salary' && p.status === 'Paid').length;
  const paidExpensesCount = payments.filter(p => p.type === 'Expense' && p.status === 'Paid').length;
  const pendingFeesCount = payments.filter(p => p.type === 'Fee' && p.status === 'Pending').length;

  // Filter payments based on type and search term
  const filteredPayments = payments.filter(payment => {
    const matchesType = filterType === 'all' || payment.type === filterType;
    
    const matchesSearch = searchTerm === '' || 
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  // Get current month transactions for history display with pagination
  const currentMonthTransactions = getCurrentMonthTransactions(filteredPayments);
  const totalPages = Math.ceil(currentMonthTransactions.length / itemsPerPage);
  
  // Get current page of transactions
  const currentTransactions = currentMonthTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddPayment = () => {
    if (!newPayment.amount || !newPayment.description || !newPayment.date) {
      toast.error("Please fill out all required fields");
      return;
    }

    // Create base payment object
    let paymentToAdd: any = {
      id: `${Date.now()}`,
      type: newPayment.type as 'Fee' | 'Salary' | 'Expense',
      amount: Number(newPayment.amount),
      date: newPayment.date,
      description: newPayment.description,
      status: newPayment.status as 'Paid' | 'Pending' | 'Cancelled'
    };

    // Add appropriate payer/payee based on payment type
    if (newPayment.type === 'Fee' && newPayment.paidBy) {
      paymentToAdd.paidBy = newPayment.paidBy;
    } else if (newPayment.type === 'Salary' && newPayment.paidTo) {
      paymentToAdd.paidTo = newPayment.paidTo;
    }

    setPayments([paymentToAdd, ...payments]);
    
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
    toast.success("Payment added successfully");
  };

  const updatePaymentStatus = (id: string, newStatus: 'Paid' | 'Pending' | 'Cancelled') => {
    const updatedPayments = payments.map(payment => 
      payment.id === id ? { ...payment, status: newStatus } : payment
    );
    setPayments(updatedPayments);
    toast.success(`Payment status updated to ${newStatus}`);
  };

  // Functions for editing transactions
  const startEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setIsEditDialogOpen(true);
  };

  const handleEditPayment = (newAmount: number) => {
    if (!editingPayment || !editNote) {
      toast.error("Please provide a reason for editing the transaction");
      return;
    }

    const editHistoryEntry: EditHistory = {
      previousAmount: editingPayment.amount,
      newAmount: newAmount,
      editedBy: user?.name || 'Unknown user',
      editDate: new Date().toISOString(),
      note: editNote
    };

    const updatedPayments = payments.map(payment => 
      payment.id === editingPayment.id 
        ? { 
            ...payment, 
            amount: newAmount,
            editHistory: [...(payment.editHistory || []), editHistoryEntry]
          } 
        : payment
    );

    setPayments(updatedPayments);
    setIsEditDialogOpen(false);
    setEditingPayment(null);
    setEditNote("");
    toast.success("Payment amount updated successfully");
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
