import React, { useContext, useEffect } from 'react';
import { BenchContext, BenchProvider } from '../contexts/BenchContext';
import Layout from '../components/Layout/Layout';
import DataTable from '@/components/DataTable/DataTable';

const BenchReportContent = () => {
  const { bench, setBench } = useContext(BenchContext);
  const fetchBench = async () => {
    try {
      const response = await fetch('http://localhost:3001/employees/bench');
      const benchData = await response.json();

      // Set the fetched data to the employees state in EmployeeContext
      setBench(benchData);
    } catch (error) {
      console.error('Error fetching employees on bench:', error);
    }
  };

  useEffect(() => {
    fetchBench();
  }, []);

  if (bench.length === 0) {
    return <p>The bench appears to be empty!</p>;
  }

  const columns = [
    { field: 'EmpID', label: 'Employee ID' },
    { field: 'Practice', label:'Practice' },
    { field: 'Name', label: 'Name' },
    { field: 'UserName', label: 'Username' },
    { field: 'Status', label: 'Bench Status' },
    { field: 'OnBenchSince', label: 'On Bench Since' },
    // Add an additional column for the Actions, if needed
    // Add a colum for weeks on bench
  ];

  return (
    <div>
      <h1>Bench Report</h1>
      <DataTable columns={columns} data={bench} />
      {/* Render your bench report here */}
    </div>
  );
};

const BenchReport = () => {
  return (
    <Layout>
      <BenchProvider>
        <BenchReportContent />
      </BenchProvider>
    </Layout>
  );
};

export default BenchReport;
