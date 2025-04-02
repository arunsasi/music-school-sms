
import React, { useState } from 'react';
import { Student } from '@/types';
import { StudentForm } from '@/components/students/forms';
import StudentDetails from '@/components/students/StudentDetails';
import StudentClasses from '@/components/students/StudentClasses';
import StudentPayments from '@/components/students/StudentPayments';
import StudentsHeader from '@/components/students/StudentsHeader';
import StudentsList from '@/components/students/StudentsList';
import { useStudents } from '@/hooks/useStudents';
import { toast } from '@/hooks/use-toast';

const Students: React.FC = () => {
  const {
    filteredStudents,
    searchTerm,
    setSearchTerm,
    handleSort,
    addStudent,
    updateStudent,
    deleteStudent
  } = useStudents();
  
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  // State for detail views
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [isManagingClasses, setIsManagingClasses] = useState(false);
  const [isViewingPayments, setIsViewingPayments] = useState(false);
  
  const handleAddStudent = () => {
    setIsAddingStudent(true);
  };
  
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
  };
  
  const handleDeleteStudent = (id: string) => {
    try {
      deleteStudent(id);
      toast({
        title: "Student deleted",
        description: "The student has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem deleting the student. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSubmitStudent = (studentData: Omit<Student, 'id'>) => {
    addStudent(studentData);
    setIsAddingStudent(false);
  };
  
  const handleUpdateStudent = (studentData: Omit<Student, 'id'>) => {
    if (!editingStudent) return;
    
    updateStudent({ ...studentData, id: editingStudent.id });
    setEditingStudent(null);
  };
  
  const viewDetails = (student: Student) => {
    setViewingStudent(student);
    setIsViewingDetails(true);
  };
  
  const manageClasses = (student: Student) => {
    setViewingStudent(student);
    setIsManagingClasses(true);
  };
  
  const viewPayments = (student: Student) => {
    setViewingStudent(student);
    setIsViewingPayments(true);
  };
  
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <StudentsHeader onAddStudent={handleAddStudent} />
      
      <StudentsList
        students={[]}
        filteredStudents={filteredStudents}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSort={handleSort}
        handleEditStudent={handleEditStudent}
        handleDeleteStudent={handleDeleteStudent}
        viewDetails={viewDetails}
        manageClasses={manageClasses}
        viewPayments={viewPayments}
      />
      
      {isAddingStudent && (
        <StudentForm
          isOpen={isAddingStudent}
          onClose={() => setIsAddingStudent(false)}
          onSubmit={handleSubmitStudent}
        />
      )}
      
      {editingStudent && (
        <StudentForm
          isOpen={!!editingStudent}
          onClose={() => setEditingStudent(null)}
          onSubmit={handleUpdateStudent}
          initialData={editingStudent}
        />
      )}
      
      {/* Detail View Components */}
      <StudentDetails 
        student={viewingStudent}
        isOpen={isViewingDetails}
        onClose={() => setIsViewingDetails(false)}
      />
      
      <StudentClasses
        student={viewingStudent}
        isOpen={isManagingClasses}
        onClose={() => setIsManagingClasses(false)}
      />
      
      <StudentPayments
        student={viewingStudent}
        isOpen={isViewingPayments}
        onClose={() => setIsViewingPayments(false)}
      />
    </div>
  );
};

export default Students;
