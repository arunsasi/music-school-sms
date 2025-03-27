
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ClassForm from '@/components/ClassForm';
import ClassesTable from '@/components/classes/ClassesTable';
import ClassSchedule from '@/components/classes/ClassSchedule';
import ClassStudents from '@/components/classes/ClassStudents';
import ClassesHeader from '@/components/classes/ClassesHeader';
import ClassesFilterBar from '@/components/classes/ClassesFilterBar';
import { useClassesData } from '@/hooks/useClassesData';

const Classes: React.FC = () => {
  const { 
    classes,
    loading, 
    error,
    searchTerm,
    setSearchTerm,
    isAddingClass,
    setIsAddingClass,
    editingClass,
    setEditingClass,
    subjectFilter,
    setSubjectFilter,
    viewingClass,
    isViewingSchedule,
    setIsViewingSchedule,
    isManagingStudents,
    setIsManagingStudents,
    handleAddClass,
    handleUpdateClass,
    handleDeleteClass,
    viewSchedule,
    manageStudents,
    handleUpdateClassStudents,
    MOCK_SUBJECTS,
    MOCK_TEACHERS
  } = useClassesData();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <div className="music-bars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="ml-3">Loading classes...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-error-500 mb-4">Error loading classes</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <ClassesHeader onAddClass={() => setIsAddingClass(true)} />
      
      <ClassesFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        subjects={MOCK_SUBJECTS}
      />
      
      <ClassesTable 
        classes={classes}
        teacherNames={MOCK_TEACHERS}
        onEditClass={setEditingClass}
        onDeleteClass={handleDeleteClass}
        onViewSchedule={viewSchedule}
        onManageStudents={manageStudents}
      />
      
      {isAddingClass && (
        <ClassForm
          isOpen={isAddingClass}
          onClose={() => setIsAddingClass(false)}
          onSubmit={handleAddClass}
        />
      )}
      
      {editingClass && (
        <ClassForm
          isOpen={!!editingClass}
          onClose={() => setEditingClass(null)}
          onSubmit={handleUpdateClass}
          initialData={editingClass}
        />
      )}
      
      <ClassSchedule 
        classData={viewingClass}
        isOpen={isViewingSchedule}
        onClose={() => setIsViewingSchedule(false)}
      />
      
      <ClassStudents
        classData={viewingClass}
        isOpen={isManagingStudents}
        onClose={() => setIsManagingStudents(false)}
        onUpdate={handleUpdateClassStudents}
      />
    </div>
  );
};

export default Classes;
