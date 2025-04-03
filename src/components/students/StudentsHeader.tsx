
import React from 'react';
import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentsHeaderProps {
  onAddStudent: () => void;
}

const StudentsHeader: React.FC<StudentsHeaderProps> = ({ onAddStudent }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Students</h2>
        <p className="text-sm text-muted-foreground">
          Manage your enrolled students
        </p>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button variant="outline" className="hidden md:flex">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={onAddStudent}>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
    </div>
  );
};

export default StudentsHeader;
