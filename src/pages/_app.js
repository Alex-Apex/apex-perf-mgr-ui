import React, { useState } from 'react';
import { EmployeeProvider } from '../contexts/EmployeeContext';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <EmployeeProvider>
      <div className="App">
        <header>
          <h1>Employee Performance Tracker</h1>
          <button onClick={toggleFormVisibility}>
            {showForm ? 'Hide Form' : 'Add Employee'}
          </button>
        </header>
        {showForm && <EmployeeForm />}
        <EmployeeList />
        <Component {...pageProps} />
      </div>
    </EmployeeProvider>
  );
}

export default MyApp;
