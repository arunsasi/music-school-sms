
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface AttendanceFiltersProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedStudent: string;
  setSelectedStudent: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredClasses: {
    id: string;
    name: string;
    weekday: string;
    time: string;
    teacherId: string;
  }[];
  getStudentsForClass: (classId: string) => {
    id: string;
    name: string;
    classId: string;
  }[];
  selectedTab: string;
}

const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  selectedClass,
  setSelectedClass,
  selectedStudent,
  setSelectedStudent,
  searchTerm,
  setSearchTerm,
  filteredClasses,
  getStudentsForClass,
  selectedTab
}) => {
  // Reset student selection when class changes
  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedStudent("all");
  };

  return (
    <div className="flex items-center space-x-4 justify-end">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search students..."
          className="pl-8 w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Select value={selectedClass} onValueChange={handleClassChange}>
        <SelectTrigger className="w-[180px]">
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by class" />
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Classes</SelectItem>
          {filteredClasses.map(c => (
            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedTab === "history" && (
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-[180px]">
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by student" />
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            {getStudentsForClass(selectedClass).map(s => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default AttendanceFilters;
