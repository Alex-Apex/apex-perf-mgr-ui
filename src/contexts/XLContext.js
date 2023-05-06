import React, { createContext, useState } from 'react';

const XLContext = createContext();
const XLProvider = ({ children }) => {
  const [xlData, setXLData] = useState([]);

  const addXLData= (data) => {
    setXLData([...xlData, data]);
  };

  const editXLData= (updatedData) => {
    const newXLData = xlData.map((data) => (
      //this is Bullshit code here do not use it
      data.id === updatedData.id ? updatedData : data
    ));
    setXLData(newXLData);
  };

  const deleteXLData= (dataId) => {
    const newXLData = data.filter((data) => data.id !== dataId);
    setXLData(newXLData);
  };

  return (
    <XLContext.Provider value={{ xlData, setXLData, addXLData, editXLData, deleteXLData }}>
      {children}
    </XLContext.Provider>
  );
};

export { XLContext, XLProvider };
