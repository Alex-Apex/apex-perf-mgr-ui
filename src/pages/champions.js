import React, { useState, useContext, useEffect } from 'react';
import { ChampionsContext, ChampionsProvider } from '@/contexts/ChampionsContext';
import Layout from '../components/Layout/Layout';
import Button from '@/components/Button/Button';
import Modal from '@/components/ModalScreen/ModalScreen';
import DataTable from '@/components/DataTable/DataTable';
import Dropdown from '@/components/Dropdown/Dropdown';
import { toTitleCase } from '@/utils/utils';

const ChampionsFridayContent = () => {
  const { champions, setChampions } = useContext(ChampionsContext);
  const [showMdlLogBadge, setMdlLogBadge] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState();
  const [selectedChampion, setSelectedChampion] = useState();
  const [performanceEventTypes, setPerformanceEventTypes] = useState();
  const fetchChampionsRoster = async () => {
    try {
      // TODO: Get rid of this hardcoded url
      const response = await fetch('http://localhost:3001/employees/fridaychampions');
      const championsData = await response.json();      
      setChampions(championsData);      
    } catch (exception) {
      console.error('Error while fetching the champions:', exception);
    }
  };

  /**
   * 
   */
  const fetchPerformanceEventsCatalog = async () => {
    try {
      const response = await fetch('http://localhost:3001/employees/performance/events');
      const perfEvents = await response.json();
      setPerformanceEventTypes(perfEvents);
    } catch(exception){
      console.error('Error while fetching the performance event types catalog:', exception);
    }
  };

  /**
   * Shows or hides the Modal Screen for Logging a new Badge
   */
  const toggleShowModalLogBadge = () => {
    setMdlLogBadge(!showMdlLogBadge);
  };

  useEffect(() => {
    fetchPerformanceEventsCatalog();
    fetchChampionsRoster();
  },[]);


   /**
   * Extracts the column configuration of fields and labels 
   * @param {*} projects 
   * @returns 
   */
  const getDataTableConfig = (roster) => {
     let columns = Object.keys(roster[0]).map((field) => {
       return {field:`${field}`, label:`${toTitleCase(field)}`};
     });     
     return columns;
  };

  /**
   * Gets the available badges for the dropdown. 
   */
  const getAvailableBadges = () => {    
    return performanceEventTypes && performanceEventTypes.length>0 ? performanceEventTypes.map((type) => {
      return {
        value:type.id,
        label: type.name.replace('Earn ','')
      };
    }):[{value:'', label:''}]; 
  };

  /**
   * Gets the form for Loging a new badge for an employee
   * @returns 
   */
  const getLogBadgeChildren = () => {    
  
    return(      
      <div>
        <div className='formRow'>
          <label htmlFor='txtEmployeeId'> {selectedChampion && selectedChampion.id?`${selectedChampion.name}'s ID`:'Employee ID'} </label>
          <input type="text" 
            id='txtEmployeeId'
            disabled={ selectedChampion && selectedChampion.id }
            defaultValue={selectedChampion && selectedChampion.id ? selectedChampion.id : ''}/>
        </div>
        <div className='formRow'>
          <label htmlFor='pdpnAvailableBadges'>Available Badges:</label>
          <Dropdown id="dpdnAvailableBadges"
            options={getAvailableBadges()} 
            defaultOption={'Select a badge'}
            onSelect={(value) => {
              console.log(`You selected: ${value}`);
              setSelectedBadge(value);
            }}/>
        </div>
        <div className='formRow'>
          <label htmlFor='txtNotes'> Notes: </label>
          <input type="text" id='txtNotes'/>
        </div>     
        <div className='formRow'>
          <label htmlFor='txtDateOccurred'> Date Occurred: </label>
          <input type="text" id='txtDateOccurred'/>
        </div>    
      </div>
    );
  };

  const postNewManagementEvent = async(event) => {
      try {
        //TODO: don't use hardcoded urls
        const response = await fetch("http://localhost:3001/employees/performance/events", 
        { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        });   
  
        const newEvent = await response.json();
        //Set events + etc
        //setProjects([...projects, newProject]);
        toggleShowModalLogBadge();
        console.info("New Event Inserted");
      } catch(exception){
        console.error('Exception while trying to insert the new performance event: ', exception);
      }    
  };

  /**
   * Returns the buttons needed for the Log Badge modal screen
   */
  const getLogBadgeButtons = () => {
    return(
      <div className='modalButtons'>
        <Button 
          primary={false} 
          label={'Cancel'} 
          onClick={() => {
            setSelectedChampion({});
            toggleShowModalLogBadge()
          }}/>
        <Button primary={true} label={'Award Badge'} onClick={ 
          async() => {
            try{
              // create the Management Event Object
              const MgmtEvent = {
                employeeId: document.getElementById('txtEmployeeId').value,
                performanceEventTypeId: selectedBadge,
                notes: document.getElementById('txtNotes').value,
                dateOccurred: `${document.getElementById('txtDateOccurred').value}`
              };
              console.log('The event: ',MgmtEvent);
              const result = await postNewManagementEvent(MgmtEvent);
              } catch(exception) {
                console.error('There was an exception while trying to create a new Management Event', exception);
              }
          }}/>
      </div>
    );
  };

  /**
   * Inserts buttons on the column called "Actions" 
   * So user can do stuff with them. 
   * @param {*} data 
   */
  const getActionControls = (data) => {
    let dataWithControls = data;    
    if(dataWithControls[0] && !dataWithControls[0].Actions) { // have the controls previously been inserted?
      return dataWithControls.map((row,idx) => {
        if(!row.Actions){
          row.Actions = (
            <div className='ChampionActionButton'>
            <Button id={`btnAwardBadge${idx}`}
              onClick={() => {                
                setSelectedChampion(row);
                toggleShowModalLogBadge();
              }}
              primary={true}
              label={`Award Badge`}/>
          </div>
          ); 
        }
      });
    } 

    return dataWithControls;
  };

//const columns = [{field:'employee_name', label:'Employee Name'}, {field:'y', label:'y'}];
const columns = champions && champions.length > 0 ? getDataTableConfig(champions) : [];
const dataWithControls = getActionControls(champions);
  return (   
    <Layout>
      <div>
        <Modal id="mdlLogBadge" 
          title={'Award a new badge to employee'}
          isOpen={showMdlLogBadge}
          children={getLogBadgeChildren()}
          buttons={getLogBadgeButtons()}/>
        <h1>Champion's Friday</h1>
        <div>
          <Button id="btnShowLogBadge" 
          label={"Award Badge"} 
          primary={true} 
          onClick={() => {toggleShowModalLogBadge();}}/>
        </div>
        <DataTable id='dtblChampionsLeaderboard'
          columns={columns} 
          data={dataWithControls}
          defaultSortColumn={columns && columns.length>0 ? columns[0].field: null}/>
      </div>
    </Layout>
  );
};

const ChampionsFriday = () => {
  return (
    <ChampionsProvider>
      <ChampionsFridayContent/>
    </ChampionsProvider>
  );
};

export default ChampionsFriday;