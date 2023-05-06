import React, { useContext, useEffect } from 'react';
import { EmployeeContext } from '@/contexts/EmployeeContext';
import Layout from '../components/Layout/Layout';
import OrganizationalTree from '@/components/OrganizationalTree/OrganizationalTree';

const OrganizationalView = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const fetchEmployees = async () => {
    try {
      // TODO: Get rid of this hardcoded url
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

  /**
   * 
   * @param {*} employees 
   * @returns 
   */
  function generateEmployeeTree(employees) {    
    const employeeMap = new Map();
    
    // First, create a map of employees keyed by their employee_id
    employees.forEach(employee => {
      employee.children = [];
      employeeMap.set(employee.id, employee);
    });
  
    // Then, assign subordinates to their respective supervisors
    employees.forEach(employee => {      
      const supervisor = employeeMap.get(employee.supervisor_id);
      if (supervisor) {          
        supervisor.children.push(employee);
      }
    });
  
    // Finally, find and return the root employee (the one with supervisor_id equal to their employee_id)
    return employees.find(employee => employee.id === 2);
  }
    
  const employeeTree = generateEmployeeTree(employees);

  return (
    <Layout>
      <div>
        <h1>Digital Products Organization</h1>
        <OrganizationalTree data={employeeTree} />
      </div>
    </Layout>
  );
};

export default OrganizationalView;