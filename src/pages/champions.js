import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Button from '@/components/Button/Button';
import Modal from '@/components/ModalScreen/ModalScreen';
import DataTable from '@/components/DataTable/DataTable';
import Dropdown from '@/components/Dropdown/Dropdown';

const ChampionsFriday = () => {
  const [showMdlLogBadge, setMdlLogBadge] = useState(false);
  const columns = [{field:'FieldX', lable:'LabelX'}];
  const championsData = [{}];

  /**
   * Shows or hides the Modal Screen for Logging a new Badge
   */
  const toggleShowModalLogBadge = () => {
    setMdlLogBadge(!showMdlLogBadge);
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
          options={getAvailableBadges} 
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
        <Button primary={false} title={'Cancel'} onClick={() => toggleShowModalLogBadge()}/>
        <Button primary={false} title={'Award Badge'} onClick={() => {console.log('Not implemented');}}/>
      </div>
    );
  };


  return (
    <Layout>
      <div>
        <Modal id="mdlLogBadge" 
          title={'Award a new badge to employee'} 
          children={getLogBadgeChildren}
          buttons={getLogBadgeButtons}/>
        <h1>Champion's Friday</h1>
        <div><Dropdown id="dpdnAvailableBadges"
          options={['op1','op2','op3']} 
          defaultOption={'Select a badge'}
          onSelect={()=>{console.log('Not implemented')}}/></div>
        <DataTable id="dtblLeaderboard" 
          columns={columns} 
          data={championsData}/>
      </div>
    </Layout>
  );
};

export default ChampionsFriday;