
import { Payment } from '@/types/finance';

// Calculate total income from paid fees
export const calculateTotalIncome = (payments: Payment[]): number => {
  return payments
    .filter(p => p.type === 'Fee' && p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
};

// Calculate total expenses from paid salaries and expenses
export const calculateTotalExpenses = (payments: Payment[]): number => {
  return payments
    .filter(p => (p.type === 'Salary' || p.type === 'Expense') && p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
};

// Calculate pending income from pending fees
export const calculatePendingIncome = (payments: Payment[]): number => {
  return payments
    .filter(p => p.type === 'Fee' && p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);
};

// Count transactions by type and status
export const countTransactionsByTypeAndStatus = (payments: Payment[]) => {
  return {
    paidFeesCount: payments.filter(p => p.type === 'Fee' && p.status === 'Paid').length,
    paidSalariesCount: payments.filter(p => p.type === 'Salary' && p.status === 'Paid').length,
    paidExpensesCount: payments.filter(p => p.type === 'Expense' && p.status === 'Paid').length,
    pendingFeesCount: payments.filter(p => p.type === 'Fee' && p.status === 'Pending').length,
  };
};

// Get current month transactions
export const getCurrentMonthTransactions = (payments: Payment[]): Payment[] => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
  return payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    return paymentDate >= firstDayOfMonth;
  });
};

// Filter payments based on type and search term
export const filterPayments = (payments: Payment[], filterType: string, searchTerm: string): Payment[] => {
  return payments.filter(payment => {
    const matchesType = filterType === 'all' || payment.type === filterType;
    
    const matchesSearch = searchTerm === '' || 
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });
};
