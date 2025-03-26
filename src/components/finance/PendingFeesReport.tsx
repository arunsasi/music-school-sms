
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, DollarSign, Send } from 'lucide-react';
import { pendingFeesData } from '@/components/reports/reportsMockData';
import { toast } from 'sonner';

const PendingFeesReport: React.FC = () => {
  const totalPendingAmount = pendingFeesData.reduce((sum, fee) => sum + fee.amount, 0);
  const overdueAmount = pendingFeesData
    .filter(fee => fee.status === 'Overdue')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const sendReminder = (studentName: string) => {
    toast.success(`Payment reminder sent to ${studentName}`);
  };

  return (
    <Card className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <CardHeader className="border-b p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold mb-1">Pending Fees Report</CardTitle>
            <CardDescription>
              Track and manage all pending student payments
            </CardDescription>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-opacity-10 bg-music-600 rounded-md p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Pending</p>
                <p className="text-lg font-semibold text-black">${totalPendingAmount}</p>
              </div>
              <DollarSign className="h-8 w-8 text-music-500 opacity-70" />
            </div>
            
            <div className="bg-opacity-10 bg-red-600 rounded-md p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Overdue Amount</p>
                <p className="text-lg font-semibold text-black">${overdueAmount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500 opacity-70" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 text-left">
              <TableRow>
                <TableHead className="py-4 px-6 font-medium">Student</TableHead>
                <TableHead className="py-4 px-6 font-medium">Class</TableHead>
                <TableHead className="py-4 px-6 font-medium">Amount</TableHead>
                <TableHead className="py-4 px-6 font-medium">Due Date</TableHead>
                <TableHead className="py-4 px-6 font-medium">Status</TableHead>
                <TableHead className="py-4 px-6 font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingFeesData.map((fee) => (
                <TableRow key={fee.id} className="border-b border-[#eee]">
                  <TableCell className="py-4 px-6 font-medium">
                    {fee.studentName}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {fee.className}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    ${fee.amount}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {new Date(fee.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge 
                      className={
                        fee.status === 'Overdue' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {fee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-music-500 border-music-200 hover:bg-music-50 hover:text-music-600"
                      onClick={() => sendReminder(fee.studentName)}
                    >
                      <Send className="mr-2 h-3.5 w-3.5" />
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingFeesReport;
