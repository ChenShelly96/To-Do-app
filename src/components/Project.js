// src/components/Project.js
import React from 'react';
import '../App.css';
import '../styles/Project.css';
import TaskTable from './TaskTable';

const Project = () => {
  return (
    <div className="project">
      <h1>My Project</h1>
      <h2>Main Table</h2>
      <TaskTable />
    </div>
  );
};

export default Project;
