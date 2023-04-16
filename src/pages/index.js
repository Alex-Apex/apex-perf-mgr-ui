// pages/index.js
import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';
import ModalScreen from '../components/ModalScreen/ModalScreen';

const HomePage = () => {
  let showModal = false;
  const toggleModalScreenVisibility =()=>{
    showModal = !showModal;
  }

  return (
    <div className="Home">
      <SidebarMenu/>
      <button onClick={toggleModalScreenVisibility()}>Add New Employee</button>
      <ModalScreen isOpen={showModal} 
        children={<EmployeeForm/>} 
        title={`Adding a new employee`} 
        onClose={console.log(`Closed`)}>
      </ModalScreen>
      <EmployeeList />
    </div>
  );
}

export default HomePage;
