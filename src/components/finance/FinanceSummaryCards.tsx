
import React from 'react';
import { 
  BadgeDollarSign, 
  ArrowDown, 
  ArrowUp, 
  DollarSign, 
  Clock 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <ArrowUp className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Income</p>
              <h3 className="text-2xl font-bold">${totalIncome.toFixed(2)}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {paidFeesCount} payments received
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
              <ArrowDown className="h-6 w-6 text-red-700 dark:text-red-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <h3 className="text-2xl font-bold">${totalExpenses.toFixed(2)}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {paidSalariesCount + paidExpensesCount} payments made
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <BadgeDollarSign className="h-6 w-6 text-blue-700 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Net Balance</p>
              <h3 className="text-2xl font-bold">${(totalIncome - totalExpenses).toFixed(2)}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Current financial status
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Clock className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Income</p>
              <h3 className="text-2xl font-bold">${pendingIncome.toFixed(2)}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {pendingFeesCount} pending payments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceSummaryCards;
