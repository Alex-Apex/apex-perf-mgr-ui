import React, { useState } from 'react';
import { EmployeeProvider } from '../contexts/EmployeeContext';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';
import SidebarMenu from '@/components/SidebarMenu/SidebarMenu';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <EmployeeProvider>
      <div className="App">                
        <SidebarMenu/>        
        <div className='capture'>
        {showForm && <EmployeeForm />}
          <Component {...pageProps} />
        </div>
        <div className='datatable'>
          <EmployeeList />
        </div>
      </div>
    </EmployeeProvider>
  );
}

export default MyApp;
