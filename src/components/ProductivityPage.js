// src/components/ProductivityPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/ProductivityPage.css';
import { calculateDailyWorkHours, calculateTaskCompletionRate } from '../utils/Functions';
import ProgressBar from './ProgressBar';
import WorkHoursChart from './WorkHoursChart';


const ProductivityPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskCompletionRate, setTaskCompletionRate] = useState(0);
 // const taskCompletionRate = calculateTaskCompletionRate(tasks);
  const workHoursPerDay = calculateDailyWorkHours(tasks);
  // Load tasks from API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const tasks = response.data.tasksList || response.data; 
        console.log(tasks);
        if (Array.isArray(tasks)) {
          setTasks(tasks);
          console.log(calculateTaskCompletionRate(tasks));
          setTaskCompletionRate(calculateTaskCompletionRate(tasks));
        } else {
          console.error('Expected an array but got!!!:', typeof tasks);
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
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
