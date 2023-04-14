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
            <th>Practice</th>
            <th>Seniority Level</th>
            <th>Employee Name</th>
            <th>BHID</th>
            <th>Status</th>
            <th>First Match</th>
            <th>Secondary Match</th>
            <th>Main Skill Set</th>
            <th>Most Recent Project</th>
            <th>Project Roll Off Date</th>
            <th>Weeks on Bench</th>
            <th>Resume Link</th>
            <th>Rejection History</th>
            <th>Notes</th>
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
