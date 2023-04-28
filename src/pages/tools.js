import React from 'react';
import Layout from '../components/Layout/Layout';

const Tools = () => {
  // Fetch the data for the performance tracker using an API call, useEffect, or context

  // Render the performance tracker, for example, as a table or list of employees
  return (
    <Layout>
      <div>
        <h1>Tools</h1>
        <ul>
          <li>Email sender</li>
          <li>excel reader/loader (for bench, pipeline, others)</li>
          <li>Etc...</li>
        </ul>
        {/* Render your performance tracker content */}
      </div>
    </Layout>
  );
};

export default Tools;