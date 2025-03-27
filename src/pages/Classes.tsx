import React, { useState } from 'react';
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

// Mock classes data
const MOCK_CLASSES: Class[] = [
  {
    id: '1',
    name: 'Beginning Piano',
    subject: MOCK_SUBJECTS[0],
    teacherId: '1',
    schedule: [
      { day: 'Monday', startTime: '09:00', endTime: '10:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '10:00' }
    ],
    fee: 300,
    students: ['1', '2', '5']
  },
  {
    id: '2',
    name: 'Advanced Guitar',
    subject: MOCK_SUBJECTS[1],
    teacherId: '2',
    schedule: [
      { day: 'Tuesday', startTime: '14:00', endTime: '15:30' },
      { day: 'Thursday', startTime: '14:00', endTime: '15:30' }
    ],
    fee: 350,
    students: ['3', '4', '7', '8']
  },
  {
    id: '3',
    name: 'Beginner Violin',
    subject: MOCK_SUBJECTS[2],
    teacherId: '3',
    schedule: [
      { day: 'Monday', startTime: '16:00', endTime: '17:00' },
      { day: 'Friday', startTime: '16:00', endTime: '17:00' }
    ],
    fee: 320,
    students: ['6']
  },
  {
    id: '4',
    name: 'Drum Fundamentals',
    subject: MOCK_SUBJECTS[3],
    teacherId: '1',
    schedule: [
      { day: 'Wednesday', startTime: '17:30', endTime: '18:30' },
      { day: 'Saturday', startTime: '10:00', endTime: '11:00' }
    ],
    fee: 280,
    students: ['3', '5', '8']
  },
  {
    id: '5',
    name: 'Vocal Training',
    subject: MOCK_SUBJECTS[4],
    teacherId: '2',
    schedule: [
      { day: 'Tuesday', startTime: '17:00', endTime: '18:30' },
      { day: 'Thursday', startTime: '17:00', endTime: '18:30' }
    ],
    fee: 370,
    students: ['1', '2', '4', '7']
  },
  {
    id: '6',
    name: 'Intermediate Piano',
    subject: MOCK_SUBJECTS[0],
    teacherId: '1',
    schedule: [
      { day: 'Monday', startTime: '11:00', endTime: '12:30' },
      { day: 'Wednesday', startTime: '11:00', endTime: '12:30' }
    ],
    fee: 330,
    students: ['4', '6', '8']
  }
];

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>(MOCK_CLASSES);
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
      MOCK_TEACHERS[cls.teacherId].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const addClass = (classData: Omit<Class, 'id'>) => {
    const newClass: Class = {
      ...classData,
      id: (classes.length + 1).toString()
    };
    
    setClasses([...classes, newClass]);
    setIsAddingClass(false);
    toast.success(`${newClass.name} class has been added successfully`);
  };
  
  const updateClass = (classData: Omit<Class, 'id'>) => {
    if (!editingClass) return;
    
    const updatedClasses = classes.map(cls => 
      cls.id === editingClass.id 
        ? { ...classData, id: editingClass.id } 
        : cls
    );
    
    setClasses(updatedClasses);
    setEditingClass(null);
    toast.success(`${classData.name} class has been updated successfully`);
  };
  
  const deleteClass = (id: string) => {
    const classToDelete = classes.find(cls => cls.id === id);
    if (!classToDelete) return;
    
    const updatedClasses = classes.filter(cls => cls.id !== id);
    setClasses(updatedClasses);
    toast.success(`${classToDelete.name} class has been removed`);
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
    const updatedClasses = classes.map(cls => 
      cls.id === updatedClass.id ? updatedClass : cls
    );
    setClasses(updatedClasses);
  };
  
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
        onDeleteClass={deleteClass}
        onViewSchedule={viewSchedule}
        onManageStudents={manageStudents}
      />
      
      {isAddingClass && (
        <ClassForm
          isOpen={isAddingClass}
          onClose={() => setIsAddingClass(false)}
          onSubmit={addClass}
        />
      )}
      
      {editingClass && (
        <ClassForm
          isOpen={!!editingClass}
          onClose={() => setEditingClass(null)}
          onSubmit={updateClass}
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
