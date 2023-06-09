import React, { useState } from 'react';
import { MdHome, MdWork, MdSettings, MdDiversity2, MdOutlineList, MdQueryStats, MdTravelExplore, MdSports } from 'react-icons/md';
import Link from 'next/link';
import styles from './SidebarMenu.module.scss';

const MenuItem = ({ icon: Icon, name, tooltip, href }) => {
  return (
    <Link href={href}>      
        <div className={styles.MenuItem}>
          <Icon />
          <span>{name} </span>
          {tooltip && <div className={styles.SidebarMenuTooltip}>{tooltip}</div>}
        </div>      
    </Link>
  );
};


const SidebarMenu = () => {
    const [fullMode, setFullMode] = useState(true);
  
    return (
      <div className={ fullMode ? styles.fullMode: styles.SidebarMenu }>
        <h2 className="SidebarTitle">Apex PerfMan</h2>
        <button className="SidebarButton" onClick={() => setFullMode(!fullMode)}>
          {fullMode ? 'Switch to Icon Mode' : 'Switch to Full Mode'}
        </button>
        <MenuItem icon={MdHome} name="Home" tooltip="Go Home" href="/" />
        <MenuItem icon={MdDiversity2} name="My Organization" tooltip="Your Org" href="/organizational-view" />
        <MenuItem icon={MdQueryStats} name="Performance Tracker" tooltip="Go to the performance Tracker" href="/performance-tracker" />
        <MenuItem icon={MdWork} name="Bench Report" tooltip="View your projects" href="/bench-report" />
        <MenuItem icon={MdOutlineList} name="Hiring Pipeline" tooltip="Current hiring Pipeline" href="/hiring-pipeline" />
        <MenuItem icon={MdSports} name="Playbook" tooltip="Go to your Play Book" href="/playbook" />
        <MenuItem icon={MdTravelExplore} name="SkillTree" tooltip="Go to Skill Tree App" href="/skill-tree" />
        <MenuItem icon={MdWork} name="My Tools" tooltip="Go to your hacky tools" href="/tools" />
        <MenuItem icon={MdWork} name="Champion's Friday" tooltip="Tools and Stats for Champion's Friday" href="/champions" />

      </div>
    );
  };
  
  export default SidebarMenu;
  