// src/components/ProductivityPage.js
import React, { useEffect, useState } from 'react';
import '../styles/ProductivityPage.css';
import { calculateDailyWorkHours, calculateTaskCompletionRate } from '../utils/Functions';
import ProgressBar from './ProgressBar';
import WorkHoursChart from './WorkHoursChart';

const ProductivityPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskCompletionRate, setTaskCompletionRate] = useState(0);

  // Calculate work hours per day based on tasks
  const workHoursPerDay = calculateDailyWorkHours(tasks);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const fetchTasksFromLocalStorage = () => {
      try {
        // Load tasks from localStorage
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (Array.isArray(savedTasks)) {
          setTasks(savedTasks);
          console.log(calculateTaskCompletionRate(savedTasks));
          setTaskCompletionRate(calculateTaskCompletionRate(savedTasks));
        } else {
          console.error('Expected an array but got:', typeof savedTasks);
        }
      } catch (error) {
        console.error('Failed to fetch tasks from localStorage:', error);
      }
    };
    fetchTasksFromLocalStorage();
  }, []);

  console.log(workHoursPerDay);

  return (
    <div className="productivity-page">
      <h2>Productivity Analysis</h2>
      <div className='container-charts'>
        <div className="progress-bar-container">
          <h3>Task Completion Rate</h3>
          <ProgressBar value={taskCompletionRate} />
        </div>
        <div className="work-hours-chart">
          <h3>Work Hours per Day</h3>
          <WorkHoursChart />
        </div>
      </div>
    </div>
  );
};

export default ProductivityPage;
