
import React from 'react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Subject } from '@/types';

interface ClassesFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  subjectFilter: string;
  setSubjectFilter: (subject: string) => void;
  subjects: Subject[];
}

const ClassesFilterBar: React.FC<ClassesFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  subjectFilter,
  setSubjectFilter,
  subjects
}) => {
  return (
    <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search classes..."
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-stroke bg-transparent focus-visible:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto flex items-center gap-2.5">
            <Filter className="h-5 w-5" />
            Subject
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setSubjectFilter('')} className="cursor-pointer">
            All Subjects
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {subjects.map(subject => (
            <DropdownMenuItem 
              key={subject.id}
              onClick={() => setSubjectFilter(subject.name)}
              className="cursor-pointer"
            >
              {subject.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ClassesFilterBar;
