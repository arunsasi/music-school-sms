
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AttendanceRecord } from '@/types';
import { 
  mockClasses, 
  mockStudents, 
  initialAttendanceRecords,
  MockClass,
  MockStudent
} from '@/data/mockAttendanceData';
import { 
  getStudentsForClass, 
  isAttendanceTaken,
  getAttendanceStatus,
  markAttendance as markAttendanceUtil,
  submitAttendance as submitAttendanceUtil,
  getStudentAttendanceHistory,
  filterStudents,
  getFilteredAttendanceRecords
} from '@/utils/attendanceOperations';
import {
  canEditAttendance as checkEditPermission,
  canTakeAttendanceForDate,
  filterClassesByTeacher,
  canAccessAttendance
} from '@/utils/attendancePermissions';

export const useAttendanceData = () => {
  const { user } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTab, setSelectedTab] = useState("today");
  const [viewingDate, setViewingDate] = useState<string>(currentDate);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  // Filter classes based on teacher if user is a teacher
  const filteredClasses = filterClassesByTeacher(mockClasses, user?.id, user?.role);

  // Check if attendance can be edited (only admin/accounts can edit)
  const canEditAttendance = checkEditPermission(user?.role);
  
  // Check if attendance can be taken (teacher can only take for current day)
  const canTakeAttendance = () => canTakeAttendanceForDate(currentDate, user?.role);

  // Get students for selected class (wrapper function)
  const getStudentsForSelectedClass = (classId: string | 'all') => {
    // For teachers, only return students from their classes
    if (user?.role === 'teacher' && classId === 'all') {
      // Get all students from teacher's classes
      const teacherClassIds = filteredClasses.map(c => c.id);
      return mockStudents.filter(student => 
        teacherClassIds.includes(student.classId || '')
      );
    }
    return getStudentsForClass(classId, mockStudents);
  };

  // Check if attendance is already taken (wrapper function)
  const isAttendanceTakenForClass = (classId: string, date: string) => {
    return isAttendanceTaken(classId, date, attendanceRecords, getStudentsForSelectedClass);
  };

  // Check if user has permission to access this class
  const hasAccessToClass = (classId: string) => {
    if (classId === 'all') return true;
    return canAccessAttendance(classId, filteredClasses, user?.role);
  };

  // When changing selected class, ensure user has access to it
  useEffect(() => {
    if (selectedClass !== 'all' && !hasAccessToClass(selectedClass)) {
      // Reset to 'all' or first allowed class if no access
      if (filteredClasses.length > 0) {
        setSelectedClass(filteredClasses[0].id);
      } else {
        setSelectedClass('all');
      }
    }
  }, [selectedClass, user]);

  useEffect(() => {
    // Check if attendance is submitted for current selection
    if (selectedClass !== 'all') {
      setAttendanceSubmitted(isAttendanceTakenForClass(selectedClass, currentDate));
    } else {
      setAttendanceSubmitted(false);
    }
  }, [selectedClass, currentDate, attendanceRecords]);

  // Filter students based on selected class and search term
  const filteredStudents = filterStudents(
    mockStudents,
    selectedClass,
    selectedStudent,
    searchTerm,
    user?.role === 'teacher' ? filteredClasses.map(c => c.id) : undefined
  );

  // Mark attendance function (wrapper function)
  const markAttendance = (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark: string = '') => {
    // Check if the user has access to this class
    if (!hasAccessToClass(classId)) {
      console.error("No permission to mark attendance for this class");
      return;
    }

    const studentName = mockStudents.find(s => s.id === studentId)?.name || 'Student';
    const updatedRecords = markAttendanceUtil(
      studentId,
      classId,
      status,
      currentDate,
      attendanceRecords,
      user?.id,
      canEditAttendance,
      canTakeAttendance,
      studentName,
      remark
    );
    
    if (updatedRecords) {
      setAttendanceRecords(updatedRecords);
    }
  };

  // Submit attendance for a class (wrapper function)
  const submitAttendance = (classId: string) => {
    // Check if the user has access to this class
    if (!hasAccessToClass(classId)) {
      console.error("No permission to submit attendance for this class");
      return false;
    }

    const success = submitAttendanceUtil(
      classId,
      currentDate,
      attendanceRecords,
      getStudentsForSelectedClass,
      markAttendance,
      canTakeAttendance
    );
    
    if (success) {
      setAttendanceSubmitted(true);
    }
    return success;
  };

  // Get attendance status for a student on a specific date (wrapper function)
  const getStudentStatus = (studentId: string, date: string) => {
    return getAttendanceStatus(studentId, date, attendanceRecords);
  };

  // Get filtered attendance records (wrapper function)
  const getFilteredRecords = () => {
    // For teachers, only show records for their classes
    if (user?.role === 'teacher') {
      const teacherClassIds = filteredClasses.map(c => c.id);
      return getFilteredAttendanceRecords(
        attendanceRecords,
        selectedClass,
        selectedStudent
      ).filter(record => teacherClassIds.includes(record.classId));
    }
    return getFilteredAttendanceRecords(
      attendanceRecords,
      selectedClass,
      selectedStudent
    );
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
    getAttendanceStatus: getStudentStatus,
    getStudentAttendanceHistory: (studentId: string) => getStudentAttendanceHistory(studentId, attendanceRecords),
    getFilteredAttendanceRecords: getFilteredRecords,
    canEditAttendance,
    canTakeAttendance,
    getStudentsForClass: getStudentsForSelectedClass,
    submitAttendance,
    attendanceSubmitted,
    isAttendanceTaken: isAttendanceTakenForClass,
    hasAccessToClass,
    mockClasses,
    mockStudents
  };
};
