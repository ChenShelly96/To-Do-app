import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import '../styles/ProductivityPage.css';
import { calculateTaskCompletionRate } from '../utils/Functions';

const ProgressBar = () => {
  const [taskCompletionRate, setTaskCompletionRate] = useState(0);

  // Load tasks from API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        const tasks = response.data;
        setTaskCompletionRate(calculateTaskCompletionRate(tasks));
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <CircularProgressbar
      value={taskCompletionRate}
      text={`${Math.round(taskCompletionRate)}%`}
      styles={buildStyles({
        textColor: '#fff',
        pathColor: '#E878A7',
        trailColor: '#d6d6d6',
      })}
    />
  );
};

export default ProgressBar;
