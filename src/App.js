// src/App.js
import React from 'react';
import './App.css';
import Project from './components/Project';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <Sidebar />
      <Project />
    </div>
  );
}

export default App;
