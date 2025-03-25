
export interface Payment {
  id: string;
  type: 'Fee' | 'Salary' | 'Expense';
  amount: number;
  date: string;
  description: string;
  paidBy?: string;
  paidTo?: string;
  status: 'Paid' | 'Pending' | 'Cancelled';
  editHistory?: EditHistory[];
}

export interface EditHistory {
  previousAmount: number;
  newAmount: number;
  editedBy: string;
  editDate: string;
  note: string;
}

export interface NewPayment {
  type: string;
  amount: string;
  date: string;
  description: string;
  paidBy: string;
  paidTo: string;
  status: string;
}

// Re-export types from index.ts for convenience when importing from finance.ts
import type { Student, Employee, Class, Teacher } from '@/types';
export type { Student, Employee, Class, Teacher };
