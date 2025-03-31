import { useState, useEffect } from 'react';
import { Class, Subject, ScheduleItem } from '@/types';

// Mock subjects for demo purposes
export const MOCK_SUBJECTS: Subject[] = [
  { id: '1', name: 'Piano', description: 'Piano lessons for all levels' },
  { id: '2', name: 'Guitar', description: 'Guitar lessons for beginners to advanced' },
  { id: '3', name: 'Violin', description: 'Violin lessons for all ages' },
  { id: '4', name: 'Drums', description: 'Drum lessons for rhythm enthusiasts' },
  { id: '5', name: 'Vocals', description: 'Singing lessons for all levels' },
  { id: '6', name: 'Flute', description: 'Flute lessons for all levels' },
  { id: '7', name: 'Saxophone', description: 'Saxophone lessons for all levels' },
  { id: '8', name: 'Clarinet', description: 'Clarinet lessons for beginners to intermediate' },
  { id: '9', name: 'Trumpet', description: 'Trumpet lessons for all ages' },
  { id: '10', name: 'Music Theory', description: 'Music theory classes for all levels' },
];

// Mock teacher names for demo
export const MOCK_TEACHERS: { [key: string]: string } = {
  '1': 'John Smith',
  '2': 'Sarah Johnson',
  '3': 'Michael Lee',
  '4': 'Emma Wilson',
  '5': 'David Martinez',
  '6': 'Olivia Thompson',
  '7': 'William Brown',
  '8': 'Sofia Garcia',
  '9': 'James Miller',
  '10': 'Charlotte Davis',
};

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
];

// Fixing the generateMockSchedule function to return ScheduleItem[]
const generateMockSchedule = (): ScheduleItem[] => {
  const schedule: ScheduleItem[] = [];
  const numDays = Math.floor(Math.random() * 3) + 1; // 1-3 days per week
  
  // Select random days
  const selectedDays: string[] = [];
  while (selectedDays.length < numDays) {
    const randomDay = WEEKDAYS[Math.floor(Math.random() * WEEKDAYS.length)];
    if (!selectedDays.includes(randomDay)) {
      selectedDays.push(randomDay);
    }
  }
  
  // Assign time slots to each day
  selectedDays.forEach(day => {
    const timeSlot = TIME_SLOTS[Math.floor(Math.random() * TIME_SLOTS.length)];
    const [startTime, endTime] = timeSlot.split(' - ');
    schedule.push({
      day,
      startTime,
      endTime
    });
  });
  
  return schedule;
};

// Generate a random class with a given ID
const generateRandomClass = (id: string): Class => {
  const subjectIndex = Math.floor(Math.random() * MOCK_SUBJECTS.length);
  const subject = MOCK_SUBJECTS[subjectIndex];
  const teacherId = String(Math.floor(Math.random() * 10) + 1);
  const maxStudents = Math.floor(Math.random() * 15) + 5; // 5-20 students max
  
  // Generate a name based on level and subject
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Junior', 'Senior', 'Elite'];
  const level = levels[Math.floor(Math.random() * levels.length)];
  const name = `${level} ${subject.name}`;
  
  return {
    id,
    name,
    subject,
    teacherId,
    schedule: generateMockSchedule(),
    fee: Math.floor(Math.random() * 200) + 100,
    students: [],
  };
};

// Generate 50 mock classes
const generateMockClasses = (): Class[] => {
  const classes: Class[] = [];
  for (let i = 1; i <= 50; i++) {
    classes.push(generateRandomClass(`mock-${i}`));
  }
  return classes;
};

export const useMockClassData = () => {
  const [mockClasses, setMockClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setMockClasses(generateMockClasses());
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    classes: mockClasses,
    loading,
    MOCK_SUBJECTS,
    MOCK_TEACHERS
  };
};
