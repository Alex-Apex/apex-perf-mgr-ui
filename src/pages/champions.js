import React, { useState } from 'react';
import { ChampionsContext } from '@/contexts/ChampionsContext';
import Layout from '../components/Layout/Layout';
import Button from '@/components/Button/Button';
import Modal from '@/components/ModalScreen/ModalScreen';
import DataTable from '@/components/DataTable/DataTable';
import Dropdown from '@/components/Dropdown/Dropdown';

const ChampionsFriday = () => {
  const [showMdlLogBadge, setMdlLogBadge] = useState(false);
  const columns = [{field:'FieldX', lable:'LabelX'}];
  const championsData = [{}];

  const fetchOrg = async () => {
    try {
      // TODO: Get rid of this hardcoded url
      const response = await fetch('http://localhost:3001/employees/fridaychampions');
      const championsData = await response.json();
      setChampion(championsData);
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

  /**
   * 
   */
  const getAvailableBadges = () => {
    return championsData;
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
        <DataTable id="dtblLeaderboard" 
          columns={columns} 
          data={championsData}/>
      </div>
    </Layout>
  );
};

export default ChampionsFriday;