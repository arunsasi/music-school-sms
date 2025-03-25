
import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  DollarSign, 
  Download, 
  Filter, 
  PlusCircle, 
  Search, 
  UserCircle 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock data
const mockPayments = [
  { 
    id: '1', 
    type: 'Fee', 
    amount: 120, 
    date: '2023-07-05', 
    description: 'Piano Beginners - July 2023', 
    paidBy: '1', 
    status: 'Paid' 
  },
  { 
    id: '2', 
    type: 'Fee', 
    amount: 150, 
    date: '2023-07-06', 
    description: 'Violin Intermediate - July 2023', 
    paidBy: '4', 
    status: 'Paid' 
  },
  { 
    id: '3', 
    type: 'Salary', 
    amount: 2500, 
    date: '2023-06-30', 
    description: 'Teacher Salary - June 2023', 
    paidTo: '3', 
    status: 'Paid' 
  },
  { 
    id: '4', 
    type: 'Expense', 
    amount: 350, 
    date: '2023-07-10', 
    description: 'New music equipment', 
    status: 'Paid' 
  },
  { 
    id: '5', 
    type: 'Fee', 
    amount: 120, 
    date: '2023-07-15', 
    description: 'Piano Beginners - August 2023', 
    paidBy: '1', 
    status: 'Pending' 
  },
];

const mockStudents = [
  { id: '1', name: 'Emily Johnson' },
  { id: '2', name: 'Michael Chen' },
  { id: '3', name: 'Sarah Williams' },
  { id: '4', name: 'David Rodriguez' },
  { id: '5', name: 'Olivia Thompson' },
];

const mockEmployees = [
  { id: '1', name: 'John Doe', role: 'Principal' },
  { id: '2', name: 'Jane Smith', role: 'Management' },
  { id: '3', name: 'Robert Johnson', role: 'Teacher' },
  { id: '4', name: 'Maria Garcia', role: 'Teacher' },
  { id: '5', name: 'William Brown', role: 'Accountant' },
];

const Finance: React.FC = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [filterType, setFilterType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    type: 'Fee',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    paidBy: '',
    paidTo: '',
    status: 'Paid'
  });

  // Calculate summary statistics
  const totalIncome = payments
    .filter(p => p.type === 'Fee' && p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalExpenses = payments
    .filter(p => (p.type === 'Salary' || p.type === 'Expense') && p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const pendingIncome = payments
    .filter(p => p.type === 'Fee' && p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);

  // Filter payments based on type and search term
  const filteredPayments = payments.filter(payment => {
    const matchesType = !filterType || payment.type === filterType;
    
    const matchesSearch = searchTerm === '' || 
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.paidBy && mockStudents.find(s => s.id === payment.paidBy)?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (payment.paidTo && mockEmployees.find(e => e.id === payment.paidTo)?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  const handleAddPayment = () => {
    if (!newPayment.amount || !newPayment.description || !newPayment.date) {
      toast.error("Please fill out all required fields");
      return;
    }

    const paymentToAdd = {
      id: `${Date.now()}`,
      type: newPayment.type as 'Fee' | 'Salary' | 'Expense',
      amount: Number(newPayment.amount),
      date: newPayment.date,
      description: newPayment.description,
      status: newPayment.status as 'Paid' | 'Pending' | 'Cancelled',
      ...(newPayment.type === 'Fee' && { paidBy: newPayment.paidBy }),
      ...(newPayment.type === 'Salary' && { paidTo: newPayment.paidTo }),
    };

    setPayments([paymentToAdd, ...payments]);
    
    setNewPayment({
      type: 'Fee',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paidBy: '',
      paidTo: '',
      status: 'Paid'
    });
    
    setIsAddDialogOpen(false);
    toast.success("Payment added successfully");
  };

  const updatePaymentStatus = (id: string, newStatus: 'Paid' | 'Pending' | 'Cancelled') => {
    const updatedPayments = payments.map(payment => 
      payment.id === id ? { ...payment, status: newStatus } : payment
    );
    setPayments(updatedPayments);
    toast.success(`Payment status updated to ${newStatus}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Enter the details for the new financial transaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transaction-type" className="text-right">Type</Label>
                <Select 
                  value={newPayment.type} 
                  onValueChange={(value) => setNewPayment({...newPayment, type: value})}
                >
                  <SelectTrigger id="transaction-type" className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fee">Fee</SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                  placeholder="0.00"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input
                  id="description"
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                  placeholder="Transaction description"
                  className="col-span-3"
                />
              </div>
              
              {newPayment.type === 'Fee' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paidBy" className="text-right">Paid By</Label>
                  <Select 
                    value={newPayment.paidBy} 
                    onValueChange={(value) => setNewPayment({...newPayment, paidBy: value})}
                  >
                    <SelectTrigger id="paidBy" className="col-span-3">
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map(student => (
                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {newPayment.type === 'Salary' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paidTo" className="text-right">Paid To</Label>
                  <Select 
                    value={newPayment.paidTo} 
                    onValueChange={(value) => setNewPayment({...newPayment, paidTo: value})}
                  >
                    <SelectTrigger id="paidTo" className="col-span-3">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmployees.map(employee => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name} ({employee.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select 
                  value={newPayment.status} 
                  onValueChange={(value) => setNewPayment({...newPayment, status: value})}
                >
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddPayment}>Add Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +{payments.filter(p => p.type === 'Fee' && p.status === 'Paid').length} paid fees
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
              {payments.filter(p => p.type === 'Salary' && p.status === 'Paid').length} salaries, 
              {payments.filter(p => p.type === 'Expense' && p.status === 'Paid').length} expenses
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
              {payments.filter(p => p.type === 'Fee' && p.status === 'Pending').length} pending fees
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All transactions" />
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            <SelectItem value="Fee">Fees</SelectItem>
            <SelectItem value="Salary">Salaries</SelectItem>
            <SelectItem value="Expense">Expenses</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View all financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Person</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          payment.type === 'Fee' 
                            ? 'border-green-500 text-green-500' 
                            : payment.type === 'Salary'
                            ? 'border-blue-500 text-blue-500'
                            : 'border-orange-500 text-orange-500'
                        }
                      >
                        {payment.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {payment.description}
                    </TableCell>
                    <TableCell>
                      {payment.paidBy && (
                        <div className="flex items-center">
                          <UserCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                          {mockStudents.find(s => s.id === payment.paidBy)?.name || 'Unknown'}
                        </div>
                      )}
                      {payment.paidTo && (
                        <div className="flex items-center">
                          <UserCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                          {mockEmployees.find(e => e.id === payment.paidTo)?.name || 'Unknown'}
                        </div>
                      )}
                      {!payment.paidBy && !payment.paidTo && '-'}
                    </TableCell>
                    <TableCell className={payment.type === 'Fee' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {payment.type === 'Fee' ? '+' : '-'}${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          payment.status === 'Paid' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : payment.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Select 
                          value={payment.status} 
                          onValueChange={(value: 'Paid' | 'Pending' | 'Cancelled') => updatePaymentStatus(payment.id, value)}
                        >
                          <SelectTrigger className="h-8 w-[120px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredPayments.length}</strong> of <strong>{payments.length}</strong> transactions
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Finance;
