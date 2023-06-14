import React, { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '@/contexts/EmployeeContext';
import Layout from '../components/Layout/Layout';
import OrganizationalTree from '@/components/OrganizationalTree/OrganizationalTree';
import Button from '@/components/Button/Button';
import Modal from '@/components/ModalScreen/ModalScreen';

const OrganizationalView = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const[showModal, setShowModal] = useState(false);
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
    return <h1>Did not find employees</h1>;
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

  const toggleCaptureEmployeeForm = () => {
    setShowModal(!showModal);
  };

  const postEmployee = async (emp) => {
    try {
      const response = await fetch("http://localhost:3001/employees", 
      { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emp),
      });   

      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]);
      toggleCaptureEmployeeForm();
      console.info("Employee created successfully");
    } catch(error) {
      console.error("Error creating employee:", error);
    }  
  };

  /**
   * 
   */
  const getEmployeeModalButtons = () => {
    return(
      <div>
        <Button id='btnCancel' label={'Cancel'} primary={false} onClick={()=>{toggleCaptureEmployeeForm();}}/>
        <Button id='btnCreate' label={'Create Employee'} primary={true} onClick={ async () => {
          try {
            const employeeData = {
              employeeName: document.getElementById("txtName").value,
              employeeTitle: document.getElementById("txtTitle").value,
              apexUsername: document.getElementById("txtUsername").value,
              supervisorName: document.getElementById("txtSupervisorName").value,
              practiceName: document.getElementById("txtPracticeName").value,
              poolId: document.getElementById("txtPoolName").value,
            };
            const result = await postEmployee(employeeData); //TODO: then what with the result?
          } catch (exception) {
            console.error("Something blew up!", exception);
            //TODO: implement better exception handling
          }
          }}/>
      </div>
    );
  };

  /**
   * 
   * @returns 
   */
  const getCaptureEmployeeFormFields = () => {
    return(
      <div className='EmployeeForm'>
        <div className='formRow'>        
          <label htmlFor='txtName'> Name: </label>
          <input type="text" id='txtName'/>
        </div>
        <div className='formRow'>
          { 
          //* TODO replace this with a drop down control*/
          }          
          <label htmlFor="txtTitle"> Title: </label>
          <input type="text" id='txtTitle'/>
        </div>
        <div className='formRow'>             
          <label htmlFor="txtUsername"> Apex Username: </label>
          <input type="text" id='txtUsername'/>
        </div>
        <div className='formRow'>          
          <label htmlFor="txtSupervisorName"> Supervisor Name: </label>
          <input type="text" id='txtSupervisorName' defaultValue={selectedEmployee ? selectedEmployee.name: ''}/>
        </div>
        <div className='formRow'>
          {
            //Relace this with a dropdown
          }                  
          <label htmlFor="txtPracticeName"> Practice Name: </label>
          <input type="text" id='txtPracticeName'/>
        </div>
        <div className='formRow'>          
          <label htmlFor="txtPoolName"> Pool Name: </label>
          <input type="text" id='txtPoolName'/>
        </div>
      </div>
    );
  };

  /**
   * selects a particular candidate as provided by the parameter. 
   * Should the employee be different then the previous employee is 
   * replaced witht his new one. If it is the same candidate then the 
   * selection becomes null (it gets toggled)
   * @param {*} employee 
   */
  const toggleSelectedEmployee = (employee) => {
    const empId = employee.data.id;
    const selEmpId = selectedEmployee ? selectedEmployee.id : -1;
    console.log('comparing: Employee:',empId, 'selected emp: ',selEmpId);

    if(empId === selEmpId) {
      setSelectedEmployee(undefined);
      console.log(`${employee.data.name} has been unselected.`);
    } else {
      setSelectedEmployee(employee.data);
      console.log(`${employee.data.name} Is now selected.`);
    }
  };
  

    return (
      <Layout>
        <Modal isOpen={showModal} 
          buttons={getEmployeeModalButtons()} 
          children={getCaptureEmployeeFormFields()} 
          title={'Add new employee'}/>
        <h1>Digital Products Organization</h1>
        <div>          
          {
            selectedEmployee ? (
              <Button id="btnShowAddEmpModal" 
                label={`Selected ${selectedEmployee.name}`}
                primary={true}
                onClick={toggleCaptureEmployeeForm}/>
            ): null
          }
          Features:
          <ul>
            <li>controls to toggle employee baseball cards and edit employees</li>            
            <li>toggle $ view, perf view, promos view, workload heatmap by supervisor</li>            
          </ul>
        </div>
        <OrganizationalTree 
          data={employeeTree} 
          employeeClickHandler={(employee) => {toggleSelectedEmployee(employee);}}
          />
    </Layout>
  );
};

export default OrganizationalView;