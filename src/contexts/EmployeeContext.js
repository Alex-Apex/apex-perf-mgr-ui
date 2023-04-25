import React, { createContext, useState } from 'react';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const editEmployee = (updatedEmployee) => {
    const newEmployees = employees.map((employee) => (
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
    setEmployees(newEmployees);
  };

  const deleteEmployee = (employeeId) => {
    const newEmployees = employees.filter((employee) => employee.id !== employeeId);
    setEmployees(newEmployees);
  };

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee, editEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
