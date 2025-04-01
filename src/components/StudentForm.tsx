
import React, { useState } from 'react';
import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id'>) => void;
  initialData?: Student;
}

const StudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    name: initialData?.name || '',
    age: initialData?.age || 0,
    guardian: initialData?.guardian || '',
    mobile: initialData?.mobile || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    enrollmentDate: initialData?.enrollmentDate || format(new Date(), 'yyyy-MM-dd'),
    status: initialData?.status || 'Active'
  });
  
  const [date, setDate] = useState<Date | undefined>(
    initialData?.enrollmentDate 
      ? new Date(initialData.enrollmentDate) 
      : new Date()
  );
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setFormData(prev => ({
        ...prev,
        enrollmentDate: format(date, 'yyyy-MM-dd')
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-xl font-medium">
            {initialData ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-grow px-6 py-4 h-[calc(90vh-140px)]">
          <form id="studentForm" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student's full name"
                  required
                  className="bg-white border border-gray-200 h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="font-medium">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  required
                  min={1}
                  className="bg-white border border-gray-200 h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guardian" className="font-medium">Parent/Guardian Name</Label>
                <Input
                  id="guardian"
                  name="guardian"
                  value={formData.guardian}
                  onChange={handleChange}
                  placeholder="Enter parent or guardian name"
                  required
                  className="bg-white border border-gray-200 h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile" className="font-medium">Contact Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  required
                  className="bg-white border border-gray-200 h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email Address (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="bg-white border border-gray-200 h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium">Enrollment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border border-gray-200 h-11",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status" className="font-medium">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="bg-white border border-gray-200 h-11">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="font-medium">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  required
                  rows={3}
                  className="bg-white border border-gray-200 resize-none"
                />
              </div>
            </div>
          </form>
        </ScrollArea>
        
        <DialogFooter className="p-6 border-t sticky bottom-0 bg-white z-10 mt-auto">
          <div className="flex gap-3 w-full justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              form="studentForm"
              className="bg-music-500 hover:bg-music-600 text-white"
            >
              {initialData ? 'Update' : 'Add'} Student
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentForm;
