// src/components/ProductivityPage.js
import React from 'react';
import '../styles/ProductivityPage.css';
import { calculateDailyWorkHours, calculateTaskCompletionRate } from '../utils/Functions';
import ProgressBar from './ProgressBar';
import WorkHoursChart from './WorkHoursChart';

const ProductivityPage = ({ tasks }) => {
  const taskCompletionRate = calculateTaskCompletionRate(tasks);
  const workHoursPerDay = calculateDailyWorkHours(tasks);
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
        <WorkHoursChart workHoursPerDay={workHoursPerDay} />
      </div>
      </div>
    </div>
  );
};

export default ProductivityPage;
