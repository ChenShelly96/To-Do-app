// src/App.js
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ProductivityPage from './components/ProductivityPage';
import Project from './components/Project';
import Sidebar from './components/Sidebar';


function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', owner: 'CS', status: 'Working on it', dueDate: '2024-08-13', priority: 'Low', notes: 'Action items', timeline: '13 - 14 Aug', location: 'Tel Aviv', completionRate: 80 },
    { id: 2, name: 'Task 2', owner: 'User2', status: 'Done', dueDate: '2024-08-14', priority: 'High', notes: 'Meeting notes', timeline: '15 - 16 Aug', location: 'Jerusalem', completionRate: 100 },
    { id: 3, name: 'Task 3', owner: 'User3', status: 'Stuck', dueDate: '2024-08-15', priority: 'Medium', notes: 'Other', timeline: '17 - 18 Aug', location: 'Haifa', completionRate: 40 },
  ]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar /> 
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Project tasks={tasks} setTasks={setTasks} />} />
            <Route path="/productivity" element={<ProductivityPage tasks={tasks} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
