
import React, { useState } from 'react';
import { Employee } from '@/types';
import EmployeeForm from '@/components/EmployeeForm';
import EmployeesHeader from '@/components/employees/EmployeesHeader';
import EmployeesFilters from '@/components/employees/EmployeesFilters';
import EmployeesTable from '@/components/employees/EmployeesTable';
import { useEmployees } from '@/hooks/useEmployees';

const Employees: React.FC = () => {
  const {
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    handleSort,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployees();
  
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  
  const handleAddEmployee = () => {
    setIsAddingEmployee(true);
  };
  
  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };
  
  const handleDeleteEmployee = (id: string) => {
    deleteEmployee(id);
  };
  
  const handleSubmitEmployee = (employeeData: Omit<Employee, 'id'>) => {
    addEmployee(employeeData);
    setIsAddingEmployee(false);
  };
  
  const handleUpdateEmployee = (employeeData: Omit<Employee, 'id'>) => {
    if (!editingEmployee) return;
    
    updateEmployee({ ...employeeData, id: editingEmployee.id });
    setEditingEmployee(null);
  };
  
  return (
    <div className="space-y-6">
      <EmployeesHeader onAddEmployee={handleAddEmployee} />
      
      <EmployeesFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <EmployeesTable 
        filteredEmployees={filteredEmployees}
        handleSort={handleSort}
        handleEditEmployee={handleEditEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
      />
      
      {isAddingEmployee && (
        <EmployeeForm
          isOpen={isAddingEmployee}
          onClose={() => setIsAddingEmployee(false)}
          onSubmit={handleSubmitEmployee}
        />
      )}
      
      {editingEmployee && (
        <EmployeeForm
          isOpen={!!editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSubmit={handleUpdateEmployee}
          initialData={editingEmployee}
        />
      )}
    </div>
  );
};

export default Employees;
