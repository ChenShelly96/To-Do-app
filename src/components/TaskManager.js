// src/components/TaskManager.js
import React from 'react';
import MapComponent from './MapComponent';
import ProductivityChart from './ProductivityChart';
import RouteMap from './RouteMap';
import TaskTable from './TaskTable';

const TaskManager = ({ tasks }) => {
  const locations = tasks.filter(task => task.location).map(task => task.location);

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskTable tasks={tasks} />
      <h2>Map Overview</h2>
      <MapComponent locations={locations} />
      <h2>Optimized Route</h2>
      <RouteMap locations={locations} />
      <h2>Productivity Analysis</h2>
      <ProductivityChart taskData={tasks} />
    </div>
  );
};

export default TaskManager;
