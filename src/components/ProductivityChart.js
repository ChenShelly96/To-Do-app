// src/components/ProductivityChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

// The component receives taskData as props
const ProductivityChart = ({ taskData }) => {
  const data = {
    labels: taskData.map(task => task.locationName),
    datasets: [
      {
        label: 'Tasks Completed',
        data: taskData.map(task => task.tasksCompleted),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  return <Bar data={data} />;
};

export default ProductivityChart;
