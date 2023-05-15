import React, { useContext, useEffect, useState } from 'react';
import { BenchContext, BenchProvider } from '../contexts/BenchContext';
import Layout from '../components/Layout/Layout';
import DataTable from '@/components/DataTable/DataTable';
import EmployeeList from '@/components/EmployeeList/EmployeeList';
import ModalScreen from '../components/ModalScreen/ModalScreen';
import Button from '@/components/Button/Button';
// TODO: extract the web services url. 

const BenchReportContent = () => {
  const [showModal, setShowModal] = useState(true);
  const [showListView, setShowListView] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { bench, setBench } = useContext(BenchContext);
  let employee = {};
  let columns = [];

  /**
   * It shows the list view of the bench report for comparison.
   * It provides a better UX
   */
  const toggleListView = () => {
    console.log('Boop!');
    setShowListView(!showListView);
  };

  const handleSubmittedBenchedEmployeeChanges = async (employee) => {
    try {
      const request = {
        method : 'POST',
        headers : {'Content-Type' : 'application/json',},
        body : JSON.stringify(employee),
      };
      
      const resp = await fetch('http://localhost:3001/employees/bench',request);
      const result = await resp.json();

      if(result.employee) {
        // TODO: update this on the table
        console.log('employee', result.employee);
        setSelectedEmployee(result.employee);
      } else {
        console.error('Exception upserting employee', result.message);
      }
    } catch(exception) {
      console.error('Exception while upserting employee', exception);
    }
  };

  const handleTxtGradeChange = (x) => {

  };

  const handleTxtCompetencyChange = () => {};
  
  const getBenchEmployeeForm = () => {
    return (
      <div className='frmBenchEmployee'>
        <form onSubmit={handleSubmittedBenchedEmployeeChanges}>        
          <label>
            Grade:
            <input
              type="text"
              name="Grade"
              value={employee.Grade || ''}
              onChange={handleTxtGradeChange}
            />
          </label>
          <label>
            Competency:
            <input
              type="text"
              name="Competency"
              value={employee.Competency || ''}
              onChange={handleTxtCompetencyChange}
            />
          </label>
          <label>
            UTD Resume?:
            <input
              type="checkbox"
              name="UTDResume"
              checked={employee.UTDResume || false}
              onChange={(e) => {
                handleChange({ target: { name: e.target.name, value: e.target.checked } });
              }}
            />
          </label>
          <button type="submit">
            {employee ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
      </div>
    );
  };

  const getModalButtons = () => {
    return(
      <div>
        <Button onClick={toggleModalScreenVisibility} primary={false} label={`Cancel`} isSubmit={false}/>
        <Button onClick={() => {console.log("BLAH");}} primary={true} label={`Add New Employee`} isSubmit={true}/>
      </div>
    );
  }

  /**
   * Gets the available bench information for review.
   */
  const fetchBench = async () => {
    try {
      const response = await fetch('http://localhost:3001/employees/bench');
      const benchData = await response.json();

      // Set the fetched data to the employees state in EmployeeContext
      setBench(benchData);
    } catch (error) {
      console.error('Error fetching employees on bench:', error);
    }
  };

  const toggleModalScreenVisibility = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchBench();
  }, []);

  if (bench.length === 0) {
    return (
    <div>
      <ModalScreen isOpen={showModal} children={getBenchEmployeeForm()} title={`Add Employee to Bench`}
      onClose={toggleModalScreenVisibility} buttons={getModalButtons()}/>
      <p>The bench appears to be empty!</p>
    </div>
    );
  } else  {    
    columns = Object.keys(bench[0]).map((field) => {
      return {field:`${field}`, label:`${field}`};
    });
    columns.push({ field: 'Actions', label:'Actions'});
  }

  if(!showListView) {
    return (
      <div>
        <h1>Bench Report</h1>
        <Button label={'Add Employee to Bench'} primary={true}/>
        <Button label={'Toggle List View'} primary={false} 
          onClick={() => {console.log(`ListViewVisible:${showListView}`);toggleListView();}}/>
  
        <ModalScreen id='mdlsAddEmployee' 
          isOpen={showModal} 
          children={getBenchEmployeeForm()} 
          title={`Add Employee to Bench`}
          onClose={toggleModalScreenVisibility} 
          buttons={getModalButtons()}/>
        <DataTable id='dtBenchReport' columns={columns} data={bench} />      
      </div>
    );
  } else {
    return (
      <div>
        <h1>Bench Report</h1>
        <Button label={'Add Employee to Bench'} primary={true}/>
        <Button label={'Toggle List View'} primary={false} onClick={() => {toggleListView();}}/>
  
        <ModalScreen isOpen={showModal} children={getBenchEmployeeForm()} title={`Add Employee to Bench`}
          onClose={toggleModalScreenVisibility} buttons={getModalButtons()}/>
        <EmployeeList id='emplstBenchReport' employeesData={bench} fields={columns} />    
      </div>
    );}
};

/**
 * Finally renders the page with all components
 * @returns 
 */
const BenchReport = () => {
  return (
    <Layout>
      <BenchProvider>
        <BenchReportContent />
      </BenchProvider>
    </Layout>
  );
};

export default BenchReport;
