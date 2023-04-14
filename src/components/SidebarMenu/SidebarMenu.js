import React, { useState } from 'react';
import { MdHome, MdWork, MdSettings } from 'react-icons/md';
import './SidebarMenu.module.scss';

const MenuItem = ({ icon: Icon, name, tooltip }) => {
    return (
      <div className="MenuItem">
        <Icon />
        <span>{name}</span>
        {tooltip && <div className="MenuItem-tooltip">{tooltip}</div>}
      </div>
    );
  };

const SidebarMenu = () => {
    const [fullMode, setFullMode] = useState(false);
  
    return (
      <div className={`SidebarMenu${fullMode ? ' full-mode' : ''}`}>
        <button onClick={() => setFullMode(!fullMode)}>
          {fullMode ? 'Switch to Icon Mode' : 'Switch to Full Mode'}
        </button>
        <MenuItem icon={MdHome} name="Home" tooltip="Go to the homepage" />
        <MenuItem icon={MdWork} name="Projects" tooltip="View your projects" />
        <MenuItem icon={MdSettings} name="Settings" tooltip="Change app settings" />
      </div>
    );
  };
  
  export default SidebarMenu;
  