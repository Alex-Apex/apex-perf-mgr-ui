import React, { createContext, useState } from 'react';

const BenchContext = createContext();
const BenchProvider = ({ children }) => {
  const [bench, setBench] = useState([]);

  const addBench= (employee) => {
    setBench([...bench, employee]);
  };

  const editBench= (updatedEmployee) => {
    const newBench = bench.map((employee) => (
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
    setBench(newBench);
  };

  const deleteBench= (employeeId) => {
    const newBench = bench.filter((employee) => employee.id !== employeeId);
    setBench(newBench);
  };

  return (
    <BenchContext.Provider value={{ bench, setBench, addBench, editBench, deleteBench }}>
      {children}
    </BenchContext.Provider>
  );
};

export { BenchContext, BenchProvider };
