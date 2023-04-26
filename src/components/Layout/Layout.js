import React from 'react';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

const Layout = ({ children }) => {
  return (
    <div className="Home">
      <SidebarMenu/>    
      <main>{children}</main>
    </div>
  );
};

export default Layout;
