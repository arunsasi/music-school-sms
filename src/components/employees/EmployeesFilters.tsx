
import React from 'react';
import { ChevronDown, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface EmployeesFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const EmployeesFilters: React.FC<EmployeesFiltersProps> = ({
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Filter
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setSearchTerm('')}>
            All Employees
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSearchTerm('teacher')}>
            Teachers Only
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSearchTerm('management')}>
            Management Only
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSearchTerm('accountant')}>
            Accountants Only
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSearchTerm('active')}>
            Active Employees
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSearchTerm('inactive')}>
            Inactive Employees
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EmployeesFilters;
