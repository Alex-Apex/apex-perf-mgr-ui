import React, { useContext, useEffect } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import DataTable from '../DataTable/DataTable';
import styles from './EmployeeList.module.scss';

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
    
  const columns = [
    { field: 'practice_id', label: 'Practice ID' },
    { field: 'current_title', label: 'Seniority Level' },
    { field: 'name', label: 'Name' },
    { field: 'username', label: 'Username' },
    { field: 'pool_id', label: 'Pool ID' },
    // Add an additional column for the Actions, if needed
  ];

  return (
    <div className={styles.EmployeeList}>
      <h2>All Employees</h2>
      <DataTable columns={columns} data={employees} />
    </div>
  );
}

export default EmployeeList;
