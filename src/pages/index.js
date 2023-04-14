// pages/index.js
import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';

function HomePage() {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="Home">
        {showForm && <EmployeeForm />}
      <button onClick={toggleFormVisibility}>
        {showForm ? 'Hide Form' : 'Add Employee'}
      </button>
    </div>
  );
}

export default HomePage;
