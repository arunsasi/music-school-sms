
import { Payment, EditHistory, NewPayment } from '@/types/finance';
import { toast } from 'sonner';

// Create a new payment record
export const createPayment = (
  newPayment: NewPayment, 
  currentPayments: Payment[]
): Payment[] => {
  if (!newPayment.amount || !newPayment.description || !newPayment.date) {
    toast.error("Please fill out all required fields");
    return currentPayments;
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

  const updatedPayments = [paymentToAdd, ...currentPayments];
  toast.success("Payment added successfully");
  
  return updatedPayments;
};

// Update a payment's status
export const updatePaymentStatus = (
  payments: Payment[], 
  id: string, 
  newStatus: 'Paid' | 'Pending' | 'Cancelled'
): Payment[] => {
  const updatedPayments = payments.map(payment => 
    payment.id === id ? { ...payment, status: newStatus } : payment
  );
  
  toast.success(`Payment status updated to ${newStatus}`);
  return updatedPayments;
};

// Edit a payment's amount with history tracking
export const editPaymentAmount = (
  payments: Payment[],
  paymentId: string,
  newAmount: number,
  editedBy: string,
  note: string
): Payment[] => {
  if (!note) {
    toast.error("Please provide a reason for editing the transaction");
    return payments;
  }

  const paymentToEdit = payments.find(p => p.id === paymentId);
  
  if (!paymentToEdit) {
    toast.error("Payment not found");
    return payments;
  }

  const editHistoryEntry: EditHistory = {
    previousAmount: paymentToEdit.amount,
    newAmount: newAmount,
    editedBy: editedBy || 'Unknown user',
    editDate: new Date().toISOString(),
    note: note
  };

  const updatedPayments = payments.map(payment => 
    payment.id === paymentId 
      ? { 
          ...payment, 
          amount: newAmount,
          editHistory: [...(payment.editHistory || []), editHistoryEntry]
        } 
      : payment
  );

  toast.success("Payment amount updated successfully");
  return updatedPayments;
};
