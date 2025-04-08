
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types';

// Form schema for user creation/editing
const userFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  role: z.enum(['admin', 'teacher', 'accounts', 'student', 'parent'], { required_error: 'Please select a role.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }).optional(),
  active: z.boolean().default(true),
});

type UserFormValues = z.infer<typeof userFormSchema>;

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};

interface UserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormValues) => void;
  selectedUser: User | null;
  isSubmitting: boolean;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedUser,
  isSubmitting
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: selectedUser?.name || '',
      email: selectedUser?.email || '',
      role: selectedUser?.role || 'student',
      password: '',
      active: selectedUser?.active ?? true,
    },
  });

  // Reset form when selectedUser changes
  React.useEffect(() => {
    reset({
      name: selectedUser?.name || '',
      email: selectedUser?.email || '',
      role: selectedUser?.role || 'student',
      password: '',
      active: selectedUser?.active ?? true,
    });
  }, [selectedUser, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle>{selectedUser ? 'Edit User' : 'Create New User'}</DialogTitle>
          <DialogDescription>
            {selectedUser 
              ? 'Update user details and permissions' 
              : 'Fill in the information below to create a new user'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                {...register('name')} 
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                {...register('email')} 
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                defaultValue={selectedUser?.role || 'student'} 
                onValueChange={(value) => setValue('role', value as UserRole)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>
            {!selectedUser && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...register('password')} 
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 py-2">
            <input
              type="checkbox"
              id="active"
              {...register('active')}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="active" className="text-sm font-medium cursor-pointer">
              Active Account
            </Label>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 
                'Saving...' : 
                selectedUser ? 'Save Changes' : 'Create User'
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
