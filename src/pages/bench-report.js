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
    setShowListView(!showListView);
  };
  
  /**
   * The bench has a history of events which can be logged with this form
   */
  const getBenchEventForm = () => {
    return (
      <div>
        <div className='formRow'>
          <label htmlFor='txtEmployeeId'>Employee Id:</label>
          <input type="text" id='txtEmployeeId'/>
        </div>
        <div className='formRow'>
          <label htmlFor='txtBenchStatusMode'> Bench Event Status Mode: </label>
          <input type="text" id='txtBenchStatusMode'/>
        </div>
        <div className='formRow'>
          <label htmlFor='txtEventNotes'>Notes: </label>
          <input type="text" id='txtEventNotes'/>
        </div>
      </div>
    );
  };
  
  const postBenchEvent = async(event) => {
    try {
      //TODO: don't use hardcoded urls
      const response = await fetch("http://localhost:3001/employees/bench/events", 
      { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });   

      const newBenchEvent = await response.json();
      //setProjects([...projects, newProject]);
      toggleModalScreenVisibility();
      if(response.status!== 200){
        console.error(response.status,newBenchEvent);
      } else {
        console.info("New Project created successfully");
      }

    } catch(exception){
      console.error('Exception while trying to create the new project: ', exception);
    }
  };
  /**
   * Logs the bench event in the database.
   */
  const logBenchEvent = async() => {
    try{
      const event = {
        employeeId: document.getElementById('txtEmployeeId').value,
        statusModeName: document.getElementById('txtBenchStatusMode').value,
        notes: document.getElementById('txtEventNotes').value,
      };
      const result = await postBenchEvent(event); //TODO: Then what with this result?
    } catch(exception) {
      console.error('There was an exception while trying to log the new event', exception);
    }   
  };

  /**
   * Gets the action buttons for the BenchEvent Forms
   * @returns 
   */
  const getModalButtons = () => {
    return(
      <div>
        <Button onClick={toggleModalScreenVisibility} primary={false} label={`Cancel`} isSubmit={false}/>
        <Button onClick={() => {logBenchEvent();}} 
          primary={true} 
          label={`Log Bench Event`} 
          isSubmit={false}
        />
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

  /**
   * 
   * @returns the modal screen to log new bench events
   */
  const getLogNewEventModalScreen = () => {
    return (
      <div>
      <h1>Bench Report</h1>
      <Button label={'Log new bench event'} primary={true} onClick={toggleModalScreenVisibility}/>
      <Button label={'Toggle List View'} primary={false} 
        onClick={() => {console.log(`ListViewVisible:${showListView}`);toggleListView();}}/>
      <ModalScreen id='mdlsLogBenchEvent' 
        isOpen={showModal}
        children={getBenchEventForm()}
        title={`Log New Bench Event`}
        onClose={toggleModalScreenVisibility} 
        buttons={getModalButtons()}/>
    </div>
    );
  };
  // TODO This is nasty code. please un-spaghetti it
  // TODO can this be a component? (local component?)

  if (bench.length === 0) {
    return (
    <div>
      {getLogNewEventModalScreen()}
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
        {getLogNewEventModalScreen()}
        <DataTable id='dtBenchReport' columns={columns} data={bench} />      
      </div>
    );
  } else {
    return (
      <div>
        {getLogNewEventModalScreen()}
        <EmployeeList id='emplstBenchReport' employeesData={bench} fields={columns} />    
      </div>
    );
  }
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
