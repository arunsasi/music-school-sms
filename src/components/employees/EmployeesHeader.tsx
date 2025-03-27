
import React from 'react';
import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmployeesHeaderProps {
  onAddEmployee: () => void;
}

const EmployeesHeader: React.FC<EmployeesHeaderProps> = ({ onAddEmployee }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <p className="text-muted-foreground">
          Manage your school's staff and faculty
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" className="hidden md:flex">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={onAddEmployee}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>
    </div>
  );
};

export default EmployeesHeader;
