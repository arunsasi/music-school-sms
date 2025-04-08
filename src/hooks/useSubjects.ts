
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
        
        // Using a more generic query to avoid type errors
        const { data, error } = await supabase
          .from('subjects')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        if (data) {
          // Transform the data to match our Subject type
          const formattedSubjects: Subject[] = data.map(subject => ({
            id: subject.id,
            name: subject.name,
            description: subject.description || ''
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
