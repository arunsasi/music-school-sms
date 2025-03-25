
import { useState } from 'react';
import { Payment } from '@/types/finance';
import { toast } from 'sonner';

// Mock data
const mockPayments = [
  { 
    id: '1', 
    type: 'Fee' as const, 
    amount: 120, 
    date: '2023-07-05', 
    description: 'Piano Beginners - July 2023', 
    paidBy: '1', 
    status: 'Paid' as const
  },
  { 
    id: '2', 
    type: 'Fee' as const, 
    amount: 150, 
    date: '2023-07-06', 
    description: 'Violin Intermediate - July 2023', 
    paidBy: '4', 
    status: 'Paid' as const 
  },
  { 
    id: '3', 
    type: 'Salary' as const, 
    amount: 2500, 
    date: '2023-06-30', 
    description: 'Teacher Salary - June 2023', 
    paidTo: '3', 
    status: 'Paid' as const 
  },
  { 
    id: '4', 
    type: 'Expense' as const, 
    amount: 350, 
    date: '2023-07-10', 
    description: 'New music equipment', 
    status: 'Paid' as const 
  },
  { 
    id: '5', 
    type: 'Fee' as const, 
    amount: 120, 
    date: '2023-07-15', 
    description: 'Piano Beginners - August 2023', 
    paidBy: '1', 
    status: 'Pending' as const 
  },
];

export const useFinanceData = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filterType, setFilterType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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
    const matchesType = !filterType || payment.type === filterType;
    
    const matchesSearch = searchTerm === '' || 
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

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

  return {
    payments,
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
    updatePaymentStatus
  };
};
