import React from 'react';
import { EmployeeProvider } from '../contexts/EmployeeContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  
  return (
    <EmployeeProvider>
      <Component {...pageProps}/>
    </EmployeeProvider>
  );
}

export default MyApp;
