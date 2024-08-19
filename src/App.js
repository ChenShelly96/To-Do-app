// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Project from './components/Project';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <div className="App">
        <Header />
      <Sidebar />
      <Project />
    </div>
  );
}

export default App;
