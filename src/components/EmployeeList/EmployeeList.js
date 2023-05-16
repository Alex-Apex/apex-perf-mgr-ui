import React, { useContext, useEffect } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import Employee from '../Employee/Employee';
import styles from './EmployeeList.module.scss';

function EmployeeList({fields, employeesData}) {
  const { employees, setEmployees } = useContext(EmployeeContext);
  setEmployees(employeesData);

  if (employees.length === 0) {
    return(<p>Did not find employees</p>);
  } else {
    const employeeList = employees.map((employee, idx) => {
      return(
        <Employee id={employee.id} employee={employee}/>
      );
    });
    return (
      <div>
        <h2>All Employees</h2>
        <div className={styles.EmployeeList}>
            {employeeList}        
        </div>
      </div>
    );
  }

};

export default EmployeeList;
