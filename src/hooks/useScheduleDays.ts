
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ScheduleDay {
  id: string;
  name: string;
  displayOrder: number;
}

export const useScheduleDays = () => {
  const [scheduleDays, setScheduleDays] = useState<ScheduleDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleDays = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('schedule_days')
          .select('*')
          .order('display_order');
        
        if (error) throw error;
        
        if (data) {
          // Transform the data to match our ScheduleDay type
          const formattedDays: ScheduleDay[] = data.map(day => ({
            id: day.id,
            name: day.name,
            displayOrder: day.display_order
          }));
          
          setScheduleDays(formattedDays);
        }
      } catch (err: any) {
        console.error('Error fetching schedule days:', err);
        setError(err.message);
        toast.error('Failed to load schedule days');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDays();
  }, []);

  return { scheduleDays, loading, error };
};
