// components/EmployeeList.js
import React, { useContext } from 'react';
import { EmployeeContext } from '../contexts/EmployeeContext';
import Employee from './Employee';

function EmployeeList() {
  const { employees } = useContext(EmployeeContext);

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="EmployeeList">
      <h2>Employees</h2>
      <table>
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
