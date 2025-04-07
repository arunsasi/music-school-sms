
import { AttendanceRecord } from '@/types';
import { MockStudent } from '@/data/mockAttendanceData';
import { toast } from 'sonner';

// Function to get all students for a specific class
export const getStudentsForClass = (classId: string | 'all', students: MockStudent[]) => {
  if (classId === 'all') {
    return students;
  }
  return students.filter(student => student.classId === classId);
};

// Function to check if attendance for a class on a specific date is already taken
export const isAttendanceTaken = (
  classId: string, 
  date: string,
  attendanceRecords: AttendanceRecord[],
  getStudentsForClass: (classId: string | 'all') => MockStudent[]
) => {
  // If classId is "all", we consider it not taken to allow marking
  if (classId === 'all') return false;
  
  const studentsInClass = getStudentsForClass(classId);
  if (studentsInClass.length === 0) return false;
  
  // For each student in the class, check if there's an attendance record for the date
  const studentsWithAttendance = studentsInClass.filter(student => {
    return attendanceRecords.some(record => 
      record.studentId === student.id && 
      record.classId === classId && 
      record.date === date
    );
  });
  
  // If all students have attendance records, consider it taken
  return studentsWithAttendance.length === studentsInClass.length;
};

// Function to get attendance status for a specific student on a specific date
export const getAttendanceStatus = (
  studentId: string, 
  date: string,
  attendanceRecords: AttendanceRecord[]
): "Present" | "Late" | "Absent" | undefined => {
  const record = attendanceRecords.find(
    (r) => r.studentId === studentId && r.date === date
  );
  
  return record?.status;
};

// Function to mark attendance for a specific student
export const markAttendance = (
  studentId: string,
  classId: string,
  status: 'Present' | 'Late' | 'Absent',
  date: string,
  attendanceRecords: AttendanceRecord[],
  userId?: string,
  canEditAttendance?: boolean,
  canTakeAttendance?: () => boolean,
  studentName?: string,
  remark?: string
) => {
  // Check if the user has permission to mark attendance
  if (!canTakeAttendance?.() && !canEditAttendance) {
    toast.error("You don't have permission to mark attendance");
    return null;
  }
  
  const existingRecordIndex = attendanceRecords.findIndex(
    (r) => r.studentId === studentId && r.date === date
  );
  
  const updatedRecords = [...attendanceRecords];
  
  if (existingRecordIndex !== -1) {
    // Update existing record
    updatedRecords[existingRecordIndex] = {
      ...updatedRecords[existingRecordIndex],
      status,
      remark: remark || updatedRecords[existingRecordIndex].remark,
      editedBy: userId,
      editedAt: new Date().toISOString()
    };
    
    toast.success(`Updated ${studentName || 'student'}'s attendance to ${status}`);
  } else {
    // Create new record
    const newRecord: AttendanceRecord = {
      id: `${studentId}-${date}`,
      studentId,
      classId,
      date,
      status,
      remark: remark || '',
      takenBy: userId || 'unknown'
    };
    
    updatedRecords.push(newRecord);
    toast.success(`Marked ${studentName || 'student'} as ${status}`);
  }
  
  return updatedRecords;
};

// Function to submit attendance for an entire class
export const submitAttendance = (
  classId: string,
  date: string,
  attendanceRecords: AttendanceRecord[],
  getStudentsForClass: (classId: string | 'all') => MockStudent[],
  markAttendanceFunc: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark?: string) => void,
  canTakeAttendance?: () => boolean
) => {
  if (!canTakeAttendance?.()) {
    toast.error("You don't have permission to take attendance");
    return false;
  }
  
  if (classId === 'all') {
    toast.error("Please select a specific class to submit attendance");
    return false;
  }
  
  const studentsInClass = getStudentsForClass(classId);
  
  // For any student without an attendance record, mark as absent
  const studentsWithoutAttendance = studentsInClass.filter(student => {
    return !attendanceRecords.some(record => 
      record.studentId === student.id && 
      record.classId === classId && 
      record.date === date
    );
  });
  
  studentsWithoutAttendance.forEach(student => {
    markAttendanceFunc(student.id, classId, 'Absent', 'Automatically marked as absent on submission');
  });
  
  toast.success(`Attendance submitted for ${studentsInClass.length} students`);
  return true;
};

// Function to get attendance history for a specific student
export const getStudentAttendanceHistory = (
  studentId: string,
  attendanceRecords: AttendanceRecord[]
) => {
  return attendanceRecords.filter((r) => r.studentId === studentId);
};

// Function to filter students based on selected class, selected student, and search term
export const filterStudents = (
  students: MockStudent[],
  selectedClass: string,
  selectedStudent: string,
  searchTerm: string,
  teacherClassIds?: string[]
) => {
  // First filter by teacher's classes if applicable
  let filtered = students;
  if (teacherClassIds && teacherClassIds.length > 0) {
    filtered = students.filter(s => s.classId && teacherClassIds.includes(s.classId));
  }
  
  // Then apply other filters
  return filtered.filter(student => {
    const matchesClass = selectedClass === 'all' || student.classId === selectedClass;
    const matchesStudent = selectedStudent === 'all' || student.id === selectedStudent;
    const matchesSearch = searchTerm === '' || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClass && matchesStudent && matchesSearch;
  });
};

// Function to get filtered attendance records
export const getFilteredAttendanceRecords = (
  attendanceRecords: AttendanceRecord[],
  selectedClass: string,
  selectedStudent: string
) => {
  return attendanceRecords.filter(record => {
    const matchesClass = selectedClass === 'all' || record.classId === selectedClass;
    const matchesStudent = selectedStudent === 'all' || record.studentId === selectedStudent;
    
    return matchesClass && matchesStudent;
  });
};
