import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { XLContext, XLProvider } from '../contexts/XLContext';
import Button from '@/components/Button/Button';
import DataTable from '@/components/DataTable/DataTable';

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
  let columns;
  if (xlData.length === 0) {
    return <p>Could not read excel spreadsheet</p>;
  } else {
    
    columns = Object.values(xlData[3]).map((field) => {
      return {field:`${field}`, label:`${field}`};
    });
    
    //console.log(xlData);
    datum = xlData.filter((row,idx,arr) => { //Removing title rows and empty rows
      return !isNaN(row.__EMPTY_1);
    })
    .map((row) =>{ //standardize the rows
      let newRow = {};
      return columns.map((col,idx) => {
        const colExpression = idx === 0? '__EMPTY': `__EMPTY_${idx}`;        
        return newRow[colExpression] = row[colExpression]? row[colExpression]: null;
        
      });
    })
    .map((row) => {
      console.log(row);
      let empObj = {};
      const emp = Object.values(row).map((val, idx)=>{
        empObj[columns[idx].field] = val; 
      });
      return empObj;      
    });
    console.log('The Datum: ',datum);
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
      <DataTable columns={columns} data={datum}/>
      
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
