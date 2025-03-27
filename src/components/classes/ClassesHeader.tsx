
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClassesHeaderProps {
  onAddClass: () => void;
}

const ClassesHeader: React.FC<ClassesHeaderProps> = ({ onAddClass }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white">Classes</h2>
        <p className="text-sm text-muted-foreground">
          Manage your school's classes and schedules
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          className="bg-music-500 hover:bg-music-600 text-white font-medium"
          onClick={onAddClass}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>
    </div>
  );
};

export default ClassesHeader;
