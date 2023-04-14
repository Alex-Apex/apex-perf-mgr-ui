// components/Employee.js
import React, { useContext } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';

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
      <td>{employee.practice}</td>
      <td>{employee.seniorityLevel}</td>
      <td>{employee.name}</td>
      <td>{employee.bhid}</td>
      <td>{employee.status}</td>
      <td>{employee.firstMatch}</td>
      <td>{employee.secondaryMatch}</td>
      <td>{employee.mainSkillSet}</td>
      <td>{employee.mostRecentProject}</td>
      <td>{employee.projectRollOffDate}</td>
      <td>{employee.weeksOnBench}</td>
      <td>{employee.resumeLink}</td>
      <td>{employee.rejectionHistory}</td>
      <td>{employee.notes}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Employee;
