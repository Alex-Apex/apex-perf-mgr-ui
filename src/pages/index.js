// pages/index.js
import React, { useState } from 'react';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';
import ModalScreen from '../components/ModalScreen/ModalScreen';
import Button from '../components/Button/Button';

const HomePage = () => {

  return (
    <div className="Home">
      <SidebarMenu/>      
      <h1>My Dashboard should go here</h1>
    </div>
  );
}

export default HomePage;
