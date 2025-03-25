
import React from 'react';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            +{paidFeesCount} paid fees
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {paidSalariesCount} salaries, 
            {paidExpensesCount} expenses
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Income</CardTitle>
          <ArrowUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${pendingIncome.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {pendingFeesCount} pending fees
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceSummaryCards;
