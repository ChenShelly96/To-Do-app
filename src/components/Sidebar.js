import React from 'react';
import { FaHome, FaTasks } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Home</h3>
        <Link to="/">
          <FaHome /> <span>Home</span>
        </Link>
      </div>
      <div className="sidebar-section">
        <h3>My Work</h3>
        <Link to="/tasks">
          <FaTasks /> <span>My Tasks</span>
        </Link>
      </div>
     {/* <div className="sidebar-section">
        <h3>Favorites</h3>
        <Link to="/favorites">
          <FaStar /> <span>Favorites</span>
        </Link>
      </div>*/}
      <div className="project-list">
        <h3>Main Workspace</h3>
       {/* <Link to="/project">
          <div className="project-item">My Project</div>
        </Link>*/}
       
        <Link to="/productivity">
          <div className="project-item">Productivity</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
