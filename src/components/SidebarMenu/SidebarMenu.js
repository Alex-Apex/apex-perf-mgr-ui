import React, { useState } from 'react';
import { MdHome, MdWork, MdSettings } from 'react-icons/md';
import styles from './SidebarMenu.module.scss';

const MenuItem = ({ icon: Icon, name, tooltip }) => {
    return (
      <div className={styles.MenuItem}>
        <Icon />
        <span>{name}</span>
        {tooltip && <div className={styles.SidebarMenuTooltip}>{tooltip}</div>}
      </div>
    );
  };

const SidebarMenu = () => {
    const [fullMode, setFullMode] = useState(false);
  
    return (
      <div className={ fullMode ? styles.fullMode: styles.SidebarMenu }>
        <h2>Apex Performance Tracker</h2>
        <button onClick={() => setFullMode(!fullMode)}>
          {fullMode ? 'Switch to Icon Mode' : 'Switch to Full Mode'}
        </button>
        <MenuItem icon={MdHome} name="Performance Tracker" tooltip="Go to the performance Tracker" />
        <MenuItem icon={MdWork} name="Bench Report" tooltip="View your projects" />
        <MenuItem icon={MdSettings} name="Hiring Pipeline" tooltip="Current hiring Pipeline" />
        <MenuItem icon={MdSettings} name="OrganizationalView" tooltip="Your Org" />
        <MenuItem icon={MdSettings} name="Playbook" tooltip="Go to your Play Book" />
      </div>
    );
  };
  
  export default SidebarMenu;
  