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
   * Shows or hides the Modal Screen for Logging a new Badge
   */
  const toggleShowModalLogBadge = () => {
    setMdlLogBadge(!showMdlLogBadge);
  };

  useEffect(() => {
    fetchChampionsRoster();
  },[]);


   /**
   * Extracts the column configuration of fields and labels 
   * @param {*} projects 
   * @returns 
   */
  const getDataTableConfig = (roster) => {
    /*console.log('The roster: ',roster);
    return [{field:'employee_name', label:'Employee Name'}, {field:'y', label:'y'}];
    */  
     let columns = Object.keys(roster[0]).map((field) => {
       return {field:`${field}`, label:`${toTitleCase(field)}`};
     });
     columns.push({ field: 'Actions', label:'Actions'});        
     return columns;
    
  };

  /**
   * 
   */
  const getAvailableBadges = () => {    
    return [{value:"Pro", label:'Pro'},{value:"Versatile", label:'Versatile'},{value:"Deep Diver", label:'Deep Diver'}]; //TODO: get these from DB
  };

  /**
   * Gets the form for Loging a new badge for an employee
   * @returns 
   */
  const getLogBadgeChildren = () => {
    return(
      <div>
        fields go here
        <Dropdown id="dpdnAvailableBadges"
          options={getAvailableBadges()} 
          defaultOption={'Select a badge'}
          onSelect={()=>{console.log('Not implemented')}}/>
      </div>
    );
  };

  /**
   * Returns the buttons needed for the Log Badge modal screen
   */
  const getLogBadgeButtons = () => {
    return(
      <div className='modalButtons'>
        <Button primary={false} label={'Cancel'} onClick={() => toggleShowModalLogBadge()}/>
        <Button primary={true} label={'Award Badge'} onClick={() => {console.log('Not implemented');}}/>
      </div>
    );
  };

//const columns = [{field:'employee_name', label:'Employee Name'}, {field:'y', label:'y'}];
const columns = champions && champions.length > 0 ? getDataTableConfig(champions) : [];

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
          data={champions} />
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