
import React, { useState } from 'react';
import { 
  ChevronDown, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Music
} from 'lucide-react';
import { Class, Subject } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import ClassForm from '@/components/ClassForm';

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

// Background colors for each subject (for visual variety)
const SUBJECT_COLORS: { [key: string]: string } = {
  'Piano': 'bg-blue-50 dark:bg-blue-950',
  'Guitar': 'bg-green-50 dark:bg-green-950',
  'Violin': 'bg-purple-50 dark:bg-purple-950',
  'Drums': 'bg-orange-50 dark:bg-orange-950',
  'Vocals': 'bg-pink-50 dark:bg-pink-950',
};

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>(MOCK_CLASSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  
  // Filter classes
  const filteredClasses = classes.filter(cls => {
    // Subject filter
    if (subjectFilter && cls.subject.name !== subjectFilter) {
      return false;
    }
    
    // Search term filter
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">
            Manage your school's classes and schedules
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="bg-music-500 hover:bg-music-600"
            onClick={() => setIsAddingClass(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Subject
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSubjectFilter('')}>
              All Subjects
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {MOCK_SUBJECTS.map(subject => (
              <DropdownMenuItem 
                key={subject.id}
                onClick={() => setSubjectFilter(subject.name)}
              >
                {subject.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No classes found. Try a different search term or filter.
          </div>
        ) : (
          filteredClasses.map(cls => {
            const subjectColor = SUBJECT_COLORS[cls.subject.name] || 'bg-gray-50 dark:bg-gray-800';
            
            return (
              <Card 
                key={cls.id} 
                className={`dashboard-card h-full border-t-4 border-t-music-500 ${subjectColor}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">
                      {cls.subject.name}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingClass(cls)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Students
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteClass(cls.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-lg">{cls.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Instructor: {MOCK_TEACHERS[cls.teacherId]}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-start text-sm">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="space-y-1">
                        {cls.schedule.map((sch, idx) => (
                          <div key={idx}>
                            <span className="font-medium">{sch.day}:</span> {sch.startTime} - {sch.endTime}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.students.length} Student{cls.students.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>${cls.fee}/month</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setEditingClass(cls)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Manage Class
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
      
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
    </div>
  );
};

export default Classes;
