// components/EmployeeList.js
import React, { useContext } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import Employee from '../Employee/Employee';

function EmployeeList() {
  const { employees } = useContext(EmployeeContext);

  if (employees.length === 0) {
    return <p>No employees found. huh!?</p>;
  }

  return (
    <div className="EmployeeList">
      <table>
        <caption>These are your employees</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Seniority Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <Employee key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;