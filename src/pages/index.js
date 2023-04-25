// pages/index.js
import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';
import ModalScreen from '../components/ModalScreen/ModalScreen';
import Button from '../components/Button/Button';

const HomePage = () => {
  const[showModal, setShowModal] = useState(true); 

  const toggleModalScreenVisibility = () => {    
    setShowModal(!showModal);
  }

  const getModalButtons = () => {
    return(
      <div>
        <Button onClick={toggleModalScreenVisibility} primary={false} label={`Cancel`} isSubmit={false}/>
        <Button onClick={() => {console.log("BLAH");}} primary={true} label={`Add New Employee`} isSubmit={true}/>
      </div>
    );
  }

  const getAddNewEmployeeForm = () => {
    return(
      <EmployeeForm/>
    );
  }

  return (
    <div className="Home">
      <SidebarMenu/>      
      <ModalScreen isOpen={showModal} 
      children={getAddNewEmployeeForm()} title={`Adding a new employee`}
      onClose={toggleModalScreenVisibility} // Remove the parentheses
      buttons={getModalButtons()}/>
      <EmployeeList />
    </div>
  );
}

export default HomePage;
