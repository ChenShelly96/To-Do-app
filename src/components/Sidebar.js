import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../App.css';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Main Workspace</h3>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          <FaHome /> <span>Home</span>
        </NavLink>
      
      
      
        <h3>My Work</h3>
        <NavLink
          to="/productivity"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          <div>Productivity</div>
        </NavLink>
        </div>
    </div>
    
  );
};

export default Sidebar;
