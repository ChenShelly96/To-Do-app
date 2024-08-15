// src/components/Project.js
import React from 'react';
import '../styles/Project.css';
import TaskTable from './TaskTable';

const Project = () => {
  return (
    <div className="project">
      <h1>My Project</h1>
      <TaskTable />
    </div>
  );
};

export default Project;
