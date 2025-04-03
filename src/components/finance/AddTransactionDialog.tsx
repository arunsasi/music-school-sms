import React from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddTransactionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  newPayment: {
    type: string;
    amount: string;
    date: string;
    description: string;
    paidBy: string;
    paidTo: string;
    status: string;
  };
  setNewPayment: (newPayment: any) => void;
  handleAddPayment: () => void;
  students: { id: string; name: string }[];
  employees: { id: string; name: string; role: string }[];
}

const AddTransactionDialog: React.FC<AddTransactionDialogProps> = ({
  isOpen,
  setIsOpen,
  newPayment,
  setNewPayment,
  handleAddPayment,
  students,
  employees,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  {students.map(student => (
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
                  {employees.map(employee => (
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
  );
};

export default AddTransactionDialog;
