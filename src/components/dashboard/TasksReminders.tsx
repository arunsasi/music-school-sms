
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, MoreVertical, Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface TasksRemindersProps {
  initialTasks: Task[];
}

const TasksReminders: React.FC<TasksRemindersProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  
  const toggleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tasks & Reminders</CardTitle>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`flex items-center justify-between p-3 border rounded-md transition-colors ${
                task.completed ? 'bg-muted/50 border-muted' : ''
              }`}
            >
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 mr-2 rounded-full border ${
                    task.completed 
                      ? 'bg-music-500 border-music-500 text-white' 
                      : 'border-input bg-background'
                  }`}
                  onClick={() => toggleTaskComplete(task.id)}
                >
                  {task.completed && <Check className="h-3 w-3" />}
                </Button>
                <div className={`${task.completed ? 'text-muted-foreground line-through' : ''}`}>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksReminders;
