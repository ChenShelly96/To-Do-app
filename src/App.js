// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MyDay from './components/MyDay';
import ProductivityPage from './components/ProductivityPage';
import Project from './components/Project';
import Sidebar from './components/Sidebar';

function App() {
 

  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar /> 
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Project  />} />
            <Route path="/productivity" element={<ProductivityPage  />} />
            <Route path="/myday" element={<MyDay/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
