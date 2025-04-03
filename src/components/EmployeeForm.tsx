
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  initialData?: Employee;
}

const employeeFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  role: z.string({ required_error: 'Please select a role' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  mobile: z.string().min(10, { message: 'Mobile number should have at least 10 digits' }),
  salary: z.coerce.number().min(1, { message: 'Salary must be greater than 0' }),
  joiningDate: z.date({ required_error: 'Joining date is required' }),
  status: z.enum(['Active', 'Inactive'], { required_error: 'Please select a status' })
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

const EmployeeForm: React.FC<EmployeeFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      salary: initialData.salary,
      joiningDate: new Date(initialData.joiningDate)
    } : {
      name: '',
      role: 'teacher',
      email: '',
      mobile: '',
      salary: 0,
      joiningDate: new Date(),
      status: 'Active'
    }
  });

  const joiningDate = watch('joiningDate');

  const onFormSubmit = (data: EmployeeFormValues) => {
    try {
      // Ensure all required fields are present in the data object
      const employeeData: Omit<Employee, 'id'> = {
        name: data.name,
        role: data.role,
        email: data.email,
        mobile: data.mobile,
        salary: data.salary,
        joiningDate: format(data.joiningDate, 'yyyy-MM-dd'),
        status: data.status
      };
      
      onSubmit(employeeData);
      reset();
      toast.success(`Employee ${initialData ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      toast.error('There was an error. Please try again.');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-6 bg-background">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">
            {initialData ? 'Edit Employee' : 'Add New Employee'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                defaultValue={initialData?.role || "teacher"} 
                onValueChange={(value) => setValue('role', value)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                {...register('mobile')}
                placeholder="1234567890"
              />
              {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="number"
                {...register('salary')}
                placeholder="0.00"
              />
              {errors.salary && <p className="text-sm text-destructive">{errors.salary.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="joiningDate">Joining Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="joiningDate"
                    className={cn(
                      "w-full justify-start text-left font-normal h-11",
                      !joiningDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {joiningDate ? format(joiningDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={joiningDate}
                    onSelect={(date) => setValue('joiningDate', date!)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.joiningDate && <p className="text-sm text-destructive">{errors.joiningDate.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                defaultValue={initialData?.status || "Active"} 
                onValueChange={(value) => setValue('status', value as 'Active' | 'Inactive')}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
            </div>
          </div>
          
          <DialogFooter className="mt-8 pt-2 border-t">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Save Changes' : 'Add Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
