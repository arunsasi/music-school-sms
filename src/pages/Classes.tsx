
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ClassForm from '@/components/ClassForm';
import ClassesTable from '@/components/classes/ClassesTable';
import ClassSchedule from '@/components/classes/ClassSchedule';
import ClassStudents from '@/components/classes/ClassStudents';
import ClassesHeader from '@/components/classes/ClassesHeader';
import ClassesFilterBar from '@/components/classes/ClassesFilterBar';
import { useClassesData } from '@/hooks/useClassesData';
import TablePagination from '@/components/common/TablePagination';

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
    MOCK_TEACHERS
  } = useClassesData();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate total pages
  const totalPages = Math.ceil(classes.length / itemsPerPage);
  
  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClasses = classes.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, subjectFilter]);
  
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
      />
      
      <div className="bg-white rounded-sm border border-stroke shadow-default">
        <ClassesTable 
          classes={currentClasses}
          teacherNames={MOCK_TEACHERS}
          onEditClass={setEditingClass}
          onDeleteClass={handleDeleteClass}
          onViewSchedule={viewSchedule}
          onManageStudents={manageStudents}
        />
        
        {totalPages > 1 && (
          <div className="border-t border-stroke py-4 px-6">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      
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
