
import { useState, useEffect } from 'react';
import { AttendanceRecord, Class, Student } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

// Mock data for classes
const mockClasses = [
  { id: '1', name: 'Piano Beginners', weekday: 'Monday', time: '4:00 PM - 5:00 PM', teacherId: '3' },
  { id: '2', name: 'Violin Intermediate', weekday: 'Tuesday', time: '5:00 PM - 6:30 PM', teacherId: '3' },
  { id: '3', name: 'Guitar Advanced', weekday: 'Wednesday', time: '6:00 PM - 7:30 PM', teacherId: '4' },
  { id: '4', name: 'Vocal Training', weekday: 'Thursday', time: '4:30 PM - 6:00 PM', teacherId: '4' },
  { id: '5', name: 'Drums Beginners', weekday: 'Friday', time: '5:00 PM - 6:00 PM', teacherId: '5' },
];

// Mock data for students
const mockStudents = [
  { id: '1', name: 'Emily Johnson', classId: '1' },
  { id: '2', name: 'Michael Chen', classId: '1' },
  { id: '3', name: 'Sarah Williams', classId: '1' },
  { id: '4', name: 'David Rodriguez', classId: '2' },
  { id: '5', name: 'Olivia Thompson', classId: '2' },
  { id: '6', name: 'James Wilson', classId: '3' },
  { id: '7', name: 'Sophia Martinez', classId: '3' },
  { id: '8', name: 'Ethan Brown', classId: '4' },
  { id: '9', name: 'Ava Garcia', classId: '5' },
  { id: '10', name: 'Noah Smith', classId: '5' },
];

// Sample attendance records
const initialAttendanceRecords: AttendanceRecord[] = [
  { id: '1', studentId: '1', classId: '1', date: '2023-06-12', status: 'Present', remark: '', takenBy: '3' },
  { id: '2', studentId: '2', classId: '1', date: '2023-06-12', status: 'Late', remark: 'Arrived 15 mins late', takenBy: '3' },
  { id: '3', studentId: '3', classId: '1', date: '2023-06-12', status: 'Absent', remark: 'Sick leave', takenBy: '3' },
  { id: '4', studentId: '4', classId: '2', date: '2023-06-13', status: 'Present', remark: '', takenBy: '3' },
  { id: '5', studentId: '5', classId: '2', date: '2023-06-13', status: 'Present', remark: '', takenBy: '3' },
];

export const useAttendanceData = () => {
  const { user, hasPermission } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTab, setSelectedTab] = useState("today");
  const [viewingDate, setViewingDate] = useState<string>(currentDate);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  // Filter classes based on teacher if user is a teacher
  const filteredClasses = mockClasses.filter(cls => {
    if (user?.role === 'teacher') {
      return cls.teacherId === user.id;
    }
    return true;
  });

  // Get students for selected class
  const getStudentsForClass = (classId: string | 'all') => {
    if (classId === 'all') {
      return mockStudents;
    }
    return mockStudents.filter(student => student.classId === classId);
  };

  // Check if attendance can be edited (only admin/accounts can edit)
  const canEditAttendance = hasPermission(['admin', 'accounts']);
  
  // Check if attendance can be taken (teacher can only take for current day)
  const canTakeAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return currentDate === today || hasPermission(['admin', 'accounts']);
  };

  // Check if attendance is already taken for current class and date
  const isAttendanceTaken = (classId: string, date: string) => {
    if (classId === 'all') return false;
    
    const records = attendanceRecords.filter(
      record => record.classId === classId && record.date === date
    );
    
    const studentsInClass = getStudentsForClass(classId);
    
    return records.length >= studentsInClass.length;
  };

  useEffect(() => {
    // Check if attendance is submitted for current selection
    if (selectedClass !== 'all') {
      setAttendanceSubmitted(isAttendanceTaken(selectedClass, currentDate));
    } else {
      setAttendanceSubmitted(false);
    }
  }, [selectedClass, currentDate, attendanceRecords]);

  // Filter students based on selected class and search term
  const filteredStudents = mockStudents.filter(student => {
    const matchesClass = selectedClass === "all" || student.classId === selectedClass;
    const matchesStudent = selectedStudent === "all" || student.id === selectedStudent;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClass && matchesStudent && matchesSearch;
  });

  // Mark attendance function
  const markAttendance = (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark: string = '') => {
    if (!canTakeAttendance()) {
      toast.error("Attendance can only be taken for the current day");
      return;
    }

    // Check if there's an existing record for this student on this date
    const existingRecordIndex = attendanceRecords.findIndex(
      record => record.studentId === studentId && record.date === currentDate && record.classId === classId
    );

    if (existingRecordIndex !== -1) {
      // Update existing record
      const updatedRecords = [...attendanceRecords];
      
      // If not admin/accounts, prevent editing
      if (!canEditAttendance && updatedRecords[existingRecordIndex].takenBy !== user?.id) {
        toast.error("You don't have permission to edit this attendance record");
        return;
      }
      
      updatedRecords[existingRecordIndex] = {
        ...updatedRecords[existingRecordIndex],
        status,
        remark,
        editedBy: user?.id,
        editedAt: new Date().toISOString()
      };
      setAttendanceRecords(updatedRecords);
    } else {
      // Create new record
      const newRecord: AttendanceRecord = {
        id: `${Date.now()}`,
        studentId,
        classId,
        date: currentDate,
        status,
        remark,
        takenBy: user?.id || '0'
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }

    // Show toast notification
    toast.success(`Marked ${status} for ${mockStudents.find(s => s.id === studentId)?.name}`);
  };

  // Submit attendance for a class
  const submitAttendance = (classId: string) => {
    if (!canTakeAttendance()) {
      toast.error("Attendance can only be taken for the current day");
      return;
    }
    
    // Check if all students have attendance marked
    const studentsInClass = getStudentsForClass(classId);
    const recordsForToday = attendanceRecords.filter(
      r => r.classId === classId && r.date === currentDate
    );
    
    // Find which students don't have attendance marked
    const unmarkedStudents = studentsInClass.filter(student => 
      !recordsForToday.some(record => record.studentId === student.id)
    );
    
    if (unmarkedStudents.length > 0) {
      // Mark remaining as absent by default
      unmarkedStudents.forEach(student => {
        markAttendance(student.id, classId, 'Absent', 'Marked absent by default on submission');
      });
    }
    
    setAttendanceSubmitted(true);
    toast.success("Attendance submitted successfully");
  };

  // Get attendance status for a student on a specific date
  const getAttendanceStatus = (studentId: string, date: string) => {
    const record = attendanceRecords.find(
      r => r.studentId === studentId && r.date === date
    );
    return record ? record.status : undefined;
  };

  // Get the student's attendance history
  const getStudentAttendanceHistory = (studentId: string) => {
    return attendanceRecords
      .filter(record => record.studentId === studentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Get all attendance records filtered by date and/or class
  const getFilteredAttendanceRecords = () => {
    return attendanceRecords
      .filter(record => {
        const matchesClass = selectedClass === "all" || record.classId === selectedClass;
        const matchesStudent = selectedStudent === "all" || record.studentId === selectedStudent;
        
        return matchesClass && matchesStudent;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return {
    attendanceRecords,
    setAttendanceRecords,
    selectedClass,
    setSelectedClass,
    selectedStudent,
    setSelectedStudent,
    searchTerm,
    setSearchTerm,
    currentDate,
    setCurrentDate,
    selectedTab,
    setSelectedTab,
    viewingDate,
    setViewingDate,
    filteredClasses,
    filteredStudents,
    markAttendance,
    getAttendanceStatus,
    getStudentAttendanceHistory,
    getFilteredAttendanceRecords,
    canEditAttendance,
    canTakeAttendance,
    getStudentsForClass,
    submitAttendance,
    attendanceSubmitted,
    isAttendanceTaken,
    mockClasses,
    mockStudents
  };
};
