
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormField from './FormField';
import DatePickerField from './DatePickerField';
import SelectField from './SelectField';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Student } from '@/types';

interface StudentFormContentProps {
  formData: Omit<Student, 'id'>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  date: Date | undefined;
  handleDateChange: (date: Date | undefined) => void;
}

const StudentFormContent: React.FC<StudentFormContentProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  date,
  handleDateChange
}) => {
  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  return (
    <ScrollArea className="flex-grow px-6 py-4 h-[calc(90vh-140px)]">
      <form id="studentForm" className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField id="name" label="Full Name">
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student's full name"
              required
              className="bg-white border border-gray-200 h-11"
            />
          </FormField>
          
          <FormField id="age" label="Age">
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
          </FormField>
          
          <FormField id="guardian" label="Parent/Guardian Name">
            <Input
              id="guardian"
              name="guardian"
              value={formData.guardian}
              onChange={handleChange}
              placeholder="Enter parent or guardian name"
              required
              className="bg-white border border-gray-200 h-11"
            />
          </FormField>
          
          <FormField id="mobile" label="Contact Number">
            <Input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
              className="bg-white border border-gray-200 h-11"
            />
          </FormField>
          
          <FormField id="email" label="Email Address (Optional)">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="bg-white border border-gray-200 h-11"
            />
          </FormField>
          
          <DatePickerField
            id="enrollmentDate"
            label="Enrollment Date"
            date={date}
            onDateChange={handleDateChange}
          />
          
          <SelectField
            id="status"
            label="Status"
            value={formData.status}
            options={statusOptions}
            onChange={(value) => handleSelectChange('status', value)}
          />
          
          <FormField id="address" label="Address" colSpan="full">
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
          </FormField>
        </div>
      </form>
    </ScrollArea>
  );
};

export default StudentFormContent;
