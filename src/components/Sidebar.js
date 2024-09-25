import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../App.css';
import '../styles/Header.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f8f9fa' }}>
      <NavLink className="navbar-brand" to="/" style={{ color: '#333' }}>
        To-Do App
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              style={{ color: '#181B34' }}  // Change link color to blue
            >
              <FaHome /> Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/myday"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              style={{ color: '#181B34' }}  // Change link color to blue
            >
              My Day
            </NavLink>
          </li>
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
