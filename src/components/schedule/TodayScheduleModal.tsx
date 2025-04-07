
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  teacher: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface TodayScheduleModalProps {
  trigger?: React.ReactNode;
  scheduleItems: ScheduleItem[];
}

const getStatusColor = (status: ScheduleItem['status']) => {
  switch (status) {
    case 'upcoming':
      return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    case 'ongoing':
      return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    case 'completed':
      return 'text-gray-500 bg-gray-50 dark:bg-gray-800/40';
  }
};

const TodayScheduleModal: React.FC<TodayScheduleModalProps> = ({ 
  trigger = <Button variant="outline">View Today's Schedule</Button>,
  scheduleItems = []
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] dialog-content-scrollable">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Calendar className="h-5 w-5" /> Today's Schedule
          </DialogTitle>
          <div className="text-sm text-muted-foreground">{currentDate}</div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {scheduleItems.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No classes scheduled for today</p>
          ) : (
            scheduleItems.map((item) => (
              <div 
                key={item.id} 
                className={cn(
                  "p-4 rounded-lg border border-border",
                  "transition-colors hover:border-primary/50"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    getStatusColor(item.status)
                  )}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.time}</span>
                </div>
                
                <div className="flex flex-col gap-1 mt-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teacher:</span>
                    <span>{item.teacher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TodayScheduleModal;
