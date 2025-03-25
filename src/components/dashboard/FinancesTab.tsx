
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Plus } from 'lucide-react';
import { DashboardStats } from '@/types';

interface FinancesTabProps {
  stats: DashboardStats;
  recentPayments: {
    id: string;
    student?: string;
    name?: string;
    amount: number;
    date: string;
    status: string;
  }[];
}

const FinancesTab: React.FC<FinancesTabProps> = ({ stats, recentPayments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>
          Track income, expenses and financial metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between">
          <Button asChild>
            <Link to="/finance">
              <Plus className="mr-2 h-4 w-4" />
              Record Transaction
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/finance">
              <BarChart3 className="mr-2 h-4 w-4" />
              Financial Reports
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Monthly Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Revenue</span>
                <span className="font-bold text-lg">₹{stats.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Expenses</span>
                <span className="font-bold text-lg">₹{stats.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="text-sm font-medium">Net Profit</span>
                <span className="font-bold text-lg text-green-500">
                  ₹{(stats.totalRevenue - stats.totalExpenses).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Recent Payments</h3>
            <div className="space-y-3">
              {recentPayments.map(payment => (
                <div key={payment.id} className="flex justify-between items-center p-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{payment.student || payment.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                    <Badge 
                      variant={
                        payment.status === 'Paid' 
                          ? 'default' 
                          : payment.status === 'Pending' 
                            ? 'secondary' 
                            : 'destructive'
                      }
                      className="text-xs"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancesTab;
