
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    case 'ongoing':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    case 'completed':
      return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  }
};

const getStatusIcon = (status: ScheduleItem['status']) => {
  switch (status) {
    case 'upcoming':
      return <div className="h-2 w-2 rounded-full bg-blue-500" />;
    case 'ongoing':
      return <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />;
    case 'completed':
      return <div className="h-2 w-2 rounded-full bg-gray-500" />;
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

  // Group schedule items by status
  const groupedItems = {
    ongoing: scheduleItems.filter(item => item.status === 'ongoing'),
    upcoming: scheduleItems.filter(item => item.status === 'upcoming'),
    completed: scheduleItems.filter(item => item.status === 'completed')
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px] dialog-content-scrollable">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
              <Calendar className="h-5 w-5" /> Today's Schedule
            </DialogTitle>
            <Badge variant="outline" className="bg-background/80">
              {currentDate}
            </Badge>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Show ongoing classes first */}
          {groupedItems.ongoing.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2 text-green-600 dark:text-green-400">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Ongoing Now
              </h3>
              <div className="space-y-3">
                {groupedItems.ongoing.map((item) => (
                  <ScheduleCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
          
          {/* Then upcoming classes */}
          {groupedItems.upcoming.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                Upcoming Today
              </h3>
              <div className="space-y-3">
                {groupedItems.upcoming.map((item) => (
                  <ScheduleCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
          
          {/* Finally completed classes */}
          {groupedItems.completed.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="h-2 w-2 rounded-full bg-gray-500" />
                Completed
              </h3>
              <div className="space-y-3">
                {groupedItems.completed.map((item) => (
                  <ScheduleCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
          
          {scheduleItems.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">No classes scheduled for today</h3>
              <p className="text-muted-foreground mt-2">Enjoy your free day!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ScheduleCard: React.FC<{ item: ScheduleItem }> = ({ item }) => {
  return (
    <div 
      className={cn(
        "p-4 rounded-lg border hover-card",
        item.status === 'completed' && "opacity-70"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{item.title}</h3>
        <Badge variant="outline" className={cn(
          "ml-2 text-xs py-0.5",
          getStatusColor(item.status)
        )}>
          <span className="flex items-center gap-1.5">
            {getStatusIcon(item.status)}
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        </Badge>
      </div>
      
      <div className="space-y-2 mt-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          <span>{item.time}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5" />
          <span>{item.teacher}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{item.location}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t flex justify-end">
        <Button variant="ghost" size="sm" className="text-xs">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default TodayScheduleModal;
