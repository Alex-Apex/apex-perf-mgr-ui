// components/Employee.js
import React, { useContext } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import Button from '../Button/Button';
import style from './Employee.module.scss';

function Employee({ employee }) {
  const { deleteEmployee } = useContext(EmployeeContext);

  const handleDelete = () => {
    deleteEmployee(employee.id);
  };

  const handleEdit = () => {
    console.error('handle Edit is not yet implemented');
    // Implement the logic to show the edit form and populate it with the employee data
  };
  console.log(employee);
  return (
    <div className={style.employee}>
      <div>Practice: {employee.Practice}</div>
      <div>Level:{employee.Grade}</div>
      <div>Name:{employee.Name}</div>
      <div>Username:{employee.UserName}</div>
      <div>Weeks On Bench:{employee['Weeks On Bench']}</div>
      <div>
        <Button onClick={handleEdit} label='Edit' primary={true}/>        
      </div>
    </div>
  );
}

export default Employee;
