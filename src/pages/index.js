// pages/index.js
import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';

function HomePage() {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="Home">
      <header>
        <h1>Performance Tracker</h1>
        <button onClick={toggleFormVisibility}>
          {showForm ? 'Hide Form' : 'Add Employee'}
        </button>
      </header>
      {showForm && <EmployeeForm />}
      <EmployeeList />
    </div>
  );
}

export default HomePage;
