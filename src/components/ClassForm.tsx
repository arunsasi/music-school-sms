
import React, { useState } from 'react';
import { Class, Subject } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { Trash2, Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// Mock subjects for demo purposes
const MOCK_SUBJECTS: Subject[] = [
  { id: '1', name: 'Piano', description: 'Piano lessons for all levels' },
  { id: '2', name: 'Guitar', description: 'Guitar lessons for beginners to advanced' },
  { id: '3', name: 'Violin', description: 'Violin lessons for all ages' },
  { id: '4', name: 'Drums', description: 'Drum lessons for rhythm enthusiasts' },
  { id: '5', name: 'Vocals', description: 'Singing lessons for all levels' },
];

// Mock teacher IDs for demo
const MOCK_TEACHERS = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Michael Lee' },
];

interface ClassFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (classData: Omit<Class, 'id'>) => void;
  initialData?: Class;
}

const ClassForm: React.FC<ClassFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = useState<Omit<Class, 'id'>>({
    name: initialData?.name || '',
    subject: initialData?.subject || MOCK_SUBJECTS[0],
    teacherId: initialData?.teacherId || '',
    schedule: initialData?.schedule || [
      { day: 'Monday', startTime: '09:00', endTime: '10:00' }
    ],
    fee: initialData?.fee || 0,
    students: initialData?.students || []
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fee' ? Number(value) : value
    }));
  };
  
  const handleSubjectChange = (subjectId: string) => {
    const subject = MOCK_SUBJECTS.find(s => s.id === subjectId);
    if (subject) {
      setFormData(prev => ({
        ...prev,
        subject
      }));
    }
  };
  
  const handleTeacherChange = (teacherId: string) => {
    setFormData(prev => ({
      ...prev,
      teacherId
    }));
  };
  
  const handleScheduleChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newSchedule = [...prev.schedule];
      newSchedule[index] = {
        ...newSchedule[index],
        [field]: value
      };
      return {
        ...prev,
        schedule: newSchedule
      };
    });
  };
  
  const addScheduleItem = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        { day: 'Monday', startTime: '09:00', endTime: '10:00' }
      ]
    }));
  };
  
  const removeScheduleItem = (index: number) => {
    setFormData(prev => {
      const newSchedule = [...prev.schedule];
      newSchedule.splice(index, 1);
      return {
        ...prev,
        schedule: newSchedule
      };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Class' : 'Add New Class'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter class name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={formData.subject.id}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_SUBJECTS.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teacherId">Teacher</Label>
              <Select
                value={formData.teacherId}
                onValueChange={handleTeacherChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Assign teacher" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_TEACHERS.map(teacher => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fee">Class Fee</Label>
              <Input
                id="fee"
                name="fee"
                type="number"
                value={formData.fee}
                onChange={handleChange}
                placeholder="Enter class fee"
                required
                min={0}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Schedule</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addScheduleItem}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </Button>
              </div>
              
              {formData.schedule.map((scheduleItem, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center mt-2">
                  <div className="col-span-4">
                    <Select
                      value={scheduleItem.day}
                      onValueChange={(value) => 
                        handleScheduleChange(index, 'day', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-3">
                    <Input
                      type="time"
                      value={scheduleItem.startTime}
                      onChange={(e) => 
                        handleScheduleChange(index, 'startTime', e.target.value)
                      }
                      required
                    />
                  </div>
                  
                  <div className="col-span-1 text-center">
                    to
                  </div>
                  
                  <div className="col-span-3">
                    <Input
                      type="time"
                      value={scheduleItem.endTime}
                      onChange={(e) => 
                        handleScheduleChange(index, 'endTime', e.target.value)
                      }
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    {formData.schedule.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeScheduleItem(index)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-music-500 hover:bg-music-600">
              {initialData ? 'Update' : 'Add'} Class
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClassForm;
