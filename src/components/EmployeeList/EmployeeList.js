import React, { useContext, useEffect } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import Employee from '../Employee/Employee';
import styles from'./EmployeeList.module.scss';

function EmployeeList() {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/employees');
      const employeesData = await response.json();
      
      // Set the fetched data to the employees state in EmployeeContext
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  if (employees.length === 0) {
    return <p>Did not find employees</p>;
  }

  return (
    <div className={styles.EmployeeList}>
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
