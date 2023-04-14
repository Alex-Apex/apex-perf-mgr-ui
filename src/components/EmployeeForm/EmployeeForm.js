// components/EmployeeForm.js
import React, { useState, useContext, useEffect } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';

function EmployeeForm({ employeeToEdit }) {
  const { addEmployee, editEmployee } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    seniorityLevel: '',
    // Add other fields as needed
  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (employeeToEdit) {
      editEmployee(employee);
    } else {
      addEmployee(employee);
      setEmployee({
        id: '',
        name: '',
        seniorityLevel: '',
        // Reset other fields as needed
      });
    }
  };

  return (
    <form className="EmployeeForm" onSubmit={handleSubmit}>
      <h2>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={employee.id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="seniorityLevel">Seniority Level:</label>
        <input
          type="text"
          id="seniorityLevel"
          name="seniorityLevel"
          value={employee.seniorityLevel}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add other input fields as needed */}
      <button type="submit">{employeeToEdit ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default EmployeeForm;
