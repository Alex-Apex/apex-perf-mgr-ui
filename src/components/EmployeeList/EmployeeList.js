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
            <th>Practice ID</th>
            <th>Seniority Level</th>
            <th>Name</th>
            <th>Username</th>
            <th>Pool ID</th>            
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
