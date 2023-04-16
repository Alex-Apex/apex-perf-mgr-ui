// components/EmployeeForm.js
import React, { useState, useContext, useEffect } from 'react';
import { EmployeeContext } from '../../contexts/EmployeeContext';
import EmployeeCard from '../EmployeeCard/EmployeeCard';

function EmployeeForm({ employeeToEdit }) {
  const { addEmployee, editEmployee } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState({
    id: '',        
    name: '',        
    seniorityLevel:'',        
    practice: '',        
    bhid:'',
    status: '',        
    firstMatch: '',        
    secondaryMatch:'',        
    mainSkillSet:'',
    mostRecentProject: '',
    projectRollOffDate: '',
    weeksOnBench: '',        
    resumeLink: '',
    rejectionHistory:'',        
    notes:'',    
  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (employeeToEdit) {
      editEmployee(employee);
    } else {
      addEmployee(employee);
      setEmployee({
        id: '',        
        name: '',        
        seniorityLevel:'',        
        practice: '',        
        bhid:'',
        status: '',        
        firstMatch: '',        
        secondaryMatch:'',        
        mainSkillSet:'',
        mostRecentProject: '',
        projectRollOffDate: '',
        weeksOnBench: '',        
        resumeLink: '',
        rejectionHistory:'',        
        notes:'',   
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
        <EmployeeCard employee={employee}/>
        <input type="text" name="id" value={employee.id} placeholder="Employee ID" onChange={handleChange}/>
        <input type="text" name="name" value={employee.name} placeholder="Employee Name" onChange={handleChange}/>        
        <input type="text" name="practice" value={employee.practice} placeholder="Practice" onChange={handleChange}/>
        <input type="text" name="bhid" value={employee.bhid} placeholder="BHID" onChange={handleChange}/>
        <input type="text" name="status" value={employee.status} placeholder="Status" onChange={handleChange}/>
        <input type="text" name="firstMatch" value={employee.firstMatch} placeholder="First project Match" onChange={handleChange}/>
        <input type="text" name="secondaryMatch" value={employee.secondaryMatch} placeholder="Second project match" onChange={handleChange}/>
        <input type="text" name="seniorityLevel" value={employee.seniorityLevel} placeholder="Seniority Level" onChange={handleChange}/>
        <input type="text" name="mainSkillSet" value={employee.mainSkillSet} placeholder="Main Skillset" onChange={handleChange}/>
        <input type="text" name="mostRecentProject" value={employee.mostRecentProject} placeholder="Most Recent Project" onChange={handleChange}/>
        <input type="text" name="projectRollOffDate" value={employee.projectRollOffDate} placeholder="project Roll Off date" onChange={handleChange}/>
        <input type="text" name="weeksOnBench" value={employee.weeksOnBench} placeholder="Number of weeks on Bench" onChange={handleChange}/>
        <input type="text" name="resumeLink" value={employee.resumeLink} placeholder="link to resume document" onChange={handleChange}/>
        <input type="text" name="rejectionHistory" value={employee.rejectionHistory} placeholder="Rejection History" onChange={handleChange}/>
        <input type="text" name="notes" value={employee.notes} placeholder="Notes" onChange={handleChange}/>
        
        {/* <button type="submit">{employeeToEdit ? 'Update' : 'Add'} Employee</button> */}
      </form>
    );
  }

export default EmployeeForm;
