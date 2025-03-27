
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Class, Subject } from '@/types';
import { toast } from 'sonner';

export const useSupabaseClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load classes from Supabase
  const loadClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('classes')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to match the Class type
        const transformedClasses: Class[] = data.map(dbClass => ({
          id: dbClass.id,
          name: dbClass.name,
          subject: {
            id: '1', // This would need to be updated if you have subjects table
            name: 'Music', // Default subject
            description: dbClass.description || ''
          },
          teacherId: dbClass.teacher_id || '1',
          schedule: Array.isArray(dbClass.schedule) 
            ? dbClass.schedule 
            : [],
          fee: 300, // Default fee
          students: []
        }));
        
        setClasses(transformedClasses);
      }
    } catch (err: any) {
      console.error('Error loading classes:', err);
      setError(err.message);
      toast.error('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  // Create a new class
  const addClass = async (classData: Omit<Class, 'id'>) => {
    try {
      // Transform the class data to match the database schema
      const dbClass = {
        name: classData.name,
        description: classData.subject.description,
        teacher_id: classData.teacherId,
        schedule: classData.schedule,
        max_students: 10
      };
      
      const { data, error } = await supabase
        .from('classes')
        .insert(dbClass)
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        // Transform the response to match the Class type
        const newClass: Class = {
          id: data.id,
          name: data.name,
          subject: {
            id: '1',
            name: 'Music',
            description: data.description || ''
          },
          teacherId: data.teacher_id || '1',
          schedule: Array.isArray(data.schedule) ? data.schedule : [],
          fee: 300, // Default fee
          students: []
        };
        
        setClasses(prevClasses => [...prevClasses, newClass]);
        toast.success(`${newClass.name} class has been added successfully`);
        return newClass;
      }
    } catch (err: any) {
      console.error('Error adding class:', err);
      toast.error('Failed to add class');
      throw err;
    }
  };

  // Update an existing class
  const updateClass = async (classData: Class) => {
    try {
      // Transform the class data to match the database schema
      const dbClass = {
        name: classData.name,
        description: classData.subject.description,
        teacher_id: classData.teacherId,
        schedule: classData.schedule,
        max_students: 10
      };
      
      const { error } = await supabase
        .from('classes')
        .update(dbClass)
        .eq('id', classData.id);
      
      if (error) throw error;
      
      setClasses(prevClasses => 
        prevClasses.map(cls => 
          cls.id === classData.id ? classData : cls
        )
      );
      
      toast.success(`${classData.name} class has been updated successfully`);
      return classData;
    } catch (err: any) {
      console.error('Error updating class:', err);
      toast.error('Failed to update class');
      throw err;
    }
  };

  // Delete a class
  const deleteClass = async (id: string) => {
    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setClasses(prevClasses => 
        prevClasses.filter(cls => cls.id !== id)
      );
      
      toast.success('Class has been removed');
    } catch (err: any) {
      console.error('Error deleting class:', err);
      toast.error('Failed to delete class');
      throw err;
    }
  };

  // Initial load
  useEffect(() => {
    loadClasses();
  }, []);

  return {
    classes,
    loading,
    error,
    loadClasses,
    addClass,
    updateClass,
    deleteClass
  };
};
