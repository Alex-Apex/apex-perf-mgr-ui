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
/*
address: null
company_end_date: null
company_start_date: null
current_title: "CS - Practice Manager"
id: 1
location: "CDMX"
name:"Marco Mendieta"
pool_id: "MDC - Alejandro Gomez"
practice_id: 3
project_end_date: null
project_start_date: null
ps_id: null
ps_name:"Mendieta,Marco"
supervisor_id: 2
tags: null
username: "mmendieta"
*/
  return (
    <tr className="Employee">
      <td>{employee.practice_id}</td>
      <td>{employee.current_title}</td>
      <td>{employee.name}</td>
      <td>{employee.username}</td>
      <td>{employee.pool_id}</td>     
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Employee;
