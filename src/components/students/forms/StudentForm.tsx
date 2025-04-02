
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
import { toast } from '@/hooks/use-toast';

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
  const formDefaultValues: Omit<Student, 'id'> = {
    name: initialData?.name || '',
    age: initialData?.age || 0,
    guardian: initialData?.guardian || '',
    mobile: initialData?.mobile || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    enrollmentDate: initialData?.enrollmentDate || format(new Date(), 'yyyy-MM-dd'),
    status: initialData?.status || 'Active'
  };
  
  const handleSubmitForm = (formData: Omit<Student, 'id'>) => {
    try {
      onSubmit(formData);
      toast({
        title: initialData ? "Student updated" : "Student added",
        description: `${formData.name} has been successfully ${initialData ? "updated" : "added"}.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem saving the student. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 border-b sticky top-0 bg-card z-10">
          <DialogTitle className="text-xl font-medium text-card-foreground">
            {initialData ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
        </DialogHeader>
        
        <StudentFormContent 
          initialData={formDefaultValues}
          onSubmit={handleSubmitForm}
        />
        
        <DialogFooter className="p-6 border-t sticky bottom-0 bg-card z-10 mt-auto">
          <div className="flex gap-3 w-full justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="bg-secondary border border-input text-secondary-foreground hover:bg-secondary/80"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              form="studentForm"
              className="bg-music-500 text-white hover:bg-music-600"
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
