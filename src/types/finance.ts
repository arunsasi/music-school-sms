
export interface Payment {
  id: string;
  type: 'Fee' | 'Salary' | 'Expense';
  amount: number;
  date: string;
  description: string;
  paidBy?: string;
  paidTo?: string;
  status: 'Paid' | 'Pending' | 'Cancelled';
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
import type { Student, Employee } from '@/types';
export type { Student, Employee };
