
import { Payment } from '@/types/finance';

// Mock payment data for development
export const mockPayments: Payment[] = [
  { 
    id: '1', 
    type: 'Fee', 
    amount: 12000, 
    date: '2023-07-05', 
    description: 'Piano Beginners - July 2023', 
    paidBy: '1', 
    status: 'Paid'
  },
  { 
    id: '2', 
    type: 'Fee', 
    amount: 15000, 
    date: '2023-07-06', 
    description: 'Violin Intermediate - July 2023', 
    paidBy: '4', 
    status: 'Paid' 
  },
  { 
    id: '3', 
    type: 'Salary', 
    amount: 25000, 
    date: '2023-06-30', 
    description: 'Teacher Salary - June 2023', 
    paidTo: '3', 
    status: 'Paid' 
  },
  { 
    id: '4', 
    type: 'Expense', 
    amount: 3500, 
    date: '2023-07-10', 
    description: 'New music equipment', 
    status: 'Paid' 
  },
  { 
    id: '5', 
    type: 'Fee', 
    amount: 12000, 
    date: '2023-07-15', 
    description: 'Piano Beginners - August 2023', 
    paidBy: '1', 
    status: 'Pending' 
  },
];
