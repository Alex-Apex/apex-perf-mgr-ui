import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Modal from '@/components/ModalScreen/ModalScreen';
import Button from '@/components/Button/Button';
import DataTable from '@/components/DataTable/DataTable';


const HiringPipeline = () => {

  // Render the performance tracker, for example, as a table or list of employees
  return (
    <Layout>
      <h1>Hiring Pipeline</h1>
      <p>Here you'll add projects, their needs and suggest profiles</p>
      <Button label={'Add New Project'} primary={true} 
        isSubmit={false} onClick={() =>{console.log("y'all need to implemen this!")}}/>
      <div>More things</div>      
    </Layout>
  );
};


export default HiringPipeline;