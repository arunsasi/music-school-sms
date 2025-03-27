
import { useState } from 'react';
import { Class, Subject } from '@/types';
import { useSupabaseClasses } from '@/hooks/useSupabaseClasses';
import { toast } from 'sonner';

// Mock subjects for demo purposes
export const MOCK_SUBJECTS: Subject[] = [
  { id: '1', name: 'Piano', description: 'Piano lessons for all levels' },
  { id: '2', name: 'Guitar', description: 'Guitar lessons for beginners to advanced' },
  { id: '3', name: 'Violin', description: 'Violin lessons for all ages' },
  { id: '4', name: 'Drums', description: 'Drum lessons for rhythm enthusiasts' },
  { id: '5', name: 'Vocals', description: 'Singing lessons for all levels' },
];

// Mock teacher names for demo
export const MOCK_TEACHERS: { [key: string]: string } = {
  '1': 'John Smith',
  '2': 'Sarah Johnson',
  '3': 'Michael Lee',
};

export const useClassesData = () => {
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

  return {
    classes: filteredClasses,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    isAddingClass,
    setIsAddingClass,
    editingClass,
    setEditingClass,
    subjectFilter,
    setSubjectFilter,
    viewingClass,
    isViewingSchedule,
    setIsViewingSchedule,
    isManagingStudents,
    setIsManagingStudents,
    handleAddClass,
    handleUpdateClass,
    handleDeleteClass,
    viewSchedule,
    manageStudents,
    handleUpdateClassStudents,
    MOCK_SUBJECTS,
    MOCK_TEACHERS
  };
};
