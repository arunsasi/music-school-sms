
import { useState, useCallback } from 'react';
import { Class } from '@/types';
import { useMockClassData } from '@/hooks/useMockClassData';
import { toast } from 'sonner';

export const useClassesData = () => {
  const { 
    classes: mockClasses, 
    loading, 
    MOCK_TEACHERS
  } = useMockClassData();
  
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  
  const [viewingClass, setViewingClass] = useState<Class | null>(null);
  const [isViewingSchedule, setIsViewingSchedule] = useState(false);
  const [isManagingStudents, setIsManagingStudents] = useState(false);

  // Update classes when mock data is loaded
  if (mockClasses.length > 0 && classes.length === 0) {
    setClasses(mockClasses);
  }
  
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
  
  const addClass = useCallback((classData: Omit<Class, 'id'>) => {
    const newClass: Class = {
      ...classData,
      id: `new-${Date.now()}`
    };
    
    setClasses(prev => [newClass, ...prev]);
    toast.success("Class added successfully");
    
    return Promise.resolve();
  }, []);
  
  const updateClass = useCallback((updatedClass: Class) => {
    setClasses(prev => 
      prev.map(cls => cls.id === updatedClass.id ? updatedClass : cls)
    );
    toast.success("Class updated successfully");
    
    return Promise.resolve();
  }, []);
  
  const deleteClass = useCallback((id: string) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
    toast.success("Class deleted successfully");
    
    return Promise.resolve();
  }, []);
  
  const viewSchedule = (cls: Class) => {
    setViewingClass(cls);
    setIsViewingSchedule(true);
  };
  
  const manageStudents = (cls: Class) => {
    setViewingClass(cls);
    setIsManagingStudents(true);
  };
  
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
    error: null,
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
    MOCK_TEACHERS
  };
};
