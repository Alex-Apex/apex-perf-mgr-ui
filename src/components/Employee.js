// components/Employee.js
import React, { useContext } from 'react';
import { EmployeeContext } from '../contexts/EmployeeContext';

function Employee({ employee }) {
  const { deleteEmployee } = useContext(EmployeeContext);

  const handleDelete = () => {
    deleteEmployee(employee.id);
  };

  const handleEdit = () => {
    // Implement the logic to show the edit form and populate it with the employee data
  };

  return (
    <tr className="Employee">
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.seniorityLevel}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Employee;
