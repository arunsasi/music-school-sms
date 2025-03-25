
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

export interface Student {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
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
