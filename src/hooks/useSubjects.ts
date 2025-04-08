
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Subject } from '@/types';
import { toast } from 'sonner';

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using type casting since the types don't automatically recognize our newly created tables
        const { data, error } = await supabase
          .from('subjects')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        if (data) {
          // Transform the data to match our Subject type using type assertion for safety
          const formattedSubjects: Subject[] = data.map(subject => ({
            id: subject.id as string,
            name: subject.name as string,
            description: (subject.description as string) || ''
          }));
          
          setSubjects(formattedSubjects);
        }
      } catch (err: any) {
        console.error('Error fetching subjects:', err);
        setError(err.message);
        toast.error('Failed to load subjects');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return { subjects, loading, error };
};
