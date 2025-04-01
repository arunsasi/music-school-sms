
import React, { useState } from 'react';
import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import StudentFormContent from './StudentFormContent';

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
        
        <StudentFormContent 
          formData={formData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          date={date}
          handleDateChange={handleDateChange}
        />
        
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
              onClick={handleSubmit}
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
