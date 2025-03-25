
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Wallet, BookOpen, Users, Calendar } from 'lucide-react';

interface FinanceSummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  pendingIncome: number;
  paidFeesCount: number;
  paidSalariesCount: number;
  paidExpensesCount: number;
  pendingFeesCount: number;
}

const FinanceSummaryCards: React.FC<FinanceSummaryCardsProps> = ({
  totalIncome,
  totalExpenses,
  pendingIncome,
  paidFeesCount,
  paidSalariesCount,
  paidExpensesCount,
  pendingFeesCount,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {paidFeesCount} fee payments received
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {paidSalariesCount} salaries + {paidExpensesCount} expenses
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Income</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{pendingIncome.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {pendingFeesCount} pending fee payments
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{(totalIncome - totalExpenses).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Current month balance
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceSummaryCards;
