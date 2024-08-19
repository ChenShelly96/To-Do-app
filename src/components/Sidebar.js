import React from 'react';
import { FaHome, FaStar, FaTasks } from 'react-icons/fa';
import '../App.css';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Home</h3>
        <FaHome /> <span>Home</span>
      </div>
      <div className="sidebar-section">
        <h3>My Work</h3>
        <FaTasks /> <span>My Tasks</span>
      </div>
      <div className="sidebar-section">
        <h3>Favorites</h3>
        <FaStar /> <span>Favorites</span>
      </div>
      <div className="project-list">
        <h3>Main Workspace</h3>
        <div className="project-item">My Project</div>
      </div>
    </div>
  );
};

export default Sidebar;
