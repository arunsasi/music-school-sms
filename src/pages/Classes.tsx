
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';
import { Class, Subject } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import ClassForm from '@/components/ClassForm';
import ClassesTable from '@/components/classes/ClassesTable';
import ClassSchedule from '@/components/classes/ClassSchedule';
import ClassStudents from '@/components/classes/ClassStudents';
import { useSupabaseClasses } from '@/hooks/useSupabaseClasses';

// Mock subjects for demo purposes
const MOCK_SUBJECTS: Subject[] = [
  { id: '1', name: 'Piano', description: 'Piano lessons for all levels' },
  { id: '2', name: 'Guitar', description: 'Guitar lessons for beginners to advanced' },
  { id: '3', name: 'Violin', description: 'Violin lessons for all ages' },
  { id: '4', name: 'Drums', description: 'Drum lessons for rhythm enthusiasts' },
  { id: '5', name: 'Vocals', description: 'Singing lessons for all levels' },
];

// Mock teacher names for demo
const MOCK_TEACHERS: { [key: string]: string } = {
  '1': 'John Smith',
  '2': 'Sarah Johnson',
  '3': 'Michael Lee',
};

const Classes: React.FC = () => {
  const { 
    classes, 
    loading, 
    error, 
    addClass, 
    updateClass, 
    deleteClass 
  } = useSupabaseClasses();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  
  const [viewingClass, setViewingClass] = useState<Class | null>(null);
  const [isViewingSchedule, setIsViewingSchedule] = useState(false);
  const [isManagingStudents, setIsManagingStudents] = useState(false);
  
  const filteredClasses = classes.filter(cls => {
    if (subjectFilter && cls.subject.name !== subjectFilter) {
      return false;
    }
    
    return (
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      MOCK_TEACHERS[cls.teacherId]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const handleAddClass = (classData: Omit<Class, 'id'>) => {
    addClass(classData)
      .then(() => setIsAddingClass(false))
      .catch(err => {
        console.error('Error in handleAddClass:', err);
        toast.error("Couldn't add class. Please try again.");
      });
  };
  
  const handleUpdateClass = (classData: Omit<Class, 'id'>) => {
    if (!editingClass) return;
    
    updateClass({ ...classData, id: editingClass.id })
      .then(() => setEditingClass(null))
      .catch(err => {
        console.error('Error in handleUpdateClass:', err);
        toast.error("Couldn't update class. Please try again.");
      });
  };
  
  const handleDeleteClass = (id: string) => {
    deleteClass(id)
      .catch(err => {
        console.error('Error in handleDeleteClass:', err);
        toast.error("Couldn't delete class. Please try again.");
      });
  };
  
  const viewSchedule = (cls: Class) => {
    setViewingClass(cls);
    setIsViewingSchedule(true);
  };
  
  const manageStudents = (cls: Class) => {
    setViewingClass(cls);
    setIsManagingStudents(true);
  };
  
  const handleUpdateClassStudents = (updatedClass: Class) => {
    updateClass(updatedClass)
      .catch(err => {
        console.error('Error in handleUpdateClassStudents:', err);
        toast.error("Couldn't update class students. Please try again.");
      });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <div className="music-bars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="ml-3">Loading classes...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-error-500 mb-4">Error loading classes</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
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
            onClick={() => setIsAddingClass(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>
      
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
            {MOCK_SUBJECTS.map(subject => (
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
      
      <ClassesTable 
        classes={filteredClasses}
        teacherNames={MOCK_TEACHERS}
        onEditClass={setEditingClass}
        onDeleteClass={handleDeleteClass}
        onViewSchedule={viewSchedule}
        onManageStudents={manageStudents}
      />
      
      {isAddingClass && (
        <ClassForm
          isOpen={isAddingClass}
          onClose={() => setIsAddingClass(false)}
          onSubmit={handleAddClass}
        />
      )}
      
      {editingClass && (
        <ClassForm
          isOpen={!!editingClass}
          onClose={() => setEditingClass(null)}
          onSubmit={handleUpdateClass}
          initialData={editingClass}
        />
      )}
      
      <ClassSchedule 
        classData={viewingClass}
        isOpen={isViewingSchedule}
        onClose={() => setIsViewingSchedule(false)}
      />
      
      <ClassStudents
        classData={viewingClass}
        isOpen={isManagingStudents}
        onClose={() => setIsManagingStudents(false)}
        onUpdate={handleUpdateClassStudents}
      />
    </div>
  );
};

export default Classes;
