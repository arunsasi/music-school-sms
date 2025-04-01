
import { AttendanceRecord, Student } from '@/types';
import { toast } from 'sonner';

// Get students for selected class
export const getStudentsForClass = (classId: string | 'all', students: Student[]) => {
  if (classId === 'all') {
    return students;
  }
  return students.filter(student => student.classId === classId);
};

// Check if attendance is already taken for current class and date
export const isAttendanceTaken = (
  classId: string,
  date: string,
  attendanceRecords: AttendanceRecord[],
  getStudentsForClass: (classId: string) => Student[]
) => {
  if (classId === 'all') return false;
  
  const records = attendanceRecords.filter(
    record => record.classId === classId && record.date === date
  );
  
  const studentsInClass = getStudentsForClass(classId);
  
  return records.length >= studentsInClass.length;
};

// Get attendance status for a student on a specific date
export const getAttendanceStatus = (studentId: string, date: string, attendanceRecords: AttendanceRecord[]) => {
  const record = attendanceRecords.find(
    r => r.studentId === studentId && r.date === date
  );
  return record ? record.status : undefined;
};

// Mark attendance function
export const markAttendance = (
  studentId: string,
  classId: string,
  status: 'Present' | 'Late' | 'Absent',
  currentDate: string,
  attendanceRecords: AttendanceRecord[],
  userId: string | undefined,
  canEditAttendance: boolean,
  canTakeAttendance: () => boolean,
  studentName: string,
  remark: string = ''
) => {
  if (!canTakeAttendance()) {
    toast.error("Attendance can only be taken for the current day");
    return null;
  }

  // Check if there's an existing record for this student on this date
  const existingRecordIndex = attendanceRecords.findIndex(
    record => record.studentId === studentId && record.date === currentDate && record.classId === classId
  );

  let updatedRecords = [...attendanceRecords];

  if (existingRecordIndex !== -1) {
    // Update existing record
    
    // If not admin/accounts, prevent editing
    if (!canEditAttendance && updatedRecords[existingRecordIndex].takenBy !== userId) {
      toast.error("You don't have permission to edit this attendance record");
      return null;
    }
    
    updatedRecords[existingRecordIndex] = {
      ...updatedRecords[existingRecordIndex],
      status,
      remark,
      editedBy: userId,
      editedAt: new Date().toISOString()
    };
  } else {
    // Create new record
    const newRecord: AttendanceRecord = {
      id: `${Date.now()}`,
      studentId,
      classId,
      date: currentDate,
      status,
      remark,
      takenBy: userId || '0'
    };
    updatedRecords = [...attendanceRecords, newRecord];
  }

  // Show toast notification
  toast.success(`Marked ${status} for ${studentName}`);
  
  return updatedRecords;
};

// Submit attendance for a class
export const submitAttendance = (
  classId: string,
  currentDate: string,
  attendanceRecords: AttendanceRecord[],
  getStudentsForClass: (classId: string) => Student[],
  markAttendanceHandler: (studentId: string, classId: string, status: 'Present' | 'Late' | 'Absent', remark: string) => void,
  canTakeAttendance: () => boolean
) => {
  if (!canTakeAttendance()) {
    toast.error("Attendance can only be taken for the current day");
    return false;
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
      markAttendanceHandler(student.id, classId, 'Absent', 'Marked absent by default on submission');
    });
  }
  
  toast.success("Attendance submitted successfully");
  return true;
};

// Get the student's attendance history
export const getStudentAttendanceHistory = (studentId: string, attendanceRecords: AttendanceRecord[]) => {
  return attendanceRecords
    .filter(record => record.studentId === studentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Filter students based on selected class and search term
export const filterStudents = (
  students: Student[],
  selectedClass: string,
  selectedStudent: string,
  searchTerm: string
) => {
  return students.filter(student => {
    const matchesClass = selectedClass === "all" || student.classId === selectedClass;
    const matchesStudent = selectedStudent === "all" || student.id === selectedStudent;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClass && matchesStudent && matchesSearch;
  });
};

// Get all attendance records filtered by date and/or class
export const getFilteredAttendanceRecords = (
  attendanceRecords: AttendanceRecord[],
  selectedClass: string,
  selectedStudent: string
) => {
  return attendanceRecords
    .filter(record => {
      const matchesClass = selectedClass === "all" || record.classId === selectedClass;
      const matchesStudent = selectedStudent === "all" || record.studentId === selectedStudent;
      
      return matchesClass && matchesStudent;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
