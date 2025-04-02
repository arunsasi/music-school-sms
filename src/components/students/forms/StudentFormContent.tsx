
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormField from './FormField';
import DatePickerField from './DatePickerField';
import SelectField from './SelectField';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { studentSchema, StudentFormValues } from '@/lib/validations/student';
import { Student } from '@/types';

interface StudentFormContentProps {
  initialData: Omit<Student, 'id'>;
  onSubmit: (data: Omit<Student, 'id'>) => void;
}

const StudentFormContent: React.FC<StudentFormContentProps> = ({
  initialData,
  onSubmit
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData
  });

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const handleFormSubmit = (data: StudentFormValues) => {
    onSubmit(data);
  };

  return (
    <ScrollArea className="flex-grow px-6 py-4 h-[calc(90vh-140px)]">
      <form id="studentForm" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField 
            id="name" 
            label="Full Name" 
            required
            error={errors.name?.message}
            tooltip="Student's complete name"
          >
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter student's full name"
              className="bg-background border border-input h-11 w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </FormField>
          
          <FormField 
            id="age" 
            label="Age" 
            required
            error={errors.age?.message}
            tooltip="Student's current age"
          >
            <Input
              id="age"
              type="number"
              {...register("age", { valueAsNumber: true })}
              placeholder="Enter age"
              min={1}
              className="bg-background border border-input h-11 w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </FormField>
          
          <FormField 
            id="guardian" 
            label="Parent/Guardian Name" 
            required
            error={errors.guardian?.message}
            tooltip="Name of responsible parent or guardian"
          >
            <Input
              id="guardian"
              {...register("guardian")}
              placeholder="Enter parent or guardian name"
              className="bg-background border border-input h-11 w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </FormField>
          
          <FormField 
            id="mobile" 
            label="Contact Number" 
            required
            error={errors.mobile?.message}
            tooltip="Primary contact number"
          >
            <Input
              id="mobile"
              {...register("mobile")}
              placeholder="Enter contact number"
              className="bg-background border border-input h-11 w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </FormField>
          
          <FormField 
            id="email" 
            label="Email Address" 
            error={errors.email?.message}
            tooltip="Optional email address for communications"
          >
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter email address"
              className="bg-background border border-input h-11 w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </FormField>
          
          <Controller
            name="enrollmentDate"
            control={control}
            render={({ field }) => (
              <DatePickerField
                id="enrollmentDate"
                label="Enrollment Date"
                date={field.value ? new Date(field.value) : undefined}
                onDateChange={(date) => {
                  if (date) {
                    field.onChange(date.toISOString().split('T')[0]);
                  }
                }}
                required
                error={errors.enrollmentDate?.message}
                tooltip="Date student enrolled in music school"
              />
            )}
          />
          
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SelectField
                id="status"
                label="Status"
                value={field.value}
                options={statusOptions}
                onChange={field.onChange}
                required
                error={errors.status?.message}
                tooltip="Current enrollment status"
              />
            )}
          />
          
          <FormField 
            id="address" 
            label="Address" 
            colSpan="full"
            required
            error={errors.address?.message}
            tooltip="Student's complete address"
          >
            <Textarea
              id="address"
              {...register("address")}
              placeholder="Enter full address"
              rows={3}
              className="bg-background border border-input resize-none min-h-[80px] focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </FormField>
        </div>
      </form>
    </ScrollArea>
  );
};

export default StudentFormContent;
