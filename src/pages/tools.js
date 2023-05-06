import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { XLContext, XLProvider } from '../contexts/XLContext';
import Button from '@/components/Button/Button';

const LOCAL_PATH_TO_BENCH_REPORT = '/Users/alejandrogomez/Downloads/CS Bench Report.xlsx';

const ToolsContent = () => {
  const { xlData, setXLData } = useContext(XLContext);
  const fetchXLData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tools/benchxl?path=${encodeURIComponent(LOCAL_PATH_TO_BENCH_REPORT)}`);
      const xlData = await response.json();

      // Set the fetched data to the employees state in EmployeeContext
      setXLData(xlData);
    } catch (error) {
      console.error('Exception: could not find the spreadsheet: ', error);
    }
  };

  useEffect(() => {
    fetchXLData();
  }, []);
  let datum;

  if (xlData.length === 0) {
    return <p>Could not read excel spreadsheet</p>;
  } else {
    datum = Object.values(xlData[3]).reduce((acc,curr,idx) => {
      return `${acc}, ${curr}`;
    });
  }

  // Render the performance tracker, for example, as a table or list of employees
  return (
    <div>
      <h1>Tools</h1>
      <div>
        <label for="txtFilePath">Path to local file: </label>
        <input type="text" id="txtFilePath"/>
        <Button label={"Get"} primary={true}/>
      </div>
      <ul>
        <li>Email sender</li>
        <li>excel reader/loader (for bench, pipeline, others)</li>
        <li>Etc...</li>
      </ul>
      <span>{datum}</span>
      
    </div>
  );
};

const Tools = () => {
  return (
    <Layout>
      <XLProvider>
        <ToolsContent />
      </XLProvider>
    </Layout>
  );
};

export default Tools;
